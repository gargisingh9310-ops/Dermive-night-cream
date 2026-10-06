import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import { PRODUCT } from '../data/productData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTA({ onShopNow }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [badgeRef.current, headingRef.current, textRef.current, ctaBtnRef.current, trustRef.current].filter(Boolean);
      
      gsap.set(elements, {
        y: 28,
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

      tl.to(elements, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 bg-[#F7F3E8] text-[#27352D] overflow-hidden flex items-center justify-center text-center border-b border-[#DDE2D8]"
    >
      
      {/* Background Subtle Sage Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E8EBDD]/70 rounded-full blur-[130px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        {/* Floating Botanical Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9D2C2] bg-white backdrop-blur-md mb-6 shadow-sm"
        >
          <Leaf size={13} className="text-[#31483A]" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.26em] uppercase text-[#31483A] font-semibold">
            BEGIN YOUR NOCTURNAL RENEWAL
          </span>
        </div>

        {/* Main Headline */}
        <h2
          ref={headingRef}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#31483A] tracking-tight leading-[1.08] mb-6"
        >
          Wake Up to Skin That
          <br />
          <span className="italic font-light text-[#879B7A]">Feels Restored.</span>
        </h2>

        {/* Supporting Line */}
        <p
          ref={textRef}
          className="font-sans text-base sm:text-lg text-[#69736A] font-light max-w-xl mb-10 leading-relaxed"
        >
          Make overnight repair part of your daily ritual. Clean ingredients, pure botanical science, and visible morning radiance.
        </p>

        {/* Primary Action Button */}
        <div ref={ctaBtnRef} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onShopNow}
            className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#31483A] hover:bg-[#24372B] text-white text-xs font-semibold tracking-[0.2em] uppercase shadow-xl shadow-[#31483A]/20 flex items-center justify-center gap-2.5 cursor-pointer border border-[#31483A] transition-all group"
          >
            <span>SHOP THE NIGHT CREAM</span>
            <span className="font-mono opacity-85">— ₹899</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Reassurance Badges */}
        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-[11px] font-mono text-[#69736A]"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#31483A]" />
            50 ml Luxury Jar
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#31483A]" />
            Niacinamide + Olive Leaf
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#879B7A]" />
            Dermatologically Tested
          </span>
        </div>

      </div>
    </section>
  );
}
