export interface AvailabilitySlot {
  availability_id: number;
  service_id: number;
  available_date: string; // ISO string
  start_time: string; 
  end_time: string;
  max_bookings: number;
  current_bookings: number;
  special_price: string | null;
  price_modifier_percent: number | null;
  is_available: boolean;
  unavailable_reason: string | null;
  is_recurring: boolean;
  recurrence_pattern: string | null;
  recurrence_end_date: string | null;
  created_at: string;
  created_by: number;
  available_day: string;
}

export interface DateAndTimeSelectionProps {
  serviceId: number; // for API fetch
  selectedDate: string;
  selectedTimeSlot: string;
  onDateChange: (date: string) => void;
  onTimeSlotChange: (slotId: number) => void;
}
