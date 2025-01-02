import "./MovieDetails.css";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchMovieData } from "../utility/utilityFunctions";
import type { MovieDetails } from "../utility/customTypes";
import PlaceHolder from "../components/Placeholder";
import {
  MdOutlineStarOutline,
  MdOutlineStarHalf,
  MdOutlineStar,
} from "react-icons/md";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  BiSolidBookmarkAltPlus,
  BiSolidBookmarkAltMinus,
} from "react-icons/bi";

export async function loader({ params }: LoaderFunctionArgs) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { id } = params;
  if (!id) {
    throw Error("No movie id provided in the URL");
  }
  const fetchedData = await fetchMovieData(id, apiKey, "full");
  return {
    response: fetchedData?.response,
    movieData: fetchedData?.movieDetails,
  };
}

export default function MovieDetails() {
  const { response, movieData } = useLoaderData() as {
    response: boolean;
    movieData: MovieDetails;
  };

  const [isInWatchList, setIsInWatchList] = useState<boolean>(() => {
    const watchlistString = localStorage.getItem("watchlist");
    if (watchlistString) {
      return JSON.parse(watchlistString).includes(movieData.imdbID);
    }
    return false;
  });

  const star_icon_style = {
    color: "gold",
    height: "1.5rem",
    width: "1.5rem",
  };
  const renderRatingStars = () => {
    const rating = Math.floor(Number(movieData.imdbRating));
    if (isNaN(rating)) {
      return (
        <div>
          {[...Array(5)].map((_, index) => (
            <MdOutlineStarOutline key={index} style={star_icon_style} />
          ))}
        </div>
      );
    }
    const totalStars = 5;
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2;
    const emptyStars = totalStars - (fullStars + halfStars);
    console.log("rating: ", rating);
    console.log("fullStars: ", fullStars);
    console.log("halfStars: ", halfStars);
    console.log("emptyStars: ", emptyStars);
    return (
      <div>
        {[...Array(fullStars)].map((_, index) => (
          <MdOutlineStar key={index} style={star_icon_style} />
        ))}
        {halfStars === 0 ? null : <MdOutlineStarHalf style={star_icon_style} />}

        {[...Array(emptyStars)].map((_, index) => (
          <MdOutlineStarOutline key={index} style={star_icon_style} />
        ))}
      </div>
    );
  };

  const renderMovieGenres = (genres_list: string) => {
    return genres_list.split(",").map((genre, index) => (
      <div key={index} className="movie-genre">
        {genre}
      </div>
    ));
  };

  //write a function to add/remove movie from the watchlist
  function manageWatchlist() {
    let watchlistArray: string[] = [];
    const watchlistString = localStorage.getItem("watchlist");

    if (watchlistString) {
      watchlistArray = JSON.parse(watchlistString);
      //case for removal
      if (watchlistArray.includes(movieData.imdbID)) {
        const newWatchListArray = watchlistArray.filter(
          (movieId) => movieId !== movieData.imdbID
        );
        localStorage.setItem("watchlist", JSON.stringify(newWatchListArray));
        setIsInWatchList(false);
        toast("Movie removed from watchlist", {
          icon: <BiSolidBookmarkAltMinus size={"2em"} color="red" />,
        });
        return;
      }
    }

    //case for addition
    watchlistArray.push(movieData.imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
    setIsInWatchList(true);
    toast("Movie added to watchlist", {
      icon: <BiSolidBookmarkAltPlus size={"2em"} color="green" />,
    });
  }

  useEffect(() => {
    //function to check whether the movie is in watchlist.
    const intervalId = setInterval(() => {
      const watchlistString = localStorage.getItem("watchlist");
      if (watchlistString) {
        const found = JSON.parse(watchlistString).includes(movieData.imdbID);
        console.log("found: ", found);
        console.log("isInWatchList: ", isInWatchList);
        if (found !== isInWatchList) {
          console.log("Setting isInWatchList to: ", found);
          setIsInWatchList(found);
        }
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return response ? (
    <div className="movie-page-container">
      <Toaster position="bottom-center" />
      <img
        src={movieData.Poster}
        alt="Movie Poster"
        className="movie-page-poster"
      />
      <div className="movie-details-container">
        <div className="movie-title-container">
          <h1>{movieData.Title}</h1>
        </div>
        <div>
          <p className="movie-details-rating">{`${movieData.imdbRating}/10`}</p>
          {renderRatingStars()}
        </div>
        <button
          className={
            isInWatchList
              ? `movie-page-button remove-from-wishlist-button`
              : `movie-page-button add-to-wishlist-button`
          }
          onClick={manageWatchlist}
        >
          {isInWatchList ? (
            <>
              Remove from WatchList{" "}
              <FaMinusCircle className="movie-page-button-icon" />
            </>
          ) : (
            <>
              Add to WatchList{" "}
              <FaPlusCircle className="movie-page-button-icon" />
            </>
          )}
        </button>
        <div className="movie-page-genres-container">
          {renderMovieGenres(movieData.Genre)}
        </div>
        <div className="movie-info-container">
          <p>
            <strong>Duration:</strong> {movieData.Runtime}
          </p>
          <p>
            <strong>Director:</strong> {movieData.Director}
          </p>
          <p>
            <strong>Cast:</strong> {movieData.Actors}
          </p>
        </div>
        <div className="movie-plot-container">
          <p>{movieData.Plot}</p>
        </div>
      </div>
    </div>
  ) : (
    <PlaceHolder>Couldln't Fetch Movie Details</PlaceHolder>
  );
}
