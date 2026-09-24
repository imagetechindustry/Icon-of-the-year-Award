import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        identifier: {
            type: String,
            required: true,
            unique: true,
            default: "main_gallery",
        },
        reels: {
            type: [String],
            default: [],
        },
        videos: {
            type: [String],
            default: [],
        },
        photos: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
export default Gallery;
