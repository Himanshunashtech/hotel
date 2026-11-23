import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundscape } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 384;

// Minimal, elegant villa story chapters
const CHAPTERS = [
  {
    id: 'arrival',
    label: 'Arrival',
    startFrame: 0,
    endFrame: 65,
    title: 'AMRIT MAHAL',
    subtitle: 'The Royal Lake Sanctuary • Udaipur',
    info: 'A private island palace floating on the sacred waters of Lake Pichola',
    align: 'center',
  },
  {
    id: 'courtyard',
    label: 'Courtyard',
    startFrame: 66,
    endFrame: 135,
    title: 'THE ROYAL COURTYARD',
    subtitle: 'Whispering Fountains & Bougainvillea',
    info: 'Centuries-old marble arches bathed in warm twilight lanterns',
    align: 'left',
  },
  {
    id: 'foyer',
    label: 'Grand Foyer',
    startFrame: 136,
    endFrame: 210,
    title: 'THE GRAND FOYER',
    subtitle: 'Makrana Marble & Bohemian Crystal',
    info: 'Hand-sculpted pillars beneath sovereign crystal chandeliers',
    align: 'right',
  },
  {
    id: 'suite',
    label: 'Royal Suite',
    startFrame: 211,
    endFrame: 290,
    title: 'THE LAKEFRONT SUITE',
    subtitle: 'Imperial Heritage & Panoramic Jharokhas',
    info: 'Private scalloped balconies opening directly onto rippling waters',
    align: 'left',
  },
  {
    id: 'sanctuary',
    label: 'Inner Sanctuary',
    startFrame: 291,
    endFrame: 350,
    title: 'THE INNER SANCTUARY',
    subtitle: 'Mewari Royalty & Artistry',
    info: 'Historic galleries leading to private candlelit dining salons',
    align: 'right',
  },
  {
    id: 'twilight',
    label: 'Twilight',
    startFrame: 351,
    endFrame: 384,
    title: 'AMRIT MAHAL',
    subtitle: 'Lake Pichola • Rajasthan',
    info: 'An immortal golden jewel upon the evening waters',
    align: 'center',
    showCta: true,
  },
];

export default function CinematicScroller({ onOpenReserve }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Frame path formatter
  const getFramePath = (index) => {
    const padIndex = String(index + 1).padStart(4, '0');
    return `/frames/frame_${padIndex}.webp`;
  };

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    const images = [];
    imagesRef.current = images;

    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      if (!isCancelled) {
        setLoadedCount(1);
        renderFrame(0);
      }
    };

    let loaded = 1;
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (isCancelled) return;
        images[i] = img;
        loaded++;
        setLoadedCount(loaded);
      };
      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
      };
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Draw frame on canvas with object-fit: cover math
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index] || imagesRef.current[0];
    if (!img || !img.complete) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (cw - iw * ratio) / 2;
    const centerShiftY = (ch - ih * ratio) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, centerShiftX, centerShiftY, iw * ratio, ih * ratio);
  };

  // Canvas Resize handler for crisp high-DPI rendering
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameIndex);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentFrameIndex]);

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const frameProxy = { frame: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=4500',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(Math.round(progress * 100));

          const targetFrame = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );
          frameProxy.frame = targetFrame;
          setCurrentFrameIndex(targetFrame);
          renderFrame(targetFrame);

          const chapterIdx = CHAPTERS.findIndex(
            (c) => targetFrame >= c.startFrame && targetFrame <= c.endFrame
          );
          if (chapterIdx !== -1) {
            setActiveChapterIndex(chapterIdx);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    const playing = soundscape.toggle();
    setIsPlayingAudio(playing);
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#05070B]"
    >
      {/* 3D Background Video Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Subtle Cinematic Vignette for Text Contrast */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_45%,rgba(3,5,9,0.7)_100%] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />

      {/* Initial Subtle Loader */}
      {loadedCount < 30 && (
        <div className="absolute inset-0 z-40 bg-[#05070B] flex flex-col items-center justify-center p-8 transition-opacity duration-700">
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin mb-4" />
          <h2 className="font-cinzel text-lg text-[#FBF9F5] tracking-[0.25em] uppercase mb-1">
            AMRIT MAHAL
          </h2>
          <span className="text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase font-sans">
            Preparing Cinematic Voyage...
          </span>
        </div>
      )}

      {/* Minimal Floating Top Controls (Audio Aura & Coordinates) */}
      <div className="absolute top-8 left-8 right-8 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-sm md:text-base font-bold tracking-[0.25em] text-[#FBF9F5] drop-shadow-md">
            AMRIT MAHAL
          </span>
          <span className="hidden sm:inline text-white/40 text-xs">•</span>
          <span className="hidden sm:inline font-sans text-[11px] tracking-[0.2em] text-[#D4AF37]/80 uppercase drop-shadow-md">
            Udaipur
          </span>
        </div>

        {/* Discreet Sound Toggle */}
        <button
          onClick={toggleSound}
          className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans border border-white/10 hover:border-[#D4AF37]/50 bg-black/40 backdrop-blur-md text-white/70 hover:text-white transition-all cursor-pointer"
          title={isPlayingAudio ? 'Mute' : 'Play Palace Sound'}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-medium">
                Sound On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[10px] tracking-widest uppercase">
                Sound Off
              </span>
            </>
          )}
        </button>
      </div>

      {/* Seamless Floating Cinematic Text Overlay */}
      <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-8 md:px-16 flex flex-col justify-center pointer-events-none">
        <div
          key={activeChapter.id}
          className={`transition-all duration-700 ease-out transform pointer-events-auto ${
            activeChapter.align === 'center'
              ? 'text-center mx-auto max-w-2xl'
              : activeChapter.align === 'right'
              ? 'text-right ml-auto max-w-xl'
              : 'text-left mr-auto max-w-xl'
          }`}
        >
          {/* Section Indicator */}
          <div
            className={`flex items-center gap-3 mb-3 ${
              activeChapter.align === 'center'
                ? 'justify-center'
                : activeChapter.align === 'right'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <span className="w-8 h-[1px] bg-[#D4AF37]/70" />
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold drop-shadow-sm">
              {activeChapter.label}
            </span>
            <span className="w-8 h-[1px] bg-[#D4AF37]/70" />
          </div>

          {/* Majestic Title */}
          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] text-[#FBF9F5] leading-tight mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            {activeChapter.title}
          </h1>

          {/* Elegant Subtitle */}
          <h2 className="font-cormorant text-xl sm:text-2xl md:text-3xl italic text-[#E5C358] tracking-wide mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            {activeChapter.subtitle}
          </h2>

          {/* Brief Villa Info */}
          <p className="font-sans text-xs sm:text-sm text-white/85 font-light tracking-wide leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            {activeChapter.info}
          </p>

          {/* Optional Action Button in Twilight Finale */}
          {activeChapter.showCta && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={onOpenReserve}
                className="px-8 py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#070B12] font-cinzel text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#070B12]" />
                <span>Reserve Sanctuary</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Minimal Telemetry & Scroll Cue */}
      <div className="absolute bottom-8 left-8 right-8 z-30 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] text-white/60 pointer-events-none">
        <div className="flex items-center gap-2 drop-shadow-md">
          <span className="text-[#D4AF37] font-mono">0{activeChapterIndex + 1}</span>
          <span>/</span>
          <span className="font-mono">06</span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-white/80 uppercase">{activeChapter.label}</span>
        </div>

        {/* Scroll Cue (Only shows in initial scenes) */}
        {scrollProgress < 85 ? (
          <div className="flex items-center gap-2 text-white/70 animate-pulse drop-shadow-md">
            <span className="text-[10px] tracking-[0.25em] uppercase">Scroll to Travel</span>
            <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#D4AF37] drop-shadow-md">
            <span className="text-[10px] tracking-[0.25em] uppercase">Lake Pichola</span>
          </div>
        )}
      </div>
    </section>
  );
}
