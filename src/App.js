import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthContext } from './components/AuthContext'; // Import the AuthContext

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = sessionStorage.getItem('isLoggedIn');
    return storedLoggedIn ? storedLoggedIn === 'true' : false;
  });
  const navigate = useNavigate();

  const handleLogin = (token) => {
    sessionStorage.setItem('isLoggedIn', 'true'); // Set isLoggedIn to true in session storage
    sessionStorage.setItem('token', token); // Store token in session storage
    setIsLoggedIn(true); // Set isLoggedIn state to true
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    sessionStorage.setItem('isLoggedIn', 'false'); // Set isLoggedIn to false in session storage
    sessionStorage.removeItem('token'); // Remove token from session storage
    setIsLoggedIn(false); // Set isLoggedIn state to false
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
