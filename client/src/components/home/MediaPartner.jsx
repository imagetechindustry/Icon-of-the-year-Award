import React from "react";
import { FadeUp } from "../Motion.jsx";
import { mediaPartners } from "../../constants/mediaPartners.js";


function MediaPartner() {
    return (
        <section className="relative overflow-hidden py-2 ">
            {/* Decorative mesh gradients */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <FadeUp className="text-center mb-5 sm:mb-7">
                    <h2 className="text-3xl pb-1 xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
                        Our Media Partners/Coverage
                    </h2>
                    <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
                    <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        A strong network of national and international media partners has helped amplify our vision across the country.
                    </p>
                </FadeUp>

                {/* Automatic Infinite Slider */}
                <div className="overflow-hidden py-10 w-full relative pb-20">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--base-bg)] to-transparent z-10" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--base-bg)] to-transparent z-10" />

                    <div className="animate-marquee flex gap-12 items-center">
                        {[...mediaPartners, ...mediaPartners].map((partner, idx) => (
                            <div key={idx} className="flex-shrink-0 group">
                                <div className="
                          relative h-32 w-32 sm:h-40 sm:w-40 rounded-[2rem]
                          bg-slate-900/40 
                          border border-indigo-500/20 hover:border-indigo-400/60
                          transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)]
                          flex items-center justify-center p-6
                        ">
                                    {partner.logo ? (
                                        <img src={partner.logo} alt={partner.name || "Media Partner"} className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                                    ) : (
                                        <span className="text-indigo-400 text-4xl font-black">{partner.name?.[0]}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MediaPartner;