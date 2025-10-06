"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ServiceSummary from "@/Components/Booking/ServiceSummary";
import DateAndTimeSelection from "@/Components/Booking/DateAndTimeSelection";
import AddressAndLocation from "@/Components/Booking/AddressAndLocation";
import CustomerInformation from "@/Components/Booking/CustomerInformation";
import ExtrasAndAddons from "@/Components/Booking/ExtrasAndAddons";
import PaymentMethod from "@/Components/Booking/PaymentMethod";
import PricingSummary from "@/Components/Booking/PricingSummary";
import { ArrowLeft, Check } from "lucide-react";
import axios from "axios";

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

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const serviceData = location.state?.service;

  const [service, setService] = useState<any>(serviceData);
  const [loading, setLoading] = useState(!serviceData);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Main booking state
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: "",
    selectedTimeSlot: "",
    selectedAddress: "home",
    customerInfo: {
      name: "John Doe",
      phone: "+1 234 567 8900",
      email: "john@example.com"
    },
    specialInstructions: "",
    selectedAddons: [],
    paymentMethod: "upi",
    promoCode: ""
  });

  // Update individual booking data fields
  const updateBookingData = (field: keyof BookingData, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update nested customer info
  const updateCustomerInfo = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [field]: value
      }
    }));
  };

  useEffect(() => {
    if (!serviceData && id) {
      const fetchService = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`https://back-end-service-listing.onrender.com/api/services/${id}`);
          const data = res.data.service || res.data.data || res.data;
          setService(data);
        } catch (err) {
          console.error("Error fetching service:", err);
          navigate("/all-services");
        } finally {
          setLoading(false);
        }
      };
      fetchService();
    }
  }, [id, serviceData, navigate]);

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    updateBookingData("selectedDate", tomorrow.toISOString().split('T')[0]);
  }, []);

  const calculateTotal = () => {
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
  };

  const handleBooking = async () => {
    setIsBooking(true);
    // Simulate booking API call with all booking data
    console.log("Booking data:", bookingData);
    setTimeout(() => {
      setBookingSuccess(true);
      setIsBooking(false);
    }, 2000);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!service) return <div className="min-h-screen flex items-center justify-center">Service not found</div>;

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your service has been successfully booked. You'll receive a confirmation email shortly.</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/user/dashboard")}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Track Booking
            </button>
            <button 
              onClick={() => navigate("/all-services")}
              className="w-full bg-white text-green-600 border border-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pricing = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Service
          </button>
          <h1 className="text-xl font-bold text-black">Book Service</h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Column - Booking Form */}
          <div className="xl:col-span-3 space-y-6">
            <ServiceSummary service={service} />
            
            <DateAndTimeSelection 
              selectedDate={bookingData.selectedDate}
              selectedTimeSlot={bookingData.selectedTimeSlot}
              onDateChange={(date) => updateBookingData("selectedDate", date)}
              onTimeSlotChange={(slot) => updateBookingData("selectedTimeSlot", slot)}
            />

            <AddressAndLocation 
              selectedAddress={bookingData.selectedAddress}
              onAddressChange={(address) => updateBookingData("selectedAddress", address)}
            />

            <CustomerInformation 
              customerInfo={bookingData.customerInfo}
              specialInstructions={bookingData.specialInstructions}
              onCustomerInfoChange={updateCustomerInfo}
              onSpecialInstructionsChange={(instructions) => updateBookingData("specialInstructions", instructions)}
            />

            <ExtrasAndAddons 
              selectedAddons={bookingData.selectedAddons}
              onAddonsChange={(addons) => updateBookingData("selectedAddons", addons)}
            />

            <PaymentMethod 
              paymentMethod={bookingData.paymentMethod}
              promoCode={bookingData.promoCode}
              onPaymentMethodChange={(method) => updateBookingData("paymentMethod", method)}
              onPromoCodeChange={(code) => updateBookingData("promoCode", code)}
            />
          </div>

          {/* Right Column - Pricing Summary */}
          <div className="xl:col-span-1">
            <PricingSummary 
              pricing={pricing}
              service={service}
              selectedAddons={bookingData.selectedAddons}
              selectedTimeSlot={bookingData.selectedTimeSlot}
            />
          </div>
        </div>

        {/* Sticky Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="hidden sm:block">
              <div className="text-sm text-gray-600">Estimated completion: Within 48 hours</div>
              <div className="text-lg font-bold text-green-600">${pricing.total.toFixed(2)}</div>
            </div>
            <button
              onClick={handleBooking}
              disabled={!bookingData.selectedTimeSlot || isBooking}
              className="w-full sm:w-auto bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isBooking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
        
        <div className="h-24"></div>
      </div>
    </div>
  );
}