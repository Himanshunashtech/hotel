import React from 'react';

export default function RoyalLogo({ className = "w-16 h-16" }) {
  return (
    <div className="flex items-center justify-center">
      {/* Pure Imperial Crest Emblem - No Text */}
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Outer Circular Ring with Dashed Royal Marks */}
        <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-[spin_25s_linear_infinite]" />
        <div className="absolute inset-1 rounded-full border border-dashed border-[#D4AF37]/25" />
        <div className="absolute inset-2.5 rounded-full border border-[#D4AF37]/50" />

        {/* Central Geometric Crown & Lotus Motif */}
        <div className="relative z-10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[#D4AF37] fill-current drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]"
            viewBox="0 0 24 24"
          >
            {/* Royal Crown / Chhatri architectural motif */}
            <path d="M12 2L14.5 7.5L20 4.5L18 12H6L4 4.5L9.5 7.5L12 2Z" opacity="0.95" />
            {/* Base platform steps */}
            <rect x="5" y="13.5" width="14" height="1.8" rx="0.5" />
            <rect x="7" y="16.5" width="10" height="1.5" rx="0.5" opacity="0.8" />
            <circle cx="12" cy="10" r="1.5" fill="#FFF1CA" />
          </svg>
        </div>
      </div>
    </div>
  );
}
