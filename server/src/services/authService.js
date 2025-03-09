import { pool } from "../config/db.js"; // Import JWT_SECRET from config
import jwt from "jsonwebtoken"; // Import jwt for token verification
import bcrypt from 'bcrypt';


const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};
export const registerUser = async (user) => {
    try {
      // First check if user with this email, phone or registration number already exists
      const [existingUsers] = await pool.query(
        'SELECT * FROM users WHERE email = ? OR phone_number = ? OR lawyer_registration_number = ?',
        [user.email, user.phone_number, user.lawyer_registration_number]
      );
  
      if (existingUsers.length > 0) {
        // Check which field is duplicated for a helpful error message
        const existingUser = existingUsers[0];
        if (existingUser.email === user.email) {
          return { success: false, message: 'Email already in use' };
        }
        if (existingUser.phone_number === user.phone_number) {
          return { success: false, message: 'Phone number already in use' };
        }
        if (existingUser.lawyer_registration_number === user.lawyer_registration_number) {
          return { success: false, message: 'Lawyer registration number already in use' };
        }
        return { success: false, message: 'User already exists' };
      }
  
      // Hash the password before inserting
      await user.hashPassword();
      
      // Log the generated hash to verify
      console.log('Hashed password created:', user.password);
  
      // Insert the new user
      const [result] = await pool.query(
        'INSERT INTO users (name, phone_number, lawyer_registration_number, email, work_location, court, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          user.name,
          user.phone_number,
          user.lawyer_registration_number,
          user.email,
          user.work_location,
          user.court,
          user.password
        ]
      );
  
      if (result.affectedRows > 0) {
        return {
          success: true,
          message: 'Registration successful',
          userId: result.insertId
        };
      } else {
        return { success: false, message: 'Failed to register user' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed' };
    }
  };



// In your login endpoint handler
export const loginUser = async (email, password) => {
    try {
        // Get user with all fields, not just password
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const user = rows[0]; // Extract user object
        
        // Debug the stored password
        console.log("Retrieved password hash:", user.password);
        
        // Check if password is null, undefined or empty
        if (!user.password) {
            console.error("Stored password hash is empty or null");
            return { success: false, message: 'Account has invalid password data. Please contact support.' };
        }

        try {
            const isMatch = await checkPassword(password, user.password);
            if (!isMatch) {
                return { success: false, status: 400, message: 'Invalid credentials' };
            }
        } catch (error) {
            console.error("Password comparison error:", error);
            return { success: false, message: 'Authentication error' };
        }

        // Create a clean user object without sensitive data
        const userForClient = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            lawyer_registration_number: user.lawyer_registration_number,
            work_location: user.work_location,
            court: user.court
        };

        // Create token with user ID and email
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );
        
        console.log("Generated token for user:", user.id);

        return {
            success: true,
            message: "Login successful",
            token: token,
            user: userForClient
        };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: 'Login failed. Please try again later.' };
    }
};

export const checkPassword = async (inputPassword, storedHash) => {
    // Check if both arguments are provided
    if (!inputPassword || !storedHash) {
        console.error("Missing password or hash:", { 
            inputPasswordProvided: !!inputPassword, 
            storedHashProvided: !!storedHash 
        });
        throw new Error("Invalid password data");
    }
    
    try {
        return await bcrypt.compare(inputPassword, storedHash);
    } catch (error) {
        console.error("bcrypt comparison error:", error);
        throw error;
    }
};

  export const getUserFromToken = async (token) => {
    try {
      if (!token) return { success: false, message: "No token provided" };
      
      // Fix: Use process.env.JWT_SECRET instead of JWT_SECRET
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [decodedToken.email]);
      if (rows.length === 0) { 
        return { success: false, message: 'User not Found' }; 
      }
      
      // Remove password from user object
      const user = rows;
      delete user.password;
      
      return { success: true, user: user };
    } catch (error) {
      console.error("Token verification error:", error);
      return { success: false, message: 'Invalid token', error: error.message };
    }
  };

