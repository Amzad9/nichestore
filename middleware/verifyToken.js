import jwt from 'jsonwebtoken';
// import { asyncHandler } from '../utils/asyncHandler';


const JWT_TOEKN = process.env.JWT_SECRET || "monkey_d_luffy"; // Use environment variables in a real application

const verifyToken = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.replace('Bearer ', '').trim();

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }
  
      jwt.verify(token, JWT_TOEKN, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: 'Invalid token' });
      
    }
  };
  
export { verifyToken };
