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

    // Get all API connections
    const { data: connections } = await supabaseClient
      .from('api_connections')
      .select('*')
      .eq('enabled', true)

    // Check each connection
    const results = await Promise.all(
      connections.map(async (connection) => {
        try {
          const response = await fetch(connection.endpoint, {
            headers: {
              'Authorization': `Bearer ${connection.api_key}`,
              'Content-Type': 'application/json'
            }
          })

          const status = {
            id: connection.id,
            name: connection.name,
            status: response.ok ? 'healthy' : 'error',
            latency: response.headers.get('x-response-time'),
            last_checked: new Date().toISOString()
          }

          // Store status
          await supabaseClient
            .from('api_health_checks')
            .insert(status)

          return status
        } catch (error) {
          const status = {
            id: connection.id,
            name: connection.name,
            status: 'error',
            error: error.message,
            last_checked: new Date().toISOString()
          }

          // Store error status
          await supabaseClient
            .from('api_health_checks')
            .insert(status)

          return status
        }
      })
    )

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