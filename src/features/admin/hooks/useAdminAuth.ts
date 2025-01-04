import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

export function useAdminAuth() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile || !['admin', 'super_admin'].includes(profile.role)) {
        navigate('/');
      }
    };

    checkAdminAccess();
  }, [user, navigate]);

  return { isAdmin: !!user };
}