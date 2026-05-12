import { useState } from 'react'
import MovieCard from '../components/MovieCard'
import useFilteredMovies from '../hooks/useFilteredMovies'
import './PopularMoviesPage.css'

const PopularMoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { movies, loading, error } = useFilteredMovies(searchTerm)

  return (
    <main className="movies-page">
      <div className="movies-page__header">
        <div>
          <h1>Popular Movies</h1>
          <p className="movies-page__subtitle">Filter movies by title from API.</p>
        </div>

        <label className="movies-page__filter">
          <span className="movies-page__filter-label">Search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by title"
            className="movies-page__input"
          />
        </label>
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p>Something went wrong: {error}</p>}

      {!loading && !error && (
        <>
          <p className="movies-page__count">Showing {movies.length} movies</p>

          {movies.length > 0 ? (
            <section className="movies-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </section>
          ) : (
            <p className="movies-page__empty">No movies match your search.</p>
          )}
        </>
      )}
    </main>
  )
}

export default PopularMoviesPage
