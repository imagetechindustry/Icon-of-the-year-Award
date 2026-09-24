import config from "./config/config.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";

import authRoutes from "./routes/authRoutes.js";
import nominationRoutes from "./routes/nominationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import previousEditionRoutes from "./routes/previousEditionRoutes.js";
import upcomingEditionRoutes from "./routes/upcomingEditionRoutes.js";
import developerRoutes from "./routes/developerRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import passport from "passport";
import session from "express-session";
import "./config/passport.js";
import { signToken } from "./middleware/authMiddleware.js";

const app = express();
app.use(cors({
  origin: [
    config.FRONTEND_URL,
    config.FRONTEND_URL ? config.FRONTEND_URL.replace(/\/$/, "") : "",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Security and Logging
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// DEBUG: Log all requests and capture 401 responses to identify the source
app.use((req, res, next) => {
  console.log(`[DEBUG] 📡 ${req.method} ${req.url}`);
  const originalJson = res.json;
  res.json = function (data) {
    if (res.statusCode === 401) {
      console.log(`[DEBUG] 🛑 401 UNAUTHORIZED for ${req.url}:`, JSON.stringify(data));
    }
    return originalJson.call(this, data);
  };
  next();
});

console.log("🛠️ Server Config Check:", {
  PORT: config.PORT,
  MONGO_URI: config.MONGO_URI ? "LOADED" : "MISSING",
  JWT_SECRET: config.JWT_SECRET === "dev_primetime_secret_change_me" ? "DEFAULT" : "LOADED FROM ENV",
  AWS_BUCKET: config.AWS.BUCKET_NAME,
  FRONTEND: config.FRONTEND_URL
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Session Middleware (Required for Google OAuth state)
app.use(
  session({
    secret: config.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: config.NODE_ENV === "production" },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Rate Limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many requests from this IP, please try again after 15 minutes" },
});

// Configure highly resilient MongoDB connection options for production
const mongooseOptions = {
  dbName: config.MONGO_DB_NAME || undefined,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely if DB is unreachable
  socketTimeoutMS: 45000,         // Close sockets after 45s of inactivity to prevent resource leaks
  maxPoolSize: 50,                // Up to 50 parallel database socket connections
  minPoolSize: 5,                 // Keep at least 5 sockets open for fast response times
};

// Monitor MongoDB Connection Events to handle failures gracefully
mongoose.connection.on("connected", () => {
  console.log("🟢 MongoDB connection established successfully.");

});

mongoose.connection.on("error", (err) => {
  console.error("🔴 MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB connection disconnected. Attempting to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("🟢 MongoDB connection re-established successfully.");
});

// Initiate connection with robust options
mongoose
  .connect(config.MONGO_URI, mongooseOptions)
  .catch((err) => {
    console.error("🔴 Failed to initialize MongoDB connection:", err);
  });

app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "PrimeTime Awards API" });
});

// Google Auth Initiation
app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Auth Callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login?error=google_auth_failed" }),
  (req, res) => {
    const user = req.user;
    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });

    // Redirect to frontend /auth-callback with data
    res.redirect(`${config.FRONTEND_URL}/auth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    }))}`);
  }
);

// Backward compatibility
app.get("/api/auth/google/callback", (req, res) => {
  res.redirect(307, `/auth/google/callback?${new URLSearchParams(req.query).toString()}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/nominations", nominationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/previous-editions", previousEditionRoutes);
app.use("/api/upcoming-editions", upcomingEditionRoutes);
app.use("/api/developer", developerRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/gallery", galleryRoutes);

// Global Error Handler
app.use(errorHandler);

app.set('trust proxy', true); // Trust first proxy

const server = app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
server.timeout = 600000; // 10 minutes for large photo uploads
