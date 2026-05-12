import { useEffect, useState } from 'react'
import { fetchMovieDetail } from '../api/tmdb'
import type { MovieDetail } from '../types/Movie'

const useMovieDetails = (movieId: number | null) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (movieId === null) {
      setMovie(null)
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchMovieDetail(String(movieId), controller.signal)
        setMovie(response)
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
  }, [movieId])

  return { movie, loading, error }
}

export default useMovieDetails
