import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/global.css';
import About from "../components/About";
import Working from "../components/Working";
import Features from "../components/Features";
import Developers from "../components/Developers";
import Home from '../components/Home';
import Footer from '../components/Footer';

const Landing = () => {

    return (
        <div>
            <Navbar />
            <div className='bg'>
                <div id="Home"><Home/></div>
                <div id="About"><About /></div>
                <div id="Working"><Working /></div>
                <div id="Features"><Features /></div>
                <div id="Developers"><Developers /></div>
            </div>
            <Footer/>
        </div>
    );
};

export default Landing;
