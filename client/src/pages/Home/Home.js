import React from 'react';
import './Home.css';
import Profile from '../Profile/Profile';
import SideNavbar from '../../components/SideNavbar/SideNavbar';

export const Landing = () => {
  return (
    <>
        <SideNavbar />
        <Profile />
    </>
  );
};

export default Landing;