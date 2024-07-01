import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserView = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]); // Reload users when currentPage changes

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users?_page=${currentPage}&_limit=${usersPerPage}`); // Paginated API request
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            // Handle error scenario (show error message, etc.)
        }
    };

    const handleUpdate = (userId) => {
        // Handle update logic (navigate to update page, show modal, etc.)
        console.log('Update user:', userId);
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/${userId}`);
            console.log('Delete user response:', response.data);
            // Refresh user list after deletion
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error scenario (show error message, etc.)
        }
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                            <th className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="border-b border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            {/* Add more headers as needed */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="border-b border-gray-200 px-4 py-2 text-sm">{user.name}</td>
                                <td className="border-b border-gray-200 px-4 py-2 text-sm">{user.email}</td>
                                <td className="border-b border-gray-200 px-4 py-2 text-sm">{user.phoneNumber}</td>
                                <td className="border-b border-gray-200 px-4 py-2 text-sm">{user.department}</td>
                                <td className="border-b border-gray-200 px-4 py-2 text-sm">{user.role}</td>
                                <td className="border-b border-gray-200 px-4 py-2 text-sm">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={() => handleUpdate(user._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                                {/* Add more columns for other user data */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={goToPreviousPage}
                    className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={goToNextPage}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserView;
