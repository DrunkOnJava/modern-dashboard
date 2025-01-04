import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type Dashboard = Database['public']['Tables']['dashboards']['Row'];
type DashboardCard = Database['public']['Tables']['dashboard_cards']['Row'];

export async function createDashboard(name: string) {
  const { data, error } = await supabase
    .from('dashboards')
    .insert({ name })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDashboards() {
  const { data, error } = await supabase
    .from('dashboards')
    .select(`
      *,
      dashboard_cards (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateDashboard(id: string, updates: Partial<Dashboard>) {
  const { data, error } = await supabase
    .from('dashboards')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDashboard(id: string) {
  const { error } = await supabase
    .from('dashboards')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function createDashboardCard(dashboardId: string, card: Omit<DashboardCard, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('dashboard_cards')
    .insert({ ...card, dashboard_id: dashboardId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDashboardCard(id: string, updates: Partial<DashboardCard>) {
  const { data, error } = await supabase
    .from('dashboard_cards')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDashboardCard(id: string) {
  const { error } = await supabase
    .from('dashboard_cards')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function reorderDashboardCards(dashboardId: string, cardIds: string[]) {
  const updates = cardIds.map((id, index) => ({
    id,
    position: index
  }));

  const { error } = await supabase
    .from('dashboard_cards')
    .upsert(updates);

  if (error) throw error;
}