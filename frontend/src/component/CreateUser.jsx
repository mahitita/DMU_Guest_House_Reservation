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

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', userData);
            console.log('User created:', response.data);
            // Optionally, handle success scenario (redirect, show success message, etc.)
        } catch (error) {
            console.error('Error creating user:', error);
            // Optionally, handle error scenario (show error message, etc.)
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={userData.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={userData.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
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
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default CreateUser;
