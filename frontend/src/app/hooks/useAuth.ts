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
        if (!userData) {
          setAuthState({
            user: null,
            loading: false,
            isAuthenticated: false
          });
          return;
        }

        const user = JSON.parse(userData);
        setAuthState({
          user,
          loading: false,
          isAuthenticated: true
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({
      user: userData,
      loading: false,
      isAuthenticated: true
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      loading: false,
      isAuthenticated: false
    });
    router.push('/login');
  };

  return {
    ...authState,
    login,
    logout
  };
}