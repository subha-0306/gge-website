/**
 * Admin Routes
 *
 * POST /api/admin/login — Authenticate admin
 */

const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/adminController");
const { validateLogin } = require("../middleware/validateRequest");

router.post("/login", validateLogin, loginAdmin);

module.exports = router;
