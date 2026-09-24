import PreviousEdition from "../models/PreviousEdition.js";

export const createEdition = async (req, res) => {
    try {
        console.log("Create Edition Body:", req.body);
        const { year, title, editionLabel, locations, date, hero, videoLinks } = req.body;
        let images = [];
        if (req.files && req.files.length > 0) {
            images = req.files.map((file) => file.location); // AWS S3 URL is in file.location
        }

        // Convert locations from comma-separated string to array if needed
        const locationsArray = Array.isArray(locations)
            ? locations
            : typeof locations === "string"
                ? locations.split(",").map((loc) => loc.trim())
                : [];

        // Convert videoLinks from comma-separated string to array if needed
        const videoLinksArray = Array.isArray(videoLinks)
            ? videoLinks
            : typeof videoLinks === "string"
                ? videoLinks.split(",").map((link) => link.trim()).filter(Boolean)
                : [];

        const parsedYear = Number(year);


        const edition = new PreviousEdition({
            year: parsedYear,
            title,
            editionLabel,
            locations: locationsArray,
            date,
            hero,
            images,
            videoLinks: videoLinksArray,
        });

        await edition.save();
        res.status(201).json({ success: true, data: edition });
    } catch (err) {
        console.error("Create Edition error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getEditions = async (req, res) => {
    try {
        const editions = await PreviousEdition.find()
            .select("year title editionLabel locations date images hero videoLinks")
            .sort({ year: -1 });
        res.status(200).json({ success: true, count: editions.length, data: editions });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getEditionByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const { slug } = req.query; // New: support slug as query param
        const parsedYear = Number(year);
        let edition;

        if (!isNaN(parsedYear)) {
            if (slug) {
                // Find all editions for this year
                const editions = await PreviousEdition.find({ year: parsedYear });
                // Match the specific one by slugified title
                edition = editions.find(e => {
                    const formattedTitle = e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    return formattedTitle === slug.toLowerCase();
                });
            }

            // Fallback: if no slug or slug didn't match, just get the first one for that year
            if (!edition) {
                edition = await PreviousEdition.findOne({ year: parsedYear });
            }
        } else {
            // It's a slug passed as the main parameter (old behavior)
            const editions = await PreviousEdition.find();
            edition = editions.find(e => {
                const formattedTitle = e.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                return formattedTitle === year.toLowerCase();
            });
        }

        if (!edition) {
            return res.status(404).json({ success: false, message: "Edition not found" });
        }
        res.status(200).json({ success: true, data: edition });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateEdition = async (req, res) => {
    try {
        console.log("Update Edition Body:", req.body);
        const { id } = req.params;
        const { year, title, editionLabel, locations, date, hero, existingImages, videoLinks } = req.body;

        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map((file) => file.location);
        }

        let currentImages = [];
        if (existingImages) {
            currentImages = Array.isArray(existingImages) ? existingImages : [existingImages];
        }

        const finalImages = [...currentImages, ...newImages];

        const locationsArray = Array.isArray(locations)
            ? locations
            : typeof locations === "string"
                ? locations.split(",").map((loc) => loc.trim())
                : [];

        const videoLinksArray = Array.isArray(videoLinks)
            ? videoLinks
            : typeof videoLinks === "string"
                ? videoLinks.split(",").map((link) => link.trim()).filter(Boolean)
                : [];

        const edition = await PreviousEdition.findByIdAndUpdate(
            id,
            {
                year: Number(year),
                title,
                editionLabel,
                locations: locationsArray,
                date,
                hero,
                images: finalImages,
                videoLinks: videoLinksArray,
            },
            { new: true, runValidators: true }
        );

        if (!edition) {
            return res.status(404).json({ success: false, message: "Edition not found" });
        }
        res.status(200).json({ success: true, data: edition });
    } catch (err) {
        console.error("Update Edition error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteEdition = async (req, res) => {
    try {
        const { id } = req.params;
        const edition = await PreviousEdition.findById(id);

        if (!edition) {
            return res.status(404).json({ success: false, message: "Edition not found" });
        }

        // Ideally, we should also delete from AWS S3 here. For now just removing from DB.
        await PreviousEdition.findByIdAndDelete(id);

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
