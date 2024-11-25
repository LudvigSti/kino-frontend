import React, { useEffect, useState } from 'react';
import MovieSection from "../../components/MovieSection/MovieSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import AppHeader from "../../components/AppHeader/AppHeader";
import "./landingPage.css";
import { Link } from 'react-router-dom';


interface Movie {
  movieId: number;
  title: string;
  rating: number;
  ageRating: number;
  duration: number;
  director: string;
  image: string;
  releaseDate: Date; 
  images: string[];

}

const LandingPage: React.FC = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([])
  const [popularMovies,setPopularMovies] = useState<Movie[]>([])
  const [highestRated,setHighestRated] = useState<Movie[]>([])
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://localhost:5001/movie");
        const data: Movie[] = await res.json();
        
        const processedData = data.map(movie => ({
          ...movie,  //Loads movies with only the first image in the image array
          image: movie.images[0]
        }))  .sort((a, b) => new Date(b.releaseDate).getDate() - new Date(a.releaseDate).getDate());

        setFeaturedMovie(processedData[0]); // The most recent movie       

        setNewMovies(processedData);
        setPopularMovies(processedData);
        setHighestRated(processedData.filter((movie: Movie) => movie.rating >= 7 ))

      } catch (e) {
        console.error(e);
      } finally{
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  if (loading) {
    return <div className="loading-screen">Cinemas</div>; 
  }
  return (
    <div className='page'>
      <AppHeader />
      <SearchBar />
      {featuredMovie && (
        <Link to={`/moviepage/${featuredMovie.movieId}`}> 
        <div className="featured-movie">
          <img className="featured-image" src={featuredMovie.images[1]} alt={featuredMovie.title} />
          <h2 className="featured-title">SE {featuredMovie.title.toUpperCase()} NÅ!</h2>
        </div>
        </Link>
      )}
      <div className="next-movies">
        
      </div>
      <MovieSection title='New Movies' movies={newMovies} />
      <MovieSection title='Popular Movies' movies={popularMovies} />
      <MovieSection title='Highest Rated' movies={highestRated} />
    </div>
  );
};

export default LandingPage;
