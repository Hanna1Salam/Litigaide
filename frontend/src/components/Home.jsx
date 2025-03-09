import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Use react-router-dom for navigation
import homeimg from '../assets/image/home-image.png';

const Home = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 200);
    }, [location]);

    const getData = () => {
        const data = sessionStorage.getItem('userData');
        if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData.isLoggedIn) {
                setUserData(parsedData.userData);
            }
        }
    };

    return (
        <div>
            <div id="Home" className='home'>
                <div className='home-content'>
                    <p className='home-head'>
                        {userData ? `Hai, ${userData.name} ` : ''}
                        Streamline Your Legal Drafting with AI Precision
                    </p>
                    <p className='home-para'>
                        Litigaide is a cutting-edge platform designed to simplify the process of creating legal documents.
                        Powered by advanced AI models, it allows users to input case details in plain text and generates
                        professionally formatted plaint documents in seconds. Perfect for legal professionals, law students,
                        and individuals seeking efficient document generation without the hassle.
                    </p>
                    <div className="home-bt">
                        {userData ? (
                            <>
                                <Link to="/about" className="home-link"><span>Read More</span></Link>
                                <Link to="/generate" className="home-link"><span>Try Now</span></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="home-link"><span>Login</span></Link>
                                <Link to="/signup" className="home-link"><span>Signup</span></Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="home-image">
                    <img src={homeimg} alt="Home" />
                </div>
            </div>
        </div>
    );
};

export default Home;
