import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      const data = await searchMovies(query);
      setResults(data);
      setLoading(false);
    }
    if (query) fetchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Results for "{query}"</h2>
      {loading && <p className="status-text">Searching...</p>}
      {!loading && results.length === 0 && (
        <p className="status-text">No movies found.</p>
      )}
      <div className="search-results-grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
