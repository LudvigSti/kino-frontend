import React from 'react';
import './moviePoster.css';

interface MoviePosterProps {
  image: string;
  title: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ image, title }) => {
  return (
    <div className='movie-poster'>
      <img src={image} alt={`${title}`} />
      <p className='movite-title'>{title}</p>
    </div>
  );
};

export default MoviePoster;
