import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem, NeonCard } from '../Motion.jsx';

function SelectionProcess() {
    return (
        <section className="relative overflow-hidden py-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <FadeUp className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
                Selection Process
              </h2>
              <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
              <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                A structured and transparent evaluation framework that maintains complete impartiality and ethical standards throughout.
              </p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { title: "Judging Criteria", desc: "A structured evaluation framework ensures credibility, consistency, and fairness across all nominations.", icon: "📋" },
                { title: "Persistent Fairness", desc: "Each entry is reviewed independently by an eminent jury panel, maintaining complete impartiality.", icon: "⚖️" },
                { title: "Confidentiality", desc: "All nomination data and outcomes are treated with the highest level of security and confidentiality.", icon: "🔒" },
              ].map((item, index) => (
                <StaggerItem key={index} className="h-full">
                  <NeonCard color="indigo" className="h-full">
                    <div className="relative flex flex-col items-start text-left h-full p-10">
                      <div className="text-5xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-black bg-gradient-to-r from-white to-[#EFC98A] bg-clip-text text-transparent group-hover:text-[#D4A96A] transition-colors duration-300 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-indigo-100/60 text-base leading-relaxed font-medium group-hover:text-indigo-100 transition-colors duration-300">
                        {item.desc}
                      </p>
                      <div className="mt-auto pt-8">
                        <div className="h-1.5 w-12 bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full group-hover:w-20 transition-all duration-500" />
                      </div>
                    </div>
                  </NeonCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
    );
}

export default SelectionProcess;
