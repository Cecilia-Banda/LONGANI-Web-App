import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Users as UsersIcon, Edit, Trash2, Shield } from 'lucide-react';
// Mock user data
const mockUsers = [{
  id: 1,
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  lastActive: '2023-10-15'
}, {
  id: 2,
  name: 'Record Officer',
  email: 'data@example.com',
  role: 'RecordOfficer',
  lastActive: '2023-10-14'
}, {
  id: 3,
  name: 'OPD Nurse',
  email: 'nurse@example.com',
  role: 'nurse',
  lastActive: '2023-10-15'
}, {
  id: 4,
  name: 'Doctor User',
  email: 'doctor@example.com',
  role: 'doctor',
  lastActive: '2023-10-13'
}];
const Users: React.FC = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  // Only admin can access this page
  const canManageUsers = ['admin'].includes(user?.role || '');
  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  if (!canManageUsers) {
    return <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">
          Only administrators can access user management.
        </p>
        <button onClick={() => navigate('/dashboard')} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Return to Dashboard
        </button>
      </div>;
  }
  return <div className="container mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <UsersIcon size={24} className="mr-2 text-blue-600" />
            User Management
          </h1>
          <p className="text-gray-600">
            Manage system users and their access levels
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button onClick={() => alert('Add user functionality would be implemented here')} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <UserPlus size={16} className="mr-2" />
            Add New User
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-700 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'RecordOfficer' ? 'bg-blue-100 text-blue-800' : user.role === 'nurse' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.role === 'admin' ? 'Administrator' : user.role === 'RecordOfficer' ? 'Record Officer' : user.role === 'nurse' ? 'OPD Nurse' : 'Doctor'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button onClick={() => alert(`Edit user: ${user.name}`)} className="text-indigo-600 hover:text-indigo-900" title="Edit user">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => alert(`Manage permissions for: ${user.name}`)} className="text-blue-600 hover:text-blue-900" title="Manage permissions">
                        <Shield size={18} />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900" title="Delete user">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default Users;