import React from 'react';
import { TMDB } from '@/config/constants';

interface MoviePosterProps {
  path: string | null;
  title: string;
  size?: keyof typeof TMDB.POSTER_SIZES;
}

export function MoviePoster({ path, title, size = 'LARGE' }: MoviePosterProps) {
  const imageUrl = path
    ? `${TMDB.IMAGE_BASE_URL}/${TMDB.POSTER_SIZES[size]}${path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <img
      src={imageUrl}
      alt={`${title} Poster`}
      className="rounded-lg shadow-md w-full h-auto"
    />
  );
}