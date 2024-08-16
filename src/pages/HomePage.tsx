import { useState, createContext } from "react";
import "./HomePage";
import Header from "../layout/Header";
import SearchBar from "../components/SearchBar";
import {
  fetchData,
  setSearchParameters,
  getSearchParameters,
} from "../utility/utilityFunctions";
import {
  useLoaderData,
  LoaderFunctionArgs,
  useSearchParams,
} from "react-router-dom";
import MoviesList from "../components/MoviesList";
import PlaceHolder from "../components/Placeholder";
import ButtonList from "../components/Button/ButtonList";

const PageButtonContext = createContext();
async function loader({ request }: LoaderFunctionArgs) {
  // console.log("loader running");
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("API key not found. Register on OMDB to get an API Key");
  }
  const { movieName, pageNumber, loadData, moviesPerPage } =
    getSearchParameters(request.url);

  if (movieName === null) {
    return false;
  }
  if (loadData === "true") {
    return await fetchData(
      movieName,
      apiKey,
      Number(pageNumber),
      Number(moviesPerPage)
    );
  } else {
    const previousPageFetched = Math.ceil((Number(pageNumber) * Number(moviesPerPage))/10)
    return { response: true, moviesFetched: [], totalResults: 0, pageFetched: previousPageFetched  };
  }
}

export default function HomePage<T>() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesArray, setMoviesArray] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const moviesPerPage = 5;
  // const startIndex = Math.floor(((pageNumber - 1) * moviesPerPage) / 10) * 10;
  // console.log("startIndex: ", startIndex);
  const loaderResponse = useLoaderData();
  // console.log(loaderData);

  const managePageNumber = (value: number) => {
    const startIndexforNewPage =
      Math.floor(((value - 1) * moviesPerPage) / 10) * 10;

    
    setIsLoading(moviesArray[startIndexforNewPage] === undefined ? true : false)
    
    const paramsArray = [
      { key: "pageNumber", value },
      {
        key: "loadData",
        value:
          moviesArray[startIndexforNewPage] === undefined ? "true" : "false",
      },
      { key: "moviesPerPage", value: moviesPerPage },
    ];
    setSearchParameters(paramsArray, setSearchParams);
  };

  const appendMovieSearchResults = (moviesToAppend,startIndex) => {

    setMoviesArray((prev) => {
      // const startIndex = Math.floor(((pageNumber - 1) * moviesPerPage) / 10) * 10;
      return prev.map((elem, index) => {
        //insert the fetched results into their specific position in the array
        if (index >= startIndex && index < startIndex + moviesToAppend.length) {
          return moviesToAppend[index % 10];
        }
        // return same element for the rest of the array
        return elem;
      });
    });
  };


  const handleLoaderResponse = () => {
    const { moviesFetched, totalResults, pageFetched } = loaderResponse;

    //if loader fetched new data
    if (moviesFetched.length > 1) {
      //check whether movies Array has been initialized
      //if not, then initialize it to the length of totalResults
      //Each element contains undefined in the start
      if (moviesArray.length < 1) {
        setTotalSearchResults(totalResults);
        const newArray = new Array(Number(totalSearchResults));
        newArray.fill(undefined);
        setMoviesArray(newArray);
      }
      
      const startIndexForPageFetched = (pageFetched-1)*10
      if (moviesArray[startIndexForPageFetched] === undefined ) {
        appendMovieSearchResults(moviesFetched,startIndexForPageFetched);
        setIsLoading(false) //new data has been fetched
      }
    }
  }




  const getMovieIds = () => {

    //only enter the block if atleast 1 movie exists for the current page
    if (moviesArray[(pageNumber - 1)*moviesPerPage] !== undefined) {
      //get movies for current page
      let moviesForCurrentPage = [];
      if (moviesArray.length >= pageNumber * moviesPerPage) {
        //if there are sufficient movies to display on current page
        moviesForCurrentPage = moviesArray.slice(
          (pageNumber - 1) * moviesPerPage,
          pageNumber * moviesPerPage
        );
      } else {
        // if number of movies to display are lower than movies per page
        moviesForCurrentPage = moviesArray.slice(
          (pageNumber - 1) * moviesPerPage
        );
      }

      const movieIds: string[] = moviesForCurrentPage.map(
        (movie) => movie.imdbID
      );
      return movieIds;
    }
  };

  const handleFormSubmition = (e) => {
    e.preventDefault();
   
    e.target.submit();
  };


  // checks if loader provided a response and it was not an error
  if(loaderResponse && loaderResponse.response){
  handleLoaderResponse()  
  }

  return (
    <>
      <Header
        title="Find Your Film"
        link="/watchlist"
        linkText="My Watchlist"
      />
      <SearchBar handleSubmit={handleFormSubmition} />
      {!isLoading ? (
        <>
          <PageButtonContext.Provider value={managePageNumber}>
            <MoviesList movieIds={getMovieIds()} />
            <ButtonList
              totalResults={totalSearchResults}
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
