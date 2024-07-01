import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateRequestForm from './CreateRequestForm'; // Import CreateRequestForm component
import StaffRequestsTable from './StaffRequestsTable'; // Import StaffRequestsTable component
import StaffTickets from './StaffTickets'; // Import StaffTickets component

const StaffDashboard = ({ roleName }) => {
    const sidebarList = [
        "create request",
        "view requests",
        "view tickets",
        "book room",
        "view reservation",
        "profile",
        "log out"
    ];

    const [selectedContent, setSelectedContent] = useState("Welcome");

    // Function to render selected content based on sidebar selection
    const renderContent = () => {
        switch (selectedContent) {
            case "create request":
                return <CreateRequestForm />;
            case "view requests":
                return <StaffRequestsTable />;
            case "view tickets":
                return <StaffTickets />; // Render StaffTickets component
            case "book room":
                return <div>Book Room Content</div>;
            case "view reservation":
                return <div>View Reservation Content</div>;
            case "profile":
                return <div>Profile Content</div>;
            case "log out":
                return <div>Log Out Content</div>;
            default:
                return <div>Welcome to {roleName} Dashboard!</div>;
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                <div className="flex items-center justify-center mb-10">
                    <h2 className="text-2xl font-bold">{roleName} Dashboard</h2>
                </div>
                <nav>
                    <ul className="space-y-4">
                        {sidebarList.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setSelectedContent(item)}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white block py-2 px-3 rounded-md text-sm font-medium w-full text-left"
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-10">
                {/* Navigation Bar */}
                <nav className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Your App</h1>
                    </div>
                    <div>
                        <Link
                            to="/profile"
                            className="text-gray-600 hover:text-gray-900 mr-5"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/logout"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Logout
                        </Link>
                    </div>
                </nav>

                {/* Main Content Area */}
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-4">{selectedContent}</h2>
                    {renderContent()} {/* Render selected content based on state */}
                </div>
            </div>
        </div>
    );
};

export default StaffDashboard;
