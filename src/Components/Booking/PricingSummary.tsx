import React from "react";
import { Shield, Timer, Star } from "lucide-react";

interface PricingSummaryProps {
  pricing: {
    basePrice: number;
    addonPrice: number;
    expressPrice: number;
    subtotal: number;
    tax: number;
    total: number;
  };
  service: any;
  selectedAddons: string[];
  selectedTimeSlot: string;
}

export default function PricingSummary({ pricing }: PricingSummaryProps) {
  const reviews = [
    { name: "Sarah M.", rating: 5, comment: "Excellent service, very professional!" },
    { name: "John D.", rating: 5, comment: "Quick and reliable, highly recommended." },
    { name: "Emma L.", rating: 4, comment: "Good quality service, will book again." }
  ];

  return (
    <div className="sticky top-4 space-y-6">
      {/* Pricing Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-black mb-4">Pricing Breakdown</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Price</span>
            <span className="text-black">${pricing.basePrice}</span>
          </div>
          
          {pricing.addonPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Add-ons</span>
              <span className="text-black">+${pricing.addonPrice}</span>
            </div>
          )}
          
          {pricing.expressPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Express Fee</span>
              <span className="text-black">+${pricing.expressPrice}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes & Fees</span>
            <span className="text-black">${pricing.tax.toFixed(2)}</span>
          </div>
          
          <hr className="border-gray-200" />
          
          <div className="flex justify-between text-lg font-bold">
            <span className="text-black">Total</span>
            <span className="text-green-600">${pricing.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Trust & Security */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-black">Secure Payment</span>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Your payment information is encrypted and secure.
        </p>
        <div className="flex items-center space-x-2">
          <Timer className="w-4 h-4 text-green-600" />
          <span className="text-sm text-gray-600">Free cancellation within 24 hours</span>
        </div>
      </div>

      {/* Reviews Preview */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-semibold text-black mb-3">Recent Reviews</h3>
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div key={index} className="border-l-2 border-green-600 pl-3">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-sm text-black">{review.name}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}