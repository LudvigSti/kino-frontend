import React from 'react';
import './moviePoster.css';

interface MoviePosterProps {
  image: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ image }) => {
  return (
    <div className='movie-poster'>
      <img src={image} alt='Movie Poster' />
    </div>
  );
};

export default MoviePoster;
