import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { PRODUCT } from '../data/productData';

export default function CustomerReviews() {
  const reviews = PRODUCT.reviews;

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#E8EBDD] text-[#27352D] overflow-hidden border-b border-[#DDE2D8]">
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-white/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-2xl flex flex-col justify-between border border-[#C9D2C2] hover:border-[#879B7A] shadow-[0_4px_20px_rgba(49,72,58,0.04)] hover:shadow-[0_10px_28px_rgba(49,72,58,0.08)] transition-all duration-300"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#C9A96A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#C9A96A]" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#31483A] bg-[#E8EBDD] px-2.5 py-0.5 rounded-full border border-[#C9D2C2] font-semibold">
                    <CheckCircle2 size={10} className="text-[#31483A]" />
                    <span>VERIFIED BUYER</span>
                  </span>
                </div>

                <h4 className="font-serif text-lg text-[#31483A] font-semibold mb-3 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="font-sans text-xs sm:text-sm text-[#69736A] font-light leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#C9D2C2] flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#31483A] block">{rev.author}</span>
                  <span className="text-[10px] font-mono text-[#69736A]">{rev.skinType}</span>
                </div>
                <span className="text-[10px] font-mono text-[#879B7A]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
