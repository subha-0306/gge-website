/**
 * Export Routes
 *
 * GET /api/export/csv — Download all enquiries as CSV (admin)
 */

const express = require("express");
const router = express.Router();

const { exportCSV } = require("../controllers/exportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/csv", protect, exportCSV);

module.exports = router;
