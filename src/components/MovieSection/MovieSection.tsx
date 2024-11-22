import React from 'react';
import MoviePoster from "../MoviePoster/MoviePoster";
import { Link } from "react-router-dom";
import "./movieSection.css";

interface Movie {
  movieId: number;
  image: string;
  title: string;
  rating: number;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies }) => {
const showRatings = title === "Highest Rated"

  return (
    <div className='movie-section'>
      <h2>{title}</h2>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <Link to={`/moviepage/${movie.movieId}`} key= {movie.movieId}>
            <MoviePoster image={movie.image} title={movie.title} rating={showRatings ? movie.rating : undefined} />
          </Link>
          
        ))}
        
      </ul>
    </div>
  );
};

export default MovieSection;
