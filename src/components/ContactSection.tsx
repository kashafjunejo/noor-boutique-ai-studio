import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: 'Ready-to-Wear Outfits',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter a valid phone number or WhatsApp contact.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number with area code.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a brief message (at least 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate reliable submission
    setTimeout(() => {
      const generatedId = `NB-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const prefilledWhatsApp = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    `Hello Noor Boutique! My name is ${formData.fullName || 'Customer'}. Regarding ${formData.subject}: ${formData.message || 'I would like to inquire about your outfits.'}`
  );

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Have a Question? We&apos;re Here to Help.
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Whether you want to check product stock, schedule custom measurements, 
            or place an order, our friendly team in Hyderabad is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-6 sm:p-7 space-y-6">
              <h3 className="text-lg font-bold text-slate-900">
                Contact Information
              </h3>

              {/* Physical Shop Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Boutique Location
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-0.5">
                    {BUSINESS_INFO.address}
                  </p>
                </div>
              </div>

              {/* Phone & Copy */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Direct Phone Line
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded"
                      title="Copy phone number"
                    >
                      {copiedPhone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Email Inquiries
                  </p>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors mt-0.5 block"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Fast Track */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    WhatsApp Chat Support
                  </p>
                  <a
                    href={createWhatsAppUrl(
                      BUSINESS_INFO.whatsappNumber,
                      "Hello Noor Boutique! I would like to chat with your customer care coordinator."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-600 hover:underline mt-0.5 inline-block"
                  >
                    Start Chat (+92 300 1234567)
                  </a>
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Follow Our Social Showcases
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    <span>{BUSINESS_INFO.instagram}</span>
                  </a>

                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                    <span>{BUSINESS_INFO.facebook}</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Placeholder Note */}
            <p className="text-[11px] text-slate-400 italic">
              *These contact details are placeholders. The .example email domain is reserved for demonstration, 
              and the phone number should be replaced with a verified business number before launch.
            </p>

          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-slate-800">{formData.fullName}</span>. 
                  Your inquiry has been received with reference number{' '}
                  <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {submissionId}
                  </span>.
                  Ali Raza from customer support will contact you within business hours.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={prefilledWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pink px-5 py-2.5 text-xs inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Also Send to WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        subject: 'Ready-to-Wear Outfits',
                        message: '',
                      });
                    }}
                    className="px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors w-full sm:w-auto"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Fill in your details below and we will get back to you promptly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. Ayesha Khan"
                      className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.fullName ? 'border-pink-500 bg-pink-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-pink-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number / WhatsApp <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. +92 300 1234567"
                      className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.phone ? 'border-pink-500 bg-pink-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-pink-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-pink-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. ayesha@example.com"
                      className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        errors.email ? 'border-pink-500 bg-pink-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-pink-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject / Interested Service
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-800"
                    >
                      <option value="Ready-to-Wear Outfits">Ready-to-Wear Outfits</option>
                      <option value="Custom Stitching Consultation">Custom Stitching Consultation</option>
                      <option value="Embroidery & Customization">Embroidery & Customization</option>
                      <option value="Festive & Bridal Wear">Festive & Bridal Wear</option>
                      <option value="Premium Gift Packaging">Premium Gift Packaging</option>
                      <option value="Delivery Outside Hyderabad">Delivery Outside Hyderabad</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / Requirements <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Tell us about the outfit, colors, measurements, or date needed..."
                    className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.message ? 'border-pink-500 bg-pink-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-pink-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-400">
                    We respect your privacy. No spam guaranteed.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-pink px-6 py-2.5 text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
