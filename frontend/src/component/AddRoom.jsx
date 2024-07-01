import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/rooms', {
                roomNumber,
                type,
                price,
                picture
            });
            console.log(response.data); // Log the response from the server
            // Optionally, reset the form fields after successful submission
            setRoomNumber('');
            setType('');
            setPrice('');
            setPicture('');
        } catch (error) {
            setError(error.response.data.error); // Handle error response from server
        }
    };

    return (
        <div>
            <h2>Add Room</h2>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>Room Number:</label>
                <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} required />
                <br />
                <label>Type:</label>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                <br />
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <br />
                <label>Picture:</label>
                <input type="text" value={picture} onChange={(e) => setPicture(e.target.value)} required />
                <br />
                <button type="submit">Add Room</button>
            </form>
        </div>
    );
};

export default AddRoom;
