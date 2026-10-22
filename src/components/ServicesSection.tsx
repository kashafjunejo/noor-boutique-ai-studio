import React from 'react';
import { Shirt, Scissors, Sparkles, Gift, ShoppingBag, ArrowRight } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

interface ServicesSectionProps {
  onExploreCollection: () => void;
  onOpenStitchingModal: () => void;
  onContactClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onExploreCollection,
  onOpenStitchingModal,
  onContactClick,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-blue-600" />;
      case 'Scissors':
        return <Scissors className="w-6 h-6 text-pink-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Gift':
        return <Gift className="w-6 h-6 text-pink-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-blue-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleServiceAction = (serviceId: string) => {
    if (serviceId === 'srv-ready-to-wear') {
      onExploreCollection();
    } else if (serviceId === 'srv-custom-stitching') {
      onOpenStitchingModal();
    } else if (serviceId === 'srv-gift-packaging') {
      onExploreCollection();
    } else if (serviceId === 'srv-online-orders') {
      window.open(
        createWhatsAppUrl(
          BUSINESS_INFO.whatsappNumber,
          "Hello! I would like to place an online order with Noor Boutique."
        ),
        '_blank'
      );
    } else {
      onContactClick();
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            Tailored Experiences & Craft
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Our Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From ready-to-wear seasonal silhouettes to personalized bespoke stitching and festive gift packaging, 
            discover how Noor Boutique elevates your personal wardrobe.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-5">
                  {getIcon(service.iconName)}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {service.startingPrice}
                </span>
                <button
                  onClick={() => handleServiceAction(service.id)}
                  className="btn-pink px-3.5 py-1.5 text-xs inline-flex items-center gap-1.5"
                >
                  <span>
                    {service.id === 'srv-custom-stitching'
                      ? 'Inquire Stitching'
                      : service.id === 'srv-ready-to-wear'
                      ? 'View Pret'
                      : service.id === 'srv-online-orders'
                      ? 'WhatsApp Order'
                      : 'Inquire'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Banner Card in the Grid: Services Section CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Personalized Design
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-2 mb-3 leading-snug">
                Looking for Something Special? Let&apos;s Create Your Perfect Look.
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-6">
                Have a specific cut, custom neckline, or family wedding theme in mind? 
                Consult directly with our master tailor and styling consultant.
              </p>
            </div>

            <div className="pt-4 border-t border-blue-500/50 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenStitchingModal}
                className="btn-pink px-4 py-2 text-xs font-semibold text-center"
              >
                Custom Stitching Form
              </button>
              <button
                onClick={onContactClick}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-800/80 hover:bg-blue-800 rounded-lg text-center transition-colors"
              >
                Message Stylist
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
