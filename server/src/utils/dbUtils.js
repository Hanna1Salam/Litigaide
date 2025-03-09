import { pool } from "../config/db.js";

const createTable = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            phone_number VARCHAR(10) UNIQUE NOT NULL,
            lawyer_registration_number VARCHAR(7) UNIQUE NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            work_location VARCHAR(50),
            court VARCHAR(50),
            password VARCHAR(255) NOT NULL 
        );`);
        console.log("Table created successfully or already exists");
    } catch (error) {
        console.error("Error creating table:", error);
    }
};
export { createTable };