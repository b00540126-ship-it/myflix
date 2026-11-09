import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/tmdb";
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />
      <div className="movie-card-overlay">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average?.toFixed(1)}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
