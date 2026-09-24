import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import config from "./config.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE.CLIENT_ID,
            clientSecret: config.GOOGLE.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            proxy: true,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // console.log("Google Profile:", profile);
                const email = profile.emails[0].value;
                const googleId = profile.id;

                // Check if user exists by googleId
                let user = await User.findOne({ googleId });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists by email (linked account)
                user = await User.findOne({ email });

                if (user) {
                    user.googleId = googleId;
                    if (!user.avatar) user.avatar = profile.photos[0]?.value;
                    user.isVerified = true; // Google emails are verified
                    await user.save();
                    return done(null, user);
                }

                // Create new user 
                user = await User.create({
                    name: profile.displayName,
                    email: email,
                    googleId: googleId,
                    avatar: profile.photos[0]?.value,
                    isVerified: true,
                    role: "user",
                });

                return done(null, user);
            } catch (err) {
                console.error("Passport Google Strategy Error:", err);
                return done(err, null);
            }
        }
    )
);

// We won't use sessions for JWT flow, but passport expects these if not configured otherwise
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
