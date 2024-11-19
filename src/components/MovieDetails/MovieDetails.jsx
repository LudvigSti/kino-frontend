import "./movie-details.css";

const MovieDetails = ({ movie }) => {
  return (
    <div className='movie-details'>
      <h1>{movie.title}</h1>
      <div className='movie-banner'>
        <img src={movie.image} alt='movie banner' />
      </div>
      
      {movie.trailer && (
        <div className="movie-trailer">
          <h3>Watch the Trailer</h3>
          <iframe
            src={movie.trailer}
            title="Movie Trailer"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      <div className='movie-about'>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
      </div>
    </div>
  );
};

export default MovieDetails;
