import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../homepage/images/logo.webp';
import search from '../homepage/images/search.png';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className="navbar">
       <Link to="/"><li className="logo"><img src={logo} alt='Streamify Logo'/></li></Link>
      <div className="menu-icon" onClick={handleMenuToggle}>
        &#9776;
      </div>
      <ul className={`menu ${menuOpen ? 'open' : ''}`}>
       
        <Link to="/movies"><li>Movies</li></Link>
        <Link to="/rent"><li>Rent</li></Link>
        
        <li>
          <div className="search-container">
            <input type="text" placeholder="GPT Search"/>
            <button className="searchbutton"><img src={search} alt="Search" width={"35px"} /></button>
          </div>
        </li>
        <li>
          <select>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </li>
        <Link to="/profile"><li>Profile</li></Link>
        <Link to="/login"><li>Login</li></Link>
      </ul>
      <div className={`menu-overlay ${menuOpen ? 'show' : ''}`} onClick={handleMenuToggle}></div>
    </div>
  );
}

export default Header;
