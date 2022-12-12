import React from 'react';
import './Landing.css';
import LoginSignup from '../LoginSignup/LoginSignup';
// Landing page's nav abouts & shop
import { SideNavbar } from '../SideNavbar/SideNavbar';
import { LogoLink } from '../LogoLink/LogoLink';
import { About } from '../About/About';
import { Contact } from '../Contact/Contact';
import { Shop } from '../Shop/Shop';


export const Landing = () => {
  return (
    <> 
    <div className="root" id="home">
      <LogoLink />
    </div>
      <LoginSignup />
      <SideNavbar />
      <About />
      <Contact />
      <Shop />
    </>
  );
};

export default Landing;