type MovieDetails = {
  Title: string;
  Poster: string;
  imdbRating: string;
  Runtime: string;
  Genre: string;
  Plot: string;
  imdbID: string;
} & Record<string, string>;

type MovieInList = {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
}

export type { MovieDetails , MovieInList};
