import mongoose from "mongoose";

const nominationSchema = new mongoose.Schema(
  {
    participationType: {
      type: String,
      enum: ["nominated as award", "attend as speaker", "attend as exhibitor", "attend as sponsor"],
      required: true,
      default: "nominated as award",
    },
    field: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    category: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    subCategory: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    otherSubCategory: {
      type: String,
      trim: true,
      default: "",
    },
    nomineeName: {
      type: String,
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    // New fields for simpler form (speaker/exhibitor/sponsor)
    designation: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    // Organization head
    orgHeadName: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    orgHeadDesignation: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    orgHeadMobile: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    orgHeadEmail: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
      lowercase: true,
    },

    // Contact person
    contactName: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    contactDesignation: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    contactMobile: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
    },
    contactEmail: {
      type: String,
      required: function () {
        return this.participationType === "nominated as award";
      },
      trim: true,
      lowercase: true,
    },

    // Business details
    website: {
      type: String,
      trim: true,
      default: "",
    },
    turnover: {
      type: String,
      trim: true,
      default: "",
    },

    // Address
    street: {
      type: String,
      required: function () {
        return (this.participationType || "nominated as award") === "nominated as award";
      },
      trim: true,
    },
    city: {
      type: String,
      required: function () {
        return (this.participationType || "nominated as award") === "nominated as award";
      },
      trim: true,
    },
    state: {
      type: String,
      required: function () {
        return (this.participationType || "nominated as award") === "nominated as award";
      },
      trim: true,
    },
    zip: {
      type: String,
      required: function () {
        return (this.participationType || "nominated as award") === "nominated as award";
      },
      trim: true,
    },

    // General remarks visible to both admin and user
    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    // Nomination evaluation status (admin-controlled)
    status: {
      type: String,
      enum: ["nominated", "evaluation", "in_progress", "selected", "rejected"],
      default: "nominated",
    },

    // Financial / follow-up status (admin-only)
    paymentStatus: {
      type: String,
      enum: ["not_paid", "initial_paid", "paid", "not_interested"],
      default: "not_paid",
    },

    // Amount agreed/paid for this nomination (admin-only)
    amount: {
      type: String,
      trim: true,
      default: "",
    },

    // Final category decided by admin (can differ from user-selected category)
    assignedCategory: {
      type: String,
      trim: true,
      default: "",
    },

    // Internal remark for admin about status / payment / communication
    adminRemark: {
      type: String,
      trim: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nominationType: {
      type: String,
      enum: ["education", "healthcare", "international education", "internationalEducation", "indiaBrandIcon", "India Brand Icon", "indianIconOfTheYear", "Indian Icon of the year"],
      default: "indianIconOfTheYear",
    },
    pdfUrl: {
      type: String,
      trim: true,
      default: "",
    },
    preferredLocation: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Helpful indexes for faster admin queries & filtering
nominationSchema.index({ createdAt: -1 });
nominationSchema.index({ user: 1, createdAt: -1 });
nominationSchema.index({ status: 1, createdAt: -1 });
nominationSchema.index({ paymentStatus: 1, createdAt: -1 });

const Nomination = mongoose.model("Nomination", nominationSchema);

export default Nomination;



