import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovieDetails,
  getMovieVideos,
  BACKDROP_BASE_URL,
} from "../api/tmdb";
import "./MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const movieData = await getMovieDetails(id);
      const videos = await getMovieVideos(id);
      const trailer = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setMovie(movieData);
      setTrailerKey(trailer ? trailer.key : null);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="status-text">Loading...</p>;
  if (!movie) return <p className="status-text error">Movie not found.</p>;

  return (
    <div className="movie-details">
      <Link to="/" className="back-link">← Back</Link>

      <div
        className="details-backdrop"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
        }}
      >
        <div className="details-backdrop-overlay" />
      </div>

      <div className="details-content">
        <h1>{movie.title}</h1>
        <p className="details-meta">
          ⭐ {movie.vote_average?.toFixed(1)} &nbsp;|&nbsp;{" "}
          {movie.release_date?.slice(0, 4)} &nbsp;|&nbsp; {movie.runtime} min
        </p>
        <p className="details-overview">{movie.overview}</p>

        {trailerKey ? (
          <div className="trailer-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="status-text">No trailer available.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
