'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DefaultDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if no specific dashboard is available
    router.push('/login');
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