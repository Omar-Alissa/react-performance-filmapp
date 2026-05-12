import type { Movie } from '../types/Movie'
import { Link } from 'react-router-dom'
import './MovieCard.css'

type MovieCardProps = {
  movie: Movie
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const FALLBACK_POSTER_URL = 'https://via.placeholder.com/500x750?text=No+Image'

const MovieCard = ({ movie }: MovieCardProps) => {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown'

  // Simulate expensive JS calculation (bad practice)
  const expensiveCalc = Array.from({ length: 10000 }, (_, i) => i * Math.random()).reduce((a, b) => a + b, 0)
  const fakeData = `${expensiveCalc.toFixed(0)}`

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER_URL

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link" aria-label={`Open details for ${movie.title}`}>
      <article className="movie-card movie-card--clickable">
        <img
          src={posterUrl}
          alt={`Poster for ${movie.title}`}
          className="movie-poster"
        />
        <span style={{ display: 'none' }}>{fakeData}</span>

        <div className="movie-body">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-meta">
            {releaseYear} | Rating: {movie.vote_average.toFixed(1)}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default MovieCard