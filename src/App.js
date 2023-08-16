import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";

const API_KEY = "8171481b";

const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

//--------------------------------------------------------------------------------------


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchMovies("all");
  }, []);

  const searchMovies = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();

    setMovies(data.Search);
  };

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

// ----------------------------------------------------------

  return (
    <div className="app">
      <h1>Movieland</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={searchHandler}
        />

        <img
          src={SearchIcon}
          alt="search img"
          onClick={() => searchMovies(searchTerm)}
        />

      </div>

        {movies.length > 0 ? 
        (
          <div className="container">

              {movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}

          </div>
        ) 

        : 
        
        (
          <div className="empty">
            <h2>No Movies Found!</h2>
          </div>
        )}

      </div>
    
  );
};

export default App;
