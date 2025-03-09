import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // For smooth scrolling
import { Link, useLocation, useNavigate } from 'react-router-dom'; // For route navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 200);
    }, [location]);

    const getData = async () => {
        const data = sessionStorage.getItem('userData');
        if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData.isLoggedIn) {
                setUserData(parsedData.userData);
            }
        }
    };

    const logout = () => {
        sessionStorage.clear();
        setUserData(null);
        navigate('/login'); // Redirect to login after logout
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand p-0">
                    <h1 className="m-0">LITIGAIDE</h1>
                </Link>
            </div>
            <div className="navbar-nav mx-auto">
            {location.pathname === "/" ? (
                <>
                <ScrollLink to="Home" smooth={true} duration={200} className="nav-item nav-link">
                    Home
                </ScrollLink>
                <ScrollLink to="About" smooth={true} duration={200} className="nav-item nav-link">
                    About
                </ScrollLink>
                <ScrollLink to="Working" smooth={true} duration={200} className="nav-item nav-link">
                    Working
                </ScrollLink>
                <ScrollLink to="Features" smooth={true} duration={200} className="nav-item nav-link">
                    Features
                </ScrollLink>
                <ScrollLink to="Developers" smooth={true} duration={200} className="nav-item nav-link">
                    Developers
                </ScrollLink>
                </>
                ) : (
                    <>
                        <Link to="/" className="nav-item nav-link">
                            Home
                        </Link>
                        <Link to="/" className="nav-item nav-link">
                            About
                        </Link>
                        <Link to="/" className="nav-item nav-link">
                            Working
                        </Link>
                        <Link to="/" className="nav-item nav-link">
                            Features
                        </Link>
                        <Link to="/" className="nav-item nav-link">
                            Developers
                        </Link>
                    </>
                )}
                {userData && (
                    <Link to={`/profile`} className="nav-item nav-link">
                        Profile
                    </Link>
                )}
            </div>
            <div className="navbar-right">
                {userData ? (
                    <>

                        <Link to="/generate">
                            <button className='btn'>Generate</button>
                        </Link>
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            style={{ color: "#8f12f3", cursor: 'pointer' }}
                            onClick={logout}
                            className='out'
                        />
                    </>
                ) : (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;