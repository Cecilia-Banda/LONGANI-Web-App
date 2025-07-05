import React, { memo } from 'react';
// A simple mock service to handle patient data operations
export interface PatientVitals {
  bloodPressure: string;
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  height: string;
  weight: string;
  recordedAt?: string;
  recordedBy?: string;
}
export interface PatientMedical {
  diagnosis: string;
  prescription: string;
  notes?: string;
  updatedAt?: string;
  updatedBy?: string;
}
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  location: string;
  phoneNumber: string;
  lastVisit: string;
  notes: string;
  createdAt: string;
  vitals: PatientVitals[];
  medical: PatientMedical[];
}
// Initial mock data
const mockPatients: Patient[] = [{
  id: 'p-1001',
  firstName: 'John',
  lastName: 'Doe',
  nationalId: 'ZMB123456789',
  email: 'john.doe@example.com',
  location: 'Lusaka, Zambia',
  phoneNumber: '+260 97 1234567',
  lastVisit: '2023-05-15',
  notes: 'Regular check-up, patient reported mild headaches.',
  createdAt: '2022-01-15',
  vitals: [{
    bloodPressure: '120/80',
    temperature: '36.6',
    heartRate: '72',
    respiratoryRate: '16',
    oxygenSaturation: '98%',
    height: '175 cm',
    weight: '70 kg',
    recordedAt: '2023-05-15',
    recordedBy: 'Nurse User'
  }],
  medical: [{
    diagnosis: 'Mild tension headache',
    prescription: 'Paracetamol 500mg, 1 tablet every 6 hours as needed for pain',
    updatedAt: '2023-05-15',
    updatedBy: 'Doctor User'
  }]
}, {
  id: 'p-1002',
  firstName: 'Maria',
  lastName: 'Garcia',
  nationalId: 'ZMB987654321',
  email: 'maria.garcia@example.com',
  location: 'Ndola, Zambia',
  phoneNumber: '+260 96 7654321',
  lastVisit: '2023-06-22',
  notes: 'Follow-up for hypertension treatment.',
  createdAt: '2022-03-10',
  vitals: [{
    bloodPressure: '140/90',
    temperature: '36.8',
    heartRate: '78',
    respiratoryRate: '18',
    oxygenSaturation: '97%',
    height: '165 cm',
    weight: '68 kg',
    recordedAt: '2023-06-22',
    recordedBy: 'Nurse User'
  }],
  medical: [{
    diagnosis: 'Hypertension, Stage 1',
    prescription: 'Lisinopril 10mg, once daily',
    updatedAt: '2023-06-22',
    updatedBy: 'Doctor User'
  }]
}, {
  id: 'p-1003',
  firstName: 'Jungkook',
  lastName: 'Jeon',
  nationalId: 'ZMB456789123',
  email: 'jungkook.jeon@example.com',
  location: 'Kitwe, Zambia',
  phoneNumber: '+260 95 4567891',
  lastVisit: '2023-07-05',
  notes: 'Presenting with symptoms of seasonal allergies.',
  createdAt: '2022-05-20',
  vitals: [{
    bloodPressure: '118/76',
    temperature: '37.0',
    heartRate: '80',
    respiratoryRate: '17',
    oxygenSaturation: '99%',
    height: '182 cm',
    weight: '85 kg',
    recordedAt: '2023-07-05',
    recordedBy: 'Nurse User'
  }],
  medical: [{
    diagnosis: 'Seasonal allergic rhinitis',
    prescription: 'Cetirizine 10mg, once daily as needed',
    updatedAt: '2023-07-05',
    updatedBy: 'Doctor User'
  }]
}, {
  id: 'p-1004',
  firstName: 'Emma',
  lastName: 'Mwale',
  nationalId: 'ZMB789123456',
  email: 'emma.mwale@example.com',
  location: 'Livingstone, Zambia',
  phoneNumber: '+260 97 8912345',
  lastVisit: '2023-08-12',
  notes: 'Prenatal check-up, second trimester.',
  createdAt: '2022-08-30',
  vitals: [{
    bloodPressure: '110/70',
    temperature: '36.5',
    heartRate: '85',
    respiratoryRate: '16',
    oxygenSaturation: '98%',
    height: '168 cm',
    weight: '65 kg',
    recordedAt: '2023-08-12',
    recordedBy: 'Nurse User'
  }],
  medical: [{
    diagnosis: 'Normal pregnancy, 24 weeks',
    prescription: 'Prenatal vitamins, once daily',
    updatedAt: '2023-08-12',
    updatedBy: 'Doctor User'
  }]
}, {
  id: 'p-1005',
  firstName: 'David',
  lastName: 'Chen',
  nationalId: 'ZMB321654987',
  email: 'david.chen@example.com',
  location: 'Kabwe, Zambia',
  phoneNumber: '+260 96 3216549',
  lastVisit: '2023-09-03',
  notes: 'Routine diabetes monitoring.',
  createdAt: '2022-10-15',
  vitals: [{
    bloodPressure: '130/85',
    temperature: '36.7',
    heartRate: '75',
    respiratoryRate: '16',
    oxygenSaturation: '97%',
    height: '172 cm',
    weight: '78 kg',
    recordedAt: '2023-09-03',
    recordedBy: 'Nurse User'
  }],
  medical: [{
    diagnosis: 'Type 2 Diabetes Mellitus, well-controlled',
    prescription: 'Metformin 500mg, twice daily with meals',
    updatedAt: '2023-09-03',
    updatedBy: 'Doctor User'
  }]
}];
// In-memory store
let patients = [...mockPatients];
// Get all patients
export const getAllPatients = () => {
  return [...patients];
};
// Get patient by ID
export const getPatientById = (id: string) => {
  return patients.find(patient => patient.id === id);
};
// Add new patient
export const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'vitals' | 'medical'>) => {
  const newPatient: Patient = {
    ...patientData,
    id: `p-${1000 + patients.length + 1}`,
    createdAt: new Date().toISOString().split('T')[0],
    vitals: [],
    medical: []
  };
  patients.push(newPatient);
  return newPatient;
};
// Update patient
export const updatePatient = (id: string, patientData: Partial<Patient>) => {
  const index = patients.findIndex(patient => patient.id === id);
  if (index !== -1) {
    patients[index] = {
      ...patients[index],
      ...patientData
    };
    return patients[index];
  }
  return null;
};
// Delete patient
export const deletePatient = (id: string) => {
  const index = patients.findIndex(patient => patient.id === id);
  if (index !== -1) {
    const deletedPatient = patients[index];
    patients = patients.filter(patient => patient.id !== id);
    return deletedPatient;
  }
  return null;
};
// Add vitals to patient
export const addVitals = (patientId: string, vitalsData: Omit<PatientVitals, 'recordedAt' | 'recordedBy'>, recordedBy: string) => {
  const patient = getPatientById(patientId);
  if (patient) {
    const newVitals = {
      ...vitalsData,
      recordedAt: new Date().toISOString().split('T')[0],
      recordedBy
    };
    patient.vitals.unshift(newVitals); // Add to the beginning of the array
    patient.lastVisit = newVitals.recordedAt;
    return newVitals;
  }
  return null;
};
// Add medical record to patient
export const addMedicalRecord = (patientId: string, medicalData: Omit<PatientMedical, 'updatedAt' | 'updatedBy'>, updatedBy: string) => {
  const patient = getPatientById(patientId);
  if (patient) {
    const newMedical = {
      ...medicalData,
      updatedAt: new Date().toISOString().split('T')[0],
      updatedBy
    };
    patient.medical.unshift(newMedical); // Add to the beginning of the array
    return newMedical;
  }
  return null;
};
// Search patients
export const searchPatients = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return patients.filter(patient => patient.firstName.toLowerCase().includes(lowercaseQuery) || patient.lastName.toLowerCase().includes(lowercaseQuery) || patient.nationalId.toLowerCase().includes(lowercaseQuery) || patient.email.toLowerCase().includes(lowercaseQuery) || patient.phoneNumber.includes(query));
};