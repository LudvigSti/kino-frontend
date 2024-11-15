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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const users = await response.json();
      const user = users.find(user => user.email === formData.email && user.password === formData.password);
      
      if (user) {
        Cookies.set('user', JSON.stringify(user), { expires: 7 });
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else {
      setError('Failed to fetch users');
    }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again');
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
