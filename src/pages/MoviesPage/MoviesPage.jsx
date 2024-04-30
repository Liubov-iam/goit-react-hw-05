import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handleSearch = async (term) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTA2OWVjODFhNmEyMzRlOTkyMTcxNjBjYjU1NzkzYiIsInN1YiI6IjY2MzBhYTFjNzA2ZTU2MDEyNjAyMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J_wlvsYnfmsXOkCvHV3RwIIh8CnnrJxI54Kk35XLCUo",
            },
          }
        );
        if (response.data.results.length === 0) {
          setSearchResults([]);
          setSearchMessage("No results found.");
        } else {
          setSearchResults(response.data.results);
          setSearchMessage("");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
        setSearchMessage(
          "Error fetching search results. Please try again later."
        );
      }
      setLoading(false);
    };

    const query = searchParams.get("query");
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <h2>Search Results</h2>
      {loading && <p>Loading...</p>}
      {!loading && searchMessage && <p>{searchMessage}</p>}
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;