import React from 'react';
import { Moon, Sparkles, Feather } from 'lucide-react';
import { PRODUCT } from '../data/productData';

export default function NightRitualSteps() {
  const steps = [
    {
      num: '01',
      title: 'PURIFY',
      subtitle: 'Prepare the Canvas',
      desc: 'Cleanse face thoroughly with lukewarm water and pat skin gently dry to open pores for maximum active reception.',
      icon: Feather
    },
    {
      num: '02',
      title: 'ACTIVATE',
      subtitle: 'Warm Botanical Lipids',
      desc: 'Take a dime-sized amount of cream and warm it between clean fingertips for 3 seconds to activate the bio-active emulsion.',
      icon: Sparkles
    },
    {
      num: '03',
      title: 'MASSAGE & SLEEP',
      subtitle: 'Nocturnal Cocooning',
      desc: 'Gently smooth in upward circular motions across face and neck. Allow the velvet texture to repair and nourish overnight.',
      icon: Moon
    }
  ];

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#F7F3E8] text-[#27352D] overflow-hidden border-b border-[#DDE2D8]">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#E8EBDD]/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-[0.28em] text-[#879B7A] uppercase block mb-3 font-semibold">
            EVENING APPLICATION
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#31483A] tracking-tight mb-4">
            The 3-Step Nightly Ritual
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#69736A] font-light leading-relaxed">
            Three minutes before sleep to unlock deep overnight renewal.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-white p-8 rounded-2xl relative overflow-hidden group border border-[#C9D2C2] hover:border-[#879B7A] shadow-[0_4px_20px_rgba(49,72,58,0.04)] hover:shadow-[0_10px_28px_rgba(49,72,58,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl text-[#879B7A]/40 font-light group-hover:text-[#31483A] transition-colors">
                      {s.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#E8EBDD] border border-[#C9D2C2] flex items-center justify-center text-[#31483A]">
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#31483A] font-normal mb-1">
                    {s.title}
                  </h3>
                  <span className="text-[10px] font-mono tracking-wider text-[#879B7A] uppercase block mb-3 font-semibold">
                    {s.subtitle}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-[#69736A] font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#C9D2C2] flex items-center justify-between text-[10px] font-mono text-[#879B7A] font-medium">
                  <span>STEP {s.num} OF 03</span>
                  <span>NIGHTLY CARE</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
