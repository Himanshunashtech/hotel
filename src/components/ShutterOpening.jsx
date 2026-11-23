import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import RoyalLogo from './RoyalLogo';
import { soundscape } from '../utils/audio';

export default function ShutterOpening({ onComplete }) {
  const containerRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const centerRingRef = useRef(null);
  const seamLightRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Trigger shutter opening animation
  const openShutter = () => {
    if (isOpen) return;
    setIsOpen(true);

    try {
      soundscape.play();
    } catch (e) {}

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        if (onComplete) onComplete();
      },
    });

    tl
      // 1. Center emblem subtle scale and flare
      .to(centerRingRef.current, {
        scale: 1.15,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.inOut',
      })
      // 2. Seam light glow flash
      .to(
        seamLightRef.current,
        {
          opacity: 1,
          scaleX: 1.5,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.7'
      )
      // 3. Top and Bottom shutters slide open smoothly
      .to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 1.4,
          ease: 'power4.inOut',
        },
        '-=0.4'
      )
      .to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 1.4,
          ease: 'power4.inOut',
        },
        '<'
      )
      // 4. Fade seam light
      .to(
        seamLightRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.9'
      );
  };

  // Automatically open the shutter on page load every time
  useEffect(() => {
    const timer = setTimeout(() => {
      openShutter();
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={openShutter}
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center select-none cursor-pointer"
      title="Click to open immediately"
    >
      {/* Top Shutter Panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#05070B] border-b border-[#D4AF37]/30 flex flex-col justify-end items-center pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.9)] z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black pointer-events-none" />
      </div>

      {/* Bottom Shutter Panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#05070B] border-t border-[#D4AF37]/30 flex flex-col justify-start items-center pt-8 shadow-[0_-10px_30px_rgba(0,0,0,0.9)] z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none" />
      </div>

      {/* Golden Seam Light Beam */}
      <div
        ref={seamLightRef}
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#F3E5AB] to-transparent z-30 pointer-events-none opacity-80 shadow-[0_0_20px_#D4AF37]"
      />

      {/* Central Aperture Shutter / Seal - Completely Text-Free */}
      <div
        ref={centerRingRef}
        className="relative z-40 flex items-center justify-center group"
      >
        {/* Outer Circular Aperture Ring */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-[#D4AF37]/40 bg-[#070B12]/95 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.25)] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_70px_rgba(212,175,55,0.45)] group-hover:scale-105 transition-all duration-500">
          {/* Rotating Dashed Lens Dial */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[#D4AF37]/30 animate-[spin_35s_linear_infinite]" />
          <div className="absolute inset-5 rounded-full border border-[#D4AF37]/20" />

          {/* Pure Royal Architectural Emblem */}
          <RoyalLogo className="w-24 h-24" />

          {/* Subtle Golden Ping Effect */}
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 scale-105 group-hover:scale-115 transition-transform duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
