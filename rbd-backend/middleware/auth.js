import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js"
dotenv.config();

export const auth = (req, res, next) => {
  const token = req.cookies.token || req.body.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export const hasRole = (...roles) => {
  return async (req, res, next) => {
    try {
      const userDetails = await User.findOne({ email: req.user.email });

      if (!userDetails) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      if (!roles.includes(userDetails.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this route",
        });
      }

      next();
    } catch (error) {
      console.error("Error in hasRole middleware:", error); // Debugging line
      return res.status(500).json({ success: false, message: "User Role Can't be Verified" });
    }
  };
};