import React from 'react';
import { Leaf, ShieldCheck, Heart, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollToSection }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#24372B] text-[#F7F3E8] border-t border-[#31483A] pt-16 pb-12 overflow-hidden">
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3D5948]">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#879B7A]/50 bg-[#1B261F] flex items-center justify-center text-[#879B7A]">
                <Leaf size={14} className="text-[#879B7A]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-[0.12em] text-[#F7F3E8]">
                DERMIVA
                <span className="text-[9px] font-sans tracking-[0.3em] text-[#879B7A] uppercase block font-medium">SKINCARE</span>
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#E8EBDD]/80 font-light max-w-sm leading-relaxed">
              Pioneering clean botanical skincare powered by pure dermatological science. Crafted in harmony with nature to elevate your daily restorative rituals.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#879B7A]">
              <span>✦ 100% Clean</span>
              <span>✦ Dermatologist Tested</span>
              <span>✦ Cruelty-Free</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-serif text-base text-[#F7F3E8] font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8EBDD]/80 font-light">
              <li>
                <button
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-[#879B7A] transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('benefits')}
                  className="hover:text-[#879B7A] transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Clinical Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('ingredients')}
                  className="hover:text-[#879B7A] transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Restorative Ingredients
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('purchase')}
                  className="hover:text-[#879B7A] transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                >
                  Shop 50 ml Jar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div>
            <h4 className="font-serif text-base text-[#F7F3E8] font-semibold mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8EBDD]/80 font-light">
              <li>
                <a href="#purchase" className="hover:text-[#879B7A] transition-colors">
                  Contact Skincare Concierge
                </a>
              </li>
              <li>
                <a href="#purchase" className="hover:text-[#879B7A] transition-colors">
                  Track Express Order
                </a>
              </li>
              <li>
                <a href="#purchase" className="hover:text-[#879B7A] transition-colors">
                  Shipping & Handling Policy
                </a>
              </li>
              <li>
                <a href="#purchase" className="hover:text-[#879B7A] transition-colors">
                  30-Day Happiness Guarantee
                </a>
              </li>
              <li>
                <a href="#purchase" className="hover:text-[#879B7A] transition-colors">
                  Privacy & Data Protection
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Ritual Privileges */}
          <div>
            <h4 className="font-serif text-base text-[#F7F3E8] font-semibold mb-2">
              Ritual Circle
            </h4>
            <p className="text-xs text-[#E8EBDD]/75 font-light mb-3 leading-relaxed">
              Subscribe to receive 15% off your first night cream order and private launch access.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full px-3 py-2 rounded-lg bg-[#1B261F] border border-[#3D5948] text-xs text-[#F7F3E8] placeholder-[#E8EBDD]/40 focus:outline-none focus:border-[#879B7A]"
              />
              <button
                onClick={() => alert('Thank you for subscribing to the DERMIVA Ritual Circle! Use code NIGHT15 at checkout.')}
                className="px-3.5 py-2 rounded-lg bg-[#879B7A] hover:bg-[#97AB8A] text-[#1B261F] text-xs font-bold font-mono cursor-pointer shrink-0 transition-colors"
              >
                JOIN
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#E8EBDD]/60">
          <p>© 2026 DERMIVA. All rights reserved. Repair & Restore™ is a registered trademark.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#879B7A] hover:text-[#F7F3E8] transition-colors bg-transparent border-none cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </footer>
  );
}
