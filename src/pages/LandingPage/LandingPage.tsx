import React, { useEffect, useState } from 'react';
import MovieSection from "../../components/MovieSection/MovieSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import AppHeader from "../../components/AppHeader/AppHeader";
import "./landingPage.css";

interface Movie {
  title: string;
  rating: number;
  ageRating: number;
  duration: number;
  director: string;
  image: string;
  releaseYear: Date; 

}

const LandingPage: React.FC = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([])
  const [popularMovies,setPopularMovies] = useState<Movie[]>([])
  const [highestRated,setHighestRated] = useState<Movie[]>([])

  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://localhost:5001/movie");
        const data: Movie[] = await res.json();
  
        setNewMovies(data);
        setPopularMovies(data);
        setHighestRated(data.filter((movie: Movie) => movie.rating >= 7 ))

      } catch (e) {
        console.error(e);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className='page'>
      <AppHeader />
      <SearchBar />
      <MovieSection title='New Movies' movies={newMovies} />
      <MovieSection title='Popular Movies' movies={popularMovies} />
      <MovieSection title='Highest Rated' movies={highestRated} />
    </div>
  );
};

export default LandingPage;
