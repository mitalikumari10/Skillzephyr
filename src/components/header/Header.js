import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../homepage/images/logo.png';

const Header = () => {
  const [kebabMenuOpen, setKebabMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleKebabMenuToggle = () => {
    setKebabMenuOpen(!kebabMenuOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
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
        <Link to="/login"><li>Login</li></Link>
      </div>
      
      <div className="kebab-menu-container">
        <div className="kebab-menu-icon" onClick={handleKebabMenuToggle}>
          &#8942; {/* Kebab menu icon */}
        </div>
        <div className={`kebab-menu ${kebabMenuOpen ? 'show' : ''}`}>
          <li onClick={handleThemeToggle}>
            {isDarkMode ? 'Light Mode' : 'Switch to Dark Mode'}
          </li>
          <li>Policy</li>
          <li>Review</li>
        </div>
      </div>
      <div className={`menu-overlay ${kebabMenuOpen ? 'show' : ''}`} onClick={handleKebabMenuToggle}></div>
    </div>
  );
};

export default Header;
