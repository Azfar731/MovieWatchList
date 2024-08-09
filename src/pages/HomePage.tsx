import "./HomePage";
import Header from "../layout/Header";
import SearchBar from "../components/SearchBar";
import { fetchData } from "../utility/utilityFunctions";
import { useLoaderData } from "react-router-dom";
// import dotenv from "dotenv";

// dotenv.config();

function loader({request}) {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    throw new Error("API key not found. Register on OMDB to get an API Key");
  }
  const movieName = new URL(request.url).searchParams.get("movie")
  if(movieName === null){
    return false
  }
  return fetchData(movieName, apiKey)

  
}

export default function HomePage() {

    const loaderData = useLoaderData()
    console.log(loaderData)
  
    return (
    <>
      <Header
        title="Find Your Film"
        link="/watchlist"
        linkText="My Watchlist"
      />
      <SearchBar />
    </>
  );
}

export { loader };
