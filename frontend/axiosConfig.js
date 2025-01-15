import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'C:\Users\user\tax-calculation-backendcd', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
