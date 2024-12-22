import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { GenrePreferences } from '@/components/preferences/GenrePreferences';
import { useWatchlist } from '@/hooks/useWatchlist';
import { MovieCard } from '@/components/MovieCard';
import { useMovieDetails } from '@/hooks/useMovieDetails';

export default function Profile() {
  const { user } = useAuth();
  const { watchlist, loading: watchlistLoading } = useWatchlist();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Movie Preferences</h2>
          <GenrePreferences />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Watchlist</h2>
          {watchlistLoading ? (
            <div>Loading watchlist...</div>
          ) : watchlist.length === 0 ? (
            <p className="text-gray-600">Your watchlist is empty</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchlist.map(movieId => (
                <WatchlistMovie key={movieId} movieId={movieId} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function WatchlistMovie({ movieId }: { movieId: string }) {
  const { movie, loading, error } = useMovieDetails(movieId);

  if (loading || error || !movie) {
    return (
      <div className="animate-pulse bg-gray-100 rounded-lg h-48" />
    );
  }

  return <MovieCard movie={movie} />;
}