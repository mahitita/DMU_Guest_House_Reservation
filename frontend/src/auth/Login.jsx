import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { networkAdapter } from '../services/NetworkAdapter';
import validations from '../utils/validations';
import Toast from '../ux/toast/Toast';
import { LOGIN_MESSAGES } from '../utils/constants';
import '../styles/login.css';
const Login = () => {
    const [loginData, setLoginData] = useState({
        identifier: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (validations.validate('email', loginData.identifier)) {
            try {
                const response = await networkAdapter.post('http://localhost:3000/api/auth/login', loginData, {
                    credentials: 'include'
                });

                console.log('Login response:', response);

                if (response && response.token) {
                    // Store entire response data in localStorage (example, adjust as needed)
                    localStorage.setItem('userData', JSON.stringify(response));

                    // Store token and role separately for easier access
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('role', response.role);

                    // Redirect based on user role
                    switch (response.role) {
                        case 'staff':
                            window.location.href = '/staffdashboard';
                            break;
                        case 'department_dean':
                            window.location.href = '/DeanDashboard';
                            break;
                        case 'general_service_directorate':
                            window.location.href = '/generalservice-dashboard';
                            break;
                        case 'guesthouse_manager':
                            window.location.href = '/manager-dashboard';
                            break;
                        case 'customer':
                            window.location.href = '/customerDashboard';
                            break;
                        case 'hr':
                            window.location.href = '/hr-dashboard';
                            break;
                        default:
                            // Handle unexpected roles or redirect to a default route
                            window.location.href = '/dashboard';
                            break;
                    }
                } else if (response && response.error) {
                    setErrorMessage(response.error);
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage('Failed to login');
            }
        } else {
            setErrorMessage(LOGIN_MESSAGES.FAILED);
        }
    };

    const dismissError = () => {
        setErrorMessage('');
    };

    return (
        <div className="body2">
            <div className="wrapper">
                <h1>Welcome Back</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            name="identifier"
                            placeholder="Email or Phone"
                            value={loginData.identifier}
                            onChange={handleInputChange}
                            autoComplete="username"
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <Toast
                            type="error"
                            message={errorMessage}
                            dismissError={dismissError}
                        />
                    )}
                    <button type="submit" className="btn">Log In</button>
                    <div className="remember-forgot">
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </div>
                    <div className="register-link">
                        <p>New to Stay Booker? <Link to="/register">Create an account</Link></p>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Login;
