import type { Movie } from '../types/Movie'
import './MovieCard.css'

type MovieCardProps = {
  movie: Movie
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const FALLBACK_POSTER_URL = 'https://via.placeholder.com/500x750?text=No+Image'
const FALLBACK_OVERVIEW = 'No overview available.'

const MovieCard = ({ movie }: MovieCardProps) => {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown'

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER_URL

  return (
    <article className="movie-card">
      <img
        src={posterUrl}
        alt={`Poster for ${movie.title}`}
        loading="lazy"
        className="movie-poster"
      />

      <div className="movie-body">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-meta">
          {releaseYear} | Rating: {movie.vote_average.toFixed(1)}
        </p>
        <p className="movie-overview">{movie.overview || FALLBACK_OVERVIEW}</p>
      </div>
    </article>
  )
}

export default MovieCard