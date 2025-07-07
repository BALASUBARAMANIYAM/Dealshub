import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Profile from './pages/Profile';
import Watchlist from './pages/Watchlist';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setWatchlist([]);
  };

  const addToWatchlist = (deal) => {
    setWatchlist((prev) => [...prev, deal]);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<Home onAddToWatchlist={addToWatchlist} isLoggedIn={isLoggedIn} />} />
        
        <Route 
          path="/watchlist" 
          element={isLoggedIn ? (
            <Watchlist items={watchlist} isLoggedIn={isLoggedIn} />
          ) : (
            <Navigate to="/login" />
          )} 
        />
        
      <Route path="/feedback" element={<Feedback isLoggedIn={isLoggedIn} />} />

        
        <Route 
          path="/profile" 
          element={isLoggedIn ? (
            <Profile />
          ) : (
            <Navigate to="/login" />
          )} 
        />
        
        <Route 
          path="/login" 
          element={!isLoggedIn ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Navigate to="/" />
          )} 
        />
        
        <Route 
          path="/register" 
          element={!isLoggedIn ? (
            <Register />
          ) : (
            <Navigate to="/" />
          )} 
        />
      </Routes>
    </Router>
  );
}

export default App;