import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1/primetime_awards";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    "Missing ADMIN_EMAIL / ADMIN_PASSWORD env vars. Example:\n" +
      "ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=StrongPass123 node scripts/seedAdmin.js"
  );
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME || undefined,
  });

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    const updated = await User.findByIdAndUpdate(
      existing._id,
      { role: "admin" },
      { new: true }
    );
    console.log(`Admin already exists. Ensured role=admin for ${updated.email}`);
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

  const user = await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    passwordHash,
    role: "admin",
  });

  console.log(`Created admin: ${user.email}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed admin failed:", err);
    process.exit(1);
  });


