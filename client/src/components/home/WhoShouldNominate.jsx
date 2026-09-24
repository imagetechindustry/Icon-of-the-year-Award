import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem, NeonCard } from '../Motion.jsx';
import { nomineeCategories } from '../../constants/nomineeCategories.js';

function WhoShouldNominate() {
    return (
        <section className="relative overflow-hidden py-8">
          {/* Animated Gradient Glows */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 60%)' }} />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
            <FadeUp className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
                Who Should Nominate?
              </h2>
              <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
              <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                We invite visionaries, innovators, and leading organisations to join our elite circle of pioneers.
              </p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {nomineeCategories.map((item, index) => (
                <StaggerItem key={index} className="h-full">
                  <NeonCard color="indigo" className="h-full">
                    <div className="relative flex flex-col items-start h-full p-8 text-left">
                      {/* Icon with Glowing Ring */}
                      <div className="relative mb-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full group-hover:bg-indigo-500/40 transition-colors duration-500" />
                        <span className="relative text-5xl drop-shadow-2xl filter brightness-110">
                          {item.icon}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-black bg-gradient-to-r from-white to-[#EFC98A] bg-clip-text text-transparent group-hover:text-[#D4A96A] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-indigo-100/60 text-sm sm:text-base leading-relaxed font-medium group-hover:text-indigo-100 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-auto pt-8 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <div className="h-px w-8 bg-gradient-to-r from-indigo-500/50 to-transparent" />
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

export default WhoShouldNominate;
