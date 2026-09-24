import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FiShield, FiMail, FiLock, FiChevronRight, FiHome } from "react-icons/fi";
import { PageHero } from "../components/Motion.jsx";

export default function AdminLogin() {
  const { loginAsAdmin, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSubmitting(true);
      await loginAsAdmin(email, password);
    } catch (err) {
      setError(err.message || "Unable to login as admin");
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      const from = location.state?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const goldGrad = "linear-gradient(90deg,#e9d781 0%,#dac24a 29.69%,#fee19a 70%,#bc9830 100%)";

  return (
    <>
      <PageHero
        badge="Admin Secure Access"
        icon="🛡️"
        title={<span>Admin <span className="text-gradient-prestige">Login</span></span>}
        subtitle="Indian Icon of The Year, 2026 — Administrative Control Center."
      >
        <section className="min-h-[80vh] w-full relative flex items-center justify-center p-4 sm:p-6 pb-32">
          <div className="relative w-full max-w-[440px] flex flex-col items-center">
            {/* Admin Login Portal Card Wrapper */}
            <div className="w-full glass-card border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-[#d4af37]/5 pointer-events-none" />

              {error && (
                <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                  {error}
                </div>
              )}

              {/* Form for Admin Credentials submission */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 group">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400/60 group-focus-within:text-indigo-400 transition-colors ml-1">
                    <FiMail /> Administrator ID
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-base placeholder:text-white/10 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@internal.com"
                  />
                </div>

                <div className="space-y-2 group">
                  <div className="flex justify-between items-center px-1">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37]/70 group-focus-within:text-[#d4af37] transition-colors ml-1">
                      <FiLock /> Security Key
                    </label>
                    <Link to="/forgot-password" size="xs" className="text-[9px] font-black uppercase tracking-widest text-indigo-100/30 hover:text-indigo-400 transition-colors">
                      Forgot?
                    </Link>
                  </div>
                  <input
                    type="password"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white text-base placeholder:text-white/10 focus:outline-none focus:border-[#d4af37]/40 focus:bg-white/[0.06] transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full group relative flex items-center justify-center h-16 rounded-2xl overflow-hidden transition-all active:scale-95 disabled:opacity-50 mt-4"
                >
                  <div
                    className="absolute inset-0 transition-transform group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, #9F1239, #4338CA, #60A5FA)` }}
                  />
                  <span className="relative flex items-center gap-3 text-white font-black uppercase tracking-widest text-sm">
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        Checking Clearance...
                      </>
                    ) : (
                      <>
                        Initialize Portal <FiChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Register Redirection Link for initial setup */}
              <div className="mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-indigo-200/20 text-[10px] font-black uppercase tracking-widest">
                  Need access?{" "}
                  <Link
                    to="/admin/register"
                    className="text-indigo-400 hover:text-white transition-colors ml-2 underline decoration-indigo-400/20"
                  >
                    Request Credentials
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

