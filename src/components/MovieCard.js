import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function MovieCard({
  movie,
  isWatchlisted,
  toggleWatchlist,
  addToCart,
}) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    if (rating >= 5 && rating < 8) return "rating-ok";
    return "rating-bad";
  };

  return (
    <div key={movie.id} className="movie-card">
      <Link
        to={`/movies/${movie.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={`images/${movie.image}`}
          alt={movie.title}
          onError={handleError}
        />
        <div className="movie-card-info">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div>
            <span className="movie-card-genre">{movie.genre}</span>
            <span
              className={`movie-card-rating ${getRatingClass(movie.rating)}`}
            >
              {movie.rating}
            </span>
          </div>
        </div>
      </Link>
      <label className="switch">
        <input
          type="checkbox"
          checked={isWatchlisted}
          onChange={() => toggleWatchlist(movie.id)}
        ></input>

        <span className="slider">
          <span className="slider-label">
            {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
          </span>
        </span>
      </label>

      <button
        className="auth-button"
        onClick={() => addToCart(movie)}
        style={{ marginBottom: "10px" }}
      >
        Add to Cart {movie.price}
      </button>
    </div>
  );
}
