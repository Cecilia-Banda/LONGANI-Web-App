import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Change if your backend URL is different
});

// Helper to add JWT token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Create a new patient
export const addPatient = async (patientData) => {
  try {
    const response = await axios.post('/api/Record Officer/patients', patientData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('❌ Error adding patient:', error);
    throw error;
  }
};

// ✅ Get all patients
export const getAllPatients = async () => {
  try {
    const response = await API.get('/patients', getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching patients:', error);
    throw error;
  }
};

// ✅ Get a patient by ID
export const getPatientById = async (id) => {
  try {
    const response = await API.get(`/patients/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching patient by ID:', error);
    throw error;
  }
};

// ✅ Update a patient
export const updatePatient = async (id, updatedData) => {
  try {
    const response = await API.put(`/patients/${id}`, updatedData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('❌ Error updating patient:', error);
    throw error;
  }
};

// ✅ Delete a patient
export const deletePatient = async (id) => {
  try {
    const response = await API.delete(`/patients/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('❌ Error deleting patient:', error);
    throw error;
  }
};

// ✅ Search patients by query (e.g. name, ID, etc.)
export const searchPatients = async (query) => {
  try {
    const response = await API.get(`/patients/search?q=${query}`, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('❌ Error searching patients:', error);
    throw error;
  }
};
