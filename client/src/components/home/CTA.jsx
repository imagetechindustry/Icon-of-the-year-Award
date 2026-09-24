import React from 'react'
import { FadeUp } from '../Motion';
function CTA() {

    const handleNominateClick = () => {
        navigate("/nominate");
    };
    return (
        < section className="relative overflow-hidden py-5" >
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-indigo-500/10 rounded-full blur-[160px] animate-pulse" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <FadeUp>
                    <h2 className="text-4xl xs:text-5xl md:text-6xl font-heading font-black mb-8 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent leading-tight">
                        Get the recognition for you and your team
                    </h2>
                    <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full mb-10" />
                    <p className="text-indigo-100/70 text-xl md:text-2xl mb-12 font-medium leading-relaxed">
                        Nomination Extended Deadline – <span className="text-indigo-400 font-black">closing soon</span>
                    </p>
                    <button
                        type="button"
                        onClick={handleNominateClick}
                        className="relative overflow-hidden cursor-pointer group/btn rounded-full bg-gradient-to-r from-[#000080] via-[#B8860B] to-[#C41E3A] text-white font-black px-12 py-6 text-xl transition-all duration-500 hover:scale-110 hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] focus:outline-none tracking-[0.1em] uppercase"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                            Nominate Now
                            <svg className="w-7 h-7 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-1000" />
                    </button>
                </FadeUp>
            </div>
        </section >
    )
}

export default CTA