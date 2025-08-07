'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../components/layouts/DashboardMenus';
import {
  EyeIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentTextIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function ViewAllApplicationsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('submission_date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Extended mock data for applications with more variety
  const applications = [
    {
      id: 'APP-2024-001',
      title: 'Offshore Drilling Permit - Block 3A',
      type: 'Drilling Permit',
      category: 'Environmental',
      submissionDate: '2024-01-15',
      lastUpdated: '2024-01-25',
      status: 'approved',
      priority: 'high',
      estimatedCompletion: '2024-02-15',
      assignedOfficer: 'John Smith',
      documents: 5,
      comments: 3,
      location: 'Western Region - Offshore',
      permitNumber: 'DP-2024-001',
      company: 'Acme Petroleum Services',
      estimatedCost: 2500000,
      duration: 18
    },
    {
      id: 'APP-2024-002',
      title: 'Seismic Survey Application - Tano Basin',
      type: 'Survey Permit',
      category: 'Exploration',
      submissionDate: '2024-02-01',
      lastUpdated: '2024-02-10',
      status: 'under_review',
      priority: 'medium',
      estimatedCompletion: '2024-03-01',
      assignedOfficer: 'Jane Doe',
      documents: 8,
      comments: 1,
      location: 'Western Region - Tano Basin',
      permitNumber: null,
      company: 'Ghana Oil Exploration Ltd',
      estimatedCost: 1800000,
      duration: 12
    },
    {
      id: 'APP-2024-003',
      title: 'Environmental Impact Assessment',
      type: 'EIA Permit',
      category: 'Environmental',
      submissionDate: '2024-01-28',
      lastUpdated: '2024-02-05',
      status: 'pending_documents',
      priority: 'high',
      estimatedCompletion: '2024-02-28',
      assignedOfficer: 'Mike Johnson',
      documents: 3,
      comments: 5,
      location: 'Central Region - Offshore',
      permitNumber: null,
      company: 'West Africa Equipment Supply',
      estimatedCost: 950000,
      duration: 24
    },
    {
      id: 'APP-2024-004',
      title: 'Production License Renewal',
      type: 'Production License',
      category: 'Production',
      submissionDate: '2024-02-12',
      lastUpdated: '2024-02-15',
      status: 'rejected',
      priority: 'high',
      estimatedCompletion: null,
      assignedOfficer: 'Sarah Wilson',
      documents: 6,
      comments: 8,
      location: 'Eastern Region - Onshore',
      permitNumber: null,
      company: 'Coastal Engineering Services',
      estimatedCost: 3200000,
      duration: 36
    },
    {
      id: 'APP-2024-005',
      title: 'Well Abandonment Permit',
      type: 'Abandonment Permit',
      category: 'Decommissioning',
      submissionDate: '2024-02-08',
      lastUpdated: '2024-02-12',
      status: 'draft',
      priority: 'low',
      estimatedCompletion: '2024-03-15',
      assignedOfficer: null,
      documents: 2,
      comments: 0,
      location: 'Northern Region - Onshore',
      permitNumber: null,
      company: 'Atlantic Drilling Contractors',
      estimatedCost: 750000,
      duration: 6
    },
    {
      id: 'APP-2023-089',
      title: 'Exploration License - Block 7B',
      type: 'Exploration License',
      category: 'Exploration',
      submissionDate: '2023-12-15',
      lastUpdated: '2024-01-10',
      status: 'expired',
      priority: 'medium',
      estimatedCompletion: null,
      assignedOfficer: 'David Brown',
      documents: 7,
      comments: 4,
      location: 'Volta Region - Offshore',
      permitNumber: 'EL-2023-089',
      company: 'Tullow Oil Ghana',
      estimatedCost: 4500000,
      duration: 48
    },
    {
      id: 'APP-2024-006',
      title: 'Pipeline Construction Permit - Tema-Takoradi',
      type: 'Pipeline Permit',
      category: 'Infrastructure',
      submissionDate: '2024-01-20',
      lastUpdated: '2024-02-08',
      status: 'approved',
      priority: 'high',
      estimatedCompletion: '2024-03-20',
      assignedOfficer: 'Alice Cooper',
      documents: 12,
      comments: 6,
      location: 'Greater Accra - Central Region',
      permitNumber: 'PP-2024-006',
      company: 'Ghana Gas Company',
      estimatedCost: 8900000,
      duration: 30
    },
    {
      id: 'APP-2024-007',
      title: 'Facility Construction Permit - FPSO Mooring',
      type: 'Facility Permit',
      category: 'Infrastructure',
      submissionDate: '2024-02-05',
      lastUpdated: '2024-02-14',
      status: 'under_review',
      priority: 'high',
      estimatedCompletion: '2024-04-05',
      assignedOfficer: 'Robert Lee',
      documents: 15,
      comments: 2,
      location: 'Western Region - Offshore',
      permitNumber: null,
      company: 'Eni Ghana',
      estimatedCost: 12500000,
      duration: 42
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, text: 'Approved' },
      under_review: { color: 'bg-blue-100 text-blue-800', icon: ClockIcon, text: 'Under Review' },
      pending_documents: { color: 'bg-yellow-100 text-yellow-800', icon: DocumentTextIcon, text: 'Pending Documents' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, text: 'Rejected' },
      draft: { color: 'bg-gray-100 text-gray-800', icon: PencilIcon, text: 'Draft' },
      expired: { color: 'bg-orange-100 text-orange-800', icon: ExclamationTriangleIcon, text: 'Expired' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[priority as keyof typeof priorityConfig]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    
    // Date range filter
    let matchesDate = true;
    if (dateRange !== 'all') {
      const submissionDate = new Date(app.submissionDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateRange) {
        case 'last_7_days':
          matchesDate = daysDiff <= 7;
          break;
        case 'last_30_days':
          matchesDate = daysDiff <= 30;
          break;
        case 'last_90_days':
          matchesDate = daysDiff <= 90;
          break;
        case 'this_year':
          matchesDate = submissionDate.getFullYear() === now.getFullYear();
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'submission_date':
        aValue = new Date(a.submissionDate).getTime();
        bValue = new Date(b.submissionDate).getTime();
        break;
      case 'last_updated':
        aValue = new Date(a.lastUpdated).getTime();
        bValue = new Date(b.lastUpdated).getTime();
        break;
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
        break;
      case 'estimated_cost':
        aValue = a.estimatedCost;
        bValue = b.estimatedCost;
        break;
      default:
        aValue = a.submissionDate;
        bValue = b.submissionDate;
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleViewDetails = (applicationId: string) => {
    router.push(`/dashboard/company-admin/applications/${applicationId}`);
  };

  const handleEdit = (applicationId: string) => {
    router.push(`/dashboard/company-admin/applications/${applicationId}/edit`);
  };

  const statusCounts = {
    all: applications.length,
    approved: applications.filter(a => a.status === 'approved').length,
    under_review: applications.filter(a => a.status === 'under_review').length,
    pending_documents: applications.filter(a => a.status === 'pending_documents').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    draft: applications.filter(a => a.status === 'draft').length,
    expired: applications.filter(a => a.status === 'expired').length
  };

  const totalEstimatedCost = applications.reduce((sum, app) => sum + app.estimatedCost, 0);
  const averageProcessingTime = Math.round(applications.length > 0 ? applications.reduce((sum, app) => sum + app.duration, 0) / applications.length : 0);

  return (
    <DashboardLayout
      title="All Applications"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive view of all permit and license applications across the system
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${(totalEstimatedCost / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg. Duration</p>
                <p className="text-2xl font-semibold text-gray-900">{averageProcessingTime} months</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approval Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {Math.round((statusCounts.approved / statusCounts.all) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats by Status */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(statusCounts).filter(([key]) => key !== 'all').map(([status, count]) => {
            const statusConfig = {
              approved: { color: 'text-green-600', label: 'Approved' },
              under_review: { color: 'text-blue-600', label: 'Under Review' },
              pending_documents: { color: 'text-yellow-600', label: 'Pending Docs' },
              rejected: { color: 'text-red-600', label: 'Rejected' },
              draft: { color: 'text-gray-600', label: 'Draft' },
              expired: { color: 'text-orange-600', label: 'Expired' }
            };
            
            const config = statusConfig[status as keyof typeof statusConfig];
            
            return (
              <div key={status} className="bg-white p-4 rounded-lg shadow text-center">
                <p className={`text-2xl font-bold ${config.color}`}>{count}</p>
                <p className="text-sm text-gray-500">{config.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, type, ID, location, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="under_review">Under Review</option>
                <option value="pending_documents">Pending Documents</option>
                <option value="rejected">Rejected</option>
                <option value="draft">Draft</option>
                <option value="expired">Expired</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Drilling Permit">Drilling Permit</option>
                <option value="Survey Permit">Survey Permit</option>
                <option value="EIA Permit">EIA Permit</option>
                <option value="Production License">Production License</option>
                <option value="Exploration License">Exploration License</option>
                <option value="Abandonment Permit">Abandonment Permit</option>
                <option value="Pipeline Permit">Pipeline Permit</option>
                <option value="Facility Permit">Facility Permit</option>
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days">Last 90 Days</option>
                <option value="this_year">This Year</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="submission_date">Sort by Submission Date</option>
                <option value="last_updated">Sort by Last Updated</option>
                <option value="title">Sort by Title</option>
                <option value="status">Sort by Status</option>
                <option value="priority">Sort by Priority</option>
                <option value="estimated_cost">Sort by Cost</option>
              </select>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {sortedApplications.length} of {applications.length} applications
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company & Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Financial & Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.title}</div>
                        <div className="text-sm text-gray-500">{application.id}</div>
                        <div className="text-sm text-gray-500">{application.location}</div>
                        {application.permitNumber && (
                          <div className="text-xs text-blue-600 font-medium">{application.permitNumber}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.company}</div>
                        <div className="text-sm text-gray-500">{application.type}</div>
                        <div className="text-xs text-gray-500">{application.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        {getStatusBadge(application.status)}
                        {getPriorityBadge(application.priority)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="font-medium">${(application.estimatedCost / 1000000).toFixed(1)}M</div>
                        <div className="text-gray-500">{application.duration} months</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                          <span>{application.documents} docs</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{application.comments} comments</div>
                        {application.assignedOfficer && (
                          <div className="text-xs text-gray-500">
                            Officer: {application.assignedOfficer}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(application.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {application.permitNumber && (
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="Download Permit"
                          >
                            <DocumentArrowDownIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedApplications.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}