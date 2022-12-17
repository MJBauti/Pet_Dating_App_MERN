import React, { useState, Fragment } from 'react';
import './SideNavbar.css';
import { Link, useLocation} from "react-router-dom";
import logoPng from "../../Assets/logo.png";
import Auth from "../../utils/auth";

export const SideNavbar = () => {
    const location = useLocation();
    const [activeNav, setActiveNav] = useState('#');

    function refreshPage() {
      window.location.reload(false);
    }

    return (
        <div className="navAll">
        
          
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} >
            <img src={logoPng} alt="Logo" className="img"/>
          </Link>
          
          <nav>
            {/* If logged in, the users will see this */}
            {Auth.loggedIn() ? (
              <>
                <Link to="/" onClick={location.pathname === '/' ? 'active' : ''}>
                  <h2>Home</h2>
                </Link>
                <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} >
                  <h2>Profile</h2>
                </Link>
                
                <Link to="/messages" className={location.pathname === '/messages' ? 'active' : ''} >
                  <h2>Messages</h2>
                </Link>

                <Link to="/donate" className={location.pathname === '/donate' ? 'active' : ''} >
                  <h2 className='shopHover' >Donate</h2>
                </Link>

                <Link to="/" onClick={Auth.logout}>
                  <h2 className='Logout'>Logout⬆</h2>
                </Link>
              </>
            ) : (
              <>
                <a href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''} >
                  <h2> Home </h2>
                </a>
                {/* If not logged in, the users will see this */}
                <a href="#About" onClick={() => setActiveNav('#About')} className={activeNav === '#About' ? 'active' : ''} >
                  <h2> About </h2>
                </a>
                
                <a href="#Contact" onClick={() => setActiveNav('#Contact')} className={activeNav === '#Contact' ? 'active' : ''} >
                  <h2> Contact </h2>
                </a>

                <Link to="/donate" className={location.pathname === '/donate' ? 'active' : ''}  >
                  <h2 className='shopHover'>Donate</h2>
                </Link>
              </>
            )}
            
          </nav>
        </div>
    );
  };

  export default SideNavbar;