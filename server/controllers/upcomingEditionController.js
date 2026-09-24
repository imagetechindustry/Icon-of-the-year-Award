import UpcomingEdition from "../models/UpcomingEdition.js";

// @desc    Create a new upcoming edition
// @route   POST /api/upcoming-editions
// @access  Admin
export const createEdition = async (req, res) => {
    try {
        const { year, title, editionLabel, locations, date, hero, videoLinks } = req.body;

        // Convert locations from comma-separated string to array
        const parsedLocations = Array.isArray(locations)
            ? locations
            : typeof locations === "string" && locations.trim() !== ""
                ? locations.split(",").map((loc) => loc.trim())
                : [];

        // Convert videoLinks from comma-separated string to array
        const parsedVideoLinks = Array.isArray(videoLinks)
            ? videoLinks
            : typeof videoLinks === "string" && videoLinks.trim() !== ""
                ? videoLinks.split(",").map((link) => link.trim()).filter(Boolean)
                : [];

        // Map uploaded files to URLs
        const images = req.files ? req.files.map(file => file.location) : [];

        const edition = new UpcomingEdition({
            year: Number(year),
            title,
            editionLabel,
            locations: parsedLocations,
            date,
            hero,
            images,
            videoLinks: parsedVideoLinks,
        });

        const savedEdition = await edition.save();
        res.status(201).json(savedEdition);
    } catch (error) {
        console.error("Error creating upcoming edition:", error);
        res.status(500).json({ message: "Failed to create upcoming edition", error: error.message });
    }
};

// @desc    Get all upcoming editions
// @route   GET /api/upcoming-editions
// @access  Public
export const getEditions = async (req, res) => {
    try {
        // Fetch all editions
        const editions = await UpcomingEdition.find()
            .sort({ year: -1, createdAt: -1 }) // Sort by year descending
            .select("year title editionLabel locations date hero images videoLinks");

        // Process data to group by year
        const groupedEditions = editions.reduce((acc, edition) => {
            const yearStr = edition.year.toString();

            // Find or create the year group
            let yearGroup = acc.find((g) => g.year === yearStr);
            if (!yearGroup) {
                yearGroup = { year: yearStr, items: [] };
                acc.push(yearGroup);
            }

            // Push item into the correct year group
            yearGroup.items.push({
                _id: edition._id,
                title: edition.title,
                editionLabel: edition.editionLabel,
                locations: edition.locations,
                date: edition.date,
                hero: edition.hero,
                images: edition.images,
                videoLinks: edition.videoLinks,
            });

            return acc;
        }, []);

        res.status(200).json(groupedEditions);
    } catch (error) {
        console.error("Error fetching upcoming editions:", error);
        res.status(500).json({ message: "Failed to fetch upcoming editions", error: error.message });
    }
};

// @desc    Get a specific upcoming edition by year and title
// @route   GET /api/upcoming-editions/:year
// @access  Public
export const getEditionByYear = async (req, res) => {
    try {
        const { year } = req.params;
        const { title } = req.query; // e.g., ?title=international-education-award

        if (!title) {
            return res.status(400).json({ message: "Title query parameter is required" });
        }

        // Fetch all editions for the given year
        const editions = await UpcomingEdition.find({ year: Number(year) });

        if (!editions.length) {
            return res.status(404).json({ message: "No upcoming editions found for this year" });
        }

        // Find the specific edition by formatting the title
        const targetEdition = editions.find((ed) => {
            const formattedTitle = ed.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return formattedTitle === title;
        });

        if (!targetEdition) {
            return res.status(404).json({ message: "Upcoming edition not found" });
        }

        res.status(200).json(targetEdition);
    } catch (error) {
        console.error("Error fetching upcoming edition by year:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Update an upcoming edition
// @route   PUT /api/upcoming-editions/:id
// @access  Admin
export const updateEdition = async (req, res) => {
    try {
        const { id } = req.params;
        const { year, title, editionLabel, locations, date, hero, videoLinks, existingImages } = req.body;

        // Convert locations from comma-separated string to array
        const parsedLocations = Array.isArray(locations)
            ? locations
            : typeof locations === "string" && locations.trim() !== ""
                ? locations.split(",").map((loc) => loc.trim())
                : [];

        // Convert videoLinks from comma-separated string to array
        const parsedVideoLinks = Array.isArray(videoLinks)
            ? videoLinks
            : typeof videoLinks === "string" && videoLinks.trim() !== ""
                ? videoLinks.split(",").map((link) => link.trim()).filter(Boolean)
                : [];

        // existingImages might be sent as an array or a single string
        const parsedExistingImages = Array.isArray(existingImages)
            ? existingImages
            : typeof existingImages === "string" && existingImages.trim() !== ""
                ? [existingImages]
                : [];

        // Handle new image uploads (req.files array)
        const newImages = req.files ? req.files.map(file => file.location) : [];

        // Combine retained images with newly uploaded ones
        const combinedImages = [...parsedExistingImages, ...newImages];

        const updatedData = {
            year: Number(year),
            title,
            editionLabel,
            locations: parsedLocations,
            date,
            hero,
            videoLinks: parsedVideoLinks,
            images: combinedImages,
        };

        const updatedEdition = await UpcomingEdition.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true, runValidators: true }
        );

        if (!updatedEdition) {
            return res.status(404).json({ message: "Upcoming Edition not found" });
        }

        res.status(200).json(updatedEdition);
    } catch (error) {
        console.error("Error updating upcoming edition:", error);
        res.status(500).json({ message: "Failed to update upcoming edition", error: error.message });
    }
};

// @desc    Delete an upcoming edition
// @route   DELETE /api/upcoming-editions/:id
// @access  Admin
export const deleteEdition = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEdition = await UpcomingEdition.findByIdAndDelete(id);

        if (!deletedEdition) {
            return res.status(404).json({ message: "Upcoming edition not found" });
        }

        res.status(200).json({ message: "Upcoming edition deleted successfully" });
    } catch (error) {
        console.error("Error deleting upcoming edition:", error);
        res.status(500).json({ message: "Failed to delete upcoming edition", error: error.message });
    }
};
