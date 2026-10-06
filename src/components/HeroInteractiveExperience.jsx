import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import StrokeText from './StrokeText';

export default function HeroInteractiveExperience() {
  const topRightRef = useRef(null);
  const leftBottomRef = useRef(null);
  const [isIntroReady, setIsIntroReady] = useState(false);

  // Watermark complete handler: Phase 1 ends -> Phase 2 (0.38s delay) -> Phase 3 & 4 begin
  const handleWatermarkComplete = () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('dermiva-hero-intro-start'));
      setIsIntroReady(true);
    }, 380); // 0.38s pause (speed up by ~35%)
  };

  // Fallback timer if event or interaction needs backup
  useEffect(() => {
    const handleIntroEvent = () => setIsIntroReady(true);
    window.addEventListener('dermiva-hero-intro-start', handleIntroEvent, { once: true });

    const fallbackTimer = setTimeout(() => {
      setIsIntroReady(true);
    }, 2100);

    return () => {
      window.removeEventListener('dermiva-hero-intro-start', handleIntroEvent);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Phase 4: Decorative corner elements animate only AFTER watermark + delay
  useEffect(() => {
    if (!isIntroReady) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        delay: 0,
      });

      // Top-Right Branch: 0.95s hold, followed by 3.5-second smooth exit moving backward/right
      if (topRightRef.current) {
        introTl
          .fromTo(
            topRightRef.current,
            {
              opacity: 0,
              scale: 1,
              x: 0,
              y: 0,
              filter: 'blur(0px)',
            },
            {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out',
            },
            0
          )
          .to(
            topRightRef.current,
            {
              opacity: 0,
              scale: 0.75,
              x: 45,
              y: -30,
              filter: 'blur(6px)',
              duration: 3.5,
              ease: 'power2.out',
              onComplete: () => {
                if (topRightRef.current) {
                  topRightRef.current.style.display = 'none';
                }
              },
            },
            0.95 // After 0.95s initial hold
          );
      }

      // Left-Bottom Branch: 0.95s hold, followed by 3.5-second smooth exit moving backward/left
      if (leftBottomRef.current) {
        introTl
          .fromTo(
            leftBottomRef.current,
            {
              opacity: 0,
              scale: 1,
              x: 0,
              y: 0,
              filter: 'blur(0px)',
            },
            {
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out',
            },
            0
          )
          .to(
            leftBottomRef.current,
            {
              opacity: 0,
              scale: 0.75,
              x: -45,
              y: 30,
              filter: 'blur(6px)',
              duration: 3.5,
              ease: 'power2.out',
              onComplete: () => {
                if (leftBottomRef.current) {
                  leftBottomRef.current.style.display = 'none';
                }
              },
            },
            0.95 // After 0.95s initial hold
          );
      }
    });

    return () => ctx.revert();
  }, [isIntroReady]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] max-h-[1080px] bg-[#F7F3E8] text-[#27352D] overflow-hidden flex items-center justify-center"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. REFINED EDITORIAL BACKGROUND WATERMARK ("DERMIVA") (z-1)   */}
      {/* Clean background behind intro images, watermark centered       */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-1 select-none overflow-hidden px-4 sm:px-6">
        <div className="w-full max-w-[1300px] flex items-center justify-center opacity-[0.08] transform -translate-y-1">
          <StrokeText
            text="DERMIVA"
            fillMode="wipe"
            trigger="mount"
            strokeColor="#31483A"
            fillColor="#31483A"
            strokeWidth={1.5}
            duration={1.55}
            delay={0.08}
            onComplete={handleWatermarkComplete}
            className="w-full"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. INITIAL HERO INTRO BOTANICAL CORNER ASSETS (z-2)           */}
      {/* Hidden until watermark + delay complete, then animate entrance */}
      {/* ------------------------------------------------------------- */}
      {/* Top-Right Start Image */}
      <div
        ref={topRightRef}
        className="absolute top-0 right-0 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] max-w-[45vw] pointer-events-none select-none z-2 origin-top-right opacity-0"
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
        className="absolute bottom-0 left-0 w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] max-w-[45vw] pointer-events-none select-none z-2 origin-bottom-left opacity-0"
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

