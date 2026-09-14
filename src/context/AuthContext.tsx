import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  name: string;
  email: string;
  phone: string;
  uid: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  authError: string | null;
  registerUser: (name: string, email: string, phone: string) => void;
  loginAdmin: (pin: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  authError: null,
  registerUser: () => {},
  loginAdmin: () => false,
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Load local session state on boot
    const storedUser = localStorage.getItem('tattva_user');
    const storedAdmin = localStorage.getItem('tattva_admin');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser = { name, email, phone, uid: Math.random().toString(36).substring(2, 15) };
    setUser(newUser);
    localStorage.setItem('tattva_user', JSON.stringify(newUser));
  };

  const loginAdmin = (pin: string) => {
    if (pin === 'TATTVA2026') { 
      setIsAdmin(true);
      localStorage.setItem('tattva_admin', 'true');
      setAuthError(null);
      return true;
    } else {
      setAuthError("Invalid Admin PIN");
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('tattva_user');
    localStorage.removeItem('tattva_admin');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, authError, registerUser, loginAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
