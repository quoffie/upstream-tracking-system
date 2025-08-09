'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DocumentPlusIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Application {
  id: string;
  type: string;
  applicantName: string;
  position: string;
  submissionDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Pending Payment';
  currentStage: string;
  assignedTo: string;
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  daysInSystem: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  amount: number;
  estimatedCompletion: string;
  documents: string[];
}

export default function AllApplicationsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('submissionDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for applications
  const mockApplications: Application[] = [
    {
      id: 'APP-2024-0001',
      type: 'Regular Permit',
      applicantName: 'John Doe',
      position: 'Drilling Engineer',
      submissionDate: '2024-01-15',
      status: 'Under Review',
      currentStage: 'Technical Review',
      assignedTo: 'Sarah Wilson',
      priority: 'Normal',
      daysInSystem: 12,
      paymentStatus: 'Paid',
      amount: 2500,
      estimatedCompletion: '2024-02-15',
      documents: ['CV', 'Passport', 'Medical Certificate']
    },
    {
      id: 'APP-2024-0002',
      type: 'Rotator Permit',
      applicantName: 'Jane Smith',
      position: 'Safety Officer',
      submissionDate: '2024-01-20',
      status: 'Approved',
      currentStage: 'Completed',
      assignedTo: 'Mike Johnson',
      priority: 'High',
      daysInSystem: 7,
      paymentStatus: 'Paid',
      amount: 3000,
      estimatedCompletion: '2024-01-27',
      documents: ['CV', 'Passport', 'Safety Certification']
    },
    {
      id: 'APP-2024-0003',
      type: 'Permit Renewal',
      applicantName: 'Robert Brown',
      position: 'Operations Manager',
      submissionDate: '2024-01-25',
      status: 'Pending Payment',
      currentStage: 'Payment Processing',
      assignedTo: 'Lisa Davis',
      priority: 'Normal',
      daysInSystem: 2,
      paymentStatus: 'Pending',
      amount: 1500,
      estimatedCompletion: '2024-02-10',
      documents: ['Renewal Form', 'Updated CV']
    },
    {
      id: 'APP-2024-0004',
      type: 'Emergency Permit',
      applicantName: 'Emily Wilson',
      position: 'Environmental Specialist',
      submissionDate: '2024-01-26',
      status: 'Submitted',
      currentStage: 'Initial Review',
      assignedTo: 'David Lee',
      priority: 'Urgent',
      daysInSystem: 1,
      paymentStatus: 'Paid',
      amount: 5000,
      estimatedCompletion: '2024-01-30',
      documents: ['Emergency Request', 'Justification Letter']
    },
    {
      id: 'APP-2024-0005',
      type: 'Regular Permit',
      applicantName: 'Michael Chen',
      position: 'Geologist',
      submissionDate: '2024-01-10',
      status: 'Rejected',
      currentStage: 'Rejected',
      assignedTo: 'Sarah Wilson',
      priority: 'Low',
      daysInSystem: 17,
      paymentStatus: 'Paid',
      amount: 2500,
      estimatedCompletion: 'N/A',
      documents: ['CV', 'Passport']
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchApplications = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApplications(mockApplications);
      setLoading(false);
    };

    fetchApplications();

    // Check for success message
    if (searchParams.get('success') === 'true') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Under Review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Pending Payment':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending Payment':
        return 'bg-orange-100 text-orange-800';
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Normal':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesType = filterType === 'all' || app.type === filterType;
    const matchesSearch = searchQuery === '' || 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'submissionDate':
        aValue = new Date(a.submissionDate).getTime();
        bValue = new Date(b.submissionDate).getTime();
        break;
      case 'applicantName':
        aValue = a.applicantName.toLowerCase();
        bValue = b.applicantName.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'priority':
        const priorityOrder = { 'Urgent': 4, 'High': 3, 'Normal': 2, 'Low': 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
        break;
      default:
        aValue = a.submissionDate;
        bValue = b.submissionDate;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        title="All Applications"
        userRole="Company Admin"
        userName="Acme Corporation"
        userInitials="AC"
        sidebarItems={sidebarItems}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="All Applications"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <CheckCircleIcon className="h-5 w-5 text-green-400" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Application submitted successfully!
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Your application has been submitted and is now under review.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
            <p className="text-gray-600 mt-1">View and manage all submitted applications</p>
          </div>
          <Link href="/dashboard/company-admin/applications/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <DocumentPlusIcon className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </Link>
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
                  placeholder="Search applications..."
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
                <option value="Draft">Draft</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending Payment">Pending Payment</option>
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
                <option value="Regular Permit">Regular Permit</option>
                <option value="Rotator Permit">Rotator Permit</option>
                <option value="Permit Renewal">Permit Renewal</option>
                <option value="Emergency Permit">Emergency Permit</option>
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
                <option value="submissionDate-desc">Date (Newest)</option>
                <option value="submissionDate-asc">Date (Oldest)</option>
                <option value="applicantName-asc">Name (A-Z)</option>
                <option value="applicantName-desc">Name (Z-A)</option>
                <option value="priority-desc">Priority (High-Low)</option>
                <option value="priority-asc">Priority (Low-High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Applications ({sortedApplications.length})
              </h3>
            </div>
            
            {sortedApplications.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || filterStatus !== 'all' || filterType !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by creating a new application.'}
                </p>
                <div className="mt-6">
                  <Link href="/dashboard/company-admin/applications/new">
                    <Button>
                      <DocumentPlusIcon className="h-4 w-4 mr-2" />
                      New Application
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
                        Application ID
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
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {application.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.applicantName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.position}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(application.status)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getStatusColor(application.status)
                            }`}>
                              {application.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            getPriorityColor(application.priority)
                          }`}>
                            {application.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(application.submissionDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            {application.status === 'Draft' && (
                              <button className="text-green-600 hover:text-green-900">
                                <PencilIcon className="h-4 w-4" />
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