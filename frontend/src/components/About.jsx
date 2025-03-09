import React from 'react';
import '../styles/global.css';
import { Link } from 'react-scroll';
import aboutImage from '../assets/image/about-image.png'; // Importing the image

const About = () => {
    return (
        <div className="about">
            <div className='about-content'>
                <h2 className='text-secondary'>About</h2>
                <h4 className='text-primary'>From Complaint to Plaint – In Just One Click!</h4>
                <p><strong>Time-Saving:</strong> Reduces hours of manual drafting to minutes.</p>
                <p><strong>Cost-Effective:</strong> Minimizes the need for expensive legal services.</p>
                <p><strong>Error-Free:</strong> Ensures accuracy and consistency in legal language.</p>
                <Link to="Features" smooth={true} duration={500}><button className='btn'>Read More</button> </Link>
            </div>
            <img className='about-image' src={aboutImage} alt="About Image" />
        </div>
    );
};

export default About;
