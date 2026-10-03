import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShieldCheck, Truck, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCT } from '../data/productData';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 999;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'NIGHT15' || code === 'DERMIVA15' || code === 'RESTORE15') {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      onClearCart();
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#27352D]/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#F7F3E8] border-l border-[#C9D2C2] text-[#27352D] p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#DDE2D8] mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#31483A]" />
              <h3 className="font-serif text-xl font-normal text-[#31483A]">Your Skincare Bag</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#69736A] hover:text-[#31483A] bg-transparent border-none cursor-pointer transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Express Shipping Progress Meter */}
          <div className="mb-6 p-3.5 rounded-xl bg-[#E8EBDD] border border-[#C9D2C2]">
            <div className="flex items-center justify-between text-[11px] font-mono mb-1.5 text-[#31483A]">
              <span>
                {subtotal >= freeShippingThreshold
                  ? '🎉 UNLOCKED: Free Express Delivery'
                  : `Add ₹${freeShippingThreshold - subtotal} more for Free Express Delivery`}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#DDE2D8] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#31483A] transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          {cartItems.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E8EBDD] border border-[#C9D2C2] flex items-center justify-center text-[#31483A] mx-auto mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="font-serif text-lg text-[#31483A] mb-2">Your ritual bag is empty</p>
              <p className="text-xs text-[#69736A] mb-6 font-light max-w-xs mx-auto">
                Add the Repair & Restore Night Cream to begin your overnight botanical transformation.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#31483A] hover:bg-[#24372B] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                EXPLORE NIGHT CREAM
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 rounded-xl bg-white border border-[#C9D2C2] flex items-center gap-4 shadow-sm"
                >
                  <div className="w-16 h-16 rounded-lg bg-[#F7F3E8] border border-[#DDE2D8] p-1 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-[#31483A] font-semibold leading-snug truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] font-mono text-[#879B7A] block mb-2">
                      50 ml • Niacinamide + Olive Leaf
                    </span>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-[#C9D2C2] rounded-full px-2 py-0.5 bg-[#F7F3E8]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="text-[#69736A] hover:text-[#31483A] bg-transparent border-none cursor-pointer"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-mono font-bold text-[#27352D] px-1">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#69736A] hover:text-[#31483A] bg-transparent border-none cursor-pointer"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-[#31483A]">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[#69736A]/60 hover:text-red-500 p-1 bg-transparent border-none cursor-pointer transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="pt-6 border-t border-[#DDE2D8] space-y-4">
            
            {/* Promo Code Box */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo (e.g. DERMIVA15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white border border-[#C9D2C2] text-xs text-[#27352D] placeholder-[#69736A]/50 focus:outline-none focus:border-[#31483A] uppercase font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#31483A] hover:bg-[#24372B] text-xs font-mono font-semibold text-white cursor-pointer transition-colors"
              >
                APPLY
              </button>
            </form>

            {discountApplied && (
              <div className="flex items-center justify-between text-xs font-mono text-[#31483A]">
                <span>Ritual Promo (15% OFF):</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}

            {/* Subtotal & Total */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#69736A]">
                <span>Subtotal</span>
                <span className="font-mono text-[#27352D]">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#69736A]">
                <span>Shipping</span>
                <span className="font-mono text-[#31483A] font-medium">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '₹75'}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-[#31483A] font-semibold pt-2 border-t border-[#DDE2D8]">
                <span>Total Amount</span>
                <span className="font-mono text-[#31483A]">₹{total}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={checkoutComplete}
              className="w-full py-4 rounded-full bg-[#31483A] hover:bg-[#24372B] text-white text-xs font-bold tracking-[0.2em] uppercase shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#31483A]"
            >
              {checkoutComplete ? (
                <span className="animate-pulse">PROCESSING SECURE ORDER...</span>
              ) : (
                <>
                  <span>CHECKOUT NOW</span>
                  <span>•</span>
                  <span>₹{total}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            {/* Checkout Trust Guarantee */}
            <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-[#69736A] pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#879B7A]" /> 256-Bit SSL Encryption
              </span>
              <span className="flex items-center gap-1">
                <Truck size={12} className="text-[#879B7A]" /> Fast Express Dispatch
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
