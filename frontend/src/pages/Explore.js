import React from 'react';
import exploreImage from '../assets/explore.jpg';
import '../styles/style.css';
const Explore = () => {
  return (
    <section className="explore" id="explore">
      <p className="section__subheader">EXPLORE</p>
      <h2 className="section__header">What's New Today.</h2>
      <div className="explore__bg">
        <div className="explore__content">
          <p className="section__description">10th MAR 2023</p>
          <h4>A New Menu Is Available In Our Hotel.</h4>
          <button className="btn">Continue</button>
        </div>
      </div>
    </section>
  );
};

export default Explore;
