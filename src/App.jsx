import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CinematicScroller from './components/CinematicScroller';
import ReservationModal from './components/ReservationModal';
import ShutterOpening from './components/ShutterOpening';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [showShutter, setShowShutter] = useState(true);

  // Initialize Lenis smooth scroll and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05070B] text-[#E8E6E3] font-sans selection:bg-[#D4AF37]/30 selection:text-white relative overflow-x-hidden">
      {/* Cinematic Shutter Opening Intro Overlay */}
      {showShutter && (
        <ShutterOpening onComplete={() => setShowShutter(false)} />
      )}

      {/* Fullscreen Cinematic 3D Video Scrub Experience */}
      <main>
        <CinematicScroller onOpenReserve={() => setIsReserveOpen(true)} />
      </main>

      {/* Reservation Modal if user clicks Reserve */}
      <ReservationModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />
    </div>
  );
}
