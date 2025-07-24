import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { User } = useAuth();
  
  if (!User || !userInfo.role || !allowedRoles.includes(User.role)) {
      return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;