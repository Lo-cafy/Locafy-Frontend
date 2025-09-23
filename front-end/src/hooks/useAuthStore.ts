import { useAppDispatch, useAppSelector } from './redux';
import { getCurrentUser, login, logout } from '@/store/authStore';
import { useCallback } from 'react';

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const hydrateFromStorage = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, [dispatch]);

  const loginUser = async (credentials: { email: string; password: string }) => {
    try {
      await dispatch(login(credentials)).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  };

  const logoutUser = async () => {
    await dispatch(logout());
  };

  return {
    user,
    isLoggedIn: isAuthenticated,
    loading,
    error,
    loginUser,
    logoutUser,
    hydrateFromStorage,
  };
};