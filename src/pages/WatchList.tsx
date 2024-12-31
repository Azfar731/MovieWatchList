import "./WatchList.css";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import MoviesList from "../components/MoviesList";
import PlaceHolder from "../components/Placeholder";
import { createContext } from "react";
import Footer from "../layout/Footer";
import { LuClipboardList } from "react-icons/lu";
export const WatchListContext = createContext<(value: string) => void>(() => {
  console.warn("WatchListContext.Provider is missing.");
});

export default function WatchList() {
  const [movieIds, setMovieIds] = useState<string[]>([]);

  const manageMovieIds = (movieId: string) => {
    setMovieIds((prev) => {
      if (prev.includes(movieId)) {
        return prev.filter((id) => id !== movieId);
      } else {
        return prev;
      }
    });
  };

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
      {movieIds.length > 0 ? (
        <WatchListContext.Provider value={manageMovieIds}>
          <MoviesList movieIds={movieIds} />
        </WatchListContext.Provider>
      ) : (
        <PlaceHolder>
          <div className="flex-column-container">
            <LuClipboardList className="icon" />
            <h1>WatchList is Empty</h1>
          </div>
        </PlaceHolder>
      )}
      <Footer />
    </>
  );
}
