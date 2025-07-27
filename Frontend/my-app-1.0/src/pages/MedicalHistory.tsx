import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ClipboardList,
  Clock,
  User,
  Calendar,
  Thermometer,
  HeartPulse,
  AlertCircle
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  physician: string;
  notes?: string;
}

const MedicalHistory: React.FC = () => {
  const { patientId } = useParams(); // Get from URL params
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch medical records - replace with API call
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Simulate API call
        const mockRecords: MedicalRecord[] = [
          {
            id: '1',
            date: '2023-05-15',
            diagnosis: 'Hypertension',
            treatment: 'Start Lisinopril 10mg daily',
            physician: 'Dr. Smith',
            notes: 'Follow up in 3 months'
          },
          {
            id: '2',
            date: '2023-02-28',
            diagnosis: 'Annual Physical',
            treatment: 'Lab work ordered',
            physician: 'Dr. Johnson'
          }
        ];
        
        setRecords(mockRecords);
      } catch (err) {
        setError('Failed to load medical records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [patientId]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <ClipboardList className="h-8 w-8 mr-2 text-blue-600" />
        <h1 className="text-2xl font-bold">Medical History</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Patient Info Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex items-center">
          <User className="h-5 w-5 mr-2 text-gray-600" />
          <span className="font-medium">Patient ID: {patientId}</span>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-2" />
                    Diagnosis
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <HeartPulse className="h-4 w-4 mr-2" />
                    Treatment
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Physician
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.length > 0 ? (
                records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{record.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{record.diagnosis}</span>
                    </td>
                    <td className="px-6 py-4">
                      {record.treatment}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.physician}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No medical records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
