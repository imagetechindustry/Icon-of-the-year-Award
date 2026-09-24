import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getBaseUrl } from "../services/api.js";
import { FiUser, FiMail, FiLock, FiArrowRight, FiHome } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {  FadeUp, ScaleIn, PageHero } from "../components/Motion.jsx";
import { motion } from "framer-motion";


export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      await register(name, email, password);
      navigate("/verify-email", { state: { email } });
    } catch (err) {
      setError(err.message || "Unable to create account");
    } finally {
      setSubmitting(false);
    }
  };

  return (

    <>
      <PageHero
        badge="Join the Honors"
        icon="✨"
        title="Create Account"
        subtitle="Start your nomination journey for the Indian Icon of The Year, 2026."
      >
        <div className="flex items-center justify-center p-4 sm:p-6 pb-32">
          <div className="relative w-full max-w-[500px]">


            <ScaleIn delay={0.2}>
              {/* Registration Main Card Wrapper */}
              <div className="glass-card p-8 md:p-10 border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

                {/* Error Notifications Banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Registration Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400/70 ml-1">
                      <FiUser /> Full Name / Organization
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ex. Dr. John Doe / International Clinic"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400/70 ml-1">
                      <FiMail /> Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@company.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400/70 ml-1">
                      <FiLock /> Set Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Min. 6 characters"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full h-14 text-xs uppercase tracking-widest font-black mt-4"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Create Account <FiArrowRight className="ml-2 text-lg" /></>
                    )}
                  </button>
                </form>

                {/* Google Signup Integration */}
                <div className="mt-8 relative z-10">
                  <div className="relative flex items-center justify-center mb-6">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">Quick Signup</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <button
                    onClick={() => {
                      const apiUrl = getBaseUrl();
                      window.location.href = `${apiUrl}/api/auth/google`;
                    }}
                    className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
                  >
                    <FcGoogle className="text-xl" />
                    <span className="uppercase tracking-widest">Sign up with Google</span>
                  </button>
                </div>

                {/* Redirect back to Login Link */}
                <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors ml-1 underline decoration-cyan-400/30">Sign In</Link>
                  </p>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </PageHero>
    </>
  );
}
