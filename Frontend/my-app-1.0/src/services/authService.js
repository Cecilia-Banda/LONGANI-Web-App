// services/AuthService.js
import API from '../utils/axios';

localStorage.setItem('UserRole', JSON.stringify({ token: '', role: '' }));
console.log('stored UserRole in localStorage:', localStorage.getItem('UserRole'));

export const registerUser = async (formData) => {
  const res = await API.post('/auth/register', formData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await API.post('/auth/login', formData);
  return res.data;
};

export const getProfile = async () => {
  const res = await API.get('/auth/profile');
  return res.data;
};
export const createPatient = async (patientData) => {
  const res = await API.post('/patients', patientData);
  return res.data;
};
export const searchPatients = async (query) => {
  const res = await API.get(`/patients/search?q=${query}`);
  return res.data;
};
