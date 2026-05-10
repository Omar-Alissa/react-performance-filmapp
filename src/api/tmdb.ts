import type { MoviesResponse, MovieDetail } from "../types/Movie.ts"

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_API_Read_Access_Token

const fetcher = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}

export const fetchPopularMovies = () =>
  fetcher<MoviesResponse>("/movie/popular")

export const fetchMovieDetail = (id: string) =>
  fetcher<MovieDetail>(`/movie/${id}`)

export const searchMovies = (query: string) =>
  fetcher<MoviesResponse>(`/search/movie?query=${query}`)