import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffRequestsTable = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/requests/staff', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Replace with your token management logic
                    }
                });
                setRequests(response.data.requests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleUpdateRequest = (id) => {
        // Implement update request logic
        console.log(`Update request with ID: ${id}`);
    };

    const handleDeleteRequest = async (id) => {
        try {
            // Make DELETE request to API endpoint to delete request
            await axios.delete(`http://localhost:3000/api/requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // After deletion, fetch updated list of requests
            fetchRequests();
        } catch (error) {
            console.error(`Error deleting request with ID ${id}:`, error);
        }
    };

    return (
        <div>
            <h1>Requests Made by Staff</h1>
            <table className="table-auto w-full border-collapse border border-green-800">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-green-600 px-4 py-2">Request ID</th>
                        <th className="border border-green-600 px-4 py-2">Type</th>
                        <th className="border border-green-600 px-4 py-2">Details</th>
                        <th className="border border-green-600 px-4 py-2">Status</th>
                        <th className="border border-green-600 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request._id} className="bg-gray-100">
                            <td className="border border-green-600 px-4 py-2">{request._id}</td>
                            <td className="border border-green-600 px-4 py-2">{request.type}</td>
                            <td className="border border-green-600 px-4 py-2">{request.details}</td>
                            <td className="border border-green-600 px-4 py-2">{request.status}</td>
                            <td className="border border-green-600 px-4 py-2">
                                <button
                                    onClick={() => handleUpdateRequest(request._id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteRequest(request._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffRequestsTable;
