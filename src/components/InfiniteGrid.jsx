import { useEffect, useRef, useState, useCallback } from "react";
import { getPopularMoviesPage } from "../api/tmdb";
import MovieCard from "./MovieCard";
import "./InfiniteGrid.css";

function InfiniteGrid() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const results = await getPopularMoviesPage(page);
    setMovies((prev) => [...prev, ...results]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" }
    );
    const current = loaderRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore]);

  return (
    <div className="infinite-grid-section">
      <h2>All Movies</h2>
      <div className="infinite-grid">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      <div ref={loaderRef} className="infinite-loader">
        {loading && <p className="status-text">Loading more...</p>}
      </div>
    </div>
  );
}

export default InfiniteGrid;
