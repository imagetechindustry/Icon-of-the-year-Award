import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { PageHero, FadeUp, StaggerContainer, StaggerItem, NeonCard } from "../components/Motion.jsx";
import GuestCard from "../components/GuestCard.jsx";
import { juryMembers } from "../constants/juryMembers.js";

export default function Jury() {
  return (
    <>
      <PageHero
        title="Our Esteemed Guests & Speakers"
      >
        {/* Featured Swiper Section */}
        <FadeUp className="max-w-7xl mx-auto px-6 pt-10  p">
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false
            }}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop
            className="!pb-20"
          >
            {juryMembers.slice(0, 8).map((member, i) => (
              <SwiperSlide key={i} className="!w-[320px] md:!w-[380px]">
                <GuestCard member={member} index={i} isFeatured={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </FadeUp>

        {/* Grid Section */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/40">
              Complete Honors List
            </span>
          </div>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch"
            staggerDelay={0.08}
          >
            {juryMembers.map((member, i) => (
              <StaggerItem key={i} className="h-full flex justify-center">
                <GuestCard member={member} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </PageHero>
    </>
  );
}
