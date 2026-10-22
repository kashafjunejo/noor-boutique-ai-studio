import React from 'react';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

interface FinalCtaBannerProps {
  onExploreCollection: () => void;
  onOpenStitchingModal: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({
  onExploreCollection,
  onOpenStitchingModal,
}) => {
  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    "Hello Noor Boutique! I'm ready to select an outfit from your collection."
  );

  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
      {/* Decorative Light Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-blue-100 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-pink-300" />
          <span>Boutique Pret & Bespoke Stitching in Hyderabad</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Your Style, Your Story, Your Noor Boutique.
        </h2>

        <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto font-normal leading-relaxed">
          Step into timeless grace. Discover handpicked fabrics, tailored cuts, and festive embroidery 
          designed to celebrate who you are.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={onExploreCollection}
            className="btn-pink px-7 py-3.5 text-sm sm:text-base font-semibold shadow-md flex items-center gap-2"
          >
            <span>Explore Our Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenStitchingModal}
            className="px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg transition-colors"
          >
            Custom Stitching Request
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 text-sm sm:text-base font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-400/40 rounded-lg transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
