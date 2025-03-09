// Corrected UserPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import About from "../components/About";
import Working from "../components/Working";
import Features from "../components/Features";
import Developers from "../components/Developers";
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import axios from 'axios';
import Profile from '../components/Profile';
import { toast } from 'react-toastify';

const UserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("No token found, redirecting to login");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/auth/getUserData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Response from getUserData:", response.data);
      
      if (response.data.success) {
        setUserData(response.data.user);
        const userInfo = { 
          isLoggedIn: true, 
          userData: response.data.user 
        };
        sessionStorage.setItem("userData", JSON.stringify(userInfo));
        setLoading(false);
      } else {
        console.error(response.data.message || "Failed to fetch user details");
        sessionStorage.removeItem("authToken");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error(error.response?.data?.message || "User not Found");
      sessionStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar userData={userData} />
      <div className='bg'>
        <div id="Home"><Home/></div>
        <div id="About"><About /></div>
        <div id="Working"><Working /></div>
        <div id="Features"><Features /></div>
        <div id="Developers"><Developers /></div>
        {userData && <div id="profile"><Profile userData={userData} refreshUserData={fetchUserDetails} /></div>}
      </div>
    </div>
  );
};

export default UserPage;