import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export function useWatchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  async function fetchWatchlist() {
    try {
      const { data } = await supabase
        .from('watchlist')
        .select('movie_id')
        .eq('user_id', user?.id);
      
      setWatchlist(data?.map(item => item.movie_id) || []);
    } finally {
      setLoading(false);
    }
  }

  async function addToWatchlist(movieId: string) {
    if (!user) return;

    await supabase
      .from('watchlist')
      .upsert({ user_id: user.id, movie_id: movieId });
    
    await fetchWatchlist();
  }

  async function removeFromWatchlist(movieId: string) {
    if (!user) return;

    await supabase
      .from('watchlist')
      .delete()
      .eq('user_id', user.id)
      .eq('movie_id', movieId);
    
    await fetchWatchlist();
  }

  return {
    watchlist,
    loading,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist: (movieId: string) => watchlist.includes(movieId)
  };
}