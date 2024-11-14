import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve user from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedProfile = JSON.parse(localStorage.getItem('profile'));

    if (storedUser && storedProfile && storedUser.email === formData.email && storedUser.password === formData.password) {
      // Save user data in cookies
      const userData = {
        ...storedUser,
        ...storedProfile
      };

      Cookies.set('user', JSON.stringify(userData), { expires: 7 });

      // Navigate to home page after successful login
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='login-page'>
      <div className='login-card'>
        <h2>Logg inn</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>E-post</label>
            <input
              type='text'
              id='email'
              placeholder='Skriv din e-post'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Passord</label>
            <input
              type='password'
              id='password'
              placeholder='Skriv ditt passord'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='login-button'>
            Logg inn
          </button>
          {error && <p className='error-message'>{error}</p>}
        </form>
        <p className='register-link'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
