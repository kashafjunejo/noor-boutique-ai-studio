import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  AlertCircle,
  ShoppingBag,
  MessageCircle,
  Scissors,
  CheckCircle2,
  RefreshCw,
  Tag,
  Palette,
  Compass,
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, BUSINESS_INFO } from '../data/boutiqueData';
import { createWhatsAppUrl } from '../utils/helpers';

interface RecommendationResult {
  headline: string;
  recommendedProduct: string;
  estimatedPrice: string;
  fabricAndPalette: string;
  outfitDescription: string;
  dupattaStyle: string;
  accessoriesAndFootwear: string;
  budgetGuidance: string;
  stylistTip: string;
}

interface AIFashionAdvisorProps {
  onAddToCart: (product: Product, size?: string) => void;
  onOpenStitchingModal: () => void;
  onExploreCollection: () => void;
}

export const AIFashionAdvisor: React.FC<AIFashionAdvisorProps> = ({
  onAddToCart,
  onOpenStitchingModal,
  onExploreCollection,
}) => {
  const [occasion, setOccasion] = useState('');
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationResult | null>(null);

  // Quick preset chips for rapid user interaction
  const popularOccasions = [
    'Eid Celebration',
    'Wedding / Dholki',
    'University / Daily',
    'Office / Professional',
    'Family Dinner',
  ];

  const popularStyles = [
    'Traditional Embroidered',
    'Modern Pret Kurti',
    'Printed Two-Piece',
    'Regal Festive Silk',
    'Bespoke Tailored',
  ];

  const popularBudgets = [
    'Under PKR 2,500',
    'PKR 2,500 - 5,000',
    'PKR 5,000 - 9,000',
    'PKR 10,000+',
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!occasion.trim() && !style.trim() && !budget.trim()) {
      setErrorMessage('Please select or specify at least an occasion, preferred style, or budget.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/fashion-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          occasion: occasion.trim(),
          style: style.trim(),
          budget: budget.trim(),
          additionalNotes: additionalNotes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate recommendations. Please try again.');
      }

      setRecommendation(data);
    } catch (err: any) {
      console.error('Error getting AI recommendation:', err);
      setErrorMessage(
        err.message || 'Unable to connect to AI Fashion Assistant. Please check your network or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Find matching catalog product if any
  const matchedProduct = recommendation
    ? PRODUCTS.find((p) =>
        recommendation.recommendedProduct
          .toLowerCase()
          .includes(p.name.toLowerCase().split(' ')[0]) ||
        p.name.toLowerCase().includes(recommendation.recommendedProduct.toLowerCase())
      )
    : null;

  const handleWhatsAppInquiry = () => {
    if (!recommendation) return;
    const msg =
      `*AI Stylist Recommendation Inquiry — Noor Boutique*\n` +
      `Look: ${recommendation.headline}\n` +
      `Occasion: ${occasion || 'Special event'}\n` +
      `Budget: ${budget || 'Flexible'}\n` +
      `Recommended Item: ${recommendation.recommendedProduct} (${recommendation.estimatedPrice})\n` +
      `Colors/Fabric: ${recommendation.fabricAndPalette}\n\n` +
      `Hello! I generated this custom look using your AI Fashion Stylist on your website. Do you have this available in my size at your Hyderabad shop?`;

    const url = createWhatsAppUrl(BUSINESS_INFO.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  return (
    <section id="ai-stylist" className="py-16 lg:py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-pink-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Powered by Google Gemini AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Personal AI Fashion Stylist
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Unsure what to wear for an upcoming wedding, Eid dinner, or everyday university routine?
            Tell our AI Stylist your event, style aesthetic, and budget to receive real-time, 
            culturally authentic wardrobe recommendations from Noor Boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Tell Us Your Preferences</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Step 1 of 2</span>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5 text-left">
              
              {/* 1. Occasion */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  1. What is the occasion? <span className="text-pink-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {popularOccasions.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        occasion === occ
                          ? 'bg-blue-600 text-white border-blue-600 font-medium'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="Or type custom (e.g. Sister's Mehndi, Tea Party, Presentation)..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 2. Preferred Style */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  2. Preferred Style / Cut <span className="text-pink-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {popularStyles.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStyle(st)}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        style === st
                          ? 'bg-blue-600 text-white border-blue-600 font-medium'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  placeholder="Or type custom (e.g. A-line kurti, Straight pant, Scalloped organza)..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 3. Budget */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  3. Your Budget (PKR) <span className="text-pink-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {popularBudgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                        budget === b
                          ? 'bg-blue-600 text-white border-blue-600 font-medium'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Or enter specific amount (e.g. PKR 3,500)..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 4. Additional preferences */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Colors or Specific Details (Optional)
                </label>
                <input
                  type="text"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. Pastel green, breathable cotton lawn, modest neckline..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Error notice */}
              {errorMessage && (
                <div className="p-3 bg-pink-50 border border-pink-200 rounded-lg flex items-start gap-2 text-xs text-pink-700">
                  <AlertCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-pink w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Styling Your Look via Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Outfit Recommendation</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center">
                Real-time recommendations grounded in Noor Boutique&apos;s active catalog and Hyderabad pricing.
              </div>
            </form>
          </div>

          {/* Right Column: AI Output or Default Guidance State */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 sm:p-12 text-center space-y-4 shadow-xs">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Crafting Your Personalized Ensembles...
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Gemini AI is analyzing Noor Boutique&apos;s catalog, color harmonies, fabric drape, 
                  and your budget of <span className="font-semibold text-slate-700">{budget || 'PKR'}</span> for <span className="font-semibold text-slate-700">{occasion || 'your occasion'}</span>.
                </p>
                <div className="pt-2 flex justify-center">
                  <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full animate-[shimmer_1.5s_infinite]" />
                  </div>
                </div>
              </div>
            ) : recommendation ? (
              /* Recommendation Results Card */
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-left animate-in fade-in duration-300">
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-slate-100 gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                        AI Recommended Look
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-semibold text-slate-600">
                        {recommendation.recommendedProduct}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                      {recommendation.headline}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs text-slate-400 block leading-tight">Estimated</span>
                    <span className="text-xl font-bold text-blue-600 tabular-nums">
                      {recommendation.estimatedPrice}
                    </span>
                  </div>
                </div>

                {/* Fabric & Color Palette Card */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Fabric & Color Harmony
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                      {recommendation.fabricAndPalette}
                    </p>
                  </div>
                </div>

                {/* Detailed Outfit Breakdown */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Why This Outfit Works
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {recommendation.outfitDescription}
                  </p>
                </div>

                {/* Styling Specs 2-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <h5 className="text-xs font-bold text-slate-800 mb-1">
                      Dupatta Draping Technique
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {recommendation.dupattaStyle}
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                    <h5 className="text-xs font-bold text-slate-800 mb-1">
                      Jewelry, Bag & Footwear
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {recommendation.accessoriesAndFootwear}
                    </p>
                  </div>
                </div>

                {/* Budget Analysis */}
                <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/70 text-xs text-blue-900">
                  <span className="font-bold block mb-0.5">Budget & Add-on Advice:</span>
                  <p className="text-blue-800 leading-relaxed">{recommendation.budgetGuidance}</p>
                </div>

                {/* Pro Stylist Tip */}
                <div className="flex items-start gap-2.5 text-xs text-slate-600 italic border-l-2 border-pink-500 pl-3 py-1">
                  <span>&ldquo;{recommendation.stylistTip}&rdquo;</span>
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {matchedProduct ? (
                      <button
                        onClick={() => onAddToCart(matchedProduct)}
                        className="btn-pink px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add &quot;{matchedProduct.name}&quot; to Bag</span>
                      </button>
                    ) : (
                      <button
                        onClick={onExploreCollection}
                        className="btn-pink px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Explore Collection</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenStitchingModal}
                      className="px-3.5 py-2.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Custom Stitching</span>
                    </button>

                    <button
                      onClick={handleWhatsAppInquiry}
                      className="px-3.5 py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors"
                      title="Send AI recommendation directly to Noor Boutique WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Inquire on WhatsApp</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setRecommendation(null);
                      setOccasion('');
                      setStyle('');
                      setBudget('');
                      setAdditionalNotes('');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 py-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Try Another Look</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Default State: Feature Overview & What to Expect */
              <div className="bg-slate-50/60 rounded-2xl border border-slate-200/90 p-8 sm:p-10 text-center space-y-6">
                <div className="w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-2xs">
                  <Sparkles className="w-7 h-7 text-blue-600" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    How Our AI Fashion Advisor Works
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Select your upcoming event, preferred styling, and budget on the left. 
                    Gemini AI will instantly analyze our Hyderabad catalog to design a complete look, 
                    including dupatta drape, shoes, accessories, and price estimates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs">
                    <p className="font-bold text-slate-800 mb-1">1. Event Precision</p>
                    <p className="text-slate-500 text-[11px]">From dholkis to boardrooms and festive Eid dinners.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs">
                    <p className="font-bold text-slate-800 mb-1">2. Price Matching</p>
                    <p className="text-slate-500 text-[11px]">Exact recommendations within your target PKR budget.</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs">
                    <p className="font-bold text-slate-800 mb-1">3. WhatsApp Ready</p>
                    <p className="text-slate-500 text-[11px]">Export the look directly to our styling staff with 1 click.</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Tip: Try selecting &quot;Wedding / Dholki&quot; and &quot;Regal Festive Silk&quot; to see a sample recommendation.
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
