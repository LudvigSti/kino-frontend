import MovieSection from "../../components/MovieSection/MovieSection";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./landingPage.css";
const LandingPage = () => {
  const movies = [
    { image: "path_to_image.jpg" },
    { image: "path_to_image.jpg" },
    { image: "path_to_image.jpg" },
    { image: "path_to_image.jpg" },
    { image: "path_to_image.jpg" },
  ];

  return (
    <div className='page'>
      <SearchBar />
      <MovieSection title='New Movies' movies={movies} />
      <MovieSection title='Popular Movies' movies={movies} />
    </div>
  );
};

export default LandingPage;
