import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Alert {
  type: 'error' | 'warning' | 'info';
  message: string;
  source: string;
  metadata?: Record<string, any>;
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

    // Get alert data
    const { alert } = await req.json() as { alert: Alert }

    // Validate alert data
    if (!alert || !alert.type || !alert.message || !alert.source) {
      throw new Error('Invalid alert data')
    }

    // Store alert
    const { error: insertError } = await supabaseClient
      .from('system_alerts')
      .insert({
        type: alert.type,
        message: alert.message,
        source: alert.source,
        metadata: alert.metadata || {},
        timestamp: new Date().toISOString()
      })

    if (insertError) throw insertError

    // Get notification settings
    const { data: settings } = await supabaseClient
      .from('admin_settings')
      .select('alert_notifications_enabled, alert_email')
      .single()

    // Send email notification if enabled
    if (settings?.alert_notifications_enabled && settings?.alert_email) {
      // Implement email notification logic here
      console.log('Would send email to:', settings.alert_email)
    }

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