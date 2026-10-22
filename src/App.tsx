import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { AIFashionAdvisor } from './components/AIFashionAdvisor';
import { ProductSection } from './components/ProductSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { OpeningHoursSection } from './components/OpeningHoursSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FinalCtaBanner } from './components/FinalCtaBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CustomStitchingModal } from './components/CustomStitchingModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { PolicyModal } from './components/PolicyModal';
import { Product, CartItem } from './types';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from './data/boutiqueData';
import { createWhatsAppUrl } from './utils/helpers';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isStitchingModalOpen, setIsStitchingModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'return' | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      } else {
        return [...prev, { product, quantity: 1, selectedSize: size }];
      }
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Scroll Helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingWhatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    "Hello Noor Boutique! I'm visiting your website from Hyderabad and would like to ask a question."
  );

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-800 selection:bg-pink-100 selection:text-pink-600 font-sans">
      
      {/* 1. Header & Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('collection')}
          onContactClick={() => scrollToSection('contact')}
          onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
        />

        {/* 3. About Us & Our Team */}
        <AboutSection onContactClick={() => scrollToSection('contact')} />

        {/* 4. Our Services */}
        <ServicesSection
          onExploreCollection={() => scrollToSection('collection')}
          onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 5. AI Fashion Assistant (Powered by Gemini) */}
        <AIFashionAdvisor
          onAddToCart={handleAddToCart}
          onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
          onExploreCollection={() => scrollToSection('collection')}
        />

        {/* 6. Products & Pricing (Collection) */}
        <ProductSection
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
        />

        {/* 6. Why Choose Us */}
        <WhyChooseUsSection
          onExploreClick={() => scrollToSection('collection')}
          onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
        />

        {/* 7. Customer Testimonials */}
        <TestimonialsSection />

        {/* 8. Opening Hours & Boutique Address */}
        <OpeningHoursSection />

        {/* 9. FAQs */}
        <FAQSection onContactClick={() => scrollToSection('contact')} />

        {/* 10. Contact Us & Inquiries */}
        <ContactSection />

        {/* 11. Final Call-to-Action Banner */}
        <FinalCtaBanner
          onExploreCollection={() => scrollToSection('collection')}
          onOpenStitchingModal={() => setIsStitchingModalOpen(true)}
        />
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onExploreCollection={() => scrollToSection('collection')}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Noor Boutique on WhatsApp"
        className="fixed bottom-6 right-6 z-30 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group active:scale-95"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline-block text-xs font-semibold max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* Slide-over Shopping Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Custom Stitching Modal */}
      <CustomStitchingModal
        isOpen={isStitchingModalOpen}
        onClose={() => setIsStitchingModalOpen(false)}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenStitchingModal={() => {
          setQuickViewProduct(null);
          setIsStitchingModalOpen(true);
        }}
      />

      {/* Legal & Policy Modals */}
      <PolicyModal
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

    </div>
  );
}
