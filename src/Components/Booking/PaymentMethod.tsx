import React, { useState } from "react";
import { CreditCard, Smartphone, Wallet, Truck } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  promoCode: string;
  onPaymentMethodChange: (method: string) => void;
  onPromoCodeChange: (code: string) => void;
}

export default function PaymentMethod({
  paymentMethod,
  promoCode,
  onPaymentMethodChange,
  onPromoCodeChange
}: PaymentMethodProps) {
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save20") {
      setShowPromoSuccess(true);
      setTimeout(() => setShowPromoSuccess(false), 3000);
    }
  };

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "card", label: "Card", icon: CreditCard },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "cod", label: "Cash on Delivery", icon: Truck }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
        <CreditCard className="w-5 h-5 mr-2 text-green-600" />
        Payment Method
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onPaymentMethodChange(method.id)}
            className={`p-3 rounded-lg border text-center transition ${
              paymentMethod === method.id
                ? "border-green-600 bg-green-50"
                : "border-gray-300 hover:border-green-300"
            }`}
          >
            <method.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
            <div className="text-sm font-medium">{method.label}</div>
          </button>
        ))}
      </div>

      <div className="flex space-x-3">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => onPromoCodeChange(e.target.value)}
          placeholder="Enter promo code"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
        />
        <button
          onClick={handlePromoCode}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Apply
        </button>
      </div>
      
      {showPromoSuccess && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Promo code applied! 20% discount added.
        </div>
      )}
    </div>
  );
}