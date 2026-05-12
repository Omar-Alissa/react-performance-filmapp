import type { MovieDetail } from '../types/Movie'
import './MovieDetails.css'

type MovieDetailsProps = {
  movie: MovieDetail
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const FALLBACK_POSTER_URL = 'https://via.placeholder.com/500x750?text=No+Image'

const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_POSTER_URL

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Unknown'

  return (
    <article className="movie-details">
      <img src={posterUrl} alt={`Poster for ${movie.title}`} className="movie-details__poster" />

      <div className="movie-details__body">
        <h1 className="movie-details__title">{movie.title}</h1>
        {movie.tagline && <p className="movie-details__tagline">{movie.tagline}</p>}

        <p className="movie-details__meta">
          {releaseYear} | {movie.runtime} min | Rating: {movie.vote_average.toFixed(1)}
        </p>

        {movie.genres.length > 0 && (
          <p className="movie-details__genres">{movie.genres.map((genre) => genre.name).join(' • ')}</p>
        )}

        <p className="movie-details__overview">{movie.overview}</p>
      </div>
    </article>
  )
}

export default MovieDetails
