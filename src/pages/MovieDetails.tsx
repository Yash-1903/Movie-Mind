import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { Star } from 'lucide-react';
import { WatchlistButton } from '@/components/movie/WatchlistButton';

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetails(id!);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error.message}
        </div>
      </div>
    );
  }

  if (loading || !movie) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 h-96 bg-gray-300 rounded-lg" />
            <div className="w-full md:w-2/3 space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-32 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={`${movie.Title} Poster`}
            className="w-full rounded-lg shadow-md"
          />
          <div className="mt-4">
            <WatchlistButton movieId={movie.imdbID} />
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span>{movie.imdbRating}</span>
            </div>
            <span>•</span>
            <span>{movie.Year}</span>
            <span>•</span>
            <span>{movie.Runtime}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.Genre.split(', ').map(genre => (
              <span
                key={genre}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 mb-6">{movie.Plot}</p>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p>{movie.Director}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <p>{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}