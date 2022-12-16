import React, {useRef} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import Auth from "./utils/auth";
import LandingPage from "./pages/Landing/Landing";
import Home from "./pages/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Shop from './components/Shop/Shop';
import Detail from './pages/Detail';
import Login from './components/Login/Login';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import { SideNavbar } from './components/SideNavbar/SideNavbar';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import MainBody from './components/MainBodyLayout/MainBody';
import AuthProvider from './components/AuthProvider/AuthProvider';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  
  return (
    <ApolloProvider client={client}>
        <Router>
          <MainBody>
            <AuthProvider>
              <Routes>
                <Route 
                  path= "/" 
                  element = { <Home /> } 
                />
                <Route 
                  path="/about-me" 
                  element={<About />} 
                />
                <Route 
                  path="/contact" 
                  element={<Contact />} 
                />
                <Route 
                  path="/shop" 
                  element={<Shop />} 
                />
                <Route 
                  path="/login" 
                  element={ <LandingPage /> } 
                />
              </Routes>
            </AuthProvider>
          </MainBody>
        </Router>
    </ApolloProvider>
  )
}

export default App;

