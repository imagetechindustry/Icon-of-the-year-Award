import { Fragment } from "react";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";

const faqs = [
  {
    q: "What is Indian Icon of The Year Awards 2026?",
    a: "Indian Icon of The Year Awards 2026 is a prestigious recognition platform that honours outstanding individuals, entrepreneurs, professionals, innovators, organisations, and changemakers who have demonstrated excellence, leadership, innovation, and impactful contributions to society and their respective industries.",
  },
  {
    q: "Who can apply for nomination?",
    a: "Entrepreneurs, business leaders, professionals, startups, corporates, social impact organisations, educators, healthcare professionals, artists, sportspersons, and individuals from various sectors can apply for nomination.",
  },
  {
    q: "What is the nomination process and deadline?",
    a: "The nomination process is completely online. Applicants need to fill out the nomination form and submit the required details and supporting documents. Important dates and deadlines are regularly updated on the official website.",
  },
  {
    q: "How are the winners selected?",
    a: "Winners are selected through a comprehensive evaluation process that considers achievements, leadership, innovation, industry impact, social contribution, professional excellence, credibility, and overall influence within their field.",
  },
  {
    q: "Who are the judges? Is the evaluation fair?",
    a: "The judging panel consists of respected industry experts, business leaders, professionals, and independent evaluators. The selection process is designed to be transparent, impartial, and merit-based.",
  },
  {
    q: "Where and when will the awards be held?",
    a: "Indian Icon of The Year Awards 2026 will be held at a prestigious venue. Event details, venue information, and schedules are communicated through official channels and published on the website.",
  },
  {
    q: "What are the benefits of participating?",
    a: "Participants receive national recognition, enhanced credibility, media exposure, networking opportunities with industry leaders, brand visibility, and access to exclusive promotional benefits and recognition assets.",
  },
  {
    q: "What documents are required for nomination?",
    a: "Applicants may be required to submit professional profiles, company details, achievement records, certifications, awards, testimonials, or other supporting documents relevant to their nominated category.",
  },
  {
    q: "Is self-nomination allowed?",
    a: "Yes, self-nomination is permitted. Eligible individuals and organisations can nominate themselves directly through the official nomination process.",
  },
  {
    q: "Can international applicants apply?",
    a: "Yes, individuals and organisations from around the world with notable contributions and achievements may apply, subject to category-specific eligibility requirements.",
  },
  {
    q: "Can I apply for more than one category?",
    a: "Yes, applicants may submit nominations for multiple categories provided they meet the eligibility criteria and requirements for each category.",
  },
  {
    q: "Is there any nomination fee?",
    a: "Nomination fee policies may vary depending on the category and event guidelines. Complete details regarding fees, if applicable, are provided during the nomination process.",
  },
  {
    q: "Is attending the award ceremony mandatory?",
    a: "Attendance is highly encouraged to maximize networking and recognition opportunities. However, alternative arrangements may be considered in special circumstances.",
  },
  {
    q: "Is the submitted information confidential?",
    a: "Yes, all nomination details and supporting documents are treated with strict confidentiality and are used solely for evaluation, verification, and award administration purposes.",
  },
  {
    q: "Can winners use the award logo and title?",
    a: "Yes, award recipients are authorised to use the official award title, logo, certificate, and winner credentials for branding, marketing, public relations, and promotional activities in accordance with the event guidelines.",
  },
  {
    q: "Will winners receive media coverage?",
    a: "Yes, winners may receive media exposure through official press releases, digital publications, social media promotions, partner networks, and event-related marketing campaigns.",
  },
  {
    q: "How will applicants be informed about the results?",
    a: "Shortlisted nominees and winners are notified through their registered email addresses and contact details. Official announcements are also made through designated communication channels.",
  },
  {
    q: "How can we apply for sponsorship or partnership?",
    a: "Organizations interested in sponsorship, partnership, or media collaborations can contact the organizing team through the official Contact Us page or the provided business contact information.",
  },
  {
    q: "Are Indian Icon of The Year Awards 2026 government-affiliated?",
    a: "No, the awards are an independent recognition initiative and are not directly affiliated with any government authority unless explicitly stated by the organizers.",
  },
  {
    q: "Where can we see previous editions or media coverage?",
    a: "Information regarding previous award editions, winner highlights, event galleries, media coverage, and official announcements can be accessed through the website and official social media platforms.",
  },
];

export default function FAQ() {
  return (
    <PageHero
      badge="Frequently Asked Questions"
      icon="✨"
      title="Indian Icon of The Year, 2026"
      subtitle={<><span className="font-bold text-white">Everything you need to know about nominations, eligibility, the process and the celebration—</span> all in one place.</>}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-4">

        {/* FAQ Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 md:gap-8" staggerDelay={0.05}>
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <NeonCard color="indigo" className="h-full !p-0">
                <div className="p-6 sm:p-8 flex flex-col h-full min-h-[220px] text-left">
                  {/* Q Number Circle & Icon */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-50 via-indigo-200 to-cyan-400 rounded-full shadow-lg w-9 h-9 text-lg font-bold text-white border-2 border-indigo-300/70 group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                      Q{index + 1}
                    </span>
                    <svg className="w-5 h-5 text-indigo-400 opacity-70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" />
                    </svg>
                  </div>

                  {/* Question */}
                  <h3 className="mb-3 text-lg sm:text-xl md:text-2xl font-extrabold bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent drop-shadow transition-all duration-300">
                    {faq.q}
                  </h3>

                  {/* Answer */}
                  <p className="text-sm sm:text-base md:text-lg text-indigo-100/70 leading-relaxed font-medium drop-shadow-sm mt-auto transition-all duration-300">
                    {faq.a}
                  </p>

                  {/* Bottom Accent */}
                  <div className="mt-5 sm:mt-7 h-1 w-12 sm:w-16 mx-auto bg-gradient-to-r from-indigo-500 to-transparent opacity-50 rounded-full group-hover:opacity-95 transition-all duration-400"></div>
                </div>
              </NeonCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer Quote */}
        <FadeUp className="mt-14 mb-2 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 text-indigo-200 text-base sm:text-lg font-medium">
            <svg className="w-5 h-5 animate-pulse text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
            <span>Celebrating Excellence, Innovation, and Leadership - Indian Icon of The Year</span>
            <svg className="w-5 h-5 animate-pulse animation-delay-1000 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 2l2.39 7.24h7.61l-6.19 4.5L16.92 22 12 17.27 7.08 22l1.11-8.26-6.19-4.5h7.61L12 2z" /></svg>
          </span>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent mt-3" />
        </FadeUp>
      </div>
    </PageHero>
  );
}
