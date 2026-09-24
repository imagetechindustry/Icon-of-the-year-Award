/**
 * QUICK ACCESS CARD COMPONENT
 * 
 * This component displays the form fields (Name, Phone/WhatsApp, Inquiry Type, Purpose)
 * and controls the OTP sending and verification interface.
 */

import { useState } from "react";
import { User, Phone, Sparkles, ChevronDown, ArrowRight, Info, X, Check, Loader2 } from "lucide-react";
import { sendInquiryOTP, verifyInquiryOTP } from "../services/api";

export default function QuickAccessCard({ onSuccess, onClose, isModal }) {
    // Form Inputs State
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [inquiryType, setInquiryType] = useState("nomination");
    const [purpose, setPurpose] = useState("");
    const [otp, setOtp] = useState("");

    // API Handling State
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpSentTo, setOtpSentTo] = useState(""); // Holds the number we successfully sent OTP to

    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Triggers the backend call to generate and send OTP via WhatsApp Cloud API
    const handleSendOTP = async (cleanPhone) => {
        setSendingOtp(true);
        setError("");
        try {
            await sendInquiryOTP({ phone: cleanPhone, name: name.trim() });
            setOtpSent(true);
            setOtpSentTo(cleanPhone);
        } catch (err) {
            setError(err.message || "Failed to send OTP. Please check the number and try again.");
            setOtpSent(false);
            setOtpSentTo("");
        } finally {
            setSendingOtp(false);
        }
    };

    // Resets the OTP state if the user changes the phone number after it was already sent
    const handlePhoneChange = (e) => {
        const val = e.target.value;
        setPhone(val);
        const clean = val.replace(/[^\d+]/g, "");

        // If number is changed away from what the OTP was sent to, clear the OTP status
        if (clean !== otpSentTo) {
            setOtpSent(false);
            setOtpSentTo("");
            setOtp("");
            setError("");
        }
    };

    // Submits either the OTP request or verification based on state
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const cleanPhone = phone.replace(/[^\d+]/g, "");

        if (!otpSent) {
            if (!name.trim()) {
                setError("Please enter your name.");
                return;
            }
            const digitCount = cleanPhone.replace(/\D/g, "").length;
            if (digitCount < 10 || digitCount > 15) {
                setError("Please enter a valid international phone number (10-15 digits).");
                return;
            }
            await handleSendOTP(cleanPhone);
        } else {
            if (!otp.trim()) {
                setError("Please enter the verification code.");
                return;
            }

            setVerifying(true);
            setError("");
            try {
                await verifyInquiryOTP({
                    name,
                    phone: cleanPhone,
                    inquiryType,
                    purpose: inquiryType === "other" ? purpose : "",
                    otp
                });
                setSuccess(true);
                setError("");


                setTimeout(() => {
                    if (onSuccess) onSuccess();
                }, 1800);
            } catch (err) {
                setError(err.message || "Verification code is invalid or expired.");
            } finally {
                setVerifying(false);
            }
        }
    };

    return (
        <div className={`w-full ${isModal ? "glass-card border border-[#C8941E]/30" : "bg-[#0A0F1A] border border-[#C8941E]/20"} p-6 sm:p-8 rounded-[2rem] shadow-[0_0_40px_rgba(200,148,30,0.15)] relative overflow-hidden group flex flex-col items-center hover:shadow-[0_0_60px_rgba(200,148,30,0.25)] hover:border-[#C8941E]/50 transition-all duration-500`}>
            {/* Ambient background glows */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C8941E]/15 via-transparent to-transparent pointer-events-none" />

            {/* Close Modal Button (Top-Right) */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-[#C8941E]/10 border border-[#C8941E]/20 flex items-center justify-center text-[#C8941E] hover:bg-[#C8941E]/20 hover:text-[#FBE8A6] transition-all duration-300"
                    aria-label="Close"
                >
                    <X size={14} />
                </button>
            )}

            {success ? (
                /* 1. SUCCESS STATE VIEW */
                <div className="w-full py-12 flex flex-col items-center justify-center text-center space-y-4 relative z-10 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white animate-bounce">
                        <Check size={32} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-wider">
                        Verified Successfully
                    </h3>
                    <p className="text-sm text-gray-100 max-w-xs">
                        Thank you! Your details have been secured. You can now proceed.
                    </p>
                </div>
            ) : (
                /* 2. REGULAR FORM STATE VIEW */
                <form onSubmit={handleFormSubmit} className="w-full space-y-3 relative z-10">
                    <div className="mb-2">
                        <h2 className="text-2xl sm:text-3xl text-center font-black uppercase tracking-wider mb-3 bg-gradient-to-r from-[#FBE8A6] via-[#C8941E] to-[#F2C94C] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(200,148,30,0.3)]">
                            Quick Access
                        </h2>
                        <p className="text-sm font-bold text-[#C8941E] uppercase tracking-widest">
                            Verify details to continue
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2.5 rounded-xl font-bold">
                            {error}
                        </div>
                    )}

                    {/* Full Name Input */}
                    <div className="space-y-1.5">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={verifying}
                            className="w-full bg-[#0A0F1A]/90 border border-[#C8941E]/40 rounded-xl px-4 py-3 text-white text-base font-semibold placeholder:text-white focus:outline-none focus:border-[#C8941E] focus:bg-[#0A0F1A] focus:shadow-[0_0_15px_rgba(200,148,30,0.2)] transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* WhatsApp Phone Input */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center mr-1">
                            {/* Dynamically display OTP state badges */}
                            {sendingOtp && (
                                <span className="flex items-center gap-1 text-xs font-black uppercase text-white animate-pulse">
                                    <Loader2 size={10} className="animate-spin" /> Sending OTP...
                                </span>
                            )}
                            {otpSent && (
                                <span className="text-xs font-black uppercase text-white flex items-center gap-1">
                                    <Check size={10} /> Sent OTP to WhatsApp
                                </span>
                            )}
                        </div>
                        <input
                            type="tel"
                            placeholder="WhatsApp Number (e.g. +1 234 567 8900)"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                            disabled={verifying}
                            className={`w-full bg-[#0A0F1A]/90 border ${otpSent ? "border-[#C8941E]/80" : "border-[#C8941E]/40"} rounded-xl px-4 py-3 text-white text-base font-semibold placeholder:text-white focus:outline-none focus:border-[#C8941E] focus:bg-[#0A0F1A] focus:shadow-[0_0_15px_rgba(200,148,30,0.2)] transition-all disabled:opacity-50`}
                        />
                    </div>

                    {/* Inquiry Type Select Dropdown */}
                    <div className="space-y-1.5">
                        <div className="relative w-full">
                            <select
                                className="w-full bg-[#0A0F1A]/90 border border-[#C8941E]/40 rounded-xl px-4 py-3 text-white text-base font-semibold outline-none focus:border-[#C8941E] focus:bg-[#0A0F1A] focus:shadow-[0_0_15px_rgba(200,148,30,0.2)] transition-all appearance-none cursor-pointer"
                                value={inquiryType}
                                onChange={(e) => setInquiryType(e.target.value)}
                                disabled={verifying}
                            >
                                <option value="nomination" className="bg-[#0A0F1A] text-slate-300">Nomination Enquiry</option>
                                <option value="general" className="bg-[#0A0F1A] text-white">General Inquiry</option>
                                <option value="attending" className="bg-[#0A0F1A] text-white">Attending Event</option>
                                <option value="sponsorship" className="bg-[#0A0F1A] text-white">Sponsorship</option>
                                <option value="exhibit" className="bg-[#0A0F1A] text-white">Exhibit</option>
                                <option value="other" className="bg-[#0A0F1A] text-white">Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white">
                                <ChevronDown size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Description Text Area (Shows up only when "Other" is selected) */}
                    {inquiryType === "other" && (
                        <div className="space-y-1.5 animate-fade-in">
                            <input
                                type="text"
                                placeholder="State your reason for inquiry"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                                disabled={verifying}
                                className="w-full bg-[#0A0F1A]/90 border border-[#C8941E]/40 rounded-xl px-4 py-3 text-white text-base font-semibold placeholder:text-white focus:outline-none focus:border-[#C8941E] focus:bg-[#0A0F1A] focus:shadow-[0_0_15px_rgba(200,148,30,0.2)] transition-all disabled:opacity-50"
                            />
                        </div>
                    )}

                    {/* Verification Code Input (Transitions in once OTP is sent) */}
                    {otpSent && (
                        <div className="space-y-1.5 animate-slide-down">
                            <input
                                type="text"
                                maxLength="6"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                required
                                disabled={verifying}
                                className="w-full bg-[#0A0F1A]/90 border border-[#C8941E]/80 rounded-xl px-4 py-3 text-center text-white text-xl font-bold tracking-[0.5em] font-mono placeholder:text-white placeholder:tracking-normal placeholder:text-base placeholder:font-medium focus:outline-none focus:border-[#C8941E] focus:bg-[#0A0F1A] focus:shadow-[0_0_15px_rgba(200,148,30,0.2)] transition-all"
                            />
                        </div>
                    )}

                    {/* Form submit button */}
                    <button
                        type="submit"
                        disabled={verifying || sendingOtp}
                        className="w-full h-12 rounded-xl text-xs uppercase tracking-widest font-black mt-6 flex items-center justify-center gap-2 relative z-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-gradient-to-r from-[#C8941E] to-[#8B6010] hover:from-[#F2C94C] hover:to-[#C8941E] text-[#0A0F1A] shadow-[0_0_20px_rgba(200,148,30,0.3)] hover:shadow-[0_0_30px_rgba(200,148,30,0.5)]"
                    >
                        {verifying || sendingOtp ? (
                            <>
                                <Loader2 size={14} className="animate-spin" /> {sendingOtp ? "Sending OTP..." : "Verifying Code..."}
                            </>
                        ) : !otpSent ? (
                            <>
                                Send Verification Code <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </>
                        ) : (
                            <>
                                Verify & Continue <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </>
                        )}
                    </button>

                    {/* Security Badge */}
                    <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8941E]/10 border border-[#C8941E]/20 text-[#C8941E] relative z-10 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C8941E] animate-pulse shadow-[0_0_8px_rgba(200,148,30,0.8)]" />
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-extrabold text-[#FBE8A6]">
                            Icon of The year Access
                        </span>
                    </div>
                </form>
            )}
        </div>
    );
}
