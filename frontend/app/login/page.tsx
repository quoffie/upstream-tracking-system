'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DemoUser {
  email: string;
  password: string;
  role: string;
  name: string;
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const router = useRouter();
  
  // Demo users for testing
  const demoUsers: DemoUser[] = [
    { email: 'admin@pc-ghana.gov.gh', password: 'Admin@123', role: 'ADMIN', name: 'System Administrator' },
    { email: 'commission-admin@pc-ghana.gov.gh', password: 'Commission@123', role: 'COMMISSION_ADMIN', name: 'Commission Admin' },
    { email: 'company-admin@acme.com', password: 'Company@123', role: 'COMPANY_ADMIN', name: 'Acme Manager' },
    { email: 'compliance@pc-ghana.gov.gh', password: 'Compliance@123', role: 'COMPLIANCE_OFFICER', name: 'Compliance Officer' },
    { email: 'inspector@pc-ghana.gov.gh', password: 'Inspector@123', role: 'INSPECTOR', name: 'Inspector' },
    { email: 'officer@immigration.gov.gh', password: 'Immigration@123', role: 'IMMIGRATION_OFFICER', name: 'Immigration Officer' },
    { email: 'personnel@acmeoil.com', password: 'Personnel@123', role: 'PERSONNEL', name: 'John Engineer' },
    { email: 'finance@pc-ghana.gov.gh', password: 'Finance@123', role: 'FINANCE_OFFICER', name: 'Finance Officer' },
    { email: 'jv-coordinator@pc-ghana.gov.gh', password: 'JVCoord@123', role: 'JV_COORDINATOR', name: 'JV Coordinator' },
  ];

  const selectDemoUser = (user: DemoUser) => {
    setEmail(user.email);
    setPassword(user.password);
    setShowDemoUsers(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Make API call to login endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Store token and user info in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect based on user role
      const dashboardPath = getDashboardPathByRole(data.user.role);
      router.push(dashboardPath);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to determine dashboard path based on user role
  const getDashboardPathByRole = (role: string): string => {
    switch (role) {
      case 'ADMIN':
        return '/dashboard/admin';
      case 'COMMISSION_ADMIN':
        return '/dashboard/commission-admin';
      case 'COMPANY_ADMIN':
        return '/dashboard/company-admin';
      case 'COMPLIANCE_OFFICER':
        return '/dashboard/reviewer';
      case 'IMMIGRATION_OFFICER':
        return '/dashboard/immigration';
      case 'PERSONNEL':
        return '/dashboard/personnel';
      case 'LOCAL_CONTENT_OFFICER':
        return '/dashboard/local-content';
      case 'FINANCE_OFFICER':
        return '/dashboard/finance';
      case 'JV_COORDINATOR':
        return '/dashboard/jv-coordinator';
      case 'INSPECTOR':
        return '/dashboard/inspector';
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="flex justify-center">
            <Image 
              src="/images/pc-logo.svg" 
              alt="Petroleum Commission Logo" 
              width={100} 
              height={100} 
              className="mx-auto h-20 w-auto"
            />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Upstream Tracking System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowDemoUsers(!showDemoUsers)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              {showDemoUsers ? 'Hide Demo Users' : 'Show Demo Users'}
            </button>
          </div>
          
          {showDemoUsers && (
            <div className="mt-4 border border-gray-200 rounded-md p-4 max-h-60 overflow-y-auto">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Users</h3>
              <ul className="space-y-2">
                {demoUsers.map((user, index) => (
                  <li key={index} className="text-xs">
                    <button
                      type="button"
                      onClick={() => selectDemoUser(user)}
                      className="w-full text-left p-2 hover:bg-gray-50 rounded flex justify-between items-center"
                    >
                      <span className="font-medium">{user.name}</span>
                      <span className="text-gray-500">{user.role}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}