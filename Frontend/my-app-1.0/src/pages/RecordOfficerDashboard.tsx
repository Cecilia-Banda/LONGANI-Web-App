import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Clock,
  Bell,
  UserPlus,
  XCircle,
  Eye,
  Search,
  Phone,
  MapPin,
  FileText,
  BarChart3,
  AlertTriangle,
  Plus,
  Edit,
  RefreshCw,
} from "lucide-react";

// --- Utility Functions ---

const getPriorityColor = (priority) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "waiting":
      return "bg-yellow-100 text-yellow-800";
    case "with-nurse":
      return "bg-blue-100 text-blue-800";
    case "with-doctor":
      return "bg-green-100 text-green-800";
    case "complete":
      return "bg-gray-100 text-gray-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "missed":
      return "bg-red-100 text-red-800";
    case "scheduled":
      return "bg-blue-100 text-blue-800";
    case "incomplete":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// --- Reusable Components ---

const StatCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {change !== undefined && (
          <p
            className={`text-sm mt-1 ${
              change > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change > 0 ? "+" : ""}
            {change} from yesterday
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const NotificationItem = ({ notification, onDismiss }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-md ${
      notification.type === "alert"
        ? "bg-red-50 border border-red-200"
        : notification.type === "warning"
        ? "bg-orange-50 border border-orange-200"
        : "bg-blue-50 border border-blue-200"
    }`}
  >
    <div className="flex items-center space-x-3">
      {notification.type === "alert" && (
        <AlertTriangle className="w-5 h-5 text-red-600" />
      )}
      {notification.type === "warning" && (
        <AlertTriangle className="w-5 h-5 text-orange-600" />
      )}
      {notification.type === "info" && (
        <Bell className="w-5 h-5 text-blue-600" />
      )}
      <div>
        <p className="text-sm font-medium text-gray-900">
          {notification.message}
        </p>
        <p className="text-xs text-gray-500">
          {notification.from} • {notification.time}
        </p>
      </div>
    </div>
    <button onClick={() => onDismiss(notification.id)} className="p-1">
      <XCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
    </button>
  </div>
);

const TabButton = ({ id, label, icon: Icon, selectedTab, setSelectedTab }) => (
  <button
    key={id}
    onClick={() => setSelectedTab(id)}
    className={`flex items-center space-x-2 px-4 py-3 border rounded-md font-medium text-sm transition-all duration-200 ease-in-out ${
      selectedTab === id
        ? "border-blue-500 text-blue-600 bg-white shadow-sm"
        : "border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-500"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </button>
);

// --- Dashboard Sections (Components) ---

type Patient = {
  id: number;
  name: string;
  status: string;
  arrivalTime: string;
  waitTime: string;
  reason: string;
  priority: string;
};

type Appointment = {
  id: number;
  time: string;
  patient: string;
  doctor: string;
  status: string;
  phone: string;
};

type Registration = {
  id: number;
  name: string;
  time: string;
  status: string;
  phone: string;
  address: string;
};

interface OverviewSectionProps {
  patientQueue: Patient[];
  appointments: Appointment[];
  recentRegistrations: Registration[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ patientQueue, appointments, recentRegistrations }) => {
  const waitingPatients = patientQueue.filter((p) => p.status === "waiting").length;
  const withNursePatients = patientQueue.filter((p) => p.status === "with-nurse").length;
  const withDoctorPatients = patientQueue.filter((p) => p.status === "with-doctor").length;
  const incompleteRegistrations = recentRegistrations.filter((r) => r.status === "incomplete").length;

  return (
    <div className="space-y-6">
      {/* Daily Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients Today"
          value={patientQueue.length + appointments.length + recentRegistrations.length} // Simplified total
          change={5} // Placeholder
          icon={Users}
          color="bg-blue-500"
          subtitle="Approx. count"
        />
        <StatCard
          title="Current Queue"
          value={patientQueue.length}
          change={-2} // Placeholder
          icon={Clock}
          color="bg-orange-500"
          subtitle="Average wait: 25 min (placeholder)"
        />
        <StatCard
          title="Appointments Today"
          value={appointments.length}
          change={3} // Placeholder
          icon={Calendar}
          color="bg-green-500"
          subtitle="Check appointments tab for details"
        />
        <StatCard
          title="New Registrations"
          value={recentRegistrations.length}
          change={1} // Placeholder
          icon={UserPlus}
          color="bg-purple-500"
          subtitle={`${incompleteRegistrations} incomplete profiles`}
        />
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Queue Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Waiting</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {waitingPatients}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">With Nurse</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {withNursePatients}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">With Doctor</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {withDoctorPatients}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Urgent Tasks
          </h3>
          <div className="space-y-3">
            {/* Example of dynamic urgent tasks based on data */}
            {patientQueue.some((p) => p.waitTime.includes("1h")) && (
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Long wait time
                  </p>
                  <p className="text-xs text-gray-600">
                    {patientQueue.find((p) => p.waitTime.includes("1h"))?.name} - {patientQueue.find((p) => p.waitTime.includes("1h"))?.waitTime}
                  </p>
                </div>
              </div>
            )}

            {incompleteRegistrations > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Incomplete profiles
                  </p>
                  <p className="text-xs text-gray-600">
                    {incompleteRegistrations} patients need completion
                  </p>
                </div>
              </div>
            )}

            {appointments.filter(
              (app) => new Date(app.time).getDate() === new Date().getDate() + 1
            ).length > 0 && ( // Placeholder for tomorrow's appointments
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Confirmation calls
                  </p>
                  <p className="text-xs text-gray-600">
                    {
                      appointments.filter(
                        (app) =>
                          new Date(app.time).getDate() ===
                          new Date().getDate() + 1
                      ).length
                    }{" "}
                    appointments tomorrow (placeholder)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientQueueSection = ({
  patientQueue,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">
        ✅ Today's Patient Queue
      </h2>
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
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="waiting">Waiting</option>
          <option value="with-nurse">With Nurse</option>
          <option value="with-doctor">With Doctor</option>
        </select>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">
                Patient
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Arrival
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Wait Time
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Reason
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Priority
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {patientQueue
              .filter(
                (patient) =>
                  patient.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) &&
                  (filterStatus === "all" || patient.status === filterStatus)
              )
              .map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {patient.name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status.replace("-", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    {patient.arrivalTime}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-medium ${
                        patient.waitTime.includes("1h")
                          ? "text-red-600"
                          : patient.waitTime.includes("45")
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {patient.waitTime}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{patient.reason}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        patient.priority
                      )}`}
                    >
                      {patient.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Edit className="w-4 h-4" />
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

const AppointmentsSection = ({ appointments, setAppointments }) => {
  const handleAddAppointment = () => {
    const newAppointment = {
      id: appointments.length > 0 ? Math.max(...appointments.map(app => app.id)) + 1 : 1,
      time: "10:00", // Default time, ideally would open a modal for input
      patient: "New Patient",
      doctor: "Dr. New",
      status: "scheduled",
      phone: "555-XXXX",
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          📅 Upcoming Appointments
        </h2>
        <button
          onClick={handleAddAppointment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">
                  Time
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Patient
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Doctor
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Contact
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">
                    {appointment.time}
                  </td>
                  <td className="p-4 text-gray-900">{appointment.patient}</td>
                  <td className="p-4 text-gray-600">{appointment.doctor}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        {appointment.phone}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      {appointment.status === "missed" && (
                        <button className="text-orange-600 hover:text-orange-800 p-1">
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
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

const RecentRegistrationsSection = ({ recentRegistrations, setRecentRegistrations }) => {
    const handleAddPatient = () => {
        const newPatient = {
            id: recentRegistrations.length > 0 ? Math.max(...recentRegistrations.map(reg => reg.id)) + 1 : 1,
            name: "New Registered Patient",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "incomplete", // New registrations might be incomplete initially
            phone: "555-XXXX",
            address: "N/A",
        };
        setRecentRegistrations((prev) => [...prev, newPatient]);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          📝 Recent Registrations
        </h2>
        <button
          onClick={handleAddPatient}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>New Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">
                  Patient Name
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Registration Time
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Profile Status
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Contact
                </th>
                <th className="text-left p-4 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.map((registration) => (
                <tr
                  key={registration.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 font-medium text-gray-900">
                    {registration.name}
                  </td>
                  <td className="p-4 text-gray-600">{registration.time}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        registration.status
                      )}`}
                    >
                      {registration.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {registration.phone || "Missing"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {registration.address}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      {registration.status === "incomplete" && (
                        <button className="text-orange-600 hover:text-orange-800 p-1">
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                      )}
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

// --- Main Dashboard Component ---

const RecordOfficerDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false); // Changed to false by default for cleaner initial view
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // State for your data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "alert",
      message: "Emergency patient 'Jane Doe' admitted",
      time: "2 minutes ago",
      from: "ER",
    },
    {
      id: 2,
      type: "info",
      message: "New patient registration needs verification",
      time: "15 minutes ago",
      from: "System",
    },
    {
      id: 3,
      type: "warning",
      message: "Appointment slot 2:30 PM still available",
      time: "30 minutes ago",
      from: "Scheduling",
    },
  ]);

  const [patientQueue, setPatientQueue] = useState([
    {
      id: 1,
      name: "John Doe",
      status: "waiting",
      arrivalTime: "09:15",
      waitTime: "45 min",
      reason: "Consultation",
      priority: "normal",
    },
    {
      id: 2,
      name: "Johnson Kamboe",
      status: "with-nurse",
      arrivalTime: "09:30",
      waitTime: "30 min",
      reason: "Check-up",
      priority: "normal",
    },
    {
      id: 3,
      name: "Mike Chen",
      status: "with-doctor",
      arrivalTime: "08:45",
      waitTime: "1h 15min",
      reason: "Follow-up",
      priority: "high",
    },
    {
      id: 4,
      name: "Emmaculate Walasa",
      status: "waiting",
      arrivalTime: "10:00",
      waitTime: "15 min",
      reason: "Vaccination",
      priority: "normal",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      time: "11:00",
      patient: "Emma Thompson",
      doctor: "Dr. Smith",
      status: "scheduled",
      phone: "555-0123",
    },
    {
      id: 2,
      time: "12:00",
      patient: "David Lee",
      doctor: "Dr. Jones",
      status: "confirmed",
      phone: "555-0124",
    },
    {
      id: 3,
      time: "14:00",
      patient: "Sarah Brown",
      doctor: "Dr. Kim",
      status: "missed",
      phone: "555-0125",
    },
    {
      id: 4,
      time: "12:30",
      patient: "James Miller",
      doctor: "Dr. Davis",
      status: "scheduled",
      phone: "555-0126",
    },
  ]);

  const [recentRegistrations, setRecentRegistrations] = useState([
    {
      id: 1,
      name: "Tom Anderson",
      time: "08:30",
      status: "complete",
      phone: "555-0128",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Alice Johnson",
      time: "09:00",
      status: "incomplete",
      phone: "",
      address: "Missing Address",
    },
    {
      id: 3,
      name: "Peter Parker",
      time: "09:45",
      status: "complete",
      phone: "555-0130",
      address: "456 Oak Ave",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "appointments":
        return (
          <AppointmentsSection
            appointments={appointments}
            setAppointments={setAppointments}
          />
        );
      case "registrations":
        return (
          <RecentRegistrationsSection
            recentRegistrations={recentRegistrations}
            setRecentRegistrations={setRecentRegistrations}
          />
        );
      case "queue":
        return (
          <PatientQueueSection
            patientQueue={patientQueue}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        );
      default:
        return (
          <OverviewSection
            patientQueue={patientQueue}
            appointments={appointments}
            recentRegistrations={recentRegistrations}
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
              <h1 className="text-2xl font-bold text-gray-900">
                Record Officer Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back, Record Officer!
              </p>
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
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-600 hover:text-gray-900 relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-2">
                      <div className="flex justify-between items-center px-4 mb-2">
                        <p className="text-sm font-semibold text-gray-800">
                          Notifications
                        </p>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                      {notifications.length > 0 ? (
                        <div className="space-y-2 px-4 max-h-60 overflow-y-auto">
                          {notifications.map((notif) => (
                            <NotificationItem
                              key={notif.id}
                              notification={notif}
                              onDismiss={dismissNotification}
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-sm text-gray-500 py-4">
                          No new notifications.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "queue", label: "Patient Queue", icon: Users },
              { id: "appointments", label: "Appointments", icon: Calendar },
              { id: "registrations", label: "Registrations", icon: UserPlus },
            ].map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default RecordOfficerDashboard;