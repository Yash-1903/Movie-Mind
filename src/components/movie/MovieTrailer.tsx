import React from 'react';
import type { MovieDetails } from '@/types/movie';

interface MovieTrailerProps {
  videos: MovieDetails['videos']['results'];
}

export function MovieTrailer({ videos }: MovieTrailerProps) {
  const trailer = videos.find(video => video.type === 'Trailer') || videos[0];

  if (!trailer) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Trailer</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-md w-full h-full"
        />
      </div>
    </div>
  );
}