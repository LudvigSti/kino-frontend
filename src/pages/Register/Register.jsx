import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        dob: ''
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateDateOfBirth = (dob) => {
    const dateOfBirth = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
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
      setError('You must be at least 18 years old');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const users = await response.json();
        const emailExists = users.some(user => user.email === formData.email);

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
      const response = await fetch('http://localhost:5000/profile/CreateUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfile)
    });

    if(response.ok) {
      navigate('/login');
    } else{
      console.error('Failed to register user');
    }
  } catch (error) {
    console.error('Error: ', error)
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
              value = {formData.email}
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
          <div className="input-group">
          <label htmlFor="dob">Fødselsdato</label>
          <input
            type="date"
            id="dob"
            placeholder="Enter your date of birth"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type='submit' className='register-button'>
            Registrer
        </button>
        </form>
        <p className='login-link'>
          Har du allerede bruker? <a href='/login'>Logg inn</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
