import React, { useState } from 'react';
import { X, Scissors, CheckCircle2, MessageCircle, Ruler, Info } from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl, formatPKR } from '../utils/helpers';

interface CustomStitchingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomStitchingModal: React.FC<CustomStitchingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    outfitType: 'Three-Piece Suit',
    fabricSource: 'I will provide my own fabric',
    kameezLength: '38',
    chest: '36',
    waist: '32',
    hip: '40',
    shoulder: '14.5',
    sleeves: '21',
    trouserLength: '37',
    necklineStyle: 'Round Neck with slit & pearl buttons',
    specialNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  if (!isOpen) return null;

  const estimatedBasePrice = formData.outfitType === 'Single Kurti' ? 1200 : formData.outfitType === 'Two-Piece Suit' ? 1800 : formData.outfitType === 'Three-Piece Suit' ? 2400 : 3500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `STITCH-${Math.floor(10000 + Math.random() * 90000)}`;
    setInquiryCode(code);
    setIsSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    return (
      `*Custom Stitching Request — Noor Boutique*\n` +
      `Code: ${inquiryCode || 'NEW'}\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Outfit: ${formData.outfitType}\n` +
      `Fabric: ${formData.fabricSource}\n` +
      `*Measurements (Inches):*\n` +
      `• Kameez Length: ${formData.kameezLength}"\n` +
      `• Chest: ${formData.chest}"\n` +
      `• Waist: ${formData.waist}"\n` +
      `• Hip: ${formData.hip}"\n` +
      `• Shoulder: ${formData.shoulder}"\n` +
      `• Sleeves: ${formData.sleeves}"\n` +
      `• Trouser: ${formData.trouserLength}"\n` +
      `Neckline: ${formData.necklineStyle}\n` +
      (formData.specialNotes ? `Notes: ${formData.specialNotes}\n` : '') +
      `Estimated Stitching: ${formatPKR(estimatedBasePrice)}`
    );
  };

  const handleWhatsAppSend = () => {
    const url = createWhatsAppUrl(BUSINESS_INFO.whatsappNumber, getWhatsAppMessage());
    window.open(url, '_blank');
  };

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

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-slate-100">
          {/* Header */}
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                <Scissors className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Custom Stitching & Measurement Form
                </h3>
                <p className="text-[11px] text-slate-500">
                  Supervised by Stitching Specialist Maryam Khan • Hyderabad, Sindh
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">
                  Measurement Profile Saved!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your custom stitching consultation has been logged with Reference{' '}
                  <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {inquiryCode}
                  </span>.
                  Maryam Khan or our support coordinator will contact you to confirm final fitting details.
                </p>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left max-w-md mx-auto space-y-1.5">
                  <p><span className="font-semibold">Customer:</span> {formData.fullName}</p>
                  <p><span className="font-semibold">Outfit:</span> {formData.outfitType} ({formData.fabricSource})</p>
                  <p><span className="font-semibold">Estimated Base Stitching:</span> {formatPKR(estimatedBasePrice)}</p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    *Final price may vary based on complex laces, gota work, or silk lining.
                  </p>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleWhatsAppSend}
                    className="btn-pink px-5 py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Measurements to WhatsApp</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Close Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {/* Intro notice */}
                <div className="flex items-start gap-2 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-800">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    Fill in your standard measurements in inches. If you prefer to have us take measurements at our shop (Shop 12, Fashion Street, Hyderabad), you can leave them approximate.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Fatima Ali"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number / WhatsApp <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +92 300 1234567"
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Outfit Type
                    </label>
                    <select
                      value={formData.outfitType}
                      onChange={(e) => setFormData({ ...formData, outfitType: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    >
                      <option value="Single Kurti">Single Kurti (from PKR 1,200)</option>
                      <option value="Two-Piece Suit">Two-Piece Suit (from PKR 1,800)</option>
                      <option value="Three-Piece Suit">Three-Piece Suit (from PKR 2,400)</option>
                      <option value="Festive Kalidar / Anarkali">Festive Kalidar / Anarkali (from PKR 3,500)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Fabric Source
                    </label>
                    <select
                      value={formData.fabricSource}
                      onChange={(e) => setFormData({ ...formData, fabricSource: e.target.value })}
                      className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    >
                      <option value="I will provide my own fabric">I will provide my own unstitched fabric</option>
                      <option value="Pair with an unstitched Noor Boutique suit">Pair with an unstitched Noor Boutique suit</option>
                      <option value="Shop staff will advise fabric at boutique">Shop staff will advise fabric at boutique</option>
                    </select>
                  </div>
                </div>

                {/* Measurements Grid */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
                    <Ruler className="w-3.5 h-3.5 text-blue-600" />
                    <span>Measurements (in inches)</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Kameez Length</label>
                      <input
                        type="text"
                        value={formData.kameezLength}
                        onChange={(e) => setFormData({ ...formData, kameezLength: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Chest</label>
                      <input
                        type="text"
                        value={formData.chest}
                        onChange={(e) => setFormData({ ...formData, chest: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Waist</label>
                      <input
                        type="text"
                        value={formData.waist}
                        onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Hip</label>
                      <input
                        type="text"
                        value={formData.hip}
                        onChange={(e) => setFormData({ ...formData, hip: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Shoulder</label>
                      <input
                        type="text"
                        value={formData.shoulder}
                        onChange={(e) => setFormData({ ...formData, shoulder: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Sleeve Length</label>
                      <input
                        type="text"
                        value={formData.sleeves}
                        onChange={(e) => setFormData({ ...formData, sleeves: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-0.5">Trouser Length</label>
                      <input
                        type="text"
                        value={formData.trouserLength}
                        onChange={(e) => setFormData({ ...formData, trouserLength: e.target.value })}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded text-center"
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <span className="text-[10px] text-slate-500 leading-tight">
                        Need help? Call +92 300 1234567
                      </span>
                    </div>
                  </div>
                </div>

                {/* Neckline & Design preferences */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Neckline & Trouser Style Preference
                  </label>
                  <input
                    type="text"
                    value={formData.necklineStyle}
                    onChange={(e) => setFormData({ ...formData, necklineStyle: e.target.value })}
                    placeholder="e.g. V-neck, Boat neck, Straight pant, Tulip shalwar..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Finishing Notes
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="e.g. Add organza border on sleeves, keep loose fitting, specific event date..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500">Base Estimate:</span>
                    <span className="text-sm font-bold text-slate-900 ml-1.5">
                      {formatPKR(estimatedBasePrice)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="btn-pink px-5 py-2.5 text-xs sm:text-sm font-semibold"
                  >
                    Submit Custom Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
