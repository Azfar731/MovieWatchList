import { useState } from "react";
import "./HomePage";
import Header from "../layout/Header";
import SearchBar from "../components/SearchBar";
import { fetchData } from "../utility/utilityFunctions";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import MoviesList from "../components/MoviesList";
import PlaceHolder from "../components/Placeholder";
// import dotenv from "dotenv";

// dotenv.config();

async function loader({ request }: LoaderFunctionArgs) {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("API key not found. Register on OMDB to get an API Key");
  }
  const movieName = new URL(request.url).searchParams.get("movie");
  if (movieName === null) {
    return false;
  }
  return await fetchData(movieName, apiKey);
}

export default function HomePage<T>() {
  const [pageNumber, setPageNumber] = useState(1);
  const loaderResponse = useLoaderData();
  const moviesPerPage = 3;
  // console.log(loaderData);

  const getMovieIds = () => {
    const { searchResults, totalResults } = loaderResponse;
    let moviesForCurrentPage = [];
    if (searchResults.length >= pageNumber * moviesPerPage) {
      moviesForCurrentPage = searchResults.slice(
        (pageNumber - 1) * moviesPerPage,
        pageNumber * moviesPerPage
      );
    } else {
      moviesForCurrentPage = searchResults.slice(
        (pageNumber - 1) * moviesPerPage);
    }
    const movieIds: string[] = moviesForCurrentPage.map(
      (movie) => movie.imdbID
    );
    return movieIds;
  };

  return (
    <>
      <Header
        title="Find Your Film"
        link="/watchlist"
        linkText="My Watchlist"
      />

      {loaderResponse ? (
        <MoviesList movieIds={getMovieIds()} />
      ) : (
        <PlaceHolder />
      )}
    </>
  );
}

export { loader };
