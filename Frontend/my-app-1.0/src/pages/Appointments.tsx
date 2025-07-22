import React, { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MapPin, Search, Filter, Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

interface Appointment {
  id: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail: string;
  purpose: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  officerNotes?: string;
  inmateId?: string;
  inmateName?: string;
}

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      visitorName: 'Sarah Johnson',
      visitorPhone: '+1-555-0123',
      visitorEmail: 'sarah.j@email.com',
      purpose: 'Family Visit',
      date: '2025-07-22',
      time: '14:00',
      duration: 60,
      status: 'confirmed',
      inmateId: 'INM001',
      inmateName: 'John Smith'
    },
    {
      id: '2',
      visitorName: 'Michael Brown',
      visitorPhone: '+1-555-0456',
      visitorEmail: 'mbrown@email.com',
      purpose: 'Legal Consultation',
      date: '2025-07-22',
      time: '16:00',
      duration: 120,
      status: 'scheduled',
      inmateId: 'INM002',
      inmateName: 'David Wilson'
    },
    {
      id: '3',
      visitorName: 'Lisa Davis',
      visitorPhone: '+1-555-0789',
      visitorEmail: 'lisa.davis@email.com',
      purpose: 'Social Worker Visit',
      date: '2025-07-23',
      time: '10:00',
      duration: 90,
      status: 'scheduled',
      inmateId: 'INM003',
      inmateName: 'Robert Garcia'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState('');

  const [formData, setFormData] = useState<Omit<Appointment, 'id'>>({
    visitorName: '',
    visitorPhone: '',
    visitorEmail: '',
    purpose: '',
    date: '',
    time: '',
    duration: 60,
    status: 'scheduled',
    officerNotes: '',
    inmateId: '',
    inmateName: ''
  });

  const resetForm = () => {
    setFormData({
      visitorName: '',
      visitorPhone: '',
      visitorEmail: '',
      purpose: '',
      date: '',
      time: '',
      duration: 60,
      status: 'scheduled',
      officerNotes: '',
      inmateId: '',
      inmateName: ''
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.visitorName || !formData.visitorPhone || !formData.purpose || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingId) {
      setAppointments(prev => prev.map(apt => 
        apt.id === editingId ? { ...formData, id: editingId } : apt
      ));
    } else {
      const newAppointment: Appointment = {
        ...formData,
        id: Date.now().toString()
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (appointment: Appointment) => {
    setFormData(appointment);
    setEditingId(appointment.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.inmateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = !selectedDate || appointment.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const todaysAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const upcomingCount = appointments.filter(apt => apt.status === 'scheduled' || apt.status === 'confirmed').length;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule Appointments</h1>
        <p className="text-gray-600">Manage appointments and visit queues for record officers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Today's Visits</p>
              <p className="text-2xl font-bold text-gray-900">{todaysAppointments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">No Shows</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === 'no-show').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search visitors, inmates, or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Schedule New Appointment
          </button>
        </div>
      </div>

      {/* Appointment Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Appointment' : 'Schedule New Appointment'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name</label>
              <input
                type="text"
                required
                value={formData.visitorName}
                onChange={(e) => setFormData(prev => ({ ...prev, visitorName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.visitorPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, visitorPhone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.visitorEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, visitorEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select
                required
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Purpose</option>
                <option value="Family Visit">Family Visit</option>
                <option value="Legal Consultation">Legal Consultation</option>
                <option value="Social Worker Visit">Social Worker Visit</option>
                <option value="Medical Appointment">Medical Appointment</option>
                <option value="Educational Program">Educational Program</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
              <input
                type="number"
                required
                min="15"
                max="240"
                step="15"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inmate ID</label>
              <input
                type="text"
                value={formData.inmateId}
                onChange={(e) => setFormData(prev => ({ ...prev, inmateId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Inmate Name</label>
              <input
                type="text"
                value={formData.inmateName}
                onChange={(e) => setFormData(prev => ({ ...prev, inmateName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Officer Notes</label>
              <textarea
                rows={3}
                value={formData.officerNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, officerNotes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special instructions or notes..."
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'Update Appointment' : 'Schedule Appointment'}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Appointments ({filteredAppointments.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inmate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.visitorName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.visitorPhone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.inmateName || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.inmateId || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time} ({appointment.duration}min)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {appointment.purpose}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value as Appointment['status'])}
                      className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${getStatusColor(appointment.status)}`}
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No Show</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || selectedDate
                  ? 'Try adjusting your filters'
                  : 'Get started by scheduling a new appointment'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;