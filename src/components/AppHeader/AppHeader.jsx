import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import './appHeader.css';

const AppHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    Cookies.remove('user');
    window.location.reload();
  };

  const handleShowProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`http://localhost:5000/profile/getProfileByUserId?userId=${user.userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: ''
          });

          if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData);
          } else {
            console.error('Failed to fetch profile', user.userId);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className='app-header'>
      <h1 className='home-button' onClick={() => navigate('/')}>Cinemas</h1>
      <nav>
        <ul>
          <li>
            <a href='#filmer'>Filmer</a>
          </li>
          <li>
            <a href='#kinoer'>Kinoer</a>
          </li>
          {user ? (
            <li className='header-item user-info' onClick={toggleDropdown} ref={dropdownRef}>
              <img src='/images/profile_vector.png' alt='User Icon' className='user-icon' />
              <span>{profile ? profile.firstName : 'User'}</span>
              {dropdownVisible && (
                <div className='dropdown-menu'>
                  <button onClick={handleShowProfile}>Vis Profil</button>
                  <button onClick={() => alert('Innstillinger')}>Innstillinger</button>
                  <button onClick={handleLogout}>Logg ut</button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <a href='/login'>Logg inn</a>
              </li>
              <li>
                <a href='/register'>Registrer</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
