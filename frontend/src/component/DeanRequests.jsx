import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeanRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle case where token is not available (e.g., redirect to login)
                console.error('Token not found. Redirect to login page.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/requests/dean', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('Requests for dean:', response.data.requests);
                setRequests(response.data.requests);
            } catch (error) {
                console.error('Error fetching requests for dean:', error);
                // Handle error gracefully (e.g., show error message)
            }
        };

        fetchRequests();
    }, []); // Empty dependency array ensures this runs once on component mount

    const handleApprove = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle case where token is not available (e.g., redirect to login)
                console.error('Token not found. Redirect to login page.');
                return;
            }

            await axios.put(
                `http://localhost:3000/api/requests/dean/approve/${requestId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchRequests(); // Refresh requests list after approval
        } catch (error) {
            console.error('Error approving request:', error);
            // Handle error gracefully (e.g., show error message)
        }
    };

    return (
        <div>
            <h1>Requests for Dean</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request._id}>
                            <td>{request._id}</td>
                            <td>{request.department.name}</td>
                            <td>{request.isDeanApproved}</td>
                            <td>
                                {request.isDeanApproved !== 'approved' && (
                                    <button onClick={() => handleApprove(request._id)}>Approve</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeanRequests;
