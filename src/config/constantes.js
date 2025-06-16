//export const apiEndpoint = "http://localhost:8080";
//export const apiEndpoint = "https://elixir-backend-60fb.onrender.com";

import axios from 'axios';

const apiEndpoint = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // Altere para true se usar cookies
});

// Interceptor para adicionar token
apiEndpoint.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para tratar erros
apiEndpoint.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export { apiEndpoint };