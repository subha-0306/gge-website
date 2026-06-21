/**
 * Request Validation Middleware
 *
 * Uses express-validator to define validation chains for
 * enquiry creation, status updates, note creation, and admin login.
 * The `validate` function collects errors and returns 400 if any exist.
 */

const { body, validationResult } = require("express-validator");

// ── Generic validation result checker ──
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

// ── Enquiry creation validation ──
const validateEnquiry = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be 2–100 characters")
    .escape(),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[+]?[0-9\s\-()]{10,18}$/)
    .withMessage("Please enter a valid phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("serviceType")
    .optional()
    .trim()
    .isIn([
      "Private Finance",
      "Business Loans",
      "Cheque Based Finance",
      "Check Based Finance",
      "Loan Against Property",
      "Industrial Machinery Loans",
      "Professional Loans",
      "Personal Loans",
      "Home Loans",
      "Mortgage Loans",
      "Credit Card Services",
      "Insurance Services",
      "Car Refinance",
      "Working Capital Solutions",
      "Bank Guarantee",
      "Letter of Credit",
      "Packing Credit",
      "Machinery Purchase Finance",
      "Medical Equipment Finance",
      "Other / General Enquiry",
    ])
    .withMessage("Invalid service type"),

  body("companyName")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Company name cannot exceed 200 characters")
    .escape(),

  body("city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City name cannot exceed 100 characters")
    .escape(),

  body("loanAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Loan amount must be a positive number"),

  body("monthlyIncome")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Monthly income must be a positive number"),

  body("message")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Message cannot exceed 2000 characters"),

  body("source").optional().trim().escape(),

  validate,
];

// ── Status update validation ──
const validateStatusUpdate = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn([
      "New",
      "Contacted",
      "Documents Pending",
      "Processing",
      "Approved",
      "Rejected",
      "Closed",
    ])
    .withMessage("Invalid status value"),

  validate,
];

// ── Priority update validation ──
const validatePriorityUpdate = [
  body("priority")
    .trim()
    .notEmpty()
    .withMessage("Priority is required")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority value"),

  validate,
];

// ── Note creation validation ──
const validateNote = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Note text is required")
    .isLength({ max: 1000 })
    .withMessage("Note cannot exceed 1000 characters"),

  validate,
];

// ── Admin login validation ──
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];

module.exports = {
  validateEnquiry,
  validateStatusUpdate,
  validatePriorityUpdate,
  validateNote,
  validateLogin,
};
