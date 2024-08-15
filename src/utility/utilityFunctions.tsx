async function fetchData(movieName: string, apiKey: string) {
    const baseURL = "http://www.omdbapi.com/"
    const targetUrl = `${baseURL}?apikey=${apiKey}&s=${movieName}&type=movie`
    const response = await fetch(targetUrl)
    const data = await response.json() 
    console.log(data)
    if(data.Response === "True"){
    return {response: true , searchResults: data.Search , totalResults: data.totalResults}
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
    console.log(data)
    return data

}

export { fetchData, fetchMovieData };
