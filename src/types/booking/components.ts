export interface DateAndTimeSelectionProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onDateChange: (date: string) => void;
  onTimeSlotChange: (slot: string) => void;
}

export interface AddressAndLocationProps {
  selectedAddress: string;
  onAddressChange: (address: string) => void;
}

export interface CustomerInformationProps {
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  specialInstructions: string;
  onCustomerInfoChange: (field: string, value: string) => void;
  onSpecialInstructionsChange: (instructions: string) => void;
}

export interface ExtrasAndAddonsProps {
  selectedAddons: string[];
  onAddonsChange: (addons: string[]) => void;
}

export interface PaymentMethodProps {
  paymentMethod: string;
  promoCode: string;
  onPaymentMethodChange: (method: string) => void;
  onPromoCodeChange: (code: string) => void;
}

export interface PricingSummaryProps {
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


