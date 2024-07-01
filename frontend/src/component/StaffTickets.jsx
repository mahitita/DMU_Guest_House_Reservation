import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                // Fetch tickets for the authenticated staff member
                const response = await axios.get('http://localhost:3000/api/tickets', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Replace with your token management logic
                    }
                });
                setTickets(response.data.tickets);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div>
            <h1>My Tickets</h1>
            <table className="table-auto w-full border-collapse border border-green-800">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-green-600 px-4 py-2">Ticket ID</th>
                        <th className="border border-green-600 px-4 py-2">Issued Date</th>
                        <th className="border border-green-600 px-4 py-2">Status</th>
                        <th className="border border-green-600 px-4 py-2">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id} className="bg-gray-100">
                            <td className="border border-green-600 px-4 py-2">{ticket.ticket_id}</td>
                            <td className="border border-green-600 px-4 py-2">{new Date(ticket.issued_date).toLocaleDateString()}</td>
                            <td className="border border-green-600 px-4 py-2">{ticket.status}</td>
                            <td className="border border-green-600 px-4 py-2">{ticket.purpose}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StaffTickets;
