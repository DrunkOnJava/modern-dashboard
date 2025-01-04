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

    // Perform security checks
    const securityChecks = [
      // Check for expired sessions
      async () => {
        const { data: sessions } = await supabaseClient
          .from('auth.sessions')
          .select('*')
          .lt('not_after', new Date().toISOString())
        return {
          name: 'expired_sessions',
          status: sessions.length === 0 ? 'passed' : 'warning',
          details: `Found ${sessions.length} expired sessions`
        }
      },

      // Check for failed login attempts
      async () => {
        const { data: attempts } = await supabaseClient
          .from('auth.audit_log_entries')
          .select('*')
          .eq('type', 'login')
          .eq('success', false)
          .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        return {
          name: 'failed_logins',
          status: attempts.length < 10 ? 'passed' : 'warning',
          details: `${attempts.length} failed login attempts in last 24h`
        }
      },

      // Check for users without MFA
      async () => {
        const { data: users } = await supabaseClient
          .from('auth.users')
          .select('*')
          .is('mfa_enabled', false)
        return {
          name: 'mfa_usage',
          status: users.length === 0 ? 'passed' : 'warning',
          details: `${users.length} users without MFA enabled`
        }
      }
    ]

    // Run all checks
    const results = await Promise.all(securityChecks.map(check => check()))

    // Store scan results
    await supabaseClient
      .from('security_scans')
      .insert({
        timestamp: new Date().toISOString(),
        results
      })

    return new Response(
      JSON.stringify(results),
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