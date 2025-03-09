import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../styles/profile.css";

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem("userData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData.isLoggedIn) {
                setUserData(parsedData.userData);
            }
        }
    }, []);

    if (!userData) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="generation-page-container">
            <Navbar />
            <div className="form-container">
                <h1 className="page-title">Profile</h1>
                <div className="form-row text">
                    <p>Name:<strong>&nbsp;&nbsp; {userData.name}</strong></p>
                </div>
                <div className="form-row text">
                    <p>Email:<strong> &nbsp;&nbsp;{userData.email}</strong></p>
                </div>
                <div className="form-row text">
                    <p>Phone Number:<strong> &nbsp;&nbsp;{userData.phone_number}</strong></p>
                </div>
                <div className="form-row text">
                    <p>Lawyer Registration No:<strong> &nbsp;&nbsp;{userData.lawyer_registration_number}</strong></p>
                </div>
                <div className="form-row text">
                    <p>Work Location:<strong>&nbsp;&nbsp;{userData.work_location}</strong></p>
                </div>
                <div className="form-row text">
                    <p>Court:<strong>&nbsp;&nbsp; {userData.court}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
