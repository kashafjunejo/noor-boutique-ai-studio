import React from 'react';
import { X, ShieldCheck, FileText, RotateCcw } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';

interface PolicyModalProps {
  policyType: 'privacy' | 'terms' | 'return' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyType, onClose }) => {
  if (!policyType) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-slate-100 p-6 sm:p-8">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2.5">
              {policyType === 'privacy' && <ShieldCheck className="w-5 h-5 text-blue-600" />}
              {policyType === 'terms' && <FileText className="w-5 h-5 text-blue-600" />}
              {policyType === 'return' && <RotateCcw className="w-5 h-5 text-pink-500" />}
              <h3 className="text-lg font-bold text-slate-900">
                {policyType === 'privacy' && 'Privacy Policy'}
                {policyType === 'terms' && 'Terms & Conditions'}
                {policyType === 'return' && 'Return & Exchange Policy'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 space-y-4 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
            {policyType === 'privacy' && (
              <>
                <p>
                  At <strong>Noor Boutique</strong>, your privacy is deeply respected. We only collect essential customer contact information (such as name, WhatsApp phone number, and delivery address) strictly to process your ready-to-wear orders and custom stitching consultations.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">Data Handling</h4>
                <p>
                  We do not sell, rent, or distribute personal customer data to any third-party marketing services. Your delivery details are shared solely with verified logistics couriers to facilitate parcel delivery across Pakistan.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">WhatsApp Communication</h4>
                <p>
                  By initiating inquiries over WhatsApp or submitting our contact form, you consent to receive direct order confirmations and delivery updates regarding your inquiries.
                </p>
              </>
            )}

            {policyType === 'terms' && (
              <>
                <p>
                  Welcome to <strong>Noor Boutique</strong>. By browsing our website, placing an order, or booking a custom stitching service, you agree to these operating terms:
                </p>
                <h4 className="font-bold text-slate-900 text-sm">Sample Pricing</h4>
                <p>
                  All catalog prices displayed (in PKR) are sample demonstration prices. Final rates may vary based on chosen fabric blends, specialized artisanal embroidery, and bespoke tailoring finishes.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">Order Confirmations</h4>
                <p>
                  Orders placed through our website or WhatsApp are subject to physical stock verification. Our team will contact you directly to confirm delivery dates and payment method before dispatch.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">Location</h4>
                <p>
                  Our physical showroom is situated at {BUSINESS_INFO.address}.
                </p>
              </>
            )}

            {policyType === 'return' && (
              <>
                <p>
                  We take pride in the quality of every outfit hand-finished at Noor Boutique.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">Ready-to-Wear Outfits</h4>
                <p>
                  Unworn ready-to-wear garments with original boutique tags intact can be exchanged within <strong>7 days</strong> of delivery if there is a sizing issue or transit defect.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">Custom Stitching</h4>
                <p>
                  Garments tailored to custom individual measurements are non-refundable once cut and stitched. However, we offer <strong>complimentary fitting adjustments</strong> within 5 days of pickup or receipt at our Hyderabad workshop.
                </p>
                <h4 className="font-bold text-slate-900 text-sm">How to Request an Exchange</h4>
                <p>
                  Message our customer support coordinator Ali Raza on WhatsApp at {BUSINESS_INFO.phoneDisplay} or email hello@noorboutique.example with your order reference number.
                </p>
              </>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="btn-pink px-5 py-2 text-xs font-semibold"
            >
              I Understand
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
