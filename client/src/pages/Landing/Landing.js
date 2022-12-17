import React from 'react';
import './Landing.css';
import Login from '../../components/Login/Login';
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';



export const Landing = () => {
  return (
    <>
        <SideNavbar />
        <Login />
        <About />
        <Contact />
    </>
  );
};

export default Landing;