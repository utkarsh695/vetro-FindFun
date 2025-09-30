// Global state management for watchlist using React Context
import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * @typedef {Object} WatchlistContextType
 * @property {import('../types/movie.js').WatchlistMovie[]} watchlist
 * @property {(movie: import('../types/movie.js').Movie) => void} addToWatchlist
 * @property {(movieId: number) => void} removeFromWatchlist
 * @property {(movieId: number) => boolean} isInWatchlist
 */

/** @type {React.Context<WatchlistContextType | undefined>} */
const WatchlistContext = createContext(undefined);

/**
 * Custom hook to use the watchlist context
 * @returns {WatchlistContextType}
 */
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

/**
 * Provider component to wrap the app and provide watchlist functionality
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('movieWatchlist');
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (error) {
        console.error('Error loading watchlist from localStorage:', error);
        localStorage.removeItem('movieWatchlist');
      }
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  /**
   * Add a movie to the watchlist
   * @param {import('../types/movie.js').Movie} movie
   */
  const addToWatchlist = (movie) => {
    const watchlistMovie = {
      ...movie,
      addedAt: new Date().toISOString(),
    };
    
    setWatchlist(prev => [...prev, watchlistMovie]);
  };

  /**
   * Remove a movie from the watchlist
   * @param {number} movieId
   */
  const removeFromWatchlist = (movieId) => {
    setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
  };

  /**
   * Check if a movie is in the watchlist
   * @param {number} movieId
   * @returns {boolean}
   */
  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};