async function fetchData(
  movieName: string,
  apiKey: string,
  pageNumber: number,
  moviesPerPage: number
) {
  const baseURL = "https://www.omdbapi.com/";
  const pageToFetch = Math.ceil((pageNumber * moviesPerPage) / 10);
  const targetUrl = `${baseURL}?apikey=${apiKey}&s=${movieName}&type=movie&page=${pageToFetch}`;
  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw {
        msg: "Failed to Fetch Response",
        status: response.status,
        manual: true,
      };
    }
    const data = await response.json();
    console.log(data);
    if (data.code === 400) {
      throw {
        msg: "API RETURNED AN ERROR ",
        status: data.code,
        manual: true,
      };
    }
    if (data.Response === "True") {
      return {
        response: true,
        moviesFetched: data.Search,
        totalResults: data.totalResults,
        pageFetched: pageToFetch,
        searchTitle: movieName,
      };
    } else {
     return {
      response: false,
      moviesFetched: [],
      totalResults: 0,
      pageFetched: pageToFetch,
      searchTitle: movieName,
     }
    }
  } catch (err) {
    if (err instanceof Error) {
      throw {
        msg: err.message,
        status: 700,
        manual: true,
      };
    }
  }
}

async function fetchMovieData(movieId: string, apiKey: string) {
  const baseURL = "https://www.omdbapi.com/";
  const targetUrl = `${baseURL}?apikey=${apiKey}&i=${movieId}&plot=short`;
  const response = await fetch(targetUrl);
  const data = await response.json();
  return data;
}

function setSearchParameters(paramsArray, setSearchParams) {
  setSearchParams((prev) => {
    paramsArray.forEach((element) => {
      if (element.value) {
        prev.set(element.key, element.value);
      } else {
        prev.delete(element.key);
      }
    });
    return prev;
  });
}

function getSearchParameters(url: string) {
  const searchParams = new URL(url).searchParams;
  const movieName = searchParams.get("movie");
  const pageNumber = searchParams.get("pageNumber") || "1";
  const loadData = searchParams.get("loadData") || "true";
  const moviesPerPage = searchParams.get("moviesPerPage") || "10";
  return { movieName, pageNumber, loadData, moviesPerPage };
}

export { fetchData, fetchMovieData, setSearchParameters, getSearchParameters };
