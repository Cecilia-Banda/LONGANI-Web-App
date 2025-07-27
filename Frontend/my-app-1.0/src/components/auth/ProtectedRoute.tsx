import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (
    !user ||
    !user.role ||
    (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role))
  ) {
      return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

