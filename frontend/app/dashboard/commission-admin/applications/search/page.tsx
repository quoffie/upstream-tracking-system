'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, FunnelIcon, DocumentTextIcon, EyeIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import EnhancedDashboardLayout from '../../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';

interface Application {
  id: string;
  applicationNumber: string;
  applicationType: string;
  company: string;
  submissionDate: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'pending_documents';
  applicant: string;
  priority: 'high' | 'medium' | 'low';
  blocks: string[];
  estimatedValue: string;
  lastUpdated: string;
  assignedOfficer: string;
}

export default function ApplicationsSearch() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login?redirect=/dashboard/commission-admin/applications/search');
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

    // Mock data for applications
    const mockApplications: Application[] = [
      {
        id: '1',
        applicationNumber: 'APP-2024-001',
        applicationType: 'Exploration License',
        company: 'Atlantic Energy Solutions Ltd',
        submissionDate: '2024-01-15',
        status: 'under_review',
        applicant: 'John Smith',
        priority: 'high',
        blocks: ['Block 15A', 'Block 16B', 'Block 17C'],
        estimatedValue: '$125M',
        lastUpdated: '2024-01-20',
        assignedOfficer: 'Officer Johnson'
      },
      {
        id: '2',
        applicationNumber: 'APP-2024-002',
        applicationType: 'Drilling Rights',
        company: 'Gulf Coast Drilling Inc',
        submissionDate: '2024-01-14',
        status: 'pending_documents',
        applicant: 'Sarah Johnson',
        priority: 'medium',
        blocks: ['Block 8B', 'Block 9C'],
        estimatedValue: '$89M',
        lastUpdated: '2024-01-19',
        assignedOfficer: 'Officer Williams'
      },
      {
        id: '3',
        applicationNumber: 'APP-2024-003',
        applicationType: 'Production License',
        company: 'Offshore Technologies Corp',
        submissionDate: '2024-01-13',
        status: 'approved',
        applicant: 'Michael Brown',
        priority: 'high',
        blocks: ['Block 22C', 'Block 23D', 'Block 24E', 'Block 25F'],
        estimatedValue: '$200M',
        lastUpdated: '2024-01-18',
        assignedOfficer: 'Officer Davis'
      },
      {
        id: '4',
        applicationNumber: 'APP-2024-004',
        applicationType: 'Seismic Survey',
        company: 'Coastal Petroleum Services',
        submissionDate: '2024-01-12',
        status: 'rejected',
        applicant: 'Emily Davis',
        priority: 'low',
        blocks: ['Block 5D', 'Block 6E'],
        estimatedValue: '$45M',
        lastUpdated: '2024-01-17',
        assignedOfficer: 'Officer Brown'
      },
      {
        id: '5',
        applicationNumber: 'APP-2024-005',
        applicationType: 'Environmental Assessment',
        company: 'Green Energy Solutions',
        submissionDate: '2024-01-11',
        status: 'submitted',
        applicant: 'David Wilson',
        priority: 'medium',
        blocks: ['Block 11F', 'Block 12G'],
        estimatedValue: '$75M',
        lastUpdated: '2024-01-16',
        assignedOfficer: 'Officer Miller'
      },
      {
        id: '6',
        applicationNumber: 'APP-2024-006',
        applicationType: 'Transportation License',
        company: 'Maritime Oil & Gas',
        submissionDate: '2024-01-10',
        status: 'under_review',
        applicant: 'Lisa Anderson',
        priority: 'high',
        blocks: ['Block 18H', 'Block 19I'],
        estimatedValue: '$95M',
        lastUpdated: '2024-01-15',
        assignedOfficer: 'Officer Taylor'
      },
      {
        id: '7',
        applicationNumber: 'APP-2024-007',
        applicationType: 'Joint Venture',
        company: 'Deep Sea Energy Corp',
        submissionDate: '2024-01-09',
        status: 'approved',
        applicant: 'Robert Chen',
        priority: 'high',
        blocks: ['Block 30J', 'Block 31K'],
        estimatedValue: '$180M',
        lastUpdated: '2024-01-14',
        assignedOfficer: 'Officer Anderson'
      },
      {
        id: '8',
        applicationNumber: 'APP-2024-008',
        applicationType: 'Renewal Application',
        company: 'Regional Energy Partners',
        submissionDate: '2024-01-08',
        status: 'pending_documents',
        applicant: 'Jennifer White',
        priority: 'medium',
        blocks: ['Block 7L'],
        estimatedValue: '$60M',
        lastUpdated: '2024-01-13',
        assignedOfficer: 'Officer Wilson'
      }
    ];

    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    let filtered = applications;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.applicationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.applicationType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(app => app.applicationType === selectedType);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }

    // Apply priority filter
    if (selectedPriority !== 'all') {
      filtered = filtered.filter(app => app.priority === selectedPriority);
    }

    setFilteredApplications(filtered);
  }, [searchQuery, selectedType, selectedStatus, selectedPriority, applications]);

  const getStatusBadge = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (status) {
      case 'approved':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'under_review':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'pending_documents':
        return `${baseClasses} bg-orange-100 text-orange-800`;
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

  const applicationTypes = [...new Set(applications.map(app => app.applicationType))];

  if (isLoading) {
    return (
      <EnhancedDashboardLayout
        title="Application Search"
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/search')}
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
        title="Application Search"
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/search')}
        userRole={user?.role || 'commission_admin'}
        userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
        userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}
      >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MagnifyingGlassIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Search Applications</h1>
                <p className="text-sm text-gray-600 mt-1">Search and filter through all applications</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredApplications.length} of {applications.length} applications
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by application number, company, applicant, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <FunnelIcon className="h-4 w-4 mr-1" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              {(selectedType !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSelectedStatus('all');
                    setSelectedPriority('all');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Types</option>
                    {applicationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="submitted">Submitted</option>
                    <option value="under_review">Under Review</option>
                    <option value="pending_documents">Pending Documents</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
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
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {application.applicationNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.applicant}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{application.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.applicationType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                        {new Date(application.submissionDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.estimatedValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getPriorityBadge(application.priority)}>
                        {application.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(application.status)}>
                        {application.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}