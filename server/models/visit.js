import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
    {
        identifier: {
            type: String,
            required: true,
            unique: true,
            default: "global_visit_counter", // Only one document will track the total count
        },
        count: {
            type: Number,
            default: 126420,
        },
    },
    { timestamps: true }
);

const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);

export default Visit;
