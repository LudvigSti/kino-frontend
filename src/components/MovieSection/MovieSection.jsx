import MoviePoster from "../MoviePoster/MoviePoster";
import { Link } from "react-router-dom";
import "./movieSection.css";

const MovieSection = ({ title, movies }) => {
  return (
    <div className='movie-section'>
      <h2>{title}</h2>
      <ul className='movie-list'>
        {movies.map((movie, index) => (
          <Link to='moviepage'>
            <MoviePoster key={index} image={movie.image} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MovieSection;
