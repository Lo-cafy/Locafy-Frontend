import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from './redux';
import { setGoogleUser, type GoogleUser, logout as logoutAction } from '@/store/authStore';

export function useAuthStore() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state: RootState) => state.auth);
  const hydrateFromStorage = () => {
     
  };
  return {
    user: auth.user,
     isLoggedIn: auth.isAuthenticated, 
    loading: auth.loading,
    setUser: (user: GoogleUser) => dispatch(setGoogleUser(user)),
    logout: () => dispatch(logoutAction()),
    hydrateFromStorage
  };
}