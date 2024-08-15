import { useState, createContext } from "react";
import "./HomePage";
import Header from "../layout/Header";
import SearchBar from "../components/SearchBar";
import { fetchData } from "../utility/utilityFunctions";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import MoviesList from "../components/MoviesList";
import PlaceHolder from "../components/Placeholder";
import ButtonList from "../components/Button/ButtonList";

const PageButtonContext = createContext();
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
  const managePageNumber = (value: number) => {
    console.log("handle click funcction running, value: ", value);
    setPageNumber(value);
  };
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
        (pageNumber - 1) * moviesPerPage
      );
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

      {loaderResponse && loaderResponse.response ? (
        <>
          <PageButtonContext.Provider value={managePageNumber}>
            <MoviesList movieIds={getMovieIds()} />
            <ButtonList
              totalResults={loaderResponse.totalResults}
              resultsPerPage={moviesPerPage}
              currentPage={pageNumber}
            />
          </PageButtonContext.Provider>
        </>
      ) : (
        <PlaceHolder>
          <h1>
            {loaderResponse
              ? "No Movie found"
              : "Type a Movie name to start searching"}
          </h1>
        </PlaceHolder>
      )}
    </>
  );
}

export { loader, PageButtonContext };
