import React, { useState } from 'react';
import axios from 'axios';
//import "../styles/CreateRequestForm.css"; // Ensure this path is correct based on your project structure
import '../styles/login.css'
const CreateRequestForm = () => {
    const [formData, setFormData] = useState({
        staffId: '',
        staffName: '',
        departmentId: '',
        departmentName: '',
        type: '',
        details: ''
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/requests/create', formData);
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error('Error creating request:', error);
            setResponseMessage(error.response.data.error || 'Server error');
        }
    };

    return (
        <div className="body2">
            <div className="wrapper">
                <h1>Create a New Request</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Staff ID:</label>
                        <input
                            type="text"
                            name="staffId"
                            value={formData.staffId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Staff Name:</label>
                        <input
                            type="text"
                            name="staffName"
                            value={formData.staffName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Department ID:</label>
                        <input
                            type="text"
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Department Name:</label>
                        <input
                            type="text"
                            name="departmentName"
                            value={formData.departmentName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-box">
                        <label>Type:</label>
                        <select name="type" value={formData.type} onChange={handleChange} required>
                            <option value="">Select type</option>
                            <option value="apparent">Apparent</option>
                            <option value="procurement">Procurement</option>
                            <option value="education">Education</option>
                            <option value="research">Research</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>Details:</label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn">Create Request</button>
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </div>
    );
};

export default CreateRequestForm;
