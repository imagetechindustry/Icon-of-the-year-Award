import mongoose from "mongoose";

const previousEditionSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        editionLabel: {
            type: String,
            required: true,
        },
        locations: {
            type: [String],
            required: true,
        },
        date: {
            type: String,
        },
        hero: {
            type: String,
        },
        images: {
            type: [String],
            default: [],
        },
        videoLinks: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("PreviousEdition", previousEditionSchema);
