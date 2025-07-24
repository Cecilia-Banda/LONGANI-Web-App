import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
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

// --- Type Definitions ---
type Priority = "urgent" | "high" | "normal";
type Status = "waiting" | "with-nurse" | "with-doctor" | "complete" | "confirmed" | "missed" | "scheduled" | "incomplete";

interface Patient {
  id: number;
  name: string;
  status: Status;
  arrivalTime: string;
  waitTime: string;
  reason: string;
  priority: Priority;
}

interface Appointment {
  id: number;
  time: string;
  patient: string;
  doctor: string;
  status: Status;
  phone: string;
}

interface Registration {
  id: number;
  name: string;
  time: string;
  status: Status;
  phone: string;
  address: string;
}

interface Notification {
  id: number;
  type: "alert" | "warning" | "info";
  message: string;
  time: string;
  from: string;
}



// --- Utility Functions ---
const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
};

const getStatusColor = (status: Status): string => {
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
interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        {change !== undefined && (
          <p className={`text-sm mt-1 ${change > 0 ? "text-green-600" : "text-red-600"}`}>
            {change > 0 ? "+" : ""}{change} from yesterday
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onDismiss }) => (
  <div className={`flex items-center justify-between p-3 rounded-md ${
    notification.type === "alert" ? "bg-red-50 border border-red-200" :
    notification.type === "warning" ? "bg-orange-50 border border-orange-200" :
    "bg-blue-50 border border-blue-200"
  }`}>
    <div className="flex items-center space-x-3">
      <AlertTriangle className={`w-5 h-5 ${
        notification.type === "alert" ? "text-red-600" :
        notification.type === "warning" ? "text-orange-600" :
        "text-blue-600"
      }`} />
      <div>
        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
        <p className="text-xs text-gray-500">{notification.from} • {notification.time}</p>
      </div>
    </div>
    <button onClick={() => onDismiss(notification.id)} className="p-1">
      <XCircle className="w-4 h-4 text-gray-400 hover:text-gray-600" />
    </button>
  </div>
);

// --- Main Component ---
const RecordOfficerDashboard: React.FC = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  
  // Verify role on mount
  useEffect(() => {
    if (userRole !== "Record Officer") {
      navigate("/unauthorized");
    }
  }, [userRole, navigate]);

  // State management
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Data states
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [patientQueue, setPatientQueue] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [recentRegistrations, setRecentRegistrations] = useState<Registration[]>([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ... rest of your component logic and JSX

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header, Navigation, and Main Content */}
      {/* ... your existing JSX ... */}
    </div>
  );
};

export default RecordOfficerDashboard;
