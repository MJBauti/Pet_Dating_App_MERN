import React from 'react';
import './Home.css';
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import CardFeed from '../../components/CardFeed/CardFeed';
import { CreatePost } from '../../components/CreatePost/CreatePost';
import Images from '../../components/Images/Images'

export const Landing = () => {
  return (
    <>  
        
        <SideNavbar />
        
        <CardFeed />
        
    </>
  );
};

export default Landing;