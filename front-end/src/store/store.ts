import { configureStore } from '@reduxjs/toolkit';
import reviewReducer from './reviewStore';
import serviceReducer from './serviceStore';

export const store = configureStore({
  reducer: {
    reviews: reviewReducer,
    services: serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;