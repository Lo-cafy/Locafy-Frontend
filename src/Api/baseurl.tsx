import axios from 'axios';

const api = axios.create({
  baseURL: 'http://locafy-apigateway-production.up.railway.app/api',
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