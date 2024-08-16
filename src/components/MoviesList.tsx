import "./MoviesList.css";
import MovieCard from "./MovieCard";

export default function MoviesList({ movieIds }: { movieIds: string[] }) {
  // console.log("Movie Ids: ", movieIds);

  const movieCardsHTML = movieIds.map((id) => {
    return <MovieCard key={id} movieId={id} />;
  });

  return <div className="movies-list-container">{movieCardsHTML}</div>;
}
