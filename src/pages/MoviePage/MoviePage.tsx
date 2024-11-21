import { useParams } from "react-router-dom";
import AppHeader from "../../components/AppHeader/AppHeader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import TimeTable from "../../components/TimeTable/TimeTable";
import "./movie-page.css";
import { useEffect, useState } from "react";

interface Movie {
  movieId: number;
  title: string;
  releaseYear: string;
  image: string;
  rating: number;
  genres: string[];
  director: string;
  duration: number;
}
const MoviePage = () => {
  const { id }  = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [screenings, setScreenings] = useState<any[]>([]);

  
  useEffect( ()=> {
    const fetchMovieDetails = async () => { 
      try {
    const res = await fetch(`https://localhost:5001/movie/${id}`);
    const data = await res.json()

    setMovie({
      ...data,
      image: data.images[0]
    })
  }
  catch (e) {
  }}
  fetchMovieDetails(); 
  }, [id])

  useEffect( ()=> {
    const fetchScreenings = async () => { 
      try {
    const res = await fetch(`https://localhost:5001/screening/getScreeningsByMovieId/${id}`);
    const data = await res.json()

    setScreenings(data)
  }
  catch (e) {
  }}
  fetchScreenings(); 
  }, [id])

  if (!movie) {
    return <div className="loading-screen">Cinemas</div>; 
  }

  return (
    <div className='page'>
      <AppHeader />
      <div className='movie-page'>
        <MovieDetails movie={movie} />
        <TimeTable screenings={screenings} movie={movie}/>
      </div>
    </div>
  );
};

export default MoviePage;
