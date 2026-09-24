import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
    host: config.EMAIL.HOST,
    port: config.EMAIL.PORT,
    secure: false,
    auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASS,
    },
});

// SMTP check
transporter.verify((err, success) => {
    if (err) {
        console.error("❌ Brevo SMTP Error:", err);
    } else {
        console.log("✅ Brevo SMTP Connected Successfully");
    }
});

/**
 * Send OTP email
 */
export const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: `"Indian Icon of the year" <${config.EMAIL.FROM}>`,
        to: email,
        subject: "Verify Your Email - Indian Icon of the year",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px;">
        <h2 style="color: #d4af37; text-align: center;">Welcome to Indian Icon of the year</h2>
        <p>Dear User,</p>
        <p>Please use the following OTP to verify your email. This OTP is valid for 10 minutes.</p>
        <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; color: #333; letter-spacing: 5px;">
          ${otp}
        </div>
        <p>If you did not request this, please ignore this email.</p>
        <hr>
        <p style="font-size: 12px; text-align: center;">© Indian Icon of the year 2026</p>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Verification OTP email sent to ${email} (ID: ${info.messageId})`);
    } catch (error) {
        console.error("❌ Error sending verification OTP:", error);
        throw new Error("Failed to send verification email");
    }
};

/**
 * Send Nomination Success Email (optionally with credentials)
 */
export const sendNominationSuccessEmail = async (email, nomineeName, credentials = null) => {
    let credentialsHtml = "";
    if (credentials) {
        credentialsHtml = `
        <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #eee;">
            <p style="margin: 0 0 10px 0; color: #333;"><strong>Your Account Credentials:</strong></p>
            <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${credentials.email}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Password:</strong> <span style="font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 3px;">${credentials.password}</span></p>
            <p style="color: #555; font-size: 14px; margin-top: 10px;">
                We have created this account so you can track your nomination status.
            </p>
            <div style="text-align: center; margin-top: 15px;">
                <a href="${config.FRONTEND_URL}/login" style="background-color: #d4af37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Login Now</a>
            </div>
        </div>
        `;
    }

    const mailOptions = {
        from: `"Indian Icon of the year" <${config.EMAIL.FROM}>`,
        to: email,
        subject: credentials ? "Nomination Received & Account Created - Indian Icon of the year 2026" : "Nomination Received - Indian Icon of the year 2026",
        html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #d4af37; border-radius: 15px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Submission Successful!</h1>
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear <strong>${nomineeName}</strong>,</p>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Your nomination has been successfully received. Our team will connect with you after reviewing the profile.
        </p>

        ${credentialsHtml}
        
        <div style="margin-top: 40px; padding: 20px; background-color: #fffdf2; border-radius: 10px; border-left: 4px solid #d4af37;">
            <h3 style="color: #d4af37; margin-top: 0; margin-bottom: 15px; font-size: 18px;">Any Queries? Feel free to contact us</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <span style="font-weight: bold; color: #333;">Helpline 1:</span><br>
                        <a href="tel:+919821020995" style="color: #d4af37; text-decoration: none; font-size: 16px;">📞 +91 98210 20995</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0;">
                        <span style="font-weight: bold; color: #333;">Helpline 2 / Nominations:</span><br>
                        <a href="tel:+919873004416" style="color: #d4af37; text-decoration: none; font-size: 16px;">📞 +91 98730 04416</a>
                    </td>
                </tr>
            </table>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #888; text-align: center; margin-bottom: 0;">
            Sent by <strong>Indian Icon of the year 2026</strong><br>
            Organised by Prime Time Research Media Pvt. Ltd.
        </p>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Nomination success email sent to ${email} (ID: ${info.messageId})`);
    } catch (error) {
        console.error("❌ Error sending nomination email:", error);
    }
};

/**
 * Send Password Reset OTP Email
 */
export const sendPasswordResetEmail = async (email, otp) => {
    const mailOptions = {
        from: `"Indian Icon of the year" <${config.EMAIL.FROM}>`,
        to: email,
        subject: "Password Reset Code - Indian Icon of the year",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #d4af37; border-radius: 10px;">
        <h2 style="color: #d4af37; text-align: center;">Account Recovery</h2>
        <p>Dear User,</p>
        <p>You have requested to reset your password. Use the following OTP to proceed. This OTP is valid for 10 minutes.</p>
        <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 5px; color: #333; letter-spacing: 5px;">
          ${otp}
        </div>
        <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
        <hr>
        <p style="font-size: 12px; text-align: center;">© Indian Icon of the year 2026</p>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Password reset OTP sent to ${email} (ID: ${info.messageId})`);
    } catch (error) {
        console.error("❌ Error sending reset email:", error);
        throw new Error("Failed to send password reset email");
    }
};

/**
 * Send Nomination Credentials Email
 */
export const sendNominationCredentialsEmail = async (email, name, password) => {
    const mailOptions = {
        from: `"Indian Icon of the year" <${config.EMAIL.FROM}>`,
        to: email,
        subject: "Your Account Credentials - Indian Icon of the year 2026",
        html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #d4af37; border-radius: 15px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #d4af37; margin: 0; font-size: 28px;">Welcome to Indian Icon of the year!</h1>
        </div>
        
        <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Thank you for your nomination. We have automatically created an account for you so you can track your nomination status.
        </p>
        
        <div style="margin-top: 25px; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #eee;">
            <p style="margin: 0 0 10px 0; color: #333;"><strong>Your Login Credentials:</strong></p>
            <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0; color: #555;"><strong>Password:</strong> <span style="font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 3px;">${password}</span></p>
        </div>
        
        <p style="color: #555; font-size: 14px; margin-top: 20px;">
            You can use these credentials to login and check your nomination status at any time.
        </p>
        
        <div style="text-align: center; margin-top: 30px;">
            <a href="${config.FRONTEND_URL}/login" style="background-color: #d4af37; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Login Now</a>
        </div>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #888; text-align: center; margin-bottom: 0;">
            © Indian Icon of the year 2026<br>
            Organised by Prime Time Research Media Pvt. Ltd.
        </p>
      </div>
    `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Credentials email sent to ${email} (ID: ${info.messageId})`);
    } catch (error) {
        console.error("❌ Error sending credentials email:", error);
    }
};
