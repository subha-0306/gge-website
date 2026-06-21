/**
 * Enquiry Routes
 *
 * POST   /api/enquiries           — Create enquiry (public)
 * GET    /api/enquiries           — List all enquiries (admin)
 * GET    /api/enquiries/:id       — Get single enquiry (admin)
 * PATCH  /api/enquiries/:id/status — Update status (admin)
 * POST   /api/enquiries/:id/notes — Add note (admin)
 * DELETE /api/enquiries/:id       — Delete enquiry (admin)
 */

const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/enquiryController");

const { protect } = require("../middleware/authMiddleware");
const {
  validateEnquiry,
  validateStatusUpdate,
  validatePriorityUpdate,
  validateNote,
} = require("../middleware/validateRequest");

// ── Public ──
router.post("/", validateEnquiry, createEnquiry);

// ── Admin (protected) ──
router.get("/", protect, getEnquiries);
router.get("/:id", protect, getEnquiryById);
router.patch("/:id/status", protect, validateStatusUpdate, updateEnquiryStatus);
router.patch("/:id/priority", protect, validatePriorityUpdate, updateEnquiryPriority);
router.patch("/:id/followup", protect, updateFollowUp);
router.post("/:id/notes", protect, validateNote, addNote);
router.put("/:id/notes/:noteId", protect, validateNote, editNote);
router.delete("/:id/notes/:noteId", protect, deleteNote);
router.delete("/:id", protect, deleteEnquiry);

module.exports = router;
