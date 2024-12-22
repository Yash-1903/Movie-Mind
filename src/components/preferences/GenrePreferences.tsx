import React from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

const POPULAR_GENRES = [
  { id: '28', name: 'Action' },
  { id: '35', name: 'Comedy' },
  { id: '18', name: 'Drama' },
  { id: '27', name: 'Horror' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Science Fiction' }
];

export function GenrePreferences() {
  const { preferences, updatePreferences, loading } = useUserPreferences();

  if (loading) return <div>Loading preferences...</div>;

  const selectedGenres = preferences?.preferred_genres || [];

  const toggleGenre = (genreId: string) => {
    const newGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    
    updatePreferences({ preferred_genres: newGenres });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Favorite Genres</h3>
      <div className="flex flex-wrap gap-2">
        {POPULAR_GENRES.map(genre => (
          <button
            key={genre.id}
            onClick={() => toggleGenre(genre.id)}
            className={`px-4 py-2 rounded-full ${
              selectedGenres.includes(genre.id)
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}