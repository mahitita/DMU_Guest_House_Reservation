import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../ux/toast/Toast';

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
        <>
            <div className="login__form">
                <div className="container mx-auto p-4 flex justify-center min-h-[600px] items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-lg p-4 md:p-10 shadow-md"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-brand">
                                Create User
                            </h2>
                            <p className="text-gray-500">
                                Fill in the details to create a new user
                            </p>
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={userData.name}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="id"
                                placeholder="ID"
                                value={userData.id}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="department"
                                placeholder="Department"
                                value={userData.department}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            />
                        </div>
                        <div className="mb-6">
                            <select
                                name="role"
                                value={userData.role}
                                onChange={handleChange}
                                required
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            >
                                <option value="">Select Role</option>
                                <option value="staff">Staff</option>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                                {/* Add other roles as needed */}
                            </select>
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
                                    Create User
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateUser;
