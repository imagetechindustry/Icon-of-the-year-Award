import { useState, useEffect } from "react";
import AdminPreviousEditions from "../components/AdminPreviousEditions.jsx";
import { Lock } from "lucide-react";
import { getBaseUrl } from "../services/api.js";
import { PageHero } from "../components/Motion.jsx";

export default function DeveloperAuth() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [devToken, setDevToken] = useState(null);

    // Initial load: check if dev token is already in memory/storage
    useEffect(() => {
        const storedToken = localStorage.getItem("TimecyberDeveloperToken");
        if (storedToken) {
            setDevToken(storedToken);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${getBaseUrl()}/api/developer/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            });
            //hello

            const data = await res.json();

            if (data.success && data.token) {
                localStorage.setItem("TimecyberDeveloperToken", data.token);
                setDevToken(data.token);
            } else {
                setError(data.message || "Invalid Developer Password");
            }
        } catch (err) {
            setError("Server connection failed. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("TimecyberDeveloperToken");
        setDevToken(null);
        setPassword("");
    };

    // If authenticated, show the dev panel (wrapping the previous editions component)
    if (devToken) {
        return (
            <PageHero
                badge="Development"
                icon="🛠️"
                title={<span>Developer <span className="text-gradient-prestige">Panel</span></span>}
                subtitle="Manage platform editions and bypass administrative protocols."
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                        {/* Authenticated Developer Header and Control Node */}
                        <div className="lg:col-span-3 flex flex-col md:flex-row justify-between items-center bg-[#020817]/60 p-10 rounded-[2.5rem] border border-white/10  shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                                <Lock size={120} className="text-indigo-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400/80">Protocol: Secure_Bypass</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-3 leading-none">
                                    India Icon of the year <span className="text-gradient-prestige">Developer</span> Console
                                </h2>
                                <p className="text-indigo-100/30 text-[10px] font-black uppercase tracking-[0.3em]">Authorized Access — Node 9982</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="mt-8 md:mt-0 relative z-10 text-[10px] font-black uppercase tracking-widest px-10 py-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95 group-hover:border-red-500/40"
                            >
                                Terminate Session
                            </button>
                        </div>

                        {/* Current Identity node indicators */}
                        <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden ">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-6 italic">Identity Node</p>
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-[1.25rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg">
                                    <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white tracking-tighter">DEV_ROOT</p>
                                    <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest">Sys_Admin_001</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platform Editions management component wrapper */}
                    <div className="bg-white/[0.02] p-2 rounded-[3.5rem] border border-white/5 shadow-2xl ">
                        <div className="bg-[#020817]/40 rounded-[3rem] p-10 lg:p-12 border border-white/10">
                            <AdminPreviousEditions customToken={devToken} />
                        </div>
                    </div>
                </div>
            </PageHero>
        );
    }

    // Otherwise show login
    return (
        <>
            <PageHero
                badge="Restricted Access"
                icon="🔒"
                title={<span>Developer <span className="text-gradient-prestige">Auth</span></span>}
                subtitle="Please enter the high-level security password to access the development node."
            >
                <div className="flex items-center justify-center p-4 sm:p-6 pb-32">
                    {/* Login/Verification Portal Card Wrapper */}
                    <div className="w-full glass-card max-w-md border border-white/10 p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(16,185,129,0.1)] relative z-10  group overflow-hidden">
                        {/* Decorative Scan Line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scan z-20" />

                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-purple-500/[0.03] pointer-events-none" />

                        <div className="flex justify-center mb-10 text-indigo-400 relative">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150" />
                            <div className="w-24 h-24 rounded-[2rem] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-2xl shadow-[0_0_20px_rgba(251,113,133,0.4)] relative z-10 group-hover:scale-110 transition-transform duration-500">
                                <Lock size={40} className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            </div>
                        </div>

                        <div className="text-center mb-12 relative z-10">
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                                Security <span className="text-gradient-prestige">Protocol</span>
                            </h2>
                            <p className="text-[10px] font-black text-indigo-100/30 uppercase tracking-[0.6em] mt-3">Node Authentication Required</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest px-4 py-3 rounded-xl mb-6 text-center">
                                {error}
                            </div>
                        )}

                        {/* Authentication Password Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Developer Password"
                                    className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-all text-center tracking-[0.2em] font-black text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full h-14 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : "Initialize Access"}
                            </button>
                        </form>
                    </div>
                </div>
            </PageHero>
        </>
    );
}
