import api from './api';
import { UserProfile, UserPreferences } from '../types/user.types';

export const userService = {
  getUserProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>) => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },

  updatePreferences: async (data: UserPreferences) => {
    const response = await api.put('/user/preferences', data);
    return response.data;
  },

  getBookings: async (params?: any) => {
    const response = await api.get('/user/bookings', { params });
    return response.data;
  },

  getServices: async (params?: any) => {
    const response = await api.get('/user/services', { params });
    return response.data;
  },

  getNotifications: async () => {
    const response = await api.get('/user/notifications');
    return response.data;
  },
};