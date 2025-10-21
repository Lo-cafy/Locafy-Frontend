"use client";

import ServiceSummary from "@/Components/Booking/ServiceSummary";
import DateAndTimeSelection from "@/Components/Booking/DateAndTimeSelection";
import AddressAndLocation from "@/Components/Booking/AddressAndLocation";
import CustomerInformation from "@/Components/Booking/CustomerInformation";
import ExtrasAndAddons from "@/Components/Booking/ExtrasAndAddons";
import PaymentMethod from "@/Components/Booking/PaymentMethod";
import PricingSummary from "@/Components/Booking/PricingSummary";
import BookingHeader from "@/Components/Booking/BookingHeader";
import BookingSuccess from "@/Components/Booking/BookingSuccess";
import BookingCTA from "@/Components/Booking/BookingCTA";
import { useBookingData } from "@/hooks/useBookingData";
import { useBookingPricing } from "@/hooks/useBookingPricing";

export default function BookingPage() {
  const {
    service,
    loading,
    isBooking,
    bookingSuccess,
    bookingData,
    updateBookingData,
    updateCustomerInfo,
    handleBooking
  } = useBookingData();

  const pricing = useBookingPricing(service, bookingData);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!service) return <div className="min-h-screen flex items-center justify-center">Service not found</div>;

  if (bookingSuccess) {
    return <BookingSuccess />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <BookingHeader />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Column - Booking Form */}
          <div className="xl:col-span-3 space-y-6">
            <ServiceSummary service={service} />

            <DateAndTimeSelection
              serviceId={service.service_id}
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
        <BookingCTA
          pricing={pricing}
          isBooking={isBooking}
          onBooking={handleBooking}
          isDisabled={!bookingData.selectedTimeSlot}
        />

        <div className="h-24"></div>
      </div>
    </div>
  );
}
