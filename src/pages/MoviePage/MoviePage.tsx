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
  //TODO make this the movie clicked on
  const { id }  = useParams()
  console.log("Movie ID:", id);
  const [movie, setMovie] = useState<Movie | null>(null);

  
  useEffect( ()=> {
    const fetchMovieDetails = async () => { 
      try {
    const res = await fetch(`https://localhost:5001/movie/${id}`);
    const data = await res.json()

    setMovie({
      ...data,
      image: data.images[1]
    })
  }
  catch (e) {
  }}
  fetchMovieDetails(); 
  }, [id])

  const screenings = [
    { time: "10:00 AM", location: "Cinema 1", duration: 175 },
    { time: "9:00 PM", location: "Cinema 1", duration: 175 },
    { time: "1:00 PM", location: "Cinema 2", duration: 175 },
    { time: "6:30 PM", location: "Cinema 3", duration: 175 },
  ];
  if (!movie) {
    return <div className="loading-screen">Loading...</div>; 
  }

  return (
    <div className='page'>
      <AppHeader />
      <div className='movie-page'>
        <MovieDetails movie={movie} />
        <TimeTable screenings={screenings} />
      </div>
    </div>
  );
};

export default MoviePage;
