import React, {useRef} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import Auth from "./utils/auth";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

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
        <Routes>
          {Auth.loggedIn() ? (
            <Route path="/" element={ <Home /> }/>
          ) : (
            <Route path="/" element={ <Landing /> }/>
          )}
          </Routes>
        </Router>
    </ApolloProvider>
  )
}

export default App;

