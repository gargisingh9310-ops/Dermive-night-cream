import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INGREDIENTS = [
  { id: 'aloe', name: 'Aloe Leaf Juice', icon: '/images/ingredient-aloe.png', category: 'Soothing Bio-Hydration' },
  { id: 'shea', name: 'Shea Butter', icon: '/images/ingredient-shea.png', category: 'Lipid Moisture Barrier' },
  { id: 'olive', name: 'Olive Leaf Extract', icon: '/images/ingredient-olive-leaf.png', category: 'Mediterranean Antioxidant' },
  { id: 'glycerin', name: 'Glycerin', icon: '/images/ingredient-glycerin.png', category: 'Pure Humectant' },
  { id: 'hyaluronic', name: 'Hyaluronic Acid', icon: '/images/ingredient-hyaluronic.png', category: 'Deep Cell Plumping' },
  { id: 'matrixyl', name: 'Matrixyl 3000', icon: '/images/ingredient-matrixyl.png', category: 'Restorative Peptides' },
  { id: 'vitaminc', name: 'Vitamin C', icon: '/images/ingredient-vitaminc.png', category: 'Radiance & Firmness' },
  { id: 'niacinamide', name: 'Niacinamide', icon: '/images/ingredient-niacinamide.png', category: 'Barrier Fortification' },
];

export default function TravelingProductStage() {
  // Phase 1: Entrance & Assembly of Separate Box + Cap
  const [isEntering, setIsEntering] = useState(false);
  const [animPhase, setAnimPhase] = useState('initial'); // 'initial' -> 'descending' -> 'cap-settled' -> 'orbiting'
  const [orbitEntering, setOrbitEntering] = useState(false);
  const [orbitTime, setOrbitTime] = useState(0);

  // Responsive dimensions for orbit items
  const [windowDims, setWindowDims] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const productContainerRef = useRef(null);
  const sparkleBurstRef = useRef(null);
  const boxCapLayerRef = useRef(null);
  const fullboxLayerRef = useRef(null);
  const orbitBackContainerRef = useRef(null);
  const orbitFrontContainerRef = useRef(null);

  // Track window size & refresh ScrollTrigger
  useEffect(() => {
    const handleResize = () => {
      setWindowDims({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. LUXURY ENTRANCE TIMELINE
  useEffect(() => {
    const tMount = setTimeout(() => {
      setIsEntering(true);
      setAnimPhase('descending');
    }, 60);

    // 1.85s: Cap gently lands onto the box
    const tCapLanded = setTimeout(() => {
      setAnimPhase('cap-settled');
    }, 1850);

    // 2.7s: Orbit rises smoothly from below
    const tOrbitRise = setTimeout(() => {
      setOrbitEntering(true);
      setAnimPhase('orbiting');
    }, 2700);

    return () => {
      clearTimeout(tMount);
      clearTimeout(tCapLanded);
      clearTimeout(tOrbitRise);
    };
  }, []);

  // Continuous Fluid Time-Based Orbit Animation Loop
  useEffect(() => {
    if (animPhase !== 'orbiting') return;

    let startTime = null;
    let frameId;
    const DURATION = 20000; // 20s continuous smooth rotation

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % DURATION) / DURATION;
      setOrbitTime(progress);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [animPhase]);

  // 2. MASTER SCROLL TIMELINE: Continuous Journey (Hero -> Benefits Hand [Palm] -> Smooth Gradual Fade-out)
  useEffect(() => {
    const productEl = productContainerRef.current;
    const boxCapEl = boxCapLayerRef.current;
    const fullboxEl = fullboxLayerRef.current;
    const orbitBackEl = orbitBackContainerRef.current;
    const orbitFrontEl = orbitFrontContainerRef.current;
    if (!productEl || !boxCapEl || !fullboxEl) return;

    const ctx = gsap.context(() => {
      // Dynamic responsive coordinates: Aligns directly with the palm of the Benefits Hand
      const getRightHandX = () => {
        const vw = window.innerWidth;
        if (vw < 768) return 0;
        if (vw < 1024) return vw * 0.24;
        return Math.min(vw * 0.25, 390);
      };

      const getTargetOverHandY = () => {
        const vh = window.innerHeight;
        const vw = window.innerWidth;
        return vw < 768 ? -vh * 0.02 : -vh * 0.035;
      };

      // Set initial centered state
      gsap.set(productEl, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        force3D: true,
      });

      gsap.set(boxCapEl, { opacity: 1, force3D: true });
      gsap.set(fullboxEl, { opacity: 0, force3D: true });

      if (orbitBackEl && orbitFrontEl) {
        gsap.set([orbitBackEl, orbitFrontEl], {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          opacity: 1,
          force3D: true,
        });

        // Orbit fades out smoothly on scroll away from Hero
        gsap.to([orbitBackEl, orbitFrontEl], {
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'center top',
            scrub: 0.4,
          },
          opacity: 0,
          y: -40,
          ease: 'power1.out',
        });
      }

      // MASTER TIMELINE: Hero -> Hand section -> Smooth Gradual Fade-out
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          endTrigger: '#benefits',
          end: 'bottom center',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // =========================================================================
      // 1. HERO -> BENEFITS SECTION (Center -> Right Hand Palm)
      //    Maintains exact movement, position, timing & animations before hand
      // =========================================================================
      masterTl
        .to(productEl, {
          x: () => getRightHandX(),
          y: () => getTargetOverHandY(),
          scale: () => (window.innerWidth < 768 ? 0.42 : 0.46),
          rotation: -1.0,
          ease: 'power1.inOut',
          duration: 1.0,
        }, 0)

        // Crossfade separate box + cap to assembled fullbox
        .to(boxCapEl, {
          opacity: 0,
          ease: 'power1.inOut',
          duration: 0.45,
        }, 0.25)
        .to(fullboxEl, {
          opacity: 1,
          ease: 'power1.inOut',
          duration: 0.45,
        }, 0.25);

      // =========================================================================
      // 2. AT HAND SECTION -> SLOW GRADUAL FADE-OUT
      //    Starts slowly fading out smoothly upon reaching the hand.
      //    Remains hidden for all sections below the hand.
      //    Smoothly fades back in on reverse scroll.
      // =========================================================================
      masterTl.to(productEl, {
        opacity: 0,
        ease: 'power1.inOut',
        duration: 0.8,
      }, 1.0);

    });

    return () => ctx.revert();
  }, []);

  // Responsive Orbit Dimensions
  const isMobile = windowDims.width < 640;
  const isTablet = windowDims.width >= 640 && windowDims.width < 1024;
  const radiusX = isMobile ? 185 : isTablet ? 305 : 420;
  const radiusY = isMobile ? 60 : isTablet ? 92 : 115;
  const rotationAngleRad = (-8 * Math.PI) / 180;
  const itemSize = isMobile ? 54 : isTablet ? 70 : 82;

  // REAL 3D ORBIT DATA
  const getIngredientOrbitData = (index, total) => {
    const baseAngle = (2 * Math.PI * index) / total;
    const currentAngle = baseAngle + orbitTime * 2 * Math.PI;

    const x0 = radiusX * Math.cos(currentAngle);
    const y0 = radiusY * Math.sin(currentAngle);

    const x = x0 * Math.cos(rotationAngleRad) - y0 * Math.sin(rotationAngleRad);
    const y = x0 * Math.sin(rotationAngleRad) + y0 * Math.cos(rotationAngleRad);

    const isBackHalf = y0 < 0;
    const depthRatio = y0 / radiusY;
    const scale = 0.88 + (depthRatio + 1) * 0.12;
    const brightness = isBackHalf ? 0.92 : 1.05;
    const opacity = isBackHalf ? (0.86 + (depthRatio + 1) * 0.07) : 1;

    return {
      x,
      y,
      isBackHalf,
      depthRatio,
      scale,
      brightness,
      opacity,
      style: {
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
        filter: `brightness(${brightness})`,
        opacity,
        transition: 'none',
      }
    };
  };

  const boxEntranceY = isEntering ? '0px' : '100vh';
  const capEntranceY = isEntering ? '0px' : '-100vh';

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. BACK 3D ORBIT LAYER (z-10: BEHIND PRODUCT AT z-30)          */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={orbitBackContainerRef}
        className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-10"
        style={{ zIndex: 10, willChange: 'transform, opacity' }}
      >
        <div
          className="w-full h-full pointer-events-none"
          style={{
            transform: orbitEntering ? 'translateY(0px) scale(1)' : 'translateY(70px) scale(0.94)',
            opacity: orbitEntering ? 1 : 0,
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Back Orbit Guide Ring */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: radiusX * 2,
              height: radiusY * 2,
              transform: 'translate(-50%, -50%) rotate(-8deg)',
              clipPath: 'polygon(-50% -50%, 150% -50%, 150% 50%, -50% 50%)',
            }}
          >
            <div className="w-full h-full rounded-full border border-[#879B7A]/35 shadow-[0_0_16px_rgba(201,169,106,0.15)]" />
          </div>

          {/* Back Half Ingredients */}
          {INGREDIENTS.map((ing, idx) => {
            const data = getIngredientOrbitData(idx, INGREDIENTS.length);
            if (!data.isBackHalf) return null;

            return (
              <div
                key={ing.id}
                className="absolute left-1/2 top-1/2 flex flex-col items-center pointer-events-none select-none"
                style={data.style}
              >
                <div
                  className="relative rounded-full p-2 bg-white/98 border-[1.5px] border-[#C9D2C2] ring-1 ring-[#C9A96A]/25 shadow-[0_6px_20px_rgba(49,72,58,0.10),0_0_12px_rgba(201,169,106,0.15)] backdrop-blur-md flex items-center justify-center"
                  style={{ width: itemSize, height: itemSize }}
                >
                  <img
                    src={ing.icon}
                    alt={ing.name}
                    className="w-full h-full object-contain rounded-full select-none drop-shadow-sm"
                    draggable={false}
                  />
                </div>
                <div className="mt-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/95 border border-[#C9D2C2] shadow-[0_2px_8px_rgba(49,72,58,0.06)] backdrop-blur-md whitespace-nowrap">
                  <span className="text-[10px] sm:text-[11.5px] font-sans text-[#31483A] tracking-wider uppercase font-semibold block leading-tight">
                    {ing.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE PERSISTENT TRAVELING PRODUCT STAGE (LAYER z-30: MIDDLE) */}
      {/* CLEAN AND CRISP — NO ARTIFICIAL GLOWING SHADOW ON RIGHT SIDE   */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={productContainerRef}
        className="absolute top-1/2 left-1/2 w-[325px] sm:w-[400px] lg:w-[465px] flex items-center justify-center pointer-events-none select-none z-30"
        style={{
          zIndex: 30,
          willChange: 'transform, opacity',
        }}
      >
        {/* PREMIUM SPARKLE BURST BEHIND PRODUCT (z-10: Strictly Behind Product at z-30) */}
        <div
          ref={sparkleBurstRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center select-none"
          style={{
            zIndex: 10,
            opacity: 0,
            transform: 'scale(0.72)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Soft Warm Champagne Radial Glow */}
          <div
            className="absolute w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,106,0.32) 0%, rgba(223,204,161,0.16) 42%, rgba(201,169,106,0) 72%)',
              filter: 'blur(22px)',
            }}
          />

          {/* Delicate 4-Point Star Glints along product contours */}
          <div className="absolute" style={{ top: '8%', right: '12%', transform: 'translate(50%, -50%)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(201,169,106,0.9)]">
              <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" fill="url(#champagneGlintGrad)" />
              <circle cx="12" cy="12" r="2" fill="#FFF8E7" />
            </svg>
          </div>

          <div className="absolute" style={{ top: '16%', left: '10%', transform: 'translate(-50%, -50%)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(201,169,106,0.85)]">
              <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" fill="url(#champagneGlintGrad)" />
              <circle cx="12" cy="12" r="1.8" fill="#FFF8E7" />
            </svg>
          </div>

          <div className="absolute" style={{ top: '38%', right: '4%', transform: 'translate(50%, -50%)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(223,204,161,0.85)]">
              <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" fill="url(#champagneGlintGrad)" />
            </svg>
          </div>

          <div className="absolute" style={{ top: '78%', left: '8%', transform: 'translate(-50%, -50%)' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_7px_rgba(201,169,106,0.85)]">
              <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" fill="url(#champagneGlintGrad)" />
              <circle cx="12" cy="12" r="1.6" fill="#FFF8E7" />
            </svg>
          </div>

          <div className="absolute" style={{ top: '82%', right: '10%', transform: 'translate(50%, -50%)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_6px_rgba(223,204,161,0.8)]">
              <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" fill="url(#champagneGlintGrad)" />
            </svg>
          </div>

          {/* Soft Champagne Micro-Particles */}
          {[
            { top: '6%', left: '38%', size: 3.5, color: '#C9A96A', shadow: '0 0 8px #C9A96A' },
            { top: '12%', left: '72%', size: 4.0, color: '#DFCCA1', shadow: '0 0 9px #DFCCA1' },
            { top: '22%', right: '6%', size: 3.0, color: '#FAF8F2', shadow: '0 0 7px #FAF8F2' },
            { top: '32%', left: '5%', size: 3.5, color: '#C9A96A', shadow: '0 0 8px #C9A96A' },
            { top: '48%', right: '2%', size: 4.0, color: '#DFCCA1', shadow: '0 0 9px #DFCCA1' },
            { top: '62%', left: '3%', size: 3.0, color: '#FAF8F2', shadow: '0 0 6px #FAF8F2' },
            { top: '72%', right: '5%', size: 3.5, color: '#C9A96A', shadow: '0 0 8px #C9A96A' },
            { top: '86%', left: '24%', size: 3.0, color: '#DFCCA1', shadow: '0 0 7px #DFCCA1' },
            { top: '90%', right: '28%', size: 3.5, color: '#C9A96A', shadow: '0 0 8px #C9A96A' },
            { top: '28%', right: '20%', size: 2.5, color: '#FAF8F2', shadow: '0 0 6px #FAF8F2' },
            { top: '68%', left: '18%', size: 2.5, color: '#DFCCA1', shadow: '0 0 6px #DFCCA1' },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                top: p.top,
                left: p.left,
                right: p.right,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: p.shadow,
              }}
            />
          ))}

          {/* SVG Gradient Defs */}
          <svg width="0" height="0" className="absolute pointer-events-none">
            <defs>
              <linearGradient id="champagneGlintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8E7" />
                <stop offset="50%" stopColor="#DFCCA1" />
                <stop offset="100%" stopColor="#C9A96A" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* A) INITIAL SEPARATE BOX + CAP LAYER (Hero Assembly & Orbit) */}
        <div
          ref={boxCapLayerRef}
          className="relative z-30 w-full flex flex-col items-center justify-center pointer-events-none"
          style={{
            opacity: 1,
            willChange: 'opacity',
          }}
        >
          {/* Cap (z-30) */}
          <div
            className="relative z-30 w-full aspect-[1000/209]"
            style={{
              transform: `translateY(${capEntranceY})`,
              transition: 'transform 1.85s cubic-bezier(0.14, 0.95, 0.26, 1.0)',
            }}
          >
            <img
              src="/cap.png"
              alt="DERMIVA Cap"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Box (z-20) */}
          <div
            className="relative z-20 w-full aspect-[727/343] -mt-3 sm:-mt-4"
            style={{
              transform: `translateY(${boxEntranceY})`,
              transition: 'transform 1.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src="/box.png"
              alt="DERMIVA Box Body"
              className="w-full h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>

        {/* B) SEAMLESS ASSEMBLED FULLBOX PRODUCT (/public/fullbox.png at z-30) */}
        <div
          ref={fullboxLayerRef}
          className="absolute inset-0 z-30 w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            opacity: 0,
            willChange: 'opacity',
          }}
        >
          <img
            src="/fullbox.png"
            alt="DERMIVA Repair & Restore Night Cream"
            className="w-full h-auto object-contain select-none pointer-events-none"
            draggable={false}
          />
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FRONT 3D ORBIT LAYER (z-40: IN FRONT OF PRODUCT AT z-30)    */}
      {/* ------------------------------------------------------------- */}
      <div
        ref={orbitFrontContainerRef}
        className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none z-40"
        style={{ zIndex: 40, willChange: 'transform, opacity' }}
      >
        <div
          className="w-full h-full pointer-events-none"
          style={{
            transform: orbitEntering ? 'translateY(0px) scale(1)' : 'translateY(70px) scale(0.94)',
            opacity: orbitEntering ? 1 : 0,
            transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Front Orbit Guide Ring */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: radiusX * 2,
              height: radiusY * 2,
              transform: 'translate(-50%, -50%) rotate(-8deg)',
              clipPath: 'polygon(-50% 50%, 150% 50%, 150% 150%, -50% 150%)',
            }}
          >
            <div className="w-full h-full rounded-full border border-[#C9A96A]/45 shadow-[0_0_20px_rgba(135,155,122,0.22)]" />
          </div>

          {/* Front Half Ingredients */}
          {INGREDIENTS.map((ing, idx) => {
            const data = getIngredientOrbitData(idx, INGREDIENTS.length);
            if (data.isBackHalf) return null;

            return (
              <div
                key={ing.id}
                className="absolute left-1/2 top-1/2 flex flex-col items-center pointer-events-none select-none"
                style={data.style}
              >
                <div
                  className="relative rounded-full p-2 bg-white/98 border-[1.5px] border-[#C9D2C2] ring-1 ring-[#C9A96A]/35 shadow-[0_8px_24px_rgba(49,72,58,0.12),0_0_16px_rgba(201,169,106,0.22)] backdrop-blur-md flex items-center justify-center"
                  style={{ width: itemSize, height: itemSize }}
                >
                  <img
                    src={ing.icon}
                    alt={ing.name}
                    className="w-full h-full object-contain rounded-full select-none drop-shadow-sm"
                    draggable={false}
                  />
                </div>
                <div className="mt-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/95 border border-[#C9D2C2] shadow-[0_3px_10px_rgba(49,72,58,0.08)] backdrop-blur-md whitespace-nowrap">
                  <span className="text-[10px] sm:text-[11.5px] font-sans text-[#31483A] tracking-wider uppercase font-semibold block leading-tight">
                    {ing.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
