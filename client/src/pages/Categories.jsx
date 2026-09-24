import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { StaggerContainer, StaggerItem, PageHero, SectionHeading, FadeUp, NeonCard } from "../components/Motion.jsx";
import { useNavigate } from "react-router-dom";

const categoryGroups = [
    {
        group: "Business & Entrepreneurship",
        icon: "🚀",
        color: "from-[#1D4ED8] via-[#4338CA] to-[#9F1239]",
        items: [
            {
                title: "Entrepreneur of the Year",
                desc: "Recognises visionary entrepreneurs who have built successful businesses and created significant industry impact.",
            },
            {
                title: "Business Leader of the Year",
                desc: "Honours exceptional leaders driving organizational growth, innovation, and excellence.",
            },
            {
                title: "Fastest Growing Company",
                desc: "Celebrates organizations demonstrating remarkable business growth and market leadership.",
            },
            {
                title: "Startup Excellence Award",
                desc: "Recognises emerging startups that have introduced innovative solutions and disruptive business models.",
            },
        ],
    },
    {
        group: "Innovation & Technology",
        icon: "💡",
        color: "from-blue-400 to-blue-500",
        items: [
            {
                title: "Innovation Icon Award",
                desc: "Honours individuals and organizations pioneering breakthrough ideas and technologies.",
            },
            {
                title: "Technology Leader of the Year",
                desc: "Recognises professionals driving digital transformation and technological advancement.",
            },
            {
                title: "Emerging Tech Startup",
                desc: "Celebrates startups leveraging technology to solve real-world challenges.",
            },
        ],
    },
    {
        group: "Leadership & Professional Excellence",
        icon: "👑",
        color: "from-purple-400 to-purple-500",
        items: [
            {
                title: "Visionary Leader of the Year",
                desc: "Recognises leaders whose vision and strategy have inspired growth and transformation.",
            },
            {
                title: "Professional Excellence Award",
                desc: "Honours professionals who have demonstrated exceptional expertise and achievements in their field.",
            },
            {
                title: "Lifetime Achievement Award",
                desc: "Celebrates individuals whose long-term contributions have left a lasting impact on society and industry.",
            },
        ],
    },
    {
        group: "Social Impact & Public Service",
        icon: "🌍",
        color: "from-[#1D4ED8] via-[#4338CA] to-[#9F1239]",
        items: [
            {
                title: "Social Impact Icon",
                desc: "Recognises changemakers creating meaningful and sustainable impact within communities.",
            },
            {
                title: "Excellence in Public Service",
                desc: "Honours individuals and organizations dedicated to improving society through public service initiatives.",
            },
            {
                title: "Sustainability & CSR Award",
                desc: "Celebrates outstanding contributions towards environmental responsibility and social development.",
            },
        ],
    },
    {
        group: "Healthcare & Education Excellence",
        icon: "🏥",
        color: "from-green-400 to-green-500",
        items: [
            {
                title: "Healthcare Excellence Award",
                desc: "Recognises healthcare professionals and institutions delivering exceptional patient care and innovation.",
            },
            {
                title: "Education Excellence Award",
                desc: "Honours educators and institutions making significant contributions to learning and development.",
            },
            {
                title: "Outstanding Research & Development Award",
                desc: "Celebrates individuals and organizations driving innovation through research and discovery.",
            },
        ],
    },
    {
        group: "Arts, Culture & Sports",
        icon: "🌟",
        color: "from-orange-400 to-red-500",
        items: [
            {
                title: "Icon in Arts & Culture",
                desc: "Recognises outstanding contributions to art, culture, literature, and creative industries.",
            },
            {
                title: "Sports Excellence Award",
                desc: "Honours athletes, coaches, and sports professionals achieving excellence and inspiring others.",
            },
            {
                title: "Youth Icon of the Year",
                desc: "Celebrates young achievers making remarkable contributions and setting new benchmarks.",
            },
        ],
    },
];

const colorMap = {
    "Business & Entrepreneurship":
        "border-indigo-400/30 hover:border-indigo-500/60",

    "Innovation & Technology":
        "border-blue-400/30 hover:border-blue-500/60",

    "Leadership & Professional Excellence":
        "border-purple-400/30 hover:border-purple-500/60",

    "Social Impact & Public Service":
        "border-rose-400/30 hover:border-rose-500/60",

    "Healthcare & Education Excellence":
        "border-green-400/30 hover:border-green-500/60",

    "Arts, Culture & Sports":
        "border-orange-400/30 hover:border-red-500/60",
};

export default function Categories() {
    const navigate = useNavigate();

    return (

        <PageHero
            badge="Indian Icon of The Year, 2026"
            icon="🏆"
            title="Indian Icon of The Year Categories"
            subtitle="Recognizing excellence and innovation across leadership, business and technology."

        >
            {/* Category Sections */}
            <div className="max-w-6xl mx-auto px-2 sm:px-6 pb-2 space-y-0.5">
                {categoryGroups.map((group, gi) => (
                    <section key={gi}>
                        {/* Group heading */}
                        <FadeUp className="flex items-center gap-2 mb-1">
                            <span className="text-3xl">{group.icon}</span>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black font-serif text-white">{group.group}</h2>
                                <div className={`mt-1 h-[3px] w-20 rounded-full bg-gradient-to-r ${group.color}`} />
                            </div>
                        </FadeUp>

                        {/* Swiper for this group */}
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={group.items.length > 3}
                            autoplay={{ delay: 3800 + gi * 200, disableOnInteraction: false }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            navigation
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 18 },
                                1024: { slidesPerView: 3, spaceBetween: 24 },
                            }}
                            className="!pb-12"
                        >
                            {group.items.map((item, ii) => (
                                <SwiperSlide key={ii} className="h-auto">
                                    <NeonCard color="indigo" className="h-full !p-0">
                                        <div className="h-full flex flex-col text-left p-6 md:p-7 min-h-[220px]">
                                            {/* Category badge */}
                                            <span className={`inline-block self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${group.color} text-white mb-4 opacity-90`}>
                                                {group.group}
                                            </span>
                                            <div className="flex items-start gap-2 mb-3">
                                                <span className="text-indigo-300 mt-0.5 flex-shrink-0">🏅</span>
                                                <h3 className="text-base md:text-lg font-bold text-white group-hover:text-indigo-100 transition-colors leading-snug">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-indigo-100/65 text-sm leading-relaxed mt-auto group-hover:text-indigo-100/85 text-left transition-colors">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </NeonCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                ))}
            </div>

            {/* CTA Footer */}
            <FadeUp className="text-center py-2 bg-gradient-to-t from-indigo-950/50 to-transparent border-t border-indigo-500/10">
                <p className="text-indigo-200/70 text-sm mb-4">All award categories are subject to jury review.</p>
                <div className="relative group w-max mx-auto">
                    {/* The Glow Layer - Matches button shape exactly */}
                    <div className="absolute inset-0 rounded-full bg-indigo-600/50 blur-md animate-border-glow group-hover:bg-indigo-400/40 transition-all" />

                    {/* The Button */}
                    <button
                        onClick={() => navigate("/nominate")}
                        className="relative z-10 btn-primary text-base px-8 py-3 rounded-full border border-indigo-400/50 bg-slate-950 text-white flex items-center gap-2"
                    >
                        Apply for Nomination →
                    </button>
                </div>



            </FadeUp>
        </PageHero>
    );
}
