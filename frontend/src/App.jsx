import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import UserProfile from './auth/UserProfile'; // Example component for user profile
import Register from './auth/Register'; // Example component for registration
import ForgotPassword from './auth/ForgotPassword'; // Example component for password recovery
import './App.css';
import './assets/react.svg'; // Assuming these assets are used somewhere
import CreateUser from './component/CreateUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-user" element={<CreateUser />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
