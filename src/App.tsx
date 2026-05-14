
import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const PopularMoviesPage = lazy(() => import('./pages/PopularMoviesPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'))

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<PopularMoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
