import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { networkAdapter } from '../services/NetworkAdapter';
import { AuthContext } from '../contexts/AuthContext';
import validations from '../utils/validations';
import Toast from '../ux/toast/Toast';
import { LOGIN_MESSAGES } from '../utils/constants';

const Login = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [loginData, setLoginData] = useState({
        identifier: '', // Changed to identifier to match backend
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (validations.validate('email', loginData.identifier)) { // Validate identifier
            try {
                const response = await networkAdapter.post('http://localhost:3000/api/auth/login', loginData, {
                    credentials: 'include' // Ensure credentials are included in the request
                });

                console.log('Login response:', response); // Log response for debugging

                if (response && response.token) {
                    // Save token and related data to localStorage
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);
                    localStorage.setItem('sidebarList', JSON.stringify(response.sidebarList));

                    // Update context if needed (example)
                    // context.triggerAuthCheck();
                    // context.setRole(response.role);
                    // context.setSidebarList(response.idebarList);

                    // Redirect to dashboard
                    navigate('/dashboard');
                } else if (response && response.error) {
                    setErrorMessage(response.error);
                }
            } catch (error) {
                console.error('Login error:', error); // Log error for debugging
                setErrorMessage('Failed to login');
            }
        } else {
            setErrorMessage(LOGIN_MESSAGES.FAILED);
        }
    };

    const dismissError = () => {
        setErrorMessage('');
    };

    const dismissSuccessMessage = () => {
        setSuccessMessage('');
    };

    return (
        <>
            <div className="login__form">
                <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
                    <form
                        onSubmit={handleLoginSubmit}
                        className="w-full max-w-lg p-4 md:p-10 shadow-md"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-brand">
                                Welcome Back
                            </h2>
                            <p className="text-gray-500">
                                Log in to continue to your account
                            </p>
                        </div>
                        <div className="mb-6">
                            <input
                                type="text" // Changed to text to accept both email and phone
                                name="identifier"
                                placeholder="Email or Phone"
                                value={loginData.identifier}
                                onChange={handleInputChange}
                                autoComplete="username"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        {errorMessage && (
                            <Toast
                                type="error"
                                message={errorMessage}
                                dismissError={dismissError}
                            />
                        )}
                        {successMessage && (
                            <Toast
                                type="success"
                                message={successMessage}
                                dismissError={dismissSuccessMessage}
                            />
                        )}
                        <div className="items-center">
                            <div>
                                <button
                                    type="submit"
                                    className="bg-brand bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Log In
                                </button>
                            </div>
                            <div className="flex flex-wrap justify-center my-3 w-full">
                                <Link
                                    to="/forgot-password"
                                    className="inline-block align-baseline text-md text-gray-500 hover:text-blue-800 text-right"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute left-0 right-0 flex justify-center items-center">
                                    <div className="border-t w-full absolute"></div>
                                    <span className="bg-white px-3 text-gray-500 z-10">
                                        New to Stay Booker?
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center my-3 w-full mt-12">
                                <Link
                                    to="/register"
                                    className="inline-block align-baseline font-medium text-md text-brand hover:text-blue-800 text-right"
                                >
                                    Create an account
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bg-slate-50 flex flex-col mx-auto w-full max-w-lg px-4">
                <small className="text-slate-600">test user details</small>
                <small className="text-slate-600">Email: user1@example.com</small>
                <small className="text-slate-600">Password: password1</small>
            </div>
        </>
    );
};

export default Login;