import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = (token) => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
