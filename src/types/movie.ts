export interface MovieSearchResult {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
}

export interface MovieDetails extends MovieSearchResult {
  Plot: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Released: string;
}