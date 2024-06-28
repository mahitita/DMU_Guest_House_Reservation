// Header.js
import React from 'react';
import { useNavigate , Link} from 'react-router-dom';
import logo from '../assets/img/logo.png';
import '../styles/style.css';
import '../pages/Login'

const Header = () => {

  return (
    <header className="header">
      <nav>
        <div className="nav__bar">
          <div className="logo">
            <a href="#"><img src={logo} alt="logo" /></a>
          </div>
          <div className="nav__menu__btn" id="menu-btn">
            <i className="ri-menu-line"></i>
          </div>
        </div>
        <ul className="nav__links" id="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#service">Services</a></li>
          <li><a href="#explore">Explore</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <Link to="/Login" className="btn nav__btn">Sign In</Link>
      </nav>
    </header>
  );
};

export default Header;
