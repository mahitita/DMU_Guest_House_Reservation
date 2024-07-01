import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GeneralServiceRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const response = await axios.get('http://localhost:3000/api/requests/generalservice', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequests(response.data.requests);
            } catch (err) {
                setError(err.response?.data?.error || 'Error fetching requests for general service');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleApproveRequest = async (requestId) => {
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            await axios.put(`http://localhost:3000/api/requests/generalservice/approve/${requestId}`, {
                generalServiceApproved: 'approved'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update local state or refetch data
            updateRequestStatus(requestId, 'approved');
        } catch (err) {
            console.error('Error approving request:', err);
            // Handle error appropriately
        }
    };

    const handleRejectRequest = async (requestId) => {
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            await axios.put(`http://localhost:3000/api/requests/generalservice/approve/${requestId}`, {
                generalServiceApproved: 'rejected'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Update local state or refetch data
            updateRequestStatus(requestId, 'rejected');
        } catch (err) {
            console.error('Error rejecting request:', err);
            // Handle error appropriately
        }
    };

    const updateRequestStatus = (requestId, newStatus) => {
        setRequests(prevRequests =>
            prevRequests.map(request =>
                request._id === requestId ? { ...request, generalServiceApproved: newStatus.charAt(0).toUpperCase() + newStatus.slice(1), status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) } : request
            )
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Requests Approved by Dean for General Service</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Staff Name</th>
                        <th className="py-2">Department Name</th>
                        <th className="py-2">Type</th>
                        <th className="py-2">Details</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Dean Approval</th>
                        <th className="py-2">General Service Approval</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request._id}>
                            <td className="border px-4 py-2">{request._id}</td>
                            <td className="border px-4 py-2">{request.staff.name}</td>
                            <td className="border px-4 py-2">{request.department.name}</td>
                            <td className="border px-4 py-2">{request.type}</td>
                            <td className="border px-4 py-2">{request.details}</td>
                            <td className="border px-4 py-2">{request.status}</td>
                            <td className="border px-4 py-2">{request.deanApproved}</td>
                            <td className="border px-4 py-2">{request.generalServiceApproved}</td>
                            <td className="border px-4 py-2">
                                {request.generalServiceApproved !== 'Approved' && request.generalServiceApproved !== 'Rejected' && (
                                    <>
                                        <button
                                            onClick={() => handleApproveRequest(request._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md mr-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleRejectRequest(request._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                {request.generalServiceApproved === 'Approved' && (
                                    <span className="text-green-500">Approved</span>
                                )}
                                {request.generalServiceApproved === 'Rejected' && (
                                    <span className="text-red-500">Rejected</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GeneralServiceRequests;
