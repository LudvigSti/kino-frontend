import AppHeader from "../../components/AppHeader/AppHeader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import TimeTable from "../../components/TimeTable/TimeTable";
import "./movie-page.css";

const MoviePage = () => {
  //TODO make this the movie clicked on
  const movie = {
    title: "The Godfather",
    releaseYear: "1972",
    image: "The-godfather-banner.jpg",
    rating: 9.2,
    genres: ["crime", "drama"],
    director: "Francis Ford Coppola",
    duration: 175,
  };

  const screenings = [
    { time: "10:00 AM", location: "Cinema 1", duration: 175 },
    { time: "9:00 PM", location: "Cinema 1", duration: 175 },
    { time: "1:00 PM", location: "Cinema 2", duration: 175 },
    { time: "6:30 PM", location: "Cinema 3", duration: 175 },
  ];

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
