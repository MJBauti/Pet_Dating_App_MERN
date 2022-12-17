import React from 'react';
import './Profile.css';
import Profile from '../../components/Profile/Profile';
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