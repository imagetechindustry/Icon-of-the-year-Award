import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "../utils/s3Config.js";
import path from "path";
import config from "../config/config.js";

const uploadImage = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: config.AWS.BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const fileName = `${Date.now()}_${path.basename(file.originalname)}`;
            const fullPath = `gallery/${fileName}`;
            cb(null, fullPath);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type, only images are allowed!"), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
});

export default uploadImage;
