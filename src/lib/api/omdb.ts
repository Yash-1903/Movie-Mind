import { OMDB } from '@/config/constants';
import type { MovieDetails, MovieSearchResult } from '@/types/movie';

async function fetchOMDB<T>(params: Record<string, string>): Promise<T> {
  try {
    const searchParams = new URLSearchParams({
      apikey: OMDB.API_KEY,
      ...params,
    });
    
    const response = await fetch(`${OMDB.API_URL}/?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Error) {
      throw new Error(data.Error);
    }
    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OMDB API Error: ${error.message}`);
    }
    throw new Error('Failed to fetch from OMDB API');
  }
}

export async function searchMovies(query: string): Promise<MovieSearchResult[]> {
  if (!query.trim()) {
    return getPopularMovies();
  }

  const data = await fetchOMDB<{ Search?: MovieSearchResult[] }>({
    s: query,
    type: 'movie',
  });

  return data.Search ?? [];
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchOMDB<MovieDetails>({
    i: id,
    plot: 'full',
  });
}

export async function getPopularMovies(): Promise<MovieSearchResult[]> {
  const popularMovies = [
    'tt0111161', // The Shawshank Redemption
    'tt0068646', // The Godfather
    'tt0468569', // The Dark Knight
    'tt0137523', // Fight Club
    'tt0110912', // Pulp Fiction
    'tt0109830', // Forrest Gump
  ];

  try {
    const movies = await Promise.all(
      popularMovies.map(async (id) => {
        try {
          const movie = await fetchOMDB<MovieDetails>({ i: id });
          return {
            imdbID: movie.imdbID,
            Title: movie.Title,
            Year: movie.Year,
            Type: 'movie',
            Poster: movie.Poster,
          };
        } catch (error) {
          console.warn(`Failed to fetch movie ${id}:`, error);
          return null;
        }
      })
    );

    return movies.filter((movie): movie is MovieSearchResult => movie !== null);
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
    return [];
  }
}