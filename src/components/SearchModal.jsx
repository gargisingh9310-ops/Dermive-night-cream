import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCT } from '../data/productData';

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickPills = [
    'Niacinamide',
    'Olive Leaf Extract',
    'Deep Overnight Repair',
    'Clean Formula',
    'Dermatologically Tested',
    '50 ml'
  ];

  const handleSelect = (item) => {
    onSelectResult(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#27352D]/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#F7F3E8] border border-[#C9D2C2] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#27352D] z-10">
        
        {/* Header & Search Input */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE2D8] mb-6">
          <div className="flex items-center gap-3 flex-1">
            <Search size={20} className="text-[#31483A]" />
            <input
              type="text"
              autoFocus
              placeholder="Search ingredients, benefits, or ritual..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent border-none text-base sm:text-lg text-[#27352D] placeholder-[#69736A]/50 focus:outline-none font-sans"
            />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#69736A] hover:text-[#31483A] bg-transparent border-none cursor-pointer transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Suggested Quick Searches */}
        <div className="mb-6">
          <span className="text-[10px] font-mono tracking-widest text-[#879B7A] uppercase block mb-3 font-semibold">
            POPULAR SEARCHES
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#E8EBDD] hover:bg-[#31483A] hover:text-white border border-[#C9D2C2] text-[#31483A] transition-all cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Featured Product Result */}
        <div className="p-4 rounded-xl bg-white border border-[#C9D2C2] flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-[#F7F3E8] border border-[#DDE2D8] p-1 flex items-center justify-center shrink-0">
              <img
                src={PRODUCT.image}
                alt={PRODUCT.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-sm sm:text-base font-semibold text-[#31483A] block">
                {PRODUCT.fullName}
              </span>
              <span className="text-xs font-mono text-[#879B7A]">
                ₹{PRODUCT.price} • 50 ml • In Stock
              </span>
            </div>
          </div>

          <button
            onClick={() => handleSelect('purchase')}
            className="px-4 py-2 rounded-full bg-[#31483A] hover:bg-[#24372B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shrink-0 flex items-center gap-1 shadow-md hover:shadow-lg transition-all"
          >
            <span>VIEW</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
