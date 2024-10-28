import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import MovieDetailed from './pages/MovieDetailed.jsx'
import Genres from './pages/Genres.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

const router= createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path: '/movies', element: <Movies />},
      {path: '/movies/:id', element: <MovieDetailed />},
      {path: '/genres', element: <Genres />},
      {path: '*', element: <PageNotFound/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
