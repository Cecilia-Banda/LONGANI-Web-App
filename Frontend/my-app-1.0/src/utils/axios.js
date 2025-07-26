import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // or your deployed backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token automatically if available
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('hospitalAppUser'));
  const token = localStorage.getItem('hospitalAppToken');
  if (token) {
    config.headers.Authorization = `Bearer ${tokenoken}`;
  }
  return config;
});

export default API;
