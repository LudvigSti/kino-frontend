import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';
import {HTTP_API_BASE_URL} from '../../apiConfig'


interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${HTTP_API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      if (response.ok) {
        const result = await response.json();
        const email = formData.email
        Cookies.set('user', JSON.stringify(email), { expires: 7, secure: true, sameSite: 'Strict' });
        navigate('/');
      } else {
        const errorText = await response.text();
        setError(errorText);
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
