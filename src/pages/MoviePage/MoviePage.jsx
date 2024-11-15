import AppHeader from "../../components/AppHeader/AppHeader";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

const MoviePage = () => {
  //TODO make this the movie clicked on
  const movie = {
    title: "The Godfather",
    ReleaseYear: "1972",
    image: "The-godfather-banner.jpg",
    rating: 9.2,
    genres: ["crime", "drama"],
    director: "Francis Ford Coppola",
  };

  return (
    <div className='page'>
      <AppHeader />
      <MovieDetails movie={movie} />
    </div>
  );
};

export default MoviePage;
