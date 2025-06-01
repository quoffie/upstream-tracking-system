'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import EnhancedDashboardLayout from '../../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';

interface RotatorPermit {
  id: string;
  permitType: string;
  company: string;
  rotationSchedule: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicant: string;
  rotationPeriod: string;
  priority: 'high' | 'medium' | 'low';
  blocks: string[];
  nextRotation: string;
}

export default function RotatorPermitsApproval() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permits, setPermits] = useState<RotatorPermit[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login?redirect=/dashboard/commission-admin/approvals/rotator-permits');
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

    // Mock data for rotator permits
    const mockPermits: RotatorPermit[] = [
      {
        id: '1',
        permitType: 'Rotator Exploration License',
        company: 'Atlantic Energy Solutions Ltd',
        rotationSchedule: 'Quarterly',
        submissionDate: '2024-01-15',
        status: 'pending',
        applicant: 'John Smith',
        rotationPeriod: '3 months',
        priority: 'high',
        blocks: ['Block 15A', 'Block 16B', 'Block 17C'],
        nextRotation: '2024-04-15'
      },
      {
        id: '2',
        permitType: 'Rotator Drilling Rights',
        company: 'Gulf Coast Drilling Inc',
        rotationSchedule: 'Semi-Annual',
        submissionDate: '2024-01-14',
        status: 'under_review',
        applicant: 'Sarah Johnson',
        rotationPeriod: '6 months',
        priority: 'medium',
        blocks: ['Block 8B', 'Block 9C'],
        nextRotation: '2024-07-14'
      },
      {
        id: '3',
        permitType: 'Rotator Seismic Survey',
        company: 'Offshore Technologies Corp',
        rotationSchedule: 'Monthly',
        submissionDate: '2024-01-13',
        status: 'approved',
        applicant: 'Michael Brown',
        rotationPeriod: '1 month',
        priority: 'low',
        blocks: ['Block 22C', 'Block 23D', 'Block 24E', 'Block 25F'],
        nextRotation: '2024-02-13'
      },
      {
        id: '4',
        permitType: 'Rotator Production License',
        company: 'Coastal Petroleum Services',
        rotationSchedule: 'Annual',
        submissionDate: '2024-01-12',
        status: 'rejected',
        applicant: 'Emily Davis',
        rotationPeriod: '12 months',
        priority: 'medium',
        blocks: ['Block 5D', 'Block 6E'],
        nextRotation: '2025-01-12'
      },
      {
        id: '5',
        permitType: 'Rotator Environmental Assessment',
        company: 'Green Energy Solutions',
        rotationSchedule: 'Bi-Annual',
        submissionDate: '2024-01-11',
        status: 'pending',
        applicant: 'David Wilson',
        rotationPeriod: '6 months',
        priority: 'high',
        blocks: ['Block 11F', 'Block 12G'],
        nextRotation: '2024-07-11'
      }
    ];

    setPermits(mockPermits);
    setIsLoading(false);
  }, [router]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'under_review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'under_review':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-green-100 text-green-800`;
    }
  };

  const filteredPermits = selectedStatus === 'all' 
    ? permits 
    : permits.filter(permit => permit.status === selectedStatus);

  if (isLoading) {
    return (
      <EnhancedDashboardLayout
        title="Rotator Permit Approvals" 
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/approvals/rotator-permits')}
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
        title="Rotator Permit Approvals" 
      sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/approvals/rotator-permits')}
      userRole={user?.role || 'commission_admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
      userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowPathIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rotator Permits Approval</h1>
                <p className="text-sm text-gray-600 mt-1">Review and approve rotator permit applications</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.status === 'under_review').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.status === 'approved').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Permits Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Rotator Permit Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permit Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rotation Schedule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blocks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Rotation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPermits.map((permit) => (
                  <tr key={permit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowPathIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {permit.permitType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {permit.applicant}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {permit.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{permit.rotationSchedule}</div>
                      <div className="text-sm text-gray-500">({permit.rotationPeriod})</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {permit.blocks.slice(0, 2).map((block, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {block}
                          </span>
                        ))}
                        {permit.blocks.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{permit.blocks.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                        {new Date(permit.nextRotation).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPriorityBadge(permit.priority)}>
                        {permit.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(permit.status)}
                        <span className={`ml-2 ${getStatusBadge(permit.status)}`}>
                          {permit.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}