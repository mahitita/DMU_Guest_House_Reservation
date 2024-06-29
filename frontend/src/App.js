import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login';
import Header from './component/Header';
import Home from './pages/home';
import RoomContainer from './pages/RoomCard';
import Footer from './component/Footer';
import RegisterForm from './pages/Register';
import ApproveLeaveTable from './pages/dean/AproveLevel'
import BookingForm from './pages/BookingForm';
import TeacherRequestForm from './pages/Staff/TeacherRequestForm';

function App() {
  return (
    <Router>
      <Header />
      <BookingForm />
      <ApproveLeaveTable />
      <TeacherRequestForm />
      <Routes>
        <Route  exact path="/"  element={<Home />} />
        <Route path="/Rgister" element={<RegisterForm />} />
        
        {/* <Route path="/RoomCard" element={<RoomContainer />} /> */}
        <Route path="/Login" element={<LoginForm />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
