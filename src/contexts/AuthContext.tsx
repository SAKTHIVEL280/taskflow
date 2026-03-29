import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updatePassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('taskflow_user');
    if (stored) setUser(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem('taskflow_user', JSON.stringify(u));
  };

  const login = useCallback(async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('taskflow_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...userData } = found;
    saveUser(userData);
  }, []);

  const signup = useCallback(async (email: string, password: string, displayName: string) => {
    const users = JSON.parse(localStorage.getItem('taskflow_users') || '[]');
    if (users.find((u: any) => u.email === email)) throw new Error('Email already in use');
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      displayName,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('taskflow_users', JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    saveUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('taskflow_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem('taskflow_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === user.id);
    if (idx >= 0) {
      users[idx].password = newPassword;
      localStorage.setItem('taskflow_users', JSON.stringify(users));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};
