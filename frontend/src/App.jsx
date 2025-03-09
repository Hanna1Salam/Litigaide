import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GeneratePage from './pages/GeneratePage'; // Update import
import ForgotPassword from './pages/forgot'; // Import ForgotPassword component
import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import Font Awesome CSS
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/LandingPage';
import Profile from './components/Profile';
import Notfound from './pages/Notfound';
import UserPage from './pages/UserPage';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/generate" element={<GeneratePage />} />
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot" element={<ForgotPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Notfound/>} />
            </Routes>
            <ToastContainer 
                position='top-center'
                autoClose={1000}
                hideProgressBar={true}
                closeOnClick
                theme='colored'
            />
        </BrowserRouter>
    );
};

export default App;
