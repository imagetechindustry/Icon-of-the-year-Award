import express from "express";
import bcrypt from "bcryptjs";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import User from "../models/User.js";
import Nomination from "../models/Nomination.js";
import Inquiry from "../models/Inquiry.js";
import { authenticate, requireAdmin, signToken } from "../middleware/authMiddleware.js";
import s3Client from "../utils/s3Config.js";
import config from "../config/config.js";

const router = express.Router();

const BUCKET_NAME = config.AWS.BUCKET_NAME;

// Helper to generate signed URL
const getSignedPdfUrl = async (key) => {
  if (!key) return "";
  try {
    let s3Key = key;
    // Handle legacy full URLs for admin too
    if (key.startsWith("http")) {
      const urlObj = new URL(key);
      if (urlObj.hostname.includes("amazonaws.com") && urlObj.pathname.includes(BUCKET_NAME)) {
        const pathParts = urlObj.pathname.split("/");
        const bucketIndex = pathParts.indexOf(BUCKET_NAME);
        if (bucketIndex !== -1) {
          s3Key = pathParts.slice(bucketIndex + 1).join("/");
        } else {
          s3Key = urlObj.pathname.startsWith("/") ? urlObj.pathname.slice(1) : urlObj.pathname;
        }
      } else {
        return key;
      }
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: decodeURIComponent(s3Key),
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline'
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (err) {
    console.error("Error generating signed URL for admin:", err);
    return "";
  }
};

// Admin login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken({ id: user._id, email: user.email, role: user.role, name: user.name });
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

// List all nominations (admin)
router.get("/nominations", authenticate, requireAdmin, async (_req, res, next) => {
  try {
    const docs = await Nomination.find({})
      .populate("user", "email name role")
      .sort({ createdAt: -1 })
      .lean();

    // Generate signed URLs for admin
    const results = await Promise.all(
      docs.map(async (doc) => {
        if (doc.pdfUrl) {
          doc.pdfUrl = await getSignedPdfUrl(doc.pdfUrl);
        }
        return doc;
      })
    );

    return res.json(results);
  } catch (err) {
    next(err);
  }
});

// Update nomination status
router.patch("/nominations/:id/status", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body || {};
    const updated = await Nomination.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("user", "email name role");

    if (!updated) return res.status(404).json({ message: "Nomination not found" });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Update nomination (admin)
router.put("/nominations/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const payload = req.body || {};
    // prevent user reassignment
    delete payload.user;

    const updated = await Nomination.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    }).populate("user", "email name role");

    if (!updated) return res.status(404).json({ message: "Nomination not found" });
    return res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete nomination (admin)
router.delete("/nominations/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Nomination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Nomination not found" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// SECURED INQUIRIES ADMIN ENDPOINTS

/**
 * Fetch list of verified inquiries (leads)
 * GET /api/admin/inquiries
 * Security: Requires valid admin JWT token (authenticate & requireAdmin)
 */
router.get("/inquiries", authenticate, requireAdmin, async (_req, res, next) => {
  try {
    // Only return inquiries that have successfully verified their phone number via OTP
    const docs = await Inquiry.find({ isVerified: true })
      .sort({ createdAt: -1 }) // Sort from newest to oldest
      .lean();
    return res.json(docs);
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a specific inquiry (lead) by ID
 * DELETE /api/admin/inquiries/:id
 * Security: Requires valid admin JWT token
 */
router.delete("/inquiries/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Inquiry not found" });
    return res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;

