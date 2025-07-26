import React, { useEffect, useState, createContext, useContext } from 'react';
import axios  from "axios" ;

export type UserRole = 'admin' | 'nurse' | 'doctor' | 'record-officer' | null;

interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (fullName: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('hospitalAppToken');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('hospitalAppToken');
        localStorage.removeItem('hospitalAppUser');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
        role
      });

      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem('hospitalAppToken', token);
      localStorage.setItem('hospitalAppUser', JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || 'Login failed');
    }
  };

  const signup = async (fullName: string, email: string, password: string, role: UserRole) => {
    try {
      const response = await axios.post('/auth/register', {
        fullName,
        email,
        password,
        role
      });

      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem('hospitalAppToken', token);
      localStorage.setItem('hospitalAppUser', JSON.stringify(user));
    } catch (error: any) {
      if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response && error.response.data && typeof error.response.data === 'object' && 'error' in error.response.data) {
        throw new Error((error as any).response.data.error || 'Registration failed. Please try again.');
      }
      throw new Error('Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospitalAppToken');
    localStorage.removeItem('hospitalAppUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

