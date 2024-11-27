import React, { useEffect, useRef, useState } from 'react';
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
  movieList: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movieList }) => {
  const [movies, setNewMovies] = useState<Movie[]>(movieList);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const showRatings = title === "Highest Rated";
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const checkButtonsVisibility = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
    console.log("Show Left Button:", showLeftButton);
console.log("Show Right Button:", showRightButton);

  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -650, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 650, behavior: "smooth" });
    }
  };

  useEffect(() => {
    setNewMovies(movieList);
    checkButtonsVisibility();
  }, [movieList]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkButtonsVisibility);
      return () => container.removeEventListener("scroll", checkButtonsVisibility);
    }
  }, []);

  return (
    <div
      className="movie-section"
      onMouseEnter={checkButtonsVisibility}
      onMouseLeave={() => {
        setShowLeftButton(false);
        setShowRightButton(false);
      }}
    >
      <h2>{title}</h2>
      <div className="scroll-wrapper">
        {showLeftButton && (
          <button
            className=" left-button"
            onClick={scrollLeft}
          >
            {"< "}
          </button>
        )}
        <ul className="movie-list" ref={scrollContainerRef}>
          {movies.map((movie) => (
            <Link to={`/moviepage/${movie.movieId}`} key={movie.movieId}>
              <MoviePoster
                image={movie.image}
                title={movie.title}
                rating={showRatings ? movie.rating : undefined}
              />
            </Link>
          ))}
        </ul>
        {showRightButton && (
          <button
            className=" right-button"
            onClick={scrollRight}
          >
            {" >"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieSection;
