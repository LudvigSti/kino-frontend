import React from 'react';
import MoviePoster from "../MoviePoster/MoviePoster";
import { Link } from "react-router-dom";
import "./movieSection.css";

interface Movie {
  movieId: number;
  image: string;
  title: string
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies }) => {
  return (
    <div className='movie-section'>
      <h2>{title}</h2>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <Link to={`/moviepage/${movie.movieId}`} key= {movie.movieId}>
            <MoviePoster image={movie.image} title={movie.title} />
          </Link>
          
        ))}
        
      </ul>
    </div>
  );
};

export default MovieSection;
