import React, { useEffect, useState, createContext, useContext } from 'react';
export type UserRole = 'admin' | 'data_manager' | 'nurse' | 'doctor' | 'receptionist' | null;
interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('hospitalAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = async (email: string, password: string, role: UserRole = 'admin') => {
    // Simulate login - in real app, call API here
    const emailPrefix = email.split('@')[0];
    const nameParts = emailPrefix.split('.');
    const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : 'User';
    const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : '';
    const newUser = {
      id: `user-${Date.now()}`,
      firstName,
      lastName,
      role
    };
    setUser(newUser);
    localStorage.setItem('hospitalAppUser', JSON.stringify(newUser));
  };

  const signup = async (name: string, email: string, password: string, role: UserRole = 'admin') => {
    // Simulate signup - in real app, call API here
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] ? nameParts[0] : 'User';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const newUser = {
      id: `user-${Date.now()}`,
      firstName,
      lastName,
      role
    };
    setUser(newUser);
    localStorage.setItem('hospitalAppUser', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospitalAppUser');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};