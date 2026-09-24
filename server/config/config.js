import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

// 1. Define the Strict Environment Schema (Every field is mandatory)
const envSchema = z.object({
    // Infrastructure & Server
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number(),

    // Database
    MONGO_URI: z.string().url(),


    // Security & Auth
    JWT_SECRET: z.string().min(12),
    FRONTEND_URL: z.string().url(),

    // Initial Admin Setup
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PASSWORD: z.string().min(6),
    ADMIN_CREATE_SECRET: z.string(),

    // AWS Configuration
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_S3_BUCKET: z.string(),

    // Email Configuration (Brevo)
    BREVO_SMTP_HOST: z.string(),
    BREVO_SMTP_PORT: z.coerce.number(),
    BREVO_SMTP_USER: z.string(),
    BREVO_SMTP_PASS: z.string(),
    BREVO_FROM_EMAIL: z.string().email(),

    // Google OAuth
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CALLBACK_URL: z.string().url(),

    // WhatsApp Meta API
    WHATSAPP_TEMPLATE_NAME: z.string(),
    WHATSAPP_TEMPLATE_LANG: z.string(),
    WHATSAPP_PHONE_NUMBER_ID: z.string(),
    WHATSAPP_WABA_ID: z.string(),
    WHATSAPP_ACCESS_TOKEN: z.string(),
});

// 2. Validate the incoming process.env object
const parsedEnv = envSchema.safeParse(process.env);

// 3. Fail Fast: Crash instantly if any variable is missing or malformed
if (!parsedEnv.success) {
    console.error("❌ CRITICAL: Missing or invalid environment configuration fields:");
    console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
    process.exit(1);
}

const env = parsedEnv.data;

// 4. Export the clean, structured configuration tree
export const config = {
    NODE_ENV: env.NODE_ENV,
    PORT: env.PORT,
    MONGO_URI: env.MONGO_URI,
    JWT_SECRET: env.JWT_SECRET,
    FRONTEND_URL: env.FRONTEND_URL,
    ADMIN: {
        EMAIL: env.ADMIN_EMAIL,
        PASSWORD: env.ADMIN_PASSWORD,
        CREATE_SECRET: env.ADMIN_CREATE_SECRET,
    },
    AWS: {
        ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
        SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
        REGION: env.AWS_REGION,
        BUCKET_NAME: env.AWS_S3_BUCKET,
    },
    EMAIL: {
        HOST: env.BREVO_SMTP_HOST,
        PORT: env.BREVO_SMTP_PORT,
        USER: env.BREVO_SMTP_USER,
        PASS: env.BREVO_SMTP_PASS,
        FROM: env.BREVO_FROM_EMAIL,
    },
    GOOGLE: {
        CLIENT_ID: env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
        CALLBACK_URL: env.GOOGLE_CALLBACK_URL,
    },
    WHATSAPP: {
        TEMPLATE_NAME: env.WHATSAPP_TEMPLATE_NAME,
        TEMPLATE_LANG: env.WHATSAPP_TEMPLATE_LANG,
        PHONE_NUMBER_ID: env.WHATSAPP_PHONE_NUMBER_ID,
        WABA_ID: env.WHATSAPP_WABA_ID,
        ACCESS_TOKEN: env.WHATSAPP_ACCESS_TOKEN,
    },
};

export default config;
