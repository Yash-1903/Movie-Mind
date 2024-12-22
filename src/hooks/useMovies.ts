import { useState, useEffect } from 'react';
import { MovieSearchResult } from '../types/movie';
import { getTrendingMovies, searchMovies } from '../lib/tmdb';

export function useMovies(searchQuery?: string) {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const results = searchQuery
          ? await searchMovies(searchQuery)
          : await getTrendingMovies();
        
        setMovies(results);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  return { movies, loading, error };
}