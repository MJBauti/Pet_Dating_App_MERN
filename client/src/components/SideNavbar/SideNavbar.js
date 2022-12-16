// import React, { useState, Fragment } from 'react';
import './SideNavbar.css';
import { Link, useLocation} from "react-router-dom";
import logoPng from "../../Assets/logo.png"

export const SideNavbar = () => {
    const location = useLocation();

    return (
        <div className="navAll">
          <Link to="/">
            <img src={logoPng} alt="Logo" className="img"/>
          </Link>
          <nav>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              <h2>Home</h2>
            </Link>
            <Link
              to="/about-me"
              className={location.pathname === '/about-me' ? 'active' : ''}
            >
              <h2>About</h2>
            </Link>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              <h2>Contact</h2>
            </Link>
            <Link
              to="/donate"
              className={location.pathname === '/donate' ? 'active' : ''}
            >
              <h2>Donate</h2>
            </Link>
          </nav>
        </div>
    );
  };

  export default SideNavbar;