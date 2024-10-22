import { B_Url } from '@/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${B_Url}`, 
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;