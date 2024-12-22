import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from '@/components/SearchBar';
import { MovieCard } from '@/components/MovieCard';
import { useMovieSearch } from '@/hooks/useMovieSearch';

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { movies, loading, error } = useMovieSearch(searchQuery);

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {user ? `Welcome back!` : 'Discover Your Next Favorite Movie'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {user
            ? 'Here are your personalized movie recommendations'
            : 'Sign in to get personalized movie recommendations'}
        </p>
        <SearchBar onSearch={setSearchQuery} />
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-4 animate-pulse"
            >
              <div className="w-full h-[450px] bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))
        ) : movies.length === 0 ? (
          <div className="col-span-full text-center text-gray-600">
            {searchQuery ? 'No movies found. Try a different search.' : 'No movies available.'}
          </div>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}