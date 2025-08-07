import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false
  });
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
          setAuthState({
            user: null,
            loading: false,
            isAuthenticated: false
          });
          return;
        }

        const user = JSON.parse(userData);
        // Ensure token cookie is set for middleware
        if (token && !document.cookie.includes('token=')) {
          document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
        }
        
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User, token?: string) => {
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
      // Set cookie for server-side middleware
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict`;
    }
    setAuthState({
      user: userData,
      loading: false,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Clear token cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setAuthState({
      user: null,
      loading: false,
      isAuthenticated: false
    });
    router.push('/auth/login');
  };

  return {
    ...authState,
    login,
    logout
  };
}