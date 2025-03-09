import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Logging in with:", email, password);
      
      try {
        const response = await axios.post("http://localhost:3000/api/auth/login-user", { email, password });
        
        console.log("Response Data:", response.data);
        
        if (response.data.success) {
          toast.success(response.data.message || "Login successful");
          
          const token = response.data.token;
          console.log("Token received:", token);
          
          // Store the token
          sessionStorage.setItem("authToken", token);
          
          // Store user data immediately
          const userInfo = {
            isLoggedIn: true,
            userData: response.data.user
          };
          sessionStorage.setItem("userData", JSON.stringify(userInfo));
          
          // Navigate after storing data
          navigate('/user');
        } else {
          toast.error(response.data.message || "Login failed");
        }
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      }
    };
    
    // Remove the fetchUserDetails call from login page - it's redundant 

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="text-primary">Login</h2>

                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        disabled={loading}
                        required
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                        required
                    />
                    <button 
                        type="submit" 
                        className="btn"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <Link to="/forgot" className="hype">Forgot Password?</Link>
                <p>Don't have an account?</p>
                <Link to="/signup" className="hype">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;