// Assuming this is your userModel.js file
import bcrypt from 'bcrypt';

class UserModel {
  constructor({ name, phone_number, lawyer_registration_number, email, work_location, court, password }) {
    this.name = name;
    this.phone_number = phone_number;
    this.lawyer_registration_number = lawyer_registration_number;
    this.email = email;
    this.work_location = work_location;
    this.court = court;
    this.password = password; // This will be hashed before saving
  }
  
  // Hash the password before saving to database
  async hashPassword() {
    try {
      // Make sure password exists
      if (!this.password) {
        throw new Error('Password is required');
      }
      
      // Generate salt
      const salt = await bcrypt.genSalt(10);
      
      // Hash password
      this.password = await bcrypt.hash(this.password, salt);
      
      return true;
    } catch (error) {
      console.error('Password hashing error:', error);
      throw error;
    }
  }
}

export default UserModel;