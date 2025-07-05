import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Save, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';
const Settings: React.FC = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  // Only admin can access this page
  const canAccessSettings = ['admin'].includes(user?.role || '');
  const [formData, setFormData] = useState({
    hospitalName: 'My Hospital App',
    address: 'Lusaka, Zambia',
    contactNumber: '+260 97 1234567',
    email: 'info@myhospitalapp.com',
    enableNotifications: true,
    enableAuditLog: true,
    dataRetentionDays: 365
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value,
      type
    } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate saving settings
    setTimeout(() => {
      alert('Settings saved successfully!');
      setIsSubmitting(false);
    }, 1000);
  };
  if (!canAccessSettings) {
    return <div className="text-center py-10">
        <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          Only administrators can access system settings.
        </p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Return to Dashboard
        </button>
      </div>;
  }
  return <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <SettingsIcon size={24} className="mr-2 text-blue-600" />
          System Settings
        </h1>
        <p className="text-gray-600">
          Configure application preferences and settings
        </p>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            General Settings
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Basic application configuration
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                  Hospital Name
                </label>
                <div className="mt-1">
                  <input type="text" name="hospitalName" id="hospitalName" value={formData.hospitalName} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <div className="mt-1">
                  <input type="text" name="contactNumber" id="contactNumber" value={formData.contactNumber} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                </div>
              </div>
            </div>
            <div className="pt-5 border-t border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                System Configuration
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="enableNotifications" name="enableNotifications" type="checkbox" checked={formData.enableNotifications} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableNotifications" className="font-medium text-gray-700">
                      Enable Notifications
                    </label>
                    <p className="text-gray-500">
                      Receive system notifications and alerts
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="enableAuditLog" name="enableAuditLog" type="checkbox" checked={formData.enableAuditLog} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableAuditLog" className="font-medium text-gray-700">
                      Enable Audit Log
                    </label>
                    <p className="text-gray-500">
                      Log all user actions for security and compliance
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3 max-w-xs">
                  <label htmlFor="dataRetentionDays" className="block text-sm font-medium text-gray-700">
                    Data Retention Period (days)
                  </label>
                  <div className="mt-1">
                    <input type="number" name="dataRetentionDays" id="dataRetentionDays" min="30" value={formData.dataRetentionDays} onChange={handleChange} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 30 days required for regulatory compliance
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isSubmitting}>
              <Save size={16} className="mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default Settings;