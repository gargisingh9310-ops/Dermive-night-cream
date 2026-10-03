import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronDown, Star } from 'lucide-react';
import { PRODUCT } from '../data/productData';

export default function ProductPurchase({ onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [openAccordion, setOpenAccordion] = useState('how-to-use');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = purchaseType === 'subscribe' ? Math.round(PRODUCT.price * 0.8) : PRODUCT.price;

  const handleAdd = () => {
    onAddToCart(PRODUCT, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <section
      id="purchase"
      className="relative w-full py-20 md:py-32 bg-[#E8EBDD] text-[#27352D] overflow-hidden"
    >
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#FFFFFF]/60 rounded-full blur-[110px] pointer-events-none" />
      <div className="grain-overlay" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dedicated Visual Stage for the Traveling Product (Settled on LEFT) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
            
            <div
              id="purchase-product-box"
              className="relative w-full max-w-lg aspect-square rounded-3xl bg-white border border-[#C9D2C2] p-8 flex items-center justify-center shadow-[0_8px_30px_rgba(49,72,58,0.06)] overflow-hidden group"
            >
              
              {/* Core Sage Aura behind traveling product */}
              <div className="absolute inset-8 bg-[#879B7A]/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

              {/* Floating 50 ml Badge */}
              <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#C9D2C2] text-[#31483A] text-[10px] font-mono tracking-widest uppercase font-semibold shadow-sm">
                50 ML / 1.7 FL. OZ.
              </div>

              {/* Verified Dermatology Seal */}
              <div className="absolute bottom-6 right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#E8EBDD] backdrop-blur-md border border-[#C9D2C2] text-[#31483A] text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 font-semibold shadow-sm">
                <ShieldCheck size={13} className="text-[#31483A]" />
                <span>CLINICALLY TESTED</span>
              </div>

              {/* Product Image in White Box */}
              <div
                id="purchase-docked-product"
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none"
              >
                <div className="w-[325px] sm:w-[400px] lg:w-[465px] flex items-center justify-center">
                  <img
                    src="/fullbox.png"
                    alt="DERMIVA Repair & Restore Night Cream"
                    className="w-full h-auto object-contain select-none pointer-events-none scale-[0.78] sm:scale-[0.88]"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Micro Feature Indicators */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg mt-6 text-center">
              <div className="p-3.5 rounded-2xl bg-white border border-[#C9D2C2] shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#879B7A] uppercase block mb-0.5 font-semibold">
                  SHELF LIFE
                </span>
                <span className="text-xs text-[#31483A] font-medium">24 Months</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#C9D2C2] shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#879B7A] uppercase block mb-0.5 font-semibold">
                  FORMULATION
                </span>
                <span className="text-xs text-[#31483A] font-medium">100% Clean</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#C9D2C2] shadow-sm">
                <span className="text-[10px] font-mono tracking-widest text-[#879B7A] uppercase block mb-0.5 font-semibold">
                  ORIGIN
                </span>
                <span className="text-xs text-[#31483A] font-medium">Botanical Science</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Purchase & Conversion Box */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Review Stars & Badges */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-[#C9A96A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#C9A96A]" />
                ))}
              </div>
              <span className="text-xs font-mono text-[#31483A] font-semibold">4.9</span>
              <span className="text-xs font-mono text-[#69736A]">(1,420 Verified Reviews)</span>
            </div>

            {/* Product Title & Subtitle */}
            <span className="text-xs font-sans tracking-[0.25em] text-[#879B7A] uppercase font-bold block mb-1">
              REPAIR & RESTORE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#31483A] font-normal tracking-tight leading-[1.08] mb-2">
              Night Cream
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#69736A] mb-6">
              WITH NIACINAMIDE + OLIVE LEAF EXTRACT • 50 ML
            </p>

            {/* Price & Savings Pill */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-[#C9D2C2]">
              <span className="font-serif text-3xl sm:text-4xl text-[#31483A] font-semibold">
                ₹{price}
              </span>
              <span className="font-mono text-base text-[#69736A]/60 line-through">
                ₹{PRODUCT.originalPrice}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#31483A]/10 border border-[#31483A]/20 text-[#31483A] text-xs font-mono font-bold">
                SAVE 25%
              </span>
            </div>

            {/* Purchase Options: One-Time vs Subscribe */}
            <div className="space-y-3 mb-6">
              
              {/* One-Time Option */}
              <div
                onClick={() => setPurchaseType('one-time')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  purchaseType === 'one-time'
                    ? 'bg-white border-2 border-[#31483A] shadow-sm'
                    : 'bg-white/80 border border-[#C9D2C2] hover:border-[#879B7A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    purchaseType === 'one-time' ? 'border-[#31483A] bg-[#31483A]' : 'border-[#C9D2C2]'
                  }`}>
                    {purchaseType === 'one-time' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#31483A] block">One-Time Purchase</span>
                    <span className="text-[10px] text-[#69736A] font-light">Standard 50 ml Jar</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-[#31483A]">₹899</span>
              </div>

              {/* Subscribe & Save Option */}
              <div
                onClick={() => setPurchaseType('subscribe')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  purchaseType === 'subscribe'
                    ? 'bg-white border-2 border-[#31483A] shadow-sm'
                    : 'bg-white/80 border border-[#C9D2C2] hover:border-[#879B7A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    purchaseType === 'subscribe' ? 'border-[#31483A] bg-[#31483A]' : 'border-[#C9D2C2]'
                  }`}>
                    {purchaseType === 'subscribe' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[#31483A]">Subscribe & Auto-Deliver</span>
                      <span className="text-[9px] font-mono text-white bg-[#31483A] px-2 py-0.5 rounded-full font-bold">
                        SAVE EXTRA 20%
                      </span>
                    </div>
                    <span className="text-[10px] text-[#69736A] font-light">Delivered every 60 days • Cancel anytime</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-bold text-[#31483A]">₹719</span>
              </div>

            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              
              {/* Quantity Counter */}
              <div className="flex items-center justify-between w-full sm:w-32 px-4 py-3 rounded-xl bg-white border border-[#C9D2C2] text-[#31483A]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#69736A] hover:text-[#31483A] bg-transparent border-none cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="font-mono text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#69736A] hover:text-[#31483A] bg-transparent border-none cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAdd}
                className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#31483A] hover:bg-[#24372B] text-white text-xs font-semibold tracking-[0.18em] uppercase shadow-lg shadow-[#31483A]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#31483A] transition-all group"
              >
                <ShoppingBag size={16} />
                <span>{addedAnimation ? 'ADDED TO CART ✓' : `ADD TO CART • ₹${price * quantity}`}</span>
              </button>

            </div>

            {/* Trust Assurance Row */}
            <div className="grid grid-cols-3 gap-2 py-4 mb-6 border-y border-[#C9D2C2] text-[10px] sm:text-[11px] font-mono text-[#69736A] text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck size={14} className="text-[#31483A]" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw size={14} className="text-[#31483A]" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={14} className="text-[#31483A]" />
                <span>100% Genuine Certified</span>
              </div>
            </div>

            {/* Accordion Deep Details */}
            <div className="space-y-3">
              
              {/* Accordion 1: How to Use */}
              <div className="border border-[#C9D2C2] rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'how-to-use' ? '' : 'how-to-use')}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#31483A] bg-transparent border-none cursor-pointer font-semibold"
                >
                  <span>✦ HOW TO APPLY</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#31483A] transition-transform duration-300 ${
                      openAccordion === 'how-to-use' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'how-to-use' && (
                  <div className="px-5 pb-4 text-xs text-[#69736A] font-light leading-relaxed border-t border-[#C9D2C2]/50 pt-3">
                    Warm a dime-sized amount between fingertips. Gently smooth across cleansed face and neck in upward circular motions as the final step of your evening ritual before sleep.
                  </div>
                )}
              </div>

              {/* Accordion 2: Full Ingredients */}
              <div className="border border-[#C9D2C2] rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'ingredients' ? '' : 'ingredients')}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#31483A] bg-transparent border-none cursor-pointer font-semibold"
                >
                  <span>✦ KEY INGREDIENTS LIST</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#31483A] transition-transform duration-300 ${
                      openAccordion === 'ingredients' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'ingredients' && (
                  <div className="px-5 pb-4 text-xs text-[#69736A] font-light leading-relaxed border-t border-[#C9D2C2]/50 pt-3">
                    Purified Water, Niacinamide (Vitamin B3), Olea Europaea (Olive) Leaf Extract, Shea Butter, Plant Squalane, Cetearyl Olivate, Sorbitan Olivate, Sodium Hyaluronate, Tocopheryl Acetate (Vitamin E), Allantoin, Ethylhexylglycerin.
                  </div>
                )}
              </div>

              {/* Accordion 3: Safety Standards */}
              <div className="border border-[#C9D2C2] rounded-xl overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'safety' ? '' : 'safety')}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-mono tracking-wider uppercase text-[#31483A] bg-transparent border-none cursor-pointer font-semibold"
                >
                  <span>✦ SAFETY & DERMATOLOGY CERTIFICATE</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#31483A] transition-transform duration-300 ${
                      openAccordion === 'safety' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'safety' && (
                  <div className="px-5 pb-4 text-xs text-[#69736A] font-light leading-relaxed border-t border-[#C9D2C2]/50 pt-3">
                    Clinically tested for sensitivity and barrier compatibility. Formulated without parabens, sulphates, silicones, synthetic dyes, or mineral oils. 100% cruelty-free and non-comedogenic.
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
