import { useEffect, useState } from 'react'
import { fetchPopularMovies, searchMovies } from '../api/tmdb'
import type { Movie } from '../types/Movie'

const FIRST_VERSION_PAGE_COUNT = 10

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

        const requests = Array.from({ length: FIRST_VERSION_PAGE_COUNT }, (_, index) => {
          const page = index + 1
          return trimmedQuery
            ? searchMovies(trimmedQuery, page, controller.signal)
            : fetchPopularMovies(page, controller.signal)
        })

        const responses = await Promise.all(requests)
        const allMovies = responses.flatMap((response) => response.results)
        setMovies(allMovies)
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
