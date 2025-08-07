'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Helper function to get dashboard route based on user role
function getDashboardRoute(role: string): string {
  switch (role) {
    case 'COMMISSION_ADMIN':
      return '/dashboard/commission-admin';
    case 'COMPANY_ADMIN':
      return '/dashboard/company-admin';
    case 'REVIEWER':
      return '/dashboard/reviewer';
    case 'INSPECTOR':
      return '/dashboard/inspector';
    case 'FINANCE':
      return '/dashboard/finance';
    case 'IMMIGRATION':
      return '/dashboard/immigration';
    case 'JV_COORDINATOR':
      return '/dashboard/jv-coordinator';
    case 'LOCAL_CONTENT':
      return '/dashboard/local-content';
    case 'PERSONNEL':
      return '/dashboard/personnel';
    default:
      return '/dashboard/company-admin'; // Default fallback
  }
}

export default function DefaultDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        const dashboardRoute = getDashboardRoute(user.role);
        router.push(dashboardRoute);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // If user data is corrupted, redirect to login
        router.push('/auth/login');
      }
    } else {
      // No user data found, redirect to login
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Redirecting...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we redirect you to the appropriate dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}