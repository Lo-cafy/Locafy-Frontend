"use client";

import { useState } from "react";
import { X, Calendar, Clock, Star, CheckCircle, ArrowRight } from "lucide-react";

interface QuickBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    name: string;
    price: number;
    rating: number;
    image?: string;
    providerName?: string;
    reviewCount?: number;
  };
  onConfirm: () => void;
}

export default function QuickBookModal({ 
  isOpen, 
  onClose, 
  service, 
  onConfirm 
}: QuickBookModalProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const timeSlots = [
    { id: "morning", label: "Morning", time: "9:00 AM - 12:00 PM" },
    { id: "afternoon", label: "Afternoon", time: "12:00 PM - 4:00 PM" },
    { id: "evening", label: "Evening", time: "4:00 PM - 8:00 PM" }
  ];

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsBooking(true);
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      onConfirm();
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Quick Book</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Service Summary */}
        <div className="p-6 border-b">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">
                {service.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-2">by {service.providerName}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-gray-500">({service.reviewCount} reviews)</span>
                </div>
                <div className="text-lg font-bold text-green-600">${service.price}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="p-6 space-y-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Select Time Slot
            </label>
            <div className="grid grid-cols-1 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.id)}
                  className={`p-3 rounded-lg border text-left transition ${
                    selectedTime === slot.id
                      ? "border-green-600 bg-green-50"
                      : "border-gray-300 hover:border-green-300"
                  }`}
                >
                  <div className="font-medium">{slot.label}</div>
                  <div className="text-sm text-gray-600">{slot.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Features */}
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">What's included:</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Professional service
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Free consultation
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                24/7 customer support
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Satisfaction guarantee
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              <div>Total Amount</div>
              <div className="text-lg font-bold text-green-600">${service.price}</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime || isBooking}
              className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isBooking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Booking...
                </>
              ) : (
                <>
                  Confirm Booking
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
