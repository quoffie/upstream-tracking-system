'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../components/layouts/DashboardMenus';
import {
  EyeIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  DocumentTextIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function MyApplicationsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data for applications
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
      permitNumber: 'DP-2024-001'
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
      permitNumber: null
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
      permitNumber: null
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
      permitNumber: null
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
      permitNumber: null
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
      permitNumber: 'EL-2023-089'
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
                         app.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (applicationId: string) => {
    router.push(`/dashboard/company-admin/applications/${applicationId}`);
  };

  const handleEdit = (applicationId: string) => {
    router.push(`/dashboard/company-admin/applications/${applicationId}/edit`);
  };

  const handleNewApplication = () => {
    router.push('/dashboard/company-admin/applications/new');
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

  return (
    <DashboardLayout
      title="My Applications"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header with New Application Button */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track all your permit and license applications
            </p>
          </div>
          <button
            onClick={handleNewApplication}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            New Application
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.all}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.approved}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Review</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.under_review}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.pending_documents}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.rejected}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <PencilIcon className="h-8 w-8 text-gray-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Draft</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.draft}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Expired</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.expired}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, type, ID, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
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
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Applications</h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredApplications.length} of {applications.length} applications
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
                    Type & Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{application.type}</div>
                        <div className="text-sm text-gray-500">{application.category}</div>
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
                        <div className="flex items-center space-x-2">
                          <DocumentTextIcon className="h-4 w-4 text-gray-400" />
                          <span>{application.documents} docs</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{application.comments} comments</span>
                        </div>
                        {application.assignedOfficer && (
                          <div className="text-xs text-gray-500 mt-1">
                            Officer: {application.assignedOfficer}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>Submitted: {new Date(application.submissionDate).toLocaleDateString()}</div>
                        <div>Updated: {new Date(application.lastUpdated).toLocaleDateString()}</div>
                        {application.estimatedCompletion && (
                          <div className="text-blue-600">
                            Est. completion: {new Date(application.estimatedCompletion).toLocaleDateString()}
                          </div>
                        )}
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
                        {(application.status === 'draft' || application.status === 'pending_documents') && (
                          <button
                            onClick={() => handleEdit(application.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit Application"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        )}
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
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Get started by creating a new application.'}
              </p>
              <div className="mt-6">
                <button
                  onClick={handleNewApplication}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  New Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}