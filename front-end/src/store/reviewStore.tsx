import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Review, CreateReviewInput, ReviewStats } from '../types/review.types';

export type ReviewState = {
  reviews: Review[];
  stats: ReviewStats | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
};
const initialState: ReviewState = {
  reviews: [],
  stats: null,
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: false,
};

export const fetchReviews = createAsyncThunk(
  'reviews/fetch',
  async ({ serviceId, page = 1 }: { serviceId: string; page?: number }) => {
    const response = await fetch(`/api/services/${serviceId}/reviews?page=${page}`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  }
);

export const fetchReviewStats = createAsyncThunk(
  'reviews/fetchStats',
  async (serviceId: string) => {
    const response = await fetch(`/api/services/${serviceId}/reviews/stats`);
    if (!response.ok) throw new Error('Failed to fetch review stats');
    return response.json() as Promise<ReviewStats>;
  }
);

export const createReview = createAsyncThunk(
  'reviews/create',
  async (input: CreateReviewInput) => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    
    if (!response.ok) throw new Error('Failed to create review');
    return response.json() as Promise<Review>;
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/delete',
  async (reviewId: string) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete review');
    return reviewId;
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.stats = null;
      state.currentPage = 1;
      state.hasMore = false;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        const { reviews, hasMore, page } = action.payload;
        
        if (page === 1) {
          state.reviews = reviews;
        } else {
          state.reviews = [...state.reviews, ...reviews];
        }
        
        state.currentPage = page;
        state.hasMore = hasMore;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch reviews';
      })
      
  
      .addCase(fetchReviewStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      
  
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
        
       
        if (state.stats) {
          state.stats.totalReviews += 1;
      
          const totalRating = state.stats.averageRating * (state.stats.totalReviews - 1) + action.payload.rating;
          state.stats.averageRating = totalRating / state.stats.totalReviews;
          state.stats.ratingDistribution[action.payload.rating as 1 | 2 | 3 | 4 | 5] += 1;
        }
      })
      
 
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          review => review.reviewId !== action.payload
        );
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;