import axios from 'axios';

const api = axios.create({
  baseURL: ' https://locafy-apigateway-production-b9cb.up.railway.app/api',
 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
   
    console.log('Starting Request', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response Received', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);

export default api;
export const BASE_URL = "https://back-end-servicelisting.onrender.com";

export const API_ENDPOINTS = {
  SERVICES: "/api/services",
  SERVICES_BY_CATEGORY: (categoryId: number) => `/api/services/category/${categoryId}`,
  CATEGORIES: "/api/categories",
  PHOTOS: (serviceId: number) => `/api/photoservices/${serviceId}/photos`,
} as const;
