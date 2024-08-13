import "./MovieCard.css";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../utility/utilityFunctions";

export default function MovieCard({ movieId }: { movieId: string }) {
  const [movieDetails, setMovieDetails] = useState(undefined);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    // setMovieDetails(fetchMovieData(movieId,apiKey));
    fetchMovieData(movieId, apiKey).then((data) => setMovieDetails(data));
  }, []);

  return movieDetails ? (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={movieDetails.Poster}
        alt="Blade Runner"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movieDetails.Title}</h3>
        <div className="movie-rating">
          <span className="rating-star">⭐</span>
          <span className="rating-value">{movieDetails.imdbRating}</span>
        </div>
        <div className="movie-meta">
          <span className="movie-duration">{movieDetails.Runtime}</span>
          <span className="movie-genre">{movieDetails.Genre}</span>
        </div>
        <a href="#" className="watchlist">
          ➕ Watchlist
        </a>
        <p className="movie-description">
          {movieDetails.Plot}
        </p>
      </div>
      <hr className="separator" />
    </div>
  ) : (
    <h1>LoadingMovie</h1>
  );
}
