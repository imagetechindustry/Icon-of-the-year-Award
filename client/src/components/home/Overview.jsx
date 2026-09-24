import React from 'react';
import { useNavigate } from 'react-router-dom';
import { keyDates } from '../../constants/keyDates.js';

function Overview() {
    const navigate = useNavigate();

    const handleNominateClick = () => {
        navigate("/nominate");
    };

    return (
        <section className={`relative overflow-hidden border-b border-[#4338CA]/20 py-2`}>
          {/* Gradient Glow Background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen animate-blob" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 65%)' }} />
            <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full mix-blend-screen animate-blob animation-delay-2000" style={{ background: 'radial-gradient(circle, rgba(4, 120, 87, 0.15) 0%, transparent 65%)' }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-12">
              {/* ==== LEFT: OVERVIEW ==== */}
              <div className="flex flex-col justify-center h-full lg:pr-6 xl:pr-12 text-left">
                {/* Section Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-indigo-500/10  border border-indigo-500/20 shadow-2xl hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all duration-500 group/badge mb-4 self-start">
                  <div className="relative">
                    <svg className="w-5 h-5 text-indigo-400 group-hover/badge:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                    <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-bold tracking-wider text-indigo-50 uppercase">ABOUT THE AWARDS</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-left">
                  <span className="bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent">
                    Overview of Indian Icon of The Year, 2026
                  </span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#000080] via-[#B8860B] to-[#C41E3A] rounded-full mb-7" />

                <div className="relative group">
                  {/* Intense Outer Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-indigo-400/20 to-indigo-500/30 opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-1000 rounded-[2rem]" />

                  <div className="relative  rounded-[2rem] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 p-8 lg:p-10 group-hover:border-indigo-400/50 group-hover:bg-white/[0.03]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                      boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.37)"
                    }}>
                    {/* Glass Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                    {/* SEO Paragraph - Hidden */}
                    <p className="sr-only text-left">
                      Indian Icon of The Year, 2026 by TIME Cyber Media Pvt Ltd, also known as Indian Icon of The Year
                      Awards, recognize excellence, innovation, leadership, and outstanding achievements
                      across India.
                    </p>
                    {/* Emerald Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-[#D4A96A] to-transparent" />
                    {/* Decorative Orb */}
                    <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-indigo-500/10 to-indigo-400/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                    <div className="relative space-y-6 text-left">
                      {/* Award Name + Icon */}
                      <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-100 opacity-30 blur-lg rounded-xl" />
                          <div className="relative p-3.5 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-100 to-indigo-700 shadow-xl">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                              <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-black text-indigo-50 leading-tight">
                            Indian Icon of The Year, 2026
                          </h3>
                          <p className="text-indigo-400 font-semibold mt-1 text-sm tracking-wide">
                            Achieving Excellence across India
                          </p>
                        </div>
                      </div>
                      <p className="text-indigo-100/60 leading-relaxed text-lg font-medium text-left">
                        The <span className="font-bold text-indigo-400">Indian Icon of The Year, 2026</span> recognize significant contributions across various industries and sectors in India.<br /><br />
                        The Awards showcase the highest standards and outstanding achievements through <span className="font-semibold text-indigo-300">innovation, leadership, dedication,</span> and commitment towards excellence.<br /><br />
                        <span className="font-semibold text-indigo-300">Indian Icon of The Year, 2026</span> will be a converging point of the industry's elite – a celebration and recognition of excellence, reputation, and exemplary service.
                      </p>
                      {/* Feature Pills */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {['Excellence', 'Innovation', 'Leadership'].map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 rounded-xl text-sm font-bold bg-indigo-500/10 text-indigo-50 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                          >{feature}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ==== RIGHT: Key Dates ==== */}
              <aside className="flex flex-col justify-center h-full lg:pl-8 xl:pl-16 space-y-8 text-left" aria-label="Key Dates">
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-left">
                    <span className="bg-gradient-to-r from-[#FFFFFF] via-[#EFC98A] to-[#B8860B] bg-clip-text text-transparent">
                      Key Dates
                    </span>
                  </h2>
                  <div className="w-20 h-1.5 bg-gradient-to-r from-[#EFC98A] to-[#B8860B] rounded-full" />
                </div>
                {/* Timeline Style Cards */}
                <div className="space-y-6">
                  {keyDates.map((event, idx) => {
                    const border = idx % 2 === 0 ? 'from-[#D4A96A] to-[#EFC98A]' : 'from-[#EFC98A] to-[#F7E4BE]';
                    return (
                      <div key={idx} className="relative group"
                        style={{ animation: `fade-up 0.8s ease-out ${(idx + 1) * 120}ms both` }}>
                        <div className={`absolute -inset-1 bg-gradient-to-r ${border} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700 rounded-2xl`} />
                        <div className="relative border border-indigo-500/30 shadow-xl overflow-hidden hover:bg-slate-900/20 hover:border-[#4338CA]/40 hover:shadow-2xl hover:shadow-[#818CF8]/10 transform hover:-translate-x-1 hover:scale-[1.02] transition-all duration-500 rounded-2xl bg-slate-900/40 ">
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${border}`} />
                          <div className="p-6 flex items-center gap-5 text-left">
                            {/* Icon */}
                            <div>
                              <span className={`block w-10 h-10 rounded-xl bg-gradient-to-br ${border} flex items-center justify-center shadow-lg`}>
                                <span className="text-xl">{event.icon}</span>
                              </span>
                            </div>
                            {/* Content */}
                            <div className="flex-1 pt-1 text-left">
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-indigo-50 mb-1 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#c7d2fe] group-hover:to-white group-hover:bg-clip-text transition-all duration-500 text-left">{event.title}</h3>
                              <div className="flex items-center gap-2 text-[#D4A96A] text-sm sm:text-base text-left">
                                <svg className="w-4 h-4 text-[#EFC98A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>
                                <span className="font-bold">{event.date}</span>
                              </div>
                            </div>
                            {/* Checkmark */}
                            <div className="flex-shrink-0">
                              <div className="p-2 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors duration-300">
                                <svg className="w-5 h-5 text-indigo-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 13l2.25 2L15 11" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* CTA Card */}
                <div className="relative group mt-8">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-50 via-[#D4A96A] to-indigo-500 opacity-20 group-hover:opacity-40 blur-xl transition-all duration-700 rounded-2xl" />
                  <div className="relative bg-indigo-950/70  rounded-2xl border border-indigo-500/30 shadow-2xl overflow-hidden hover:bg-indigo-900/40 hover:border-indigo-500/50 transition-all duration-500 p-8 text-left">
                    {/* Emerald Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-100 to-indigo-500" />
                    <div className="flex items-center gap-4 mb-4 text-left">
                      <span className="text-2xl text-indigo-400 animate-pulse">✨</span>
                      <h4 className="text-xl font-black text-white text-left">Don't Miss Out!</h4>
                    </div>
                    <p className="text-indigo-100/70 leading-relaxed mb-6 font-medium text-left">
                      Submit your nomination before the deadline and be recognized for national excellence and leadership.
                    </p>
                    <button onClick={handleNominateClick} className="relative w-full py-4 px-6 cursor-pointer rounded-xl font-black text-white overflow-hidden group/btn transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 bg-gradient-to-r from-[#000080] via-[#B8860B] to-[#C41E3A] shadow hover:shadow-lg ">
                      <span className="relative z-10 text-lg tracking-wide">Nominate Now</span>
                      <svg className="w-5 h-5 relative z-10 group-hover/btn:rotate-12 transition-transform duration-500 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                    </button>
                  </div>
                </div>
              </aside>
            </div>

            {/* Bottom Decorative */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-2 text-[#c7d2fe]/70 text-sm">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#D4A96A]/50" />
                <svg className="w-4 h-4 animate-pulse text-[#D4A96A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                <span className="font-medium">Celebrating Excellence and Leadership in India</span>
                <svg className="w-4 h-4 animate-pulse animation-delay-1000 text-[#D4A96A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#D4A96A]/50" />
              </div>
            </div>
          </div>
        </section>
    );
}

export default Overview;
