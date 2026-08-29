"use client";

import { MdArrowForward } from "react-icons/md";

const SeeMore = ({ path }) => {
  if (!path) return null;

  const label = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="text-center">
      <a
        href={`/${path}`}
        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-indigo-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-[0_10px_30px_rgba(99,102,241,0.12)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_16px_30px_rgba(79,70,229,0.18)] focus:outline-none focus:ring-4 focus:ring-indigo-200/70"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-200/80 via-indigo-300/80 to-indigo-200/80 transition-transform duration-500 ease-out group-hover:translate-x-full" />

        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          <span>View All {label}</span>
          <MdArrowForward
            size={18}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
          />
        </span>
      </a>
    </div>
  );
};

export default SeeMore;