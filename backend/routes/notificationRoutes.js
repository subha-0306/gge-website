const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// All routes are protected for admin
router.get("/", protect, getNotifications);
router.patch("/read-all", protect, markAllAsRead);
router.patch("/:id/read", protect, markAsRead);

module.exports = router;
