import { create } from 'zustand';
import { adminService } from '@/services/admin.service';
import type { DashboardStats } from '@/types/admin.types';

interface AdminStore {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
  fetchDashboardStats: () => Promise<void>;
  setSidebarOpen: (open: boolean) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  stats: null,
  loading: false,
  error: null,
  sidebarOpen: true,

  fetchDashboardStats: async () => {
    try {
      set({ loading: true, error: null });
      const response = await adminService.getDashboardStats();
      if (response.success) {
        set({ stats: response.data });
      }
    } catch (error) {
      set({ error: 'Failed to fetch dashboard stats' });
    } finally {
      set({ loading: false });
    }
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open })
}));