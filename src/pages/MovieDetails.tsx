import "./MovieDetails.css"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchMovieData } from "../utility/utilityFunctions";
import type { MovieDetails } from "../utility/customTypes";
import PlaceHolder from "../components/Placeholder";
import {
  MdOutlineStar,
  MdOutlineStarHalf,
  MdOutlineStarBorder,
} from "react-icons/md";

export async function loader({ params }: LoaderFunctionArgs) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { id } = params;
  if (!id) {
    throw Error("No movie id provided in the URL");
  }
  const fetchedData = await fetchMovieData(id, apiKey, "full");
  return {
    response: fetchedData?.response,
    movieData: fetchedData?.movieDetails,
  };
}

export default function MovieDetails() {
  const { response, movieData } = useLoaderData() as {
    response: boolean;
    movieData: MovieDetails;
  };

  const renderRatingStars = () => {
    const rating = Math.floor(Number(movieData.imdbRating));
    if (isNaN(rating)) {
      return (
        <div>
          {[...Array(5)].map((_, index) => (
            <MdOutlineStarBorder key={index} />
          ))}
        </div>
      );
    }
    const totalStars = 5;
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2;
    const emptyStars = totalStars - (fullStars + halfStars);
    console.log("rating: ", rating);
    console.log("fullStars: ", fullStars);
    console.log("halfStars: ", halfStars);
    console.log("emptyStars: ", emptyStars);
    return (
      <div>
        {[...Array(fullStars)].map((_, index) => (
          <MdOutlineStar key={index} />
        ))}
        {halfStars === 0 ? null : <MdOutlineStarHalf />}

        {[...Array(emptyStars)].map((_, index) => (
          <MdOutlineStarBorder key={index} />
        ))}
      </div>
    );
  };

  const renderMovieGenres = (genres_list: string) => {
    return genres_list.split(",").map((genre, index) => (
      <div key={index} className="movie-genre">
        {genre}
      </div>
    ))
  }


  return response ? (
    <div className="movie-page-container">
      <div className="movie-page-poster-title-container">
        <img src={movieData.Poster} alt="Movie Poster" />
        <div>
          <h1>{movieData.Title}</h1>
          <div>
            <p>{`${movieData.imdbRating}/10`}</p>
            {renderRatingStars()}
          </div>
        </div>
      </div>
      <div className="movie-page-genres-container">
        {renderMovieGenres(movieData.Genre)}
      </div>
      <div className= "movie-page-details-container">
        <div className="movie-details">
          <p>Duration: {movieData.Runtime}</p>
          <p>Director: {movieData.Director}</p>
          <p>Cast: {movieData.Actors}</p>
        </div>
        <div className="movie-plot-container">
          <p>{movieData.Plot}</p>
        </div>
      </div>
    </div>
  ) : (
    <PlaceHolder>Couldln't Fetch Movie Details</PlaceHolder>
  );
}
