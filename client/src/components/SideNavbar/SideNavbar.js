import React, { useState } from 'react';
import './SideNavbar.css';

export const SideNavbar = () => {
    const [activeNav, setActiveNav] = useState('#');
    return (
        <nav>
          <a href="#" 
            onClick={() => setActiveNav('#')}
            className={activeNav === '#' ? 'active' : ''}
          >
            <h2>
                Home
            </h2>
          </a>
          <a href="#About"
            onClick={() => setActiveNav('#About')}
            className={activeNav === '#About' ? 'active' : ''}
          >
            <h2>
                About
            </h2>
          </a>
          <a href="#Contact" 
            onClick={() => setActiveNav('#Contact')}
            className={activeNav === '#Contact' ? 'active' : ''}
          >
            <h2>
                Contact
            </h2>
          </a>
          <a href="#Shop"
            onClick={() => setActiveNav('#Shop')}
            className={activeNav === '#Shop' ? 'active' : ''}
          >
            <h2>
                Shop
            </h2>
          </a>
        </nav>
    );
  };

  export default SideNavbar;