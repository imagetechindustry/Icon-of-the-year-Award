import express from "express";
import { recordVisit, getVisitCount } from "../controllers/visitController.js";

const router = express.Router();

// Record a new visit (or just get the count if we want to separate logic later)
router.post("/record", recordVisit);

// Get current visit count
router.get("/count", getVisitCount);

export default router;
