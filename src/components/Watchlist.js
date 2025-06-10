import "../styles.css";
import MovieCard from "./MovieCard";

export default function Watchlist({
  movies,
  watchlist,
  toggleWatchlist,
  addToCart,
}) {
  return (
    <div className="watchlist">
      {watchlist.map((id) => {
        const movie = movies.find((movie) => movie.id === id);
        return (
          <MovieCard
            key={id}
            movie={movie}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={true}
            addToCart={addToCart}
          ></MovieCard>
        );
      })}
    </div>
  );
}
