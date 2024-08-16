import "./MovieCard.css";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../utility/utilityFunctions";
import ImagePlaceholder from "./ImagePlaceholder";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { ThreeDots } from "react-loading-icons";
import { watch } from "fs";
export default function MovieCard({ movieId }: { movieId: string }) {
  const [movieDetails, setMovieDetails] = useState(undefined);
 
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    // setMovieDetails(fetchMovieData(movieId,apiKey));
    fetchMovieData(movieId, apiKey).then((data) => setMovieDetails(data));
  }, []);

  function manageWatchlist(): void {
    if (!movieDetails) {
      throw Error(
        "Add to Watchlist button clicked but movie details state is undefined"
      );
    }

    let watchlistArray: string[] = [];
    const watchlistString = localStorage.getItem("watchlist");

    if (watchlistString) {
      watchlistArray = JSON.parse(watchlistString);
      //case for removal 
      if (watchlistArray.includes(movieDetails.imdbID)) {
       const newWatchListArray =  watchlistArray.filter(movieId => movieId !== movieDetails.imdbID)
        localStorage.setItem("watchlist", JSON.stringify(newWatchListArray)); 
        return  
      }
    }
    
    //case for addition
    watchlistArray.push(movieDetails.imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
    
  }

  function inWatchList() {
    if (!movieDetails) {
      throw Error("Checking for watchlist while movieDetails is undefined");
    }

    let watchlistArray: string[] = [];
    const watchlistString = localStorage.getItem("watchlist");

    if (watchlistString) {
      watchlistArray = JSON.parse(watchlistString);
      if (watchlistArray.includes(movieDetails.imdbID)) {
        return true;
      }
    }
    return false;
  }

  return movieDetails ? (
    <div className="movie-card">
      <ImagePlaceholder
        src={movieDetails.Poster}
        alt={`Movie Poster of ${movieDetails.Title}`}
        placeholder="/placeholder.png"
        className="movie-poster"
      />
      {/* <img
        className="movie-poster"
        src={movieDetails.Poster}
        alt="Blade Runner"
      /> */}
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
          <div className="watchlist" onClick={manageWatchlist}>
            { inWatchList() ? (<FaPlusCircle className="add-icon" />) : <FaMinusCircle className="add-icon"/> }
            
          </div>
        </div>
        <p className="movie-description">{movieDetails.Plot}</p>
      </div>
    </div>
  ) : (
    <div className="movie-card">
      <img
        src="/placeholder.png"
        alt="placeholderImage"
        style={{ width: "15%" }}
      />
      <div className="movie-info-placeholder">
        <ThreeDots stroke="#C7C6C0" />
      </div>
    </div>
  );
}
