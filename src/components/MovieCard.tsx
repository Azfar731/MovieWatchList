import "./MovieCard.css";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../utility/utilityFunctions";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
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
        <div className="movie-title-container">
          <h3 className="movie-title">{movieDetails.Title}</h3>
          <div className="movie-rating">
            <FaStar className="rating-star" />
            <span className="rating-value">{movieDetails.imdbRating}</span>
          </div>
        </div>
        <div className="movie-meta">
          <span className="movie-duration">{movieDetails.Runtime}</span>
          <span className="movie-genre">{movieDetails.Genre}</span>
          <div className="watchlist">
            <FaPlusCircle className="add-icon" /> Watchlist
          </div>
        </div>
        <p className="movie-description">{movieDetails.Plot}</p>
      </div>
    </div>
  ) : (
    <h1>LoadingMovie</h1>
  );
}
