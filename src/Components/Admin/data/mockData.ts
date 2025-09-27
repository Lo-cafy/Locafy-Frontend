import type { Booking } from '@/types/Bookings.types';

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