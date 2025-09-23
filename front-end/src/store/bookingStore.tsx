import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
  Booking, 
  CreateBookingInput, 
  AvailabilityResponse,
  BookingStatus 
} from '../types/booking.types';

export type BookingState = {
  bookings: Booking[];
  selectedBooking: Booking | null;
  availability: AvailabilityResponse | null;
  loading: boolean;
  error: string | null;
  filter: {
    status?: BookingStatus;
    dateRange?: {
      start: string;
      end: string;
    };
  };
};
const initialState: BookingState = {
  bookings: [],
  selectedBooking: null,
  availability: null,
  loading: false,
  error: null,
  filter: {},
};

// Async thunks
export const fetchBookings = createAsyncThunk(
  'bookings/fetch',
  async (params?: { status?: BookingStatus; dateRange?: { start: string; end: string } }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.dateRange) {
      queryParams.append('startDate', params.dateRange.start);
      queryParams.append('endDate', params.dateRange.end);
    }
    
    const response = await fetch(`/api/bookings?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json() as Promise<Booking[]>;
  }
);

export const fetchAvailability = createAsyncThunk(
  'bookings/fetchAvailability',
  async ({ serviceId, date }: { serviceId: string; date: string }) => {
    const response = await fetch(`/api/services/${serviceId}/availability?date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch availability');
    return response.json() as Promise<AvailabilityResponse>;
  }
);

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (input: CreateBookingInput) => {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json() as Promise<Booking>;
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateStatus',
  async ({ bookingId, status }: { bookingId: string; status: BookingStatus }) => {
    const response = await fetch(`/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) throw new Error('Failed to update booking status');
    return { bookingId, status };
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<typeof initialState.filter>) => {
      state.filter = action.payload;
    },
    clearSelectedBooking: (state) => {
      state.selectedBooking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch bookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })
      
      // Fetch availability
      .addCase(fetchAvailability.fulfilled, (state, action) => {
        state.availability = action.payload;
      })
      
      // Create booking
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings = [action.payload, ...state.bookings];
      })
      
      // Update booking status
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const { bookingId, status } = action.payload;
        const booking = state.bookings.find(b => b.bookingId === bookingId);
        if (booking) {
          booking.status = status;
        }
      });
  },
});

export const { setFilter, clearSelectedBooking } = bookingSlice.actions;
export default bookingSlice.reducer;