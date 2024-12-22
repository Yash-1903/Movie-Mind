import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { MovieSearchResult } from '@/types/movie';

interface MovieCardProps {
  movie: MovieSearchResult;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={`${movie.Title} Poster`}
          className="w-full h-[450px] object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 truncate">{movie.Title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span>{movie.Year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}