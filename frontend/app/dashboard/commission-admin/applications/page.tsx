'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import EnhancedDashboardLayout from '../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../src/app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Application {
  id: string;
  type: string;
  company: string;
  submittedDate: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Pending Payment';
  progress: number;
  assignedOfficer?: string;
  lastUpdated: string;
  priority: 'High' | 'Medium' | 'Low';
}

export default function ApplicationsTrackerPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data for applications
    const mockApplications: Application[] = [
      {
        id: 'APP-2024-001',
        type: 'Company Registration',
        company: 'Chevron Nigeria Limited',
        submittedDate: '2024-01-15',
        status: 'Under Review',
        progress: 65,
        assignedOfficer: 'John Doe',
        lastUpdated: '2024-01-25',
        priority: 'High'
      },
      {
        id: 'APP-2024-002',
        type: 'Regular Permit',
        company: 'Shell Petroleum Development Company',
        submittedDate: '2024-01-18',
        status: 'Pending Payment',
        progress: 90,
        assignedOfficer: 'Jane Smith',
        lastUpdated: '2024-01-26',
        priority: 'Medium'
      },
      {
        id: 'APP-2024-003',
        type: 'JV Application',
        company: 'Total E&P Nigeria',
        submittedDate: '2024-01-20',
        status: 'Submitted',
        progress: 25,
        lastUpdated: '2024-01-20',
        priority: 'High'
      },
      {
        id: 'APP-2024-004',
        type: 'Rotator Permit',
        company: 'ExxonMobil Nigeria',
        submittedDate: '2024-01-22',
        status: 'Approved',
        progress: 100,
        assignedOfficer: 'Mike Johnson',
        lastUpdated: '2024-01-27',
        priority: 'Low'
      },
      {
        id: 'APP-2024-005',
        type: 'Renewal Application',
        company: 'Eni Nigeria Limited',
        submittedDate: '2024-01-25',
        status: 'Draft',
        progress: 10,
        lastUpdated: '2024-01-25',
        priority: 'Medium'
      },
      {
        id: 'APP-2024-006',
        type: 'Company Registration',
        company: 'Seplat Energy Plc',
        submittedDate: '2024-01-26',
        status: 'Rejected',
        progress: 75,
        assignedOfficer: 'Sarah Wilson',
        lastUpdated: '2024-01-27',
        priority: 'Medium'
      }
    ];
    setApplications(mockApplications);
  }, []);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesType = typeFilter === 'all' || app.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending Payment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const statusCounts = {
    total: applications.length,
    submitted: applications.filter(app => app.status === 'Submitted').length,
    underReview: applications.filter(app => app.status === 'Under Review').length,
    approved: applications.filter(app => app.status === 'Approved').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
    pendingPayment: applications.filter(app => app.status === 'Pending Payment').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <EnhancedDashboardLayout
        title="Applications Dashboard"
      sidebarItems={getCommissionAdminMenuItems(pathname)}
      userRole={user?.role || 'commission_admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
      userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}

    >
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">📊</span>
              Applications Tracker
            </h1>
            <p className="text-gray-600 mt-2">Monitor and track all application submissions and their progress</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => router.push('/dashboard/commission-admin/applications/search')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Advanced Search
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.total}</div>
            <div className="text-xs text-gray-600">Total Applications</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.submitted}</div>
            <div className="text-xs text-gray-600">Submitted</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{statusCounts.underReview}</div>
            <div className="text-xs text-gray-600">Under Review</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
            <div className="text-xs text-gray-600">Approved</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
            <div className="text-xs text-gray-600">Rejected</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{statusCounts.pendingPayment}</div>
            <div className="text-xs text-gray-600">Pending Payment</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Applications</label>
            <input
              type="text"
              placeholder="Search by company, ID, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Type Filter</label>
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="Company Registration">Company Registration</option>
              <option value="Regular Permit">Regular Permit</option>
              <option value="Rotator Permit">Rotator Permit</option>
              <option value="JV Application">JV Application</option>
              <option value="Renewal Application">Renewal Application</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Applications ({filteredApplications.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Officer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {application.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(application.progress)}`}
                          style={{ width: `${application.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{application.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                      {application.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assignedOfficer || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(application.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-green-600 hover:text-green-900">Edit</button>
                      <button className="text-purple-600 hover:text-purple-900">Track</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Search Applications</h3>
          <p className="text-sm opacity-90 mb-4">Advanced search and filtering options</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/applications/search')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Advanced Search
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Status Overview</h3>
          <p className="text-sm opacity-90 mb-4">View application status distribution</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/applications/status')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Status
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Document Review</h3>
          <p className="text-sm opacity-90 mb-4">Review application documents</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/applications/documents')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Review Documents
          </button>
        </div>
      </div>
      </div>
    </EnhancedDashboardLayout>
  );
}