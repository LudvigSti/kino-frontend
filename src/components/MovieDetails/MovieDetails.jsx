import "./movie-details.css";
import { getImageURL } from "../../Utils/image-util";

const MovieDetails = ({ movie }) => {
  return (
    <div className='movie-details'>
      <img src={getImageURL(movie.image)} alt='movie banner' />
      <h1>{movie.title}</h1>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>
      <p>Genres: {movie.genres.join(", ")}</p>
      <p>Director: {movie.director}</p>
    </div>
  );
};

export default MovieDetails;
