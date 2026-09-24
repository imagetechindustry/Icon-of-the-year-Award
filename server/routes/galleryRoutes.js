import express from "express";
import { getGallery, updateGallery, uploadPhotos } from "../controllers/galleryController.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";
import uploadImage from "../middleware/uploadImageMiddleware.js";

const router = express.Router();

router.get("/", getGallery);
router.put("/", authenticate, requireAdmin, updateGallery);
router.post("/upload", authenticate, requireAdmin, uploadImage.array("images", 10), uploadPhotos);

export default router;
