import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

interface FooterProps {
  onOpenPolicy: (policyType: 'privacy' | 'terms' | 'return') => void;
  onExploreCollection: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onExploreCollection }) => {
  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    "Hello Noor Boutique! I'm visiting your website and have an inquiry."
  );

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 text-left">
          
          {/* Brand Info & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                N
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Noor Boutique
              </span>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              Style That Feels Like You.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover elegant fashion, custom stitching, and personalized service in Hyderabad, Pakistan. 
              Bridging rich Sindhi artisan embroidery with modern pret silhouettes.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Instagram @noorboutique.demo"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                title="Facebook Noor Boutique Demo"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  Collection & Pricing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#ai-stylist" className="hover:text-white transition-colors text-pink-400 font-medium">
                  AI Fashion Stylist
                </a>
              </li>
              <li>
                <a href="#hours" className="hover:text-white transition-colors">
                  Opening Hours
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Collections & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Our Specialties
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onExploreCollection}
                  className="hover:text-white transition-colors text-left"
                >
                  Casual Lawn Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCollection}
                  className="hover:text-white transition-colors text-left"
                >
                  Printed Two-Piece Suits
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCollection}
                  className="hover:text-white transition-colors text-left"
                >
                  Embroidered Three-Piece Suits
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCollection}
                  className="hover:text-white transition-colors text-left"
                >
                  Festive Kalidar Dresses
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCollection}
                  className="hover:text-white transition-colors text-left"
                >
                  Bespoke Custom Stitching
                </button>
              </li>
              <li>
                <button
                  onClick={onExploreCollection}
                  className="hover:text-white transition-colors text-left"
                >
                  Luxury Gift Packaging
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Boutique Studio
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              *All details are demonstration records.
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Noor Boutique. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenPolicy('return')}
              className="hover:text-white transition-colors"
            >
              Return & Exchange Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
