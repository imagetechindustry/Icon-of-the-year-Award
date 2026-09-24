import express from "express";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import Nomination from "../models/Nomination.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/authMiddleware.js";
import { nominationSchema, validate } from "../middleware/validators.js";
import upload from "../middleware/uploadMiddleware.js";
import s3Client from "../utils/s3Config.js";
import { sendNominationSuccessEmail, sendNominationCredentialsEmail } from "../utils/emailService.js";
import config from "../config/config.js";

const router = express.Router();
const JWT_SECRET = config.JWT_SECRET;
const BUCKET_NAME = config.AWS.BUCKET_NAME;

// Helper to generate signed URL
const getSignedPdfUrl = async (key) => {
  if (!key) return "";
  try {
    let s3Key = key;
    // If it's already a full URL (legacy), try to extract the key if it belongs to our bucket
    if (key.startsWith("http")) {
      const urlObj = new URL(key);
      if (urlObj.hostname.includes("amazonaws.com") && urlObj.pathname.includes(BUCKET_NAME)) {
        // Simple extraction: the key usually follows the bucket name or hostname
        // For subfolder structure like /international education/..., it starts after the bucket part
        const pathParts = urlObj.pathname.split("/");
        // If URL format is s3.amazonaws.com/bucket/key...
        const bucketIndex = pathParts.indexOf(BUCKET_NAME);
        if (bucketIndex !== -1) {
          s3Key = pathParts.slice(bucketIndex + 1).join("/");
        } else {
          // If URL format is bucket.s3.amazonaws.com/key...
          s3Key = urlObj.pathname.startsWith("/") ? urlObj.pathname.slice(1) : urlObj.pathname;
        }
      } else {
        return key; // External or unknown URL
      }
    }

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: decodeURIComponent(s3Key), // Decode in case it's stored encoded
      ResponseContentType: 'application/pdf',
      ResponseContentDisposition: 'inline'
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
  } catch (err) {
    console.error("Error generating signed URL:", err);
    return "";
  }
};

// Helper to generate a random password
const generateRandomPassword = (length = 10) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

// Create a nomination (logged-in user or guest)
router.post("/", (req, res, next) => {
  // Manual "Soft" authentication: Try to get user if token exists, but don't fail if not
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // If token is invalid/expired, we just treat them as guest
      console.log("Nomination: Invalid token provided, proceeding as guest.");
    }
  }
  next();
}, upload.single("pdf"), nominationSchema, validate, async (req, res, next) => {
  try {
    const payload = req.body || {};
    let userId = req.user ? req.user.id : null;
    let autoCreated = false;
    let rawPassword = null;

    // If not logged in, we try to find or create a user based on contactEmail or email
    if (!userId) {
      const targetEmail = (payload.contactEmail || payload.email || "").toLowerCase();
      if (!targetEmail) {
        return res.status(400).json({ message: "Email is required for nomination" });
      }

      let user = await User.findOne({ email: targetEmail });

      if (!user) {
        // Create a new user automatically
        rawPassword = generateRandomPassword();
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(rawPassword, salt);

        user = await User.create({
          name: payload.contactName || payload.nomineeName || "User",
          email: targetEmail,
          passwordHash,
          isVerified: true, // Auto-verified since they are submitting a nomination
          role: "user"
        });

        autoCreated = true;
        console.log(`👤 Auto-creating user: ${user.email}`);
        // We will send credentials bundled with the success email below
      }

      userId = user._id;
    }

    // Handle file upload if present - Store the KEY instead of the location
    if (req.file && req.file.key) {
      payload.pdfUrl = req.file.key;
    } else if (req.file && req.file.location) {
      // Fallback for different multer-s3 versions or local storage
      payload.pdfUrl = req.file.location;
    }

    // Normalize preferredLocation to array if it comes as a string or is missing
    if (payload.preferredLocation) {
      if (!Array.isArray(payload.preferredLocation)) {
        payload.preferredLocation = [payload.preferredLocation];
      }
    } else {
      payload.preferredLocation = [];
    }

    const nomination = await Nomination.create({
      ...payload,
      user: userId,
    });

    // Send confirmation email asynchronously with a small delay to avoid SMTP throttling
    const targetEmail = nomination.contactEmail || nomination.email;
    if (targetEmail) {
      const credentials = autoCreated ? { email: targetEmail, password: rawPassword } : null;
      setTimeout(() => {
        console.log(`📧 Sending nomination success email (with credentials: ${autoCreated}) to ${targetEmail}...`);
        sendNominationSuccessEmail(targetEmail, nomination.nomineeName, credentials).catch(err => {
          console.error("❌ Delayed Notification Error:", err);
        });
      }, 2000); // 2 second delay
    }

    return res.status(201).json({
      ...nomination.toObject ? nomination.toObject() : nomination,
      autoCreated // Let frontend know if an account was created
    });
  } catch (err) {
    console.error("DEBUG: Create Nomination Error:", err);
    next(err);
  }
});

// Fetch current user's nominations
router.get("/my", authenticate, async (req, res, next) => {
  try {
    const docs = await Nomination.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    // Generate signed URLs for each nomination's PDF
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

// Fetch a single nomination by ID (must belong to the user)
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const nomination = await Nomination.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).lean();

    if (!nomination) {
      return res.status(404).json({ message: "Nomination not found" });
    }

    // Generate signed URL
    if (nomination.pdfUrl) {
      nomination.pdfUrl = await getSignedPdfUrl(nomination.pdfUrl);
    }

    return res.json(nomination);
  } catch (err) {
    next(err);
  }
});

// Update a nomination (only if status is 'nominated')
router.put("/:id", authenticate, upload.single("pdf"), nominationSchema, validate, async (req, res, next) => {
  try {
    const nomination = await Nomination.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!nomination) {
      return res.status(404).json({ message: "Nomination not found" });
    }

    if (nomination.status !== "nominated") {
      return res.status(403).json({
        message: "This nomination can no longer be edited as it is under evaluation.",
      });
    }

    const payload = req.body || {};

    // Handle file upload if present - Store the KEY
    if (req.file && req.file.key) {
      payload.pdfUrl = req.file.key;
    } else if (req.file && req.file.location) {
      payload.pdfUrl = req.file.location;
    }

    // Normalize preferredLocation to array
    if (payload.preferredLocation) {
      if (!Array.isArray(payload.preferredLocation)) {
        payload.preferredLocation = [payload.preferredLocation];
      }
    }

    // Update fields
    Object.assign(nomination, payload);

    await nomination.save();
    return res.json(nomination);
  } catch (err) {
    next(err);
  }
});

export default router;

