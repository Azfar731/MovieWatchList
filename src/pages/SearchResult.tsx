import { useState, createContext, useEffect } from "react";
import "./SearchResult.css";
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
import { TbDatabaseSearch } from "react-icons/tb";
import { useNavigation } from "react-router-dom";
import { MovieInList } from "../utility/customTypes";
import { Riple } from "react-loading-indicators";
export const PageButtonContext = createContext<(value: number) => void>(() => {
  console.warn("PageButtonContext.Provider is missing.");
});

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { searchTitle } = params;
  if (!searchTitle) {
    throw new Error("Search Title not found in URL");
  }

  const { pageNumber, loadData, moviesPerPage } = getSearchParameters(
    request.url
  );

  if (loadData === "true") {
    const data = await fetchData({
      searchTitle,
      
      pageNumber: Number(pageNumber),
      moviesPerPage: Number(moviesPerPage),
    });
    if (!data) {
      console.log("no data fetched");
      throw new Error("No data fetched");
    }
    console.log("loaderData; ", data);
    return data;
  } else {
    const previousPageFetched = Math.ceil(
      (Number(pageNumber) * Number(moviesPerPage)) / 10
    );
    return {
      response: true,
      searchTitle,
      moviesFetched: [],
      totalResults: 0,
      pageFetched: previousPageFetched,
    };
  }
}

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesArray, setMoviesArray] = useState<MovieInList[]>([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0); //set to reference
  // const totalSearchResults = useRef(0);
  // const [isLoading, setIsLoading] = useState(true);
  const pageNumber = Number(searchParams.get("pageNumber")) || 1;
  const moviesPerPage = 10;
  const loaderData = useLoaderData() as {
    response: boolean;
    searchTitle: string;
    moviesFetched: MovieInList[];
    totalResults: number;
    pageFetched: number;
  };

  console.log(loaderData);
  const { response, searchTitle, moviesFetched, totalResults, pageFetched } =
    loaderData;
  const navigation = useNavigation();

  const isReloading =
    navigation.state === "loading" &&
    navigation.formAction ===
      navigation.location.pathname + navigation.location.search;

  // Are we redirecting after an action?
  const isRedirecting =
    navigation.state === "loading"  &&
    navigation.formAction !==
      navigation.location.pathname + navigation.location.search;

  const calculateStartIndex = (
    pageNumber: number,
    moviesPerPage: number
  ): number => {
    return Math.floor(((pageNumber - 1) * moviesPerPage) / 10) * 10;
  };

  const shouldLoadData = (
    startIndex: number,
    moviesArray: MovieInList[]
  ): boolean => {
    return moviesArray[startIndex] === undefined;
  };

  const loadPage = (pageNumber: number): void => {
    const startIndex = calculateStartIndex(pageNumber, moviesPerPage);
    const loadData = shouldLoadData(startIndex, moviesArray);

    // setIsLoading(loadData); //replace with useNavigation

    const paramsArray = [
      { key: "pageNumber", value: pageNumber.toString() },
      { key: "loadData", value: loadData ? "true" : "false" },
      { key: "moviesPerPage", value: moviesPerPage.toString() },
    ];

    setSearchParameters(paramsArray, setSearchParams);
  };

  const appendMovieSearchResults = ({
    moviesToAppend,
    startIndex,
  }: {
    moviesToAppend: MovieInList[];
    startIndex: number;
  }) => {
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

  const getMovieIds = () => {
    //only enter the block if atleast 1 movie exists for the current page
    if (moviesArray[(pageNumber - 1) * moviesPerPage] !== undefined) {
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
    return [];
  };

  const getPlaceholderValue = () => {
    if (!response) {
      return (
        <div className="flex-column-container">
          <TbDatabaseSearch className="icon" />
          <h1>Unable to find what you are looking for</h1>
          <h1>Try another keyword</h1>
        </div>
      );
    } else {
      return <Riple color="#c8d5c8" size="large" text="Fetching Movies" textColor="" />;
    }
  };


  useEffect(() => {
    //loader returns totalResults as 0 when it doesn't fetchdata. So, we need to handle that case
    //The case when no movies are found, is handled in the getPlaceholderValue function
    if(totalResults === 0) {
      return
    }
    setTotalSearchResults(totalResults);
    const newArray = new Array(Number(totalResults));
    newArray.fill(undefined);
    setMoviesArray(newArray);
  }, [searchTitle, totalResults]);




  //if loader fetched new data
  useEffect(() => {
    if (response) {
      const startIndexForPageFetched = (pageFetched - 1) * 10;
      if (moviesFetched.length > 0) {
        if (moviesArray[startIndexForPageFetched] === undefined) {
          appendMovieSearchResults({
            moviesToAppend: moviesFetched,
            startIndex: startIndexForPageFetched,
          });
          // setIsLoading(false); //new data has been fetched
        }
      } else {
        if (moviesArray[startIndexForPageFetched] === undefined) {
          //handle the case when no movies returned and array is also empty
          console.log("NO movies returned and array is also empty");
          setSearchParameters([{ key: "loadData", value: "true"}], setSearchParams);
        }
      }
    }
  }, [
    response,
    searchTitle,
    moviesFetched,
    totalResults,
    pageFetched,
    moviesArray,
    setSearchParams,
  ]);

 
  return (
    <>
      {!(isReloading || isRedirecting) && response ? (
        <>
          <PageButtonContext.Provider value={loadPage}>
            <MoviesList movieIds={getMovieIds()} />
            <ButtonList
              totalResults={totalSearchResults}
              resultsPerPage={moviesPerPage}
              currentPage={pageNumber}
            />
          </PageButtonContext.Provider>
        </>
      ) : (
        <PlaceHolder>{getPlaceholderValue()}</PlaceHolder>
      )}
    </>
  );
}
