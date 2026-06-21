/**
 * Admin Seed Script
 *
 * Creates the initial admin user in the database.
 * Run once after setting up the database:
 *
 *   node scripts/seedAdmin.js
 *
 * Uses credentials from environment variables.
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const Admin = require("../models/Admin");

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅  Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL || "admin@ggenterprises.com",
    });

    if (existingAdmin) {
      console.log("⚠️  Admin user already exists. No changes made.");
      console.log(`   Email: ${existingAdmin.email}`);
      process.exit(0);
    }

    // Create admin user
    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || "GGE Admin",
      email: process.env.ADMIN_EMAIL || "admin@ggenterprises.com",
      password: process.env.ADMIN_PASSWORD || "GGE@Admin2026",
    });

    console.log("\n🎉  Admin user created successfully!");
    console.log(`   Name:  ${admin.name}`);
    console.log(`   Email: ${admin.email}`);
    console.log("\n⚠️  Please change the default password after first login.\n");

    process.exit(0);
  } catch (error) {
    console.error(`❌  Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
