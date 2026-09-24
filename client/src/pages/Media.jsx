import { useState } from 'react';
import { PageHero, FadeUp } from "../components/Motion.jsx";
import { motion } from "framer-motion";

const mediaSections = [
  {
    icon: "📰",
    title: "Print Media",
    badge: "Premium",
    color: "from-indigo-400 to-indigo-400",
    accent: "border-indigo-400/40",
    activeClasses: "text-white bg-indigo-600/20 border border-indigo-400 shadow-[0_0_20px_rgba(5,150,105,0.3)]",
    items: [
      { label: "Times of India Feature", date: "Jan 2024", desc: "Exclusive feature on International Education Award, 2026 ceremony and its impact on the international medical community.", media: { type: "image", src: "/images/print-placeholder-1.jpg" } },
      { label: "Hindustan Exclusive Coverage", date: "Feb 2023", desc: "Full-page coverage of award winners, keynote speeches, and international education milestones celebrated at the event.", media: { type: "image", src: "/images/print-placeholder-2.jpg" } },
    ],
  },
  {
    icon: "📺",
    title: "Electronic Media",
    badge: "Featured",
    color: "from-blue-400 to-indigo-400",
    accent: "border-blue-400/40",
    activeClasses: "text-white bg-blue-600/20 border border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    items: [
      { label: "", date: "March 2024", desc: "Special broadcast interview with key international education leaders and award organisers discussing the future of international education.", media: { type: "youtube", videoId: "FO9KwVu_GyA" } },
      { label: " ", date: "2023", desc: "National broadcast of the award ceremony, highlighting winners and their contributions to international education excellence.", media: { type: "youtube", videoId: "LuCukRXeE_s" } },
    ],
  },
  {
    icon: "🌐",
    title: "Digital Media",
    badge: "Online",
    color: "from-purple-400 to-violet-400",
    accent: "border-purple-400/40",
    activeClasses: "text-white bg-purple-600/20 border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]",
    items: [
      { label: "Digital Media coverage", date: "May 2024", desc: "In-depth digital report covering the awards, jury insights, and the journey of international education innovation in 2024.", media: { type: "image", src: "../digitalmedia.png" } },
      { label: "#InternationalInternational EducationAwards Trending", date: "2024", desc: "Award ceremony trended internationally on social media with thousands of posts celebrating international education excellence.", media: { type: "image", src: "/images/banner-placeholder-2.jpg" } },
    ],
  },
];



export default function Media() {
  const [activeTab, setActiveTab] = useState('Print Media');

  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Media Coverage"
        icon="🎬"
        title="Media Coverage"
        subtitle="Experience our journey through the eyes of national and international media — in print, on screen, and across digital platforms."
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8 sm:mb-12">
            {mediaSections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveTab(section.title)}
                className={`relative px-6 sm:px-10 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg transition-all duration-300 overflow-hidden group ${activeTab === section.title
                  ? section.activeClasses
                  : 'text-slate-400 border border-slate-700 hover:text-white hover:border-indigo-500 bg-indigo-950/50'
                  }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-xl">{section.icon}</span>
                  {section.title}
                </span>
              </button>
            ))}
          </div>

          <div className="w-full relative min-h-[400px]">
            {mediaSections.map((section) => (
              <div
                key={section.title}
                className={`transition-all duration-500 w-full ${activeTab === section.title
                  ? 'opacity-100 z-10 translate-y-0 relative'
                  : 'opacity-0 -z-10 translate-y-8 absolute top-0 left-0 pointer-events-none'
                  }`}
              >
                <div className="max-w-5xl mx-auto bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                  <div className="p-6 md:p-8 h-full flex flex-col text-left">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-3xl">{section.icon}</span>
                      <h2 className={`text-xl font-black bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                        {section.title}
                      </h2>
                      <span className={`ml-auto px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gradient-to-r ${section.color} text-white opacity-80`}>
                        {section.badge}
                      </span>
                    </div>

                    {/* Accent line */}
                    <div className={`h-[2px] w-full rounded-full bg-gradient-to-r ${section.color} mb-6 opacity-60`} />

                    {/* Media Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                      {section.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="group relative rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col transition-colors hover:bg-white/10"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-sm font-bold text-white leading-snug">{item.label}</span>
                            <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${section.color} text-white opacity-70`}>
                              {item.date}
                            </span>
                          </div>
                          <p className="text-xs text-indigo-100/60 text-left leading-relaxed mb-4">
                            {item.desc}
                          </p>

                          {item.media && (
                            <div className="mt-auto w-full overflow-hidden rounded-lg bg-black/40 relative aspect-video flex items-center justify-center border border-white/5">
                              {item.media.type === 'image' ? (
                                <img
                                  src={item.media.src}
                                  alt={item.label}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://placehold.co/600x400/1a1a2e/ffffff?text=${encodeURIComponent(item.label)}`;
                                  }}
                                  loading="lazy"
                                />
                              ) : item.media.type === 'video' ? (
                                <video
                                  src={item.media.src}
                                  controls
                                  preload="none"
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.poster = `https://placehold.co/600x400/1a1a2e/ffffff?text=${encodeURIComponent(item.label + " Video")}`;
                                  }}
                                >
                                  Your browser does not support the video tag.
                                </video>
                              ) : item.media.type === 'youtube' ? (
                                <iframe
                                  src={`https://www.youtube.com/embed/${item.media.videoId}?rel=0`}
                                  className="w-full h-full rounded-lg"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA + Previous Editions */}
          <FadeUp className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/previous-editions"
              className="btn-outline"
            >
              ← Previous Editions
            </a>
            <span className="glass-card border border-indigo-400/20 px-6 py-3 text-sm text-indigo-200/70 flex items-center gap-2 animate-border-glow">
              <span className="animate-pulse text-yellow-400">✨</span>
              More highlights coming soon
            </span>
          </FadeUp>
        </div>
      </PageHero>
    </>
  );
}
