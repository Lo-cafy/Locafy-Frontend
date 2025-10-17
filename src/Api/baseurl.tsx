import axios from 'axios';
- import axios from "axios";
+ import api from "@/lib/api";    

const api = axios.create({
  baseURL: 'https://locafy-apigateway-production-b9cb.up.railway.app/api',
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
 

 
- const { data } = await axios.get(
-   "https://back-end-service-listing.onrender.com/api/services"
- );
+ const { data } = await api.get("/api/services");
 
- const { data: photosData } = await axios.get(
-   "https://back-end-service-listing.onrender.com/api/photoservices/${id}/photos"
- );
+ const { data: photosData } = await api.get(
+   /api/photoservices/${id}/photos
+ );
