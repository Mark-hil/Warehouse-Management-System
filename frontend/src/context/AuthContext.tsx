import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AuthState, User, LoginCredentials, LoginResponse, UserRole } from '../types/auth.types';

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'LOAD_USER_SUCCESS'; payload: User }
  | { type: 'LOAD_USER_FAILURE' };

// Context type
interface AuthContextType {
  state: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      localStorage.removeItem('token');
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    case 'LOAD_USER_FAILURE':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Mock API calls for demonstration
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });
      
      // Simulate API call
      // In a real app, this would be a fetch to your Django backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const testUsers: Record<string, User> = {
        admin: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin' as UserRole,
          permissions: ['all'],
          lastLogin: new Date().toISOString(),
          isActive: true,
        },
        manager: {
          id: '2',
          username: 'manager',
          email: 'manager@example.com',
          firstName: 'Warehouse',
          lastName: 'Manager',
          role: 'warehouse_manager' as UserRole,
          permissions: ['inventory', 'procurement'],
          lastLogin: new Date().toISOString(),
          isActive: true,
        },
        lead: {
          id: '3',
          username: 'lead',
          email: 'lead@example.com',
          firstName: 'Team',
          lastName: 'Lead',
          role: 'team_lead' as UserRole,
          permissions: ['team'],
          lastLogin: new Date().toISOString(),
          isActive: true,
        },
        approver: {
          id: '4',
          username: 'approver',
          email: 'approver@example.com',
          firstName: 'Request',
          lastName: 'Approver',
          role: 'approver' as UserRole,
          permissions: ['approve_requests'],
          lastLogin: new Date().toISOString(),
          isActive: true,
        },
      };

      const user = Object.values(testUsers).find(
        (u) => u.username === credentials.username
      );

      if (user) {
        const response: LoginResponse = {
          user,
          token: `mock-jwt-token-${user.role}`,
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: response });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'An error occurred during login' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Load user on initial render if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          // Simulate API call to validate token and get user data
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data
          const mockUser: User = {
            id: '1',
            username: 'admin',
            email: 'admin@example.com',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin',
            permissions: ['all'],
            lastLogin: new Date().toISOString(),
            isActive: true,
          };
          
          dispatch({ type: 'LOAD_USER_SUCCESS', payload: mockUser });
        } catch (error) {
          dispatch({ type: 'LOAD_USER_FAILURE' });
        }
      } else {
        dispatch({ type: 'LOAD_USER_FAILURE' });
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};