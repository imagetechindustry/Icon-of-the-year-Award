import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FadeUp } from "../Motion.jsx";
import GuestCard from "../GuestCard.jsx";
import { juryMembers } from "../../constants/juryMembers.js";

export default function GuestSlider() {
  const displayJury = juryMembers.length > 0 && juryMembers.length < 12
    ? [...juryMembers, ...juryMembers]
    : juryMembers;

  return (
    <section className="relative overflow-hidden py-12">
      <FadeUp className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl xs:text-4xl md:text-5xl font-heading font-black mb-4 bg-gradient-to-r from-[#F7E4BE] via-[#D4A96A] to-[#B8860B] bg-clip-text text-transparent drop-shadow-2xl">
          Our Esteemed Guests & Speakers
        </h2>
        <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mx-auto rounded-full" />
        <p className="mt-6 text-indigo-100/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          Join our network of eminent industry professionals, leaders, and visionaries.
        </p>
      </FadeUp>
      <FadeUp className="max-w-7xl mx-auto px-6 pt-10">
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
          loop={displayJury.length > 1}
          className="!pb-20"
        >
          {displayJury.map((member, i) => (
            <SwiperSlide key={i} className="!w-[320px] md:!w-[380px]">
              <GuestCard member={member} index={i} isFeatured={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </FadeUp>
    </section>
  );
}
