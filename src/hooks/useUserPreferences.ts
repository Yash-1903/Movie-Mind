import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface UserPreferences {
  preferred_genres: string[];
  preferred_actors: string[];
  preferred_directors: string[];
}

export function useUserPreferences() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  async function fetchPreferences() {
    try {
      const { data } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      setPreferences(data);
    } finally {
      setLoading(false);
    }
  }

  async function updatePreferences(newPreferences: Partial<UserPreferences>) {
    if (!user) return;

    await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        ...newPreferences
      });
    
    await fetchPreferences();
  }

  return { preferences, loading, updatePreferences };
}