import React, { useEffect, useState, createContext, useContext } from 'react';

export type UserRole = 'admin' | 'nurse' | 'doctor' | 'Record Officer' | null;

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
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
  const storedUser = localStorage.getItem('hospitalAppUser');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);

      // Optional: You can validate the object structure here if needed
      if (user.id && typeof user.id === 'string' && user.id.startsWith('user-')) {
        // Simulate dummy data cleanup
        localStorage.removeItem('hospitalAppUser');
        setUser(null);
      } else {
        setUser(user);
      }
    } catch (err) {
      console.error("❌ Failed to parse user from localStorage:", err);
      localStorage.removeItem('hospitalAppUser');
      setUser(null);
    }
  }
}, []);


  // Login function to authenticate user
  const login = async (email: string, password: string, role: UserRole = 'admin') => {
    try {
      // ✅ Fixed: Full URL and correct field names
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: email, // Backend expects 'username'
          password: password,
          role: role 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const userData = await response.json();
      console.log('✅ Login successful:', userData);

      // Set user from backend response
      setUser(userData.user);
      localStorage.setItem('hospitalAppUser', JSON.stringify(userData.user));
      localStorage.setItem('hospitalAppToken', userData.token);

    } catch (error) {
      console.error('❌ Login error:', error);
      throw error; // Re-throw so Login component can handle it
    }
  };

  // ✅ Single signup function that calls your backend
  const signup = async (name: string, email: string, password: string, role: UserRole = 'admin') => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: name,
          username: email, // Using email as username
          email: email,
          password: password,
          role: role
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      const userData = await response.json();
      console.log('✅ Signup successful:', userData);

      // Set user from backend response
      setUser(userData.user);
      localStorage.setItem('hospitalAppUser', JSON.stringify(userData.user));
      localStorage.setItem('hospitalAppToken', userData.token);

    } catch (error) {
      console.error('❌ Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hospitalAppUser');
    localStorage.removeItem('hospitalAppToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};