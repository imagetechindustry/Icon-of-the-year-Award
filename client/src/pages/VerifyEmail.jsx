import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiMail, FiCheckCircle, FiArrowRight, FiRotateCw, FiHome } from "react-icons/fi";
import { PageHero } from "../components/Motion.jsx";



export default function VerifyEmail() {
    const { verifyEmail, resendVerificationOTP } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Attempt to get email from navigation state
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email) {
            setError("Email is missing. Please enter your email.");
            return;
        }
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit code.");
            return;
        }

        try {
            setSubmitting(true);
            await verifyEmail(email, otp);
            setSuccess("Email verified successfully! Redirecting...");
            setTimeout(() => {
                navigate("/nominate");
            }, 2000);
        } catch (err) {
            setError(err.message || "Verification failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            setError("Please enter your email to resend the code.");
            return;
        }
        setError("");
        setSuccess("");
        try {
            setResending(true);
            await resendVerificationOTP(email);
            setSuccess("A new verification code has been sent to your email.");
        } catch (err) {
            setError(err.message || "Failed to resend code");
        } finally {
            setResending(false);
        }
    };

    const goldGrad = "linear-gradient(90deg,#e9d781 0%,#dac24a 29.69%,#fee19a 70%,#bc9830 100%)";

    return (
        <>
            <PageHero
                badge="Authentication"
                icon="📧"
                title={<span>Verify <span className="text-gradient-prestige">Email</span></span>}
                subtitle="Please enter the 6-digit security code sent to your inbox."
            >
                <div className="flex items-center justify-center p-4 sm:p-6 pb-32">
                    <div className="relative w-full max-w-[440px] md:max-w-[520px] lg:max-w-[560px] flex flex-col items-center">

                        {/* Main Verification Card Container */}
                        <div className="w-full glass-card border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:px-12 md:py-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                            <div className="text-center mb-6">
                                <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-b from-white via-white to-[#d4af37] bg-clip-text text-transparent tracking-tighter mb-2">
                                    Verify Email
                                </h2>
                                <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.3em] ml-1">
                                    Check your inbox for the code
                                </p>
                            </div>

                            {/* Error Banner */}
                            {error && (
                                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                                    {error}
                                </div>
                            )}

                            {/* Success Banner */}
                            {success && (
                                <div className="mb-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold text-center">
                                    {success}
                                </div>
                            )}

                            {/* OTP Form Submission */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3 group">
                                    <label className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest text-[#d4af37]/70 group-focus-within:text-[#d4af37] transition-colors ml-1">
                                        <FiMail /> Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-base placeholder:text-white/10 focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.06] transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="name@company.com"
                                    />
                                </div>

                                <div className="space-y-3 group">
                                    <label className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest text-[#d4af37]/70 group-focus-within:text-[#d4af37] transition-colors ml-1">
                                        <FiCheckCircle /> 6-Digit Code
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={6}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-2xl text-center tracking-[0.5em] font-bold placeholder:text-white/10 focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.06] transition-all"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                        required
                                        placeholder="000000"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full group relative flex items-center justify-center h-16 rounded-2xl overflow-hidden transition-all active:scale-95 disabled:opacity-50 mt-4"
                                >
                                    <div
                                        className="absolute inset-0 transition-transform group-hover:scale-110"
                                        style={{ background: goldGrad }}
                                    />
                                    <span className="relative flex items-center gap-3 text-black font-black uppercase tracking-widest text-lg">
                                        {submitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                Verify & Continue <FiArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>

                            {/* Actions and Alternative Options Area */}
                            <div className="mt-8 flex flex-col gap-4 text-center">
                                <button
                                    onClick={handleResend}
                                    disabled={resending}
                                    className="text-[#d4af37] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <FiRotateCw className={`${resending ? "animate-spin" : ""}`} />
                                    {resending ? "Resending Code..." : "Resend Code"}
                                </button>
                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        Wrong email?{" "}
                                        <Link
                                            to="/register"
                                            className="text-white hover:text-[#d4af37] transition-colors ml-2 underline decoration-[#d4af37]/30"
                                        >
                                            Change Email
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageHero>
        </>
    );
}
