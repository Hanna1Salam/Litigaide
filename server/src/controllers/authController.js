import { loginUser, registerUser } from "../services/authService.js";
import UserModel from "../models/userModel.js";
import { pool } from "../config/db.js";
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    console.log("Received request data:", req.body); // Log incoming request data
    console.log("Full request object:", req); // Log the full request object for debugging

    const { name, phone_number, lawyer_registration_number, email, work_location, court, password } = req.body;

    if (!name || !phone_number || !lawyer_registration_number || !email || !work_location || !court || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = new UserModel({
            name,
            phone_number,
            lawyer_registration_number,
            email,
            work_location,
            court,
            password, 
        });

        console.log("User data being processed:", user);

        const response = await registerUser(user);
        console.log("Registration response:", response);

        if (response.success) {
            return res.status(200).json(response);
        } else {
            return res.status(400).json(response);
        }
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Registration failed.",
        });
    }
};

export const login=async(req,res)=>{
    
  const {email,password}=req.body;
  if(!email || !password){
      return res.status(400).json({success:false,message:"All field are required."})
  }
  try{
      
      const response=await loginUser(email,password);
      
      if(response.success){
          return res.status(200).json(response);
      }else{
          return res.status(400).json(response);
      }

  }catch(error){
      
      console.error("Login error:",error);
      return res.status(500).json({
          success:false,
          message:"Login failed."
      });
  }
}
export const getUserDetails = async(req, res) => {
  try {
    // The user info is now available from the middleware
    const { id, email } = req.user;
    
    // Fetch complete user details from database
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Remove sensitive information before sending back
    const user = rows[0];
    delete user.password; // Don't send password back to client
    
    return res.status(200).json({ 
      success: true, 
      user: user
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
}

export const forgot = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      // Check if user exists
      const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      
      if (user.length === 0) {
          return res.status(400).json({ success: false, message: "User not found" });
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      // Update password in the database
      await pool.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, email]);

      return res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
      console.error("Error updating password:", error);
      return res.status(500).json({ success: false, message: "Server error" });
  }
};