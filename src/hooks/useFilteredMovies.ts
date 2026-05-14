import { useEffect, useState } from 'react'
import { fetchPopularMovies, searchMovies } from '../api/tmdb'
import type { Movie } from '../types/Movie'

const useFilteredMovies = (query: string) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const trimmedQuery = query.trim()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = trimmedQuery
          ? await searchMovies(trimmedQuery, 1, controller.signal)
          : await fetchPopularMovies(1, controller.signal)

        setMovies(response.results)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [query])

  return { movies, loading, error }
}

export default useFilteredMovies
