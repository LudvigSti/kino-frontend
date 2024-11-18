import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/profile';
import Register from './pages/Register/Register';

function App() {
  return (
    <>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
    </>
  );
}

export default App;
