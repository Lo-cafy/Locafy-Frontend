"use client";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import type {AvailabilitySlot,DateAndTimeSelectionProps,} from "../../types/bookingtime";
import api from "@/Api/baseurl";

export default function DateAndTimeSelection({
  serviceId,
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange,
}: DateAndTimeSelectionProps) {
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/services/availability/service/${serviceId}`);
        setAvailabilitySlots(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch availability slots");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [serviceId]);

  const displayedSlots = selectedDate
    ? availabilitySlots.filter(
        (slot) => slot.available_date.split("T")[0] === selectedDate
      )
    : availabilitySlots;

  console.log("slots", availabilitySlots);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-green-600" />
        Date & Time Selection
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
        />
      </div>

      {loading && <div className="text-gray-500">Loading slots...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Available Time Slots
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedSlots.length > 0 ? (
              displayedSlots.map((slot) => {
                const timeLabel = `${slot.start_time.slice(0, 5)} - ${slot.end_time.slice(0, 5)}`;
                const isFull = slot.current_bookings >= slot.max_bookings;

                return (
                  <button
                    key={slot.availability_id}
                    onClick={() =>
                      !isFull &&
                      slot.is_available &&
                      onTimeSlotChange(slot.availability_id)
                    }
                    disabled={!slot.is_available || isFull}
                    className={`p-3 rounded-lg border text-left transition ${
                      selectedTimeSlot === String(slot.availability_id)
                        ? "border-green-600 bg-green-50"
                        : !slot.is_available || isFull
                        ? "border-gray-200 bg-gray-50 text-gray-400"
                        : "border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{slot.available_day}</span>
                      <span className="text-sm text-gray-600">{timeLabel}</span>
                      {slot.special_price && (
                        <span className="text-sm text-green-600">
                          ₹{slot.special_price}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="text-gray-500 col-span-full">
                No slots available for this date
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
