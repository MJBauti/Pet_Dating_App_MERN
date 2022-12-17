import React from 'react';
import './Home.css';
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import CardFeed from '../../components/CardFeed/CardFeed';

export const Landing = () => {
  return (
    <>
      
        <SideNavbar />
        <CardFeed />

    </>
  );
};

export default Landing;