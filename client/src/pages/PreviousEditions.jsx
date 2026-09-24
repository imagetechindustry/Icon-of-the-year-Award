import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPreviousEditions } from "../services/api.js";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";

export default function PreviousEditions() {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchPreviousEditions();
        setEditions(res.data || []);
      } catch (err) {
        console.error("Failed to fetch editions:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>

      <div className="max-w-7xl py-30 mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20  gap-4">
            <div className="w-12 h-12 border-4 border-slate-500/20 border-t-[#D4A96A] rounded-full animate-spin" />
            <p className="text-sm font-bold tracking-widest uppercase animate-pulse text-[#D4A96A]">Synchronizing Archives...</p>
          </div>
        ) : editions.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {editions.map((edition, index) => {
              const formattedTitle = edition.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              return (
                <StaggerItem key={edition._id}>
                  <NeonCard color="slate" className="h-full !p-0">
                    <div
                      onClick={() => navigate(`/${edition.year}/${formattedTitle}`)}
                      className="relative h-full overflow-hidden cursor-pointer"
                    >
                      {/* Image Header */}
                      <div className="h-60 relative overflow-hidden">
                        {edition.images && edition.images.length > 0 ? (
                          <img
                            src={edition.images[0]}
                            alt={edition.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-5xl">🏆</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-90" />

                        <div className="absolute top-6 left-6">
                          <span className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] text-[#020817] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl">
                            {edition.year}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 text-left bg-slate-900/80 backdrop-blur-md h-full border-t border-white/5">
                        <p className="text-[10px] text-[#D4A96A] font-black uppercase tracking-[0.3em] mb-3">
                          {edition.editionLabel || "Previous Edition"}
                        </p>
                        <h3 className="text-2xl font-black text-white leading-tight uppercase mb-4 group-hover:text-[#D4A96A] transition-colors">
                          {edition.title}
                        </h3>

                        <div className="flex items-center gap-2 text-white/40 mb-8">
                          <span className="text-sm">📍</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            {Array.isArray(edition.locations) ? edition.locations.join(", ") : edition.locations}
                          </span>
                        </div>

                        {/* Bottom Button */}
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A96A]/60 group-hover:text-[#D4A96A]">View Archive</span>
                          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D4A96A] group-hover:text-[#020817] transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NeonCard>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 font-black uppercase tracking-widest">No editions found in the archive.</p>
          </div>
        )}
      </div>

    </>
  );
}
