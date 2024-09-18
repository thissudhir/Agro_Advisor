import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a className='link' href="#"><FontAwesomeIcon icon={faFacebook} size='3x' /></a>
          <a className='link' href="https://www.instagram.com/shrutitripathi162/" target="_blank"><FontAwesomeIcon icon={faInstagram} size='3x' /></a>
          <a className='link' href="https://github.com/shrutitripathi162" target="_blank"><FontAwesomeIcon icon={faGithub} size='3x' /></a>
          <a className='link' href="https://www.linkedin.com/in/shruti-tripathi1602/" target="_blank"><FontAwesomeIcon icon={faLinkedin} size='3x' /></a>
        </div>

        {/* <div className="row">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact us</a></li>
            <li><a href="/faq">FYQs</a></li>
            <li><a href="/ExampleCrop">Example</a></li>
          </ul>
        </div> */}

        <div className="row">
          Copyright © 2024 - Made with Love by team Agro Advisor
        </div>
      </div>
    </footer>
  );
};

export default Footer;

