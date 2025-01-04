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

    const { period = '24h' } = await req.json()

    // Calculate time range
    const now = new Date()
    const range = {
      '24h': new Date(now.getTime() - 24 * 60 * 60 * 1000),
      '7d': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }[period] || range['24h']

    // Gather analytics data
    const [
      { count: totalUsers },
      { count: newUsers },
      { count: activeUsers },
      { count: apiRequests }
    ] = await Promise.all([
      // Total users
      supabaseClient
        .from('profiles')
        .select('*', { count: 'exact', head: true }),
      
      // New users in period
      supabaseClient
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', range.toISOString()),
      
      // Active users in period
      supabaseClient
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_login', range.toISOString()),
      
      // API requests in period
      supabaseClient
        .from('api_request_logs')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', range.toISOString())
    ])

    const analytics = {
      timestamp: now.toISOString(),
      period,
      metrics: {
        total_users: totalUsers,
        new_users: newUsers,
        active_users: activeUsers,
        api_requests: apiRequests
      }
    }

    // Store analytics
    await supabaseClient
      .from('analytics_snapshots')
      .insert(analytics)

    return new Response(
      JSON.stringify(analytics),
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