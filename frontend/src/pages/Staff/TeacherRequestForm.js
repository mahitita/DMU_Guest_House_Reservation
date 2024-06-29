import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './staff.css';

const TeacherRequestForm = () => {
    const [staff, setStaff] = useState({ id: '', name: '' });
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        departmentId: '',
        type: 'apparent',
        details: '',
        document: null
    });

    useEffect(() => {
        // Fetch staff data (you might need to adjust the endpoint)
        axios.get('http://localhost:5000/api/staff/me')
            .then(response => {
                setStaff({ id: response.data.id, name: response.data.name });
            })
            .catch(error => {
                console.error('Error fetching staff data:', error);
            });

        // Fetch department data
        axios.get('http://localhost:5000/api/departments')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, document: e.target.files[0] });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const data = new FormData();
        data.append('json', JSON.stringify({
            staffId: staff.id,
            staffName: staff.name,
            departmentId: formData.departmentId,
            type: formData.type,
            details: formData.details
        }));
        data.append('document', formData.document);

        axios.post('http://localhost:5000/api/requests', data)
            .then(response => {
                console.log('Request created:', response.data);
                // Handle success (e.g., show a success message or redirect)
            })
            .catch(error => {
                console.error('Error creating request:', error);
                // Handle error (e.g., show an error message)
            });
    };

    return (
        <div className="form-container">
            <h2>Teacher Request Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Staff ID</label>
                    <input type="text" value={staff.id} readOnly />
                </div>
                <div className="form-group">
                    <label>Staff Name</label>
                    <input type="text" value={staff.name} readOnly />
                </div>
                
                <div className="form-group">
                    <label>Request Type</label>
                    <select name="type" onChange={handleChange} value={formData.type} required>
                        <option value="apparent">Apparent</option>
                        <option value="procurement">Procurement</option>
                        <option value="education">Education</option>
                        <option value="research">Research</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Details</label>
                    <textarea name="details" onChange={handleChange} value={formData.details}></textarea>
                </div>
                <div className="form-group">
                    <label>Document</label>
                    <input type="file" name="document" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="submit-button">Submit Request</button>
            </form>
        </div>
    );
};

export default TeacherRequestForm;
