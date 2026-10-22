import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, createWhatsAppUrl } from '../utils/helpers';
import { BUSINESS_INFO } from '../data/boutiqueData';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string) => void;
  onOpenStitchingModal: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenStitchingModal,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.availableSizes ? product.availableSizes[0] : ''
  );
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.whatsappNumber,
    `Hello Noor Boutique! I'm interested in "${product.name}" (${formatPKR(product.price)}). Can you share more photos and size details?`
  );

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

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-slate-100">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 bg-white/80 hover:bg-white rounded-full shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image side */}
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-slate-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-white/95 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details side */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {product.fabricDetails}
                </p>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-slate-900 tabular-nums mb-4">
                  {formatPKR(product.price)}
                </p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {product.description}
                </p>

                {/* Sizing options */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-800">Available Sizes</span>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenStitchingModal();
                        }}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        Custom fitting guide
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            selectedSize === size
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* In stock and authenticity guarantee */}
                <div className="space-y-2 text-xs text-slate-500 py-3 border-t border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>In-stock at Shop 12, Fashion Street, Hyderabad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Cash on Delivery (COD) available across Pakistan</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2.5">
                <button
                  onClick={handleAdd}
                  className={`btn-pink w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 ${
                    isAdded ? 'bg-emerald-600 hover:bg-emerald-700' : ''
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Shopping Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag ({formatPKR(product.price)})</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
