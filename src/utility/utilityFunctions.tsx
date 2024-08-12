async function fetchData(movieName: string, apiKey: string) {
    const baseURL = "http://www.omdbapi.com/"
    const targetUrl = `${baseURL}?apikey=${apiKey}&s=${movieName}&type=movie`
    const response = await fetch(targetUrl)
    const data = await response.json() 
    return data.Search
}


export { fetchData };
