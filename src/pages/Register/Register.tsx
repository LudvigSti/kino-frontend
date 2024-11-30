import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import {HTTP_API_BASE_URL} from '../../apiConfig'

interface FormData {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dob: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    dob: ''
  });

  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateDateOfBirth = (dob: string) => {
    const dateOfBirth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age >= 16;
  };

  const validateFormData = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long, contain uppercase and lowercase letters and a number');
      return false;
    }
    if (!formData.firstname) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastname) {
      setError('Last name is required');
      return false;
    }
    if (!formData.dob) {
      setError('Date of birth is required');
      return false;
    }
    if (!validateDateOfBirth(formData.dob)) {
      setError('You must be at least 16 years old');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }
    console.log(HTTP_API_BASE_URL)
    try {
      const response = await fetch(`${HTTP_API_BASE_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const users = await response.json();
        const emailExists = users.some((user: { email: string }) => user.email === formData.email);

        if (emailExists) {
          setError('Email already exists');
          return;
        }
      } else {
        console.error('Failed to fetch users');
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      return;
    }

    const userProfile = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstname,
      lastName: formData.lastname,
      dateOfBirth: formData.dob
    };

    try {
      const response = await fetch(`${HTTP_API_BASE_URL}/profile/CreateUserProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfile)
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className='register-page'>
      <div className='register-card'>
        <h2>Registrer</h2>
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
          <div className='input-group'>
            <label htmlFor='firstname'>Fornavn</label>
            <input
              type='text'
              id='firstname'
              placeholder='Skriv ditt fornavn'
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='lastname'>Etternavn</label>
            <input
              type='text'
              id='lastname'
              placeholder='Skriv ditt etternavn'
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='dob'>Fødselsdato</label>
            <input
              type='date'
              id='dob'
              placeholder='Enter your date of birth'
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          <button type='submit' className='register-button'>
            Registrer
          </button>
        </form>
        <p className='login-link'>
          Har du allerede bruker? <Link to='/login'>Logg inn</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
