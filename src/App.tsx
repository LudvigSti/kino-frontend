import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="landing-page" element={<LandingPage />} />
      </Routes>
      <LandingPage />
    </>
  );
}

export default App;
