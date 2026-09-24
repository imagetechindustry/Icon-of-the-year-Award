import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";
import { motion } from "framer-motion";

const steps = [
  {
    icon: "📥",
    title: "Nomination Submission & Eligibility Check",
    color: "from-indigo-400 to-indigo-400",
    accent: "border-indigo-400/40",
    points: [
      "Submitted through the official online portal",
      "Screened for eligibility criteria and category relevance",
      "Completeness of information verified",
      "Supporting documents and evidence reviewed",
      "Incomplete or ineligible nominations are not carried forward",
    ],
  },
  {
    icon: "🔍",
    title: "Research & Data Validation",
    color: "from-blue-400 to-indigo-400",
    accent: "border-blue-400/40",
    points: [
      "In-house research team performs qualitative & quantitative analysis",
      "Background research and performance indicators assessed",
      "Innovation impact and market relevance evaluated",
      "Industry standards compliance verified",
      "Ensures factual accuracy and consistency across all entries",
    ],
  },
  {
    icon: "👨‍⚖️",
    title: "Independent Jury Evaluation",
    color: "from-indigo-400 to-orange-400",
    accent: "border-indigo-400/40",
    points: [
      "Shortlisted nominations evaluated by eminent jury",
      "Panel comprises industry experts and international education professionals",
      "Senior academicians and policy specialists included",
      "Each jury member evaluates independently",
      "Zero bias, full transparency, ethical practices guaranteed",
    ],
  },
  {
    icon: "📊",
    title: "Scoring & Benchmarking",
    color: "from-purple-400 to-violet-400",
    accent: "border-purple-400/40",
    points: [
      "Standardized scoring framework applied",
      "Excellence & leadership assessed",
      "Innovation & impact evaluated",
      "Sustainability & scalability measured",
      "Benchmarked against international best practices",
    ],
  },
  {
    icon: "⚖️",
    title: "Score Normalisation & Final Validation",
    color: "from-rose-400 to-pink-400",
    accent: "border-rose-400/40",
    points: [
      "Scores from multiple evaluators are normalised",
      "Cross-checks performed for consistency",
      "Internal validation ensures fairness and balance",
      "Equal opportunity for all nominees guaranteed",
    ],
  },
  {
    icon: "🏅",
    title: "Final Review & Approval",
    color: "from-yellow-400 to-indigo-500",
    accent: "border-yellow-400/40",
    points: [
      "Comprehensive internal audit conducted",
      "Final approval by the awards committee",
      "Confidential verification process completed",
      "Winners officially announced and invited",
    ],
  },
];

const principles = [
  { icon: "🔎", title: "Transparency", desc: "Clear and documented evaluation criteria" },
  { icon: "🕊️", title: "Independence", desc: "Jury decisions are unbiased and confidential" },
  { icon: "🛡️", title: "Integrity", desc: "Ethical and professional standards at every stage" },
  { icon: "🔒", title: "Confidentiality", desc: "All nomination data is securely protected" },
];

export default function Judging() {
  return (
    <>
      <PageHero
        badge="Evaluation Framework"
        icon="⚖️"
        title="Judging Process"
        subtitle="A multi-stage, transparent, and fair evaluation framework — recognising only the most deserving organisations and individuals."
      >
        {/* Timeline Steps */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.1}>
            {steps.map((step, i) => (
              <StaggerItem key={i}>
                <NeonCard color="indigo" className="h-full !p-0">
                  <div className="p-6 h-full flex flex-col text-left">
                    {/* Step number */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xs font-black text-white shadow-md`}>
                        {i + 1}
                      </span>
                      <span className="text-xl">{step.icon}</span>
                    </div>

                    {/* Accent bar */}
                    <div className={`h-[2px] w-full rounded-full bg-gradient-to-r ${step.color} mb-4 opacity-70`} />

                    <h3 className={`text-base font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-4 leading-snug`}>
                      Step {i + 1}: {step.title}
                    </h3>

                    <ul className="space-y-2 flex-1">
                      {step.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-indigo-400 mt-0.5 flex-shrink-0 text-xs">▸</span>
                          <span className="text-indigo-100/70 text-sm leading-relaxed group-hover:text-indigo-100/90 transition-colors">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NeonCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Core Principles */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
          <FadeUp className="text-center mb-10">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mx-auto mb-6" />
            <h2 className="text-headline text-gradient-prestige mb-2">Our Core Principles</h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
            {principles.map((p, i) => (
              <StaggerItem key={i}>
                <NeonCard color="indigo" className="!p-0">
                  <div className="p-5 text-center group h-full flex flex-col items-center">
                    <span className="text-2xl mb-3 block group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
                    <h3 className="font-black text-white text-sm mb-1">{p.title}</h3>
                    <p className="text-indigo-200/60 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </NeonCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeUp delay={0.3} className="mt-10 glass-card border border-indigo-500/15 p-6 md:p-8 text-center">
          <h3 className="text-xl font-black text-gradient-prestige font-serif mb-3">Why This Process Matters</h3>
          <p className="text-indigo-100/70 leading-relaxed max-w-2xl mx-auto">
            Our rigorous and transparent selection process ensures awards are merit-based, truly credible, and that every winner enjoys trust and respect across the industry.
          </p>
        </FadeUp>
      </PageHero>
    </>
  );
}
