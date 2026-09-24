import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUpcomingEditions } from "../services/api.js";
import { FadeUp, NeonCard } from "./Motion.jsx";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

function AwardCard({ edition }) {
    const navigate = useNavigate();
    const formattedTitle = edition.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return (
        <NeonCard color="indigo" className="flex-1 flex flex-col !p-0">
            <div className="relative flex-1 flex flex-col overflow-hidden group">
                {/* Image Header */}
                <div className="w-full relative overflow-hidden bg-slate-900/80 shrink-0">
                    {edition.images && edition.images.length > 0 ? (
                        <img
                            src={edition.images[0]}
                            alt={edition.title || "Upcoming Award"}
                            className="w-full h-auto block group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full aspect-video flex items-center justify-center text-5xl">🏆</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/80 via-transparent to-transparent opacity-90 pointer-events-none" />

                    <div className="absolute top-6 left-6">
                        <span className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] text-[#020817] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl">
                            {edition.year}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col text-left">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#D4A96A]/10 text-[#D4A96A] border border-[#D4A96A]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A96A] animate-pulse" />
                            {edition.editionLabel || "Upcoming Edition"}
                        </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white leading-snug uppercase mb-2 min-h-[40px] group-hover:text-[#D4A96A] transition-colors line-clamp-2">
                        {edition.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 py-1 my-1 text-white/70">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <MapPin size={16} className="text-[#D4A96A] shrink-0" />
                            <div className="flex flex-col min-w-0">
                                <span className="text-[9px] font-bold text-[#EFC98A]/60 uppercase tracking-wider leading-none mb-1">Venue</span>
                                <span className="text-[10px] font-semibold text-white/90 truncate">
                                    {Array.isArray(edition.locations) ? edition.locations.join(", ") : (edition.locations || "Location TBA")}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 min-w-0">
                            <Calendar size={16} className="text-[#D4A96A] shrink-0" />
                            <div className="flex flex-col min-w-0">
                                <span className="text-[9px] font-bold text-[#EFC98A]/60 uppercase tracking-wider leading-none mb-1">Date</span>
                                <span className="text-[10px] font-semibold text-white/90 truncate">
                                    {edition.date || "Date TBA"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto pt-3 flex gap-3">
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate('/nominate'); }}
                            className="bg-gradient-to-r from-[#000080] via-[#B8860B] to-[#C41E3A] text-white flex-[1.2] py-3 px-4 rounded-4xl cursor-pointer text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(251,113,133,0.3)] hover:shadow-[0_0_30px_rgba(251,113,133,0.5)] transition-all duration-300 group/nominate"
                        >
                            Nominate <ArrowRight size={12} className="group-hover/nominate:translate-x-0.5 transition-transform duration-300" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/upcoming-editions/${edition.year}/${formattedTitle}`); }}
                            className="btn-outline flex-1 !py-3 !px-3 !text-[10px] font-black uppercase tracking-wider flex items-center justify-center"
                        >
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </NeonCard>
    );
}

export default function UpcomingAwards() {
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetchUpcomingEditions();
                // Flatten the API grouped response into a single array
                const flattened = res.reduce((acc, group) => acc.concat(group.items.map(item => ({ ...item, year: group.year }))), []);
                setEditions(flattened);
            } catch (err) {
                console.error("Failed to fetch upcoming awards:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // If there are 1 or 2 awards, don't duplicate them.
    // If there are 3 to 5, duplicate them so the infinite loop works smoothly.
    const displayAwards = editions.length > 2 && editions.length < 6
        ? [...editions, ...editions]
        : editions;

    return (
        <section className="relative overflow-hidden py-16">
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/3 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#4338CA]/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#4338CA]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
                <FadeUp className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
                        Upcoming Awards
                    </h2>
                    <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
                    <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        Join us in celebrating excellence across various industries internationally through our prestigious recognition platforms.
                    </p>
                </FadeUp>
                <FadeUp delay={0.2} className="w-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin" />
                            <p className="text-sm font-bold tracking-widest uppercase animate-pulse text-indigo-300">Loading Future Events...</p>
                        </div>
                    ) : editions.length > 0 ? (
                        editions.length <= 2 ? (
                            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch gap-6 sm:gap-8 max-w-4xl mx-auto w-full px-4">
                                {editions.map((edition) => (
                                    <div key={edition._id} className="w-full max-w-[380px] sm:w-[350px] md:w-[380px] flex flex-col">
                                        <AwardCard edition={edition} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1.1}
                                loop={true}
                                centerInsufficientSlides={true}
                                speed={1200}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                breakpoints={{
                                    400: { slidesPerView: 1, spaceBetween: 20 },
                                    640: { slidesPerView: 2, spaceBetween: 24 },
                                    1024: { slidesPerView: 3, spaceBetween: 30 },
                                    1280: { slidesPerView: 3, spaceBetween: 32 },
                                }}
                                className="!pb-20"
                            >
                                {displayAwards.map((edition, index) => (
                                    <SwiperSlide key={`${edition._id}-${index}`} className="!px-0 !h-auto flex">
                                        <div className="w-full flex flex-col h-full">
                                            <AwardCard edition={edition} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                    ) : (
                        <div className="text-center py-20 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md">
                            <p className="text-indigo-100/40 font-black uppercase tracking-widest">No upcoming awards scheduled currently.</p>
                        </div>
                    )}
                </FadeUp>
            </div>
        </section>
    );
}
