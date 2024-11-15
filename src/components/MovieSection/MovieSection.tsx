import React from 'react';
import MoviePoster from "../MoviePoster/MoviePoster";
import "./movieSection.css";

interface Movie {
  image: string;
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
        {movies.map((movie, index) => (
          <MoviePoster key={index} image={movie.image} />
        ))}
      </ul>
    </div>
  );
};

export default MovieSection;
