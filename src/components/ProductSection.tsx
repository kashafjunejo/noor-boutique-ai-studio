import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, MessageCircle, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, BUSINESS_INFO } from '../data/boutiqueData';
import { formatPKR, createWhatsAppUrl } from '../utils/helpers';

interface ProductSectionProps {
  onAddToCart: (product: Product, size?: string) => void;
  onQuickView: (product: Product) => void;
  onOpenStitchingModal: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onAddToCart,
  onQuickView,
  onOpenStitchingModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'kurti', label: 'Casual Kurtis' },
    { id: 'suits', label: 'Suits & Sets' },
    { id: 'festive', label: 'Festive Pret' },
    { id: 'services', label: 'Services & Add-ons' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabricDetails.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product) => {
    const size = selectedSizes[product.id] || (product.availableSizes ? product.availableSizes[0] : undefined);
    onAddToCart(product, size);
    setAddedNotice(product.id);
    setTimeout(() => {
      setAddedNotice((curr) => (curr === product.id ? null : curr));
    }, 1800);
  };

  return (
    <section id="collection" className="py-16 lg:py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-left">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              Curated Wardrobe Collection
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Find Your Favorite Style Today
            </h2>
            <p className="mt-3 text-base text-slate-600 font-normal">
              Browse our ready-to-wear silhouettes, embroidered festive collections, 
              custom stitching, and luxury packaging options.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fabric, style, dress..."
              className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/90 rounded-xl overflow-x-auto mb-8 shadow-xs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center my-8">
            <p className="text-base font-semibold text-slate-800">No items match your search.</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try searching for &quot;kurti&quot;, &quot;silk&quot;, &quot;two-piece&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const currentSize =
                selectedSizes[product.id] ||
                (product.availableSizes ? product.availableSizes[0] : '');
              const isAdded = addedNotice === product.id;

              const whatsAppOrderText = `Hello Noor Boutique! I'm interested in ordering "${product.name}" priced at ${formatPKR(product.price)} from your website.`;
              const whatsAppLink = createWhatsAppUrl(
                BUSINESS_INFO.whatsappNumber,
                whatsAppOrderText
              );

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image & Quick View Trigger */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs border border-slate-200/50">
                        {product.badge}
                      </span>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 rounded-lg shadow-xs transition-colors"
                      title="Quick View Details"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <span>{product.fabricDetails}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Sizes Selection (if available) */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {product.availableSizes && product.availableSizes.length > 1 && (
                        <div className="mb-3">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                            Select Size:
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {product.availableSizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => handleSizeSelect(product.id, size)}
                                className={`px-2 py-1 text-[11px] font-medium rounded border transition-colors ${
                                  currentSize === size
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-xs text-slate-400 block leading-tight">Price</span>
                          <span className="text-lg font-bold text-slate-900 tabular-nums">
                            {formatPKR(product.price)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* WhatsApp Inquiry Button */}
                          <a
                            href={whatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                            title="Inquire about this item on WhatsApp"
                            aria-label={`Inquire about ${product.name} on WhatsApp`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Add to Bag or Custom Stitching trigger */}
                          {product.id === 'prod-custom-stitching' ? (
                            <button
                              onClick={onOpenStitchingModal}
                              className="btn-pink px-3.5 py-2 text-xs flex items-center gap-1.5"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Book Fitting</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAdd(product)}
                              className={`btn-pink px-3.5 py-2 text-xs flex items-center gap-1.5 ${
                                isAdded ? 'bg-emerald-600 hover:bg-emerald-700' : ''
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-white" />
                                  <span>Added!</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                  <span>Add to Bag</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pricing Note */}
        <p className="mt-8 text-center text-xs text-slate-500 italic max-w-2xl mx-auto">
          *All prices are sample prices for demonstration. Actual prices may vary according to fabric, design, and customization.
        </p>

      </div>
    </section>
  );
};
