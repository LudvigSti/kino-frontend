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

    // Generate UserId and ProfileId
    const userId = Date.now(); // Simple unique ID generation for demonstration
    const profileId = Date.now() + 1;

    // Create User and Profile objects
    const user = {
      userId,
      email: formData.email,
      password: formData.password
    };

    const profile = {
      profileId,
      userId,
      firstname: formData.firstname,
      lastname: formData.lastname,
      dateOfBirth: formData.dob,
      icon: '',
      points: 0
    };

    // Save user and profile to local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('profile', JSON.stringify(profile));

    // Navigate to login page after registration
    navigate('/login');
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
