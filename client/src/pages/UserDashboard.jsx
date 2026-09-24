import { useEffect, useState } from "react";
import { fetchMyNominations } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Crown, UserCircle, ExternalLink, Award, Search, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHero } from "../components/Motion.jsx";
import {
    FadeUp,
    StaggerContainer,
    StaggerItem,
    NeonCard,
    SectionHeading,
    StatCard
} from "../components/Motion.jsx";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_LABELS = {
    nominated: "Nomination Received",
    evaluation: "Under Evaluation",
    in_progress: "Shortlisted",
    selected: "Winner Selected",
    rejected: "Not Selected",
};

const STATUS_COLORS = {
    nominated: "indigo",
    evaluation: "gold",
    selected: "cyan",
    in_progress: "purple",
    rejected: "pink",
};

export default function UserDashboard() {
    const navigate = useNavigate();
    const { token, user } = useAuth();
    const [nominations, setNominations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setError("");
            try {
                const data = await fetchMyNominations(token);
                if (!cancelled) setNominations(Array.isArray(data) ? data : []);
            } catch (err) {
                if (!cancelled) setError(err.message || "Unable to load your nominations");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        if (token) load(); else { setLoading(false); setNominations([]); }
        return () => { cancelled = true; };
    }, [token]);

    const stats = [
        { value: nominations.length, label: "Total Nominations", icon: "📄" },
        { value: nominations.filter(n => n.status === "selected").length, label: "Awards Won", icon: "🏆" },
        { value: nominations.filter(n => n.status === "in_progress").length, label: "Shortlisted", icon: "✨" },
        { value: user?.role?.toUpperCase() || "USER", label: "Account Level", icon: "🛡️" },
    ];

    return (

        <>
            <PageHero
                badge="Activity Center"
                icon="🛡️"
                title={<span>Welcome, <span className="text-gradient-prestige">{user?.name?.split(' ')[0]}</span></span>}
                subtitle="Manage your nominations, track evaluation status, and showcase your international education achievements."
            >
                <div className="max-w-7xl mx-auto px-10">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                        <FadeUp delay={0.1}>
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full group-hover:bg-indigo-500/40 transition-all" />
                                    <div className="relative w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-2xl">
                                        {user?.name?.charAt(0) || "U"}
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                        Welcome, <span className="text-gradient-prestige">{user?.name?.split(' ')[0]}</span>
                                    </h1>
                                    <div className="flex items-center gap-3 text-indigo-100/40 text-xs font-bold uppercase tracking-widest">
                                        <UserCircle className="w-4 h-4 text-indigo-500" /> {user?.email}
                                    </div>
                                </div>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate("/nominate")}
                                    className="btn-primary px-8 py-3 text-xs uppercase tracking-widest font-black"
                                >
                                    New Nomination
                                </button>
                            </div>
                        </FadeUp>
                    </div>

                    {/* --- STATS GRID --- */}
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16" staggerDelay={0.05}>
                        {stats.map((s, i) => (
                            <StaggerItem key={i}>
                                <StatCard {...s} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* --- NOMINATIONS LIST --- */}
                    <div className="mb-12 flex items-center justify-between">
                        <SectionHeading
                            title="My Nominations"
                            badge="Activity"
                            className="!mb-0 !text-left !mx-0"
                        />
                        <div className="hidden md:flex items-center gap-4">
                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                {nominations.length} Submissions Found
                            </div>
                        </div>
                    </div>

                    {error && (
                        <FadeUp className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-center font-bold">
                            {error}
                        </FadeUp>
                    )}

                    {/* DYNAMIC CONTENT AREA: LOADING, EMPTY, OR LIST STATES */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                /* Loading Placeholder Cards */
                                [1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-64 rounded-3xl bg-white/5 border border-white/5 animate-pulse" />
                                ))
                            ) : nominations.length === 0 ? (
                                /* Empty State Display (No nominations submitted yet) */
                                <div className="lg:col-span-2 py-24 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-6">🏜️</div>
                                    <h3 className="text-xl font-bold text-white mb-2">No nominations yet</h3>
                                    <p className="text-indigo-100/40 text-sm max-w-xs mb-8">Start your journey by submitting your first international education excellence nomination today.</p>
                                    <button onClick={() => navigate("/nominate")} className="btn-outline">Nominate Now</button>
                                </div>
                            ) : (
                                /* List of Nominations Submitted by Current User */
                                nominations.map((n, i) => (
                                    <FadeUp key={n._id} delay={i * 0.1}>
                                        <NeonCard color={STATUS_COLORS[n.status] || "indigo"} className="p-8 group h-full flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-6">
                                                    <StatusBadge status={n.status} />
                                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{n.registrationType}</span>
                                                </div>

                                                <h2 className="text-2xl font-black text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                                    {n.nomineeName}
                                                </h2>
                                                <div className="flex items-center gap-2 text-indigo-100/50 text-sm font-bold mb-6">
                                                    <Award className="w-4 h-4 text-indigo-500" /> {n.organization}
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-8">
                                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                                        <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{n.field || "Category"}</p>
                                                        <p className="text-xs font-bold text-white line-clamp-1">{n.category}</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                                        <p className="text-[9px] uppercase tracking-widest text-white/30 mb-1">Submitted</p>
                                                        <p className="text-xs font-bold text-white">
                                                            {new Date(n.createdAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 mt-4">
                                                <button
                                                    onClick={() => navigate(`/nomination/${n._id}`)}
                                                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                                                >
                                                    Details <ExternalLink className="w-3 h-3" />
                                                </button>
                                                {n.status === 'nominated' && (
                                                    <button
                                                        onClick={() => navigate(`/nominate/${n._id}`)}
                                                        className="px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </div>
                                        </NeonCard>
                                    </FadeUp>
                                ))
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </PageHero>
        </>
    );
}

/* Status Badge Component with animated pulse indicator */
function StatusBadge({ status }) {
    const label = STATUS_LABELS[status] || "Nominated";
    const color = STATUS_COLORS[status] || "indigo";

    const colorMap = {
        amber: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
        gold: "bg-gold-500/10 text-gold-400 border-gold-500/30",
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
        pink: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    };

    return (
        <span className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest ${colorMap[color]}`}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-2" />
            {label}
        </span>
    );
}
