import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Compass, Calendar, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/audio';

export default function Navbar({ onOpenReserve }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const playing = soundscape.toggle();
    setIsPlayingAudio(playing);
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-panel py-3 shadow-2xl border-b border-[#D4AF37]/15'
            : 'bg-gradient-to-b from-[#05070B]/80 via-[#05070B]/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Royal Crest */}
          <a
            href="#"
            className="group flex items-center gap-3.5 focus:outline-none"
            aria-label="Amrit Mahal Home"
          >
            <div className="relative w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#070B12]/80 group-hover:border-[#D4AF37] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <span className="font-cinzel text-xs font-bold text-[#D4AF37] tracking-widest">AM</span>
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 scale-110 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-base md:text-lg tracking-[0.22em] text-[#FBF9F5] font-semibold group-hover:text-[#D4AF37] transition-colors">
                AMRIT MAHAL
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#D4AF37]/80 uppercase -mt-0.5 font-sans">
                Lake Pichola • Udaipur
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-sans text-white/70">
            <button
              onClick={() => scrollTo('cinematic-experience')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer focus:outline-none"
            >
              The Sanctuary
            </button>
            <button
              onClick={() => scrollTo('villa-specs')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer focus:outline-none"
            >
              Architecture
            </button>
            <button
              onClick={() => scrollTo('suites')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer focus:outline-none"
            >
              Suites
            </button>
            <button
              onClick={() => scrollTo('experiences')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer focus:outline-none"
            >
              Royal Experiences
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="hover:text-[#D4AF37] transition-colors py-1 cursor-pointer focus:outline-none"
            >
              Location
            </button>
          </nav>

          {/* Actions: Audio Ambient Toggle & Reserve CTA */}
          <div className="flex items-center gap-4">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans border transition-all duration-300 ${
                isPlayingAudio
                  ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                  : 'border-white/10 hover:border-white/30 text-white/60 hover:text-white'
              }`}
              title={isPlayingAudio ? 'Mute Palace Ambient' : 'Play Palace Ambient Aura'}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  <span className="hidden sm:inline text-[11px] tracking-wider uppercase font-medium">
                    Aura On
                  </span>
                  <span className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 h-2 bg-[#D4AF37] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#D4AF37] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#D4AF37] animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/50" />
                  <span className="hidden sm:inline text-[11px] tracking-wider uppercase">
                    Palace Sound
                  </span>
                </>
              )}
            </button>

            {/* Reservation Button */}
            <button
              onClick={onOpenReserve}
              className="relative group overflow-hidden rounded-full px-5 py-2 border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37]/20 via-[#AA771C]/20 to-[#D4AF37]/20 text-white text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium text-[#FBF9F5]">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Reserve
              </span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20 pointer-events-none" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-[#D4AF37] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#05070B]/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden px-8 transition-all">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-6">
            <span className="font-cinzel text-sm text-[#D4AF37]">AM</span>
          </div>
          <nav className="flex flex-col items-center gap-6 text-sm tracking-[0.25em] uppercase font-cinzel text-white/80">
            <button
              onClick={() => scrollTo('cinematic-experience')}
              className="hover:text-[#D4AF37] transition-colors py-2"
            >
              The Sanctuary
            </button>
            <button
              onClick={() => scrollTo('villa-specs')}
              className="hover:text-[#D4AF37] transition-colors py-2"
            >
              Architecture
            </button>
            <button
              onClick={() => scrollTo('suites')}
              className="hover:text-[#D4AF37] transition-colors py-2"
            >
              Suites
            </button>
            <button
              onClick={() => scrollTo('experiences')}
              className="hover:text-[#D4AF37] transition-colors py-2"
            >
              Royal Experiences
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="hover:text-[#D4AF37] transition-colors py-2"
            >
              Location & Details
            </button>
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10 w-full flex flex-col items-center gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="w-full max-w-xs py-3 rounded-full border border-[#D4AF37] bg-[#D4AF37]/20 text-[#FBF9F5] font-cinzel text-xs tracking-[0.2em] uppercase font-semibold text-center"
            >
              Book Royal Suite
            </button>
          </div>
        </div>
      )}
    </>
  );
}
