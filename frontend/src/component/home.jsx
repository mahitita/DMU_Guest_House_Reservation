import React from 'react';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../styles/style.css';
import RoomContainer from './RoomContainer';
const Home = () => {
  return (
    <div>
    <header className="home">
      <div className="section__container header__container" id="home">
        <p>Simple - Unique - Friendly</p>
        <h1>Make Yourself At Home<br />In Our <span>Guest House</span>.</h1>
      </div>
      
      </header>
      {/* <Home /> */}
      {/* <LoginForm /> */}
      {/* <About /> */}
      <RoomContainer />
      {/* <RoomView /> */}
      {/* <Services /> */}
      {/* <Banner /> */}
      {/* <Explore /> */}
      
   
    </div>
  );
};

export default Home;
