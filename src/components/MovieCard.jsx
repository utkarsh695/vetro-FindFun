// Individual movie card component with hover effects and watchlist toggle
import React, { useState } from 'react';
import { Heart, Star, Calendar, Film } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import { getImageUrl, formatReleaseDate } from '../services/tmdbApi';

/**
 * MovieCard component displays individual movie information
 * @param {Object} props
 * @param {import('../types/movie.js').Movie} props.movie - Movie object to display
 * @param {() => void} [props.onClick] - Optional click handler for the card
 */
export const MovieCard = ({ movie, onClick }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = (e) => {
    e.preventDefault(); // Prevent any parent click handlers
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="group relative modern-card overflow-hidden cursor-pointer hover-glow"
      onClick={handleCardClick}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] bg-gray-100">
        {!imageError ? (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Film className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Watchlist Button */}
        <button
          onClick={handleWatchlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-10 ${
            inWatchlist
              ? 'gradient-secondary text-white shadow-lg'
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-cyan-500'
          } opacity-0 group-hover:opacity-100 hover:scale-110`}
          title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Heart
            className={`h-5 w-5 transition-all ${inWatchlist ? 'icon-filled' : ''}`}
          />
        </button>

        {/* Rating Badge */}
        {movie.vote_average > 0 && (
          <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
            <Star className="h-4 w-4 text-yellow-500 icon-filled" />
            <span className="text-gray-700 text-sm font-medium">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-all">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-gray-500">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">{formatReleaseDate(movie.release_date)}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {movie.overview || 'No description available.'}
        </p>
      </div>
    </div>
  );
};