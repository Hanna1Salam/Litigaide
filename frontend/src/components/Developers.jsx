import React from 'react';
import '../styles/global.css';
import developer1 from '../assets/image/saji.jpg'; // Adjust the path as necessary
import developer2 from '../assets/image/aparna.jpg';
import developer3 from '../assets/image/gouri.jpg';
import developer4 from '../assets/image/hanna.jpg';

const developersData = [
    {
        name: "Ann Maria Saji",
        skills: ["Python", "C programming", "DBMS"],
        image: developer1,
        link: "https://www.linkedin.com/in/ann-maria-saji-544112227/"
    },
    {
        name: "Aparna Rajan",
        skills: ["Python", "flutter", "Firebase"],
        image: developer2,
        link: "https://www.linkedin.com/in/aparna-rajan-332b6222b/"
    },
    {
        name: "Gourinandana S Nair",
        skills: ["Java", "python", "Sql"],
        image: developer3,
        link: "https://www.linkedin.com/in/gouri-nandana-s-nair/"
    },
    {
        name: "Hanna Salam",
        skills: ["HTML", "CSS", "UI/UX Design"],
        image: developer4,
        link: "https://www.linkedin.com/in/hanna-salam-/"
    }
];

const Developers = () => {
    return (
        <div className="developers">
            <h2 className='text-secondary'>Meet Us</h2>
            <p className='text-primary'>Developers</p>
            <div className="dev-cards">
                {developersData.map((developer, index) => (
                    <div className="dev-card" key={index}>
                        <h3 className='text-secondary'>{developer.name}</h3>
                        <img src={developer.image} alt={developer.name} />
                        <ul>
                            {developer.skills.map((skill, skillIndex) => (
                                <li key={skillIndex}>{skill}</li>
                            ))}
                        </ul>
                        <a href={developer.link} target="_blank" rel="noopener noreferrer">
                            <button className='dev-btn'>Know more</button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Developers;
