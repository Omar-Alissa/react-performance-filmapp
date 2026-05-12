import type { MoviesResponse, MovieDetail } from "../types/Movie.ts"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_API_Read_Access_Token

const fetcher = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      ...options?.headers,
    }
  })
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}

export const fetchPopularMovies = (page = 1, signal?: AbortSignal) =>
  fetcher<MoviesResponse>(`/movie/popular?page=${page}`, { signal })

export const fetchMovieDetail = (id: string, signal?: AbortSignal) =>
  fetcher<MovieDetail>(`/movie/${id}`, { signal })

export const searchMovies = (query: string, page = 1, signal?: AbortSignal) =>
  fetcher<MoviesResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`, { signal })