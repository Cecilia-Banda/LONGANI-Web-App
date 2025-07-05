import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserPlus, Trash2, Edit, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getAllPatients, searchPatients, deletePatient, Patient } from '../services/patientService';
const Patients: React.FC = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const canAddPatient = ['admin', 'data_manager'].includes(user?.role || '');
  const canEditPatient = ['admin', 'data_manager'].includes(user?.role || '');
  const canDeletePatient = ['admin'].includes(user?.role || '');
  useEffect(() => {
    // Load patients on component mount
    setPatients(getAllPatients());
    setIsLoading(false);
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === '') {
      setPatients(getAllPatients());
    } else {
      setPatients(searchPatients(query));
    }
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this patient record? This action cannot be undone.')) {
      deletePatient(id);
      setPatients(patients.filter(patient => patient.id !== id));
    }
  };
  return <div className="container mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-600">Manage patient information</p>
        </div>
        {canAddPatient && <div className="mt-4 sm:mt-0">
            <Link to="/patients/register" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <UserPlus size={16} className="mr-2" />
              Add New Patient
            </Link>
          </div>}
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search patients by name, ID, email, or phone..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        {isLoading ? <div className="text-center py-10">
            <p>Loading patient records...</p>
          </div> : patients.length === 0 ? <div className="text-center py-10">
            <p className="text-gray-500">No patients found</p>
            {searchQuery && <p className="text-sm text-gray-400 mt-1">
                Try adjusting your search query
              </p>}
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    National ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map(patient => <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 font-medium">
                            {patient.firstName[0]}
                            {patient.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.firstName} {patient.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {patient.phoneNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {patient.nationalId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(patient.lastVisit).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => navigate(`/patients/${patient.id}`)} className="text-blue-600 hover:text-blue-900" title="View patient">
                          <Eye size={18} />
                        </button>
                        {canEditPatient && <button onClick={() => navigate(`/patients/${patient.id}/edit`)} className="text-indigo-600 hover:text-indigo-900" title="Edit patient">
                            <Edit size={18} />
                          </button>}
                        {canDeletePatient && <button onClick={() => handleDelete(patient.id)} className="text-red-600 hover:text-red-900" title="Delete patient">
                            <Trash2 size={18} />
                          </button>}
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </div>;
};
export default Patients;