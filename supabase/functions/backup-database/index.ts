import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get auth user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Get list of tables
    const { data: tables, error: tablesError } = await supabaseClient
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (tablesError) throw tablesError

    // Create backup of each table
    const backup: Record<string, any> = {}
    for (const { table_name } of tables) {
      const { data, error } = await supabaseClient
        .from(table_name)
        .select('*')

      if (error) throw error
      backup[table_name] = data
    }

    // Log backup creation
    await supabaseClient
      .from('backup_logs')
      .insert({
        created_by: (req as any).auth.user.id,
        backup_size: JSON.stringify(backup).length,
        tables_included: tables.map(t => t.table_name)
      })

    return new Response(
      JSON.stringify(backup),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename=backup.json'
        },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})