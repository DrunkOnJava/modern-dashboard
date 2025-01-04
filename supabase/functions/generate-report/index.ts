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

    // Get dashboard data
    const { data: dashboards, error: dashboardError } = await supabaseClient
      .from('dashboards')
      .select(`
        *,
        dashboard_cards (*)
      `)
      .order('created_at', { ascending: false })

    if (dashboardError) throw dashboardError

    // Generate report data
    const report = {
      generated_at: new Date().toISOString(),
      total_dashboards: dashboards.length,
      total_cards: dashboards.reduce((acc, d) => acc + d.dashboard_cards.length, 0),
      dashboards: dashboards.map(d => ({
        name: d.name,
        cards: d.dashboard_cards.length,
        created_at: d.created_at
      }))
    }

    return new Response(
      JSON.stringify(report),
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