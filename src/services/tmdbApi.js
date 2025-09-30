// TMDB API service - handles all movie data fetching
const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Fetch popular movies (displayed on initial page load)
 * @param {number} page - Page number for pagination
 * @returns {Promise<import('../types/movie.js').TMDBResponse>}
 */
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Search movies by title (used by search functionality)
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination
 * @returns {Promise<import('../types/movie.js').TMDBResponse>}
 */
export const searchMovies = async (query, page = 1) => {
  try {
    if (!query.trim()) {
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
    
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Fetch detailed movie information including cast and crew
 * @param {number} movieId - Movie ID
 * @returns {Promise<Object>} Detailed movie information
 */
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Helper function to get full image URL
 * @param {string|null} path - Image path from TMDB
 * @returns {string} Full image URL or placeholder
 */
export const getImageUrl = (path) => {
  if (!path) return '/placeholder-movie.jpg'; // You can add a placeholder image
  return `${TMDB_IMAGE_BASE_URL}${path}`;
};

/**
 * Helper function to format release date
 * @param {string} dateString - Date string from TMDB
 * @returns {string} Formatted year or 'Unknown'
 */
export const formatReleaseDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.getFullYear().toString();
};

/**
 * Helper function to format runtime in hours and minutes
 * @param {number} minutes - Runtime in minutes
 * @returns {string} Formatted runtime
 */
export const formatRuntime = (minutes) => {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
};

/**
 * Helper function to format currency
 * @param {number} amount - Amount in dollars
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount) => {
  if (!amount) return 'Unknown';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};