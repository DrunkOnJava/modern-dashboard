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

    const { action, userId, data } = await req.json()

    switch (action) {
      case 'suspend':
        await supabaseClient
          .from('profiles')
          .update({ 
            suspended: true,
            suspended_at: new Date().toISOString(),
            suspended_by: (req as any).auth.user.id
          })
          .eq('id', userId)
        break

      case 'unsuspend':
        await supabaseClient
          .from('profiles')
          .update({ 
            suspended: false,
            suspended_at: null,
            suspended_by: null
          })
          .eq('id', userId)
        break

      case 'update_role':
        await supabaseClient
          .from('profiles')
          .update({ 
            role: data.role,
            permissions: data.permissions
          })
          .eq('id', userId)
        break

      default:
        throw new Error('Invalid action')
    }

    // Log action
    await supabaseClient
      .from('admin_audit_logs')
      .insert({
        admin_id: (req as any).auth.user.id,
        action,
        target_id: userId,
        details: data
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