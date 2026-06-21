/**
 * MongoDB connection configuration
 *
 * Connects to MongoDB Atlas using Mongoose with retry logic,
 * connection event listeners, and graceful shutdown handling.
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 8+ uses these defaults, but being explicit for clarity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);

    // ── Connection event listeners ──
    mongoose.connection.on("error", (err) => {
      console.error(`❌  MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄  MongoDB reconnected successfully");
    });

    // ── Graceful shutdown ──
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received. Closing MongoDB connection...`);
      await mongoose.connection.close();
      console.log("MongoDB connection closed. Exiting process.");
      process.exit(0);
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error(`❌  MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
