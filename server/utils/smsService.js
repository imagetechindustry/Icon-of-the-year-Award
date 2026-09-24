/**
 * SMS & WHATSAPP OTP SENDER SERVICE
 * 
 * This service handles sending OTP codes to users. It integrates:
 * 1. Meta WhatsApp Business Cloud API (Primary channel for sending WhatsApp templates)
 * 2. Brevo Transactional SMS API (Secondary fallback channel if WhatsApp API fails)
 * 
 * Best practices implemented:
 * - Request Timeout: Uses AbortController to set a 5-second timeout on Graph API and Brevo calls, preventing network hangs.
 * - Self-Healing Failovers: Automatically attempts Authentication templates (body + copy button), retries with body-only, and falls back to SMS.
 */

import config from "../config/config.js";

/**
 * Sends a transactional SMS OTP via Brevo API
 * Used as a fallback if the WhatsApp template fails.
 * 
 * @param {string} phone - User's phone number
 * @param {string} otp - The 6-digit verification code
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
export const sendSMSOTP = async (phone, otp) => {
  // Format phone number to clean E.164 without spaces/plus signs
  let formattedPhone = phone.replace(/\D/g, "");
  if (formattedPhone.length === 10) {
    formattedPhone = "91" + formattedPhone; // default country code is 91 (India)
  }

  console.log(`\n====================================`);
  console.log(`📱 [SMS SERVICE] Sending OTP ${otp} to ${formattedPhone}`);
  console.log(`====================================\n`);

  // Request timeout protection (5 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": config.EMAIL.PASS, // Brevo Master API Key
      },
      signal: controller.signal,
      body: JSON.stringify({
        sender: "IEAWDS",
        recipient: formattedPhone,
        content: `Your Indian Icon of the year verification OTP is ${otp}. Valid for 10 minutes.`,
      }),
    });

    const data = await response.json();
    clearTimeout(timeoutId);

    if (response.ok) {
      console.log(`✅ Brevo SMS sent successfully to ${formattedPhone}:`, data);
      return true;
    } else {
      console.error(`❌ Brevo SMS sending failed:`, data);
      return false;
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.error(`❌ Brevo SMS API call aborted due to 5-second timeout.`);
    } else {
      console.error(`❌ Error in sendSMSOTP calling Brevo:`, error);
    }
    return false;
  }
};

/**
 * Sends a WhatsApp OTP using Meta's official Cloud API.
 * Self-healing: tries authentication-style templates, body-only style, and falls back to SMS.
 * 
 * @param {string} phone - User's phone number
 * @param {string} otp - The 6-digit verification code
 * @param {string} name - User's name (used as body parameter)
 * @returns {Promise<boolean>} Resolves to true if successful, false otherwise
 */
export const sendWhatsAppOTP = async (phone, otp, name = "User") => {
  // Format phone number to clean E.164 without formatting characters
  let formattedPhone = phone.replace(/\D/g, "");
  if (formattedPhone.length === 10) {
    formattedPhone = "91" + formattedPhone;
  }

  console.log(`\n====================================`);
  console.log(`💬 [WHATSAPP SERVICE] Attempting OTP ${otp} to ${formattedPhone} (Name: ${name})`);
  console.log(`====================================\n`);

  const { PHONE_NUMBER_ID, ACCESS_TOKEN, TEMPLATE_NAME, TEMPLATE_LANG } = config.WHATSAPP;

  // Fallback immediately if credentials are not configured in environment variables
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    console.warn("⚠️ WhatsApp API credentials missing in config. Falling back to Brevo SMS.");
    return await sendSMSOTP(phone, otp);
  }

  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

  // Helper to make fetch request to Meta Graph API with AbortController timeout
  const sendRequest = async (payload) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout limit

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      clearTimeout(timeoutId);
      return { ok: response.ok, status: response.status, data };
    } catch (err) {
      clearTimeout(timeoutId);
      return { ok: false, error: err };
    }
  };

  // Align parameter mapping with the user's template placeholders:
  // {{1}} = otp, {{2}} = brand name, {{3}} = validity, {{4}} = call helpline, {{5}} = contact support
  const bodyParams = [
    { "type": "text", "text": otp },
    { "type": "text", "text": "Indian Icon" },
    { "type": "text", "text": "10 minutes" },
    { "type": "text", "text": "+919821020995" },
    { "type": "text", "text": "+919821020995" }
  ];

  // ATTEMPT 1: Authentication Template (Body parameters + copy code button parameter)
  console.log("👉 WhatsApp Attempt 1: Sending with body and button parameters...");
  const payloadAuth = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: formattedPhone,
    type: "template",
    template: {
      name: TEMPLATE_NAME,
      language: {
        code: TEMPLATE_LANG,
      },
      components: [
        {
          "type": "body",
          "parameters": bodyParams
        },
        {
          "type": "button",
          "sub_type": "url",
          "index": "0",
          "parameters": [
            {
              "type": "text",
              "text": otp,
            },
          ],
        },
      ],
    },
  };

  const attempt1 = await sendRequest(payloadAuth);
  if (attempt1.ok) {
    console.log(`✅ WhatsApp OTP sent successfully (Attempt 1):`, attempt1.data);
    return true;
  }

  if (attempt1.error?.name === "AbortError") {
    console.warn("⚠️ WhatsApp Attempt 1 timed out.");
  } else {
    console.warn(`⚠️ WhatsApp Attempt 1 failed:`, JSON.stringify(attempt1.data || attempt1.error));
  }

  // ATTEMPT 2: Utility Template (Body parameters only - in case copy code button is not configured)
  console.log("👉 WhatsApp Attempt 2: Retrying with body parameters only...");
  const payloadUtility = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: formattedPhone,
    type: "template",
    template: {
      name: TEMPLATE_NAME,
      language: {
        code: TEMPLATE_LANG,
      },
      components: [
        {
          "type": "body",
          "parameters": bodyParams
        },
      ],
    },
  };

  const attempt2 = await sendRequest(payloadUtility);
  if (attempt2.ok) {
    console.log(`✅ WhatsApp OTP sent successfully (Attempt 2):`, attempt2.data);
    return true;
  }

  if (attempt2.error?.name === "AbortError") {
    console.error("❌ WhatsApp Attempt 2 timed out.");
  } else {
    console.error(`❌ WhatsApp Attempt 2 failed:`, JSON.stringify(attempt2.data || attempt2.error));
  }

  // FAILOVER FALLBACK: If both WhatsApp attempts fail, use Brevo SMS API
  console.warn("⚠️ WhatsApp sending failed. Falling back to Brevo SMS.");
  return await sendSMSOTP(phone, otp);
};
