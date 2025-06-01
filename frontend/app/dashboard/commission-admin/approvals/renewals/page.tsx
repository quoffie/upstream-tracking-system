'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon, ClockIcon, EyeIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import EnhancedDashboardLayout from '../../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';

interface Renewal {
  id: string;
  permitType: string;
  company: string;
  originalIssueDate: string;
  expirationDate: string;
  renewalDate: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  applicant: string;
  renewalPeriod: string;
  priority: 'high' | 'medium' | 'low';
  blocks: string[];
  fees: string;
  complianceStatus: 'compliant' | 'non_compliant' | 'pending_review';
}

export default function RenewalsApproval() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login?redirect=/dashboard/commission-admin/approvals/renewals');
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

    // Mock data for renewals
    const mockRenewals: Renewal[] = [
      {
        id: '1',
        permitType: 'Exploration License',
        company: 'Atlantic Energy Solutions Ltd',
        originalIssueDate: '2021-01-15',
        expirationDate: '2024-01-15',
        renewalDate: '2024-01-15',
        submissionDate: '2023-12-15',
        status: 'pending',
        applicant: 'John Smith',
        renewalPeriod: '3 years',
        priority: 'high',
        blocks: ['Block 15A', 'Block 16B', 'Block 17C'],
        fees: 'GH₵125,000',
        complianceStatus: 'compliant'
      },
      {
        id: '2',
        permitType: 'Drilling Rights',
        company: 'Gulf Coast Drilling Inc',
        originalIssueDate: '2020-02-20',
        expirationDate: '2024-02-20',
        renewalDate: '2024-02-20',
        submissionDate: '2023-12-20',
        status: 'under_review',
        applicant: 'Sarah Johnson',
        renewalPeriod: '4 years',
        priority: 'medium',
        blocks: ['Block 8B', 'Block 9C'],
        fees: 'GH₵89,500',
        complianceStatus: 'pending_review'
      },
      {
        id: '3',
        permitType: 'Production License',
        company: 'Offshore Technologies Corp',
        originalIssueDate: '2019-03-10',
        expirationDate: '2024-03-10',
        renewalDate: '2024-03-10',
        submissionDate: '2023-12-10',
        status: 'approved',
        applicant: 'Michael Brown',
        renewalPeriod: '5 years',
        priority: 'high',
        blocks: ['Block 22C', 'Block 23D', 'Block 24E', 'Block 25F'],
        fees: 'GH₵200,000',
        complianceStatus: 'compliant'
      },
      {
        id: '4',
        permitType: 'Seismic Survey License',
        company: 'Coastal Petroleum Services',
        originalIssueDate: '2021-04-05',
        expirationDate: '2024-04-05',
        renewalDate: '2024-04-05',
        submissionDate: '2023-12-05',
        status: 'rejected',
        applicant: 'Emily Davis',
        renewalPeriod: '3 years',
        priority: 'low',
        blocks: ['Block 5D', 'Block 6E'],
        fees: 'GH₵45,000',
        complianceStatus: 'non_compliant'
      },
      {
        id: '5',
        permitType: 'Environmental Assessment',
        company: 'Green Energy Solutions',
        originalIssueDate: '2020-05-15',
        expirationDate: '2024-05-15',
        renewalDate: '2024-05-15',
        submissionDate: '2023-12-15',
        status: 'pending',
        applicant: 'David Wilson',
        renewalPeriod: '4 years',
        priority: 'medium',
        blocks: ['Block 11F', 'Block 12G'],
        fees: 'GH₵75,000',
        complianceStatus: 'compliant'
      },
      {
        id: '6',
        permitType: 'Transportation License',
        company: 'Maritime Oil & Gas',
        originalIssueDate: '2021-06-01',
        expirationDate: '2024-06-01',
        renewalDate: '2024-06-01',
        submissionDate: '2023-12-01',
        status: 'under_review',
        applicant: 'Lisa Anderson',
        renewalPeriod: '3 years',
        priority: 'high',
        blocks: ['Block 18H', 'Block 19I'],
        fees: 'GH₵95,000',
        complianceStatus: 'pending_review'
      }
    ];

    setRenewals(mockRenewals);
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

  const getComplianceBadge = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'compliant':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'non_compliant':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  const isExpiringSoon = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30;
  };

  const filteredRenewals = selectedStatus === 'all' 
    ? renewals 
    : renewals.filter(renewal => renewal.status === selectedStatus);

  if (isLoading) {
    return (
      <EnhancedDashboardLayout
        title="Renewal Approvals" 
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/approvals/renewals')}
        userRole={user?.role || 'commission_admin'}
        userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </EnhancedDashboardLayout>
    );
  }

  return (
    <EnhancedDashboardLayout
        title="Renewal Approvals" 
      sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/approvals/renewals')}
      userRole={user?.role || 'commission_admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowPathIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">License Renewals</h1>
                <p className="text-sm text-gray-600 mt-1">Review and approve license renewal applications</p>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {renewals.filter(r => r.status === 'pending').length}
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
                  {renewals.filter(r => r.status === 'under_review').length}
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
                  {renewals.filter(r => r.status === 'approved').length}
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
                  {renewals.filter(r => r.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {renewals.filter(r => isExpiringSoon(r.expirationDate)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Renewals Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">License Renewal Applications</h2>
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
                    Expiration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renewal Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance
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
                {filteredRenewals.map((renewal) => (
                  <tr key={renewal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowPathIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {renewal.permitType}
                          </div>
                          <div className="text-sm text-gray-500">
                            {renewal.applicant}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {renewal.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <div>
                          <div className={`text-sm ${isExpiringSoon(renewal.expirationDate) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                            {new Date(renewal.expirationDate).toLocaleDateString()}
                          </div>
                          {isExpiringSoon(renewal.expirationDate) && (
                            <div className="text-xs text-red-500">Expiring Soon</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {renewal.renewalPeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {renewal.fees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getComplianceBadge(renewal.complianceStatus)}>
                        {renewal.complianceStatus.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPriorityBadge(renewal.priority)}>
                        {renewal.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(renewal.status)}
                        <span className={`ml-2 ${getStatusBadge(renewal.status)}`}>
                          {renewal.status.replace('_', ' ').toUpperCase()}
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
                          History
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