// Navigation component with routing links and watchlist counter
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';

export const Navigation = () => {
  const location = useLocation();
  const { watchlist } = useWatchlist();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav-gradient sticky top-0 z-50 shadow-lg backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-cyan-400 icon-filled" />
            <span className="text-xl font-bold text-purple-600">FindFun</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/')
                  ? 'gradient-primary text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/watchlist"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/watchlist')
                  ? 'gradient-secondary text-white shadow-lg'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              <Heart className="h-4 w-4 icon-filled" />
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="badge-gradient text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};