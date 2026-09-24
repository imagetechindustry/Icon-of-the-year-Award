import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../middleware/authMiddleware.js";
import { registerSchema, loginSchema, validate } from "../middleware/validators.js";
import { sendOTPEmail, sendPasswordResetEmail } from "../utils/emailService.js";
import passport from "passport";
import config from "../config/config.js";

const router = express.Router();

// Helper to generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register user (optionally as admin via secret code)
router.post("/register", registerSchema, validate, async (req, res, next) => {
  try {
    const { name, email, password, secretCode } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.isVerified) {
        return res.status(409).json({ message: "Email already registered and verified" });
      }
      // If not verified, we can update the OTP and profile
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user;
    if (existing) {
      existing.name = name;
      existing.passwordHash = passwordHash;
      existing.otp = otp;
      existing.otpExpires = otpExpires;
      user = await existing.save();
    } else {
      const role =
        secretCode &&
          config.ADMIN.CREATE_SECRET &&
          secretCode === config.ADMIN.CREATE_SECRET
          ? "admin"
          : "user";

      user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        role,
        isVerified: false,
        otp,
        otpExpires,
      });
    }

    try {
      await sendOTPEmail(user.email, otp);
    } catch (e) {
      console.error("Failed to send verification email:", e);
      return res.status(500).json({ message: "Account created but failed to send verification email. Please try to verify later." });
    }

    return res.status(201).json({
      message: "Registration successful. Please check your email for the verification code.",
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });

    return res.json({
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Resend OTP
router.post("/resend-otp", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    await sendOTPEmail(user.email, otp);

    return res.json({ message: "Verification code resent successfully" });
  } catch (err) {
    next(err);
  }
});

// Login normal user
router.post("/login", loginSchema, validate, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify your email to login.",
        notVerified: true,
        email: user.email
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Forgot Password - Send OTP
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // For security, don't reveal if user exists or not
      return res.json({ message: "If an account exists with this email, a reset code has been sent." });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    console.log(`🔑 Generated OTP for ${user.email}: ${otp}`);
    console.log(`📧 Calling sendPasswordResetEmail for ${user.email}...`);
    await sendPasswordResetEmail(user.email, otp);

    return res.json({ message: "If an account exists with this email, a reset code has been sent." });
  } catch (err) {
    next(err);
  }
});

// Reset Password - Verify OTP and Update Password
router.post("/reset-password", async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired reset code" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = passwordHash;
    user.otp = null;
    user.otpExpires = null;
    user.isVerified = true; // Mark as verified since they had access to the email
    await user.save();

    return res.json({ message: "Password reset successful. You can now login with your new password." });
  } catch (err) {
    next(err);
  }
});

export default router;







