import "./WatchList.css";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import MoviesList from "../components/MoviesList";
import PlaceHolder from "../components/Placeholder";
export default function WatchList() {
  const [movieIds, setMovieIds] = useState([]);

  useEffect(() => {
    const watchlistString = localStorage.getItem("watchlist");
    if (watchlistString) {
      const watchlistArray = JSON.parse(watchlistString);
      setMovieIds(watchlistArray);
    }
  }, []);

  return (
    <>
      <Header title="My Watchlist" link="/" linkText="Search for movies" />
      {movieIds.length > 1 ? (
        <MoviesList  movieIds={movieIds}/>
      ) : (
        <PlaceHolder>
          <h1>No movies in the watchlist</h1>
        </PlaceHolder>
      )}
    </>
  );
}
