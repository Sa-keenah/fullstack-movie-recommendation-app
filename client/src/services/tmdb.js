import axios from 'axios';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// 🔍 Search movies by title
export const searchMovies = async (query, filters = {}) => {
  const params = {
    api_key: TMDB_API_KEY,
    query,
    language: 'en-US',
    include_adult: false,
    ...filters,
  };

  const res = await axios.get(`${BASE_URL}/search/movie`, { params });
  return res.data.results;
};

// 🌟 Get popular movies (homepage fallback)
export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
      page: 1,
    },
  });
  return res.data.results;
};

// 🎬 Discover movies with filters
export const discoverMovies = async (filters = {}) => {
  const params = {
    api_key: TMDB_API_KEY,
    language: 'en-US',
    sort_by: filters.sort_by || 'popularity.desc',
    with_genres: filters.genres?.join(','),
    'vote_average.gte': filters.min_rating || 0,
    include_adult: false,
    page: filters.page || 1,
  };

  const res = await axios.get(`${BASE_URL}/discover/movie`, { params });
  return res.data.results;
};

// 🎥 Get detailed movie info
export const getMovieDetails = async (movieId) => {
  const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
    },
  });
  return res.data;
};

// 🎭 Get available genres
export const getGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: TMDB_API_KEY,
      language: 'en-US',
    },
  });
  return res.data.genres;
};