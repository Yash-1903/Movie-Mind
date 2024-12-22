import { TMDB } from '@/config/constants';
import type { MovieDetails, MovieSearchResult } from '@/types/movie';

const headers = {
  'Authorization': `Bearer ${TMDB.API_KEY}`,
  'Content-Type': 'application/json'
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const response = await fetch(
    `${TMDB.API_URL}${endpoint}?${searchParams}`,
    { headers }
  );
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  
  return response.json();
}

export async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  const data = await fetchTMDB<{ results: MovieSearchResult[] }>('/search/movie', {
    query,
    include_adult: 'false',
    language: 'en-US',
    page: '1'
  });
  return data.results;
}

export async function getTrendingMovies(): Promise<MovieSearchResult[]> {
  const data = await fetchTMDB<{ results: MovieSearchResult[] }>('/trending/movie/week');
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(`/movie/${id}`, {
    append_to_response: 'credits,videos'
  });
}