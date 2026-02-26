import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'student' | 'teacher' | 'admin' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for auth state on mount
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('role') as Role;

    if (storedAuth === 'true' && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
    setIsLoading(false);
  }, []);

  const login = (newRole: Role) => {
    setIsAuthenticated(true);
    setRole(newRole);
    localStorage.setItem('isAuthenticated', 'true');
    if (newRole) {
      localStorage.setItem('role', newRole);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
