import React from 'react';
import './Posts.css';
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import Posts from '../../components/Posts/Posts';

export const Landing = () => {
  return (
    <>
      
        <SideNavbar />
        <Posts />

    </>
  );
};

export default Landing;