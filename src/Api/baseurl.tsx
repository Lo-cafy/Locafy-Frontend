import axios from 'axios';
import Cookies from 'js-cookie';

// API Gateway client (default)
const api = axios.create({
  baseURL: 'https://locafy-apigateway-production-2631.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});




//   baseURL: 'https://back-end-servicelisting.onrender.com',

api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
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