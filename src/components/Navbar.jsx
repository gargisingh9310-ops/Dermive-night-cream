import React, { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { useWindowScroll } from '../hooks/useScrollTrigger';

export default function Navbar({ onScrollToSection }) {
  const { isScrolled } = useWindowScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftLinks = [
    { label: 'HOME', id: 'hero' },
    { label: 'BENEFITS', id: 'benefits' },
  ];

  const rightLinks = [
    { label: 'INGREDIENTS', id: 'ingredients' },
    { label: 'PURCHASE', id: 'purchase' },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F7F3E8]/88 backdrop-blur-md py-3.5 border-b border-[#DDE2D8] shadow-sm'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative flex items-center justify-center md:grid md:grid-cols-[1fr_auto_1fr]">
          
          {/* 1. LEFT SIDE: Navigation Links (Grouped with consistent gap, centered towards logo) */}
          <nav className="hidden md:flex items-center justify-end gap-8 lg:gap-10 pr-10 lg:pr-14">
            {leftLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#31483A]/80 hover:text-[#879B7A] transition-colors relative group bg-transparent border-none cursor-pointer py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#879B7A] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* 2. CENTER: DERMIVA LOGO (Perfect mathematical center) */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-left group bg-transparent border-none p-0 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-full border border-[#C9D2C2] bg-[#E8EBDD]/60 flex items-center justify-center text-[#31483A] group-hover:border-[#879B7A] transition-colors shadow-sm">
                <Leaf size={15} className="text-[#31483A]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.12em] text-[#31483A] font-semibold leading-none group-hover:text-[#879B7A] transition-colors">
                  DERMIVA
                </span>
                <span className="text-[8.5px] font-sans tracking-[0.32em] text-[#879B7A] uppercase font-medium">
                  SKINCARE
                </span>
              </div>
            </button>
          </div>

          {/* 3. RIGHT SIDE: Navigation Links (Grouped with consistent gap, mirroring left) */}
          <nav className="hidden md:flex items-center justify-start gap-8 lg:gap-10 pl-10 lg:pl-14">
            {rightLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#31483A]/80 hover:text-[#879B7A] transition-colors relative group bg-transparent border-none cursor-pointer py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#879B7A] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle (Positioned on the right for mobile screens) */}
          <div className="md:hidden absolute right-6 top-1/2 -translate-y-1/2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#31483A] bg-transparent border-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#F7F3E8]/98 backdrop-blur-xl pt-24 px-8 pb-10 flex flex-col justify-between md:hidden animate-fadeIn border-b border-[#DDE2D8]">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-mono tracking-widest text-[#879B7A] uppercase font-semibold">
              NAVIGATION
            </span>
            {allLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-serif text-2xl text-[#31483A] hover:text-[#879B7A] transition-colors py-1 bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#DDE2D8]">
            <p className="text-[11px] text-center text-[#69736A] font-light">
              DERMIVA • Botanical Luxury Skincare
            </p>
          </div>
        </div>
      )}
    </>
  );
}
