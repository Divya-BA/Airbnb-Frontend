import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL:'https://zippy-sorbet-c69db2.netlify.app',
  withCredentials: true,
});

export default axiosInstance;
