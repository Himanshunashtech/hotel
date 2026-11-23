import React from 'react';
import { Compass, Moon, Sparkles, Utensils, HeartHandshake, Ship } from 'lucide-react';

const EXPERIENCES = [
  {
    icon: Ship,
    title: 'Private Shikara Lake Cruise',
    time: 'Sunset • 5:30 PM',
    tag: 'WATERWAY HERITAGE',
    image: '/gallery/lake_exterior.webp',
    description:
      'Board a handcrafted royal wooden Shikara draped in crimson velvet. Glide past the City Palace bathed in golden twilight as champagne and Mewari hors d’oeuvres are served on board.',
  },
  {
    icon: Moon,
    title: 'Starlight Dining Under Bougainvillea',
    time: 'Evening • 8:00 PM',
    tag: 'IMPERIAL GASTRONOMY',
    image: '/gallery/courtyard.webp',
    description:
      'A private banquet orchestrated in the marble courtyard beside the illuminated fountains. Multi-course recipes recorded from the 17th-century royal kitchens of the Maharana.',
  },
  {
    icon: HeartHandshake,
    title: 'Saffron & Jasmine Ayurvedic Ritual',
    time: 'Morning or Dusk',
    tag: 'AYUSH WELLNESS',
    image: '/gallery/corridor.webp',
    description:
      'Immerse in ancient holistic therapies administered by generational Ayurvedic vaidyas using rare Himalayan herbs, warm gold-infused oils, and restorative singing bowl sound baths.',
  },
  {
    icon: Sparkles,
    title: 'Private Classical Sitar Recital',
    time: 'Twilight • 7:00 PM',
    tag: 'CULTURAL MAJESTY',
    image: '/gallery/twilight.webp',
    description:
      'Experience the spellbinding acoustic intimacy of Indian classical ragas performed exclusively for palace residents by master musicians from the Gharanas of Rajasthan.',
  },
];

export default function Experiences({ onOpenReserve }) {
  return (
    <section id="experiences" className="relative py-32 bg-[#05070B] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
              CURATED VOYAGES
            </span>
            <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
          </div>
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-[0.06em] text-[#FBF9F5] mb-6">
            Moments Reserved for Royalty
          </h2>
          <p className="font-sans text-sm md:text-base text-white/70 font-light leading-relaxed">
            Every minute at Amrit Mahal is personalized to create unhurried, unforgettable memories of Rajasthan's regal romance.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden glass-card border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-black/30" />

                  <div className="absolute top-4 left-4 glass-panel px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans text-[#D4AF37] border-[#D4AF37]/40 flex items-center gap-2">
                    <Icon className="w-3 h-3" />
                    <span>{exp.tag}</span>
                  </div>

                  <div className="absolute bottom-4 right-4 glass-panel px-3 py-1 rounded-full text-[10px] tracking-wider text-white/80 font-mono">
                    {exp.time}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-[#FBF9F5] mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed font-light mb-6">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-sans tracking-widest text-[#D4AF37] uppercase">
                      Curated Daily For Residents
                    </span>
                    <button
                      onClick={onOpenReserve}
                      className="text-xs font-cinzel tracking-widest text-white/80 hover:text-[#D4AF37] uppercase font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Arrange With Butler →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
