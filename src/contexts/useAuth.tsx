import React, { createContext, useContext, useState } from 'react';
import { ChildrenType } from '../types';
// import { AuthResponse } from '../types/auth';
import Cookies from 'universal-cookie';
import { toast } from 'sonner';
import Repository from '../api/Repository';
import useToggleBoolean from '../custom-hooks/useToggleBoolean';
const cookies = new Cookies();

// type User = AuthResponse | null;
interface  credentials {
  username: string,
  password: string
}
interface UserData {
  firstName: string,
  lastName: string,
  accessToken: string
}
type AuthContextType = {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoggingOut: boolean;
  login: (payload: credentials) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ChildrenType> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
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

  const login = async (data: {password: string, username: string}): Promise<boolean> => {
    if(data.username !== 'maya' && data.password !== '123') {
      return false
    }
    try {
      cookies.set('user-data', {
      firstName: 'Maya',
      lastName: 'Layka',
      accessToken: '123',
    });
      setUser({
      firstName: 'Maya',
      lastName: 'Layka',
      accessToken: '123',
    });
      setRepositoryHeaders('123');
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
      return true
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
