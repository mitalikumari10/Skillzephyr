import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context';
import logo from '../homepage/images/logo.png';
import { toast } from 'react-toastify';

const Header = () => {
  const { isauthenticated, setisauthenticated } = useAuth();
  const [kebabMenuOpen, setKebabMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setisauthenticated(!!token);
  }, [setisauthenticated]);

  const handleKebabMenuToggle = () => {
    setKebabMenuOpen(prevState => !prevState);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(prevState => !prevState);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setisauthenticated(false);
    toast.success('Logged out!');
    window.location.href = '/';
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/"><li className="logo"><img src={logo} alt="Logo" /></li></Link>
      </div>
     
      <div className="otheroptions">
        <Link to="/slide2"><li>Courses</li></Link>
        <Link to="/profile"><li>Profile</li></Link>
        {isauthenticated ? (
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
        ) : (
          <button onClick={handleLogin} style={{ cursor: "pointer" }}>Login</button>
        )}
      </div>
      
      <div className="kebab-menu-container">
        <div className="kebab-menu-icon" onClick={handleKebabMenuToggle}>
          &#8942; {/* Kebab menu icon */}
        </div>
        <div className={`kebab-menu ${kebabMenuOpen ? 'show' : ''}`}>
          <li onClick={handleThemeToggle}>
            {isDarkMode ? 'Light Mode' : 'Switch to Dark Mode'}
          </li>
          <Link to="/policy"><li>Policy</li></Link>
          <li>Review</li>
        </div>
      </div>
      <div className={`menu-overlay ${kebabMenuOpen ? 'show' : ''}`} onClick={handleKebabMenuToggle}></div>
    </div>
  );
};

export default Header;
