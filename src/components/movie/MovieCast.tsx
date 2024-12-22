import React from 'react';
import { TMDB } from '@/config/constants';
import type { MovieDetails } from '@/types/movie';

interface MovieCastProps {
  cast: MovieDetails['credits']['cast'];
}

export function MovieCast({ cast }: MovieCastProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cast.slice(0, 6).map((actor) => (
          <div key={actor.id} className="text-center">
            <img
              src={actor.profile_path
                ? `${TMDB.IMAGE_BASE_URL}/${TMDB.POSTER_SIZES.SMALL}${actor.profile_path}`
                : 'https://via.placeholder.com/185x278?text=No+Image'
              }
              alt={actor.name}
              className="rounded-lg shadow-md w-full h-auto mb-2"
            />
            <p className="font-semibold">{actor.name}</p>
            <p className="text-sm text-gray-600">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}