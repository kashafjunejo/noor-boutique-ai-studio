import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

interface FAQSectionProps {
  onContactClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onContactClick }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    "Hello Noor Boutique! I have a question regarding your outfits and custom orders."
  );

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            Clear Answers to Common Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-base text-slate-600 font-normal">
            Everything you need to know about our collections, custom stitching, 
            payment methods, and delivery across Pakistan.
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type your question (e.g., stitching, payment, return, delivery)..."
            className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs transition-all"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
              <p className="text-sm font-semibold text-slate-700">No matching questions found.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-blue-600 font-medium hover:underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <span className="text-base font-semibold text-slate-900 flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 bg-slate-50/30">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900">Still have questions?</h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Our customer support coordinator Ali Raza is happy to answer any custom order queries.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              Contact Form
            </button>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pink px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
