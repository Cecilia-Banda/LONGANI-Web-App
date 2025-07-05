import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Save, X, AlertTriangle, FileText, ChevronLeft } from 'lucide-react';
import { getPatientById, addMedicalRecord } from '../services/patientService';
const DiagnosisForm: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    notes: ''
  });
  // Only admin and doctor can access this page
  const canAddDiagnosis = ['admin', 'doctor'].includes(user?.role || '');
  useEffect(() => {
    if (id) {
      const patient = getPatientById(id);
      if (patient) {
        setPatientName(`${patient.firstName} ${patient.lastName}`);
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
    if (!canAddDiagnosis || !id) return;
    setIsSubmitting(true);
    setError('');
    try {
      const result = addMedicalRecord(id, formData, user?.name || 'Unknown User');
      if (result) {
        alert('Medical record added successfully!');
        navigate(`/patients/${id}`);
      } else {
        setError('Failed to add medical record. Patient not found.');
      }
    } catch (err) {
      setError('An error occurred while adding the medical record.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!canAddDiagnosis) {
    return <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          You don't have permission to add medical diagnoses.
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
  if (error === 'Patient not found') {
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
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <FileText size={20} className="mr-2 text-blue-600" />
              Add Medical Diagnosis
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Patient: {patientName}
            </p>
          </div>
          <button onClick={() => navigate(`/patients/${id}`)} className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronLeft size={16} className="mr-1" />
            Back to Patient
          </button>
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
            <div className="space-y-6">
              <div>
                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                  Diagnosis
                </label>
                <div className="mt-1">
                  <textarea id="diagnosis" name="diagnosis" rows={3} value={formData.diagnosis} onChange={handleChange} required placeholder="Enter patient diagnosis" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div>
                <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">
                  Prescription
                </label>
                <div className="mt-1">
                  <textarea id="prescription" name="prescription" rows={3} value={formData.prescription} onChange={handleChange} required placeholder="Enter medication details, dosage, frequency, etc." className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <div className="mt-1">
                  <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="Any additional notes or recommendations (optional)" className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
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
                {isSubmitting ? 'Saving...' : 'Save Medical Record'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default DiagnosisForm;