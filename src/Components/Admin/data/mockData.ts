// src/Components/Admin/data/mockData.ts

import type { Booking } from '@/types/Bookings.types';
import type { DashboardStats } from '@/types/admin.types';
import type { User } from '@/types/auth.types';

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalRevenue: 125000,
  activeUsers: 2450,
  activeServices: 180,
  monthlyBookings: 850,
  avgResponseTime: '2.4 min',
  serviceCompletion: 94.2,
  customerRetention: 89.5,
  providerRating: 4.8
};

// Mock Bookings
export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    customerPhone: '+1 234-567-8900',
    serviceName: 'House Deep Cleaning',
    providerName: 'Sarah Johnson',
    date: '2024-08-28',
    time: '10:00 AM',
    status: 'confirmed',
    amount: 120,
    location: 'New York, NY',
    paymentStatus: 'paid'
  },
  {
    id: 'BK002',
    customerName: 'Emma Davis',
    customerEmail: 'emma@example.com',
    customerPhone: '+1 234-567-8901',
    serviceName: 'Plumbing Repair',
    providerName: 'Mike Wilson',
    date: '2024-08-28',
    time: '2:00 PM',
    status: 'in-progress',
    amount: 180,
    location: 'Brooklyn, NY',
    paymentStatus: 'paid'
  },
  {
    id: 'BK003',
    customerName: 'Robert Brown',
    customerEmail: 'robert@example.com',
    customerPhone: '+1 234-567-8902',
    serviceName: 'Garden Maintenance',
    providerName: 'Lisa Chen',
    date: '2024-08-29',
    time: '9:00 AM',
    status: 'pending',
    amount: 80,
    location: 'Queens, NY',
    paymentStatus: 'pending'
  },
  {
    id: 'BK004',
    customerName: 'Maria Garcia',
    customerEmail: 'maria@example.com',
    customerPhone: '+1 234-567-8903',
    serviceName: 'Car Wash & Detailing',
    providerName: 'David Wilson',
    date: '2024-08-27',
    time: '3:00 PM',
    status: 'completed',
    amount: 60,
    location: 'Manhattan, NY',
    paymentStatus: 'paid'
  },
  {
    id: 'BK005',
    customerName: 'James Taylor',
    customerEmail: 'james@example.com',
    customerPhone: '+1 234-567-8904',
    serviceName: 'Electrical Repair',
    providerName: 'Tom Anderson',
    date: '2024-08-26',
    time: '11:00 AM',
    status: 'cancelled',
    amount: 150,
    location: 'Bronx, NY',
    paymentStatus: 'refunded'
  }
];

// Mock Users
export const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.d@example.com', 
    role: 'Admin', 
    status: 'Active', 
    joinDate: '2023-01-15' 
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane.s@example.com', 
    role: 'Provider', 
    status: 'Active', 
    joinDate: '2023-02-20' 
  },
  { 
    id: '3', 
    name: 'Mike Johnson', 
    email: 'mike.j@example.com', 
    role: 'customer', 
    status: 'Inactive', 
    joinDate: '2023-03-10' 
  },
  { 
    id: '4', 
    name: 'Emily Brown', 
    email: 'emily.b@example.com', 
    role: 'customer', 
    status: 'Active', 
    joinDate: '2023-04-05' 
  },
  { 
    id: '5', 
    name: 'Chris Lee', 
    email: 'chris.l@example.com', 
    role: 'Provider', 
    status: 'Pending', 
    joinDate: '2023-05-21' 
  }
];