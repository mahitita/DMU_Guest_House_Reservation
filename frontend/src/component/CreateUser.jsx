import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        id: '',
        department: '',
        role: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', userData);
            console.log('User created:', response.data);
            setSuccessMessage('User created successfully');
            // Optionally, handle success scenario (redirect, show success message, etc.)
        } catch (error) {
            console.error('Error creating user:', error);
            setErrorMessage('Failed to create user');
            // Optionally, handle error scenario (show error message, etc.)
        }
    };

    const dismissError = () => {
        setErrorMessage('');
    };

    const dismissSuccessMessage = () => {
        setSuccessMessage('');
    };

    return (
        <div className="body2">
            <div className="wrapper">
                <h1>Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={userData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="id"
                            placeholder="ID"
                            value={userData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={userData.department}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <select
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="staff">Staff</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            {/* Add other roles as needed */}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="btn">
                            Create User
                        </button>
                    </div>
                </form>
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                        <button onClick={dismissError}>Dismiss</button>
                    </div>
                )}
                {successMessage && (
                    <div className="success-message">
                        <p>{successMessage}</p>
                        <button onClick={dismissSuccessMessage}>Dismiss</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateUser;
