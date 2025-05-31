'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../src/app/components/layouts/DashboardLayout';
import { getMenuItemsByRole } from '../../../src/app/components/layouts/DashboardMenus';
import { HomeIcon } from '../../../src/app/components/icons/DashboardIcons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

export default function PersonnelDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login?redirect=/dashboard/personnel');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role !== 'PERSONNEL') {
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'ADMIN': return '/dashboard/admin';
            case 'COMPANY_ADMIN': return '/dashboard/company-admin';
            case 'COMPLIANCE_OFFICER': return '/dashboard/reviewer';
            case 'IMMIGRATION_OFFICER': return '/dashboard/immigration';
            case 'FINANCE_OFFICER': return '/dashboard/finance';
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
  const staffStatusData = [
    { name: 'Active', value: 156, color: '#10B981' },
    { name: 'On Leave', value: 23, color: '#F59E0B' },
    { name: 'Training', value: 12, color: '#3B82F6' },
    { name: 'Inactive', value: 8, color: '#6B7280' }
  ];

  const departmentData = [
    { department: 'Engineering', staff: 45, local: 38, expat: 7 },
    { department: 'Operations', staff: 32, local: 28, expat: 4 },
    { department: 'Finance', staff: 18, local: 16, expat: 2 },
    { department: 'HR', staff: 12, local: 11, expat: 1 },
    { department: 'Legal', staff: 8, local: 6, expat: 2 },
    { department: 'IT', staff: 15, local: 12, expat: 3 }
  ];

  const trainingProgressData = [
    { month: 'Jan', completed: 25, inProgress: 15, planned: 10 },
    { month: 'Feb', completed: 32, inProgress: 18, planned: 12 },
    { month: 'Mar', completed: 28, inProgress: 22, planned: 8 },
    { month: 'Apr', completed: 35, inProgress: 20, planned: 15 },
    { month: 'May', completed: 42, inProgress: 25, planned: 18 },
    { month: 'Jun', completed: 38, inProgress: 28, planned: 20 }
  ];

  // Mock data for tables
  const pendingApplications = [
    { id: 'PER-2024-001', applicant: 'Michael Johnson', position: 'Senior Engineer', department: 'Engineering', submittedDate: '2024-01-20', status: 'Under Review', priority: 'High' },
    { id: 'PER-2024-002', applicant: 'Sarah Williams', position: 'Operations Manager', department: 'Operations', submittedDate: '2024-01-18', status: 'Interview Scheduled', priority: 'Medium' },
    { id: 'PER-2024-003', applicant: 'David Chen', position: 'Financial Analyst', department: 'Finance', submittedDate: '2024-01-22', status: 'Background Check', priority: 'Low' },
    { id: 'PER-2024-004', applicant: 'Emma Davis', position: 'HR Specialist', department: 'HR', submittedDate: '2024-01-19', status: 'Final Review', priority: 'High' },
    { id: 'PER-2024-005', applicant: 'James Wilson', position: 'IT Support', department: 'IT', submittedDate: '2024-01-21', status: 'Technical Assessment', priority: 'Medium' }
  ];

  const upcomingTraining = [
    { id: 'TRN-2024-001', title: 'Safety Protocols Update', department: 'Operations', startDate: '2024-02-01', duration: '2 days', participants: 25, trainer: 'John Smith' },
    { id: 'TRN-2024-002', title: 'Leadership Development', department: 'Management', startDate: '2024-02-05', duration: '3 days', participants: 15, trainer: 'Maria Garcia' },
    { id: 'TRN-2024-003', title: 'Technical Skills Enhancement', department: 'Engineering', startDate: '2024-02-10', duration: '5 days', participants: 30, trainer: 'Ahmed Hassan' },
    { id: 'TRN-2024-004', title: 'Compliance Training', department: 'All Departments', startDate: '2024-02-15', duration: '1 day', participants: 120, trainer: 'Sarah Johnson' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/personnel', icon: HomeIcon, current: true },
    { name: 'Staff Management', href: '/dashboard/personnel/staff', icon: HomeIcon, current: false },
    { name: 'Recruitment', href: '/dashboard/personnel/recruitment', icon: HomeIcon, current: false },
    { name: 'Training & Development', href: '/dashboard/personnel/training', icon: HomeIcon, current: false },
    { name: 'Performance', href: '/dashboard/personnel/performance', icon: HomeIcon, current: false },
    { name: 'Payroll', href: '/dashboard/personnel/payroll', icon: HomeIcon, current: false },
    { name: 'Local Content', href: '/dashboard/personnel/local-content', icon: HomeIcon, current: false },
    { name: 'Reports', href: '/dashboard/personnel/reports', icon: HomeIcon, current: false },
    { name: 'Settings', href: '/dashboard/personnel/settings', icon: HomeIcon, current: false }
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
      title="Personnel Dashboard"
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
                    <span className="text-white text-sm font-medium">👥</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Staff</dt>
                    <dd className="text-lg font-medium text-gray-900">199</dd>
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
                    <span className="text-white text-sm font-medium">🏠</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Local Content</dt>
                    <dd className="text-lg font-medium text-gray-900">78.4%</dd>
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
                    <span className="text-white text-sm font-medium">📚</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Training Programs</dt>
                    <dd className="text-lg font-medium text-gray-900">12</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-sm font-medium">🎯</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Open Positions</dt>
                    <dd className="text-lg font-medium text-gray-900">8</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Staff Status Pie Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Staff Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={staffStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {staffStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Department Staff Bar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Staff by Department</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="local" fill="#10B981" name="Local Staff" />
                    <Bar dataKey="expat" fill="#3B82F6" name="Expatriate Staff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Training Progress Area Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Training Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trainingProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="completed" stackId="1" stroke="#10B981" fill="#10B981" />
                    <Area type="monotone" dataKey="inProgress" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
                    <Area type="monotone" dataKey="planned" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                  </AreaChart>
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
                Review All
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
                          <div className="text-sm text-gray-500">{application.position}</div>
                          <div className="text-xs text-gray-400">{application.department}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{application.status}</div>
                        <div className="text-xs text-gray-500">Applied: {application.submittedDate}</div>
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
                        Interview
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Training Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Training</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Schedule New
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {upcomingTraining.map((training) => (
                <li key={training.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-700">📚</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{training.title}</div>
                          <div className="text-sm text-gray-500">{training.department}</div>
                          <div className="text-xs text-gray-400">Trainer: {training.trainer}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{training.participants} participants</div>
                        <div className="text-xs text-gray-500">Start: {training.startDate}</div>
                        <div className="text-xs text-gray-500">Duration: {training.duration}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium">
                        View Details
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Manage
                      </button>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Send Invites
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
                <span>👥</span>
                <span>Add New Staff</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>📚</span>
                <span>Schedule Training</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <HomeIcon className="h-5 w-5" />
                <span>Generate Report</span>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>💰</span>
                <span>Process Payroll</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}