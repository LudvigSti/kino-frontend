import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/profile';
import MoviePage from './pages/MoviePage/MoviePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/moviepage" element={<MoviePage />} />
      </Routes>
    </>
  );
}

export default App;
