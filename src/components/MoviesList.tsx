import "./MoviesList.css";
import MovieCard from "./MovieCard";

export default function MoviesList({ movieIds }: { movieIds: string[] }) {
  

  const movieCardsHTML = movieIds.map((id) => {
    return <MovieCard key={id} movieId={id} />;
  });

  return <div className="movies-list-container">{movieCardsHTML}</div>;
}
