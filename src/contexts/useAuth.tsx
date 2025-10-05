import React, { createContext, useContext, useState } from 'react';
import { ApiResponse, ChildrenType } from '../types';
import { AuthResponse } from '../types/auth';
import { authService } from '../services/AuthService';
import Cookies from 'universal-cookie';
import { toast } from 'sonner';
import Repository from '../api/Repository';
import useToggleBoolean from '../custom-hooks/useToggleBoolean';
import { FormValues } from '../schema/login';
const cookies = new Cookies();

type User = AuthResponse | null;

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  login: (credentials: FormValues) => Promise<void>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ChildrenType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { value: isLoggingOut, handleSetValue: handleSetIsLoggingOut } =
    useToggleBoolean();
  const checkAuth = async () => {
    const userData = await cookies.get('user-data');
    try {
      if (userData) {
        setUser(userData);
        setRepositoryHeaders(userData.access_token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Authentication error');
    }
  };

  const login = async (credentials: FormValues) => {
    try {
      const data: AuthResponse = await authService.login(credentials);
      cookies.set('user-data', data);
      setUser(data);
      setRepositoryHeaders(data.accessToken);
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const setRepositoryHeaders = (token: string | null = null) => {
    Repository.defaults.headers['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  };

  const logout = async () => {
    try {
      handleSetIsLoggingOut(true);
      setIsAuthenticated(false);
      setRepositoryHeaders(null);
      cookies.set('user-data', null);
      toast.success('Logged out successfully');
      return false;
    } catch (error) {
      return false;
    } finally {
      handleSetIsLoggingOut(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoggingOut,
    checkAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
