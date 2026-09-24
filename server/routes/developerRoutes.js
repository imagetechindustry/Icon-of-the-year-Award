import express from "express";
import { signToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Simple hardcoded password authentication for developer panel
router.post("/login", (req, res) => {
    const { password } = req.body;

    if (password === "TimecyberDeveloperToken") {
        // Sign the developer with "admin" role so they can hit the previous editions protected routes
        const token = signToken({
            id: "developer-fixed-id",
            role: "admin",
            name: "Developer"
        });

        return res.status(200).json({
            success: true,
            token,
            user: { id: "developer-fixed-id", role: "admin", name: "Developer" }
        });
    }

    return res.status(401).json({ success: false, message: "Invalid Developer Password" });
});

export default router;
