// Movie type definitions for JSDoc comments
/**
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string} overview
 * @property {string|null} poster_path
 * @property {string|null} backdrop_path
 * @property {string} release_date
 * @property {number} vote_average
 * @property {number} vote_count
 * @property {number[]} genre_ids
 */

/**
 * @typedef {Object} TMDBResponse
 * @property {number} page
 * @property {Movie[]} results
 * @property {number} total_pages
 * @property {number} total_results
 */

/**
 * @typedef {Movie & {addedAt: string}} WatchlistMovie
 */

// Export empty object to make this a module
export {};