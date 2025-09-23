import { configureStore } from '@reduxjs/toolkit';
import type { AuthState } from './authStore';
import type { ServiceState } from './serviceStore';
import type { BookingState } from './bookingStore';
import type { ReviewState } from './reviewStore';
import authReducer from './authStore';
import serviceReducer from './serviceStore';
import bookingReducer from './bookingStore';
import reviewReducer from './reviewStore';

 
export interface RootState {
  auth: AuthState;
  services: ServiceState;
  bookings: BookingState;
  reviews: ReviewState;
}
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    bookings: bookingReducer,
    reviews: reviewReducer,
  },
});

export type AppDispatch = typeof store.dispatch;