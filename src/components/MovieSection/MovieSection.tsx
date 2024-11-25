import React, { useEffect, useRef } from 'react';
import MoviePoster from "../MoviePoster/MoviePoster";
import { useState } from "react";
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
  movieList: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movieList }) => {

const [movies, setNewMovies] = useState<Movie[]>(movieList)
const showRatings = title === "Highest Rated"
const scrollContainerRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setNewMovies(movieList);
    console.log(movies);
  }, [movieList]);

  return (
    <div className='movie-section'>
      <h2>{title}</h2>
     
      <div className='scroll-wrapper'>
      <ul className='movie-list'>
        {movies.map((movie) => (
          <Link to={`/moviepage/${movie.movieId}`} key= {movie.movieId}>
            <MoviePoster image={movie.image} title={movie.title} rating={showRatings ? movie.rating : undefined} />
          </Link>
          
        ))}
      </ul>
      </div>
    </div>
  );
};

export default MovieSection;