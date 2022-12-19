import React from 'react';
import './Landing.css';
import Login from '../../components/Login/Login';
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import About from '../../components/About/About';
import Contact from '../../components/Contact/Contact';
import Donate from '../../components/Donate/Donate';
import PaymentSuccess from '../../components/PaymentSuccess/PaymentSuccess';



export const Landing = () => {
  return (
    <>
        <SideNavbar />
        <Login />
        <About />
        <Contact />
        <Donate />
        <PaymentSuccess />
    </>
  );
};

export default Landing;