import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, MapPin, Phone, Mail, Calendar, Activity, FileText, Clipboard, Edit, Pill, ChevronLeft, Clock, AlertTriangle } from 'lucide-react';
import { getPatientById, Patient, PatientVitals, PatientMedical } from '../services/patientService';
const PatientDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Check permissions for different sections
  const canViewPersonalInfo = ['admin', 'data_manager', 'nurse', 'doctor'].includes(user?.role || '');
  const canEditPersonalInfo = ['admin', 'data_manager'].includes(user?.role || '');
  const canViewVitals = ['admin', 'nurse', 'doctor'].includes(user?.role || '');
  const canEditVitals = ['admin', 'nurse'].includes(user?.role || '');
  const canViewMedical = ['admin', 'doctor'].includes(user?.role || '');
  const canEditMedical = ['admin', 'doctor'].includes(user?.role || '');
  useEffect(() => {
    if (id) {
      const fetchedPatient = getPatientById(id);
      if (fetchedPatient) {
        setPatient(fetchedPatient);
        setLoading(false);
      } else {
        setError('Patient not found');
        setLoading(false);
      }
    }
  }, [id]);
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <p>Loading patient data...</p>
      </div>;
  }
  if (error || !patient) {
    return <div className="text-center py-10">
        <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Patient Not Found</h2>
        <p className="mt-2 text-gray-600">
          The requested patient record could not be found.
        </p>
        <button onClick={() => navigate('/patients')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          <ChevronLeft size={16} className="mr-2" />
          Back to Patient List
        </button>
      </div>;
  }
  return <div className="container mx-auto max-w-4xl">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Patient Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal details and medical records
            </p>
          </div>
          <button onClick={() => navigate('/patients')} className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChevronLeft size={16} className="mr-1" />
            Back to Patients
          </button>
        </div>
        <div className="border-t border-gray-200">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex space-x-8">
              <button className={`px-3 py-2 text-sm font-medium ${activeTab === 'info' ? 'text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('info')}>
                Personal Information
              </button>
              {canViewVitals && <button className={`px-3 py-2 text-sm font-medium ${activeTab === 'vitals' ? 'text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('vitals')}>
                  Vitals
                </button>}
              {canViewMedical && <button className={`px-3 py-2 text-sm font-medium ${activeTab === 'medical' ? 'text-blue-700 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('medical')}>
                  Medical Records
                </button>}
            </div>
          </div>
          {activeTab === 'info' && canViewPersonalInfo && <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <User size={16} className="mr-1" /> Full Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <FileText size={16} className="mr-1" /> National ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.nationalId}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail size={16} className="mr-1" /> Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.email}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone size={16} className="mr-1" /> Phone number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.phoneNumber}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPin size={16} className="mr-1" /> Location
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.location}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar size={16} className="mr-1" /> Last visit
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Clipboard size={16} className="mr-1" /> Check-up Notes
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {patient.notes}
                  </dd>
                </div>
              </dl>
              {canEditPersonalInfo && <div className="mt-6 flex justify-end">
                  <button type="button" onClick={() => navigate(`/patients/${patient.id}/edit`)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Edit size={16} className="mr-2" /> Edit Information
                  </button>
                </div>}
            </div>}
          {activeTab === 'vitals' && canViewVitals && <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <Activity size={20} className="mr-2 text-blue-600" /> Patient
                  Vitals
                </h4>
                {canEditVitals && <button type="button" onClick={() => navigate(`/vitals/${patient.id}`)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Edit size={16} className="mr-2" /> Record New Vitals
                  </button>}
              </div>
              {patient.vitals.length === 0 ? <div className="text-center py-6 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No vitals records available</p>
                </div> : <div className="space-y-8">
                  {patient.vitals.map((vital, index) => <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>Recorded on {vital.recordedAt}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          By: {vital.recordedBy}
                        </div>
                      </div>
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Blood Pressure
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.bloodPressure} mmHg
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Temperature
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.temperature} °C
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Heart Rate
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.heartRate} bpm
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Respiratory Rate
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.respiratoryRate} breaths/min
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Oxygen Saturation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.oxygenSaturation}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Height
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.height}
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Weight
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {vital.weight}
                          </dd>
                        </div>
                      </dl>
                    </div>)}
                </div>}
            </div>}
          {activeTab === 'medical' && canViewMedical && <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-medium text-gray-900 flex items-center">
                  <FileText size={20} className="mr-2 text-blue-600" /> Medical
                  Records
                </h4>
                {canEditMedical && <button type="button" onClick={() => navigate(`/diagnosis/${patient.id}`)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Edit size={16} className="mr-2" /> Add New Diagnosis
                  </button>}
              </div>
              {patient.medical.length === 0 ? <div className="text-center py-6 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No medical records available</p>
                </div> : <div className="space-y-8">
                  {patient.medical.map((record, index) => <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>Updated on {record.updatedAt}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          By: {record.updatedBy}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-500 mb-2">
                          Diagnosis
                        </h5>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded-md border border-gray-200">
                          {record.diagnosis}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-500 mb-2">
                          Prescription
                        </h5>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded-md border border-gray-200">
                          {record.prescription}
                        </p>
                      </div>
                      {record.notes && <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-500 mb-2">
                            Additional Notes
                          </h5>
                          <p className="text-sm text-gray-900 bg-white p-3 rounded-md border border-gray-200">
                            {record.notes}
                          </p>
                        </div>}
                    </div>)}
                </div>}
            </div>}
        </div>
      </div>
    </div>;
};
export default PatientDetail;