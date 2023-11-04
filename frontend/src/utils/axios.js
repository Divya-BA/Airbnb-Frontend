import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL:'https://airbnb-zegy.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
