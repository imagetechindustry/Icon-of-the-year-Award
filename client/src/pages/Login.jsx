import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getBaseUrl } from "../services/api.js";
import { FiMail, FiLock, FiArrowRight, FiHome } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FadeUp, ScaleIn, PageHero } from "../components/Motion.jsx";
import { motion } from "framer-motion";

export default function Login() {
  const { login, isAuthenticated, initialised } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialised && isAuthenticated) {
      const from = location.state?.from?.pathname || "/nominate";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, initialised, navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setSubmitting(true);
      await login(email, password);
      const from = location.state?.from?.pathname || "/nominate";
      navigate(from, { replace: true });
    } catch (err) {
      if (err.message.includes("verify your email") || err.message.includes("verified")) {
        navigate("/verify-email", { state: { email } });
      } else {
        setError(err.message || "Unable to login");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const apiUrl = getBaseUrl();
    window.location.href = `${apiUrl}/api/auth/google`;
  };

  return (
    <PageHero
      badge="Secure Access"
      icon="🔐"
      title="Portal Login"
      subtitle="Indian Icon of The Year, 2026 — Access your dashboard and manage nominations."
    >
      <div className="flex items-center justify-center p-2 sm:p-4 pb-10">
        <div className="relative w-full max-w-[480px]">
          <ScaleIn delay={0.2}>
            {/* Main Card Wrapper */}
            <div className="glass-card p-8 md:p-10 border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />

              {/* Error Notifications */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Credentials Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400/70 ml-1">
                    <FiMail /> Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@indianicon.com"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400/70">
                      <FiLock /> Password
                    </label>
                    <Link to="/forgot-password" size="xs" className="text-[9px] font-black uppercase tracking-widest text-indigo-100/30 hover:text-indigo-400 transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <input
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full h-14 text-xs uppercase tracking-widest font-black"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <FiArrowRight className="ml-2 text-lg" /></>
                  )}
                </button>
              </form>

              {/* Social Logins (Google OAuth integration) */}
              <div className="mt-8 relative z-10">
                <div className="relative flex items-center justify-center mb-6">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">Social Connect</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
                >
                  <FcGoogle className="text-xl" />
                  <span className="uppercase tracking-widest">Login with Google</span>
                </button>
              </div>

              {/* Registration redirection link */}
              <div className="mt-8 pt-6 border-t border-white/5 text-center relative z-10">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Don't have an account? <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors ml-1 underline decoration-indigo-400/30">Create One</Link>
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </PageHero>
  );
}
