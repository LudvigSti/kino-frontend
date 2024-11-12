import "./moviePoster.css";

const MoviePoster = ({ image }) => {
  return (
    <div className='movie-poster'>
      <img src={image} alt='Movie Poster' />
    </div>
  );
};

export default MoviePoster;
