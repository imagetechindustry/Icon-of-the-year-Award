import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiShield, FiUser, FiMail, FiLock, FiKey, FiArrowRight, FiHome } from "react-icons/fi";
import { PageHero } from "../components/Motion.jsx";

export default function AdminRegister() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setSubmitting(true);
            await register(name, email, password, secretCode);
            navigate("/admin", { replace: true });
        } catch (err) {
            setError(err.message || "Unable to create admin account");
        } finally {
            setSubmitting(false);
        }
    };

    const adminGrad = "linear-gradient(135deg, #9F1239, #4338CA, #60A5FA)";

    return (
        <>
            <PageHero
                badge="Admin Setup"
                icon="🛡️"
                title={<span>System <span className="text-gradient-prestige">Register</span></span>}
                subtitle="Initialize a new administrative node for the Indian Icon of The Year platform."
            >
                <section className="min-h-[80vh] w-full relative flex items-center justify-center p-4 sm:p-6 pb-32">
                    <div className="relative w-full max-w-[440px] flex flex-col items-center">
                        {/* Admin Shield Icon */}
                        <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-tr from-indigo-600 via-indigo-400 to-[#d4af37] rounded-[1.8rem]  flex items-center justify-center shadow-2xl shadow-indigo-600/20 group">
                            <FiShield className="h-10 w-10 text-white  group-hover:scale-110 transition-transform" />
                        </div>

                        {/* Admin Registration Form Card Wrapper */}
                        <div className="w-full glass-card border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] group overflow-hidden">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-b from-white via-white to-indigo-400 bg-clip-text text-transparent tracking-tight mb-2 uppercase">
                                    Admin Setup
                                </h2>
                                <p className="text-indigo-400/40 text-[8px] font-black uppercase tracking-[0.5em] ml-1">
                                    New Administrative Node
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold text-center uppercase tracking-widest">
                                    {error}
                                </div>
                            )}

                            {/* Administrative Credentials Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1.5 group">
                                    <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors ml-1">
                                        <FiUser /> Admin Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Admin Name"
                                    />
                                </div>

                                <div className="space-y-1.5 group">
                                    <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors ml-1">
                                        <FiMail /> Internal Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="admin@internal.com"
                                    />
                                </div>

                                <div className="space-y-1.5 group">
                                    <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#d4af37]/70 group-focus-within:text-[#d4af37] transition-colors ml-1">
                                        <FiKey /> System Access Token
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.06] transition-all"
                                        value={secretCode}
                                        onChange={(e) => setSecretCode(e.target.value)}
                                        required
                                        placeholder="Secret Key"
                                    />
                                </div>

                                <div className="space-y-1.5 group">
                                    <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors ml-1">
                                        <FiLock /> Set Security Key
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        placeholder="Min 6 chars"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full group relative flex items-center justify-center h-14 rounded-2xl overflow-hidden transition-all active:scale-95 disabled:opacity-50 my-4"
                                >
                                    <div
                                        className="absolute inset-0 transition-transform group-hover:scale-110"
                                        style={{ background: adminGrad }}
                                    />
                                    <span className="relative flex items-center gap-3  text-white font-black uppercase tracking-widest text-[11px]">
                                        {submitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Checking clearance...
                                            </>
                                        ) : (
                                            <>
                                                Initialise Account <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>

                            {/* Back to System Login Link */}
                            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                <p className="text-indigo-200/20 text-[9px] font-black uppercase tracking-widest">
                                    Existing node?{" "}
                                    <Link
                                        to="/admin/login"
                                        className="text-indigo-400 hover:text-white transition-colors ml-2 underline decoration-indigo-400/20"
                                    >
                                        System Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </PageHero>
        </>
    );
}
