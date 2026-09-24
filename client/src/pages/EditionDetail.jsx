import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPreviousEditionByYear } from "../services/api.js";
import VideoGallery from "../components/VideoGallery.jsx";
import { PageHero } from "../components/Motion.jsx";

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
            <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] mb-12 rounded-[2rem] overflow-hidden bg-slate-900/80 backdrop-blur-md  border border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent pointer-events-none"></div>
                <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 animate-pulse">📸</div>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] mb-3">Capturing Memories...</h3>
                <p className="text-slate-400 text-sm sm:text-base max-w-md">We are currently organizing and uploading high-quality photos for the {year} edition. Check back soon!</p>
            </div>
        );
    }

    function next() { setCurr((c) => (c + 1) % images.length); }
    function prev() { setCurr((c) => (c - 1 + images.length) % images.length); }

    return (
        <div className="relative w-full h-[300px] sm:h-[450px] md:h-[550px] lg:h-[650px] mb-12 sm:mb-16 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group border border-white/10">
            <img
                src={images[curr]}
                className="w-full h-full object-cover transition duration-1000 ease-out"
                style={{ imageRendering: "high-quality" }}
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

// Event Gallery - Scrolling Image Marquee
function EventGallery({ images }) {
    if (images.length === 0) return null;

    return (
        <div className="mb-16 sm:mb-24 overflow-hidden relative">
            <div className="flex items-center justify-center gap-3 mb-8 sm:mb-12">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                <h3 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] tracking-wide uppercase">
                    Media Gallery
                </h3>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
            </div>

            <div className="relative group">
                {/* Soft edge masks */}
                <div className="absolute top-0 left-0 w-16 sm:w-40 h-full bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-16 sm:w-40 h-full bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>

                <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
                    {[...images, ...images].map((img, i) => (
                        <div
                            key={i}
                            className="shrink-0 w-[260px] h-[180px] sm:w-[380px] sm:h-[260px] md:w-[450px] md:h-[300px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-[#d4af37]/40 bg-slate-900/80 backdrop-blur-md group/item relative"
                        >
                            <img
                                src={img}
                                alt={`Highlight ${i}`}
                                className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover/item:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors duration-500 z-20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function EditionDetail() {
    const { year, slug } = useParams();
    const identifier = slug || year;
    const [edition, setEdition] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Still checking Covid year to show the special UI if they haven't explicitly added it, or we just rely on the edition
    const isCovidYear = identifier === "2020" || identifier === "2021";

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const res = await fetchPreviousEditionByYear(year || identifier, slug);
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

    if (!edition && !isCovidYear) {
        return (
            <PageHero
                badge="Notice"
                icon="🔍"
                title="Edition Not Found"
                subtitle={`We couldn't find the information for the edition: ${identifier}.`}
            >
                <div className="min-h-[40vh] flex flex-col items-center justify-center p-6 text-center">
                    <Link
                        to="/"
                        className="btn-primary"
                    >
                        Browse All Editions
                    </Link>
                </div>
            </PageHero>
        );
    }

    const displayYear = edition ? edition.year : identifier;

    return (
        <div className="w-full pt-32 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-32 relative z-10">

                {!edition && isCovidYear ? (
                    <div className="relative w-full py-20 px-6 sm:px-12 mb-12 sm:mb-16 rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-slate-900/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full group-hover:bg-red-500/10 transition-colors duration-700" />
                        <div className="text-7xl mb-6 drop-shadow-2xl">😷</div>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] mb-6 tracking-tight">
                            Edition {displayYear}
                        </h2>
                        <div className="bg-red-500/10 px-8 py-3 rounded-full border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] mb-8">
                            <p className="text-red-400 font-bold text-lg sm:text-xl uppercase tracking-widest">
                                Award Not Organised Due to COVID-19
                            </p>
                        </div>
                        <p className="text-slate-400 text-base sm:text-lg max-w-2xl italic leading-relaxed">
                            "The safety of our heroes was our top priority during the pandemic. We returned stronger and more resolute in the following years."
                        </p>
                    </div>
                ) : (
                    <>
                        <BannerSlider images={images} year={displayYear} />
                        <EventGallery images={images} />
                        <VideoGallery videoLinks={edition.videoLinks} />
                    </>
                )}

                <div className="space-y-16 sm:space-y-24 mt-16 sm:mt-24">
                    {/* Header Info */}
                    <header className="max-w-5xl text-center mx-auto">
                        <div className="inline-flex items-center justify-center gap-3">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                            <span className="text-[#d4af37] text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
                                {edition?.editionLabel || "Previous Edition"}
                            </span>
                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.15] tracking-tight mt-3">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] drop-shadow-[0_2px_15px_rgba(212,169,106,0.3)]"> {edition?.title || "Indian Icon of The Year"} {displayYear}</span>
                        </h1>
                        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto whitespace-pre-line font-medium">
                            {edition?.hero || `The ${displayYear} ${edition?.title || "Indian Icon of The Year"} celebrated the visionaries, business leaders, entrepreneurs, and changemakers.`}
                        </p>
                    </header>

                    {edition && (
                        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 items-stretch">
                            {/* Legacy Card */}
                            <section className="lg:col-span-5 flex">
                                <div className="w-full bg-slate-900/80 backdrop-blur-md p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white/10 relative overflow-hidden group hover:border-[#d4af37]/30 transition-all duration-500 shadow-2xl flex flex-col justify-center">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 blur-[80px] rounded-full group-hover:bg-[#d4af37]/10 transition-colors duration-700" />
                                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-6 sm:mb-8 flex items-center gap-4 relative z-10">
                                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xl shadow-[0_0_15px_rgba(212,175,55,0.2)]">🏅</span>
                                        The {displayYear} Legacy
                                    </h2>
                                    <div className="text-base sm:text-lg text-slate-300 leading-relaxed space-y-6 relative z-10">
                                        <p>
                                            Organized by <strong className="text-white font-bold tracking-wide">TIME Cyber Media Pvt Ltd</strong>, the {displayYear} ceremony in <strong className="text-[#d4af37] whitespace-nowrap">{edition.locations?.join(", ") || edition.locations}</strong> served as a powerful platform for networking, recognition, and medical innovation.
                                        </p>
                                        <p>
                                            We identified leaders who prioritize excellence, ethical practice, and innovation across various sectors.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Stats Grid */}
                            <section className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
                                {[
                                    { label: "500+", sub: "Nominations Received", icon: "📝" },
                                    { label: "40+", sub: "Award Categories", icon: "🏆" },
                                    { label: "100+", sub: "Organizations Represented", icon: "🏢" },
                                    { label: edition.editionLabel?.split(" ")[0] || "Past", sub: "Successful Edition", icon: "🌟" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 flex flex-col justify-center items-center text-center group hover:border-[#d4af37]/30 hover:bg-slate-900 transition-all duration-500 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/0 via-[#d4af37]/5 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="text-2xl mb-3 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-transform">{item.icon}</div>
                                        <div className="text-3xl sm:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 font-black mb-2 group-hover:from-white group-hover:to-white transition-all">{item.label}</div>
                                        <div className="text-[10px] sm:text-xs font-bold text-[#d4af37] uppercase tracking-widest leading-tight">{item.sub}</div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    )}

                    {/* Evaluation Architecture */}
                    <section className="bg-slate-900/80 backdrop-blur-md p-8 sm:p-14 md:p-16 rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

                        <div className="text-center mb-12 sm:mb-20 relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                                Rigorous <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#ffeec3]">Evaluation</span> Architecture
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 relative z-10">
                            {[
                                { title: "Nomination", desc: "Open call for outstanding business leaders, innovators, and organizations." },
                                { title: "Audit", desc: "Detailed performance analysis and benchmarking." },
                                { title: "Review", desc: "Secondary feedback from industry peers." },
                                { title: "Jury", desc: "Final verification by our elite board of experts." }
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
            </div>
        </div>
    );
}
