import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles, PhoneCall, Scissors } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenStitchingModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenStitchingModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'ai-stylist', 'collection', 'why-us', 'hours', 'faqs', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'ai-stylist', label: 'AI Stylist', href: '#ai-stylist' },
    { id: 'collection', label: 'Collection', href: '#collection' },
    { id: 'hours', label: 'Hours', href: '#hours' },
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
        isScrolled
          ? 'shadow-sm border-b border-slate-100 py-3'
          : 'border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo / Wordmark */}
          <a
            href="#home"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              N
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-blue-600 transition-colors">
                Noor Boutique
              </span>
              <span className="hidden sm:block text-[11px] text-slate-500 font-normal leading-none tracking-normal">
                Hyderabad, Sindh
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-medium"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions & CTA Zone */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* AI Stylist Quick Button */}
            <a
              href="#ai-stylist"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#ai-stylist');
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-pink-700 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors border border-pink-200"
              title="Get personalized outfit recommendations with Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>AI Stylist</span>
            </a>

            {/* Custom Stitching Quick Button */}
            <button
              onClick={onOpenStitchingModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
              title="Request Custom Stitching Consultation"
            >
              <Scissors className="w-3.5 h-3.5 text-blue-600" />
              <span>Custom Stitching</span>
            </button>

            {/* Shopping Bag Button (Pink CTA) */}
            <button
              onClick={onOpenCart}
              aria-label={`View shopping bag with ${cartCount} items`}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline">Bag / Order</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold bg-white text-pink-600 rounded-full">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Explore Noor Boutique
              </span>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="text-xs text-blue-600 font-medium flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 font-semibold'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleNavClick('#ai-stylist');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-pink-700 bg-pink-50 rounded-lg border border-pink-200"
              >
                <Sparkles className="w-4 h-4 text-pink-500" />
                Ask AI Fashion Stylist
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStitchingModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
              >
                <Scissors className="w-4 h-4 text-blue-600" />
                Custom Stitching Request
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 rounded-lg shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                View Bag & Place Order ({cartCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
