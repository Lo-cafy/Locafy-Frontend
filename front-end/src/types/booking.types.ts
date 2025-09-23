import type { ServiceListing } from './service.types';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type Booking = {
  bookingId: string;
  serviceId: string;
  customerId: number;
  providerId: number;
  bookingDate: string;
  timeSlot: string;
  status: BookingStatus;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  service?: ServiceListing;
  customer?: {
    userId: number;
    firstname: string;
    lastname: string;
    phone?: string;
  };
};

export type CreateBookingInput = {
  serviceId: string;
  bookingDate: string;
  timeSlot: string;
  notes?: string;
};

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type AvailabilityResponse = {
  date: string;
  timeSlots: TimeSlot[];
};