'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import { 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatusMetrics {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  requiresAction: number;
}

interface ApplicationStatus {
  id: string;
  companyName: string;
  applicationType: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Requires Action';
  submissionDate: string;
  lastUpdated: string;
  daysInStatus: number;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface StatusTrend {
  month: string;
  approved: number;
  rejected: number;
  pending: number;
}

export default function ApplicationStatusPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarItems = getCommissionAdminMenuItems(pathname);

  const [statusMetrics, setStatusMetrics] = useState<StatusMetrics>({
    total: 0,
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
    requiresAction: 0
  });
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [statusTrends, setStatusTrends] = useState<StatusTrend[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data
    const mockApplications: ApplicationStatus[] = [
      {
        id: 'APP-2024-001',
        companyName: 'TechDrill Solutions Ltd',
        applicationType: 'Drilling Permit',
        status: 'Under Review',
        submissionDate: '2024-01-15',
        lastUpdated: '2024-01-20',
        daysInStatus: 5,
        assignedTo: 'John Reviewer',
        priority: 'High'
      },
      {
        id: 'APP-2024-002',
        companyName: 'Global Energy Corp',
        applicationType: 'Environmental Impact',
        status: 'Pending',
        submissionDate: '2024-01-18',
        lastUpdated: '2024-01-18',
        daysInStatus: 7,
        assignedTo: 'Unassigned',
        priority: 'Medium'
      },
      {
        id: 'APP-2024-003',
        companyName: 'Offshore Dynamics',
        applicationType: 'Safety Certification',
        status: 'Approved',
        submissionDate: '2024-01-10',
        lastUpdated: '2024-01-22',
        daysInStatus: 12,
        assignedTo: 'Sarah Approver',
        priority: 'High'
      },
      {
        id: 'APP-2024-004',
        companyName: 'Marine Services Ltd',
        applicationType: 'Vessel Registration',
        status: 'Requires Action',
        submissionDate: '2024-01-12',
        lastUpdated: '2024-01-19',
        daysInStatus: 13,
        assignedTo: 'Mike Processor',
        priority: 'Medium'
      },
      {
        id: 'APP-2024-005',
        companyName: 'Petroleum Logistics',
        applicationType: 'Transport License',
        status: 'Rejected',
        submissionDate: '2024-01-08',
        lastUpdated: '2024-01-21',
        daysInStatus: 13,
        assignedTo: 'Lisa Reviewer',
        priority: 'Low'
      }
    ];

    const mockTrends: StatusTrend[] = [
      { month: 'Oct', approved: 45, rejected: 8, pending: 12 },
      { month: 'Nov', approved: 52, rejected: 6, pending: 15 },
      { month: 'Dec', approved: 38, rejected: 10, pending: 18 },
      { month: 'Jan', approved: 41, rejected: 7, pending: 22 }
    ];

    setApplications(mockApplications);
    setStatusTrends(mockTrends);

    // Calculate metrics
    const metrics = {
      total: mockApplications.length,
      pending: mockApplications.filter(app => app.status === 'Pending').length,
      underReview: mockApplications.filter(app => app.status === 'Under Review').length,
      approved: mockApplications.filter(app => app.status === 'Approved').length,
      rejected: mockApplications.filter(app => app.status === 'Rejected').length,
      requiresAction: mockApplications.filter(app => app.status === 'Requires Action').length
    };
    setStatusMetrics(metrics);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Requires Action': return 'bg-orange-100 text-orange-800';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'Rejected': return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case 'Under Review': return <EyeIcon className="h-5 w-5 text-blue-600" />;
      case 'Pending': return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'Requires Action': return <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status.toLowerCase().replace(' ', '_') === selectedStatus);

  const pieData = [
    { name: 'Approved', value: statusMetrics.approved, color: '#10B981' },
    { name: 'Under Review', value: statusMetrics.underReview, color: '#3B82F6' },
    { name: 'Pending', value: statusMetrics.pending, color: '#F59E0B' },
    { name: 'Requires Action', value: statusMetrics.requiresAction, color: '#F97316' },
    { name: 'Rejected', value: statusMetrics.rejected, color: '#EF4444' }
  ];

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading status dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Application Status Tracking"
      userRole="Commission Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Application Status Tracking</h1>
            <p className="text-gray-600 mt-1">Monitor and track the status of all applications</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{statusMetrics.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{statusMetrics.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <EyeIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-gray-900">{statusMetrics.underReview}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{statusMetrics.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Requires Action</p>
                <p className="text-2xl font-bold text-gray-900">{statusMetrics.requiresAction}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">{statusMetrics.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Trends */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status Trends (Last 4 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#10B981" name="Approved" />
                <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
                <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
              <div className="flex items-center gap-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="requires_action">Requires Action</option>
                </select>
              </div>
            </div>
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(app.status)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{app.id}</div>
                          <div className="text-sm text-gray-500">{app.applicationType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(app.priority)}`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.daysInStatus} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/dashboard/commission-admin/applications/${app.id}`)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </button>
                      <button
                        onClick={() => router.push(`/dashboard/commission-admin/applications/${app.id}/edit`)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}