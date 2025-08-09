'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import {
  EyeIcon,
  DocumentArrowDownIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ViewRegistrationsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data for registrations
  const registrations = [
    {
      id: 'REG-2024-001',
      companyName: 'Acme Petroleum Services',
      registrationType: 'Service Provider',
      businessType: 'Drilling Services',
      submissionDate: '2024-01-15',
      lastUpdated: '2024-01-20',
      status: 'approved',
      validUntil: '2025-01-15',
      certificateNumber: 'CERT-2024-001',
      contactPerson: 'John Doe',
      email: 'john.doe@acmepetroleum.com',
      phone: '+233 24 123 4567'
    },
    {
      id: 'REG-2024-002',
      companyName: 'Ghana Oil Exploration Ltd',
      registrationType: 'Upstream Operator',
      businessType: 'Exploration',
      submissionDate: '2024-02-01',
      lastUpdated: '2024-02-10',
      status: 'pending',
      validUntil: null,
      certificateNumber: null,
      contactPerson: 'Jane Smith',
      email: 'jane.smith@ghanaoil.com',
      phone: '+233 24 987 6543'
    },
    {
      id: 'REG-2024-003',
      companyName: 'West Africa Equipment Supply',
      registrationType: 'Equipment Supplier',
      businessType: 'Equipment Supply',
      submissionDate: '2024-01-28',
      lastUpdated: '2024-02-05',
      status: 'under_review',
      validUntil: null,
      certificateNumber: null,
      contactPerson: 'Mike Johnson',
      email: 'mike.johnson@waequipment.com',
      phone: '+233 24 555 0123'
    },
    {
      id: 'REG-2023-045',
      companyName: 'Coastal Engineering Services',
      registrationType: 'Service Provider',
      businessType: 'Engineering Services',
      submissionDate: '2023-11-15',
      lastUpdated: '2024-01-10',
      status: 'expired',
      validUntil: '2024-01-15',
      certificateNumber: 'CERT-2023-045',
      contactPerson: 'Sarah Wilson',
      email: 'sarah.wilson@coastaleng.com',
      phone: '+233 24 777 8888'
    },
    {
      id: 'REG-2024-004',
      companyName: 'Atlantic Drilling Contractors',
      registrationType: 'Contractor',
      businessType: 'Drilling Services',
      submissionDate: '2024-02-12',
      lastUpdated: '2024-02-15',
      status: 'rejected',
      validUntil: null,
      certificateNumber: null,
      contactPerson: 'David Brown',
      email: 'david.brown@atlanticdrilling.com',
      phone: '+233 24 333 2222'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, text: 'Approved' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, text: 'Pending' },
      under_review: { color: 'bg-blue-100 text-blue-800', icon: ClockIcon, text: 'Under Review' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, text: 'Rejected' },
      expired: { color: 'bg-gray-100 text-gray-800', icon: ExclamationTriangleIcon, text: 'Expired' }
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

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.registrationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const matchesType = typeFilter === 'all' || reg.registrationType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (registrationId: string) => {
    router.push(`/dashboard/company-admin/company-registration/${registrationId}`);
  };

  const handleEdit = (registrationId: string) => {
    router.push(`/dashboard/company-admin/company-registration/${registrationId}/edit`);
  };

  const handleDownloadCertificate = (registration: any) => {
    if (registration.certificateNumber) {
      // Simulate certificate download
      console.log(`Downloading certificate for ${registration.certificateNumber}`);
    }
  };

  const statusCounts = {
    all: registrations.length,
    approved: registrations.filter(r => r.status === 'approved').length,
    pending: registrations.filter(r => r.status === 'pending').length,
    under_review: registrations.filter(r => r.status === 'under_review').length,
    rejected: registrations.filter(r => r.status === 'rejected').length,
    expired: registrations.filter(r => r.status === 'expired').length
  };

  return (
    <DashboardLayout
      title="My Company Registrations"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
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
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.pending}</p>
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
              <XCircleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{statusCounts.rejected}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-gray-600" />
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
                  placeholder="Search by company name, registration type, or ID..."
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
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Upstream Operator">Upstream Operator</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Equipment Supplier">Equipment Supplier</option>
                <option value="Contractor">Contractor</option>
                <option value="Joint Venture Partner">Joint Venture Partner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Company Registrations</h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{registration.companyName}</div>
                        <div className="text-sm text-gray-500">{registration.id}</div>
                        {registration.certificateNumber && (
                          <div className="text-xs text-blue-600">{registration.certificateNumber}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{registration.registrationType}</div>
                        <div className="text-sm text-gray-500">{registration.businessType}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{registration.contactPerson}</div>
                        <div className="text-sm text-gray-500">{registration.email}</div>
                        <div className="text-sm text-gray-500">{registration.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(registration.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div>Submitted: {new Date(registration.submissionDate).toLocaleDateString()}</div>
                        <div>Updated: {new Date(registration.lastUpdated).toLocaleDateString()}</div>
                        {registration.validUntil && (
                          <div className={`${
                            new Date(registration.validUntil) < new Date() ? 'text-red-600' : 'text-green-600'
                          }`}>
                            Valid until: {new Date(registration.validUntil).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(registration.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {registration.certificateNumber && (
                          <button
                            onClick={() => handleDownloadCertificate(registration)}
                            className="text-green-600 hover:text-green-900"
                            title="Download Certificate"
                          >
                            <DocumentArrowDownIcon className="h-5 w-5" />
                          </button>
                        )}
                        {(registration.status === 'pending' || registration.status === 'under_review') && (
                          <button
                            onClick={() => handleEdit(registration.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                            title="Edit Registration"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No registrations found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your search criteria.'
                  : 'Get started by creating a new company registration.'}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/dashboard/company-admin/company-registration/new')}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  New Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}