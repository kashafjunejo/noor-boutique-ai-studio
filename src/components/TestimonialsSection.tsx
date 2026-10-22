import React from 'react';
import { Star, MapPin, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/boutiqueData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 text-left">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              Customer Stories & Feedback
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Loved by Women Across Sindh
            </h2>
            <p className="mt-2 text-base text-slate-600 font-normal">
              Read what our satisfied customers say about our outfits, stitching precision, and customer care.
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 self-start sm:self-auto shrink-0">
            *Fictional testimonials for website demonstration
          </div>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative hover:border-blue-300 transition-colors"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-medium text-slate-500 ml-1.5">5.0</span>
                </div>

                {/* Feedback Quote */}
                <div className="relative mb-6">
                  <p className="text-sm text-slate-700 leading-relaxed italic font-normal">
                    &ldquo;{testimonial.feedback}&rdquo;
                  </p>
                </div>
              </div>

              {/* Author & Purchase Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    <span>{testimonial.location}, Pakistan</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-blue-600 block">
                    Verified Purchase
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {testimonial.outfit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust Strip */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Over 500+ happy clients styled across Hyderabad, Jamshoro, Karachi, and Sukkur.
        </div>

      </div>
    </section>
  );
};
