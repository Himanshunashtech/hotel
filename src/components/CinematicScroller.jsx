import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 384;

// Minimal, elegant villa story chapters
const CHAPTERS = [
  {
    id: 'arrival',
    label: 'The Sanctuary',
    startFrame: 0,
    endFrame: 65,
    title: 'AMRIT MAHAL',
    subtitle: 'The Royal Lake Sanctuary • Udaipur',
    info: 'A sovereign palace floating upon the sacred waters of Lake Pichola',
    align: 'center',
  },
  {
    id: 'courtyard',
    label: 'The Courtyard',
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
  },
];

export default function CinematicScroller({ onOpenReserve }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

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

    // Enable high-quality bicubic smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1280;
    const ih = img.naturalHeight || 720;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const renderW = Math.round(iw * ratio);
    const renderH = Math.round(ih * ratio);
    const centerShiftX = Math.round((cw - renderW) / 2);
    const centerShiftY = Math.round((ch - renderH) / 2);

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, centerShiftX, centerShiftY, renderW, renderH);
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

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#05070B]"
    >
      {/* 3D Background Video Canvas with Sharp Contrast Tuning */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          imageRendering: '-webkit-optimize-contrast',
          filter: 'contrast(1.06) brightness(1.02)',
        }}
      />

      {/* Subtle Cinematic Vignette for Text Contrast (Clean & Non-Hazy) */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_55%,rgba(3,5,9,0.55)_100%] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none z-10" />

      {/* Initial Subtle Loader */}
      {loadedCount < 25 && (
        <div className="absolute inset-0 z-40 bg-[#05070B] flex flex-col items-center justify-center p-8 transition-opacity duration-700">
          <div className="w-8 h-8 rounded-full border-2 border-slate-600/30 border-t-slate-200 animate-spin mb-3" />
          <h2 className="embroidery-title text-xs tracking-[0.25em] uppercase">
            AMRIT MAHAL
          </h2>
        </div>
      )}

      {/* Floating Silver Typography Overlay */}
      <div className="relative z-20 w-full h-full max-w-5xl mx-auto px-8 md:px-16 flex flex-col justify-center pointer-events-none select-none">
        <div
          key={activeChapter.id}
          className={`transition-all duration-700 ease-out transform pointer-events-auto ${
            activeChapter.align === 'center'
              ? 'text-center mx-auto max-w-xl'
              : activeChapter.align === 'right'
              ? 'text-right ml-auto max-w-lg'
              : 'text-left mr-auto max-w-lg'
          }`}
        >
          {/* Subtle Silver Chapter Crest */}
          <div
            className={`flex items-center gap-2.5 mb-2.5 ${
              activeChapter.align === 'center'
                ? 'justify-center'
                : activeChapter.align === 'right'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div className="w-8 embroidery-stitch-line opacity-50" />
            <svg
              className="w-3.5 h-3.5 text-slate-300 fill-current drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L14.5 7.5L20 4.5L18 12H6L4 4.5L9.5 7.5L12 2Z" />
            </svg>
            <span className="font-decorative text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-slate-300 font-medium drop-shadow-sm">
              {activeChapter.label}
            </span>
            <div className="w-8 embroidery-stitch-line opacity-50" />
          </div>

          {/* Silver Title (Small & Refined) */}
          <h1 className="embroidery-title text-xl sm:text-2xl md:text-3xl font-semibold leading-snug mb-2">
            {activeChapter.title}
          </h1>

          {/* Silver Separator Line */}
          <div
            className={`w-16 my-2 embroidery-stitch-line opacity-60 ${
              activeChapter.align === 'center'
                ? 'mx-auto'
                : activeChapter.align === 'right'
                ? 'ml-auto'
                : 'mr-auto'
            }`}
          />

          {/* Silver Subtitle */}
          <h2 className="embroidery-sub text-xs sm:text-sm md:text-base font-normal tracking-wide mb-2">
            {activeChapter.subtitle}
          </h2>

          {/* Silver Description */}
          <p className="embroidery-desc text-[11px] sm:text-xs font-light tracking-wide leading-relaxed max-w-md">
            {activeChapter.info}
          </p>
        </div>
      </div>
    </section>
  );
}
