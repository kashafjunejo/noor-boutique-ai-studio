import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, MessageCircle, Navigation, CheckCircle } from 'lucide-react';
import { OPENING_HOURS, BUSINESS_INFO } from '../data/boutiqueData';
import { getStoreCurrentStatus, createWhatsAppUrl } from '../utils/helpers';

export const OpeningHoursSection: React.FC = () => {
  const [storeStatus, setStoreStatus] = useState(getStoreCurrentStatus());

  useEffect(() => {
    // Re-evaluate store status every minute
    const interval = setInterval(() => {
      setStoreStatus(getStoreCurrentStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    "Hello Noor Boutique! I'm planning to visit your shop on Fashion Street, Hyderabad. Are you currently available?"
  );

  return (
    <section id="hours" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            Visit Us In Person
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Opening Hours & Location
          </h2>
          <p className="mt-2 text-base text-slate-600 font-normal">
            Step into our welcoming boutique in Hyderabad to feel the fabrics, 
            get measured for custom stitching, or pick up your ready order.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hours Table & Live Status */}
          <div className="lg:col-span-7 bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 sm:p-8">
            
            {/* Live Open / Closed Header */}
            <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3.5 h-3.5 rounded-full ${
                    storeStatus.isOpen ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {storeStatus.statusText}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {storeStatus.nextChange} (PKT: {storeStatus.currentPktTime})
                  </p>
                </div>
              </div>

              <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
                Today is {storeStatus.currentDayName}
              </span>
            </div>

            {/* Operating Hours Table */}
            <div className="space-y-3">
              {OPENING_HOURS.map((item) => {
                const isToday = item.day === storeStatus.currentDayName;
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg text-sm transition-colors ${
                      isToday
                        ? 'bg-blue-50/80 border border-blue-200 font-semibold text-blue-900'
                        : 'text-slate-700 hover:bg-white/80'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isToday && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      <span>{item.day}</span>
                    </span>
                    <span className="tabular-nums text-slate-900 font-medium">
                      {item.hours}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-slate-500 italic mt-6 pt-4 border-t border-slate-200">
              *Demonstration hours only. Timings may adjust during Ramadan and festive public holidays.
            </p>
          </div>

          {/* Right Column: Address, Map Card & Direct Actions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Contact Details Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Noor Boutique Studio
              </h3>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">Boutique Address</p>
                    <p className="text-xs text-slate-600 mt-0.5">{BUSINESS_INFO.address}</p>
                    <p className="text-[11px] text-blue-600 mt-1 font-medium">
                      Near Central Market & Saddar Road
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">Phone</p>
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800">WhatsApp Inquiries</p>
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 hover:underline font-medium"
                    >
                      {BUSINESS_INFO.phoneDisplay} (Chat Available)
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    BUSINESS_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink px-4 py-2.5 text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask Store Availability</span>
                </a>
              </div>
            </div>

            {/* In-Store Amenities */}
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-5 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-slate-900 mb-1">In-Store Highlights</p>
              <div className="grid grid-cols-2 gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Private Trial Room
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Master Tailor on Site
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Fabric Sample Swatches
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Air-Conditioned Studio
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
