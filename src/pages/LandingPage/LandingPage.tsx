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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([])
  const [highestRated,setHighestRated] = useState<Movie[]>([])
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [familyMovies, setFamilyMovies] = useState<Movie[]>([])
  const [returnedMovies, setReturnedMovies] = useState<Movie[]>([])


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://localhost:5001/movie");
        const data: Movie[] = await res.json();
        const now = new Date()
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(now.getMonth() - 2);
        
        const processedData = data.map(movie => ({
          ...movie,  //Loads movies with only the first image in the image array
          image: movie.images[0]
        })).sort((a, b) => new Date(b.releaseDate).getDate() - new Date(a.releaseDate).getDate());

        setFeaturedMovie(processedData[0]); // The most recent movie       
        setMovies(processedData)
        setNewMovies(processedData.filter(movie => new Date(movie.releaseDate) >= twoMonthsAgo ))
        setHighestRated(processedData.filter((movie: Movie) => movie.rating >= 7 ))
        setReturnedMovies(processedData.filter(movie => new Date(movie.releaseDate).getFullYear() < now.getFullYear() ))
        setFamilyMovies(processedData.filter(movie => movie.ageRating <= 12))


      } catch (e) {
        console.error(e);
      } finally{
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    onSearchbarChange();
  }, [search])
  
  const onSearchbarChange = () => {
    if(movies.length > 0){
      setNewMovies(movies.filter((movie: Movie) => movie.title.toLowerCase().includes(search.toLowerCase())));
      setReturnedMovies(movies.filter((movie: Movie) => movie.title.toLowerCase().includes(search.toLowerCase())));
      setHighestRated(movies.filter((movie: Movie) => movie.title.toLowerCase().includes(search.toLowerCase())));
    }
  }


  if (loading) {
    return <div className="loading-screen">Cinemas</div>; 
  }
  return (
    <div className='page'>
      <AppHeader /><SearchBar onChange={(e) => {
        setSearch(e.target.value);
        }} searchValue={search}/>
      {search === "" && featuredMovie && (
        <Link to={`/moviepage/${featuredMovie.movieId}`}>
        
        <div className="featured-movie">
          <img className="featured-image" src={featuredMovie.images[1]} alt={featuredMovie.title} />
          <h2 className="featured-title">SE {featuredMovie.title.toUpperCase()} NÅ!</h2>
        </div>
        </Link>
      )}
            
      <div className="next-movies">
        
      </div>
      <MovieSection title='New Movies' movieList={newMovies} />
      <MovieSection title='Returned Movies' movieList={returnedMovies} />
      <MovieSection title='Highest Rated' movieList={highestRated} />
      <MovieSection title="Family Movies" movieList={familyMovies} />

    </div>
  );
};

export default LandingPage;
