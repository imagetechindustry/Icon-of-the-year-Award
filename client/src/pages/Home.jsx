import CTA from "../components/home/CTA.jsx";
import GuestSlider from "../components/home/GuestSlider.jsx";
import Hero from "../components/home/Hero.jsx";
import KeyFAQ from "../components/home/KeyFAQ.jsx";
import MediaGallery from "../components/MediaGallery.jsx";
import MediaPartner from "../components/home/MediaPartner.jsx";
import Overview from "../components/home/Overview.jsx";
import ResearchMethodology from "../components/home/ResearchMethodology.jsx";
import SelectionProcess from "../components/home/SelectionProcess.jsx";
import UpcomingAwards from "../components/UpcomingAwards.jsx";
import WhoShouldNominate from "../components/home/WhoShouldNominate.jsx";
import WhyIconOfTheYear from "../components/home/WhyIconOfTheYear.jsx";

export default function Home() {

  return (
    <main className={`w-full text-[#f5f3f0]  `}>
      {/* SEO H1 - Hidden */}
      <h1 className="sr-only mt-24 ">
        Indian Icon of The Year, 2026 – Indian Icon of The Year by TIME Cyber Media Pvt Ltd
      </h1>
      {/* ================= HERO ================= */}
      <Hero />

      <div className="relative w-full">
        {/* OVERVIEW + DATES: Main theme background (use SECTION_BG to keep consistent) */}
        <Overview />

        {/* ================= WHY Indian Icon of The Year, 2026 ================= */}
        <WhyIconOfTheYear />

        {/* ================= RESEARCH METHODOLOGY ================= */}
        <ResearchMethodology />

        {/* Selection Process */}
        <SelectionProcess />

        {/* WHO SHOULD NOMINATE section */}
        <WhoShouldNominate />

        {/* ================= GUESTS & SPEAKERS ================= */}
        <GuestSlider />

        {/* ================= MEDIA GALLERY ================= */}
        <MediaGallery />

        {/* CTA section */}
        <CTA />

        {/* ================= KEY FAQ SNAPSHOT ================= */}
        <KeyFAQ />

        {/* OUR OTHER UPCOMING AWARDS section */}
        <UpcomingAwards />

        {/* ================= MEDIA PARTNERS / COVERAGE ================= */}
        <MediaPartner />
      </div> 

    </main>
  );
}
