import React, { createContext, useState, useEffect } from 'react';
import { networkAdapter } from '../services/NetworkAdapter';

export const AuthContext = createContext();

/**
 * Provides authentication state and user details to the application.
 * @namespace AuthProvider
 * @component
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [authCheckTrigger, setAuthCheckTrigger] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const response = await networkAdapter.get('api/users/auth-user');
      if (response && response.data) {
        setIsAuthenticated(response.data.isAuthenticated);
        setUserDetails(response.data.userDetails);
      }
    };

    checkAuthStatus();
  }, [authCheckTrigger]);

  const triggerAuthCheck = () => {
    setAuthCheckTrigger((prev) => !prev);
  };

  const setRole = (role) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      role: role
    }));
  };

  const setSidebarList = (sidebarList) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      sidebarList: sidebarList
    }));
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userDetails, triggerAuthCheck, setRole, setSidebarList }}
    >
      {children}
    </AuthContext.Provider>
  );
};
