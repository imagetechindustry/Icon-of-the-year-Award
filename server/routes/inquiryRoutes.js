/**
 * INQUIRY AND PUBLIC LEADS API ROUTES
 * 
 * This router exposes two key endpoints used for user-lead verification:
 * 1. POST /api/inquiries/send-otp: Generates and triggers OTP code to WhatsApp.
 * 2. POST /api/inquiries/verify-otp: Validates OTP code, marks inquiry as verified in DB.
 * 
 * Performance Optimizations:
 * - Non-Blocking Background Send: The HTTP response to the client is returned instantly
 *   after saving to DB. The actual WhatsApp API call runs asynchronously in the background.
 */

import express from "express";
import Inquiry from "../models/Inquiry.js";
import { sendWhatsAppOTP } from "../utils/smsService.js";

const router = express.Router();

// Helper to generate a random 6-digit verification code
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * Public route to request an OTP code for a WhatsApp phone number.
 * POST /api/inquiries/send-otp
 */
router.post("/send-otp", async (req, res, next) => {
  try {
    const { phone, name } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    // Clean phone number format by stripping whitespaces
    const cleanPhone = phone.replace(/\s+/g, "");
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Code is valid for exactly 10 minutes

    console.log(`[DEBUG send-otp] 1. Phone: ${cleanPhone}, Name: ${name}`);
    console.log(`[DEBUG send-otp] 2. Querying database for existing record...`);
    
    // Check if there is an existing inquiry session for this phone number
    let inquiry = await Inquiry.findOne({ phone: cleanPhone });
    console.log(`[DEBUG send-otp] 3. Database query result:`, inquiry ? "Found" : "Not Found");

    if (inquiry) {
      // If a record exists, update details and set a fresh OTP session
      inquiry.name = name || inquiry.name || "Temporary User";
      inquiry.otp = otp;
      inquiry.otpExpires = otpExpires;
      console.log(`[DEBUG send-otp] 4. Updating existing inquiry in database...`);
      await inquiry.save();
      console.log(`[DEBUG send-otp] 5. Updated successfully.`);
    } else {
      // Create a new inquiry session
      console.log(`[DEBUG send-otp] 4. Creating new inquiry session in database...`);
      inquiry = await Inquiry.create({
        name: name || "Temporary User",
        phone: cleanPhone,
        inquiryType: "Nomination Enquiry",
        otp,
        otpExpires,
      });
      console.log(`[DEBUG send-otp] 5. Created successfully.`);
    }

    // PERFORMANCE OPTIMIZATION: Trigger WhatsApp OTP sending in the background
    // We do NOT use 'await' here. The server returns the success response to the client
    // instantaneously, while the API request to Meta/Brevo runs asynchronously.
    console.log(`[DEBUG send-otp] 6. Triggering background WhatsApp OTP call...`);
    sendWhatsAppOTP(cleanPhone, otp, name || "User").catch((error) => {
      console.error("❌ Asynchronous background WhatsApp sending failed:", error);
    });
    console.log(`[DEBUG send-otp] 7. Background task spawned. Returning HTTP 200...`);

    return res.status(200).json({
      message: "OTP sent successfully.",
      phone: cleanPhone,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Public route to verify the OTP and save details of the inquiry
 * POST /api/inquiries/verify-otp
 */
router.post("/verify-otp", async (req, res, next) => {
  try {
    const { name, phone, inquiryType, purpose, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone number and OTP are required." });
    }

    // Clean phone number format
    const cleanPhone = phone.replace(/\s+/g, "");
    
    // Find the matching verification session in database
    const inquiry = await Inquiry.findOne({ phone: cleanPhone });

    if (!inquiry) {
      return res.status(404).json({ message: "No verification session found for this phone number." });
    }

    // Verify OTP matching and check if it has expired
    if (inquiry.otp !== otp || inquiry.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // OTP is valid: Update detailed values and confirm verification
    inquiry.name = name || "Anonymous";
    inquiry.inquiryType = inquiryType || "general";
    inquiry.purpose = purpose || "";
    inquiry.isVerified = true;
    
    // Clear OTP fields to prevent code reuse
    inquiry.otp = null;
    inquiry.otpExpires = null;
    
    await inquiry.save();

    return res.status(200).json({
      message: "Phone verified and inquiry stored successfully.",
      inquiry,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
