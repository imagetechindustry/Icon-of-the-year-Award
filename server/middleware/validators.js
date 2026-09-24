import { body, validationResult } from "express-validator";

// Middleware to check validation results
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
};

export const registerSchema = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];

export const loginSchema = [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
];

export const nominationSchema = [
    body("participationType")
        .isIn(["nominated as award", "attend as speaker", "attend as exhibitor", "attend as sponsor"])
        .withMessage("Invalid participation type"),
    body("nomineeName").trim().notEmpty().withMessage("Name is required"),
    body("organization").trim().notEmpty().withMessage("Organization name is required"),

    // Conditional validation 
    body("field").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("Field is required"),
    body("category").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("Category is required"),
    body("subCategory").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("Sub-category is required"),

    body("orgHeadEmail").if(body("participationType").equals("nominated as award")).isEmail().withMessage("Valid organization head email is required"),
    body("contactEmail").if(body("participationType").equals("nominated as award")).isEmail().withMessage("Valid contact person email is required"),
    body("contactMobile").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("Contact mobile is required"),

    body("street").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("Street is required"),
    body("city").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("City is required"),
    body("state").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("State is required"),
    body("zip").if(body("participationType").equals("nominated as award")).notEmpty().withMessage("ZIP code is required"),

    // Basic fields for other types
    body("email").if(body("participationType").not().equals("nominated as award")).isEmail().withMessage("Valid email is required"),
    body("mobile").if(body("participationType").not().equals("nominated as award")).notEmpty().withMessage("Mobile number is required"),
];
