import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL:'https://airbnb-ba.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
