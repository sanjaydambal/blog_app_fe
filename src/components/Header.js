// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, handleLogout }) => {
  console.log(isLoggedIn)
  const logo = require('../assets/logo1.png');

  return (
    <header className="navbar navbar-light bg-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="My Blog" style={{ width: '8%', height: '10%' }} />
        </Link>
        <div className="navbar-nav flex-row">
          {isLoggedIn ? (
            <>
              
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
             <Link to="/" className="nav-link">Home</Link>
              <div style={{ width: '10px' }} />
              <Link to="/login" className="nav-link">Login</Link>
              <div style={{ width: '10px' }} />
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
