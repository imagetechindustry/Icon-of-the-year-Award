import { useEffect } from "react";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import { FaWhatsapp, FaVideo } from "react-icons/fa";

export default function CallModal({ onClose }) {
    const phoneNumber = "+919821020995";
    const displayNumber = "+91 98210 20995";
    const whatsappNumber = phoneNumber.replace(/\D/g, "");

    // Close modal on ESC key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handlePhoneCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    const handleWhatsAppVoice = () => {
        window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    };

    const handleWhatsAppVideo = () => {
        window.open(`https://wa.me/${whatsappNumber}?call=video`, "_blank");
    };

    return (
        <div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60  animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="relative bg-gradient-to-br from-[#3a1418] via-[#4a1820] to-[#3a1418] rounded-2xl shadow-2xl max-w-md w-full border-2 border-[#d4af37]/30 animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-200"
                    aria-label="Close modal"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-[#d4af37]/20">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg">
                            <FaPhoneAlt className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                            <p className="text-[#d4af37] font-semibold mt-1">{displayNumber}</p>
                        </div>
                    </div>
                </div>

                {/* Calling Options */}
                <div className="p-6 space-y-4">
                    <p className="text-white/80 text-sm mb-6">Choose your preferred method to contact us:</p>

                    {/* Phone Call Option */}
                    <button
                        onClick={handlePhoneCall}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#d4af37]/10 to-[#d4af37]/5 border-2 border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-[#d4af37]/20 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaPhoneAlt className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="text-white font-bold text-lg">Phone Call</h3>
                            <p className="text-white/60 text-sm">Direct call via phone dialer</p>
                        </div>
                    </button>

                    {/* WhatsApp Voice Call Option */}
                    <button
                        onClick={handleWhatsAppVoice}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 border-2 border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaWhatsapp className="w-7 h-7 text-white" />
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="text-white font-bold text-lg">WhatsApp Voice</h3>
                            <p className="text-white/60 text-sm">Call via WhatsApp</p>
                        </div>
                    </button>

                    {/* WhatsApp Video Call Option */}
                    <button
                        onClick={handleWhatsAppVideo}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#25D366]/10 to-[#25D366]/5 border-2 border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 group"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <FaVideo className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="text-white font-bold text-lg">WhatsApp Video</h3>
                            <p className="text-white/60 text-sm">Video call via WhatsApp</p>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                    <p className="text-white/50 text-xs text-center">
                        Available 24/7 for your inquiries
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
