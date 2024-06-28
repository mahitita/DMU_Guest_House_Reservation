import React from 'react';
import facebookIcon from '../assets/img/facebook.png';
import instagramIcon from '../assets/img/instagram.png';
import youtubeIcon from '../assets/img/youtube.png';
import twitterIcon from '../assets/img/twitter.png';
import '../styles/style.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="section__container footer__container">
        <div className="footer__socials">
          <a href="#"><img src={facebookIcon} alt="facebook" /></a>
          <a href="#"><img src={instagramIcon} alt="instagram" /></a>
          <a href="#"><img src={youtubeIcon} alt="youtube" /></a>
          <a href="#"><img src={twitterIcon} alt="twitter" /></a>
        </div>
        <div className="footer__copyright">
          <p>CopyRight 2023. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
