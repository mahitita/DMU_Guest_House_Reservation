import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ image, title, description, price }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking');
  };

  return (
    <div className="room__card">
      <div className="room__card__image">
        <img src={image} alt="room" />
        <div className="room__card__icons">
          <span><i className="ri-heart-fill"></i></span>
          <span><i className="ri-paint-fill"></i></span>
          <span><i className="ri-shield-star-line"></i></span>
        </div>
      </div>
      <div className="room__card__details">
        <h4>{title}</h4>
        <p>{description}</p>
        <h5>Starting from <span>{price}/night</span></h5>
        <button className="btn" onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
};

export default RoomCard;
