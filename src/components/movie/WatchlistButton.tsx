import React from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useAuth } from '@/contexts/AuthContext';

interface WatchlistButtonProps {
  movieId: string;
}

export function WatchlistButton({ movieId }: WatchlistButtonProps) {
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movieId);

  if (!user) return null;

  return (
    <button
      onClick={() => inWatchlist ? removeFromWatchlist(movieId) : addToWatchlist(movieId)}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
    >
      {inWatchlist ? (
        <>
          <BookmarkCheck className="w-5 h-5" />
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <Bookmark className="w-5 h-5" />
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
}