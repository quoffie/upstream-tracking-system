'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EnhancedDashboardLayout from '../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getLocalContentMenuItems } from '../../../src/app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '../../../src/app/components/icons/DashboardIcons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

export default function LocalContentDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login?redirect=/dashboard/local-content');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role !== 'LOCAL_CONTENT_OFFICER') {
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'ADMIN': return '/dashboard/admin';
            case 'COMPANY_ADMIN': return '/dashboard/company-admin';
            case 'COMPLIANCE_OFFICER': return '/dashboard/reviewer';
            case 'IMMIGRATION_OFFICER': return '/dashboard/immigration';
            case 'FINANCE_OFFICER': return '/dashboard/finance';
            case 'PERSONNEL': return '/dashboard/personnel';
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
  const localContentData = [
    { name: 'Compliant', value: 78, color: '#10B981' },
    { name: 'Non-Compliant', value: 15, color: '#EF4444' },
    { name: 'Under Review', value: 7, color: '#F59E0B' }
  ];

  const companyComplianceData = [
    { company: 'TotalEnergies', target: 80, achieved: 85, gap: 5 },
    { company: 'Shell Ghana', target: 75, achieved: 72, gap: -3 },
    { company: 'Eni Ghana', target: 70, achieved: 68, gap: -2 },
    { company: 'Tullow Oil', target: 65, achieved: 70, gap: 5 },
    { company: 'Kosmos Energy', target: 60, achieved: 58, gap: -2 }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', compliance: 75, target: 70, violations: 8 },
    { month: 'Feb', compliance: 78, target: 70, violations: 6 },
    { month: 'Mar', compliance: 76, target: 70, violations: 7 },
    { month: 'Apr', compliance: 82, target: 75, violations: 4 },
    { month: 'May', compliance: 85, target: 75, violations: 3 },
    { month: 'Jun', compliance: 83, target: 75, violations: 5 }
  ];

  // Mock data for tables
  const pendingReviews = [
    { id: 'LC-2024-001', company: 'TotalEnergies EP Ghana', reportType: 'Quarterly Report', submittedDate: '2024-01-20', dueDate: '2024-02-05', status: 'Under Review', priority: 'High' },
    { id: 'LC-2024-002', company: 'Shell Ghana Upstream', reportType: 'Annual Compliance', submittedDate: '2024-01-18', dueDate: '2024-02-10', status: 'Initial Review', priority: 'Medium' },
    { id: 'LC-2024-003', company: 'Eni Ghana Exploration', reportType: 'Training Report', submittedDate: '2024-01-22', dueDate: '2024-02-08', status: 'Documentation Review', priority: 'Low' },
    { id: 'LC-2024-004', company: 'Tullow Ghana Limited', reportType: 'Employment Report', submittedDate: '2024-01-19', dueDate: '2024-02-03', status: 'Final Review', priority: 'High' },
    { id: 'LC-2024-005', company: 'Kosmos Energy Ghana', reportType: 'Procurement Report', submittedDate: '2024-01-21', dueDate: '2024-02-07', status: 'Data Verification', priority: 'Medium' }
  ];

  const complianceViolations = [
    { id: 'VIO-2024-001', company: 'Shell Ghana Upstream', violation: 'Local Employment Target', severity: 'High', reportedDate: '2024-01-15', status: 'Open', fine: 'GH₵50,000' },
    { id: 'VIO-2024-002', company: 'Eni Ghana Exploration', violation: 'Training Requirements', severity: 'Medium', reportedDate: '2024-01-12', status: 'Under Investigation', fine: 'GH₵25,000' },
    { id: 'VIO-2024-003', company: 'Kosmos Energy Ghana', violation: 'Procurement Compliance', severity: 'Low', reportedDate: '2024-01-18', status: 'Resolved', fine: 'GH₵10,000' },
    { id: 'VIO-2024-004', company: 'Tullow Ghana Limited', violation: 'Reporting Delay', severity: 'Medium', reportedDate: '2024-01-20', status: 'Open', fine: 'GH₵15,000' }
  ];

  const breadcrumbItems = [
    { name: 'Dashboard', href: '/dashboard/local-content', icon: HomeIcon, current: true },
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
    <EnhancedDashboardLayout
        title="Local Content Dashboard"
      userRole={user?.role}
      userName={`${user?.firstName} ${user?.lastName}`}
      userInitials={`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`}
      sidebarItems={getLocalContentMenuItems(pathname)}
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <HomeIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Overall Compliance</dt>
                    <dd className="text-lg font-medium text-gray-900">78%</dd>
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
                    <span className="text-white text-sm font-medium">🏢</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Companies</dt>
                    <dd className="text-lg font-medium text-gray-900">15</dd>
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
                    <span className="text-white text-sm font-medium">📋</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Reviews</dt>
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
                  <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">⚠️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Open Violations</dt>
                    <dd className="text-lg font-medium text-gray-900">7</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Local Content Compliance Pie Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Compliance Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={localContentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {localContentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Company Compliance Bar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Company Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={companyComplianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="company" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="target" fill="#94A3B8" name="Target %" />
                    <Bar dataKey="achieved" fill="#10B981" name="Achieved %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Trends Line Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="compliance" stroke="#10B981" strokeWidth={2} name="Compliance %" />
                    <Line type="monotone" dataKey="target" stroke="#3B82F6" strokeWidth={2} name="Target %" />
                    <Line type="monotone" dataKey="violations" stroke="#EF4444" strokeWidth={2} name="Violations" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Reviews Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Reviews</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Review All
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {pendingReviews.map((review) => (
                <li key={review.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">📋</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{review.company}</div>
                          <div className="text-sm text-gray-500">{review.reportType}</div>
                          <div className="text-xs text-gray-400">ID: {review.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{review.status}</div>
                        <div className="text-xs text-gray-500">Due: {review.dueDate}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          review.priority === 'High' ? 'bg-red-100 text-red-800' :
                          review.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {review.priority}
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
                        Request Info
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance Violations Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Compliance Violations</h3>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Report Violation
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {complianceViolations.map((violation) => (
                <li key={violation.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            violation.severity === 'High' ? 'bg-red-100' :
                            violation.severity === 'Medium' ? 'bg-yellow-100' :
                            'bg-green-100'
                          }`}>
                            <span className={`text-sm font-medium ${
                              violation.severity === 'High' ? 'text-red-700' :
                              violation.severity === 'Medium' ? 'text-yellow-700' :
                              'text-green-700'
                            }`}>⚠️</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{violation.company}</div>
                          <div className="text-sm text-gray-500">{violation.violation}</div>
                          <div className="text-xs text-gray-400">Reported: {violation.reportedDate}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{violation.status}</div>
                        <div className="text-xs text-gray-500">Fine: {violation.fine}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          violation.severity === 'High' ? 'bg-red-100 text-red-800' :
                          violation.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {violation.severity}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Investigate
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Resolve
                      </button>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Issue Fine
                      </button>
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
                <HomeIcon className="h-5 w-5" />
                <span>Generate Report</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>✅</span>
                <span>Audit Company</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>📋</span>
                <span>Review Compliance</span>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>⚠️</span>
                <span>Issue Warning</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}