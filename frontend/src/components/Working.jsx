import React from 'react';
import '../styles/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const workingData = [
    {
        title: "Select",
        description: "Select the type of plaint to be generated.",
        icon: <FontAwesomeIcon icon={faArrowPointer} /> // Using Font Awesome icon
    },
    {
        title: "Prompt",
        description: "Enter the details about the case.",
        icon: <FontAwesomeIcon icon={faPenToSquare} />
    },
    {
        title: "Generate",
        description: "Generates a plaint document according to the input details.",
        icon: <FontAwesomeIcon icon={faCheck} />
    }
];

const Working = () => {
    return (
        <div className="sect">
            <h2 className='text-secondary'>How It Works</h2>
            <p className='text-primary'>3 Easy Steps</p>
            <div className="cards">
                {workingData.map((working, index) => (
                    <div className="card" key={index}>
                        <div className="icon">{working.icon}</div>
                        <h3>{working.title}</h3>
                        <p>{working.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Working;