/**
 * JWT Authentication Middleware
 *
 * Verifies the JWT token from the Authorization header.
 * Attaches the authenticated admin user to req.admin.
 * Returns 401 if token is missing, invalid, or expired.
 */

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach admin to request (exclude password)
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Admin account not found.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    // Differentiate between expired and invalid tokens
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};

module.exports = { protect };
