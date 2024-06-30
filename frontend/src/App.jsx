import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import UserProfile from './auth/UserProfile';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import CreateUser from './component/CreateUser';
import CreateRequestForm from './component/CreateRequestForm';
import DeanRequests from './component/DeanRequests';
//import Dashboard from './component/Dashboard';
import StaffDashboard from './component/StaffDashboard';
import DeanDashboard from './component/DeanDashboard';
import './App.css';

function App() {
  const [sidebarList, setSidebarList] = useState([]);

  const setSidebar = (role) => {
    switch (role) {
      case 'staff':
        setSidebarList(["create request", "view requests", "view tickets", "book room", "view reservation", "profile", "log out"]);
        break;
      case 'department_dean':
        setSidebarList(["view requests", "view approved requests", "profile", "log out"]);
        break;
      case 'general service':
        setSidebarList(["view requests", "view tickets", "profile", "log out"]);
        break;
      case 'manager':
        setSidebarList(["add room", "view rooms", "view reservation"]);
        break;
      case 'customer':
        setSidebarList(["book room", "view bookings"]);
        break;
      default:
        setSidebarList([]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setSidebar={setSidebar} />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-request-form" element={<CreateRequestForm />} />
          <Route path="/view-dean-requests" element={<DeanRequests sidebarList={sidebarList} />} />
          <Route path="/dashboard" element={<Dashboard sidebarList={sidebarList} />} />
          <Route path="/staffdashboard" element={<StaffDashboard sidebarList={sidebarList} />} />
          <Route path="/deandashboard" element={<DeanDashboard sidebarList={sidebarList} />} />
          {/* Add more routes for different role-based dashboards */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
