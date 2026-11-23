import React, { useState } from 'react';
import { Bed, Users, Maximize2, Sparkles, Check, ArrowRight } from 'lucide-react';

const SUITES = [
  {
    id: 'kohinoor',
    name: 'The Kohinoor Grand Lakefront Suite',
    category: 'Presidential Residence',
    image: '/gallery/suite.webp',
    area: '2,800 SQ FT',
    guests: 'Up to 3 Guests',
    bed: 'King Sovereign Heritage Bed',
    price: '$2,850',
    description:
      'The crown jewel of Amrit Mahal. Boasts private jharokhas opening above the rippling lake, hand-carved mahogany bed posts, an antique dressing salon, and a dedicated royal butler on call 24 hours a day.',
    features: [
      'Private Jharokha Balcony suspended over water',
      'Italian marble bathroom with lake-facing soaking tub',
      '24/7 Dedicated Royal Butler & Sommelier service',
      'Complimentary private Shikara airport transfers',
      'Hand-stitched Mewari silk robes and bed linens',
    ],
  },
  {
    id: 'courtyard-sanctuary',
    name: 'The Mewar Courtyard Residence',
    category: 'Garden & Fountain View',
    image: '/gallery/courtyard.webp',
    area: '2,200 SQ FT',
    guests: 'Up to 2 Guests',
    bed: 'Royal King Bed',
    price: '$2,100',
    description:
      'Overlooking the central palace quadrangle, this suite immerses guests in the intoxicating aroma of jasmine blooms and the gentle lullaby of bubbling marble fountains.',
    features: [
      'Direct private access to the Bougainvillea Courtyard',
      'Carved Makrana marble archway lounge',
      'Private morning yoga and breakfast veranda',
      'Bespoke Ayurvedic pillow and essential oil menu',
      'Antique Rajput weaponry and miniature art display',
    ],
  },
  {
    id: 'crystal-foyer',
    name: 'The Crystal Heritage Residence',
    category: 'Palace Wing Suite',
    image: '/gallery/foyer.webp',
    area: '2,400 SQ FT',
    guests: 'Up to 3 Guests',
    bed: 'Handcrafted Imperial King',
    price: '$2,450',
    description:
      'Positioned in the royal north wing beneath soaring 16-foot ceilings, highlighted by antique Belgian chandeliers, intricately inlaid marble floors, and private library alcove.',
    features: [
      'Authentic 19th-century crystal chandeliers',
      'Hand-inlaid Pietra Dura marble dining table',
      'Private study salon with historic books on Rajasthan',
      'Curated private wine and single-malt spirits bar',
      'Panoramic sunset views across Udaipur old city',
    ],
  },
  {
    id: 'jal-mahal',
    name: 'The Jal Mahal Floating Pavilion',
    category: 'Waterfront Sanctuary',
    image: '/gallery/lake_exterior.webp',
    area: '3,100 SQ FT',
    guests: 'Up to 4 Guests',
    bed: 'Two Imperial Master Bedrooms',
    price: '$3,600',
    description:
      'An ultra-exclusive standalone duplex pavilion projecting directly into Lake Pichola with 360-degree unobstructed views of the sunset, City Palace, and Jag Mandir.',
    features: [
      'Private heated infinity plunge pool on private pier',
      'Dual master suites with custom brass bathtubs',
      'Private sun terrace for candlelight dining under stars',
      'Exclusive private Shikara vessel dedicated to suite',
      'Michelin-trained private chef for customized banquets',
    ],
  },
];

export default function SuitesShowcase({ onOpenReserve }) {
  const [activeSuiteId, setActiveSuiteId] = useState('kohinoor');

  const activeSuite = SUITES.find((s) => s.id === activeSuiteId) || SUITES[0];

  return (
    <section id="suites" className="relative py-32 bg-[#070B12] overflow-hidden border-t border-white/5">
      {/* Decorative Golden Arches Watermark */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 rounded-full border border-[#D4AF37]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
                ROYAL ACCOMMODATIONS
              </span>
            </div>
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-[0.06em] text-[#FBF9F5]">
              Suites of Sovereignty
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-white/60 max-w-md font-light leading-relaxed">
            Eighteen meticulously preserved residences offering private lake balconies, marble finishes, and uncompromised privacy.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-white/10">
          {SUITES.map((suite) => (
            <button
              key={suite.id}
              onClick={() => setActiveSuiteId(suite.id)}
              className={`px-5 py-3 rounded-xl font-cinzel text-xs tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeSuiteId === suite.id
                  ? 'bg-[#D4AF37] text-[#070B12] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                  : 'glass-panel text-white/70 hover:text-white hover:border-[#D4AF37]/40'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeSuiteId === suite.id ? 'text-[#070B12]' : 'text-[#D4AF37]'}`} />
              <span>{suite.name}</span>
            </button>
          ))}
        </div>

        {/* Active Suite Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel-gold rounded-3xl p-6 md:p-10 border border-[#D4AF37]/30 shadow-2xl">
          {/* Suite Image Gallery Preview */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden group aspect-[16/10]">
            <img
              src={activeSuite.image}
              alt={activeSuite.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070B]/80 via-transparent to-black/20" />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 glass-panel px-3.5 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans text-[#D4AF37] border-[#D4AF37]/40">
              {activeSuite.category}
            </div>

            <div className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-xl text-right">
              <span className="text-[10px] uppercase tracking-widest text-white/60 block font-sans">
                Starting from
              </span>
              <span className="font-mono text-xl font-bold text-[#D4AF37]">
                {activeSuite.price}
                <span className="text-xs text-white/70 font-sans font-normal"> / night</span>
              </span>
            </div>
          </div>

          {/* Suite Details & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2 font-sans">
                {activeSuite.category}
              </span>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-[#FBF9F5] mb-4">
                {activeSuite.name}
              </h3>
              <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed font-light mb-6">
                {activeSuite.description}
              </p>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-panel p-3 rounded-xl text-center border-white/5">
                  <Maximize2 className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                  <span className="text-[10px] text-white/50 uppercase block font-sans">Area</span>
                  <span className="font-mono text-xs font-semibold text-white">{activeSuite.area}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl text-center border-white/5">
                  <Users className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                  <span className="text-[10px] text-white/50 uppercase block font-sans">Guests</span>
                  <span className="font-mono text-xs font-semibold text-white">{activeSuite.guests}</span>
                </div>
                <div className="glass-panel p-3 rounded-xl text-center border-white/5">
                  <Bed className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                  <span className="text-[10px] text-white/50 uppercase block font-sans">Bed Type</span>
                  <span className="font-mono text-[10px] font-semibold text-white truncate block">
                    {activeSuite.bed.split(' ')[0]} King
                  </span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 mb-8">
                {activeSuite.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                    </div>
                    <span className="font-sans text-xs text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              <button
                onClick={onOpenReserve}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#E5C358] hover:to-[#D4AF37] text-[#070B12] font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reserve Residence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
