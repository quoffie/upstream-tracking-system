'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../components/layouts/DashboardMenus';
import {
  BuildingOffice2Icon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface JointVenture {
  id: string;
  name: string;
  partners: string[];
  ownershipPercentage: number;
  status: 'active' | 'pending' | 'suspended' | 'terminated';
  establishedDate: string;
  registrationNumber: string;
  businessType: string;
  location: string;
  totalInvestment: number;
  localContentPercentage: number;
  employeeCount: number;
  description: string;
  keyActivities: string[];
  complianceStatus: 'compliant' | 'non-compliant' | 'under-review';
  lastReviewDate: string;
  nextReviewDate: string;
}

export default function JointVenturesPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const [complianceFilter, setComplianceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJVs, setSelectedJVs] = useState<string[]>([]);

  // Mock data
  const jointVentures: JointVenture[] = [
    {
      id: '1',
      name: 'Ghana Offshore Drilling JV',
      partners: ['Acme Corporation', 'Ghana National Petroleum', 'TotalEnergies'],
      ownershipPercentage: 40,
      status: 'active',
      establishedDate: '2022-03-15',
      registrationNumber: 'JV-2022-001',
      businessType: 'Offshore Drilling',
      location: 'Western Region, Ghana',
      totalInvestment: 250000000,
      localContentPercentage: 65,
      employeeCount: 450,
      description: 'Joint venture for offshore drilling operations in Ghana\'s western basin',
      keyActivities: ['Offshore Drilling', 'Well Completion', 'Production Support'],
      complianceStatus: 'compliant',
      lastReviewDate: '2024-01-10',
      nextReviewDate: '2024-07-10'
    },
    {
      id: '2',
      name: 'Volta Basin Exploration Partnership',
      partners: ['Acme Corporation', 'Kosmos Energy', 'Ghana Oil Company'],
      ownershipPercentage: 35,
      status: 'active',
      establishedDate: '2023-06-20',
      registrationNumber: 'JV-2023-003',
      businessType: 'Exploration',
      location: 'Volta Region, Ghana',
      totalInvestment: 180000000,
      localContentPercentage: 70,
      employeeCount: 280,
      description: 'Exploration partnership for the Volta Basin oil and gas prospects',
      keyActivities: ['Seismic Surveys', 'Exploratory Drilling', 'Geological Studies'],
      complianceStatus: 'compliant',
      lastReviewDate: '2024-01-05',
      nextReviewDate: '2024-07-05'
    },
    {
      id: '3',
      name: 'Cape Coast Refinery Modernization JV',
      partners: ['Acme Corporation', 'Tema Oil Refinery', 'Shell Ghana'],
      ownershipPercentage: 30,
      status: 'pending',
      establishedDate: '2024-01-08',
      registrationNumber: 'JV-2024-001',
      businessType: 'Refining & Processing',
      location: 'Central Region, Ghana',
      totalInvestment: 320000000,
      localContentPercentage: 75,
      employeeCount: 0,
      description: 'Joint venture for modernizing the Cape Coast refinery infrastructure',
      keyActivities: ['Refinery Upgrade', 'Technology Transfer', 'Capacity Building'],
      complianceStatus: 'under-review',
      lastReviewDate: '2024-01-08',
      nextReviewDate: '2024-04-08'
    },
    {
      id: '4',
      name: 'Northern Gas Pipeline JV',
      partners: ['Acme Corporation', 'Ghana Gas Company', 'ENI Ghana'],
      ownershipPercentage: 25,
      status: 'suspended',
      establishedDate: '2021-11-12',
      registrationNumber: 'JV-2021-005',
      businessType: 'Pipeline & Infrastructure',
      location: 'Northern Region, Ghana',
      totalInvestment: 150000000,
      localContentPercentage: 60,
      employeeCount: 120,
      description: 'Gas pipeline infrastructure development in northern Ghana',
      keyActivities: ['Pipeline Construction', 'Gas Distribution', 'Infrastructure Development'],
      complianceStatus: 'non-compliant',
      lastReviewDate: '2023-11-12',
      nextReviewDate: '2024-05-12'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Active' },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
      suspended: { color: 'bg-orange-100 text-orange-800', icon: ExclamationTriangleIcon, label: 'Suspended' },
      terminated: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Terminated' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getComplianceBadge = (status: string) => {
    const statusConfig = {
      compliant: { color: 'bg-green-100 text-green-800', label: 'Compliant' },
      'non-compliant': { color: 'bg-red-100 text-red-800', label: 'Non-Compliant' },
      'under-review': { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter joint ventures
  const filteredJVs = jointVentures.filter(jv => {
    const matchesSearch = 
      jv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jv.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jv.partners.some(partner => partner.toLowerCase().includes(searchTerm.toLowerCase())) ||
      jv.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || jv.status === statusFilter;
    const matchesBusinessType = businessTypeFilter === 'all' || jv.businessType === businessTypeFilter;
    const matchesCompliance = complianceFilter === 'all' || jv.complianceStatus === complianceFilter;
    
    return matchesSearch && matchesStatus && matchesBusinessType && matchesCompliance;
  });

  // Calculate statistics
  const stats = {
    total: jointVentures.length,
    active: jointVentures.filter(jv => jv.status === 'active').length,
    pending: jointVentures.filter(jv => jv.status === 'pending').length,
    suspended: jointVentures.filter(jv => jv.status === 'suspended').length,
    totalInvestment: jointVentures.reduce((sum, jv) => sum + jv.totalInvestment, 0),
    totalEmployees: jointVentures.reduce((sum, jv) => sum + jv.employeeCount, 0),
    avgLocalContent: Math.round(jointVentures.reduce((sum, jv) => sum + jv.localContentPercentage, 0) / jointVentures.length)
  };

  const handleSelectJV = (id: string) => {
    setSelectedJVs(prev => 
      prev.includes(id) 
        ? prev.filter(jv => jv !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedJVs(
      selectedJVs.length === filteredJVs.length 
        ? [] 
        : filteredJVs.map(jv => jv.id)
    );
  };

  return (
    <DashboardLayout
      title="Joint Ventures"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Joint Ventures</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your joint venture partnerships and track compliance status
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/company-admin/joint-ventures/create')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Joint Venture
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total JVs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalInvestment)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Local Content</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgLocalContent}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Suspended</p>
                <p className="text-xl font-bold text-orange-600">{stats.suspended}</p>
              </div>
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Employees</p>
                <p className="text-xl font-bold text-blue-600">{stats.totalEmployees.toLocaleString()}</p>
              </div>
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search joint ventures by name, registration number, partners, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Type
                </label>
                <select
                  value={businessTypeFilter}
                  onChange={(e) => setBusinessTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Offshore Drilling">Offshore Drilling</option>
                  <option value="Exploration">Exploration</option>
                  <option value="Refining & Processing">Refining & Processing</option>
                  <option value="Pipeline & Infrastructure">Pipeline & Infrastructure</option>
                  <option value="Production">Production</option>
                  <option value="Marketing & Distribution">Marketing & Distribution</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Compliance Status
                </label>
                <select
                  value={complianceFilter}
                  onChange={(e) => setComplianceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="under-review">Under Review</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Joint Ventures Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Joint Ventures ({filteredJVs.length})
              </h3>
              {selectedJVs.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedJVs.length} selected
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Bulk Actions
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedJVs.length === filteredJVs.length && filteredJVs.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joint Venture
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partners & Ownership
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investment & Local Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJVs.map((jv) => (
                  <tr key={jv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedJVs.includes(jv.id)}
                        onChange={() => handleSelectJV(jv.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {jv.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {jv.registrationNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {jv.businessType}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          📍 {jv.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {jv.ownershipPercentage}% Ownership
                        </div>
                        <div className="text-xs text-gray-500">
                          Partners: {jv.partners.length}
                        </div>
                        <div className="text-xs text-gray-500">
                          {jv.partners.slice(0, 2).join(', ')}
                          {jv.partners.length > 2 && ` +${jv.partners.length - 2} more`}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(jv.status)}
                        <div className="text-xs text-gray-500">
                          Est. {formatDate(jv.establishedDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(jv.totalInvestment)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Local Content: {jv.localContentPercentage}%
                        </div>
                        <div className="text-xs text-gray-500">
                          Employees: {jv.employeeCount.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getComplianceBadge(jv.complianceStatus)}
                        <div className="text-xs text-gray-500">
                          Next Review: {formatDate(jv.nextReviewDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/joint-ventures/${jv.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/joint-ventures/${jv.id}/edit`)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Download Report"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="More Actions"
                          >
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredJVs.length === 0 && (
            <div className="text-center py-12">
              <BuildingOffice2Icon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No joint ventures found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || businessTypeFilter !== 'all' || complianceFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first joint venture.'}
              </p>
              {!searchTerm && statusFilter === 'all' && businessTypeFilter === 'all' && complianceFilter === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/dashboard/company-admin/joint-ventures/create')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Joint Venture
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}