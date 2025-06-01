'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChartBarIcon, ClockIcon, CheckCircleIcon, XCircleIcon, DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import EnhancedDashboardLayout from '../../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';

interface StatusMetrics {
  total: number;
  submitted: number;
  under_review: number;
  pending_documents: number;
  approved: number;
  rejected: number;
}

interface ApplicationTypeMetrics {
  type: string;
  count: number;
  percentage: number;
  avgProcessingTime: number;
}

interface RecentActivity {
  id: string;
  applicationNumber: string;
  company: string;
  action: string;
  timestamp: string;
  officer: string;
}

export default function StatusOverview() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<StatusMetrics | null>(null);
  const [typeMetrics, setTypeMetrics] = useState<ApplicationTypeMetrics[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login?redirect=/dashboard/commission-admin/applications/status-overview');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'commission_admin') {
        router.push('/dashboard');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
      return;
    }

    // Mock data for status metrics
    const mockMetrics: StatusMetrics = {
      total: 247,
      submitted: 45,
      under_review: 89,
      pending_documents: 32,
      approved: 67,
      rejected: 14
    };

    // Mock data for application type metrics
    const mockTypeMetrics: ApplicationTypeMetrics[] = [
      {
        type: 'Exploration License',
        count: 78,
        percentage: 31.6,
        avgProcessingTime: 45
      },
      {
        type: 'Drilling Rights',
        count: 56,
        percentage: 22.7,
        avgProcessingTime: 38
      },
      {
        type: 'Production License',
        count: 43,
        percentage: 17.4,
        avgProcessingTime: 52
      },
      {
        type: 'Environmental Assessment',
        count: 34,
        percentage: 13.8,
        avgProcessingTime: 28
      },
      {
        type: 'Joint Venture',
        count: 21,
        percentage: 8.5,
        avgProcessingTime: 67
      },
      {
        type: 'Seismic Survey',
        count: 15,
        percentage: 6.1,
        avgProcessingTime: 21
      }
    ];

    // Mock data for recent activity
    const mockRecentActivity: RecentActivity[] = [
      {
        id: '1',
        applicationNumber: 'APP-2024-001',
        company: 'Atlantic Energy Solutions Ltd',
        action: 'Status changed to Under Review',
        timestamp: '2024-01-20T10:30:00Z',
        officer: 'Officer Johnson'
      },
      {
        id: '2',
        applicationNumber: 'APP-2024-002',
        company: 'Gulf Coast Drilling Inc',
        action: 'Documents requested',
        timestamp: '2024-01-20T09:15:00Z',
        officer: 'Officer Williams'
      },
      {
        id: '3',
        applicationNumber: 'APP-2024-003',
        company: 'Offshore Technologies Corp',
        action: 'Application approved',
        timestamp: '2024-01-20T08:45:00Z',
        officer: 'Officer Davis'
      },
      {
        id: '4',
        applicationNumber: 'APP-2024-004',
        company: 'Coastal Petroleum Services',
        action: 'Application rejected',
        timestamp: '2024-01-19T16:20:00Z',
        officer: 'Officer Brown'
      },
      {
        id: '5',
        applicationNumber: 'APP-2024-005',
        company: 'Green Energy Solutions',
        action: 'New application submitted',
        timestamp: '2024-01-19T14:10:00Z',
        officer: 'System'
      },
      {
        id: '6',
        applicationNumber: 'APP-2024-006',
        company: 'Maritime Oil & Gas',
        action: 'Review completed',
        timestamp: '2024-01-19T11:30:00Z',
        officer: 'Officer Taylor'
      }
    ];

    setMetrics(mockMetrics);
    setTypeMetrics(mockTypeMetrics);
    setRecentActivity(mockRecentActivity);
    setIsLoading(false);
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-6 w-6 text-green-600" />;
      case 'rejected':
        return <XCircleIcon className="h-6 w-6 text-red-600" />;
      case 'under_review':
        return <ClockIcon className="h-6 w-6 text-yellow-600" />;
      case 'pending_documents':
        return <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />;
      default:
        return <DocumentTextIcon className="h-6 w-6 text-gray-600" />;
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('approved')) return 'text-green-600';
    if (action.includes('rejected')) return 'text-red-600';
    if (action.includes('requested')) return 'text-orange-600';
    if (action.includes('submitted')) return 'text-blue-600';
    return 'text-gray-600';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  if (isLoading || !metrics) {
    return (
      <EnhancedDashboardLayout
        title="Application Status Overview"
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/status-overview')}
        userRole={user?.role || 'commission_admin'}
        userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </EnhancedDashboardLayout>
    );
  }

  return (
    <EnhancedDashboardLayout
        title="Application Status Overview"
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/status-overview')}
        userRole={user?.role || 'commission_admin'}
        userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}
      >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Applications Status Overview</h1>
                <p className="text-sm text-gray-600 mt-1">Monitor application processing status and metrics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.submitted}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.under_review}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Docs</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.pending_documents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.approved}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Types Breakdown */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Application Types Breakdown</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {typeMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{metric.type}</span>
                        <span className="text-sm text-gray-500">{metric.count} ({metric.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${metric.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Avg processing: {metric.avgProcessingTime} days
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.applicationNumber}
                      </div>
                      <div className="text-sm text-gray-600">
                        {activity.company}
                      </div>
                      <div className={`text-sm ${getActionColor(activity.action)}`}>
                        {activity.action}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTimestamp(activity.timestamp)} • {activity.officer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Processing Performance */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Processing Performance</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">38</div>
                <div className="text-sm text-gray-600">Avg Processing Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">82%</div>
                <div className="text-sm text-gray-600">Approval Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">13%</div>
                <div className="text-sm text-gray-600">Pending Documents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">SLA Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}