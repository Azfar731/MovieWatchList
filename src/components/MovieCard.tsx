import "./MovieCard.css";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../utility/utilityFunctions";
import ImagePlaceholder from "./ImagePlaceholder";
import { FaStar } from "react-icons/fa6";
// import { FaStarHalf } from "react-icons/fa6";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { ThreeDots } from "react-loading-icons";
import { MovieDetails } from "../utility/customTypes";
import { useContext } from "react";
import { WatchListContext } from "../pages/WatchList";
import toast, { Toaster } from "react-hot-toast";
import {
  BiSolidBookmarkAltPlus,
  BiSolidBookmarkAltMinus,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export default function MovieCard({ movieId }: { movieId: string }) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined
  );
  const [isInWatchList, setIsInWatchList] = useState(false);
  const manageMovieIds = useContext(WatchListContext);
  const movieDetailsPageURL = `/movies/${movieDetails?.imdbID}`;
  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    // setMovieDetails(fetchMovieData(movieId,apiKey));
    fetchMovieData(movieId, apiKey).then((data) => {
      setMovieDetails(data?.movieDetails);
      setIsInWatchList(inWatchList(data?.movieDetails.imdbID));
    });
  }, [movieId]);

  function manageWatchlist() {
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
        const newWatchListArray = watchlistArray.filter(
          (movieId) => movieId !== movieDetails.imdbID
        );
        localStorage.setItem("watchlist", JSON.stringify(newWatchListArray));
        setIsInWatchList(false);
        manageMovieIds(movieDetails.imdbID);
        toast("Movie removed from watchlist", {
          icon: <BiSolidBookmarkAltMinus size={"2em"} color="red" />,
        });
        return;
      }
    }

    //case for addition
    watchlistArray.push(movieDetails.imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
    setIsInWatchList(true);
    toast("Movie added to watchlist", {
      icon: <BiSolidBookmarkAltPlus size={"2em"} color="green" />,
    });
  }

  function inWatchList(imdbID: string) {
    const watchlistString = localStorage.getItem("watchlist");

    if (watchlistString) {
      if (JSON.parse(watchlistString).includes(imdbID)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    const checkWatchlist = () => {
      const watchlistString = localStorage.getItem("watchlist");
      if (watchlistString) {
        const found = JSON.parse(watchlistString).includes(movieDetails?.imdbID);
        setIsInWatchList(found);
      }
    };

    // Check localStorage on mount
    checkWatchlist();

    // Add storage event listener
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "watchlist") {
        checkWatchlist();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [movieDetails?.imdbID]);

  return movieDetails ? (
    <div className="movie-card">
      <Toaster position="bottom-center" />
      <Link to={movieDetailsPageURL} className="link-reset link-image">
        <ImagePlaceholder
          src={movieDetails.Poster}
          alt={`Movie Poster of ${movieDetails.Title}`}
          placeholder="/placeholder.png"
          className="movie-poster"
        />
      </Link>
      <div className="movie-info">
        <div className="movie-title-container">
          <Link to={movieDetailsPageURL} className="link-reset">
            <h3 className="movie-title">{movieDetails.Title}</h3>
          </Link>
          <div className="movie-rating">
            <FaStar className="rating-star" />
            <span className="rating-value">{movieDetails.imdbRating}</span>
          </div>
        </div>
        <div className="movie-meta">
          <span >{movieDetails.Runtime}</span>
          <span >{movieDetails.Genre}</span>
          <div className="watchlist" onClick={manageWatchlist}>
            {isInWatchList ? (
              <FaMinusCircle className="add-icon" />
            ) : (
              <FaPlusCircle className="add-icon" />
            )}
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
        {/* <ThreeDot color="#c9d6c9" size="medium" text="" textColor="" /> */}
      </div>
    </div>
  );
}
