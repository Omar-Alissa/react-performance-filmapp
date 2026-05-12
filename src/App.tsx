
import { Navigate, Route, Routes } from 'react-router-dom'
import MovieDetailsPage from './pages/MovieDetailsPage'
import PopularMoviesPage from './pages/PopularMoviesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PopularMoviesPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
