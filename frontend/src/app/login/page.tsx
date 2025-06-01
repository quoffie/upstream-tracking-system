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
    { email: 'commission-admin@pc-ghana.gov.gh', password: 'Commission@123', role: 'COMMISSION_ADMIN', name: 'Commission Administrator' },
    { email: 'company-admin@acme.com', password: 'Company@123', role: 'COMPANY_ADMIN', name: 'Company Manager' },
    { email: 'compliance@pc-ghana.gov.gh', password: 'Compliance@123', role: 'COMPLIANCE_OFFICER', name: 'Compliance Officer' },
    { email: 'inspector@pc-ghana.gov.gh', password: 'Inspector@123', role: 'INSPECTOR', name: 'Field Inspector' },
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
      case 'INSPECTOR':
        return '/dashboard/inspector';
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
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/">
            <div className="relative h-16 w-40 cursor-pointer">
              <Image 
                src="/images/pc-ghana-logo.svg" 
                alt="Petroleum Commission Ghana Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-800">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/register" className="font-medium text-gold-600 hover:text-gold-500">
            register for a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold-500 focus:border-gold-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-gold-600 focus:ring-gold-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-gold-600 hover:text-gold-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or use a demo account
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowDemoUsers(!showDemoUsers)}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
              >
                {showDemoUsers ? 'Hide Demo Users' : 'Show Demo Users'}
              </button>
              
              {showDemoUsers && (
                <div className="mt-3 border border-gray-200 rounded-md overflow-hidden">
                  <div className="max-h-60 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {demoUsers.map((user, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                              {user.role.replace('_', ' ')}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                              {user.email}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs">
                              <button
                                type="button"
                                onClick={() => selectDemoUser(user)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Homepage
        </Link>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} Petroleum Commission, Ghana. All rights reserved.</p>
      </div>
    </div>
  );
}