'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../src/app/components/layouts/DashboardLayout';
import { getMenuItemsByRole } from '../../../src/app/components/layouts/DashboardMenus';
import { HomeIcon } from '../../../src/app/components/icons/DashboardIcons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';



export default function ImmigrationDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login?redirect=/dashboard/immigration');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role !== 'IMMIGRATION_OFFICER') {
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'ADMIN': return '/dashboard/admin';
            case 'COMPANY_ADMIN': return '/dashboard/company-admin';
            case 'COMPLIANCE_OFFICER': return '/dashboard/reviewer';
            case 'FINANCE_OFFICER': return '/dashboard/finance';
            case 'PERSONNEL': return '/dashboard/personnel';
            case 'LOCAL_CONTENT_OFFICER': return '/dashboard/local-content';
            case 'JV_COORDINATOR': return '/dashboard/jv-coordinator';
            default: return '/dashboard';
          }
        };
        router.push(getDashboardRoute(parsedUser.role));
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }
  }, [router]);

  // Mock data for charts
  const permitStatusData = [
    { name: 'Active', value: 342, color: '#10B981' },
    { name: 'Pending', value: 89, color: '#F59E0B' },
    { name: 'Expired', value: 45, color: '#EF4444' },
    { name: 'Suspended', value: 12, color: '#6B7280' }
  ];

  const visaTypeData = [
    { type: 'Work Permit', count: 156, approved: 142, pending: 14 },
    { type: 'Residence Permit', count: 98, approved: 89, pending: 9 },
    { type: 'Business Visa', count: 67, approved: 58, pending: 9 },
    { type: 'Dependent Visa', count: 45, approved: 41, pending: 4 },
    { type: 'Student Visa', count: 23, approved: 20, pending: 3 }
  ];

  const monthlyApplicationsData = [
    { month: 'Jan', applications: 45, approvals: 38, rejections: 5 },
    { month: 'Feb', applications: 52, approvals: 44, rejections: 6 },
    { month: 'Mar', applications: 48, approvals: 41, rejections: 4 },
    { month: 'Apr', applications: 61, approvals: 53, rejections: 7 },
    { month: 'May', applications: 58, approvals: 49, rejections: 6 },
    { month: 'Jun', applications: 67, approvals: 58, rejections: 8 }
  ];

  // Mock data for tables
  const pendingApplications = [
    { id: 'IMM-2024-001', applicant: 'John Smith', company: 'TechCorp Ghana', type: 'Work Permit', submittedDate: '2024-01-20', priority: 'High', daysWaiting: 3 },
    { id: 'IMM-2024-002', applicant: 'Maria Garcia', company: 'OilField Services', type: 'Residence Permit', submittedDate: '2024-01-18', priority: 'Medium', daysWaiting: 5 },
    { id: 'IMM-2024-003', applicant: 'Ahmed Hassan', company: 'Mining Solutions', type: 'Business Visa', submittedDate: '2024-01-22', priority: 'Low', daysWaiting: 1 },
    { id: 'IMM-2024-004', applicant: 'Sarah Johnson', company: 'Energy Partners', type: 'Work Permit', submittedDate: '2024-01-19', priority: 'High', daysWaiting: 4 },
    { id: 'IMM-2024-005', applicant: 'Chen Wei', company: 'Upstream Ventures', type: 'Dependent Visa', submittedDate: '2024-01-21', priority: 'Medium', daysWaiting: 2 }
  ];

  const expiringPermits = [
    { id: 'PER-2023-156', holder: 'Robert Brown', company: 'Ghana Petroleum', type: 'Work Permit', expiryDate: '2024-02-15', daysToExpiry: 22, status: 'Active' },
    { id: 'PER-2023-189', holder: 'Lisa Wang', company: 'Offshore Drilling', type: 'Residence Permit', expiryDate: '2024-02-20', daysToExpiry: 27, status: 'Active' },
    { id: 'PER-2023-203', holder: 'David Miller', company: 'Exploration Inc', type: 'Work Permit', expiryDate: '2024-02-10', daysToExpiry: 17, status: 'Active' },
    { id: 'PER-2023-221', holder: 'Anna Kowalski', company: 'Refinery Operations', type: 'Business Visa', expiryDate: '2024-02-25', daysToExpiry: 32, status: 'Active' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/immigration', icon: HomeIcon, current: true },
    { name: 'Applications', href: '/dashboard/immigration/applications', icon: HomeIcon, current: false },
    { name: 'Permits & Visas', href: '/dashboard/immigration/permits', icon: HomeIcon, current: false },
    { name: 'Renewals', href: '/dashboard/immigration/renewals', icon: HomeIcon, current: false },
    { name: 'Compliance', href: '/dashboard/immigration/compliance', icon: HomeIcon, current: false },
    { name: 'Reports', href: '/dashboard/immigration/reports', icon: HomeIcon, current: false },
    { name: 'Document Verification', href: '/dashboard/immigration/verification', icon: HomeIcon, current: false },
    { name: 'Settings', href: '/dashboard/immigration/settings', icon: HomeIcon, current: false }
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Immigration Dashboard"
      userRole={user?.role}
      userName={`${user?.firstName} ${user?.lastName}`}
      userInitials={`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">✅</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Permits</dt>
                    <dd className="text-lg font-medium text-gray-900">342</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">⏳</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Applications</dt>
                    <dd className="text-lg font-medium text-gray-900">89</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">⚠️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
                    <dd className="text-lg font-medium text-gray-900">23</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <HomeIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approval Rate</dt>
                    <dd className="text-lg font-medium text-gray-900">87.3%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Permit Status Pie Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Permit Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={permitStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {permitStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Visa Types Bar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Visa Types Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visaTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" fill="#10B981" name="Approved" />
                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Applications Line Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Application Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyApplicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3B82F6" name="Applications" />
                    <Line type="monotone" dataKey="approvals" stroke="#10B981" name="Approvals" />
                    <Line type="monotone" dataKey="rejections" stroke="#EF4444" name="Rejections" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Applications Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Applications</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Process All
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {pendingApplications.map((application) => (
                <li key={application.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {application.applicant.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.applicant}</div>
                          <div className="text-sm text-gray-500">{application.company}</div>
                          <div className="text-xs text-gray-400">{application.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{application.daysWaiting} days</div>
                        <div className="text-xs text-gray-500">Submitted: {application.submittedDate}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.priority === 'High' ? 'bg-red-100 text-red-800' :
                          application.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {application.priority}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Reject
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Review
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Expiring Permits Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Expiring Permits</h3>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Send Notifications
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {expiringPermits.map((permit) => (
                <li key={permit.id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-700">
                            {permit.holder.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{permit.holder}</div>
                        <div className="text-sm text-gray-500">{permit.company}</div>
                        <div className="text-xs text-gray-400">{permit.type}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{permit.daysToExpiry} days</div>
                      <div className="text-xs text-gray-500">Expires: {permit.expiryDate}</div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        permit.daysToExpiry <= 15 ? 'bg-red-100 text-red-800' :
                        permit.daysToExpiry <= 30 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {permit.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>📝</span>
                <span>New Application</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>🔄</span>
                <span>Process Renewals</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <HomeIcon className="h-5 w-5" />
                <span>Generate Report</span>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>🔍</span>
                <span>Verify Documents</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}