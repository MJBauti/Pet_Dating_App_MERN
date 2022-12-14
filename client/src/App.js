import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import Auth from "./utils/auth";
import LandingPage from "./pages/Landing";
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Shop from './components/Shop/Shop';
import Detail from './pages/Detail';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';

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
  var protectedRoute;

  // React.Fragment 
  // If the user is logged in, then root directory will default to home route.
  if (Auth.loggedIn()) {
    protectedRoute = (
      <Routes>
        <Route 
          path= "/" 
          element = { <Home /> } 
        />
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />
        {/* <StoreProvider>
          <Route 
            path="/shop" 
            element={<Shop />} 
          />
          <Route 
            path="/success" 
            element={<Success />} 
          />
          <Route 
            path="/products/:id" 
            element={<Detail />} 
          />
        </StoreProvider> */}
      </Routes>
    );
  // If the user is not logged in, then root directory will default to the landing page.
  } else {
    protectedRoute = (
      <Routes>
        <Route 
          path="/" 
          element={ <LandingPage /> } 
        />
      </Routes>
    );
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        {protectedRoute}
      </Router>
    </ApolloProvider>
  );
}

export default App;
