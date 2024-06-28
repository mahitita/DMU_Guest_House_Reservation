import React from 'react';
import room1 from '../assets/img/room-1.jpg';
import room2 from '../assets/img/room-2.jpg';
import room3 from '../assets/img/room-3.jpg';
import '../styles/style.css';
const RoomCard = ({ image, title, description, price }) => {
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
        <button className="btn">Book Now</button>
      </div>
    </div>
  );
};

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
          price="$299"
        />
        <RoomCard 
          image={room2}
          title="Executive Cityscape Room"
          description="Experience urban elegance and modern comfort in the heart of the city."
          price="$199"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room3}
          title="Family Garden Retreat"
          description="Spacious and inviting, perfect for creating cherished memories with loved ones."
          price="$249"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        /><RoomCard 
        image={room1}
        title="Deluxe Ocean View"
        description="Bask in luxury with breathtaking ocean views from your private suite."
        price="$299"
      />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
        <RoomCard 
          image={room1}
          title="Deluxe Ocean View"
          description="Bask in luxury with breathtaking ocean views from your private suite."
          price="$299"
        />
      </div>
    </section>
  );
};

export default RoomContainer;
