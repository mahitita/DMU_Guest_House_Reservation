import React, { useState } from 'react';
import axios from 'axios';
import '../styles/BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        roomType: '',
        numberOfGuests: 0,
        arrivalDate: '',
        arrivalTime: '',
        departureDate: '',
        idImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            idImage: e.target.files[0],
        }));
    };

    const handleGuestChange = (increment) => {
        setFormData(prevState => ({
            ...prevState,
            numberOfGuests: Math.max(0, prevState.numberOfGuests + increment),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const response = await axios.post('/api/bookings/book', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="booking-form">
            <h1>Hotel Booking</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name <span>*</span></label>
                    <div className="name-inputs">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>E-mail <span>*</span></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="ex: myname@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <small>example@example.com</small>
                </div>

                <div className="form-group">
                    <label>Phone Number <span>*</span></label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="ex: +1234567890"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Room Type</label>
                    <select
                        name="roomType"
                        required
                        value={formData.roomType}
                        onChange={handleChange}
                    >
                        <option value="">Please Select</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Number of Guests <span>*</span></label>
                    <div className="guest-input">
                        <button type="button" onClick={() => handleGuestChange(-1)}>-</button>
                        <span>{formData.numberOfGuests}</span>
                        <button type="button" onClick={() => handleGuestChange(1)}>+</button>
                    </div>
                </div>


                <div className="form-group">
                    <label>Arrival Date & Time <span>*</span></label>
                    <div className="datetime-inputs">
                        <input
                            type="date"
                            name="arrivalDate"
                            required
                            value={formData.arrivalDate}
                            onChange={handleChange}
                        />
                        <input
                            type="time"
                            name="arrivalTime"
                            required
                            value={formData.arrivalTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Departure Date <span>*</span></label>
                    <input
                        type="date"
                        name="departureDate"
                        required
                        value={formData.departureDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>ID Image <span>*</span></label>
                    <input
                        type="file"
                        name="idImage"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default BookingForm;