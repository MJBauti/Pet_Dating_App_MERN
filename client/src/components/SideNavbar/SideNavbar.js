import React, { useState, Fragment } from 'react';
import './SideNavbar.css';
import { Link, useLocation} from "react-router-dom";
import logoPng from "../../Assets/logo.png";
import Auth from "../../utils/auth";

export const SideNavbar = () => {
    const location = useLocation();

    function refreshPage() {
      window.location.reload(false);
    }

    return (
        <div className="navAll">
          <Link 
            to="/">
            <img src={logoPng} alt="Logo" className="img"/>
          </Link>
          <nav>
            <Link
              to="/"
              onClick={refreshPage}
            >
              <h2>Home</h2>
            </Link>
          
            {Auth.loggedIn() ? (
              <>
              <Link
                to="/contact"
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                <h2>Contact</h2>
              </Link>
              <Link
                to="/about"
                className={location.pathname === '/about' ? 'active' : ''}
              >
                <h2>Shop</h2>
              </Link>
              <Link
                to="/shop"
                className={location.pathname === '/shop' ? 'active' : ''}
              >
                <h2>Shop</h2>
              </Link>
              <Link
                to="/"
                onClick={Auth.logout}>
                  <h2 className='Logout'>Logout⬆</h2>
                </Link>
              </>
            ) : (
              <a></a>
            )}
            
          </nav>
        </div>
    );
  };

  export default SideNavbar;