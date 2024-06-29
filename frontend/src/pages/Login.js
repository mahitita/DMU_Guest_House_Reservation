import React from 'react';
import { Link } from 'react-router-dom';
//import './login.css'; // Ensure you have the CSS file in the same directory
import 'boxicons/css/boxicons.min.css';
import './Register';
import '../styles/login.css'
const LoginForm = () => {
  return (
    <div className="body2">
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className='bx bxs-lock-alt'></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember Me
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link to="/Register">Register</Link></p>
          <Link to="/Register" className="btn nav__btn">Sign</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
