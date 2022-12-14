import React from "react";
import Navbar from "../components/Navbar/Navbar";
// We need to decide what goes in the home page. Below are ... ideas?
// import MatchesFeed from "../components/MatchesFeed/MatchesFeed"; 
// import Sidebar from "../components/Sidebar/Sidebar"; 

// I'm going to put made up things for the returns
export const Home = () => {
  return (
    <div>
      <Navbar />
      {/* below are made up */}
      {/* <MatchesFeed />  */}
      <Navbar />
    </div>
  );
};

export default Home