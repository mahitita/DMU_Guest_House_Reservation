import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeanRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionTakenMap, setActionTakenMap] = useState({}); // State to track actions by request ID

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/requests/dean', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequests(response.data.requests);
                // Initialize action taken map with false for each request ID
                const initialActionTakenMap = {};
                response.data.requests.forEach(request => {
                    initialActionTakenMap[request._id] = false;
                });
                setActionTakenMap(initialActionTakenMap);
            } catch (err) {
                setError(err.response?.data?.error || 'Error fetching requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleDeanApproval = async (requestId, newApprovalStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:3000/api/requests/dean/approve/${requestId}`,
                { deanApproved: newApprovalStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Update the request in the state after approval/rejection
            const updatedRequests = requests.map(request =>
                request._id === requestId ? { ...request, deanApproved: newApprovalStatus } : request
            );
            setRequests(updatedRequests);
            // Mark action as taken for this request ID
            setActionTakenMap(prevMap => ({
                ...prevMap,
                [requestId]: true
            }));
        } catch (err) {
            console.error('Error updating approval status:', err);
            setError(err.response?.data?.error || 'Error updating approval status');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Requests for Department Dean</h2>
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
                                <button
                                    onClick={() => handleDeanApproval(request._id, 'approved')}
                                    disabled={actionTakenMap[request._id]}
                                    className={`bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded ${actionTakenMap[request._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDeanApproval(request._id, 'rejected')}
                                    disabled={actionTakenMap[request._id]}
                                    className={`bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded ml-2 ${actionTakenMap[request._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DeanRequests;
