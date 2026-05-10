export interface Movie {
  id: number
  title: string
  overview: string 
  poster_path: string 
  vote_average: number 
  release_data: string
  genre_ids:number[]
}

export interface MoviesResponse {
  results: Movie[]
  total_page: number
  total_results: number 
  page: number
}

export interface MovieDetail extends Movie {
  runtime: number 
  tagline: string
  status: string
  genres: { id: number ; name: string }[]
}