import React from 'react';
import './Donate.css';
import Donate from '../../components/Donate/Donate';
import SideNavbar from '../../components/SideNavbar/SideNavbar';

export const Landing = () => {
  return (
    <>
        <SideNavbar />
        <Donate />
    </>
  );
};

export default Landing;