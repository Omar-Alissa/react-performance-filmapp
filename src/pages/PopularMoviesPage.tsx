import MovieCard from '../components/MovieCard'
import useMovies from '../hooks/useMovies'
import './PopularMoviesPage.css'

const PopularMoviesPage = () => {
  const { movies, loading, error } = useMovies()

  return (
    <main className="movies-page">
      <h1>Popular Movies</h1>

      {loading && <p>Loading movies...</p>}
      {error && <p>Something went wrong: {error}</p>}

      {!loading && !error && (
        <section className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      )}
    </main>
  )
}

export default PopularMoviesPage
