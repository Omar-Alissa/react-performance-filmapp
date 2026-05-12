import MovieDetails from '../components/MovieDetails'
import { useNavigate, useParams } from 'react-router-dom'
import useMovieDetails from '../hooks/useMovieDetails'
import './MovieDetailsPage.css'

const MovieDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const movieId = id ? Number(id) : null
  const hasValidId = Number.isInteger(movieId) && movieId !== null && movieId > 0

  const { movie, loading, error } = useMovieDetails(hasValidId ? movieId : null)

  return (
    <main className="movie-details-page">
      <button type="button" className="back-button" onClick={() => navigate('/')}>
        Back to movies
      </button>

      {!hasValidId && <p>Invalid movie id.</p>}
      {loading && <p>Loading movie details...</p>}
      {error && <p>Something went wrong: {error}</p>}
      {hasValidId && !loading && !error && movie && <MovieDetails movie={movie} />}
    </main>
  )
}

export default MovieDetailsPage
