import React from 'react';
import room1 from '../assets/image/room-1.jpg';
import room2 from '../assets/image/room-2.jpg';
import room3 from '../assets/image/room-3.jpg';
import room4 from '../assets/image/room-4.jpg';
import room5 from '../assets/image/room-5.jpg';
import '../styles/style.css';
import RoomCard from './RoomCard';

const RoomContainer = () => {
  return (
    <section className="section__container room__container">
      <p className="section__subheader"></p>
      <h2 className="section__header">The Most Memorable Rest Time Starts Here.</h2>
      <div className="room__grid">
        <RoomCard
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="299"
        />
        <RoomCard
          image={room2}
          title="Executive Cityscape Room"
          description="Experience urban elegance and modern comfort in the heart of the city."
          price="399"
        />
        <RoomCard
          image={room3}
          title="Family Garden Retreat"
          description="Spacious and inviting, perfect for creating cherished memories with loved ones."
          price="249"
        />
        <RoomCard
          image={room4}
          title="Executive Cityscape Room"
          description="Experience urban elegance and modern comfort in the heart of the city."
          price="399"
        />
        <RoomCard
          image={room5}
          title="Executive Cityscape Room"
          description="Experience urban elegance and modern comfort in the heart of the city."
          price="399"
        />
        {/* Add more RoomCard components as needed */}
      </div>
    </section>
  );
};

export default RoomContainer;
