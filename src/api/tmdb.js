import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const getTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/week");
  return response.data.results;
};

export const getPopularMoviesPage = async (page = 1) => {
  const response = await tmdbApi.get("/movie/popular", {
    params: { page },
  });
  return response.data.results;
};

export const getTopRatedMovies = async () => {
  const response = await tmdbApi.get("/movie/top_rated");
  return response.data.results;
};

export const getActionMovies = async () => {
  const response = await tmdbApi.get("/discover/movie", {
    params: { with_genres: 28 },
  });
  return response.data.results;
};

export const getComedyMovies = async () => {
  const response = await tmdbApi.get("/discover/movie", {
    params: { with_genres: 35 },
  });
  return response.data.results;
};

export const getHorrorMovies = async () => {
  const response = await tmdbApi.get("/discover/movie", {
    params: { with_genres: 27 },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieVideos = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
