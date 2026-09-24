import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNominationById } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { FiArrowLeft, FiEdit2, FiClock, FiMapPin, FiUser, FiBriefcase, FiMail, FiPhone, FiInfo } from "react-icons/fi";
import { Crown } from "lucide-react";
import { PageHero } from "../components/Motion.jsx";

const STATUS_LABELS = {
    nominated: "Nominated",
    evaluation: "Under Evaluation",
    in_progress: "Shortlisted",
    selected: "Selected",
    rejected: "Rejected",
};

const STATUS_COLORS = {
    nominated: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
    evaluation: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    selected: "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
    in_progress: "text-lime-400 border-lime-400/30 bg-lime-400/10",
    rejected: "text-red-400 border-red-400/30 bg-red-400/10",
};

export default function NominationDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [nomination, setNomination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchNominationById(id, token);
                setNomination(data);
            } catch (err) {
                setError(err.message || "Unable to load nomination details");
            } finally {
                setLoading(false);
            }
        };
        if (token && id) load();
    }, [id, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-indigo-400 text-xl animate-pulse">
                Loading details...
            </div>
        );
    }

    if (error || !nomination) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-3xl max-w-md">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-300 mb-6">{error || "Nomination not found"}</p>
                    <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs hover:underline">
                        <FiArrowLeft /> Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const isEditable = nomination.status === "nominated";

    return (
        <>
            <PageHero
                badge="Detail View"
                icon="📄"
                title={nomination.nomineeName}
                subtitle={nomination.organization}
            >
                <div className="relative z-10 max-w-4xl mx-auto pb-32 text-left">
                    {/* Navigation / Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="flex items-center gap-2 text-[#d4af37] hover:text-[#f2d06b] transition-colors font-bold uppercase tracking-[0.2em] text-xs"
                        >
                            <FiArrowLeft className="text-lg" /> Back to Dashboard
                        </button>

                        <div className="flex items-center gap-4">
                            <div className={`px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest ${STATUS_COLORS[nomination.status] || STATUS_COLORS.nominated}`}>
                                {STATUS_LABELS[nomination.status] || "Nominated"}
                            </div>
                            {isEditable && (
                                <button
                                    onClick={() => navigate(`/nominate/${nomination._id}`)}
                                    className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#d4af37] text-black font-black uppercase tracking-widest text-xs hover:bg-[#f2d06b] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#d4af37]/20"
                                >
                                    <FiEdit2 /> Edit Details
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Crown className="w-32 h-32 text-[#d4af37]" />
                        </div>

                        <div className="relative z-10">
                            <div className="mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] mb-2 block">Nomination Profile</span>
                                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
                                    {nomination.nomineeName}
                                </h1>
                                <div className="flex items-center gap-3 text-[#ffeec3a0]">
                                    <FiBriefcase className="text-[#d4af37]" />
                                    <span className="text-lg font-medium">{nomination.designation} at {nomination.organization}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Category Info */}
                                <div className="space-y-8">
                                    {nomination.field && (
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                                <FiInfo className="text-[#d4af37]" /> Industry Field
                                            </h3>
                                            <p className="text-xl font-bold text-white uppercase tracking-tight">{nomination.field}</p>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiInfo className="text-[#d4af37]" /> Application Category
                                        </h3>
                                        <p className="text-xl font-bold text-white uppercase tracking-tight">{nomination.category}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiMapPin className="text-[#d4af37]" /> Participation Type
                                        </h3>
                                        <p className="text-lg font-semibold text-white/90">{nomination.participationType}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Registration Type</h3>
                                        <p className="text-lg font-semibold text-white/90">{nomination.registrationType}</p>
                                    </div>

                                    {nomination.preferredLocation && (
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                                <FiMapPin className="text-[#d4af37]" /> Event Preference
                                            </h3>
                                            <p className="text-lg font-bold text-[#d4af37]">{nomination.preferredLocation}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiMail className="text-[#d4af37]" /> Email Address
                                        </h3>
                                        <p className="text-lg font-semibold text-white/90">{nomination.email}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiPhone className="text-[#d4af37]" /> Contact Number
                                        </h3>
                                        <p className="text-lg font-semibold text-white/90">{nomination.mobile}</p>
                                    </div>

                                    {nomination.participationType === "nominated as award" && (
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                                <FiMapPin className="text-[#d4af37]" /> Address Details
                                            </h3>
                                            <div className="text-lg font-semibold text-white/80 space-y-1">
                                                <p>{nomination.street}</p>
                                                <p>{nomination.city}, {nomination.state} - {nomination.zip}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiClock className="text-[#d4af37]" /> Submission Date
                                        </h3>
                                        <p className="text-lg font-semibold text-white/80">
                                            {new Date(nomination.createdAt).toLocaleDateString(undefined, {
                                                year: 'numeric', month: 'long', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Support Document Section */}
                            {nomination.pdfUrl && (
                                <div className="mt-12 pt-12 border-t border-white/5">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                        <FiBriefcase className="text-[#d4af37]" /> Supporting Document
                                    </h3>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <a
                                            href={nomination.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-bold hover:bg-[#d4af37]/20 transition-all group"
                                        >
                                            <FiInfo className="text-xl group-hover:scale-110 transition-transform" />
                                            View Uploaded Profile / Document
                                        </a>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                            Click to view the attached PDF profile in a new tab
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Remarks Section */}
                            {nomination.remarks && (
                                <div className={`mt-12 pt-12 border-t border-white/5 ${nomination.pdfUrl ? "mt-8 pt-8 border-none" : ""}`}>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Additional Remarks</h3>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 italic text-gray-300 leading-relaxed">
                                        "{nomination.remarks}"
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Branding Footer */}
                    <div className="mt-12 text-center">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em]">
                            Indian Icon of The Year, 2026 &bull; TIME Cyber Media Pvt Ltd
                        </p>
                    </div>
                </div>
            </PageHero>
        </>
    );
}
