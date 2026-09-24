import React from 'react';
import { FadeUp, StaggerContainer, StaggerItem, NeonCard } from '../Motion.jsx';

function ResearchMethodology() {
    const items = [
        {
          title: "Data Collection & Screening",
          desc: "All nominations are collected through a structured submission process. Each entry undergoes an initial screening to ensure eligibility, completeness, and alignment with the award category.",
          number: "01",
        },
        {
          title: "Qualitative & Quantitative Analysis",
          desc: "Submissions are evaluated using a balanced research framework combining qualitative insights and quantitative metrics to assess performance, innovation, and impact.",
          number: "02",
        },
        {
          title: "Expert Jury Evaluation",
          desc: "An independent panel of industry experts, academicians, and subject-matter specialists reviews shortlisted entries to ensure unbiased and credible assessment.",
          number: "03",
        },
        {
          title: "Benchmarking & Industry Standards",
          desc: "Each nomination is benchmarked against industry best practices, regulatory standards, and emerging international trends to measure relevance and excellence.",
          number: "04",
        },
        {
          title: "Score Normalisation & Validation",
          desc: "Scores from multiple evaluators are normalised to eliminate bias and ensure consistency, fairness, and transparency across all categories.",
          number: "05",
        },
        {
          title: "Final Review & Approval",
          desc: "The final results undergo an internal audit and validation process before approval, ensuring accuracy, integrity, and credibility of the award outcomes.",
          number: "06",
        },
    ];

    return (
        <section className={`relative overflow-hidden py-5`}>
          {/* Glow Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-1/3 right-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#4338CA]/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 left-0 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-[#4338CA]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <FadeUp className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
                Research Methodology
              </h2>
              <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
              <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                Our evaluation framework combines qualitative insights and quantitative metrics to ensure a transparent, unbiased, and credible assessment.
              </p>
            </FadeUp>

            <StaggerContainer className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
              {items.map((item, index) => (
                <StaggerItem key={index}>
                  <NeonCard color="indigo" className="h-full">
                    <div className="p-10 flex flex-col h-full min-h-[320px] text-left">
                      {/* Step Number Badge */}
                      <div className="absolute top-6 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#000080] via-[#B8860B] to-[#C41E3A] flex items-center justify-center text-white font-black text-xl shadow-xl border border-white/20 group-hover:scale-110 transition-transform duration-500 z-20">
                        {item.number}
                      </div>

                      <div className="space-y-6 pt-10">
                        <h3 className="text-2xl font-black bg-gradient-to-r from-white via-[#F7E4BE] to-[#D4A96A] bg-clip-text text-transparent leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-indigo-100/60 text-base leading-relaxed font-medium group-hover:text-indigo-100 transition-colors duration-300">
                          {item.desc}
                        </p>
                      </div>

                      <div className="mt-auto pt-10">
                        <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full group-hover:w-full transition-all duration-700" />
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

export default ResearchMethodology;
