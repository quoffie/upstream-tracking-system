'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../components/layouts/DashboardMenus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Permit {
  id: string;
  type: 'Regular' | 'Rotator';
  applicantName: string;
  position: string;
  issueDate: string;
  expiryDate: string;
  status: 'Active' | 'Expired' | 'Suspended' | 'Pending Renewal' | 'Cancelled';
  permitNumber: string;
  workLocation: string;
  department: string;
  daysUntilExpiry: number;
  renewalEligible: boolean;
  documents: string[];
}

export default function ViewPermitsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('expiryDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

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
    
    setAuthLoading(false);
  }, [router, pathname]);

  if (authLoading) {
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
  const mockPermits: Permit[] = [
    {
      id: 'PER-2024-0001',
      type: 'Regular',
      applicantName: 'John Doe',
      position: 'Drilling Engineer',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'Active',
      permitNumber: 'REG-2024-001',
      workLocation: 'Offshore Platform A',
      department: 'Drilling',
      daysUntilExpiry: 365,
      renewalEligible: false,
      documents: ['Permit Certificate', 'Medical Certificate', 'Safety Training']
    },
    {
      id: 'PER-2024-0002',
      type: 'Rotator',
      applicantName: 'Jane Smith',
      position: 'Safety Officer',
      issueDate: '2023-06-20',
      expiryDate: '2024-06-20',
      status: 'Pending Renewal',
      permitNumber: 'ROT-2023-045',
      workLocation: 'Offshore Platform B',
      department: 'Safety',
      daysUntilExpiry: 45,
      renewalEligible: true,
      documents: ['Permit Certificate', 'Medical Certificate', 'BOSIET Certificate']
    },
    {
      id: 'PER-2024-0003',
      type: 'Regular',
      applicantName: 'Robert Brown',
      position: 'Operations Manager',
      issueDate: '2023-03-10',
      expiryDate: '2024-03-10',
      status: 'Expired',
      permitNumber: 'REG-2023-078',
      workLocation: 'Onshore Facility',
      department: 'Operations',
      daysUntilExpiry: -30,
      renewalEligible: true,
      documents: ['Permit Certificate', 'Medical Certificate']
    },
    {
      id: 'PER-2024-0004',
      type: 'Rotator',
      applicantName: 'Emily Wilson',
      position: 'Environmental Specialist',
      issueDate: '2024-02-01',
      expiryDate: '2025-02-01',
      status: 'Active',
      permitNumber: 'ROT-2024-012',
      workLocation: 'Remote Site C',
      department: 'Environmental',
      daysUntilExpiry: 180,
      renewalEligible: false,
      documents: ['Permit Certificate', 'Medical Certificate', 'Environmental Training']
    },
    {
      id: 'PER-2024-0005',
      type: 'Regular',
      applicantName: 'Michael Chen',
      position: 'Geologist',
      issueDate: '2023-12-15',
      expiryDate: '2024-12-15',
      status: 'Active',
      permitNumber: 'REG-2023-156',
      workLocation: 'Offshore Platform A',
      department: 'Geology',
      daysUntilExpiry: 90,
      renewalEligible: true,
      documents: ['Permit Certificate', 'Medical Certificate', 'Geology Certification']
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPermits = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPermits(mockPermits);
      setLoading(false);
    };

    fetchPermits();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Expired':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Suspended':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'Pending Renewal':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Cancelled':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Suspended':
        return 'bg-orange-100 text-orange-800';
      case 'Pending Renewal':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return 'text-red-600'; // Expired
    if (daysUntilExpiry <= 30) return 'text-orange-600'; // Expiring soon
    if (daysUntilExpiry <= 90) return 'text-yellow-600'; // Renewal eligible
    return 'text-gray-600'; // Normal
  };

  const filteredPermits = permits.filter(permit => {
    const matchesStatus = filterStatus === 'all' || permit.status === filterStatus;
    const matchesType = filterType === 'all' || permit.type === filterType;
    const matchesSearch = searchQuery === '' || 
      permit.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.permitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const sortedPermits = [...filteredPermits].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'expiryDate':
        aValue = new Date(a.expiryDate).getTime();
        bValue = new Date(b.expiryDate).getTime();
        break;
      case 'issueDate':
        aValue = new Date(a.issueDate).getTime();
        bValue = new Date(b.issueDate).getTime();
        break;
      case 'applicantName':
        aValue = a.applicantName.toLowerCase();
        bValue = b.applicantName.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a.expiryDate;
        bValue = b.expiryDate;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleRenewal = (permitId: string) => {
    // Navigate to renewal application
    router.push(`/dashboard/company-admin/permits/renew/${permitId}`);
  };

  const handleDownload = (permitId: string) => {
    // Simulate document download
    console.log('Downloading permit:', permitId);
  };

  if (loading) {
    return (
      <DashboardLayout
        title="My Permits"
        userRole="Company Admin"
        userName="Acme Corporation"
        userInitials="AC"
        sidebarItems={sidebarItems}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading permits...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="My Permits"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Permits</h1>
            <p className="text-gray-600 mt-1">View and manage your issued permits</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/dashboard/company-admin/permits/apply-regular">
              <Button variant="outline">
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Apply Regular
              </Button>
            </Link>
            <Link href="/dashboard/company-admin/permits/apply-rotator">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Apply Rotator
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Permits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.daysUntilExpiry <= 90 && p.daysUntilExpiry > 0).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.status === 'Expired').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ArrowPathIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Renewal Eligible</p>
                <p className="text-2xl font-bold text-gray-900">
                  {permits.filter(p => p.renewalEligible).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search permits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Suspended">Suspended</option>
                <option value="Pending Renewal">Pending Renewal</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Regular">Regular</option>
                <option value="Rotator">Rotator</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="expiryDate-asc">Expiry Date (Earliest)</option>
                <option value="expiryDate-desc">Expiry Date (Latest)</option>
                <option value="issueDate-desc">Issue Date (Newest)</option>
                <option value="issueDate-asc">Issue Date (Oldest)</option>
                <option value="applicantName-asc">Name (A-Z)</option>
                <option value="applicantName-desc">Name (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Permits Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Permits ({sortedPermits.length})
              </h3>
            </div>
            
            {sortedPermits.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No permits found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || filterStatus !== 'all' || filterType !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by applying for a new permit.'}
                </p>
                <div className="mt-6">
                  <Link href="/dashboard/company-admin/permits/apply-regular">
                    <Button>
                      <DocumentTextIcon className="h-4 w-4 mr-2" />
                      Apply for Permit
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Permit Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedPermits.map((permit) => (
                      <tr key={permit.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {permit.permitNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {permit.workLocation}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {permit.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {permit.position} • {permit.department}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {permit.type === 'Rotator' ? (
                              <ArrowPathIcon className="h-4 w-4 text-blue-500 mr-2" />
                            ) : (
                              <DocumentTextIcon className="h-4 w-4 text-gray-500 mr-2" />
                            )}
                            <span className="text-sm text-gray-900">{permit.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(permit.status)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getStatusColor(permit.status)
                            }`}>
                              {permit.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className={`text-sm font-medium ${
                              getExpiryColor(permit.daysUntilExpiry)
                            }`}>
                              {new Date(permit.expiryDate).toLocaleDateString()}
                            </div>
                            <div className={`text-xs ${
                              getExpiryColor(permit.daysUntilExpiry)
                            }`}>
                              {permit.daysUntilExpiry < 0 
                                ? `Expired ${Math.abs(permit.daysUntilExpiry)} days ago`
                                : `${permit.daysUntilExpiry} days remaining`
                              }
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDownload(permit.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Download Certificate"
                            >
                              <ArrowDownTrayIcon className="h-4 w-4" />
                            </button>
                            {permit.renewalEligible && (
                              <button 
                                onClick={() => handleRenewal(permit.id)}
                                className="text-orange-600 hover:text-orange-900"
                                title="Renew Permit"
                              >
                                <ArrowPathIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}