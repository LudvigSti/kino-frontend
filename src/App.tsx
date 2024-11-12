import React from 'react';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import AppHeader from './components/AppHeader/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <LandingPage />
    </div>
  );
}

export default App;
