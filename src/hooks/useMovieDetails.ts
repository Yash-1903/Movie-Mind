import { useState, useEffect } from 'react';
import { getMovieDetails } from '@/lib/api/omdb';
import type { MovieDetails } from '@/types/movie';

export function useMovieDetails(id: string) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMovie() {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        if (mounted) {
          setMovie(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch movie details'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchMovie();

    return () => {
      mounted = false;
    };
  }, [id]);

  return { movie, loading, error };
}