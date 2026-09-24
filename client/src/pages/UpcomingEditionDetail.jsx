import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUpcomingEditionByYear } from "../services/api.js";
import VideoGallery from "../components/VideoGallery.jsx";
import { PageHero } from "../components/Motion.jsx";
import { Calendar, MapPin, Shield, Sparkles, Handshake, Megaphone } from "lucide-react";
import GuestSlider from "../components/home/GuestSlider.jsx";

// Banner slider with auto-scroll and modern UI
function BannerSlider({ images, year }) {
    const [curr, setCurr] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;
        const timer = setInterval(() => {
            setCurr((c) => (c + 1) % images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [images.length]);

    if (images.length === 0) {
        return (
            <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] mb-12 rounded-[2rem] overflow-hidden bg-slate-950/40  border border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent pointer-events-none"></div>
                <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 animate-pulse">📅</div>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] mb-3">Planning in Progress...</h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-md">We are currently organizing and uploading promotional media for the {year} upcoming event. Check back soon!</p>
            </div>
        );
    }

    function next() { setCurr((c) => (c + 1) % images.length); }
    function prev() { setCurr((c) => (c - 1 + images.length) % images.length); }

    return (
        <div className="relative w-full h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] mb-12 sm:mb-16 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group border border-white/10">
            <img
                src={images[curr]}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition duration-1000 ease-out"
                alt={`Banner ${curr + 1}`}
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-slate-950/20 to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/50 via-transparent to-[#020617]/50 pointer-events-none" />

            {/* Navigation Buttons */}
            <button
                aria-label="Previous"
                onClick={prev}
                className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-black/40 hover:bg-[#d4af37] hover:text-black text-white rounded-full transition-all duration-300 z-10 border border-white/20  opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
                aria-label="Next"
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-black/40 hover:bg-[#d4af37] hover:text-black text-white rounded-full transition-all duration-300 z-10 border border-white/20  opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20 bg-black/30 px-4 pt-10 pb-4 rounded-full  border border-white/10">
                {images.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to banner ${i + 1}`}
                        onClick={() => setCurr(i)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${curr === i
                            ? "bg-slate-500 w-8 sm:w-12 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                            : "bg-white/40 w-2 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

// EventGallery removed and replaced with GuestsAndSpeakers

export default function UpcomingEditionDetail() {
    const { year, slug } = useParams();
    const identifier = slug || year;
    const [edition, setEdition] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const res = await fetchUpcomingEditionByYear(year || identifier, slug);
                // Correctly handle both { data: ... } and direct object
                const data = res?.data || res;

                if (data && (data.year || data.title)) {
                    setEdition(data);
                    setImages(data.images || []);
                } else {
                    setEdition(null);
                    setImages([]);
                }
            } catch (err) {
                console.error("Failed to fetch edition:", err);
                setEdition(null);
                setImages([]);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [year, slug, identifier]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent pointer-events-none"></div>
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-[#d4af37] rounded-full animate-spin shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
                </div>
            </div>
        );
    }

    if (!edition) {
        return (
            <PageHero
                badge="Notice"
                icon="🔍"
                title="Event Not Found"
                subtitle={`We couldn't find the information for the upcoming event: ${identifier}.`}
            >
                <div className="min-h-[40vh] flex flex-col items-center justify-center p-6 text-center">
                    <Link
                        to="/upcoming-awards"
                        className="btn-primary"
                    >
                        Browse Upcoming Awards
                    </Link>
                </div>
            </PageHero>
        );
    }

    const displayYear = edition ? edition.year : identifier;
    const locationString = edition.locations ? (Array.isArray(edition.locations) ? edition.locations.join(", ") : edition.locations) : "Location TBD";

    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-32 mt-30 relative z-10">

            <BannerSlider images={images} year={displayYear} />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-12 mb-16">
                {/* LEFT CONTENT: Event Details */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent">
                            {edition.title || "Indian Icon of The Year"},
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#d4af37] to-transparent mb-8 rounded-full"></div>

                        <h3 className="text-xl md:text-2xl text-white font-medium mb-6">
                            {edition.editionLabel || `The Grand Edition ${displayYear}`}
                        </h3>

                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p>
                                The event aims to recognize and honor outstanding contributions , celebrating  professionals who are driving innovation and excellence.
                            </p>

                            <h4 className="text-white font-semibold text-xl pt-4">Recognizing Excellence </h4>

                            <p>
                                {edition.hero || `Over the years, the International Education Excellence Awards have become a benchmark for recognizing quality, leadership, and innovation in the education sector. This ${displayYear} edition continues this legacy by honoring those who have made a significant impact on learning and development.`}
                            </p>

                        </div>
                    </div>

                    {/* Features Box Grid (Screenshot 1) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-lg hover:border-[#d4af37]/40 hover:bg-slate-900 transition-all group">
                            <Sparkles className="text-[#d4af37] w-12 h-12 mb-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <h4 className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent font-black tracking-widest text-sm mb-2 uppercase">RECOGNITION</h4>
                            <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">ELITE GLOBAL FAME</p>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-lg hover:border-[#d4af37]/40 hover:bg-slate-900 transition-all group">
                            <Handshake className="text-[#d4af37] w-12 h-12 mb-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <h4 className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent font-black tracking-widest text-sm mb-2 uppercase">NETWORKING</h4>
                            <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">VVIP CONNECTIONS</p>
                        </div>
                        <div className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-lg hover:border-[#d4af37]/40 hover:bg-slate-900 transition-all group">
                            <Megaphone className="text-[#d4af37] w-12 h-12 mb-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                            <h4 className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent font-black tracking-widest text-sm mb-2 uppercase">NEWS</h4>
                            <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">TOP MEDIA COVERAGE</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT: Sidebar Cards */}
                <div className="lg:col-span-4 space-y-8 sticky top-28">
                    {/* Registration Box */}
                    <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-[50px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_#22c55e]"></div>
                            <h3 className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent font-black tracking-[0.2em] text-xs uppercase">Nominations Open</h3>
                        </div>

                        <div className="space-y-8 mb-10 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 shrink-0 rounded-2xl border border-[#d4af37]/30 flex items-center justify-center bg-[#d4af37]/5 text-[#d4af37]">
                                    <Calendar size={26} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[#d4af37] text-[10px] font-black tracking-[0.2em] uppercase mb-1.5">Event Date</p>
                                    <p className="text-white font-bold text-lg leading-tight">{edition.date || "To Be Announced"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 shrink-0 rounded-2xl border border-[#d4af37]/30 flex items-center justify-center bg-[#d4af37]/5 text-[#d4af37]">
                                    <MapPin size={26} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-[#d4af37] text-[10px] font-black tracking-[0.2em] uppercase mb-1.5">Venue Location</p>
                                    <p className="text-white font-bold text-lg leading-tight">{locationString}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <Link to="/nominate" className="relative w-full py-4 px-6 rounded-xl font-black text-white overflow-hidden group/btn transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 bg-gradient-to-r from-[#000080] via-[#B8860B] to-[#C41E3A] shadow hover:shadow-lg">
                                <span className="relative z-10 text-sm tracking-[0.15em] uppercase">REGISTER NOW</span>
                                <svg className="w-5 h-5 relative z-10 group-hover/btn:rotate-12 transition-transform duration-500 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                            </Link>
                            <Link to="/nominate" className="btn-outline w-full py-5 rounded-[1rem] tracking-[0.15em] text-sm font-black flex justify-center uppercase">
                                SELF NOMINATE
                            </Link>
                        </div>
                    </div>

                    {/* Trusted Recognition Hub Box */}
                    <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex items-center gap-6">
                        <div className="w-14 h-16 shrink-0 bg-gradient-to-b from-slate-200 to-slate-400 rounded-t-sm rounded-b-[1.5rem] flex items-center justify-center text-red-600 border-4 border-red-500 shadow-[inset_0_-4px_10px_rgba(0,0,0,0.5)]">
                            <Shield size={28} fill="currentColor" className="text-red-600" />
                        </div>
                        <h4 className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent font-black tracking-[0.15em] text-xs sm:text-sm uppercase leading-relaxed flex-1">
                            The World's Most Trusted Recognition Hub
                        </h4>
                    </div>
                </div>
            </div>

            <GuestSlider />
            <VideoGallery videoLinks={edition.videoLinks} />

            {/* Evaluation Architecture */}
            <section className="bg-slate-900/80 backdrop-blur-md p-8 sm:p-14 md:p-16 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden mt-16">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="text-center mb-12 sm:mb-20 relative z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Registration & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ffeec3]">Evaluation</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 relative z-10">
                    {[
                        { title: "Nominate", desc: "Submit your application for the upcoming awards." },
                        { title: "Audit", desc: "Detailed performance analysis and benchmarking." },
                        { title: "Review", desc: "Secondary feedback from industry peers." },
                        { title: "Jury", desc: "Final selection by our elite board of experts." }
                    ].map((step, i) => (
                        <div key={i} className="text-center group relative">
                            {/* Connecting Line for desktop */}
                            {i < 3 && <div className="hidden lg:block absolute top-[2.5rem] sm:top-[3rem] left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#d4af37]/20 to-transparent z-0"></div>}

                            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-slate-900/80 backdrop-blur-md border-2 border-white/10 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-black text-[#d4af37] mb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-[#d4af37]/50 group-hover:scale-110 transition-all duration-500">
                                0{i + 1}
                                <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors">{step.title}</h4>
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-[180px] sm:max-w-[220px] mx-auto">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>

    );
}
