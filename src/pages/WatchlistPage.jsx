// Watchlist page component showing saved movies
import React from 'react';
import { useState } from 'react';
import { MovieGrid } from '../components/MovieGrid';
import { MovieDetailsModal } from '../components/MovieDetailsModal';
import { useWatchlist } from '../context/WatchlistContext';
import { Heart, Calendar } from 'lucide-react';

export const WatchlistPage = () => {
  const { watchlist } = useWatchlist();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort watchlist by most recently added
  const sortedWatchlist = [...watchlist].sort((a, b) => 
    new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Heart className="h-8 w-8 text-cyan-400 icon-filled" />
            <h1 className="text-4xl md:text-5xl font-bold text-purple-600">
              My Watchlist
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {watchlist.length === 0 
              ? "Your watchlist is empty. Start adding movies from the home page!"
              : `You have ${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} in your watchlist`
            }
          </p>
        </div>

        {/* Watchlist Stats */}
        {watchlist.length > 0 && (
          <div className="stats-card mb-8 shadow-xl hover-glow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gradient-primary mb-1">
                  {watchlist.length}
                </div>
                <div className="text-gray-500 text-sm">
                  Total Movies
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient-secondary mb-1">
                  {Math.round(watchlist.reduce((sum, movie) => sum + movie.vote_average, 0) / watchlist.length * 10) / 10}
                </div>
                <div className="text-gray-500 text-sm">
                  Average Rating
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient-primary mb-1">
                  {watchlist.length > 0 ? new Date(watchlist[watchlist.length - 1].addedAt).toLocaleDateString() : '-'}
                </div>
                <div className="text-gray-500 text-sm">
                  Last Added
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        {watchlist.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Movies
            </h2>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Sorted by most recent</span>
            </div>
          </div>
        )}

        {/* Movies Grid */}
        <MovieGrid
          movies={sortedWatchlist}
          loading={false}
          error={null}
          emptyMessage="Your watchlist is empty. Browse movies on the home page and click the heart icon to add them here!"
          onMovieClick={handleMovieClick}
        />

        {/* Movie Details Modal */}
        {selectedMovie && (
          <MovieDetailsModal
            movie={selectedMovie}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};