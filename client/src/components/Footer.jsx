import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuroraBackground, PageHero } from "./Motion";

const blueGrad = `linear-gradient(90deg, #60A5FA 0%, #818CF8 40%, #FB7185 70%, #818CF8 100%)`;
const bgGrad = "linear-gradient(120deg, #020617 0%, #1e1b4b 63%, #0f172a 100%)";

export default function Footer() {
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    // Record visit and get updated count
    // Adjust URL dynamically if needed, usually relative to backend
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/visits/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setVisitCount(data.count);
        }
      })
      .catch(err => console.error("Error recording visit:", err));
  }, []);

  return (
    <footer
      className="mt-0"
      style={{
        background: bgGrad,
        color: "#e2e8f0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AuroraBackground>
        <PageHero compact={true}>
          {/* Decorative Glow/Blurred Gradient Shape */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 blur-[80px] opacity-40 hidden lg:block"
            style={{
              width: 600,
              height: 180,
              background: "radial-gradient(circle at 50% 10%, rgba(67, 56, 202, 0.4) 0%, transparent 90%)"
            }}
          ></div>

          {/* Main Footer Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-16 md:py-20">
            <div className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-4 
              lg:grid-cols-5
              gap-y-10 gap-x-8
            ">

              {/* ==== ABOUT/BRAND ==== */}
              <section className="flex flex-col h-full items-start gap-x-4" aria-label="About Us">
                <div className="flex items-center space-x-0.5 mb-3">
                  <img
                    src="/images/logo_full.png"
                    alt="Indian Icon of The Year Logo"
                    className="w-20 h-20 rounded-full shadow-md ring-2 ring-indigo-500/50 bg-white object-contain p-1"
                    loading="lazy"
                  />
                  <span
                    className="font-heading text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent">
                    Indian Icon of The Year, 2026
                  </span>
                </div>
                <div
                  className="mt-3 rounded-full h-1 w-24 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mb-4"
                />
                <p className="text-sm lg:text-base font-medium leading-relaxed opacity-80 text-left">
                  Recognising outstanding leadership, innovation & excellence – celebrating visionary business leaders, entrepreneurs, professionals, and changemakers shaping tomorrow.
                </p>
              </section>

              {/* ==== QUICK LINKS ==== */}
              <nav className="text-left" aria-label="Quick Links">
                <h3
                  className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide 
                    border-l-4 pl-3 border-indigo-500/40"
                >
                  Quick Links
                </h3>
                <ul className="space-y-3 text-base">
                  <li>
                    <Link to="/" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/categories" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Award Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/jury" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Guest
                    </Link>
                  </li>
                  <li>
                    <Link to="/media" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Media
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/previous-editions"
                      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Previous Editions
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* ==== INFORMATION ==== */}
              <nav className="text-left" aria-label="Information">
                <h3
                  className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide
                    border-l-4 pl-3 border-indigo-500/40"
                >
                  Information
                </h3>
                <ul className="space-y-3 text-base">
                  <li>
                    <Link to="/guidelines" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Entry Guidelines
                    </Link>
                  </li>
                  <li>
                    <Link to="/judging" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Selection Process
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      T&C
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-indigo-400 hover:pl-2 transition-all duration-200">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* ==== OTHER SERVICES ==== */}
              <nav className="text-left" aria-label="Other Services">
                <h3
                  className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide
                    border-l-4 pl-3 border-indigo-500/40"
                >
                  Other Services
                </h3>
                <ul className="space-y-3 text-base">
                  <li>
                    <a
                      href="https://timecybermedia.com/market-research/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Market Research
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://timecybermedia.com/digital-marketing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Digital Marketing
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://timecybermedia.com/brand-reputation-management/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Brand Reputation Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://timecybermedia.com/business-consultancy-services/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Business Consultancy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://timecybermedia.com/public-relation-management/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Public Relation Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://timecybermedia.com/social-media-management/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Social Media Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://primeimpact.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-400 hover:pl-2 transition-all duration-200"
                    >
                      Web Development
                    </a>
                  </li>
                </ul>
              </nav>

              {/* ==== REACH US ==== */}
              <address className="text-left not-italic">
                <h3
                  className="font-semibold mb-5 text-lg text-[#f8fafc] tracking-wide
                    border-l-4 pl-3 border-indigo-500/40"
                >
                  Reach Us
                </h3>
                <div className="space-y-3 text-base">
                  <div className="flex items-start gap-2">
                    <span className="inline-block w-5 mt-0.5 text-indigo-500">🏢</span>
                    <a
                      href="https://www.google.com/maps/place/TIME+Cyber+Media+Pvt+Ltd/@28.6193327,77.0268018,17z/data=!4m14!1m7!3m6!1s0x390ce3de9c8c4cb1:0x3e1d9a9d183cf7a4!2sTIME+Cyber+Media+Pvt+Ltd!8m2!3d28.6193327!4d77.0293767!16s%2Fg%2F11bz014xp_!3m5!1s0x390ce3de9c8c4cb1:0x3e1d9a9d183cf7a4!8m2!3d28.6193327!4d77.0293767!16s%2Fg%2F11bz014xp_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-snug hover:text-indigo-400 transition-all duration-200"
                    >
                      <strong>Delhi Office:</strong> C-31, Nawada Housing Complex, Shivaji Marg, New Delhi-59
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="inline-block w-5 mt-0.5 text-indigo-500">🏢</span>
                    <a
                      href="https://www.google.com/maps/place/Vfx+Multimedia+School+Graphic+Design-Video+Editing+Institute+Animation+Institute+In+Vasai-Vfx+Course+In+Vasai+Vfx+Institute/@19.3485819,72.7433027,13.01z/data=!4m22!1m15!4m14!1m6!1m2!1s0x390d05a3b320d5f3:0x9b40cb0d00276119!2sP+Square+Salon+Unisex+salon,+Red+Light+%F0%9F%9A%A6,+P+Square+Salon+1st+Floor+Plot+no+63,+Mohit+Nagar+Dwarka,+opposite+NSUT,+near+Nexa+Showroom,+Kakrola,+Delhi,+110078!2m2!1d77.0352846!2d28.6064227!1m6!1m2!1s0x3be7ae64ffffffff:0x352cd000cf148a0a!2sVfx+Multimedia+School+Graphic+Design-Video+Editing+Institute+Animation+Institute+In+Vasai-Vfx+Course+In+Vasai+Vfx+Institute,+Vinayak+shopping+centre,+A+%2F201+202,+Vasai+Station+Rd,+opp.+Union+bank,+Navghar+Manikpur,+Dindayal+Nagar,+Vasai+West,+Mumbai,+Vasai-Virar,+Maharashtra+401202!2m2!1d72.8274074!2d19.3784544!3m5!1s0x3be7ae64ffffffff:0x352cd000cf148a0a!8m2!3d19.3784544!4d72.8274074!16s%2Fg%2F11b90fq89w?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm leading-snug hover:text-indigo-400 transition-all duration-200"
                    >
                      <strong>Mumbai Office:</strong> A/201-202, Vinayak Shopping Centre, Vasai Station Rd, Vasai West, Mumbai-401202
                    </a>
                  </div>
                  <div className="grid grid-cols-1 gap-y-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 text-indigo-500">📞</span>
                      <a href="tel:+919821020995" className="hover:text-indigo-400 transition-all text-sm font-semibold">
                        +91 98210 20995 <span className="text-[10px] opacity-60 font-normal uppercase ml-1"></span>
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-5 text-indigo-500">📞</span>
                      <a href="tel:+919873004416" className="hover:text-indigo-400 transition-all text-sm font-semibold">
                        +91 98730 04416 <span className="text-[10px] opacity-60 font-normal uppercase ml-1"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </address>
            </div>
          </div>

          {/* Golden gradient border line */}
          <div
            className="w-full h-1 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] opacity-40"
          />

          {/* BOTTOM BAR */}
          <div
            className="text-left sm:text-center text-xs md:text-sm py-5 px-5 border-t border-white/5"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <span
              className="font-semibold text-base sm:text-lg block sm:inline-block mb-2 sm:mb-0 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent"
            >
              Indian Icon of The Year, 2026
            </span>

            {" "} &bull; © {new Date().getFullYear()} All Rights Reserved
            {" "} | Operated by{" "}
            <span className="text-indigo-300 font-bold">
              TIME Cyber Media Pvt Ltd.
            </span>
          </div>

          {/* BOTTOM-MOST ROW: Visit Counter & Developer Credit */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center w-full px-5 pb-8 mt-4 gap-4">
            {/* Left: Visit Counter */}
            <div className="sm:absolute sm:left-5 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-amber-500/20 shadow-inner">
              <span className="text-amber-500 text-lg">👁️</span>
              <span className="text-slate-300 text-xs sm:text-sm font-medium tracking-wide">
                Total Visits: <strong className="text-amber-400 ml-1">{visitCount !== null ? visitCount.toLocaleString() : "..."}</strong>
              </span>
            </div>

            {/* Center: Developer Credit Badge */}
            <a
              href="https://primeimpact.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 bg-amber-500/5 hover:border-amber-500/80 hover:bg-amber-500/10 transition-all duration-300 shadow-lg shadow-amber-500/5"
            >
              <span className="text-[10px] text-slate-400 tracking-wider font-medium">
                ✦ Designed &amp; Developed by
              </span>
              <span className="text-[12px] font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-400">
                Prime Impact IT Solutions
              </span>
            </a>
          </div>
        </PageHero>
      </AuroraBackground>
    </footer>
  );
}
