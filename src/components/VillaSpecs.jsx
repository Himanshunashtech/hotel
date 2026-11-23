import React from 'react';
import { Shield, Sparkles, Droplets, Castle, UtensilsCrossed, Wind, Eye, Compass } from 'lucide-react';

const ARCHITECTURAL_METRICS = [
  {
    icon: Castle,
    title: 'Heritage Mewari Facade',
    value: '42,000 SQ FT',
    subtitle: 'Makrana Marble Architecture',
    description:
      'Engineered with cusped archways, intricate Jharokha overhanging balconies, and dome chhatris restored by master artisans of Udaipur.',
  },
  {
    icon: Droplets,
    title: 'Surrounded by Lake Pichola',
    value: '360° MOAT',
    subtitle: 'Private Island Sanctuary',
    description:
      'An impenetrable secluded island location accessible only via private wooden Shikara vessels, guaranteeing total discretion and peace.',
  },
  {
    icon: Sparkles,
    title: 'Royal Residences',
    value: '18 SUITES',
    subtitle: 'Bespoke Lakefront Chambers',
    description:
      'Each residence is individually curated with authentic 18th-century antique furnishings, hand-painted frescoes, and Bohemian crystal chandeliers.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Imperial Gastronomy',
    value: '3 VENUES',
    subtitle: 'Royal Mewari & Contemporary Fine Dining',
    description:
      'Recipes inherited from the royal court kitchens of Mewar, paired with organic herbs harvested from the palace garden pavilions.',
  },
  {
    icon: Wind,
    title: 'Ayush Ayurvedic Retreat',
    value: '8 SANCTUARIES',
    subtitle: 'Herbal & Holistic Rejuvenation',
    description:
      'Custom therapeutic wellness programs, open-air yoga atop the sunrise water pavilion, and signature saffron herbal bath rituals.',
  },
  {
    icon: Shield,
    title: 'Private Butler Concierge',
    value: '24 / 7',
    subtitle: 'Dedicated White-Glove Valet',
    description:
      'Trained in the timeless hospitality tradition of Rajputana royalty, ensuring your desires are effortlessly manifested.',
  },
];

export default function VillaSpecs() {
  return (
    <section id="villa-specs" className="relative py-32 bg-[#05070B] overflow-hidden">
      {/* Background Ambience & Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
              ARCHITECTURAL EXCELLENCE
            </span>
            <span className="w-8 h-[1px] bg-[#D4AF37]/60" />
          </div>
          <h2 className="font-cinzel text-3xl md:text-5xl font-bold tracking-[0.06em] text-[#FBF9F5] mb-6">
            The Anatomy of Amrit Mahal
          </h2>
          <p className="font-cormorant text-xl md:text-2xl text-white/70 italic font-light leading-relaxed">
            "A palace sculpted not merely of white marble and stone, but of reflections, evening breezes, and immortal sovereign grandeur."
          </p>
        </div>

        {/* 3D Specification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARCHITECTURAL_METRICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl glass-card p-8 border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Glowing Corner Badge */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-tr-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B101A] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:border-[#D4AF37] transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#D4AF37] tracking-tight">
                    {item.value}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-semibold text-[#FBF9F5] tracking-wide mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {item.title}
                </h3>
                <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
                  {item.subtitle}
                </h4>

                <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed font-light">
                  {item.description}
                </p>

                {/* Bottom Highlight Accent */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans tracking-widest text-[#D4AF37]/80 uppercase">
                  <span>Authentic Restoration</span>
                  <span className="font-mono">0{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
