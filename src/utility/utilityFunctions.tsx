async function fetchData(movieName: string, apiKey: string, pageNumber: number, moviesPerPage: number ) {
    const baseURL = "http://www.omdbapi.com/"
    const pageToFetch = Math.ceil((pageNumber * moviesPerPage)/10)
    const targetUrl = `${baseURL}?apikey=${apiKey}&s=${movieName}&type=movie&page=${pageToFetch}`
    const response = await fetch(targetUrl)
    const data = await response.json() 
    console.log(data)
    if(data.Response === "True"){
    return {response: true , moviesFetched: data.Search , totalResults: data.totalResults}
}
else{
    return {response: false, errorMessage: data.Error}
}
}

async function fetchMovieData(movieId: string,apiKey: string){
    const baseURL = "http://www.omdbapi.com/"
    const targetUrl = `${baseURL}?apikey=${apiKey}&i=${movieId}&plot=short`
    const response = await fetch(targetUrl)
    const data = await response.json() 
    // console.log(data)
    return data

}


function setSearchParameters(paramsArray, setSearchParams){
    setSearchParams(prev => {
        paramsArray.forEach(element => {
            if(element.value){
                prev.set(element.key,element.value)
            }else{
                prev.delete(element.key)
            }
        });
        return prev;
    })

}


function getSearchParameters(url){
  const searchParams = new URL(url).searchParams
  const movieName = searchParams.get("movie");
  const pageNumber = searchParams.get("pageNumber") || "1"
  const loadData = searchParams.get("loadData") || "true"
  const moviesPerPage = searchParams.get("moviesPerPage") || "5"
  return {movieName, pageNumber, loadData, moviesPerPage}

}


export { fetchData, fetchMovieData, setSearchParameters, getSearchParameters };
