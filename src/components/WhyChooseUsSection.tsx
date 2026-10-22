import React from 'react';
import { Sparkles, Scissors, ShieldCheck, Truck, Clock, HeartHandshake } from 'lucide-react';

interface WhyChooseUsProps {
  onExploreClick: () => void;
  onOpenStitchingModal: () => void;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsProps> = ({
  onExploreClick,
  onOpenStitchingModal,
}) => {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-blue-600" />,
      title: 'Sindhi Heritage & Modern Pret',
      description: 'Carefully curated designs combining traditional South Asian threadwork with contemporary cuts that flatter every silhouette.',
    },
    {
      icon: <Scissors className="w-5 h-5 text-pink-500" />,
      title: 'Bespoke Custom Stitching',
      description: 'Our in-house master tailors handcraft each outfit according to your exact measurements, neckline preferences, and preferred pant length.',
    },
    {
      icon: <Truck className="w-5 h-5 text-blue-600" />,
      title: 'Nationwide Delivery & COD',
      description: 'Quick local delivery in Hyderabad & Jamshoro, and reliable courier shipping across all major cities in Pakistan with Cash on Delivery options.',
    },
    {
      icon: <Clock className="w-5 h-5 text-pink-500" />,
      title: 'Prompt Turnaround',
      description: 'Ready-to-wear orders dispatch within 24 hours. Custom-stitched outfits completed with high precision in just 4–7 business days.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'Premium Pre-Washed Fabrics',
      description: 'No shrinkage surprises. We use breathable lawn, durable cambric, and pure silk blends selected for maximum comfort in Pakistani climates.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-pink-500" />,
      title: 'Dedicated WhatsApp Stylist',
      description: 'Personalized 1-on-1 assistance. Share photos, ask sizing advice, or request custom embroidery previews before placing your order.',
    },
  ];

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            The Noor Boutique Promise
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Why Choose Us for Your Wardrobe
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal leading-relaxed">
            We bridge the gap between ready-to-wear convenience and personalized artisanal fitting. 
            Here is why women in Hyderabad, Sindh, and beyond trust Noor Boutique.
          </p>
        </div>

        {/* Features 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center mb-4 shadow-2xs">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Adjacency Banner */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Ready to experience effortless elegance?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Explore our current catalog or request bespoke tailoring for upcoming festive occasions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreClick}
              className="btn-pink px-5 py-2.5 text-xs sm:text-sm"
            >
              Shop Ready-to-Wear
            </button>
            <button
              onClick={onOpenStitchingModal}
              className="px-5 py-2.5 text-xs sm:text-sm font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Custom Stitching
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
