import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Moon, ShieldCheck, Star } from 'lucide-react';
import { PRODUCT } from '../data/productData';

export default function Hero({ onShopNow, onExploreFormula }) {
  const [stage, setStage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 400);
    const t3 = setTimeout(() => setStage(3), 800);
    const t4 = setTimeout(() => setStage(4), 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen min-h-[750px] flex items-center justify-center overflow-hidden bg-[#1B0D07] pt-24 pb-16 md:py-0"
    >
      {/* Ambient Dark Espresso & Radial Golden Studio Background */}
      <div className="absolute inset-0 bg-espresso-radial pointer-events-none" />

      {/* Floating Golden Glow Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-[#C9A45C]/12 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-[#4A2818]/40 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[200px] h-[200px] bg-[#C9A45C]/8 rounded-full blur-[70px] pointer-events-none" />

      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" />

      {/* Main Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
          
          {/* Eyebrow Pill + Star Rating */}
          <div
            className={`flex flex-wrap items-center gap-3 mb-4 sm:mb-5 transition-all duration-1000 ease-out ${
              stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A45C]/35 bg-[#2A130A]/80 backdrop-blur-md shadow-sm">
              <Moon size={12} className="text-[#C9A45C]" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#E8D29A] font-medium">
                OVERNIGHT RESTORATIVE RITUAL
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#D9C2A3] font-mono">
              <div className="flex text-[#C9A45C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#C9A45C]" />
                ))}
              </div>
              <span className="text-[#F7F1E7] font-semibold">4.9</span>
              <span className="text-[#D9C2A3]/60">(1,420+ Reviews)</span>
            </div>
          </div>

          {/* Main Headline */}
          <div
            className={`transition-all duration-1000 ease-out mb-4 sm:mb-5 ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="block text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-[#C9A45C] font-semibold mb-1">
              REPAIR & RESTORE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[70px] font-light text-[#F7F1E7] leading-[1.05] tracking-[-0.015em]">
              Night Cream
            </h1>
          </div>

          {/* Supporting Copy */}
          <p
            className={`font-sans text-base sm:text-lg text-[#F7F1E7]/90 font-light max-w-lg leading-relaxed mb-3 sm:mb-4 transition-all duration-1000 ease-out ${
              stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Overnight care for skin that feels renewed by morning.
          </p>

          {/* Ingredient Sub-Callout */}
          <div
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wide text-[#E8D29A] mb-6 sm:mb-8 transition-all duration-1000 ease-out ${
              stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <Sparkles size={14} className="text-[#C9A45C]" />
            <span>With Niacinamide + Olive Leaf Extract</span>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 transition-all duration-1000 ease-out ${
              stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button
              onClick={onShopNow}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full gold-shimmer-btn text-[#1B0D07] text-xs font-bold tracking-[0.18em] uppercase shadow-2xl flex items-center justify-center gap-2 cursor-pointer border border-[#E8D29A]/50 group"
            >
              <span>SHOP NOW</span>
              <span className="font-mono text-xs opacity-85">— ₹899</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={onExploreFormula}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#2A130A]/70 hover:bg-[#3A1E11] text-[#F7F1E7] text-xs font-medium tracking-[0.16em] uppercase border border-[#C9A45C]/30 hover:border-[#C9A45C] transition-all cursor-pointer backdrop-blur-sm"
            >
              EXPLORE FORMULA
            </button>
          </div>

          {/* Premium Product Details Tagline */}
          <div
            className={`pt-5 border-t border-[#C9A45C]/20 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#D9C2A3]/80 font-mono transition-all duration-1000 ease-out ${
              stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              50 ml
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              Dermatologically Tested
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A45C]" />
              Suitable For All Skin Types
            </span>
          </div>

        </div>

        {/* Right Column: Hero Product Jar Visual with Studio Depth */}
        <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2">
          
          <div
            className={`relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] aspect-square flex items-center justify-center transition-all duration-1200 ease-out ${
              stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
            }}
          >
            {/* Ambient Golden Core Halo */}
            <div className="absolute inset-4 bg-[#C9A45C]/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
            
            {/* Soft Cream Highlight Flare */}
            <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-[#F7F1E7]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Glowing Particle Accents */}
            <div className="absolute top-10 left-12 w-2 h-2 rounded-full bg-[#E8D29A] shadow-[0_0_10px_#E8D29A] animate-float-slow" />
            <div className="absolute bottom-16 right-10 w-2.5 h-2.5 rounded-full bg-[#C9A45C] shadow-[0_0_12px_#C9A45C] animate-float-reverse" />
            <div className="absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-[#F7F1E7] shadow-[0_0_8px_#F7F1E7] animate-float-slow" />

            {/* Uploaded Primary Product Image */}
            <div className="relative z-10 w-full h-full flex items-center justify-center reflection-floor">
              <img
                src="/images/night_cream_jar.png"
                alt="DERMIVA Repair & Restore Night Cream 50ml Jar"
                className="w-full h-full object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] select-none will-change-transform"
                loading="eager"
              />
            </div>

            {/* Floating Clean Formula Badge */}
            <div className="absolute -bottom-2 -left-2 sm:left-4 z-20 bg-[#2A130A]/85 backdrop-blur-md border border-[#C9A45C]/35 px-3.5 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 animate-float-slow">
              <div className="w-6 h-6 rounded-full bg-[#C9A45C]/20 flex items-center justify-center text-[#C9A45C]">
                <ShieldCheck size={14} />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono text-[#C9A45C] tracking-widest uppercase block">
                  0% PARABENS & SULPHATES
                </span>
                <span className="text-[11px] font-sans font-medium text-[#F7F1E7]">
                  Clean Botanical Science
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={onExploreFormula}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-[#D9C2A3]/70 hover:text-[#C9A45C] transition-colors cursor-pointer bg-transparent border-none"
      >
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase">
          EXPLORE RITUAL
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#C9A45C] to-transparent animate-pulse" />
      </button>

    </section>
  );
}
