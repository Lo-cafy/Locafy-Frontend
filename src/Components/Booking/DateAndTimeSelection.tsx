import { Calendar } from "lucide-react";

interface DateAndTimeSelectionProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onDateChange: (date: string) => void;
  onTimeSlotChange: (slot: string) => void;
}

export default function DateAndTimeSelection({
  selectedDate,
  selectedTimeSlot,
  onDateChange,
  onTimeSlotChange
}: DateAndTimeSelectionProps) {
  const timeSlots = [
    { id: "morning", label: "Morning", time: "9:00 AM - 12:00 PM", available: true },
    { id: "afternoon", label: "Afternoon", time: "12:00 PM - 4:00 PM", available: true },
    { id: "evening", label: "Evening", time: "4:00 PM - 8:00 PM", available: false },
    { id: "asap", label: "ASAP", time: "Express booking", available: true, extra: 150 }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-green-600" />
        Date & Time Selection
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-black mb-2">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">Available Time Slots</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => slot.available && onTimeSlotChange(slot.id)}
              disabled={!slot.available}
              className={`p-3 rounded-lg border text-left transition ${
                selectedTimeSlot === slot.id
                  ? "border-green-600 bg-green-50"
                  : slot.available
                  ? "border-gray-300 hover:border-green-300"
                  : "border-gray-200 bg-gray-50 text-gray-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{slot.label}</div>
                  <div className="text-sm text-gray-600">{slot.time}</div>
                </div>
                {slot.extra && (
                  <span className="text-sm text-green-600">+${slot.extra}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}