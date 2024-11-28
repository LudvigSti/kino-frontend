import React, { useEffect, useState } from 'react';
import MovieSection from "../../components/MovieSection/MovieSection";
import AppHeader from "../../components/AppHeader/AppHeader";
import "./movies.css";
import SearchBar from '../../components/SearchBar/SearchBar';
import { Console } from 'console';
import MoviePoster from '../../components/MoviePoster/MoviePoster';

interface Movie {
  movieId: number;
  title: string;
  rating: number;
  ageRating: number;
  duration: number;
  director: string;
  image: string;
  releaseDate: string;
  images: string[];
}

const Movies: React.FC = () => {
    //Movies from API call
    const [allMovies, setAllMovies] = useState<Movie[]>([])

    //Movies filtered with searchbar
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>(allMovies)

    //Filters
    const [movieFilters, setMovieFilters] = useState<string[]>([])

    const [sortMoviesOption, setSortMovies] = useState<string>("Title")

    //Filter options
    const genres = ["All","Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Romance", "Science Fiction", "Thriller", "Western"]
    const ageRatings = ["All","0", "7", "12", "15", "18"]
    const durations = ["All", "0-60", "60-120", "120-180", "180-240", "240-300", "300-360"]
    const ratings = ["All", "0-2", "2-4", "4-6", "7-10"]

    //Sorting options
    const sortOptions = ["Title", "Rating", "Release Date"]

    //const [selectedGenre, setSelectedGenre] = useState<string>("All")
    const [selectedAgeRating, setSelectedAgeRating] = useState<string>("All")
    const [selectedDuration, setSelectedDuration] = useState<string>("All")
    const [selectedRating, setSelectedRating] = useState<string>("All")

    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    //Get date two months ago
    const now = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(now.getMonth() - 2);

    const filterMovies = () => {
        let filteredMovies = allMovies
        /*if(selectedGenre !== "All") {
            filteredMovies = filteredMovies.filter(movie => movie.genres.includes(selectedGenre))
        }*/
        if(selectedAgeRating !== "All") {
            filteredMovies = filteredMovies.filter(movie => movie.ageRating <= parseInt(selectedAgeRating))
            console.log(selectedAgeRating)
        }
        if(selectedDuration !== "All") {
            const duration = selectedDuration.split("-")
            filteredMovies = filteredMovies.filter(movie => movie.duration >= parseInt(duration[0]) && movie.duration <= parseInt(duration[1]))
        }
        if(selectedRating !== "All") {
            const rating = selectedRating.split("-")
            filteredMovies = filteredMovies.filter(movie => movie.rating >= parseInt(rating[0]) && movie.rating <= parseInt(rating[1]))
        }
        setFilteredMovies(filteredMovies)
    }

    const sortMovies = () => {
        const sortedMovies = [...filteredMovies];
        switch(sortMoviesOption) {
            case "Title":
                setFilteredMovies(sortedMovies.sort((a, b) => a.title.localeCompare(b.title)))
                break;
            case "Rating":
                setFilteredMovies(sortedMovies.sort((a, b) => b.rating - a.rating))
                break;
            case "Release Date":
                setFilteredMovies(sortedMovies.sort((a, b) => new Date(b.releaseDate.split("-")[0]).getTime() - new Date(a.releaseDate.split("-")[0]).getTime() ))
                break;
            }
    }

  const onSearchbarChange = () => {
        if(allMovies.length > 0){
            setFilteredMovies(allMovies.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())))
        }
    }


    const fetchMovies = async () => {
        try {
            const res = await fetch("https://localhost:5001/movie");
            const data: Movie[] = await res.json();


            const processedData = data.map(movie => ({
                ...movie,
                image: movie.images[0]
            }))
            
            processedData.sort((a, b) => a.title.localeCompare(b.title))
            setAllMovies(processedData)
            
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchMovies()
    }, [])

    useEffect(() => {
        filterMovies()
    }, [selectedAgeRating, selectedDuration, selectedRating])

    useEffect(() => {
        setFilteredMovies(allMovies)
    }, [allMovies])

  useEffect(() => {
    onSearchbarChange();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    sortMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortMoviesOption])
  

    if(loading) {
        return <div className="loading-screen">Cinemas</div>; 
    }
    return (
        <div className="filmer-page">
          <AppHeader />
          <SearchBar onChange={(e) => {setSearch(e.target.value)}} searchValue={search}/>
            <div className='filter-section'>
                <div className="filter-item">
                    <label>Age Rating:</label>
                    <select onChange={(e) => setSelectedAgeRating(e.target.value)}>
                        {ageRatings.map(ageRating => <option key={ageRating} value={ageRating}>{ageRating}</option>)}
                    </select>
                </div>
                <div className="filter-item">
                    <label>Duration:</label>
                    <select onChange={(e) => setSelectedDuration(e.target.value)}>
                        {durations.map(duration => <option key={duration} value={duration}>{duration}</option>)}
                    </select>
                </div>
                <div className="filter-item">
                    <label>Rating:</label>
                    <select onChange={(e) => setSelectedRating(e.target.value)}>
                        {ratings.map(rating => <option key={rating} value={rating}>{rating}</option>)}
                    </select>
                </div>
                <div className="filter-item">
                    <label>Genre:</label>
                    <select onChange={(e) => setMovieFilters([...movieFilters, e.target.value])}>
                        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                    </select>
                </div>  
            </div>
            <div className='sort-section'>
                <label>Sort by:</label>
                <select onChange={(e) => setSortMovies(e.target.value)}>
                    {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            </div>
          <div className="all-films-section">
            {filteredMovies.map( (movie) => 
            (<MoviePoster 
            key ={movie.movieId}
            image= {movie.image}
            title={movie.title}
            rating={undefined} 
            />
            ))}
          </div>
        </div>
      );
    

}
export default Movies;