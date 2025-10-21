import axios from 'axios';

// API Gateway client (default)
const api = axios.create({
  baseURL: 'https://locafy-apigateway-production-b9cb.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  
});

// // Service Listing microservice client
// export const listingApi = axios.create({
//   baseURL: 'https://back-end-servicelisting.onrender.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });


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