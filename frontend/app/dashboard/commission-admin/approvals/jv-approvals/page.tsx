'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserGroupIcon, CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import EnhancedDashboardLayout from '../../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';

interface JVApproval {
  id: string;
  jvName: string;
  leadCompany: string;
  partnerCompanies: string[];
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicant: string;
  jvType: string;
  equityShares: { [company: string]: number };
  priority: 'high' | 'medium' | 'low';
  blocks: string[];
  estimatedValue: string;
}

export default function JVApprovals() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [approvals, setApprovals] = useState<JVApproval[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login?redirect=/dashboard/commission-admin/approvals/jv-approvals');
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

    // Mock data for JV approvals
    const mockApprovals: JVApproval[] = [
      {
        id: '1',
        jvName: 'Atlantic-Gulf Joint Venture',
        leadCompany: 'Atlantic Energy Solutions Ltd',
        partnerCompanies: ['Gulf Coast Drilling Inc', 'Offshore Technologies Corp'],
        submissionDate: '2024-01-15',
        status: 'pending',
        applicant: 'John Smith',
        jvType: 'Exploration & Production',
        equityShares: {
          'Atlantic Energy Solutions Ltd': 45,
          'Gulf Coast Drilling Inc': 35,
          'Offshore Technologies Corp': 20
        },
        priority: 'high',
        blocks: ['Block 15A', 'Block 16B', 'Block 17C'],
        estimatedValue: 'GH₵125M'
      },
      {
        id: '2',
        jvName: 'Coastal Development Partnership',
        leadCompany: 'Coastal Petroleum Services',
        partnerCompanies: ['Green Energy Solutions', 'Maritime Oil & Gas'],
        submissionDate: '2024-01-14',
        status: 'under_review',
        applicant: 'Sarah Johnson',
        jvType: 'Development & Production',
        equityShares: {
          'Coastal Petroleum Services': 50,
          'Green Energy Solutions': 30,
          'Maritime Oil & Gas': 20
        },
        priority: 'medium',
        blocks: ['Block 8B', 'Block 9C'],
        estimatedValue: 'GH₵89M'
      },
      {
        id: '3',
        jvName: 'Deep Water Exploration Alliance',
        leadCompany: 'Deep Sea Energy Corp',
        partnerCompanies: ['International Drilling Ltd', 'Subsea Technologies Inc'],
        submissionDate: '2024-01-13',
        status: 'approved',
        applicant: 'Michael Brown',
        jvType: 'Exploration',
        equityShares: {
          'Deep Sea Energy Corp': 40,
          'International Drilling Ltd': 35,
          'Subsea Technologies Inc': 25
        },
        priority: 'high',
        blocks: ['Block 22C', 'Block 23D', 'Block 24E'],
        estimatedValue: 'GH₵200M'
      },
      {
        id: '4',
        jvName: 'Shallow Water Production JV',
        leadCompany: 'Regional Energy Partners',
        partnerCompanies: ['Local Drilling Services'],
        submissionDate: '2024-01-12',
        status: 'rejected',
        applicant: 'Emily Davis',
        jvType: 'Production',
        equityShares: {
          'Regional Energy Partners': 70,
          'Local Drilling Services': 30
        },
        priority: 'low',
        blocks: ['Block 5D'],
        estimatedValue: 'GH₵45M'
      },
      {
        id: '5',
        jvName: 'Integrated Energy Solutions JV',
        leadCompany: 'Integrated Energy Corp',
        partnerCompanies: ['Renewable Energy Ltd', 'Traditional Oil Co', 'Gas Processing Inc'],
        submissionDate: '2024-01-11',
        status: 'pending',
        applicant: 'David Wilson',
        jvType: 'Integrated Operations',
        equityShares: {
          'Integrated Energy Corp': 40,
          'Renewable Energy Ltd': 25,
          'Traditional Oil Co': 20,
          'Gas Processing Inc': 15
        },
        priority: 'medium',
        blocks: ['Block 11F', 'Block 12G', 'Block 13H'],
        estimatedValue: 'GH₵175M'
      }
    ];

    setApprovals(mockApprovals);
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

  const filteredApprovals = selectedStatus === 'all' 
    ? approvals 
    : approvals.filter(approval => approval.status === selectedStatus);

  if (isLoading) {
    return (
      <EnhancedDashboardLayout
        title="Joint Venture Approvals" 
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/approvals/jv-approvals')}
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
        title="Joint Venture Approvals" 
      sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/approvals/jv-approvals')}
      userRole={user?.role || 'commission_admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
      userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Joint Venture Approvals</h1>
                <p className="text-sm text-gray-600 mt-1">Review and approve joint venture applications</p>
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
                  {approvals.filter(a => a.status === 'pending').length}
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
                  {approvals.filter(a => a.status === 'under_review').length}
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
                  {approvals.filter(a => a.status === 'approved').length}
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
                  {approvals.filter(a => a.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* JV Approvals Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Joint Venture Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    JV Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partners
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Est. Value
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
                {filteredApprovals.map((approval) => (
                  <tr key={approval.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {approval.jvName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {approval.applicant}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.leadCompany}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {approval.partnerCompanies.slice(0, 2).join(', ')}
                        {approval.partnerCompanies.length > 2 && (
                          <span className="text-gray-500">
                            {' '}+{approval.partnerCompanies.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.jvType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {approval.estimatedValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPriorityBadge(approval.priority)}>
                        {approval.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(approval.status)}
                        <span className={`ml-2 ${getStatusBadge(approval.status)}`}>
                          {approval.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Review
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 flex items-center">
                          <DocumentTextIcon className="h-4 w-4 mr-1" />
                          Details
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