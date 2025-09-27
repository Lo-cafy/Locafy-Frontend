 
import { create } from 'zustand';
import type { User } from '@/types/auth.types';

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  updateUser: (userId: string, userData: Partial<User>) => void;
  deleteUser: (userId: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  setUsers: (users) => set({ users }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  updateUser: (userId, userData) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...userData } : user
      ),
      selectedUser: state.selectedUser?.id === userId
        ? { ...state.selectedUser, ...userData }
        : state.selectedUser
    }));
  },

  deleteUser: (userId) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
      selectedUser: state.selectedUser?.id === userId ? null : state.selectedUser
    }));
  }
}));