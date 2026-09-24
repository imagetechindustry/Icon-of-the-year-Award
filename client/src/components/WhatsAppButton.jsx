import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const whatsappNumber = "+919821020995";
    const message = "Hello, I'm interested in the Indian Icon of The Year, 2026.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[9999] group flex items-center justify-center"
            aria-label="Contact us on WhatsApp"
        >
            {/* Pulse Rings */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping"></span>
            <span className="absolute inline-flex h-14 w-14 rounded-full bg-indigo-500 opacity-40 animate-pulse"></span>

            {/* Button Body */}
            <div className="relative bg-[#25D366] text-white p-3 rounded-full shadow-[0_10px_25px_-5px_#25d366aa] hover:shadow-[0_15px_35px_-5px_#25d366cc] transform hover:scale-110 transition-all duration-300 border-2 border-white/20">
                <FaWhatsapp className="w-8 h-8" />
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-3 py-1.5 bg-white text-[#25D366] text-sm font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border-b-4 border-[#25D366]">
                Contact Us
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
            </div>
        </a>
    );
}
