import { PageHero, FadeUp, StaggerContainer, StaggerItem, SlideIn, NeonCard } from "../components/Motion.jsx";
import { motion } from "framer-motion";

const GUIDELINES = [
  {
    icon: "📝",
    title: "General Submission",
    color: "from-indigo-400 to-indigo-400",
    accentColor: "border-indigo-400/40",
    items: [
      "All nominations must be submitted before the official deadline.",
      "Form must be filled completely with accurate and verifiable information.",
      "Each entry should demonstrate excellence, innovation, and impact.",
      "Incomplete, misleading, or false information may result in disqualification.",
      "Once submitted, entries cannot be edited or withdrawn.",
    ],
  },
  {
    icon: "👨‍⚖️",
    title: "Evaluation & Judging",
    color: "from-indigo-400 to-yellow-400",
    accentColor: "border-indigo-400/40",
    items: [
      "All nominations reviewed by an independent jury panel.",
      "Evaluation based on quality, innovation, and impact.",
      "Jury may request supporting documentation if needed.",
      "Jury's decision is final and binding.",
    ],
  },
  {
    icon: "📑",
    title: "Documentation & Verification",
    color: "from-blue-400 to-indigo-400",
    accentColor: "border-blue-400/40",
    items: [
      "Requested supporting documents must be valid and authentic.",
      "Information may be independently verified.",
      "Entries failing verification may be rejected.",
    ],
  },
  {
    icon: "⚠️",
    title: "Important Notes",
    color: "from-rose-400 to-pink-400",
    accentColor: "border-rose-400/40",
    items: [
      "Award management reserves the right to amend guidelines or categories.",
      "Attempting to influence jury will result in disqualification.",
      "Participation implies acceptance of all rules.",
    ],
  },
];

export default function Guidelines() {
  return (
    <PageHero
      badge="Nomination Rules"
      icon="📋"
      title="Entry Guidelines"
      subtitle="Please read carefully before submitting your nomination. Adherence to these guidelines is mandatory for successful evaluation."
    >
      {/* Guidelines Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8" staggerDelay={0.12}>
          {GUIDELINES.map((g, i) => (
            <StaggerItem key={i}>
              <NeonCard color="indigo" className="h-full !p-0">
                <div className="p-6 md:p-7 h-full flex flex-col text-left">
                  {/* Top accent bar */}
                  <div className={`h-[3px] w-full rounded-full bg-gradient-to-r ${g.color} mb-5 opacity-80`} />

                  {/* Title */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{g.icon}</span>
                    <h2 className={`text-lg font-black bg-gradient-to-r ${g.color} bg-clip-text text-transparent`}>
                      {g.title}
                    </h2>
                  </div>

                  {/* Items */}
                  <ul className="space-y-3 flex-1">
                    {g.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${g.color} flex items-center justify-center text-[10px] text-white font-black`}>
                          ✓
                        </span>
                        <span className="text-indigo-100/75 text-sm leading-relaxed group-hover:text-indigo-100/90 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </NeonCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Declaration */}
        <FadeUp delay={0.4} className="mt-12">
          <div className="glass-card border border-indigo-400/20 p-6 md:p-8 text-center animate-border-glow">
            <span className="text-2xl mb-3 block">⚖️</span>
            <p className="text-indigo-100/75 text-sm md:text-base leading-relaxed italic max-w-2xl mx-auto">
              By submitting a nomination, you confirm that all information is accurate to the best of your knowledge and you agree to accept the final decision of the jury.
            </p>
          </div>
        </FadeUp>
      </div>
    </PageHero>
  );
}
