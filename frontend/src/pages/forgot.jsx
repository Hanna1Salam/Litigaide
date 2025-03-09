import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Auth.css"

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        else if (newPassword.length < 5) {
            toast.error("Password must be at least 5 characters long!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/update-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();
            toast.success(data.message);

            if (data.success) {
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            toast.error("Failed to connect to server. Please try again.");
            console.error("Forgot password error:", error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Forgot Password</h2>
                <p className="auth-subtext">Enter your email and new password.</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        className="auth-input" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        className="auth-input" 
                        placeholder="Enter new password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        className="auth-input" 
                        placeholder="Confirm new password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit" className="auth-button">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
