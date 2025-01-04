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

    const { task } = await req.json()

    switch (task) {
      case 'cleanup_sessions':
        // Remove expired sessions
        await supabaseClient
          .from('auth.sessions')
          .delete()
          .lt('not_after', new Date().toISOString())
        break

      case 'cleanup_logs':
        // Remove old logs (keep last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        
        await Promise.all([
          supabaseClient
            .from('admin_audit_logs')
            .delete()
            .lt('created_at', thirtyDaysAgo.toISOString()),
          
          supabaseClient
            .from('api_request_logs')
            .delete()
            .lt('timestamp', thirtyDaysAgo.toISOString())
        ])
        break

      case 'optimize_tables':
        // Run VACUUM ANALYZE on tables
        await supabaseClient.rpc('maintenance_vacuum_analyze')
        break

      default:
        throw new Error('Invalid maintenance task')
    }

    // Log maintenance task
    await supabaseClient
      .from('maintenance_logs')
      .insert({
        task,
        executed_by: (req as any).auth.user.id,
        timestamp: new Date().toISOString()
      })

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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