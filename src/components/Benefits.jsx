import React from 'react';
import { Droplets, ShieldCheck, Sparkles, Check } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      id: '01',
      number: '01',
      title: 'Deep Hydration',
      tag: 'MOISTURE INFUSION',
      desc: 'Pure Hyaluronic Acid and natural humectants lock in restorative moisture throughout the night, replenishing volume and suppleness while you sleep.',
      icon: Droplets,
      iconBg: 'bg-[#E8EBDD]',
      iconColor: 'text-[#31483A]',
      glowColor: 'rgba(49, 72, 58, 0.08)',
    },
    {
      id: '02',
      number: '02',
      title: 'Soothes Irritated Skin',
      tag: 'BARRIER CALMING',
      desc: 'Cold-pressed Mediterranean Olive Leaf extract and pure Shea butter neutralize daily environmental stress, calming redness and fortifying the lipid barrier.',
      icon: ShieldCheck,
      iconBg: 'bg-[#E8EBDD]',
      iconColor: 'text-[#31483A]',
      glowColor: 'rgba(135, 155, 122, 0.12)',
    },
    {
      id: '03',
      number: '03',
      title: 'Promotes Skin Healing',
      tag: 'CELLULAR RENEWAL',
      desc: 'Restorative Matrixyl 3000 peptides and antioxidant Vitamins C & E work in harmony with nighttime repair cycles to boost collagen synthesis and elasticity.',
      icon: Sparkles,
      iconBg: 'bg-[#E8EBDD]',
      iconColor: 'text-[#31483A]',
      glowColor: 'rgba(201, 169, 106, 0.12)',
    },
  ];

  return (
    <div id="benefits-wrapper" className="relative w-full">
      <section
        id="benefits"
        className="relative w-full min-h-screen py-20 sm:py-24 md:py-28 bg-[#E8EBDD] text-[#27352D] overflow-hidden flex items-center justify-center transition-colors duration-700"
      >
        {/* Soft Luxury Ambient Background Textures */}
        <div className="absolute inset-0 bg-[radial-gradient(#879B7A_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-[0.10] pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#F7F3E8]/80 rounded-full blur-[90px] pointer-events-none" />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full relative z-10">
          
          {/* Grid Layout: Left Content takes ~53-55% width, Right Space is open for Hand & Product */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ========================================================= */}
            {/* LEFT SIDE: Wider White Benefit Cards (~53-55% width)       */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 xl:col-span-7 max-w-[640px] xl:max-w-[680px] w-full flex flex-col justify-center">
              
              {/* Section Eyebrow & Title */}
              <div className="mb-6 sm:mb-7">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-5 h-[1.5px] bg-[#31483A]" />
                  <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.24em] text-[#31483A] uppercase font-semibold">
                    CLINICAL EFFICACY & RENEWAL
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#31483A] tracking-tight leading-[1.15]">
                  Repair While You Rest
                </h2>
                <p className="mt-2 text-xs sm:text-[13px] font-sans text-[#69736A] max-w-lg font-light leading-snug">
                  Scientifically engineered to work in synergy with your skin’s nocturnal circadian rhythm for visible morning radiance.
                </p>
              </div>

              {/* 3 Wider White Benefit Cards Stacked Vertically */}
              <div className="space-y-4 sm:space-y-4.5 w-full">
                {benefits.map((b) => {
                  const IconComponent = b.icon;

                  return (
                    <div
                      key={b.id}
                      className="group relative w-full p-4.5 sm:p-5 rounded-2xl bg-white/90 hover:bg-white border border-[#C9D2C2] hover:border-[#879B7A] shadow-[0_4px_16px_rgba(49,72,58,0.04)] hover:shadow-[0_10px_25px_rgba(49,72,58,0.07)] transition-all duration-300 flex items-start gap-4 sm:gap-4.5"
                    >
                      {/* Circular Macro Emblem / Icon */}
                      <div className="relative shrink-0">
                        <div
                          className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full ${b.iconBg} border border-[#C9D2C2] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm`}
                          style={{
                            boxShadow: `0 6px 18px ${b.glowColor}`,
                          }}
                        >
                          <IconComponent size={20} className={b.iconColor} />
                        </div>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#31483A] text-white text-[9px] font-mono font-bold flex items-center justify-center border border-[#879B7A]/40 shadow-sm">
                          {b.number}
                        </span>
                      </div>

                      {/* Benefit Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[9.5px] font-mono tracking-widest text-[#879B7A] uppercase font-semibold">
                            {b.tag}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl text-[#31483A] font-medium tracking-tight mb-1 group-hover:text-[#24372B] transition-colors">
                          {b.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-[13px] text-[#69736A] font-light leading-relaxed">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clinical Footnote */}
              <div className="mt-6 pt-4 border-t border-[#C9D2C2] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#69736A]">
                <div className="flex items-center gap-1.5">
                  <Check size={13} className="text-[#31483A]" />
                  <span>DERMATOLOGICALLY EVALUATED</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={13} className="text-[#31483A]" />
                  <span>CLEAN BOTANICAL BIO-ACTIVES</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={13} className="text-[#31483A]" />
                  <span>ALL SKIN TYPES</span>
                </div>
              </div>

            </div>

            {/* ========================================================= */}
            {/* RIGHT SIDE: Dedicated Open Visual Zone for Product & Hand  */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] pointer-events-none" />

          </div>

        </div>

        {/* ============================================================= */}
        {/* THE EXISTING HAND VISUAL (/public/hand.png)                    */}
        {/* Moved UP into the section, vertically aligned on the RIGHT    */}
        {/* ============================================================= */}
        <div
          className="absolute top-1/2 -translate-y-[45%] right-0 lg:right-0 xl:right-4 z-10 w-[360px] sm:w-[460px] md:w-[520px] lg:w-[580px] xl:w-[640px] max-w-[52vw] pointer-events-none select-none flex items-center justify-end"
        >
          <img
            src="/hand.png"
            alt="Skin Application Hand"
            className="w-full h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

      </section>
    </div>
  );
}
