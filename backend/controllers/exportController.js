/**
 * Export Controller
 *
 * Generates and sends a downloadable CSV file containing
 * all enquiry data from the database.
 */

const Enquiry = require("../models/Enquiry");
const { generateCSV } = require("../utils/generateCSV");

/**
 * @desc    Export all enquiries as CSV download
 * @route   GET /api/export/csv
 * @access  Admin
 */
const exportCSV = async (req, res, next) => {
  try {
    // Build optional filters (same as getEnquiries)
    const filter = {};

    if (req.query.exportAll !== "true") {
      if (req.query.status) {
        filter.status = req.query.status;
      }

      if (req.query.service) {
        filter.serviceType = req.query.service;
      }

      if (req.query.followUpFilter) {
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

      if (req.query.search) {
        const searchRegex = new RegExp(req.query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        filter.$or = [
          { fullName: searchRegex },
          { phoneNumber: searchRegex },
          { email: searchRegex },
        ];
      }
    }

    // Fetch enquiries sorted by newest first
    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    if (!enquiries.length) {
      return res.status(404).json({
        success: false,
        message: "No enquiries found to export",
      });
    }

    // Generate CSV
    const csv = generateCSV(enquiries);

    // Generate filename with current date
    const dateStr = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const filename = `GGE_Leads_${dateStr}.csv`;

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    res.send(csv);
  } catch (error) {
    next(error);
  }
};

module.exports = { exportCSV };
