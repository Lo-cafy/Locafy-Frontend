export interface BookingData {
  selectedDate: string;
  selectedTimeSlot: string;
  selectedAddress: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  specialInstructions: string;
  selectedAddons: string[];
  paymentMethod: string;
  promoCode: string;
}

export interface PricingBreakdown {
  basePrice: number;
  addonPrice: number;
  expressPrice: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface BookingCTAProps {
  pricing: {
    total: number;
  };
  isBooking: boolean;
  onBooking: () => void;
  isDisabled: boolean;
}


