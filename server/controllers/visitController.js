import Visit from "../models/visit.js";

/**
 * Record a page visit.
 * Increments the global visit counter by 1 and returns the new count.
 */
export const recordVisit = async (req, res) => {
    try {
        let visit = await Visit.findOne({ identifier: "global_visit_counter" });
        if (!visit) {
            visit = new Visit({ identifier: "global_visit_counter", count: 126421 });
            await visit.save();
        } else {
            visit.count += 1;
            await visit.save();
        }
        
        res.status(200).json({ success: true, count: visit.count });
    } catch (error) {
        console.error("Error recording visit:", error);
        res.status(500).json({ success: false, message: "Error recording visit" });
    }
};

/**
 * Get the current page visit count without incrementing.
 */
export const getVisitCount = async (req, res) => {
    try {
        const visit = await Visit.findOne({ identifier: "global_visit_counter" });
        const count = visit ? visit.count : 126420;
        
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error("Error fetching visit count:", error);
        res.status(500).json({ success: false, message: "Error fetching visit count" });
    }
};
