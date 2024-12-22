import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from '@/lib/api/omdb';
import type { MovieSearchResult } from '@/types/movie';

interface UseMovieSearchResult {
  movies: MovieSearchResult[];
  loading: boolean;
  error: Error | null;
}

export function useMovieSearch(query?: string): UseMovieSearchResult {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);
        
        const results = query
          ? await searchMovies(query)
          : await getPopularMovies();
        
        if (mounted) {
          setMovies(results);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch movies'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      mounted = false;
    };
  }, [query]);

  return { movies, loading, error };
}