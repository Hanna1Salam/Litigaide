import React from 'react';
import '../styles/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShieldHalved, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const featuresData = [
    {
        title: "AI-Powered Plaint Generation",
        description: "Converts user-provided case details into a well-structured legal plaint.",
        icon: <FontAwesomeIcon icon={faEye} /> // Using Font Awesome icon
    },
    {
        title: "Secure Database",
        description: "Stores case details and plaints securely for future reference.",
        icon: <FontAwesomeIcon icon={faShieldHalved} />
    },
    {
        title: "Customizable Formats",
        description: "Ensures compliance with region-specific legal document standards.",
        icon: <FontAwesomeIcon icon={faPenToSquare} />
    }
];

const Features = () => {
    return (
        <div className="sect">
            <h2 className='text-secondary'>Features</h2>
            <p className='text-primary'>Awesome Features</p>
            <div className="cards">
                {featuresData.map((feature, index) => (
                    <div className="card" key={index}>
                        <div className="icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;