import { supabase } from '../../lib/supabase';

export async function generateReport() {
  const { data, error } = await supabase
    .functions.invoke('generate-report', {
      body: { timestamp: new Date().toISOString() }
    });

  if (error) throw error;
  return data;
}

export async function processWebhook(type: string, data: any) {
  const { data: response, error } = await supabase
    .functions.invoke('process-webhook', {
      body: { type, data }
    });

  if (error) throw error;
  return response;
}