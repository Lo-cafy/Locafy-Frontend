// src/store/useAuthStore.ts
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role?: "user" | "provider" | "admin" | "superadmin";
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  hydrateFromStorage: () => void;
  logout: () => void;   // ✅ add logout method
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  // Set user after Google login
  setUser: (user: User) =>
    set(() => {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      return { user, isLoggedIn: true };
    }),

  // Hydrate state from localStorage on page load
  hydrateFromStorage: () => {
    const storedUser = localStorage.getItem("User");
    const loggedInFlag = localStorage.getItem("isLoggedIn");

    if (storedUser && loggedInFlag === "true") {
      set({ user: JSON.parse(storedUser), isLoggedIn: true });
    }
  },

  // ✅ Proper logout
  logout: () =>
    set(() => {
      localStorage.removeItem("User");
      localStorage.setItem("isLoggedIn", "false");
      return { user: null, isLoggedIn: false };
    }),
}));
