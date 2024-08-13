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
  const loaderData = useLoaderData();
  const moviesPerPage = 3;
  // console.log(loaderData);

  const getMovieIds = () => {
    if (loaderData.length >= pageNumber * moviesPerPage) {
      const moviesForCurrentPage = loaderData.slice(
        (pageNumber - 1) * moviesPerPage,
        pageNumber * moviesPerPage
      );
      const movieIds: string[] = moviesForCurrentPage.map((movie) => movie.imdbID);
      return movieIds
    } else {
      throw new Error(
        "Error occurred in HomePage loader. Not enough movies in array"
      );
    }
  };

  return (
    <>
      <Header
        title="Find Your Film"
        link="/watchlist"
        linkText="My Watchlist"
      />
      <SearchBar />
      {loaderData ? <MoviesList movieIds={getMovieIds()} /> : <PlaceHolder />}
    </>
  );
}

export { loader };
