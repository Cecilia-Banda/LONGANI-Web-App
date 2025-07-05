import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Save, X, AlertTriangle } from 'lucide-react';
import { getPatientById, updatePatient } from '../services/patientService';
const PatientEdit: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    email: '',
    location: '',
    phoneNumber: '',
    lastVisit: '',
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  // Only admin and data_manager can access this page
  const canEditPatient = ['admin', 'data_manager'].includes(user?.role || '');
  useEffect(() => {
    if (id) {
      const patient = getPatientById(id);
      if (patient) {
        setFormData({
          firstName: patient.firstName,
          lastName: patient.lastName,
          nationalId: patient.nationalId,
          email: patient.email,
          location: patient.location,
          phoneNumber: patient.phoneNumber,
          lastVisit: patient.lastVisit,
          notes: patient.notes
        });
        setIsLoading(false);
      } else {
        setError('Patient not found');
        setIsLoading(false);
      }
    }
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEditPatient) return;
    setIsSubmitting(true);
    setError('');
    try {
      if (id) {
        const updatedPatient = updatePatient(id, formData);
        if (updatedPatient) {
          alert('Patient information updated successfully!');
          navigate(`/patients/${id}`);
        } else {
          setError('Failed to update patient. Patient not found.');
        }
      }
    } catch (err) {
      setError('An error occurred while updating the patient.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!canEditPatient) {
    return <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to edit patient information.
        </p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Return to Dashboard
        </button>
      </div>;
  }
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <p>Loading patient data...</p>
      </div>;
  }
  if (error && error === 'Patient not found') {
    return <div className="text-center py-10">
        <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Patient Not Found</h2>
        <p className="mt-2 text-gray-600">
          The requested patient record could not be found.
        </p>
        <button onClick={() => navigate('/patients')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Back to Patient List
        </button>
      </div>;
  }
  return <div className="container mx-auto max-w-3xl">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Edit Patient Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update patient details
          </p>
        </div>
        <div className="border-t border-gray-200">
          {error && error !== 'Patient not found' && <div className="bg-red-50 border-l-4 border-red-400 p-4 m-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>}
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1">
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1">
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">
                  National ID
                </label>
                <div className="mt-1">
                  <input type="text" name="nationalId" id="nationalId" value={formData.nationalId} onChange={handleChange} required className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1">
                  <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="lastVisit" className="block text-sm font-medium text-gray-700">
                  Last Visit Date
                </label>
                <div className="mt-1">
                  <input type="date" name="lastVisit" id="lastVisit" value={formData.lastVisit} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Check-up Notes
                </label>
                <div className="mt-1">
                  <textarea name="notes" id="notes" value={formData.notes} onChange={handleChange} rows={3} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={() => navigate(`/patients/${id}`)} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isSubmitting}>
                <X size={16} className="mr-2" />
                Cancel
              </button>
              <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isSubmitting}>
                <Save size={16} className="mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default PatientEdit;