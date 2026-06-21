/**
 * Enquiry Controller
 *
 * Handles all CRUD operations for enquiries/leads:
 * - createEnquiry (public)
 * - getEnquiries (admin — paginated, searchable, filterable)
 * - getEnquiryById (admin)
 * - updateEnquiryStatus (admin)
 * - addNote (admin)
 * - deleteEnquiry (admin)
 */

const Enquiry = require("../models/Enquiry");
const Notification = require("../models/Notification");
const { sendNewLeadNotification } = require("../utils/sendEmail");

/**
 * @desc    Create a new enquiry (public)
 * @route   POST /api/enquiries
 * @access  Public
 */
const createEnquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      serviceType,
      companyName,
      city,
      loanAmount,
      monthlyIncome,
      message,
      source,
      priority,
    } = req.body;

    const enquiry = await Enquiry.create({
      fullName,
      phoneNumber,
      email,
      serviceType,
      companyName,
      city,
      loanAmount,
      monthlyIncome,
      message,
      source: source || "Website",
      priority: priority || "Medium",
      statusHistory: [
        {
          status: "New",
          updatedBy: "System",
          changedAt: new Date(),
        },
      ],
    });

    // Create database notification
    const notification = await Notification.create({
      title: "New Enquiry Received",
      message: `${fullName} has requested a consultation for ${serviceType || "Financial Services"}.`,
      type: "new_lead",
      enquiryId: enquiry._id,
    });

    // Emit real-time event to all connected sockets
    const io = req.app.get("io");
    if (io) {
      // Emit lead event
      io.emit("new_enquiry", { enquiry });
      // Emit notification event with populated info
      io.emit("new_notification", {
        _id: notification._id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        enquiryId: {
          _id: enquiry._id,
          fullName: enquiry.fullName,
          serviceType: enquiry.serviceType,
        },
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      });
    }

    // Send email notification asynchronously (don't await — fire and forget)
    sendNewLeadNotification(enquiry).catch((err) =>
      console.error("Email notification error:", err.message)
    );

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully. Our team will contact you within 2 business hours.",
      data: { id: enquiry._id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all enquiries with pagination, search, and filters
 * @route   GET /api/enquiries
 * @access  Admin
 *
 * Query params:
 *   page     — Page number (default: 1)
 *   limit    — Results per page (default: 20, max: 100)
 *   search   — Search in name, phone, email
 *   status   — Filter by status
 *   service  — Filter by serviceType
 *   sort     — Sort field (default: -createdAt)
 */
const getEnquiries = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const skip = (page - 1) * limit;

    // ── Build filter query ──
    const filter = {};

    // Status filter
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Service type filter
    if (req.query.service) {
      filter.serviceType = req.query.service;
    }

    // Follow-up filters
    if (req.query.followUpFilter) {
      const now = new Date();
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      if (req.query.followUpFilter === "overdue") {
        filter["nextFollowUp.date"] = { $lt: todayStart };
        filter["nextFollowUp.completed"] = false;
      } else if (req.query.followUpFilter === "today") {
        filter["nextFollowUp.date"] = { $gte: todayStart, $lte: todayEnd };
        filter["nextFollowUp.completed"] = false;
      } else if (req.query.followUpFilter === "upcoming") {
        filter["nextFollowUp.date"] = { $gt: todayEnd };
        filter["nextFollowUp.completed"] = false;
      }
    }

    // Search across name, phone, and email
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [
        { fullName: searchRegex },
        { phoneNumber: searchRegex },
        { email: searchRegex },
      ];
    }

    // ── Sort ──
    let sortOption = { createdAt: -1 }; // default: newest first
    if (req.query.sort) {
      const sortField = req.query.sort.startsWith("-")
        ? req.query.sort.substring(1)
        : req.query.sort;
      const sortOrder = req.query.sort.startsWith("-") ? -1 : 1;
      sortOption = { [sortField]: sortOrder };
    }

    // ── Execute query ──
    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
      Enquiry.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: enquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single enquiry by ID
 * @route   GET /api/enquiries/:id
 * @access  Admin
 */
const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update enquiry status
 * @route   PATCH /api/enquiries/:id/status
 * @access  Admin
 */
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    const previousStatus = enquiry.status;
    enquiry.status = req.body.status;

    // Push to statusHistory
    enquiry.statusHistory.push({
      status: req.body.status,
      updatedBy: req.admin ? req.admin.name : "Admin",
      changedAt: new Date(),
    });

    // Automatically add a note recording the status change
    enquiry.notes.push({
      text: `Status changed from "${previousStatus}" to "${req.body.status}"`,
      createdBy: "System",
      createdAt: new Date(),
    });

    await enquiry.save();

    res.json({
      success: true,
      message: `Status updated to "${req.body.status}"`,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update enquiry priority
 * @route   PATCH /api/enquiries/:id/priority
 * @access  Admin
 */
const updateEnquiryPriority = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    const previousPriority = enquiry.priority || "Medium";
    enquiry.priority = req.body.priority;

    // Automatically add a note recording the priority change
    enquiry.notes.push({
      text: `Priority changed from "${previousPriority}" to "${req.body.priority}"`,
      createdBy: "System",
      createdAt: new Date(),
    });

    await enquiry.save();

    res.json({
      success: true,
      message: `Priority updated to "${req.body.priority}"`,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a note to an enquiry
 * @route   POST /api/enquiries/:id/notes
 * @access  Admin
 */
const addNote = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    enquiry.notes.push({
      text: req.body.text,
      createdBy: req.admin ? req.admin.name : "Admin",
      createdAt: new Date(),
    });

    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Note added successfully",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Admin
 */
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    await enquiry.deleteOne();

    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Edit a note on an enquiry
 * @route   PUT /api/enquiries/:id/notes/:noteId
 * @access  Admin
 */
const editNote = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    const note = enquiry.notes.id(req.params.noteId);
    if (!note) {
      const error = new Error("Note not found");
      error.statusCode = 404;
      throw error;
    }

    note.text = req.body.text;
    await enquiry.save();

    res.json({
      success: true,
      message: "Note updated successfully",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a note on an enquiry
 * @route   DELETE /api/enquiries/:id/notes/:noteId
 * @access  Admin
 */
const deleteNote = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    const note = enquiry.notes.id(req.params.noteId);
    if (!note) {
      const error = new Error("Note not found");
      error.statusCode = 404;
      throw error;
    }

    note.deleteOne();
    await enquiry.save();

    res.json({
      success: true,
      message: "Note deleted successfully",
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update follow-up details (set date, mark complete)
 * @route   PATCH /api/enquiries/:id/followup
 * @access  Admin
 */
const updateFollowUp = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      const error = new Error("Enquiry not found");
      error.statusCode = 404;
      throw error;
    }

    const { date, completed } = req.body;

    if (date !== undefined) {
      const parsedDate = date ? new Date(date) : null;
      
      // If the date is changing, reset notification flags
      if (!enquiry.nextFollowUp || !enquiry.nextFollowUp.date || 
          enquiry.nextFollowUp.date.getTime() !== (parsedDate ? parsedDate.getTime() : 0)) {
        enquiry.nextFollowUp = {
          date: parsedDate,
          completed: false,
          notified: false
        };
        
        // Log follow-up scheduled
        if (parsedDate) {
          enquiry.notes.push({
            text: `Follow-up scheduled for ${parsedDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
            createdBy: req.admin ? req.admin.name : "Admin",
            createdAt: new Date()
          });
        } else {
          enquiry.notes.push({
            text: `Follow-up schedule cleared`,
            createdBy: req.admin ? req.admin.name : "Admin",
            createdAt: new Date()
          });
        }
      }
    }

    if (completed !== undefined && enquiry.nextFollowUp) {
      const wasCompleted = enquiry.nextFollowUp.completed;
      enquiry.nextFollowUp.completed = completed;
      
      if (completed && !wasCompleted) {
        enquiry.notes.push({
          text: `Follow-up completed`,
          createdBy: req.admin ? req.admin.name : "Admin",
          createdAt: new Date()
        });
      } else if (!completed && wasCompleted) {
        enquiry.notes.push({
          text: `Follow-up marked as incomplete`,
          createdBy: req.admin ? req.admin.name : "Admin",
          createdAt: new Date()
        });
      }
    }

    await enquiry.save();

    res.json({
      success: true,
      message: "Follow-up details updated successfully",
      data: enquiry
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  updateEnquiryPriority,
  addNote,
  editNote,
  deleteNote,
  deleteEnquiry,
  updateFollowUp,
};
