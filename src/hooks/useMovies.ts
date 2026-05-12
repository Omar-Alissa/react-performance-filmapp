import { useState, useEffect } from "react";
import { fetchPopularMovies } from '../api/tmdb'
import type { Movie } from "../types/Movie.ts"


const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchPopularMovies(1, controller.signal);
        setMovies(response.results);
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted safely');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort();

  }, [])
  return { movies, loading, error }
}

export default useMovies;