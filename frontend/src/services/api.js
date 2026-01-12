import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProduct = async (productId) => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

// Contact
export const submitContactInquiry = async (data) => {
  const response = await apiClient.post('/contact', data);
  return response.data;
};

// Support
export const createSupportTicket = async (data) => {
  const response = await apiClient.post('/support/ticket', data);
  return response.data;
};

export const getFAQItems = async () => {
  const response = await apiClient.get('/support/faq');
  return response.data;
};

// Newsletter
export const subscribeNewsletter = async (email) => {
  const response = await apiClient.post('/newsletter/subscribe', { email });
  return response.data;
};

// Seed database
export const seedDatabase = async () => {
  const response = await apiClient.post('/seed');
  return response.data;
};

export default apiClient;
