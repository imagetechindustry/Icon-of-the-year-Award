import { useState } from "react";

export default function GuestCard({ member, index, isFeatured = false }) {
  const [imgError, setImgError] = useState(false);

  // Golden "Liquid Glass" adapted theme colors
  const medicalBlue = "#4338CA"; // Amber-500
  const amberAccent = "#fcd34d"; // Amber-300
  const blue40 = "rgba(245, 158, 11, 0.3)";
  const indexKey = typeof index === 'number' ? index + 1 : 1;
  const imgSrc = member.img ? `/images/${member.img}` : `/images/jury${indexKey}.jpeg`;

  return (
    <div
      className={`
        w-full max-w-[370px] h-full transition-all duration-500 group flex justify-center
        ${isFeatured ? "scale-100" : "hover:-translate-y-3"}
      `}
      style={{ margin: "0 auto" }}
    >
      {/* CARD */}
      <div
        className="
          w-full
          min-h-[460px]
          h-full
          flex flex-col
          rounded-3xl
          p-5 sm:p-6
          border border-indigo-500/20 shadow-lg
          hover:border-indigo-500/40 hover:shadow-indigo-500/10 hover:shadow-2xl
          transition-all duration-500
          relative
          
          glass-card
          glass-card-hover-active
        "
        style={{
          background: "linear-gradient(135deg, rgba(13, 27, 56, 0.8) 0%, rgba(7, 15, 33, 0.9) 100%)",
          boxShadow: `0 10px 32px 0 rgba(245,158,11,0.08)`,
        }}
      >
        {/* Decorative top accent */}
        <div className="absolute left-1/2 -top-2 -translate-x-1/2">
          <div
            className="w-20 sm:w-24 h-1.5 rounded-full mb-3"
            style={{
              background: `linear-gradient(to right, ${medicalBlue}, white, ${amberAccent})`,
              filter: "blur(0.5px)"
            }}
          ></div>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mb-6 relative">
          <div
            className="
              rounded-full 
              p-[2px]
              shadow-lg
              relative
            "
            style={{
              height: "14rem", width: "14rem",
              background: `linear-gradient(135deg, ${medicalBlue}, white, ${amberAccent})`,
              boxShadow: `0 4px 20px 0 ${blue40}`
            }}
          >
            {!imgError ? (
              <img
                src={imgSrc}
                alt={member.name}
                className="h-full w-full rounded-full object-cover bg-black border-4"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  background: "black"
                }}
                loading="lazy"
                onError={() => setImgError(true)}
              />
            ) : (
              <div 
                className="h-full w-full rounded-full flex items-center justify-center bg-slate-800 text-4xl font-black text-white border-4"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                {member.name ? member.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "G"}
              </div>
            )}
          </div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col flex-grow items-center text-center px-2 sm:px-3">
          <h2
            className="
              text-xl sm:text-2xl lg:text-2xl 
              font-extrabold 
              mb-3 
              bg-clip-text text-transparent
              drop-shadow-lg
              tracking-wide
              group-hover:text-indigo-400 transition-colors duration-300
            "
            style={{
              backgroundImage: `linear-gradient(to right, white, ${medicalBlue}, white)`
            }}
          >
            {member.name}
          </h2>

          <div
            className="w-20 sm:w-24 h-[2px] mx-auto mb-4 opacity-80 rounded-full"
            style={{
              background: `linear-gradient(to right, transparent, ${medicalBlue}, transparent)`
            }}
          />

          <p
            className="text-sm sm:text-base lg:text-base font-medium leading-relaxed italic px-2 drop-shadow mb-4 min-h-[48px] flex items-center justify-center text-indigo-100/90"
            style={{
              textShadow: "0 1.5px 0 #020617, 0 0 8px rgba(245,158,11,0.2)",
            }}
          >
            {member.designation}
          </p>

          {/* Decorative underline swirl */}
          <div className="mt-auto pt-2 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
            <svg width="36" height="13" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path d="M2 8 Q 10 16, 20 8 T 38 8" stroke={medicalBlue} strokeWidth="2.5" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
