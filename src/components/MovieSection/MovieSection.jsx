import MoviePoster from "../MoviePoster/MoviePoster";
import "./movieSection.css";

const MovieSection = ({ title, movies }) => {
  return (
    <div className='movie-section'>
      <h2>{title}</h2>
      <ul className='movie-list'>
        {movies.map((movie, index) => (
          <MoviePoster key={index} image={movie.image} />
        ))}
      </ul>
    </div>
  );
};

export default MovieSection;
