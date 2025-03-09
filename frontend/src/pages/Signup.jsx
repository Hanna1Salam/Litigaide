import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/Auth.css";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        lawyer_registration_number: "",
        email: "",
        work_location: "",
        court: "",
        password: "",
        confirmPassword: ""
    });
    
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };  

    const validateForm = () => {
        const errors = {};
        
        if (!/^[A-Za-z ]{3,15}$/.test(formData.name)) {
            errors.name =
              "Name should be 3-15 characters long";
        }

         if (!/^[0-9]{10}$/.test(formData.phone_number)) {
            errors.phone_number = "phone_number number should be 10 digits long";
        }

        if (!/^[0-9]{7}$/.test(formData.lawyer_registration_number)){
            errors.lawyer_registration_number = "Lawyer Registration Number should be of 7 digits";
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)){
            errors.email = "Email should be in the format";
        }

        if (!/^[A-Za-z ]{1,32}$/.test(formData.work_location)){
               errors.work_location = "Work Location should only contain alphabets and spaces";
        }

        if (!/^[A-Za-z ]{1,32}$/.test(formData.court)){
            errors.court = "Court name should only contain alphabets and spaces";
        }

        if (!/.{5,}/.test(formData.password)){
            errors.password = "Password should be at least 5 characters long";
        }

        if (formData.confirmPassword != formData.password){
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        setFormError(errors); // Update formError state with validation errors
        
        if (Object.keys(errors).length > 0) {
            toast.error("All fields are required."); // Show toast error message
            return; // Stop form submission if there are errors

        }
    
        try {
    
        console.log("Form data being sent:", formData); // Log the form data before sending
        const response = await axios.post("http://localhost:3000/api/auth/register-user", formData, {

            headers: { "Content-Type": "application/json" }
        });

    
            console.log("Response Data:", response.data);
    
            if (response.data.success) {
                toast.success(response.data.message || "Signup successful!");
                navigate("/login");
                setFormData({
                    name: "", phone_number: "", lawyer_registration_number: "", email: "",
                    work_location: "", court: "", password: "", confirmPassword: ""
                });
            } else {
                toast.error(response.data.message || "Signup failed!");
            }
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
                toast.error(error.response.data.message || "Signup failed.");
            } else if (error.request) {
                console.error("No Response Received:", error.request);
                toast.error("No response from server. Check backend.");
            } else {
                console.error("Error:", error.message);
                toast.error("An unexpected error occurred.");
            }
        }
    };
    
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                         />
                        {formError.name? <span className="error">{formError.name}</span>:''}
                    <input 
                        type="text" 
                        name="phone_number" 
                        placeholder="Phone Number"
                        value={formData.phone_number} 
                        onChange={handleChange} 
                         />
                        {formError.phone_number? <span className="error">{formError.phone_number}</span>:''}
                    <input 
                        type="text" 
                        name="lawyer_registration_number" 
                        placeholder="Lawyer Registration Number"
                        value={formData.lawyer_registration_number} 
                        onChange={handleChange} 
                         />
                        {formError.lawyer_registration_number? <span className="error">{formError.lawyer_registration_number}</span>:''}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                         />
                        {formError.email? <span className="error">{formError.email}</span>:''}
                    <input 
                        type="text" 
                        name="work_location" 
                        placeholder="Work Location" 
                        value={formData.work_location} 
                        onChange={handleChange} 
                         />
                        {formError.work_location? <span className="error">{formError.work_location}</span>:''}
                    <input 
                        type="text" 
                        name="court" 
                        placeholder="Court Name"
                        value={formData.court} 
                        onChange={handleChange} 
                         />
                        {formError.court? <span className="error">{formError.court}</span>:''}
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                         />
                        {formError.password? <span className="error">{formError.password}</span>:''}
                    <input 
                        type="password" 
                        name="confirmPassword"  
                        placeholder="Confirm Password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                         />
                        {formError.confirmPassword? <span className="error">{formError.confirmPassword}</span>:''}
                    <p>By signing up, you agree to our Terms & Conditions</p>
                    <button type="submit" className="btn">Sign Up</button>
                </form>
                <p>Already have an account?</p>
                <Link to={"/login"} className="hype">
                Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;
