// Home page component with popular movies and search functionality
import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { MovieGrid } from '../components/MovieGrid';
import { MovieDetailsModal } from '../components/MovieDetailsModal';
import { fetchPopularMovies, searchMovies } from '../services/tmdbApi';

export const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load popular movies on component mount
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchPopularMovies();
      setMovies(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search with debounced input from SearchBar
  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is cleared, load popular movies again
      setIsSearching(false);
      loadPopularMovies();
      return;
    }

    try {
      setIsSearching(true);
      setLoading(true);
      setError(null);
      const response = await searchMovies(query);
      setMovies(response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getHeaderText = () => {
    if (isSearching && searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    return 'Popular Movies';
  };

  const getEmptyMessage = () => {
    if (isSearching && searchQuery) {
      return `No movies found for "${searchQuery}". Try a different search term.`;
    }
    return 'No movies available.';
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-600">
            Discover Movies
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore popular movies and build your personal watchlist
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {getHeaderText()}
          </h2>
          {movies.length > 0 && !loading && (
            <span className="text-gray-500 text-sm">
              {movies.length} movies
            </span>
          )}
        </div>

        {/* Movies Grid */}
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          emptyMessage={getEmptyMessage()}
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