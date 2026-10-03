import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroInteractiveExperience() {
  const topRightRef = useRef(null);
  const leftBottomRef = useRef(null);

  useEffect(() => {
    // One-Time Hero Intro Animation: Initial visible hold, followed by 5-second backward exit fade
    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        delay: 1.4, // Initial hold: Both images STAY clearly visible and stationary for 1.4s first
      });

      // Top-Right Branch: 5-second smooth exit moving backward/right
      if (topRightRef.current) {
        introTl.fromTo(
          topRightRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
          },
          {
            opacity: 0,
            scale: 0.75,
            x: 45,
            y: -30,
            filter: 'blur(6px)',
            duration: 5.0,
            ease: 'power2.out',
            onComplete: () => {
              if (topRightRef.current) {
                topRightRef.current.style.display = 'none';
              }
            },
          },
          0
        );
      }

      // Left-Bottom Branch: 5-second smooth exit moving backward/left
      if (leftBottomRef.current) {
        introTl.fromTo(
          leftBottomRef.current,
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
          },
          {
            opacity: 0,
            scale: 0.75,
            x: -45,
            y: 30,
            filter: 'blur(6px)',
            duration: 5.0,
            ease: 'power2.out',
            onComplete: () => {
              if (leftBottomRef.current) {
                leftBottomRef.current.style.display = 'none';
              }
            },
          },
          0
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-[#F7F3E8] text-[#27352D] overflow-hidden flex items-center justify-center"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. REFINED EDITORIAL BACKGROUND WATERMARK ("DERMIVA") (z-1)   */}
      {/* Clean background behind intro images, watermark centered       */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-1 select-none overflow-hidden px-6">
        <span className="font-serif font-semibold text-[17vw] sm:text-[15.5vw] md:text-[14vw] lg:text-[13vw] leading-none tracking-[0.07em] sm:tracking-[0.09em] text-[#31483A] opacity-[0.08] transform -translate-y-1 select-none text-center whitespace-nowrap">
          DERMIVA
        </span>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. INITIAL HERO INTRO BOTANICAL CORNER ASSETS (z-2)           */}
      {/* ------------------------------------------------------------- */}
      {/* Top-Right Start Image */}
      <div
        ref={topRightRef}
        className="absolute top-0 right-0 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] max-w-[45vw] pointer-events-none select-none z-2 origin-top-right"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        <img
          src="/top-right-start.png"
          alt=""
          className="w-full h-auto object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Left-Bottom Start Image */}
      <div
        ref={leftBottomRef}
        className="absolute bottom-0 left-0 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] max-w-[45vw] pointer-events-none select-none z-2 origin-bottom-left"
        style={{ willChange: 'transform, opacity, filter' }}
      >
        <img
          src="/left-bottom-start.png"
          alt=""
          className="w-full h-auto object-contain select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Subtle Film Grain (z-3) */}
      <div className="grain-overlay z-3" />

    </section>
  );
}
