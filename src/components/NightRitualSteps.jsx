import React, { useEffect, useRef } from 'react';
import { Moon, Sparkles, Feather } from 'lucide-react';
import { PRODUCT } from '../data/productData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NightRitualSteps() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  const steps = [
    {
      num: '01',
      title: 'PURIFY',
      subtitle: 'Prepare the Canvas',
      desc: 'Cleanse face thoroughly with lukewarm water and pat skin gently dry to open pores for maximum active reception.',
      icon: Feather,
      floatAnim: 'ritualFloat0 6s ease-in-out infinite'
    },
    {
      num: '02',
      title: 'ACTIVATE',
      subtitle: 'Warm Botanical Lipids',
      desc: 'Take a dime-sized amount of cream and warm it between clean fingertips for 3 seconds to activate the bio-active emulsion.',
      icon: Sparkles,
      floatAnim: 'ritualFloat1 6.8s ease-in-out 0.8s infinite'
    },
    {
      num: '03',
      title: 'MASSAGE & SLEEP',
      subtitle: 'Nocturnal Cocooning',
      desc: 'Gently smooth in upward circular motions across face and neck. Allow the velvet texture to repair and nourish overnight.',
      icon: Moon,
      floatAnim: 'ritualFloat2 6.2s ease-in-out 1.6s infinite'
    }
  ];

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.set(headerRef.current, { y: 25, opacity: 0, force3D: true });
      }

      gsap.set(cards, {
        y: 35,
        opacity: 0,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });

      if (headerRef.current) {
        tl.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        }, 0);
      }

      tl.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
      }, 0.12);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="ritual"
      className="relative w-full py-20 md:py-28 bg-[#F7F3E8] text-[#27352D] overflow-hidden border-b border-[#DDE2D8]"
    >
      <style>{`
        @keyframes ritualFloat0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2.5px); }
        }
        @keyframes ritualFloat1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes ritualFloat2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        .ritual-card-hover {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease-out, border-color 0.3s ease-out;
        }
        .ritual-card-hover:hover {
          transform: translateY(-5px) !important;
        }
      `}</style>

      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#E8EBDD]/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
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
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                ref={(el) => (cardRefs.current[idx] = el)}
                style={{ animation: s.floatAnim }}
                className="ritual-card-hover bg-white p-8 rounded-2xl relative overflow-hidden group border border-[#C9D2C2] hover:border-[#879B7A] shadow-[0_4px_20px_rgba(49,72,58,0.04)] hover:shadow-[0_14px_32px_rgba(49,72,58,0.08)] flex flex-col justify-between will-change-transform"
              >
                {/* Subtle border light sweep on hover */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A96A]/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A96A]/60 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl text-[#879B7A]/40 font-light group-hover:text-[#31483A] group-hover:translate-x-1 transition-all duration-300">
                      {s.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#E8EBDD] border border-[#C9D2C2] group-hover:border-[#31483A] group-hover:bg-[#31483A] group-hover:text-white flex items-center justify-center text-[#31483A] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 shadow-sm">
                      <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
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

                <div className="relative z-10 mt-8 pt-4 border-t border-[#C9D2C2] flex items-center justify-between text-[10px] font-mono text-[#879B7A] font-medium">
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
