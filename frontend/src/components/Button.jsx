import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, onClick }) => {
    return (
        <Link to="/generate">
            <button onClick={onClick}>
                {text}
            </button>
        </Link>
    );
};

export default Button;
