import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPreviousEditions } from "../services/api.js";

export default function EditionYearSwitcher({ currentYear }) {
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    fetchPreviousEditions()
      .then(res => {
        const fetchedEditions = (res.data || []).sort((a, b) => b.year - a.year);
        setEditions(fetchedEditions);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-bold">
          Previous Editions
        </p>
        <h2 className="text-xl md:text-2xl font-extrabold text-[#ffe9b3]">
          Indian Icon of The Year, – {currentYear}
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {editions.map((edition) => {
          const formattedTitle = edition.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "indian-icon-of-the-year-awards";
          const isActive = edition.year === currentYear && (
            // Ideally we'd also check the slug here, but year is usually enough for the 'active' highlight
            true
          );
          return (
            <Link
              key={edition._id}
              to={`/${edition.year}/${formattedTitle}`}
              className={`px-3 py-1.5 rounded-full border transition flex flex-col items-center min-w-[60px] ${edition.year === currentYear
                ? "border-[#d4af37] bg-[#d4af37]/15 text-[#ffe9b3] font-semibold"
                : "border-white/20 text-gray-200 hover:bg-white hover:text-black"
                }`}
            >
              <span className="font-black text-[10px]">{edition.editionLabel || edition.year}</span>
              <span className="text-[8px] opacity-60 font-bold">{edition.year}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


