/**
 * Analytics Controller
 *
 * Provides dashboard statistics, monthly/daily lead trends,
 * and service-wise lead distribution using MongoDB aggregation.
 * Supports date range filtering.
 */

const Enquiry = require("../models/Enquiry");

/**
 * @desc    Get dashboard statistics (counts by status & follow-up metrics)
 * @route   GET /api/analytics
 * @access  Admin
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const statuses = [
      "New",
      "Contacted",
      "Documents Pending",
      "Processing",
      "Approved",
      "Rejected",
      "Closed",
    ];

    const filter = {};
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    const pipeline = [];
    if (Object.keys(filter).length > 0) {
      pipeline.push({ $match: filter });
    }
    pipeline.push({
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    });

    const results = await Enquiry.aggregate(pipeline);

    // Map results to a clean object
    const statusCounts = {};
    statuses.forEach((s) => {
      statusCounts[s.toLowerCase().replace(/\s+/g, "_")] = 0;
    });

    let totalLeads = 0;
    results.forEach((r) => {
      if (r._id) {
        const key = r._id.toLowerCase().replace(/\s+/g, "_");
        statusCounts[key] = r.count;
        totalLeads += r.count;
      }
    });

    // Today's leads
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayLeads = await Enquiry.countDocuments({
      createdAt: { $gte: todayStart },
    });

    // This week's leads
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Sunday
    weekStart.setHours(0, 0, 0, 0);
    const weekLeads = await Enquiry.countDocuments({
      createdAt: { $gte: weekStart },
    });

    // This month's leads
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const monthLeads = await Enquiry.countDocuments({
      createdAt: { $gte: monthStart },
    });

    // ── Follow-Up System Analytics ──
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    // Completed Follow Ups
    const totalCompletedFollowUps = await Enquiry.countDocuments({
      "nextFollowUp.completed": true
    });

    // Pending Follow Ups
    const totalPendingFollowUps = await Enquiry.countDocuments({
      "nextFollowUp.date": { $ne: null },
      "nextFollowUp.completed": false
    });

    // Today's Follow Ups
    const todayFollowUpsCount = await Enquiry.countDocuments({
      "nextFollowUp.date": { $gte: todayStart, $lte: todayEnd },
      "nextFollowUp.completed": false
    });

    // Overdue Follow Ups (date in past, incomplete)
    const overdueFollowUpsCount = await Enquiry.countDocuments({
      "nextFollowUp.date": { $lt: todayStart },
      "nextFollowUp.completed": false
    });

    // Upcoming Follow Ups (date in future, incomplete)
    const upcomingFollowUpsCount = await Enquiry.countDocuments({
      "nextFollowUp.date": { $gt: todayEnd },
      "nextFollowUp.completed": false
    });

    res.json({
      success: true,
      data: {
        totalLeads,
        todayLeads,
        weekLeads,
        monthLeads,
        ...statusCounts,
        followUps: {
          completed: totalCompletedFollowUps,
          pending: totalPendingFollowUps,
          today: todayFollowUpsCount,
          overdue: overdueFollowUpsCount,
          upcoming: upcomingFollowUpsCount
        }
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get monthly/daily lead count trends
 * @route   GET /api/analytics/monthly
 * @access  Admin
 */
const getMonthlyLeads = async (req, res, next) => {
  try {
    let startDate = new Date();
    let endDate = new Date();
    let groupBy = "month"; // default

    if (req.query.startDate) {
      startDate = new Date(req.query.startDate);
    } else {
      // default: last 12 months
      startDate.setMonth(startDate.getMonth() - 11);
      startDate.setDate(1);
    }
    startDate.setHours(0, 0, 0, 0);

    if (req.query.endDate) {
      endDate = new Date(req.query.endDate);
    } else {
      endDate = new Date();
    }
    endDate.setHours(23, 59, 59, 999);

    if (req.query.groupBy) {
      groupBy = req.query.groupBy;
    } else {
      // auto-determine based on date range
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 31) {
        groupBy = "day";
      } else {
        groupBy = "month";
      }
    }

    const matchStage = {
      createdAt: { $gte: startDate, $lte: endDate }
    };

    let groupStage;
    let sortStage;

    if (groupBy === "day") {
      groupStage = {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      };
      sortStage = { "_id.year": 1, "_id.month": 1, "_id.day": 1 };
    } else {
      groupStage = {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      };
      sortStage = { "_id.year": 1, "_id.month": 1 };
    }

    const pipeline = [
      { $match: matchStage },
      { $group: groupStage },
      { $sort: sortStage }
    ];

    const results = await Enquiry.aggregate(pipeline);

    // Build the full timeline array to fill in zeroes
    const data = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (groupBy === "day") {
      // Loop daily
      const curr = new Date(startDate);
      while (curr <= endDate) {
        const y = curr.getFullYear();
        const m = curr.getMonth() + 1;
        const d = curr.getDate();

        const found = results.find(
          (r) => r._id.year === y && r._id.month === m && r._id.day === d
        );

        data.push({
          label: `${d} ${monthNames[m - 1]}`,
          year: y,
          month: m,
          day: d,
          count: found ? found.count : 0,
        });

        curr.setDate(curr.getDate() + 1);
      }
    } else {
      // Loop monthly
      const curr = new Date(startDate);
      curr.setDate(1); // align to start of month
      while (curr <= endDate) {
        const y = curr.getFullYear();
        const m = curr.getMonth() + 1;

        const found = results.find(
          (r) => r._id.year === y && r._id.month === m
        );

        data.push({
          label: `${monthNames[m - 1]} ${y}`,
          year: y,
          month: m,
          count: found ? found.count : 0,
        });

        curr.setMonth(curr.getMonth() + 1);
      }
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get service-wise lead distribution
 * @route   GET /api/analytics/services
 * @access  Admin
 */
const getServiceWiseLeads = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    const pipeline = [
      { $match: filter },
      {
        $group: {
          _id: "$serviceType",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ];

    const results = await Enquiry.aggregate(pipeline);

    // Map results and handle null/empty serviceType
    const data = results.map((r) => ({
      service: r._id || "Not Specified",
      serviceType: r._id || "Not Specified",
      count: r.count,
    }));

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getMonthlyLeads,
  getServiceWiseLeads,
};
