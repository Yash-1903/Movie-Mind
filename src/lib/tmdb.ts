import { MovieDetails, MovieSearchResult } from '../types/movie';

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // We'll need to get this from environment variables
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
  );
  return await response.json();
}

export async function getTrendingMovies(): Promise<MovieSearchResult[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

export async function getRecommendedMovies(movieId: string): Promise<MovieSearchResult[]> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
}