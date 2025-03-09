// authRoutes.js
import express from 'express';
import { login, register, getUserDetails, forgot } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register-user', register);
router.post('/login-user', login);
router.get('/getUserData', authenticateToken, getUserDetails);
router.post('/update-password',forgot)

export default router;