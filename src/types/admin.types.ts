import type { User, UserRole} from './auth.types';

export type ServiceStatus = 'pending' | 'active' | 'suspended' | 'deleted';

export interface DashboardStats {
  revenue: RevenueStats;
  users: UserStats;
  services: ServiceStats;
  bookings: BookingStats;
  recentActivity: Activity[];
}

export interface RevenueStats {
  total: number;
  thisMonth: number;
  lastMonth: number;
  growth: number;
  chart: {
    date: string;
    amount: number;
  }[];
}

export interface UserStats {
  total: number;
  active: number;
  new: number;
  growth: number;
  activeUsers: number;      // Added this
  newUsersThisMonth: number; // Added this
  byRole: {
    role: UserRole;
    count: number;
  }[];
}

export interface ServiceStats {
  total: number;
  active: number;
  pending: number;
  activeServices: number;    // Added this
  pendingApprovals: number;  // Added this
  categories: {
    name: string;
    count: number;
  }[];
}

export interface BookingStats {
  total: number;
  pending: number;
  completed: number;
  cancelled: number;
  chart: {
    date: string;
    count: number;
  }[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  user?: {
    id: string;
    name: string;
  };
  timestamp: string;
  metadata?: Record<string, any>;
}

export type ActivityType = 'user_registered' | 'booking_created' | 'service_created' | 'payment_received';


export interface AdminUser extends User {
  permissions: string[];
  lastActivity: string;
  loginHistory: {
    timestamp: string;
    ip: string;
    device: string;
  }[];
}

export interface ServiceProvider {
  id: string;
  userId: string;
  businessName: string;
  description: string;
  categories: string[];
  rating: number;
  totalBookings: number;
  isVerified: boolean;
  documents: {
    type: string;
    url: string;
    verified: boolean;
  }[];
}

export interface AdminService {
  id: string;
  name: string;
  description: string;
  provider: ServiceProvider;
  category: {
    id: string;
    name: string;
  };
  price: {
    amount: number;
    currency: string;
    unit: string;
  };
  status: ServiceStatus;
  rating: number;
  totalBookings: number;
  createdAt: string;
  updatedAt: string;
}