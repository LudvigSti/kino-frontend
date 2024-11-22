import "./movie-details.css";
import { useEffect } from 'react';

const MovieDetails = ({ movie }) => {
  const getEmbedUrl = (trailerUrl) => {
    // Ensure we extract the video ID correctly from the URL
    const videoId = trailerUrl.split('youtu.be/')[1] || trailerUrl.split('v=')[1]?.split('&')[0];
    
    // If the videoId is not valid, return a placeholder (this is optional)
    if (!videoId) {
      console.error("Invalid YouTube URL:", trailerUrl);
      return '';
    }
    
    // Return the embed URL
    return `https://youtube.com/embed/${videoId}`;
  };
  useEffect(() => {
    if (window.trustedTypes) {
      try {
        if (!window.trustedTypes.getPolicy('default')) {
          window.trustedTypes.createPolicy('default', {
            createHTML: (input) => input,
            createScript: (input) => input,
            createScriptURL: (input) => input,
          });
        }
      } catch (e) {
        // Handle unexpected errors, if any
        console.error('Failed to create or check TrustedTypes policy:', e);
      }
    }
  }, []);
  
  

  return (
    <div className='movie-details'>
      <h1>{movie.title}</h1>
      <div className='movie-banner'>
        <img src={movie.image} alt='movie banner' />
        {movie.trailer && (
          <div className="movie-trailer">
            <iframe
              width="1903"
              height="862"
              src={getEmbedUrl(movie.trailer)}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
      <div className='movie-about'>
        <h1>Details</h1>
        <p>
          <strong>Release Date:</strong>{" "}
          {new Date(movie.releaseDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
      </div>
    </div>
  );
};

export default MovieDetails;