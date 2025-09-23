export const SERVICE_CATEGORIES = [
  { id: 1, name: 'Plumbing', icon: '🔧' },
  { id: 2, name: 'Electrical', icon: '⚡' },
  { id: 3, name: 'Cleaning', icon: '🧹' },
  { id: 4, name: 'Painting', icon: '🎨' },
  { id: 5, name: 'Carpentry', icon: '🔨' },
  { id: 6, name: 'AC Repair', icon: '❄️' },
  { id: 7, name: 'Appliance Repair', icon: '🔌' },
  { id: 8, name: 'Pest Control', icon: '🐛' },
];

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const API_ENDPOINTS = {
  SERVICES: '/api/services',
  BOOKINGS: '/api/bookings',
  REVIEWS: '/api/reviews',
  CATEGORIES: '/api/categories',
  AUTH: '/api/auth',
} as const;

export const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2500', min: 1000, max: 2500 },
  { label: '₹2500 - ₹5000', min: 2500, max: 5000 },
  { label: 'Above ₹5000', min: 5000, max: null },
];

export const SORT_OPTIONS = [
  { value: 'created_at_desc', label: 'Newest First' },
  { value: 'created_at_asc', label: 'Oldest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating_desc', label: 'Highest Rated' },
  { value: 'distance_asc', label: 'Nearest First' },
];