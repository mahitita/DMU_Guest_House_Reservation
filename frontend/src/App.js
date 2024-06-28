import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login';
import Header from './component/Header';
import Home from './pages/home';
import RoomContainer from './pages/RoomCard';
import Footer from './component/Footer';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route  exact path="/"  element={<Home />} />

        {/* <Route path="/RoomCard" element={<RoomContainer />} /> */}
        <Route path="/Login" element={<LoginForm />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
