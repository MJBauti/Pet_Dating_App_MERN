import React from 'react';
import './Landing.css';
import Login from '../../components/Login/Login';
// Landing page's nav abouts & shop
// import { SideNavbar } from './SideNavbar/SideNavbar';
import { About } from '../../components/About/About';
import { Contact } from '../../components/Contact/Contact';
import MainBody from '../../components/MainBodyLayout/MainBody';
// import { Shop } from "../components/Shop/Shop";


export const Landing = () => {
  return (
    <MainBody>
      <Login />
    </MainBody>
  );
};

export default Landing;