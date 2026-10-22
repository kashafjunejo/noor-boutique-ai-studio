import React from 'react';
import { ArrowRight, MessageCircle, MapPin, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onOpenStitchingModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onContactClick,
  onOpenStitchingModal,
}) => {
  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    "Hello Noor Boutique! I'm visiting your website and would like to explore your latest collection and services."
  );

  return (
    <section id="home" className="relative bg-white pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-50/40 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Unboxed Tagline & Location */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 mb-6">
          <span className="text-blue-600 font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Hyderabad, Sindh
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Traditional Elegance, Modern Style</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Boutique Pret & Custom Stitching</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
              Discover Your{' '}
              <span className="text-blue-600 inline-block">Everyday Elegance</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl font-normal">
              Explore beautiful outfits, timeless designs, and personalized styling at Noor Boutique.
              From comfortable daily lawn kurtis to regal hand-embroidered festive ensembles, 
              crafted with love in the heart of Hyderabad.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="btn-pink px-6 py-3.5 text-base shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="px-6 py-3.5 text-base font-medium text-blue-600 bg-blue-50/80 hover:bg-blue-100/90 rounded-lg border border-blue-200 transition-colors"
              >
                Contact Us
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                title="Chat directly on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Quality Fabrics</p>
                  <p className="text-slate-500 text-[11px]">Pure lawn, cambric & raw silk</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-pink-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Made to Measure</p>
                  <p className="text-slate-500 text-[11px]">Custom stitching available</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">Pakistan-wide Delivery</p>
                  <p className="text-slate-500 text-[11px]">Cash on delivery supported</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Image with Floating Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/src/assets/images/hero_boutique_fashion_1792610183515.jpg"
                alt="Noor Boutique Showroom in Hyderabad Sindh"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold tracking-wider uppercase text-blue-200">
                  Fashion Street Studio
                </p>
                <p className="text-sm font-medium drop-shadow-sm">
                  Shop 12, Fashion Street, Hyderabad, Sindh
                </p>
              </div>
            </div>

            {/* Floating Mini Card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl shadow-md border border-slate-100 items-center gap-3 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Custom Stitching</p>
                <p className="text-[11px] text-slate-500">Tailored to your exact measurements</p>
                <button
                  onClick={onOpenStitchingModal}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold mt-0.5 inline-block"
                >
                  Book Measurement →
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
