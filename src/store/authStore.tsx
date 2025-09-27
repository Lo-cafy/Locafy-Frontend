// src/store/authStore.ts
import { create } from "zustand";
import type { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  hydrateFromStorage: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user: User) =>
    set(() => {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      return { user, isLoggedIn: true };
    }),

  hydrateFromStorage: () => {
    const storedUser = localStorage.getItem("User");
    const loggedInFlag = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedInFlag === "true") {
      set({ user: JSON.parse(storedUser), isLoggedIn: true });
    }
  },

  logout: () =>
    set(() => {
      localStorage.removeItem("User");
      localStorage.setItem("isLoggedIn", "false");
      return { user: null, isLoggedIn: false };
    }),
}));