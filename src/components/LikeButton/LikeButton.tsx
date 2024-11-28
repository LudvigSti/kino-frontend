import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './like-button.css';

interface Movie {
    title: string;
}

interface LikeButtonProps {
    movie: Movie;
    id: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ movie }) => {
    const [liked, setLiked] = useState(localStorage.getItem(`likes-${movie.title}`) === 'true');

    const handleLike = () => {
        setLiked(!liked);
    }

    useEffect (() => {
        const localLiked = localStorage.getItem(`likes-${movie.title}`);
        console.log('localLiked', localLiked);
        if(localLiked === 'true') {
            setLiked(true);
        }
        else if (localLiked === 'false') {
            setLiked(false);
        }
    }, [movie.title]);

    useEffect(() => {
        console.log('liked', liked);
        localStorage.setItem(`likes-${movie.title}`, liked.toString());
        console.log('localStorage', localStorage);
    }, [liked]);

    return (
        <div onClick={handleLike}>
            <FaStar color={liked ? 'orange' : 'grey'} className="like_button"/>
        </div>
        );
    }

export default LikeButton;