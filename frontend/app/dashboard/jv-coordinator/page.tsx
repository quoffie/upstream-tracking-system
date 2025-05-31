'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../src/app/components/layouts/DashboardLayout';
import { getMenuItemsByRole } from '../../../src/app/components/layouts/DashboardMenus';
import { HomeIcon } from '../../../src/app/components/icons/DashboardIcons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

export default function JVCoordinatorDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login?redirect=/dashboard/jv-coordinator');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role !== 'JV_COORDINATOR') {
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'ADMIN': return '/dashboard/admin';
            case 'COMPANY_ADMIN': return '/dashboard/company-admin';
            case 'COMPLIANCE_OFFICER': return '/dashboard/reviewer';
            case 'IMMIGRATION_OFFICER': return '/dashboard/immigration';
            case 'FINANCE_OFFICER': return '/dashboard/finance';
            case 'PERSONNEL': return '/dashboard/personnel';
            case 'LOCAL_CONTENT_OFFICER': return '/dashboard/local-content';
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
  const jvStatusData = [
    { name: 'Active', value: 12, color: '#10B981' },
    { name: 'Under Negotiation', value: 5, color: '#F59E0B' },
    { name: 'Pending Approval', value: 3, color: '#3B82F6' },
    { name: 'Suspended', value: 2, color: '#EF4444' }
  ];

  const partnershipData = [
    { partner: 'TotalEnergies', projects: 8, investment: 2500, localContent: 85 },
    { partner: 'Shell Ghana', projects: 6, investment: 1800, localContent: 72 },
    { partner: 'Eni Ghana', projects: 4, investment: 1200, localContent: 68 },
    { partner: 'Tullow Oil', projects: 5, investment: 950, localContent: 70 },
    { partner: 'Kosmos Energy', projects: 3, investment: 800, localContent: 58 }
  ];

  const monthlyPerformanceData = [
    { month: 'Jan', revenue: 450, costs: 320, profit: 130, efficiency: 85 },
    { month: 'Feb', revenue: 520, costs: 350, profit: 170, efficiency: 88 },
    { month: 'Mar', revenue: 480, costs: 340, profit: 140, efficiency: 82 },
    { month: 'Apr', revenue: 610, costs: 380, profit: 230, efficiency: 92 },
    { month: 'May', revenue: 680, costs: 420, profit: 260, efficiency: 95 },
    { month: 'Jun', revenue: 650, costs: 400, profit: 250, efficiency: 90 }
  ];

  // Mock data for tables
  const activeProjects = [
    { id: 'JV-2024-001', name: 'Deepwater Exploration Phase 2', partners: 'TotalEnergies, GNPC', status: 'In Progress', startDate: '2024-01-15', budget: '$2.5M', completion: 65 },
    { id: 'JV-2024-002', name: 'Offshore Development Project', partners: 'Shell Ghana, Tullow Oil', status: 'Planning', startDate: '2024-02-01', budget: '$1.8M', completion: 25 },
    { id: 'JV-2024-003', name: 'Seismic Survey Initiative', partners: 'Eni Ghana, Kosmos Energy', status: 'Active', startDate: '2024-01-20', budget: '$1.2M', completion: 80 },
    { id: 'JV-2024-004', name: 'Environmental Impact Study', partners: 'Multiple Partners', status: 'Review', startDate: '2024-01-10', budget: '$950K', completion: 45 },
    { id: 'JV-2024-005', name: 'Local Content Training Program', partners: 'TotalEnergies, GNPC', status: 'Active', startDate: '2024-01-25', budget: '$800K', completion: 55 }
  ];

  const pendingAgreements = [
    { id: 'AGR-2024-001', title: 'Joint Operating Agreement - Block 4', parties: 'Shell Ghana, GNPC', type: 'JOA', submittedDate: '2024-01-18', status: 'Legal Review', priority: 'High' },
    { id: 'AGR-2024-002', title: 'Production Sharing Contract Amendment', parties: 'TotalEnergies, Government', type: 'PSC', submittedDate: '2024-01-20', status: 'Technical Review', priority: 'Medium' },
    { id: 'AGR-2024-003', title: 'Service Agreement - Drilling Operations', parties: 'Eni Ghana, Local Contractor', type: 'Service', submittedDate: '2024-01-22', status: 'Commercial Review', priority: 'Low' },
    { id: 'AGR-2024-004', title: 'Memorandum of Understanding - Training', parties: 'Kosmos Energy, University', type: 'MOU', submittedDate: '2024-01-19', status: 'Final Approval', priority: 'High' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/jv-coordinator', icon: HomeIcon, current: true },
    { name: 'Joint Ventures', href: '/dashboard/jv-coordinator/ventures', icon: HomeIcon, current: false },
    { name: 'Partnerships', href: '/dashboard/jv-coordinator/partnerships', icon: HomeIcon, current: false },
    { name: 'Agreements', href: '/dashboard/jv-coordinator/agreements', icon: HomeIcon, current: false },
    { name: 'Projects', href: '/dashboard/jv-coordinator/projects', icon: HomeIcon, current: false },
    { name: 'Performance', href: '/dashboard/jv-coordinator/performance', icon: HomeIcon, current: false },
    { name: 'Compliance', href: '/dashboard/jv-coordinator/compliance', icon: HomeIcon, current: false },
    { name: 'Reports', href: '/dashboard/jv-coordinator/reports', icon: HomeIcon, current: false },
    { name: 'Settings', href: '/dashboard/jv-coordinator/settings', icon: HomeIcon, current: false }
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
      title="JV Coordinator Dashboard"
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
                    <span className="text-white text-sm font-medium">🤝</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active JVs</dt>
                    <dd className="text-lg font-medium text-gray-900">22</dd>
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
                    <span className="text-white text-sm font-medium">🏗️</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                    <dd className="text-lg font-medium text-gray-900">18</dd>
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
                    <span className="text-white text-sm font-medium">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Investment</dt>
                    <dd className="text-lg font-medium text-gray-900">$8.25M</dd>
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
                    <span className="text-white text-sm font-medium">📄</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Agreements</dt>
                    <dd className="text-lg font-medium text-gray-900">7</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* JV Status Pie Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">JV Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jvStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {jvStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Partnership Investment Bar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Partnership Investments</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={partnershipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="partner" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="investment" fill="#10B981" name="Investment ($M)" />
                    <Bar dataKey="projects" fill="#3B82F6" name="Projects" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Performance Area Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" />
                    <Area type="monotone" dataKey="costs" stackId="1" stroke="#EF4444" fill="#EF4444" />
                    <Area type="monotone" dataKey="profit" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Projects Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Active Projects</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                View All
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {activeProjects.map((project) => (
                <li key={project.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">🏗️</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-sm text-gray-500">{project.partners}</div>
                          <div className="text-xs text-gray-400">Budget: {project.budget}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{project.status}</div>
                        <div className="text-xs text-gray-500">Started: {project.startDate}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.completion}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{project.completion}% Complete</div>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium">
                        View Details
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Update Status
                      </button>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pending Agreements Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Agreements</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                New Agreement
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {pendingAgreements.map((agreement) => (
                <li key={agreement.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-700">📄</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{agreement.title}</div>
                          <div className="text-sm text-gray-500">{agreement.parties}</div>
                          <div className="text-xs text-gray-400">Type: {agreement.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{agreement.status}</div>
                        <div className="text-xs text-gray-500">Submitted: {agreement.submittedDate}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agreement.priority === 'High' ? 'bg-red-100 text-red-800' :
                          agreement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {agreement.priority}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Review
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Edit
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Send Reminder
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
                <span>🤝</span>
                <span>Create JV</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>📄</span>
                <span>Draft Agreement</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <HomeIcon className="h-5 w-5" />
                <span>Performance Report</span>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>👥</span>
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}