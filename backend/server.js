/**
 * Golden Globe Enterprises — Lead Management System
 * Main server entry point
 *
 * Initializes Express, applies security middleware, mounts routes,
 * connects to MongoDB, and starts listening.
 */

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const dotenv = require("dotenv");

// ── Load environment variables ──
dotenv.config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ── Route imports ──
const enquiryRoutes = require("./routes/enquiryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const exportRoutes = require("./routes/exportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// ── Initialize Express & HTTP Server ──
const app = express();
const server = http.createServer(app);

// ── Initialize Socket.IO ──
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// Expose io in Express app context
app.set("io", io);

io.on("connection", (socket) => {
  console.log(`🔌 Client connected to Socket.IO: ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected from Socket.IO: ${socket.id}`);
  });
});

// ── Security Middleware ──

// Set various HTTP headers for security
app.use(helmet());

// CORS — allow requests from the React frontend
const allowedOrigins = [
  "https://gge-website-eosin.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Rate limiting — prevent brute-force and DoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

// Stricter rate limit for public enquiry submission
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // max 10 submissions per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many enquiries submitted. Please try again later.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

// Stricter rate limit for admin login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 login attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

app.use("/api", apiLimiter);

// Body parsing
app.use(express.json({ limit: "10kb" })); // limit body size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Sanitize data — prevent MongoDB injection
app.use(mongoSanitize());

// ── Health check ──
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Golden Globe Enterprises API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ── Mount Routes ──
app.use("/api/enquiries", enquiryLimiter, enquiryRoutes);
app.use("/api/admin", loginLimiter, adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/notifications", notificationRoutes);

// ── Error Handling ──
app.use(notFound);
app.use(errorHandler);

// ── Connect to DB & Start Server ──
const PORT = process.env.PORT || 5000;

const startFollowUpChecker = () => {
  const Enquiry = require("./models/Enquiry");
  const Notification = require("./models/Notification");

  setInterval(async () => {
    try {
      const now = new Date();
      // Find enquiries where follow-up date is <= now, completed is false, notified is false
      const dueLeads = await Enquiry.find({
        "nextFollowUp.date": { $lte: now },
        "nextFollowUp.completed": false,
        "nextFollowUp.notified": false
      });

      for (const lead of dueLeads) {
        // Create database notification
        const notification = await Notification.create({
          title: "Follow-Up Reminder",
          message: `Follow-up is due for client: ${lead.fullName} (${lead.serviceType || "No Service"})`,
          type: "follow_up",
          enquiryId: lead._id
        });

        // Emit socket notification
        if (io) {
          io.emit("new_notification", {
            _id: notification._id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            enquiryId: {
              _id: lead._id,
              fullName: lead.fullName,
              serviceType: lead.serviceType
            },
            isRead: notification.isRead,
            createdAt: notification.createdAt
          });
        }

        // Set notified to true
        lead.nextFollowUp.notified = true;
        await lead.save();
        
        console.log(`⏰  Follow-up notification sent for: ${lead.fullName}`);
      }
    } catch (err) {
      console.error("Error running follow-up due checker:", err);
    }
  }, 60000); // scan every 60 seconds
};

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`\n🏦  GGE Backend running on port ${PORT}`);
    console.log(`📡  Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🔗  Health check: http://localhost:${PORT}/api/health\n`);
    
    // Start background follow-up due checker
    startFollowUpChecker();
  });
});
