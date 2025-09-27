 
import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { User } from '@/types/auth.types';
import type { Service } from '@/types/service.types';
import type { DashboardStats } from '@/types/admin.types';

class AdminService {
  private baseUrl = '/api/admin';

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const response = await fetch(`${this.baseUrl}/stats`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch dashboard stats');
    }
  }

  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`${this.baseUrl}/users?${queryParams}`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async updateUserStatus(userId: string, isActive: boolean): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to update user status');
    }
  }

  async getServices(params: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<ApiResponse<PaginatedResponse<Service>>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`${this.baseUrl}/services?${queryParams}`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch services');
    }
  }

  async approveService(serviceId: string): Promise<ApiResponse<Service>> {
    try {
      const response = await fetch(`${this.baseUrl}/services/${serviceId}/approve`, {
        method: 'POST',
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to approve service');
    }
  }

  async rejectService(serviceId: string, reason: string): Promise<ApiResponse<Service>> {
    try {
      const response = await fetch(`${this.baseUrl}/services/${serviceId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to reject service');
    }
  }

  async updateSettings(settings: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      return await response.json();
    } catch (error) {
      throw new Error('Failed to update settings');
    }
  }
}

export const adminService = new AdminService();