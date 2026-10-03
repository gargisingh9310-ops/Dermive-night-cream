import React, { useState } from 'react';
import { Sparkles, Leaf, Droplets, ArrowRight } from 'lucide-react';
import { PRODUCT } from '../data/productData';
import { useElementScroll } from '../hooks/useScrollTrigger';

export default function ProductScrollShowcase({ onShopNow }) {
  const [ref, isVisible, progress] = useElementScroll({ threshold: 0.15 });
  const [activeCallout, setActiveCallout] = useState(0);

  // Parallax subtle float
  const productY = (progress - 0.5) * -35;
  const productScale = 0.95 + Math.min(progress * 0.1, 0.1);

  const callouts = [
    {
      id: 'niacinamide',
      number: '01',
      title: 'NIACINAMIDE',
      subtitle: 'Vitamin B3 Barrier Science',
      desc: 'Helps support a smoother, more even-looking complexion while fortifying the lipid barrier to prevent nocturnal water loss.',
      icon: Sparkles,
      position: 'top-left', // Top-left of jar
      coords: { x: '15%', y: '28%' }
    },
    {
      id: 'olive-leaf',
      number: '02',
      title: 'OLIVE LEAF EXTRACT',
      subtitle: 'Mediterranean Bio-Antioxidant',
      desc: 'A rich botanical extract concentrated with oleuropein polyphenols, selected to accelerate deep restorative nocturnal repair.',
      icon: Leaf,
      position: 'top-right', // Top-right of jar
      coords: { x: '82%', y: '25%' }
    },
    {
      id: 'rich-texture',
      number: '03',
      title: 'RICH CREAM TEXTURE',
      subtitle: 'Whipped Velvet Nourishment',
      desc: 'A luxurious, non-greasy velvet cream designed to cocoon the skin and deliver continuous micro-nourishment through the night.',
      icon: Droplets,
      position: 'bottom-center', // Bottom-center
      coords: { x: '50%', y: '85%' }
    }
  ];

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative w-full py-20 md:py-32 bg-[#2A130A] text-[#F7F1E7] overflow-hidden border-y border-[#C9A45C]/20"
    >
      {/* Ambient Lighting Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A45C]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#C9A45C]" />
            <span className="text-[11px] font-mono tracking-[0.28em] text-[#C9A45C] uppercase">
              RESTORATIVE SYNERGY
            </span>
            <span className="w-6 h-[1px] bg-[#C9A45C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F7F1E7] tracking-tight leading-[1.1] mb-4">
            Your Nightly Repair Ritual
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#D9C2A3] font-light max-w-xl mx-auto leading-relaxed">
            Three core elements engineered to harmonize with your nocturnal skin rhythm.
          </p>
        </div>

        {/* Central Floating Showcase Composition */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[500px] sm:min-h-[580px] flex items-center justify-center">
          
          {/* Connecting Hairline SVG Lines (Desktop) */}
          <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Line to Callout 01 (Top Left) */}
            <path
              d="M 280 200 L 420 280"
              stroke="#C9A45C"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            {/* Line to Callout 02 (Top Right) */}
            <path
              d="M 740 190 L 600 270"
              stroke="#C9A45C"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            {/* Line to Callout 03 (Bottom) */}
            <path
              d="M 510 490 L 510 400"
              stroke="#C9A45C"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
          </svg>

          {/* Central Product Jar Visual with Parallax Float */}
          <div
            className="relative z-10 w-64 sm:w-80 md:w-96 aspect-square flex items-center justify-center transition-transform duration-700 ease-out"
            style={{
              transform: `translateY(${productY}px) scale(${productScale})`
            }}
          >
            {/* Ambient Golden Core Backlight */}
            <div className="absolute inset-2 bg-[#C9A45C]/25 rounded-full blur-2xl pointer-events-none animate-pulse-slow" />
            
            {/* Product Image */}
            <img
              src="/images/night_cream_jar.png"
              alt="DERMIVA Night Cream Formula Architecture"
              className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none"
              loading="lazy"
            />

            {/* Interactive Pulse Pin on Jar (Niacinamide) */}
            <div className="absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
              <span className="w-4 h-4 rounded-full bg-[#C9A45C] flex items-center justify-center beacon-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B0D07]" />
              </span>
            </div>

            {/* Interactive Pulse Pin on Jar (Olive Leaf) */}
            <div className="absolute top-[32%] right-[20%] translate-x-1/2 -translate-y-1/2 cursor-pointer group">
              <span className="w-4 h-4 rounded-full bg-[#C9A45C] flex items-center justify-center beacon-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1B0D07]" />
              </span>
            </div>
          </div>

          {/* Callout 01: Niacinamide (Desktop: Top Left) */}
          <div className="lg:absolute lg:top-8 lg:left-0 z-20 w-full lg:max-w-xs mt-6 lg:mt-0">
            <div
              onClick={() => setActiveCallout(0)}
              className={`glass-card p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeCallout === 0
                  ? 'border-[#C9A45C] bg-[#3A1E11]/80 shadow-[0_0_30px_rgba(201,164,92,0.2)]'
                  : 'hover:border-[#C9A45C]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#C9A45C] font-bold">01</span>
                  <h4 className="font-serif text-base sm:text-lg text-[#F7F1E7] font-semibold">
                    NIACINAMIDE
                  </h4>
                </div>
                <Sparkles size={16} className="text-[#C9A45C]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#D9C2A3] uppercase block mb-2">
                VITAMIN B3 COMPLEX
              </span>
              <p className="font-sans text-xs text-[#F7F1E7]/80 leading-relaxed font-light">
                Helps support a smoother, more even-looking complexion and reinforces moisture retention.
              </p>
            </div>
          </div>

          {/* Callout 02: Olive Leaf Extract (Desktop: Top Right) */}
          <div className="lg:absolute lg:top-6 lg:right-0 z-20 w-full lg:max-w-xs mt-4 lg:mt-0">
            <div
              onClick={() => setActiveCallout(1)}
              className={`glass-card p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                activeCallout === 1
                  ? 'border-[#C9A45C] bg-[#3A1E11]/80 shadow-[0_0_30px_rgba(201,164,92,0.2)]'
                  : 'hover:border-[#C9A45C]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#C9A45C] font-bold">02</span>
                  <h4 className="font-serif text-base sm:text-lg text-[#F7F1E7] font-semibold">
                    OLIVE LEAF EXTRACT
                  </h4>
                </div>
                <Leaf size={16} className="text-[#C9A45C]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#D9C2A3] uppercase block mb-2">
                BOTANICAL BIO-DEFENSE
              </span>
              <p className="font-sans text-xs text-[#F7F1E7]/80 leading-relaxed font-light">
                A botanical extract selected for the restorative formula to calm stress and replenish vital antioxidants.
              </p>
            </div>
          </div>

          {/* Callout 03: Rich Cream Texture (Desktop: Bottom Center) */}
          <div className="lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-20 w-full lg:max-w-md mt-4 lg:mt-0">
            <div
              onClick={() => setActiveCallout(2)}
              className={`glass-card p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 text-center ${
                activeCallout === 2
                  ? 'border-[#C9A45C] bg-[#3A1E11]/80 shadow-[0_0_30px_rgba(201,164,92,0.2)]'
                  : 'hover:border-[#C9A45C]/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xs font-mono text-[#C9A45C] font-bold">03</span>
                <h4 className="font-serif text-base sm:text-lg text-[#F7F1E7] font-semibold">
                  RICH CREAM TEXTURE
                </h4>
                <Droplets size={16} className="text-[#C9A45C]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#D9C2A3] uppercase block mb-2">
                WHIPPED NON-GREASY VELVET
              </span>
              <p className="font-sans text-xs text-[#F7F1E7]/80 leading-relaxed font-light max-w-sm mx-auto">
                A luxurious texture designed for overnight nourishment that melts instantly into the skin.
              </p>
            </div>
          </div>

        </div>

        {/* Action Link to Purchase */}
        <div className="mt-14 text-center">
          <button
            onClick={onShopNow}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#E8D29A] hover:text-[#C9A45C] transition-colors py-2 border-b border-[#C9A45C]/40 hover:border-[#C9A45C] bg-transparent cursor-pointer"
          >
            <span>EXPERIENCE OVERNIGHT RESTORATION</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
