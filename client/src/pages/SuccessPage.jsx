import { FiCheckCircle, FiPhoneCall, FiMail, FiArrowLeft, FiHome } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { ScaleIn, FadeUp, NeonCard, PageHero } from "../components/Motion.jsx";

export default function SuccessPage() {
    const location = useLocation();
    const autoCreated = location.state?.autoCreated;
    const email = location.state?.email;

    return (
        <>
            <PageHero
                badge="Confirmation"
                icon="✅"
                title="Submission Successful"
                subtitle="Thank you for your nomination. Your application is now in review."
            >

                <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 flex items-center justify-center">

                    <div className="max-w-xl w-full">
                        <ScaleIn delay={0.1}>
                            {/* Success Confirmation Neon Card */}
                            <NeonCard color="indigo" className="p-8 md:p-12 text-center">
                                <div className="flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-500/40 blur-3xl rounded-full animate-pulse" />
                                        <FiCheckCircle className="relative text-indigo-400 w-24 h-24" />
                                    </div>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                                    Submission <span className="text-gradient-prestige">Successful!</span>
                                </h2>

                                <p className="text-indigo-100/60 text-base mb-10 leading-relaxed font-bold italic">
                                    Your nomination has been successfully received. Our team of experts will review your profile and connect with you shortly.
                                </p>

                                {/* Auto-Generated Account Information Banner (Conditional) */}
                                {autoCreated && (
                                    <FadeUp delay={0.3}>
                                        <div className="bg-indigo-500/10 rounded-3xl p-6 mb-10 border border-indigo-500/20 text-left ">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                    <FiMail className="w-5 h-5" />
                                                </div>
                                                <h3 className="text-white text-sm font-black uppercase tracking-widest">Account Created</h3>
                                            </div>
                                            <p className="text-indigo-100/50 text-xs leading-relaxed font-bold">
                                                An account has been created for <strong className="text-indigo-400">{email}</strong>.
                                                Your login credentials have been sent to your inbox.
                                            </p>
                                        </div>
                                    </FadeUp>
                                )}

                                {/* Support Contact Channels Nudge Box */}
                                <div className="bg-white/5 rounded-3xl p-8 mb-10 border border-white/5 ">
                                    <h2 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center justify-center gap-2">
                                        <FiPhoneCall className="text-indigo-400" /> Need Immediate Assistance?
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Nominations</p>
                                                <p className="text-sm font-black text-white">+91 9810 88 2769</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Sponsorship</p>
                                                <p className="text-sm font-black text-white">+91 9971 00 2984</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Helpline</p>
                                                <p className="text-sm font-black text-white">+91 9810 91 0686</p>
                                            </div>
                                            <div className="pt-2">
                                                <Link to="/contact" className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] hover:text-indigo-300 transition-colors">
                                                    Visit Support Center →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/"
                                    className="btn-primary w-full h-16 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                                >
                                    <FiHome className="text-xl" /> Back to Home
                                </Link>
                            </NeonCard>
                        </ScaleIn>
                    </div>
                </div>
            </PageHero>
        </>
    );
}
