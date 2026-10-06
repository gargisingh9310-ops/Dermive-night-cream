import React, { useEffect, useRef } from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { PRODUCT } from '../data/productData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CustomerReviews() {
  const reviews = PRODUCT.reviews;
  // Seamless loop with 2 identical copies of the 8 reviews
  const fullReviewList = [...reviews, ...reviews];

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselContainerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !carouselContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial states for header & carousel
      gsap.set(headerRef.current, {
        y: 30,
        opacity: 0,
        force3D: true,
      });

      gsap.set(carouselContainerRef.current, {
        y: 45,
        opacity: 0,
        force3D: true,
      });

      // Master Entrance Timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
        },
      });

      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
      })
      .to(carouselContainerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
      }, '-=0.4');

      // Subtle Scroll Parallax (organic motion across section scroll)
      gsap.to(carouselContainerRef.current, {
        x: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="reviews"
      className="relative w-full py-20 md:py-28 bg-[#E8EBDD] text-[#27352D] overflow-hidden border-b border-[#DDE2D8]"
    >
      <style>{`
        @keyframes reviewMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .review-track {
          display: flex;
          width: max-content;
          animation: reviewMarquee 45s linear infinite;
          will-change: transform;
        }

        .review-track-wrapper:hover .review-track {
          animation-play-state: paused;
        }
      `}</style>

      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-white/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-1.5 text-[#C9A96A] mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-[#C9A96A]" />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#31483A] tracking-tight mb-2">
            Verified Overnight Results
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#69736A]">
            4.9 / 5 Average Rating based on 1,420+ Verified Purchases
          </p>
        </div>

      </div>

      {/* Infinite Auto-Scroll Reviews Carousel (Full bleed with edge gradients) */}
      <div 
        ref={carouselContainerRef}
        className="review-track-wrapper relative w-full overflow-hidden will-change-transform py-4 -my-4"
      >
        {/* Left & Right Luxury Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 md:w-36 bg-gradient-to-r from-[#E8EBDD] via-[#E8EBDD]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 md:w-36 bg-gradient-to-l from-[#E8EBDD] via-[#E8EBDD]/80 to-transparent z-20" />

        {/* Continuous Auto-Scrolling Track */}
        <div className="review-track flex items-stretch gap-6 pl-6">
          {fullReviewList.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[310px] sm:w-[370px] md:w-[410px] shrink-0 relative bg-white p-7 sm:p-8 rounded-2xl flex flex-col justify-between border border-[#C9D2C2] hover:border-[#879B7A] shadow-[0_4px_20px_rgba(49,72,58,0.04)] hover:shadow-[0_16px_36px_rgba(49,72,58,0.09)] transition-all duration-350 ease-out hover:-translate-y-1.5 hover:scale-[1.015] group overflow-hidden will-change-transform select-none"
            >
              {/* Subtle Luxury Border Light Sweep */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A96A]/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9A96A]/70 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out" />
              </div>

              {/* Elegant Watermark Quote Accent */}
              <div className="absolute -top-2 -right-1 text-[#879B7A]/10 pointer-events-none select-none group-hover:text-[#879B7A]/20 transition-colors duration-300">
                <Quote size={76} className="rotate-180" />
              </div>

              <div className="relative z-10">
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C9A96A] gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="inline-block transition-transform duration-300 group-hover:scale-110"
                      >
                        <Star size={13} className="fill-[#C9A96A]" />
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#31483A] bg-[#E8EBDD] px-2.5 py-0.5 rounded-full border border-[#C9D2C2] font-semibold shadow-xs">
                    <CheckCircle2 size={10} className="text-[#31483A]" />
                    <span>VERIFIED BUYER</span>
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg text-[#31483A] font-semibold mb-2.5 leading-snug group-hover:text-[#24372B] transition-colors">
                  "{rev.title}"
                </h4>

                <p className="font-sans text-xs sm:text-sm text-[#69736A] font-light leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-[#C9D2C2] flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#31483A] block">{rev.author}</span>
                  <span className="text-[10px] font-mono text-[#69736A]">{rev.skinType}</span>
                </div>
                <span className="text-[10px] font-mono text-[#879B7A] font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
