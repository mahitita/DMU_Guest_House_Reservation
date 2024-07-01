import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import UserProfile from './auth/UserProfile';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import CreateUser from './component/CreateUser';
import CreateRequestForm from './component/CreateRequestForm';
import DeanRequests from './component/DeanRequests';
import StaffDashboard from './component/StaffDashboard';
import DeanDashboard from './component/DeanDashboard';
import GeneralServiceDashboard from './component/GeneralServiceDashboard';
import ManagerDashboard from './component/ManagerDashboard';
import HRDashboard from './component/HRDashboard';
import UserView from './component/userview';
import StaffRequestsTable from './component/StaffRequestsTable';
import StaffTickets from './component/StaffTickets';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/home';
import AddRoom from './component/AddRoom';
// import GeneralServiceRequests from './component/GeneralServiceRequests';
import GeneralServiceRequests from './component/GeneralServiceRequests ';

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
      case 'hr':
        setSidebarList(["register user", "view users", "update user information", "profile", "log out"]);
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
        {/* <Header /> */}
        <Home />
        <Routes>

          <Route path="/" element={<Login setSidebar={setSidebar} />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-request-form" element={<CreateRequestForm />} />
          <Route path="/view-dean-requests" element={<DeanRequests sidebarList={sidebarList} />} />
          <Route path="/staffdashboard" element={<StaffDashboard sidebarList={sidebarList} />} />
          <Route path="/deandashboard" element={<DeanDashboard sidebarList={sidebarList} />} />
          <Route path="/generalservice-dashboard" element={<GeneralServiceDashboard sidebarList={sidebarList} />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard sidebarList={sidebarList} />} />
          <Route path="/hr-dashboard" element={<HRDashboard sidebarList={sidebarList} />} />
          <Route path="/user-view" element={<UserView sidebarList={sidebarList} />} />
          <Route path="/request-view-staff" element={<StaffRequestsTable sidebarList={sidebarList} />} />
          <Route path="/ticket-view-staff" element={<StaffTickets sidebarList={sidebarList} />} />
          <Route path="/request-view-general" element={<GeneralServiceRequests sidebarList={sidebarList} />} />
          <Route path="/add-room" element={<AddRoom sidebarList={sidebarList} />} />
          {/* Add more routes for different role-based dashboards */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
