import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTA2OWVjODFhNmEyMzRlOTkyMTcxNjBjYjU1NzkzYiIsInN1YiI6IjY2MzBhYTFjNzA2ZTU2MDEyNjAyMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J_wlvsYnfmsXOkCvHV3RwIIh8CnnrJxI54Kk35XLCUo",
            },
          }
        );
        if (response) {
          setMovieCast(response.data.cast);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCast(movieId);
  }, [movieId]);

  return (
    <div>
      {movieCast && movieCast.length > 0 ? (
        <ul className={css.castList}>
          {movieCast.map((actor) => (
            <li className={css.castItem} key={actor.credit_id}>
              <img
                className={css.castImage}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <h4> {actor.name}</h4>
              <h4>Character: {actor.character}</h4>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is a problem with the actors cast.</p>
      )}
    </div>
  );
};

export default MovieCast;