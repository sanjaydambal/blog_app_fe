import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from'react-router-dom';
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
const navigate = useNavigate();
  const handleLogin = (token) => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};