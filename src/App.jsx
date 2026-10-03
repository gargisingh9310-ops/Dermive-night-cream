import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TravelingProductStage from './components/TravelingProductStage';
import HeroInteractiveExperience from './components/HeroInteractiveExperience';
import Benefits from './components/Benefits';
import IngredientDeepDive from './components/IngredientDeepDive';
import ProductPurchase from './components/ProductPurchase';
import NightRitualSteps from './components/NightRitualSteps';
import CustomerReviews from './components/CustomerReviews';
import FinalCTA from './components/FinalCTA';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import { PRODUCT } from './data/productData';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      product: PRODUCT,
      quantity: 1
    }
  ]);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Add to cart handler
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative w-full min-h-screen bg-[#F7F3E8] text-[#27352D] selection:bg-[#879B7A]/25 selection:text-[#31483A] overflow-x-hidden">
      
      {/* 00 / Minimal Sticky Navigation Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onScrollToSection={scrollToSection}
      />

      {/* Persistent Traveling Product Visual Layer (Hero -> Benefits -> Ingredients -> Purchase) */}
      <TravelingProductStage />

      {/* 01 / Cinematic Hero Section (Backdrop, Ambient Glows, Editorial Typography) */}
      <HeroInteractiveExperience />

      {/* 02 / Clinical Benefits Section ("REPAIR WHILE YOU REST" - 3 Left Points + Right Organic Stage) */}
      <Benefits />

      {/* 04 / Ingredient Deep Dive & Clean Formulation Standards */}
      <IngredientDeepDive />

      {/* 05 / Primary Product Purchase Experience ("THE NIGHTLY ESSENTIAL" - Product Settles on Left) */}
      <ProductPurchase
        onAddToCart={handleAddToCart}
      />

      {/* 06 / The 3-Step Evening Application Ritual */}
      <NightRitualSteps />

      {/* 07 / Customer Reviews & Verified Overnight Results */}
      <CustomerReviews />

      {/* 08 / Final Full-Width Luxury CTA */}
      <FinalCTA
        onShopNow={() => scrollToSection('purchase')}
      />

      {/* 09 / Botanical Editorial Footer */}
      <Footer
        onScrollToSection={scrollToSection}
      />

      {/* Interactive Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* Quick Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(sectionId) => scrollToSection(sectionId)}
      />

    </div>
  );
}
