import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No authorization header");
      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      console.log("Invalid authorization format");
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
    }
    
    const token = authHeader.split(' ')[1]; // Fix here - get the second part after splitting
    if (!token) {
      console.log("Token is empty after extraction");
      return res.status(401).json({
        success: false,
        message: "Token not provided"
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully, user ID:", decoded.id);
    
    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message
    });
  }
};