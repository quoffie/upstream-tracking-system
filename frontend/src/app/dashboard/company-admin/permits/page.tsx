'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../app/components/layouts/DashboardMenus';
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
  ArrowPathIcon,
  ChartBarIcon,
  MapPinIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

export default function PermitsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      router.push('/auth/login?redirect=' + encodeURIComponent(pathname));
      return;
    }
    
    try {
      const user = JSON.parse(userData);
      if (user.role !== 'COMPANY_ADMIN' && user.role !== 'PERSONNEL') {
        router.push('/auth/login');
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login');
      return;
    }
    
    setIsLoading(false);
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Mock data for permits
  const permits = [
    {
      id: 'PRM-2024-001',
      permitNumber: 'DP-2024-001',
      title: 'Offshore Drilling Permit - Block 3A',
      type: 'Drilling Permit',
      category: 'Environmental',
      status: 'active',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      location: 'Western Region - Offshore',
      company: 'Acme Petroleum Services',
      issuingAuthority: 'Environmental Protection Agency',
      conditions: 12,
      renewalRequired: true,
      daysToExpiry: 180,
      complianceStatus: 'compliant',
      lastInspection: '2024-01-20',
      nextInspection: '2024-04-20',
      estimatedValue: 2500000
    },
    {
      id: 'PRM-2023-045',
      permitNumber: 'EL-2023-045',
      title: 'Exploration License - Tano Basin',
      type: 'Exploration License',
      category: 'Exploration',
      status: 'active',
      issueDate: '2023-06-01',
      expiryDate: '2025-06-01',
      location: 'Western Region - Tano Basin',
      company: 'Ghana Oil Exploration Ltd',
      issuingAuthority: 'Petroleum Commission',
      conditions: 8,
      renewalRequired: true,
      daysToExpiry: 365,
      complianceStatus: 'compliant',
      lastInspection: '2023-12-15',
      nextInspection: '2024-03-15',
      estimatedValue: 4500000
    },
    {
      id: 'PRM-2024-003',
      permitNumber: 'EIA-2024-003',
      title: 'Environmental Impact Assessment Permit',
      type: 'EIA Permit',
      category: 'Environmental',
      status: 'pending_renewal',
      issueDate: '2022-03-10',
      expiryDate: '2024-03-10',
      location: 'Central Region - Offshore',
      company: 'West Africa Equipment Supply',
      issuingAuthority: 'Environmental Protection Agency',
      conditions: 15,
      renewalRequired: true,
      daysToExpiry: 30,
      complianceStatus: 'minor_issues',
      lastInspection: '2024-01-05',
      nextInspection: '2024-02-20',
      estimatedValue: 950000
    },
    {
      id: 'PRM-2023-078',
      permitNumber: 'PL-2023-078',
      title: 'Production License - Jubilee Field',
      type: 'Production License',
      category: 'Production',
      status: 'suspended',
      issueDate: '2020-08-15',
      expiryDate: '2025-08-15',
      location: 'Western Region - Offshore',
      company: 'Tullow Oil Ghana',
      issuingAuthority: 'Petroleum Commission',
      conditions: 20,
      renewalRequired: false,
      daysToExpiry: 450,
      complianceStatus: 'non_compliant',
      lastInspection: '2024-01-10',
      nextInspection: '2024-02-25',
      estimatedValue: 12000000
    },
    {
      id: 'PRM-2024-007',
      permitNumber: 'PP-2024-007',
      title: 'Pipeline Construction Permit',
      type: 'Pipeline Permit',
      category: 'Infrastructure',
      status: 'active',
      issueDate: '2024-02-01',
      expiryDate: '2026-02-01',
      location: 'Greater Accra - Central Region',
      company: 'Ghana Gas Company',
      issuingAuthority: 'National Petroleum Authority',
      conditions: 18,
      renewalRequired: true,
      daysToExpiry: 720,
      complianceStatus: 'compliant',
      lastInspection: '2024-02-05',
      nextInspection: '2024-05-05',
      estimatedValue: 8900000
    },
    {
      id: 'PRM-2023-089',
      permitNumber: 'AP-2023-089',
      title: 'Well Abandonment Permit - Block 7B',
      type: 'Abandonment Permit',
      category: 'Decommissioning',
      status: 'expired',
      issueDate: '2023-01-15',
      expiryDate: '2024-01-15',
      location: 'Volta Region - Offshore',
      company: 'Atlantic Drilling Contractors',
      issuingAuthority: 'Environmental Protection Agency',
      conditions: 10,
      renewalRequired: false,
      daysToExpiry: -30,
      complianceStatus: 'expired',
      lastInspection: '2023-12-01',
      nextInspection: null,
      estimatedValue: 750000
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, text: 'Active' },
      pending_renewal: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, text: 'Pending Renewal' },
      suspended: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, text: 'Suspended' },
      expired: { color: 'bg-gray-100 text-gray-800', icon: ExclamationTriangleIcon, text: 'Expired' },
      under_review: { color: 'bg-blue-100 text-blue-800', icon: ArrowPathIcon, text: 'Under Review' }
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

  const getComplianceBadge = (compliance: string) => {
    const complianceConfig = {
      compliant: { color: 'bg-green-100 text-green-800', text: 'Compliant' },
      minor_issues: { color: 'bg-yellow-100 text-yellow-800', text: 'Minor Issues' },
      non_compliant: { color: 'bg-red-100 text-red-800', text: 'Non-Compliant' },
      expired: { color: 'bg-gray-100 text-gray-800', text: 'Expired' }
    };
    
    const config = complianceConfig[compliance as keyof typeof complianceConfig];
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getExpiryWarning = (daysToExpiry: number) => {
    if (daysToExpiry < 0) {
      return { color: 'text-red-600', text: `Expired ${Math.abs(daysToExpiry)} days ago` };
    } else if (daysToExpiry <= 30) {
      return { color: 'text-red-600', text: `Expires in ${daysToExpiry} days` };
    } else if (daysToExpiry <= 90) {
      return { color: 'text-yellow-600', text: `Expires in ${daysToExpiry} days` };
    } else {
      return { color: 'text-green-600', text: `Expires in ${daysToExpiry} days` };
    }
  };

  const filteredPermits = permits.filter(permit => {
    const matchesSearch = permit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.permitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || permit.status === statusFilter;
    const matchesType = typeFilter === 'all' || permit.type === typeFilter;
    
    let matchesExpiry = true;
    if (expiryFilter !== 'all') {
      switch (expiryFilter) {
        case 'expired':
          matchesExpiry = permit.daysToExpiry < 0;
          break;
        case 'expiring_soon':
          matchesExpiry = permit.daysToExpiry >= 0 && permit.daysToExpiry <= 90;
          break;
        case 'active_long_term':
          matchesExpiry = permit.daysToExpiry > 90;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesExpiry;
  });

  const handleViewDetails = (permitId: string) => {
    router.push(`/dashboard/company-admin/permits/${permitId}`);
  };

  const handleRenewPermit = (permitId: string) => {
    router.push(`/dashboard/company-admin/permits/${permitId}/renew`);
  };

  const handleApplyForPermit = () => {
    router.push('/dashboard/company-admin/permits/apply');
  };

  const statusCounts = {
    all: permits.length,
    active: permits.filter(p => p.status === 'active').length,
    pending_renewal: permits.filter(p => p.status === 'pending_renewal').length,
    suspended: permits.filter(p => p.status === 'suspended').length,
    expired: permits.filter(p => p.status === 'expired').length
  };

  const expiringCount = permits.filter(p => p.daysToExpiry >= 0 && p.daysToExpiry <= 90).length;
  const expiredCount = permits.filter(p => p.daysToExpiry < 0).length;
  const totalValue = permits.reduce((sum, permit) => sum + permit.estimatedValue, 0);
  const complianceRate = Math.round((permits.filter(p => p.complianceStatus === 'compliant').length / permits.length) * 100);

  return (
    <DashboardLayout
      title="Permit Management"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Permit Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track all your permits and licenses
            </p>
          </div>
          <button
            onClick={handleApplyForPermit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Apply for New Permit
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Permits</p>
                <p className="text-2xl font-semibold text-gray-900">{permits.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                <p className="text-2xl font-semibold text-gray-900">{expiringCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${(totalValue / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Compliance Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats by Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(statusCounts).filter(([key]) => key !== 'all').map(([status, count]) => {
            const statusConfig = {
              active: { color: 'text-green-600', label: 'Active' },
              pending_renewal: { color: 'text-yellow-600', label: 'Pending Renewal' },
              suspended: { color: 'text-red-600', label: 'Suspended' },
              expired: { color: 'text-gray-600', label: 'Expired' }
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

        {/* Alerts */}
        {(expiringCount > 0 || expiredCount > 0) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Attention Required:</strong>
                  {expiredCount > 0 && ` ${expiredCount} permit(s) have expired.`}
                  {expiringCount > 0 && ` ${expiringCount} permit(s) are expiring within 90 days.`}
                  Please take necessary action to maintain compliance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by permit number, title, type, location, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending_renewal">Pending Renewal</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Drilling Permit">Drilling Permit</option>
                <option value="Exploration License">Exploration License</option>
                <option value="EIA Permit">EIA Permit</option>
                <option value="Production License">Production License</option>
                <option value="Pipeline Permit">Pipeline Permit</option>
                <option value="Abandonment Permit">Abandonment Permit</option>
              </select>
              
              <select
                value={expiryFilter}
                onChange={(e) => setExpiryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Expiry Status</option>
                <option value="expired">Expired</option>
                <option value="expiring_soon">Expiring Soon (≤90 days)</option>
                <option value="active_long_term">Active Long-term ({'>'}90 days)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Permits Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Permits & Licenses</h3>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredPermits.length} of {permits.length} permits
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permit Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Compliance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Validity & Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inspections
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPermits.map((permit) => {
                  const expiryWarning = getExpiryWarning(permit.daysToExpiry);
                  
                  return (
                    <tr key={permit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{permit.title}</div>
                          <div className="text-sm text-blue-600 font-medium">{permit.permitNumber}</div>
                          <div className="text-sm text-gray-500">{permit.type}</div>
                          <div className="text-xs text-gray-500">{permit.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            <BuildingOfficeIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {permit.company}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {permit.location}
                          </div>
                          <div className="text-xs text-gray-500">{permit.issuingAuthority}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          {getStatusBadge(permit.status)}
                          {getComplianceBadge(permit.complianceStatus)}
                          <div className="text-xs text-gray-500">
                            {permit.conditions} conditions
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="text-xs text-gray-500">Issued: {new Date(permit.issueDate).toLocaleDateString()}</div>
                          <div className="text-xs text-gray-500">Expires: {new Date(permit.expiryDate).toLocaleDateString()}</div>
                          <div className={`text-xs font-medium ${expiryWarning.color}`}>
                            {expiryWarning.text}
                          </div>
                          <div className="text-xs text-gray-500">
                            Value: ${(permit.estimatedValue / 1000000).toFixed(1)}M
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="text-xs text-gray-500">
                            Last: {permit.lastInspection ? new Date(permit.lastInspection).toLocaleDateString() : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            Next: {permit.nextInspection ? new Date(permit.nextInspection).toLocaleDateString() : 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(permit.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900"
                            title="Download Permit"
                          >
                            <DocumentArrowDownIcon className="h-5 w-5" />
                          </button>
                          {(permit.status === 'pending_renewal' || permit.daysToExpiry <= 90) && (
                            <button
                              onClick={() => handleRenewPermit(permit.id)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Renew Permit"
                            >
                              <ArrowPathIcon className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredPermits.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No permits found</h3>
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