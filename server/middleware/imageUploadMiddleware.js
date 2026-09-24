import multer from "multer";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../utils/s3Config.js";
import path from "path";
import config from "../config/config.js";

// Step 1: Multer Memory Storage (keep the file in memory buffer)
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type, only images are allowed!"), false);
        }
    },
    limits: {
        fileSize: 15 * 1024 * 1024, // 15MB limit per image (uncompressed)
    },
});

// Step 2: Custom middleware to compress and upload to S3
/**
 * @param {string} fieldName - The field name in the multipart form
 * @param {number} maxCount - Max number of files
 */
export const uploadAndCompress = (fieldName, maxCount = 30) => {
    return [
        upload.array(fieldName, maxCount),
        async (req, res, next) => {
            if (!req.files || req.files.length === 0) {
                return next();
            }

            try {
                const uploadPromises = req.files.map(async (file) => {
                    const fileName = `${Date.now()}_${path.parse(file.originalname).name}.webp`;
                    const fullPath = `editions/${fileName}`;

                    // Compress using Sharp
                    const compressedBuffer = await sharp(file.buffer)
                        .resize({ width: 1920, withoutEnlargement: true }) // Increased to 1920px for high-quality banners
                        .webp({ quality: 90 }) // Increased quality from 70 to 90
                        .toBuffer();

                    // Upload to S3
                    const command = new PutObjectCommand({
                        Bucket: config.AWS.BUCKET_NAME,
                        Key: fullPath,
                        Body: compressedBuffer,
                        ContentType: "image/webp",
                    });

                    await s3Client.send(command);

                    // Attach the final S3 URL back to the file object for the controller
                    // Original multer-s3 attaches it to .location
                    file.location = `https://${config.AWS.BUCKET_NAME}.s3.${config.AWS.REGION}.amazonaws.com/${fullPath}`;
                    return file;
                });

                await Promise.all(uploadPromises);
                next();
            } catch (err) {
                console.error("Compression/Upload Error:", err);
                return res.status(500).json({ success: false, message: "Error processing/uploading images: " + err.message });
            }
        },
    ];
};

export default uploadAndCompress;
