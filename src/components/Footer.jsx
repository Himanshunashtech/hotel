import React, { useState, useEffect } from 'react';
import { Compass, Award, Phone, Mail, ArrowUp, Clock, ShieldCheck, Globe, Share2 } from 'lucide-react';

export default function Footer({ onOpenReserve }) {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST time zone (UTC+5:30)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="location" className="relative bg-[#030508] border-t border-[#D4AF37]/20 pt-24 pb-16 overflow-hidden">
      {/* Decorative Radial Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Highlight Banner: Accolades & World Rankings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 border-b border-white/10 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0 bg-[#070B12]">
              <Award className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-semibold text-white block">
                World's Best Lake Hotel 2025
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">
                Condé Nast Traveler Gold List
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0 bg-[#070B12]">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-semibold text-white block">
                Prix Versailles Architecture Award
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">
                Heritage Palace Restoration
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center shrink-0 bg-[#070B12]">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-[#D4AF37] block">
                {localTime || '10:35:00 AM'} IST
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-sans">
                Udaipur Royal Time (Live)
              </span>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 py-16">
          {/* Brand & Palace Identity */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#070B12]">
                  <span className="font-cinzel text-xs font-bold text-[#D4AF37]">AM</span>
                </div>
                <div>
                  <h3 className="font-cinzel text-xl font-bold tracking-[0.2em] text-[#FBF9F5]">
                    AMRIT MAHAL
                  </h3>
                  <span className="text-[9px] tracking-[0.35em] text-[#D4AF37] uppercase block font-sans">
                    The Royal Lake Sanctuary
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs md:text-sm text-white/60 leading-relaxed font-light max-w-md mb-6">
                Floating serenely upon the waters of Lake Pichola, Amrit Mahal offers unhurried royal solitude, century-old heritage Mewari craftsmanship, and sovereign hospitality for discerning travelers worldwide.
              </p>

              <div className="flex items-center gap-3 text-xs text-white/70 font-sans">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>24.5760° N, 73.6800° E • Private Island, Udaipur, Rajasthan 313001, India</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                aria-label="Global"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6">
              The Estate
            </h4>
            <ul className="space-y-3 font-sans text-xs text-white/60">
              <li>
                <a href="#cinematic-experience" className="hover:text-white transition-colors">
                  Cinematic Voyage
                </a>
              </li>
              <li>
                <a href="#villa-specs" className="hover:text-white transition-colors">
                  Mewari Architecture
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-white transition-colors">
                  Royal Residences
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-white transition-colors">
                  Lake Pichola Cruises
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Helipad & Shikara Pier
                </a>
              </li>
            </ul>
          </div>

          {/* Concierge & Direct Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6">
              Concierge
            </h4>
            <div className="space-y-3 font-sans text-xs text-white/70">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 294 252 8000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="truncate">butler@amritmahal.com</span>
              </div>
              <p className="text-[11px] text-white/50 pt-2 leading-relaxed">
                Private Shikara jetty boat service runs 24 hours daily from City Palace Gate 4.
              </p>
            </div>
          </div>

          {/* Private Newsletter / Inquiry */}
          <div className="lg:col-span-3">
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6">
              Imperial Dispatch
            </h4>
            <p className="font-sans text-xs text-white/60 mb-4 leading-relaxed font-light">
              Receive confidential invitations to seasonal palace events and royal Mewari festivals.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Your address has been accepted into our Imperial Dispatch registry.'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter private email"
                className="w-full bg-[#0E1524] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] placeholder:text-white/30"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl border border-[#D4AF37]/60 bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-white hover:text-[#070B12] font-cinzel text-[11px] tracking-[0.18em] uppercase font-semibold transition-all cursor-pointer"
              >
                Subscribe Dispatch
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar & Return to Top */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-white/50">
          <div>
            © {new Date().getFullYear()} AMRIT MAHAL RESIDENCES LTD. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-white transition-colors">Royal Etiquette</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D4AF37] hover:text-[#F3E5AB] transition-colors cursor-pointer ml-2"
            >
              <span>Ascend to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
