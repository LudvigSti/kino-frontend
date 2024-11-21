import React from 'react';
import './moviePoster.css';
import { FaStar } from 'react-icons/fa'; // Import a star icon from react-icons


interface MoviePosterProps {
  image: string;
  title: string;
  rating?: number;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ image, title, rating }) => {
  return (
    <div className='movie-poster'>
      <img src={image} alt={`${title}`} />
      <p className='movie-title'>{title}</p>
      {rating !== undefined && (
        <p className='movie-rating'>
          <FaStar className='star-icon' /> <p className='rating-text'>{rating}</p>
        </p>
        
      )}
    </div>
  );
};


export default MoviePoster;
