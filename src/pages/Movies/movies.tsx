import React, { useEffect, useState } from 'react';
import MovieSection from "../../components/MovieSection/MovieSection";
import AppHeader from "../../components/AppHeader/AppHeader";
import "./movies.css";

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

const Movies: React.FC = () => {

    const [newMovies, setNewMovies] = useState<Movie[]>([])
    const [returnedMovies, setReturnedMovies] = useState<Movie[]>([])
    const [highestRated, setHighestRated] = useState<Movie[]>([])
    const [familyMovies, setFamilyMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchMovies = async () => {

            try {
                const res = await fetch("https://localhost:5001/movie")
                const data: Movie[] = await res.json();
                const now = new Date();
                const twoMonthsAgo = new Date();
                twoMonthsAgo.setMonth(now.getMonth() - 2);


                const processedData = data.map(movie => ({
                    ...movie,
                    image: movie.images[0]
                }))

                setNewMovies(processedData.filter(movie => new Date(movie.releaseDate) >= twoMonthsAgo ))
                setHighestRated(processedData.filter(movie => movie.rating >= 7))
                setFamilyMovies(processedData.filter(movie => movie.ageRating <= 12))
                setReturnedMovies(processedData.filter(movie => new Date(movie.releaseDate).getFullYear() < now.getFullYear() ))
                
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    if(loading) {
        return <div className="loading-screen">Cinemas</div>; 
    }
    return (
        <div className="filmer-page">
          <AppHeader />
          <div className="filmer-sections">
            <MovieSection title="New Movies" movieList={newMovies} />
            <MovieSection title="Comeback Movies" movieList={returnedMovies} />
            <MovieSection title="Highest Rated" movieList={highestRated} />
            <MovieSection title="Family Movies" movieList={familyMovies} />
          </div>
        </div>
      );
    

}
export default Movies;