/**
 * Enquiry (Lead) Model
 *
 * Represents a customer enquiry / lead in the CRM system.
 * Tracks the full lifecycle from initial submission through
 * contact, processing, and final resolution.
 */

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Note text is required"],
      trim: true,
      maxlength: [1000, "Note cannot exceed 1000 characters"],
    },
    createdBy: {
      type: String,
      default: "Admin",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      default: "System",
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^[+]?[0-9\s\-()]{10,18}$/.test(v);
        },
        message: "Please provide a valid phone number",
      },
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },

    serviceType: {
      type: String,
      trim: true,
      enum: {
        values: [
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
        ],
        message: "{VALUE} is not a valid service type",
      },
    },

    companyName: {
      type: String,
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },

    city: {
      type: String,
      trim: true,
      maxlength: [100, "City name cannot exceed 100 characters"],
    },

    loanAmount: {
      type: Number,
      min: [0, "Loan amount cannot be negative"],
    },

    monthlyIncome: {
      type: Number,
      min: [0, "Monthly income cannot be negative"],
    },

    message: {
      type: String,
      trim: true,
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },

    status: {
      type: String,
      enum: {
        values: [
          "New",
          "Contacted",
          "Documents Pending",
          "Processing",
          "Approved",
          "Rejected",
          "Closed",
        ],
        message: "{VALUE} is not a valid status",
      },
      default: "New",
    },

    priority: {
      type: String,
      enum: {
        values: ["Low", "Medium", "High"],
        message: "{VALUE} is not a valid priority",
      },
      default: "Medium",
    },

    notes: [noteSchema],

    statusHistory: [statusHistorySchema],

    nextFollowUp: {
      date: {
        type: Date,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      notified: {
        type: Boolean,
        default: false,
      },
    },

    source: {
      type: String,
      default: "Website",
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// ── Indexes for query performance ──
enquirySchema.index({ phoneNumber: 1 });
enquirySchema.index({ email: 1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ serviceType: 1 });
enquirySchema.index({ "nextFollowUp.date": 1 });
enquirySchema.index({ "nextFollowUp.completed": 1 });

// Compound index for common admin queries (status + date)
enquirySchema.index({ status: 1, createdAt: -1 });

// Text index for search
enquirySchema.index({ fullName: "text", phoneNumber: "text", email: "text" });

module.exports = mongoose.model("Enquiry", enquirySchema);
