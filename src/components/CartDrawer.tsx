import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR, createWhatsAppUrl } from '../utils/helpers';
import { BUSINESS_INFO } from '../data/boutiqueData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [includeStitching, setIncludeStitching] = useState(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    city: 'Hyderabad',
    address: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const GIFT_WRAP_PRICE = 350;
  const STITCHING_PRICE = 1200;

  const itemsSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const addOnsTotal =
    (includeGiftWrap ? GIFT_WRAP_PRICE : 0) +
    (includeStitching ? STITCHING_PRICE : 0);

  const finalTotal = itemsSubtotal + addOnsTotal;

  const validateCheckout = () => {
    const errs: Record<string, string> = {};
    if (!customerInfo.name.trim() || customerInfo.name.trim().length < 2) {
      errs.name = 'Please provide your full name.';
    }
    if (!customerInfo.phone.trim() || customerInfo.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid phone number.';
    }
    if (!customerInfo.address.trim() || customerInfo.address.trim().length < 5) {
      errs.address = 'Please provide your full delivery address.';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const generateWhatsAppOrderText = () => {
    let text = `*New Order Request — Noor Boutique*\n`;
    text += `Customer: ${customerInfo.name || 'Customer'}\n`;
    text += `Phone: ${customerInfo.phone || 'N/A'}\n`;
    text += `City: ${customerInfo.city || 'Hyderabad'}\n`;
    text += `Address: ${customerInfo.address || 'Inquire for Pickup'}\n\n`;
    text += `*Items Ordered:*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.product.name} (Qty: ${item.quantity}) - ${formatPKR(item.product.price * item.quantity)}`;
      if (item.selectedSize) text += ` [Size: ${item.selectedSize}]`;
      text += `\n`;
    });

    if (includeGiftWrap) text += `+ Premium Gift Packaging (${formatPKR(GIFT_WRAP_PRICE)})\n`;
    if (includeStitching) text += `+ Custom Stitching Service (${formatPKR(STITCHING_PRICE)})\n`;

    text += `\n*Total Amount:* ${formatPKR(finalTotal)}\n`;
    text += `*Payment:* Cash on Delivery / Bank Transfer\n`;
    if (customerInfo.notes) text += `Notes: ${customerInfo.notes}\n`;

    return text;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckout()) return;

    const id = `NB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setIsOrderPlaced(true);
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    const msg = generateWhatsAppOrderText();
    const url = createWhatsAppUrl(BUSINESS_INFO.whatsappNumber, msg);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                {isOrderPlaced
                  ? 'Order Confirmed'
                  : isCheckoutStep
                  ? 'Delivery & Order Details'
                  : `Your Shopping Bag (${cartItems.reduce((acc, i) => acc + i.quantity, 0)})`}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {isOrderPlaced ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Order <span className="font-mono font-bold text-blue-600">{orderId}</span> has been created. 
                  Our team in Hyderabad will confirm your order details and delivery window shortly.
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
                  <p><span className="font-semibold">Recipient:</span> {customerInfo.name}</p>
                  <p><span className="font-semibold">Phone:</span> {customerInfo.phone}</p>
                  <p><span className="font-semibold">Destination:</span> {customerInfo.city}, Pakistan</p>
                  <p><span className="font-semibold">Total Payable:</span> <span className="font-bold text-slate-900">{formatPKR(finalTotal)}</span></p>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    Payment Method: Cash on Delivery (COD) / Bank Transfer
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="btn-pink py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order Copy to WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onClearCart();
                      setIsCheckoutStep(false);
                      setIsOrderPlaced(false);
                      onClose();
                    }}
                    className="py-2 px-4 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>
            ) : isCheckoutStep ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Recipient Information
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutStep(false)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    ← Back to Items
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-pink-600 mt-0.5">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number / WhatsApp <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.phone && (
                    <p className="text-[11px] text-pink-600 mt-0.5">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Town
                  </label>
                  <select
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Hyderabad">Hyderabad (Same-day / Next-day)</option>
                    <option value="Jamshoro">Jamshoro</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Sukkur">Sukkur</option>
                    <option value="Larkana">Larkana</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad / Rawalpindi</option>
                    <option value="Other City (Pakistan)">Other City (Pakistan Courier)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Delivery Address <span className="text-pink-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="House/Street number, Area, Landmark..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formErrors.address && (
                    <p className="text-[11px] text-pink-600 mt-0.5">{formErrors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Order Notes / Special Requests (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    placeholder="e.g. Call before delivery, gift tag text..."
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="btn-pink w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Confirm Order ({formatPKR(finalTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Order via WhatsApp Directly</span>
                  </button>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-base font-bold text-slate-800">Your bag is empty</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Discover our stylish kurtis, printed suits, or bespoke stitching options.
                </p>
                <button
                  onClick={onClose}
                  className="btn-pink px-4 py-2 text-xs mt-2"
                >
                  Browse Collection
                </button>
              </div>
            ) : (
              /* Cart Items List */
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 pb-4 border-b border-slate-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-lg bg-slate-50 border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-400 hover:text-pink-600 p-0.5"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {item.selectedSize && (
                            <span className="text-[11px] text-slate-500 block mt-0.5">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-bold text-slate-900 tabular-nums">
                            {formatPKR(item.product.price * item.quantity)}
                          </span>

                          <div className="flex items-center gap-1.5 bg-slate-100 rounded-md p-0.5">
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                              }
                              className="p-1 text-slate-600 hover:text-slate-900 rounded"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-1.5 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 text-slate-600 hover:text-slate-900 rounded"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Boutique Add-ons */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Add-on Services
                  </p>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeGiftWrap}
                      onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                      className="mt-0.5 rounded text-pink-500 focus:ring-pink-500 border-slate-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Premium Gift Packaging</span>
                        <span className="text-slate-900 tabular-nums">+{formatPKR(GIFT_WRAP_PRICE)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Luxury blush box, satin ribbon, personalized greeting card.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 pt-2 border-t border-slate-200/60">
                    <input
                      type="checkbox"
                      checked={includeStitching}
                      onChange={(e) => setIncludeStitching(e.target.checked)}
                      className="mt-0.5 rounded text-pink-500 focus:ring-pink-500 border-slate-300"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Custom Stitching Service</span>
                        <span className="text-slate-900 tabular-nums">+{formatPKR(STITCHING_PRICE)}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Made-to-measure tailored cut by specialist Maryam Khan.
                      </p>
                    </div>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Action Bar */}
          {!isOrderPlaced && cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums font-medium">{formatPKR(itemsSubtotal)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Add-ons Total</span>
                    <span className="tabular-nums font-medium">+{formatPKR(addOnsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-blue-600 font-medium">
                    Calculated at dispatch (COD available)
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                  <span>Estimated Total</span>
                  <span className="tabular-nums text-base">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              {!isCheckoutStep ? (
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setIsCheckoutStep(true)}
                    className="btn-pink w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Delivery & Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-2 px-4 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Quick Order on WhatsApp</span>
                  </button>
                </div>
              ) : null}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Secure Checkout • Inspection on Delivery Allowed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
