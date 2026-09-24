/**
 * INQUIRY MODEL
 * 
 * This file defines the Mongoose Schema for the "Inquiries" collection.
 * It is used to store user leads captured via the Quick Access widget
 * on the front end, manage their verification status, and hold temporary
 * OTP parameters for phone number verification.
 */

import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    // The user's full name, entered during Quick Access submission
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // The user's WhatsApp phone number (cleansed of non-digit formatting characters)
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    // Selected type of inquiry (e.g. nomination, general, attending, sponsorship)
    inquiryType: {
      type: String,
      required: true,
      trim: true,
    },
    // Specific custom description if the inquiry type is set to "other"
    purpose: {
      type: String,
      trim: true,
      default: "",
    },
    // Flag to denote if the phone number has been successfully verified via OTP code
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Holds the temporary 6-digit hashed/plain OTP code sent to the user's phone
    otp: {
      type: String,
      default: null,
    },
    // Time limit for OTP verification (OTP is invalid after this date)
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    // Automatically creates `createdAt` and `updatedAt` timestamps
    timestamps: true,
  }
);

// DATABASE OPTIMIZATIONS (INDEXES)
// Creates an index on the phone field to allow fast lookups when sending or verifying OTPs
inquirySchema.index({ phone: 1 });
// Creates an index on createdAt field to list inquiries in descending order quickly in the admin panel
inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
