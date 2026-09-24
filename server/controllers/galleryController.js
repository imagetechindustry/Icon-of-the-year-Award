import Gallery from "../models/Gallery.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../utils/s3Config.js";
import config from "../config/config.js";

export const getGallery = async (req, res) => {
    try {
        let gallery = await Gallery.findOne({ identifier: "main_gallery" });
        if (!gallery) {
            gallery = new Gallery({ identifier: "main_gallery" });
            await gallery.save();
        }
        res.status(200).json({ success: true, data: gallery });
    } catch (error) {
        console.error("Error fetching gallery:", error);
        res.status(500).json({ success: false, message: "Error fetching gallery" });
    }
};

export const updateGallery = async (req, res) => {
    try {
        const { reels, videos, photos } = req.body;
        
        // Find existing to handle deletes
        let gallery = await Gallery.findOne({ identifier: "main_gallery" });
        if (!gallery) {
            gallery = new Gallery({ identifier: "main_gallery" });
        }
        
        // If photos are provided in the update, it means the admin might have deleted some.
        if (photos && Array.isArray(photos)) {
            const removedPhotos = gallery.photos.filter(p => !photos.includes(p));
            for (const url of removedPhotos) {
                try {
                    // Extract S3 key from URL
                    // Example URL: https://bucket-name.s3.region.amazonaws.com/gallery/1234_img.jpg
                    const urlObj = new URL(url);
                    const key = decodeURIComponent(urlObj.pathname.substring(1));
                    await s3Client.send(new DeleteObjectCommand({
                        Bucket: config.AWS.BUCKET_NAME,
                        Key: key
                    }));
                } catch (s3Error) {
                    console.error("Failed to delete from S3:", s3Error);
                }
            }
            gallery.photos = photos;
        }

        if (reels) gallery.reels = reels;
        if (videos) gallery.videos = videos;

        await gallery.save();
        res.status(200).json({ success: true, data: gallery });
    } catch (error) {
        console.error("Error updating gallery:", error);
        res.status(500).json({ success: false, message: "Error updating gallery" });
    }
};

export const uploadPhotos = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "No files uploaded" });
        }

        const newPhotoUrls = req.files.map(file => file.location);

        let gallery = await Gallery.findOne({ identifier: "main_gallery" });
        if (!gallery) {
            gallery = new Gallery({ identifier: "main_gallery" });
        }

        gallery.photos = [...gallery.photos, ...newPhotoUrls];
        await gallery.save();

        res.status(200).json({ success: true, data: gallery });
    } catch (error) {
        console.error("Error uploading photos:", error);
        res.status(500).json({ success: false, message: "Error uploading photos" });
    }
};
