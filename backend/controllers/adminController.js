/**
 * Admin Controller
 *
 * Handles admin authentication (login) and JWT token generation.
 */

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

/**
 * Generate a signed JWT token
 * @param {String} id — Admin user's MongoDB _id
 * @returns {String} Signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "24h",
  });
};

/**
 * @desc    Authenticate admin and return JWT token
 * @route   POST /api/admin/login
 * @access  Public
 */
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find admin by email (explicitly select password since it's excluded by default)
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin };
