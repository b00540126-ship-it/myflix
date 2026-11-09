import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
} from "./api/tmdb";
import MovieRow from "./components/MovieRow";
import MovieDetails from "./components/MovieDetails";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import InfiniteGrid from "./components/InfiniteGrid";
import "./App.css";

function Home() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const [trendingData, topRatedData, actionData, comedyData, horrorData] =
          await Promise.all([
            getTrendingMovies(),
            getTopRatedMovies(),
            getActionMovies(),
            getComedyMovies(),
            getHorrorMovies(),
          ]);
        setTrending(trendingData);
        setTopRated(topRatedData);
        setAction(actionData);
        setComedy(comedyData);
        setHorror(horrorData);
      } catch (err) {
        setError("Failed to load movies. Check your API key.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>MyFlix</h1>
      </header>

      <SearchBar />

      {loading && <p className="status-text">Loading movies...</p>}
      {error && <p className="status-text error">{error}</p>}

      {!loading && !error && (
        <main>
          <MovieRow title="Trending This Week" movies={trending} />
          <MovieRow title="Top Rated" movies={topRated} />
          <MovieRow title="Action" movies={action} />
          <MovieRow title="Comedy" movies={comedy} />
          <MovieRow title="Horror" movies={horror} />
          <InfiniteGrid />
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;
