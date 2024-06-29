import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AproveLevel.css';

const ApproveLeaveTable = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Fetch leave data from the backend
    axios.get('/api/leaves')
      .then(response => {
        setLeaves(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the leave data!', error);
      });
  }, []);

  const handleApprove = (id) => {
    // Approve leave logic
    axios.post(`/api/leaves/${id}/approve`)
      .then(response => {
        // Update the state to reflect the changes
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: 'Approved' } : leave));
      })
      .catch(error => {
        console.error('There was an error approving the leave!', error);
      });
  };

  const handleReject = (id) => {
    // Reject leave logic
    axios.post(`/api/leaves/${id}/reject`)
      .then(response => {
        // Update the state to reflect the changes
        setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status: 'Rejected' } : leave));
      })
      .catch(error => {
        console.error('There was an error rejecting the leave!', error);
      });
  };

  return (
    <div className="approve-leave-container">
      <h2>Approve Leave</h2>
      <table className="approve-leave-table">
        <thead>
          <tr>
            
            <th>Staff Name</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              
              <td>{leave.name}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button className="btn-approve" onClick={() => handleApprove(leave.id)}>Approve</button>
                <button className="btn-reject" onClick={() => handleReject(leave.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveLeaveTable;
