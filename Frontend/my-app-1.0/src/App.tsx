import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Appointments from './pages/Appointments';
import DoctorDashboard from './pages/DoctorDashboard';
import NurseDashboard from './pages/NurseDashboard';
import RecordOfficerDashboard from './pages/RecordOfficerDashboard';
import PatientDetail from './pages/PatientDetail';
import PatientRegistration from './pages/PatientRegistration';
import PatientEdit from './pages/PatientEdit';
import Patients from './pages/Patients';
import VitalsRecording from './pages/VitalsRecording';
import DiagnosisForm from './pages/DiagnosisForm';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
export function App() {
  return <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute>
                <Layout />
              </ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/nurse" element={<NurseDashboard />} />
            <Route path="/dashboard/Record Officer" element={<RecordOfficerDashboard />} />
            <Route path="/patients/register" element={<PatientRegistration />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/patients/:id/edit" element={<PatientEdit />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/vitals/:id" element={<VitalsRecording />} />
            <Route path="/diagnosis/:id" element={<DiagnosisForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/patients/new" element={<PatientRegistration />} />
            <Route path="/reports-logs" element={<h2>Coming Soon</h2>} />
            <Route path="/role-permissions" element={<h2>Coming Soon</h2>} />
            <Route path="/facility-configuration" element={<h2>Coming Soon</h2>} />

      
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>;
}
