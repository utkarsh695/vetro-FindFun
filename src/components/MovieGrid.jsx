// Grid layout component for displaying movies with loading and error states
import React from 'react';
import { MovieCard } from './MovieCard';
import { Loader2, AlertCircle, Film } from 'lucide-react';

/**
 * MovieGrid component displays movies in a responsive grid layout
 * @param {Object} props
 * @param {import('../types/movie.js').Movie[]} props.movies - Array of movies to display
 * @param {boolean} [props.loading] - Loading state
 * @param {string|null} [props.error] - Error message
 * @param {string} [props.emptyMessage] - Message to show when no movies
 * @param {(movie: import('../types/movie.js').Movie) => void} [props.onMovieClick] - Callback when a movie is clicked
 */
export const MovieGrid = ({
  movies,
  loading = false,
  error = null,
  emptyMessage = "No movies found.",
  onMovieClick
}) => {
  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="spinner-gradient h-8 w-8 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-cyan-500 mx-auto mb-4" />
          <p className="text-cyan-600 mb-2 font-semibold">Failed to load movies</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Film className="h-12 w-12 text-gray-400 mx-auto mb-4 opacity-50" />
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Movies grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={() => onMovieClick && onMovieClick(movie)}
        />
      ))}
    </div>
  );
};