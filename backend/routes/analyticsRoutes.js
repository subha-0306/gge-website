/**
 * Analytics Routes
 *
 * GET /api/analytics          — Dashboard stats (admin)
 * GET /api/analytics/monthly  — Monthly lead trend (admin)
 * GET /api/analytics/services — Service-wise distribution (admin)
 */

const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getMonthlyLeads,
  getServiceWiseLeads,
} = require("../controllers/analyticsController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getDashboardStats);
router.get("/monthly", protect, getMonthlyLeads);
router.get("/services", protect, getServiceWiseLeads);

module.exports = router;
