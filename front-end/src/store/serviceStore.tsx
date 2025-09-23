import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ServiceListing, ServiceDetailsResponse, ServiceSearchFilters } from '@/types/service.types';

export type ServiceState = {
  services: ServiceListing[];
  selectedService: ServiceDetailsResponse | null;
  filters: ServiceSearchFilters;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  nextCursor: string | null;
};

const initialState: ServiceState = {
  services: [],
  selectedService: null,
  filters: {},
  loading: false,
  error: null,
  hasMore: false,
  nextCursor: null,
};

// Async thunks
export const getServiceDetails = createAsyncThunk(
  'services/getDetails',
  async (serviceId: string) => {
    const response = await fetch(`/api/services/${serviceId}`);
    if (!response.ok) throw new Error('Failed to fetch service details');
    return response.json() as Promise<ServiceDetailsResponse>;
  }
);

export const searchServices = createAsyncThunk(
  'services/search',
  async (params: ServiceSearchFilters & { cursor?: string }) => {
    const response = await fetch('/api/services/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.nextCursor = null;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.nextCursor = null;
    },
    clearSelectedService: (state) => {
      state.selectedService = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get service details
      .addCase(getServiceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServiceDetails.fulfilled, (state, action) => {
        state.selectedService = action.payload;
        state.loading = false;
      })
      .addCase(getServiceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch service details';
      })
      
      // Search services
      .addCase(searchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchServices.fulfilled, (state, action) => {
        const { services, hasMore, nextCursor } = action.payload;
        if (state.nextCursor) {
          state.services.push(...services);
        } else {
          state.services = services;
        }
        state.hasMore = hasMore;
        state.nextCursor = nextCursor;
        state.loading = false;
      })
      .addCase(searchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch services';
      });
  },
});

export const { updateFilter, clearFilters, clearSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;