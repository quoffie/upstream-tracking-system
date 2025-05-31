'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../src/app/components/layouts/DashboardLayout';
import { HomeIcon } from '../../../src/app/components/icons/DashboardIcons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

export default function FinanceDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login?redirect=/dashboard/finance');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role !== 'FINANCE_OFFICER') {
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'ADMIN': return '/dashboard/admin';
            case 'COMPANY_ADMIN': return '/dashboard/company-admin';
            case 'COMPLIANCE_OFFICER': return '/dashboard/reviewer';
            case 'IMMIGRATION_OFFICER': return '/dashboard/immigration';
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
  const paymentStatusData = [
    { name: 'Paid', value: 145, color: '#32CD32' },
    { name: 'Pending', value: 28, color: '#FFA500' },
    { name: 'Overdue', value: 12, color: '#DC143C' },
    { name: 'Processing', value: 8, color: '#4169E1' }
  ];

  const monthlyRevenueData = [
    { month: 'Jan', revenue: 125000, fees: 15000, permits: 110000 },
    { month: 'Feb', revenue: 142000, fees: 18000, permits: 124000 },
    { month: 'Mar', revenue: 158000, fees: 22000, permits: 136000 },
    { month: 'Apr', revenue: 175000, fees: 25000, permits: 150000 },
    { month: 'May', revenue: 168000, fees: 23000, permits: 145000 },
    { month: 'Jun', revenue: 192000, fees: 28000, permits: 164000 }
  ];

  const paymentTrendData = [
    { week: 'Week 1', amount: 45000 },
    { week: 'Week 2', amount: 52000 },
    { week: 'Week 3', amount: 48000 },
    { week: 'Week 4', amount: 58000 },
    { week: 'Week 5', amount: 62000 },
    { week: 'Week 6', amount: 55000 }
  ];

  // Mock data for tables
  const pendingPayments = [
    { id: 'PAY-2024-001', company: 'TechCorp Ghana', amount: 15000, type: 'Permit Fee', dueDate: '2024-01-25', daysOverdue: 0, status: 'Pending' },
    { id: 'PAY-2024-002', company: 'OilField Services', amount: 25000, type: 'Application Fee', dueDate: '2024-01-20', daysOverdue: 3, status: 'Overdue' },
    { id: 'PAY-2024-003', company: 'Mining Solutions Ltd', amount: 18000, type: 'Renewal Fee', dueDate: '2024-01-28', daysOverdue: 0, status: 'Pending' },
    { id: 'PAY-2024-004', company: 'Energy Partners', amount: 12000, type: 'Processing Fee', dueDate: '2024-01-22', daysOverdue: 1, status: 'Overdue' },
    { id: 'PAY-2024-005', company: 'Upstream Ventures', amount: 22000, type: 'Permit Fee', dueDate: '2024-01-30', daysOverdue: 0, status: 'Pending' }
  ];

  const recentTransactions = [
    { id: 'TXN-2024-101', company: 'Ghana Petroleum', amount: 35000, type: 'Permit Fee', paymentDate: '2024-01-20', method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-2024-102', company: 'Offshore Drilling', amount: 28000, type: 'Application Fee', paymentDate: '2024-01-19', method: 'Online Payment', status: 'Completed' },
    { id: 'TXN-2024-103', company: 'Exploration Inc', amount: 15000, type: 'Processing Fee', paymentDate: '2024-01-18', method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-2024-104', company: 'Refinery Operations', amount: 42000, type: 'Renewal Fee', paymentDate: '2024-01-17', method: 'Online Payment', status: 'Completed' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/finance', icon: HomeIcon, current: true },
    { name: 'Payments', href: '/dashboard/finance/payments', icon: HomeIcon, current: false },
    { name: 'Invoices', href: '/dashboard/finance/invoices', icon: HomeIcon, current: false },
    { name: 'Reports', href: '/dashboard/finance/reports', icon: HomeIcon, current: false },
    { name: 'Revenue Tracking', href: '/dashboard/finance/revenue', icon: HomeIcon, current: false },
    { name: 'Fee Management', href: '/dashboard/finance/fees', icon: HomeIcon, current: false },
    { name: 'Reconciliation', href: '/dashboard/finance/reconciliation', icon: HomeIcon, current: false },
    { name: 'Settings', href: '/dashboard/finance/settings', icon: HomeIcon, current: false }
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
      title="Finance Dashboard"
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
                    <span className="text-white text-sm font-medium">💰</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd className="text-lg font-medium text-gray-900">₵1,920,000</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                    <dd className="text-lg font-medium text-gray-900">₵92,000</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Overdue Payments</dt>
                    <dd className="text-lg font-medium text-gray-900">₵37,000</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Collection Rate</dt>
                    <dd className="text-lg font-medium text-gray-900">94.2%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Status Pie Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Payment Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₵${value.toLocaleString()}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Monthly Revenue Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₵${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [`₵${value.toLocaleString()}`, 'Amount']} />
                    <Legend />
                    <Bar dataKey="fees" fill="#3B82F6" name="Processing Fees" />
                    <Bar dataKey="permits" fill="#10B981" name="Permit Fees" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Payment Trend Area Chart */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Weekly Payment Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paymentTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(value) => `₵${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [`₵${value.toLocaleString()}`, 'Amount']} />
                    <Area type="monotone" dataKey="amount" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Payments Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Payments</h3>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Send Reminders
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {pendingPayments.map((payment) => (
                <li key={payment.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {payment.company.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{payment.company}</div>
                          <div className="text-sm text-gray-500">{payment.type}</div>
                          <div className="text-xs text-gray-400">{payment.id}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">₵{payment.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Due: {payment.dueDate}</div>
                        {payment.daysOverdue > 0 && (
                          <div className="text-xs text-red-600">{payment.daysOverdue} days overdue</div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Mark Paid
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium">
                        Send Reminder
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Export Report
              </button>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <li key={transaction.id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-green-700">
                            {transaction.company.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{transaction.company}</div>
                        <div className="text-sm text-gray-500">{transaction.type}</div>
                        <div className="text-xs text-gray-400">{transaction.method}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">₵{transaction.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{transaction.paymentDate}</div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
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
                <span>📄</span>
                <span>Generate Invoice</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>💳</span>
                <span>Process Payment</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <HomeIcon className="h-5 w-5" />
                <span>Financial Report</span>
              </button>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-md text-sm font-medium flex items-center justify-center space-x-2">
                <span>⚖️</span>
                <span>Reconcile Accounts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}