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
// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';
// import { SideNavbar } from './components/SideNavbar/SideNavbar';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Donate from './components/Donate/Donate';
console.log(Donate)
// import Donate from './pages/Donate';

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
  
  const protectedRoute = useRef('routes')
  // React.Fragment 
  // If the user is logged in, then root directory will default to home route.
  if (Auth.loggedIn()) {
    protectedRoute.current =
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
          path="/donate"
          element={<Donate />}
        />
      </Routes>
  // If the user is not logged in, then root directory will default to the landing page.
  } else {
    protectedRoute.current = 
      <Routes>
        <Route 
          path="/" 
          element={ <LandingPage /> } 
        />
      </Routes>
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        {protectedRoute.current}
      </Router>
    </ApolloProvider>
  )
}

export default App;

