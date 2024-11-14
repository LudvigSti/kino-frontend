import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import './appHeader.css';

const AppHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    Cookies.remove('user');
    window.location.reload();
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

  return (
    <header className='app-header'>
      <h1>Cinemas</h1>
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
              <span>{user.firstname}</span>
              {dropdownVisible && (
                <div className='dropdown-menu'>
                  <button onClick={() => alert('Vis profil')}>Vis Profil</button>
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
