import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Clock,
  Bell,
  Search,
  Heart,
  Thermometer,
  Activity,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  RefreshCw,
  Stethoscope,
  ClipboardList,
  TrendingUp,
  Eye,
} from "lucide-react";

// --- Types ---
type PatientStatus = "waiting" | "with-nurse" | "with-doctor" | "complete";
type PatientPriority = "urgent" | "high" | "normal";
type NotificationType = "alert" | "info" | "warning";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  arrivalTime: string;
  status: PatientStatus;
  priority: PatientPriority;
  complaint: string;
  vitals?: Vitals;
  assignedNurse?: string;
  lastUpdated?: string;
}

interface Vitals {
  temperature: string;
  bloodPressure: string;
  heartRate: string;
  oxygenSaturation: string;
  respiratoryRate: string;
  weight: string;
  height: string;
  recordedAt: string;
  recordedBy: string;
}

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  time: string;
  from: string;
  isRead: boolean;
}

// --- Utility Functions ---
const getStatusColor = (status: PatientStatus): string => {
  switch (status) {
    case "waiting":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "with-nurse":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "with-doctor":
      return "bg-green-100 text-green-800 border-green-200";
    case "complete":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPriorityColor = (priority: PatientPriority): string => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "normal":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getNotificationColor = (type: NotificationType): string => {
  switch (type) {
    case "alert":
      return "bg-red-50 border-red-200 text-red-800";
    case "warning":
      return "bg-orange-50 border-orange-200 text-orange-800";
    case "info":
      return "bg-blue-50 border-blue-200 text-blue-800";
    default:
      return "bg-gray-50 border-gray-200 text-gray-800";
  }
};

// --- Components ---
const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
  color: string;
  subtitle?: string;
}> = ({ title, value, icon: Icon, color, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const TabButton: React.FC<{
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  count?: number;
}> = ({ id, label, icon: Icon, selectedTab, setSelectedTab, count }) => (
  <button
    onClick={() => setSelectedTab(id)}
    className={`flex items-center space-x-2 px-4 py-3 border rounded-md font-medium text-sm transition-all duration-200 ease-in-out relative ${
      selectedTab === id
        ? "border-blue-500 text-blue-600 bg-white shadow-sm"
        : "border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-500"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
    {count !== undefined && count > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {count}
      </span>
    )}
  </button>
);

// Patient Queue Section
const PatientQueueSection: React.FC<{
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  selectedPatient: Patient | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  patients,
  setPatients,
  selectedPatient,
  setSelectedPatient,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const updatePatientStatus = (patientId: number, newStatus: PatientStatus) => {
    setPatients(prev =>
      prev.map(patient =>
        patient.id === patientId
          ? { ...patient, status: newStatus, lastUpdated: new Date().toLocaleTimeString() }
          : patient
      )
    );
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.complaint.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Patient Queue</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="waiting">Waiting</option>
            <option value="with-nurse">With Nurse</option>
            <option value="with-doctor">With Doctor</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Patient</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Priority</th>
                <th className="text-left p-4 font-medium text-gray-600">Arrival</th>
                <th className="text-left p-4 font-medium text-gray-600">Complaint</th>
                <th className="text-left p-4 font-medium text-gray-600">Vitals</th>
                <th className="text-left p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className={`border-t hover:bg-gray-50 cursor-pointer ${
                    selectedPatient?.id === patient.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.age}y, {patient.gender}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                      {patient.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(patient.priority)}`}>
                      {patient.priority}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{patient.arrivalTime}</td>
                  <td className="p-4 text-gray-600">{patient.complaint}</td>
                  <td className="p-4">
                    {patient.vitals ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <select
                        value={patient.status}
                        onChange={(e) => updatePatientStatus(patient.id, e.target.value as PatientStatus)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="waiting">Waiting</option>
                        <option value="with-nurse">With Nurse</option>
                        <option value="with-doctor">With Doctor</option>
                        <option value="complete">Complete</option>
                      </select>
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPatient(patient);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Vitals & Assessment Section
const VitalsAssessmentSection: React.FC<{
  selectedPatient: Patient | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}> = ({ selectedPatient, setSelectedPatient, patients, setPatients, addNotification }) => {
  const [vitalsForm, setVitalsForm] = useState<Omit<Vitals, 'recordedAt' | 'recordedBy'>>({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    weight: '',
    height: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPatient?.vitals) {
      setVitalsForm({
        temperature: selectedPatient.vitals.temperature,
        bloodPressure: selectedPatient.vitals.bloodPressure,
        heartRate: selectedPatient.vitals.heartRate,
        oxygenSaturation: selectedPatient.vitals.oxygenSaturation,
        respiratoryRate: selectedPatient.vitals.respiratoryRate,
        weight: selectedPatient.vitals.weight,
        height: selectedPatient.vitals.height,
      });
    } else {
      setVitalsForm({
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        oxygenSaturation: '',
        respiratoryRate: '',
        weight: '',
        height: '',
      });
    }
  }, [selectedPatient]);

  const handleVitalsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newVitals: Vitals = {
      ...vitalsForm,
      recordedAt: new Date().toLocaleString(),
      recordedBy: 'Current Nurse', // This would come from auth context
    };

    // Update patient with new vitals
    setPatients(prev =>
      prev.map(patient =>
        patient.id === selectedPatient.id
          ? { 
              ...patient, 
              vitals: newVitals,
              status: 'with-doctor' as PatientStatus, // Auto-progress to doctor
              lastUpdated: new Date().toLocaleTimeString()
            }
          : patient
      )
    );

    // Update selected patient
    setSelectedPatient(prev => prev ? { ...prev, vitals: newVitals, status: 'with-doctor' } : null);

    // Add success notification
    addNotification({
      type: 'info',
      message: `Vitals recorded for ${selectedPatient.name} and sent to doctor`,
      time: 'Just now',
      from: 'Vitals System',
      isRead: false,
    });

    setIsSubmitting(false);
  };

  if (!selectedPatient) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Patient Selected</h3>
        <p className="text-gray-600">Select a patient from the queue to record vitals and assessments.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Patient Vitals & Assessment</h2>
            <p className="text-gray-600">Recording vitals for {selectedPatient.name}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Patient ID: {selectedPatient.id}</div>
            <div className="text-sm text-gray-500">Age: {selectedPatient.age}, Gender: {selectedPatient.gender}</div>
          </div>
        </div>

        <form onSubmit={handleVitalsSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Thermometer className="w-4 h-4 inline mr-2" />
                Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={vitalsForm.temperature}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, temperature: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="36.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="w-4 h-4 inline mr-2" />
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={vitalsForm.heartRate}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, heartRate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="72"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Activity className="w-4 h-4 inline mr-2" />
                Blood Pressure (mmHg)
              </label>
              <input
                type="text"
                value={vitalsForm.bloodPressure}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, bloodPressure: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="120/80"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oxygen Saturation (%)
              </label>
              <input
                type="number"
                value={vitalsForm.oxygenSaturation}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, oxygenSaturation: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="98"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Respiratory Rate (rpm)
              </label>
              <input
                type="number"
                value={vitalsForm.respiratoryRate}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, respiratoryRate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="16"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={vitalsForm.weight}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="70.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={vitalsForm.height}
                onChange={(e) => setVitalsForm(prev => ({ ...prev, height: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="175"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setSelectedPatient(null)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Recording...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Record Vitals</span>
                </>
              )}
            </button>
          </div>
        </form>

        {selectedPatient.vitals && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Previous Vitals Record</h4>
            <div className="text-sm text-green-800">
              <p>Recorded: {selectedPatient.vitals.recordedAt} by {selectedPatient.vitals.recordedBy}</p>
              <p>Temperature: {selectedPatient.vitals.temperature}°C, HR: {selectedPatient.vitals.heartRate} bpm</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Patient Records Section
const PatientRecordsSection: React.FC<{
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}> = ({ patients, selectedPatient, setSelectedPatient }) => {
  const patientsWithVitals = patients.filter(p => p.vitals);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
        <div className="text-sm text-gray-600">
          {patientsWithVitals.length} patients with recorded vitals
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Patients with Vitals</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {patientsWithVitals.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedPatient?.id === patient.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.age}y, {patient.gender}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Vitals recorded: {patient.vitals?.recordedAt}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {patient.status.replace("-", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">Vitals Details</h3>
          </div>
          <div className="p-4">
            {selectedPatient?.vitals ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">{selectedPatient.name}</h4>
                  <span className="text-sm text-gray-500">{selectedPatient.vitals.recordedAt}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Temperature</div>
                    <div className="font-medium">{selectedPatient.vitals.temperature}°C</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Heart Rate</div>
                    <div className="font-medium">{selectedPatient.vitals.heartRate} bpm</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Blood Pressure</div>
                    <div className="font-medium">{selectedPatient.vitals.bloodPressure} mmHg</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">O2 Saturation</div>
                    <div className="font-medium">{selectedPatient.vitals.oxygenSaturation}%</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Respiratory Rate</div>
                    <div className="font-medium">{selectedPatient.vitals.respiratoryRate} rpm</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Weight</div>
                    <div className="font-medium">{selectedPatient.vitals.weight} kg</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-xs text-blue-600">Recorded by</div>
                  <div className="font-medium text-blue-800">{selectedPatient.vitals.recordedBy}</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a patient to view vitals details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Notifications Section
const NotificationsSection: React.FC<{
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}> = ({ notifications, setNotifications }) => {
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:text-blue-800"
          disabled={notifications.every(n => n.isRead)}
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all ${
                notification.isRead ? 'opacity-60' : ''
              } ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {notification.type === "alert" && <AlertCircle className="w-4 h-4" />}
                    {notification.type === "warning" && <AlertCircle className="w-4 h-4" />}
                    {notification.type === "info" && <Bell className="w-4 h-4" />}
                    <span className="font-medium">{notification.from}</span>
                    <span className="text-xs opacity-75">{notification.time}</span>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded hover:bg-opacity-75 transition-colors"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-200">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No notifications at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Dashboard Component
const NurseDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("queue");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data - Replace with API calls
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      arrivalTime: "08:30",
      status: "waiting",
      priority: "normal",
      complaint: "Chest pain and shortness of breath",
      assignedNurse: "Current Nurse",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      arrivalTime: "09:15",
      status: "with-nurse",
      priority: "high",
      complaint: "Severe headache and dizziness",
      assignedNurse: "Current Nurse",
      vitals: {
        temperature: "37.2",
        bloodPressure: "140/90",
        heartRate: "88",
        oxygenSaturation: "96",
        respiratoryRate: "18",
        weight: "82.5",
        height: "178",
        recordedAt: "09:30 AM",
        recordedBy: "Nurse Smith",
      },
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      age: 28,
      gender: "Female",
      arrivalTime: "09:45",
      status: "waiting",
      priority: "urgent",
      complaint: "Allergic reaction - swelling and rash",
      assignedNurse: "Current Nurse",
    },
    {
      id: 4,
      name: "James Wilson",
      age: 67,
      gender: "Male",
      arrivalTime: "10:00",
      status: "with-doctor",
      priority: "normal",
      complaint: "Follow-up diabetes check",
      assignedNurse: "Current Nurse",
      vitals: {
        temperature: "36.8",
        bloodPressure: "125/85",
        heartRate: "76",
        oxygenSaturation: "98",
        respiratoryRate: "16",
        weight: "75.0",
        height: "172",
        recordedAt: "10:15 AM",
        recordedBy: "Current Nurse",
      },
    },
    {
      id: 5,
      name: "Lisa Park",
      age: 52,
      gender: "Female",
      arrivalTime: "10:30",
      status: "waiting",
      priority: "normal",
      complaint: "Back pain after lifting",
      assignedNurse: "Current Nurse",
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "alert",
      message: "Patient Emma Rodriguez marked as URGENT - allergic reaction",
      time: "2 minutes ago",
      from: "Emergency System",
      isRead: false,
    },
    {
      id: 2,
      type: "info",
      message: "Dr. Smith is requesting vitals for Michael Chen",
      time: "5 minutes ago",
      from: "Dr. Smith",
      isRead: false,
    },
    {
      id: 3,
      type: "warning",
      message: "Sarah Johnson has been waiting for 45 minutes",
      time: "10 minutes ago",
      from: "Queue System",
      isRead: true,
    },
    {
      id: 4,
      type: "info",
      message: "New patient Lisa Park has been assigned to you",
      time: "15 minutes ago",
      from: "Registration",
      isRead: false,
    },
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to add new notifications
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now(), // Simple ID generation
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Calculate statistics
  const stats = {
    totalPatients: patients.length,
    waitingPatients: patients.filter(p => p.status === "waiting").length,
    withNurse: patients.filter(p => p.status === "with-nurse").length,
    patientsWithVitals: patients.filter(p => p.vitals).length,
    urgentPatients: patients.filter(p => p.priority === "urgent").length,
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const renderContent = () => {
    switch (selectedTab) {
      case "records":
        return (
          <PatientRecordsSection
            patients={patients}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
          />
        );
      case "vitals":
        return (
          <VitalsAssessmentSection
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            patients={patients}
            setPatients={setPatients}
            addNotification={addNotification}
          />
        );
      case "notifications":
        return (
          <NotificationsSection
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      default:
        return (
          <PatientQueueSection
            patients={patients}
            setPatients={setPatients}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nurse Dashboard</h1>
              <p className="text-sm text-gray-600">Outpatient Department</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-500">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
              title="Total Patients"
              value={stats.totalPatients}
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="Waiting"
              value={stats.waitingPatients}
              icon={Clock}
              color="bg-yellow-500"
            />
            <StatCard
              title="With Nurse"
              value={stats.withNurse}
              icon={Stethoscope}
              color="bg-green-500"
            />
            <StatCard
              title="Vitals Recorded"
              value={stats.patientsWithVitals}
              icon={Activity}
              color="bg-purple-500"
            />
            <StatCard
              title="Urgent Cases"
              value={stats.urgentPatients}
              icon={AlertCircle}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto">
            <TabButton
              id="queue"
              label="Patient Queue"
              icon={Users}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              count={stats.waitingPatients}
            />
            <TabButton
              id="vitals"
              label="Vitals & Assessment"
              icon={Activity}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <TabButton
              id="records"
              label="Patient Records"
              icon={FileText}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              count={stats.patientsWithVitals}
            />
            <TabButton
              id="notifications"
              label="Notifications"
              icon={Bell}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              count={unreadNotifications}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default NurseDashboard;