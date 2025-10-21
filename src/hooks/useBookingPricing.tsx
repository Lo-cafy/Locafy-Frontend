import { useMemo } from "react";
import type { BookingData } from "./useBookingData";

interface PricingBreakdown {
  basePrice: number;
  addonPrice: number;
  expressPrice: number;
  subtotal: number;
  tax: number;
  total: number;
}

export function useBookingPricing(service: any, bookingData: BookingData): PricingBreakdown {
  return useMemo(() => {
    if (!service) {
      return {
        basePrice: 0,
        addonPrice: 0,
        expressPrice: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      };
    }

    const addons = [
      { id: "express", name: "Express Delivery", price: 200, description: "Get your service within 24 hours" },
      { id: "ironing", name: "Ironing Service", price: 100, description: "Professional ironing included" },
      { id: "eco", name: "Eco-friendly Detergent", price: 50, description: "Environmentally safe cleaning" },
      { id: "fragrance", name: "Premium Fragrance", price: 75, description: "Add your favorite scent" }
    ];

    const basePrice = Number(service?.price) || 0;
    const addonPrice = bookingData.selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return total + (Number(addon?.price) || 0);
    }, 0);
    const expressPrice = bookingData.selectedTimeSlot === "asap" ? 150 : 0;
    const subtotal = basePrice + addonPrice + expressPrice;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    return {
      basePrice,
      addonPrice,
      expressPrice,
      subtotal,
      tax,
      total
    };
  }, [service, bookingData.selectedAddons, bookingData.selectedTimeSlot]);
}


