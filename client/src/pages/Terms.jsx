import { PageHero, FadeUp, StaggerContainer, StaggerItem } from "../components/Motion.jsx";
import { motion } from "framer-motion";
const terms = [
  {
    num: "01",
    title: "Eligibility & Nomination",
    color: "from-indigo-400 to-indigo-400",
    accent: "border-indigo-400/30",
    items: [
      "Nominations must be submitted through the official nomination platform only.",
      "The nominee must fall under the relevant award category.",
      "Incomplete, incorrect, or misleading information may lead to immediate disqualification.",
      "Submission of a nomination does not guarantee selection or shortlisting.",
    ],
  },
  {
    num: "02",
    title: "Information Accuracy",
    color: "from-blue-400 to-indigo-400",
    accent: "border-blue-400/30",
    items: [
      "All information, data, documents, and claims must be true, accurate, and verifiable.",
      "The Awards Committee reserves the right to verify, validate, or seek clarification.",
      "Any false or misleading representation may result in cancellation of nomination at any stage.",
    ],
  },
  {
    num: "03",
    title: "Research & Evaluation Process",
    color: "from-indigo-400 to-orange-400",
    accent: "border-indigo-400/30",
    items: [
      "Each valid nomination will undergo a multi-stage evaluation process.",
      "Stages include: initial screening, research & data validation, independent jury assessment, and scoring.",
      "Evaluation will be based on pre-defined criteria, industry benchmarks, and jury discretion.",
    ],
  },
  {
    num: "04",
    title: "Jury Decision",
    color: "from-purple-400 to-violet-400",
    accent: "border-purple-400/30",
    items: [
      "All nominations are evaluated by an independent and impartial jury panel.",
      "The decision of the jury is final and binding.",
      "No correspondence, feedback, or appeal regarding jury decisions shall be entertained.",
    ],
  },
  {
    num: "05",
    title: "Confidentiality",
    color: "from-rose-400 to-pink-400",
    accent: "border-rose-400/30",
    items: [
      "All nomination details, documents, and evaluation records will be treated as strictly confidential.",
      "Information will be used only for research, evaluation, and award-related communication.",
      "No confidential data will be shared with third parties, except where required for evaluation.",
    ],
  },
  {
    num: "06",
    title: "Disqualification Rights",
    color: "from-red-400 to-rose-500",
    accent: "border-red-400/30",
    items: [
      "The Organising Committee reserves the right to reject or disqualify any nomination.",
      "Grounds include: unmet eligibility, false/incomplete information, ethical misconduct.",
      "Nominations violating the spirit or integrity of the awards will be disqualified.",
    ],
  },
  {
    num: "07",
    title: "Award Announcement & Participation",
    color: "from-indigo-400 to-cyan-400",
    accent: "border-indigo-400/30",
    items: [
      "Award winners will be officially informed via email or official communication.",
      "Participation in the award ceremony is subject to event terms, travel, and logistics arrangements.",
      "The Awards Committee reserves the right to change event dates, venue, or format if required.",
    ],
  },
  {
    num: "08",
    title: "Use of Name, Logo & Content",
    color: "from-yellow-400 to-indigo-500",
    accent: "border-yellow-400/30",
    items: [
      "By submitting a nomination, the nominee grants permission to use their name, logo, and photographs.",
      "Content may be used for promotional, marketing, press releases, and digital platforms related to the awards.",
      "No monetary compensation shall be claimed for such usage.",
    ],
  },
  {
    num: "09",
    title: "Limitation of Liability",
    color: "from-slate-400 to-gray-400",
    accent: "border-slate-400/30",
    items: [
      "The Organisers shall not be responsible for technical errors during submission.",
      "Loss of data due to system issues is not the responsibility of the Organisers.",
      "Participation is entirely at the nominee's own discretion and responsibility.",
    ],
  },
  {
    num: "10",
    title: "Amendments & Governing Rights",
    color: "from-indigo-400 to-indigo-400",
    accent: "border-indigo-400/30",
    items: [
      "The Organising Committee reserves the right to modify these Terms & Conditions at any time without prior notice.",
      "All matters shall be governed by applicable laws, and jurisdiction shall lie with the organiser's registered office location.",
    ],
  },
];

export default function Terms() {
  return (
    <>
      {/* Hero */}
      <PageHero
        badge="Legal"
        icon="📜"
        title="Terms & Conditions"
        subtitle="By submitting a nomination for the Indian Icon of The Year, 2026, the nominee and/or nominator agrees to the following terms and conditions."
      >
        {/* Terms Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7" staggerDelay={0.07}>
            {terms.map((term, i) => (
              <StaggerItem key={i}>
                <motion.div
                  className={`glass-card border ${term.accent} p-6 h-full flex flex-col group card-lift`}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {/* Number + title */}
                  <div className="flex items-start gap-4 mb-4">
                    <span className={`flex-shrink-0 text-2xl font-black bg-gradient-to-br ${term.color} bg-clip-text text-transparent font-serif`}>
                      {term.num}
                    </span>
                    <div>
                      <h2 className="text-base font-black text-white leading-snug group-hover:text-indigo-100 transition-colors">
                        {term.title}
                      </h2>
                      <div className={`h-[2px] w-12 rounded-full bg-gradient-to-r ${term.color} mt-2 opacity-70`} />
                    </div>
                  </div>

                  {/* Items */}
                  <ul className="space-y-2 flex-1">
                    {term.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="text-indigo-400 mt-1 flex-shrink-0 text-xs">▸</span>
                        <span className="text-indigo-100/70 text-sm text-left leading-relaxed group-hover:text-indigo-100/85 transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Acceptance note */}
          <FadeUp delay={0.4} className="mt-12 glass-card border border-indigo-400/20 p-6 md:p-8 text-center animate-border-glow">
            <span className="text-2xl block mb-3">⚖️</span>
            <p className="text-indigo-100/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto italic">
              By participating in the Indian Icon of The Year, 2026, you acknowledge that you have read, understood, and agree to all the above Terms & Conditions.
            </p>
          </FadeUp>
        </div>
      </PageHero>
    </>
  );
}
