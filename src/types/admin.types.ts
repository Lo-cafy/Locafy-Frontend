export interface DashboardStats {
  totalRevenue: number;
  activeUsers: number;
  activeServices: number;
  monthlyBookings: number;
  avgResponseTime: string;
  serviceCompletion: number;
  customerRetention: number;
  providerRating: number;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon?: React.ElementType;
  iconColor?: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface ServiceTypeData {
  name: string;
  value: number;
  color: string;
}

export interface QuickStatData {
  title: string;
  value: string;
  details: string;
  icon: React.ElementType;
  iconColor: string;
}