import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL:'https://airbnb-6lo2.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
