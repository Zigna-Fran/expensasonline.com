import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.yoursecureapp.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const fetchSecureData = async (): Promise<string> => {
  try {
    const response = await api.get('/secure-data');
    return response.data.encryptedData;
  } catch (error) {
    console.error('Error fetching secure data:', error);
    throw error;
  }
};

export const sendSecureData = async (encryptedData: string): Promise<void> => {
  try {
    await api.post('/secure-data', { encryptedData });
  } catch (error) {
    console.error('Error sending secure data:', error);
    throw error;
  }
};