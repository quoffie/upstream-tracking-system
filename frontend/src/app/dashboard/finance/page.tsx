'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getFinanceMenuItems } from '../../components/layouts/DashboardMenus';
import {
  HomeIcon,
  PaymentIcon,
  AnalyticsIcon,
  DocumentIcon,
  HistoryIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon,
  CalculatorIcon
} from '../../components/icons/DashboardIcons';

// Mock data for charts
const paymentStatusData = [
  { name: 'Paid', value: 65 },
  { name: 'Pending', value: 25 },
  { name: 'Overdue', value: 10 },
];

const revenueByTypeData = [
  { name: 'Application Fees', value: 35 },
  { name: 'Permit Fees', value: 45 },
  { name: 'Renewal Fees', value: 15 },
  { name: 'Other Fees', value: 5 },
];

const monthlyRevenueData = [
  { name: 'Jan', revenue: 42000 },
  { name: 'Feb', revenue: 38000 },
  { name: 'Mar', revenue: 45000 },
  { name: 'Apr', revenue: 50000 },
  { name: 'May', revenue: 48000 },
  { name: 'Jun', revenue: 52000 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

export default function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      // Redirect to login if not authenticated
      router.push('/auth/login?redirect=/dashboard/finance');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user has finance role
      if (parsedUser.role !== 'FINANCE_OFFICER') {
        // Redirect to appropriate dashboard based on role
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'COMPANY_ADMIN':
              return '/dashboard/company-admin';
            case 'COMMISSION_ADMIN':
              return '/dashboard/admin';
            case 'COMPLIANCE_OFFICER':
              return '/dashboard/reviewer';
            case 'IMMIGRATION_OFFICER':
              return '/dashboard/immigration';
            case 'PERSONNEL':
              return '/dashboard/personnel';
            case 'LOCAL_CONTENT_OFFICER':
              return '/dashboard/local-content';
            case 'JV_COORDINATOR':
              return '/dashboard/jv-coordinator';
            default:
              return '/dashboard';
          }
        };
        router.push(getDashboardRoute(parsedUser.role));
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login?redirect=/dashboard/finance');
    }
  }, [router]);

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const pathname = usePathname();
  const sidebarItems = getFinanceMenuItems(pathname);
  
  console.log('Finance sidebarItems:', sidebarItems);
  console.log('Finance pathname:', pathname);
  
  // Action buttons for quick access
  const quickActions = [
    { name: 'Verify Payment', href: '/dashboard/finance/verification', color: 'blue' },
    { name: 'Generate Invoice', href: '/dashboard/finance/invoices/generate', color: 'green' },
    { name: 'Update Fee Structure', href: '/dashboard/finance/fees', color: 'purple' },
    { name: 'Send Payment Reminder', href: '/dashboard/finance/payments/reminders', color: 'amber' },
  ];

  return (
    <DashboardLayout
      title="Finance Officer Dashboard"
      userRole={user?.role || 'Finance Officer'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Michael Addo'}
      userInitials={user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'MA'}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">₵275,000</p>
            <p className="text-sm text-gray-500 mt-1">This year</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Payments</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">18</p>
            <p className="text-sm text-gray-500 mt-1">₵45,000 total</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Payments Today</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">7</p>
            <p className="text-sm text-gray-500 mt-1">₵12,500 total</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Overdue Payments</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">5</p>
            <p className="text-sm text-gray-500 mt-1">₵18,000 total</p>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`flex items-center justify-center p-4 rounded-lg bg-${action.color}-100 text-${action.color}-800 hover:bg-${action.color}-200 transition duration-150 ease-in-out`}
              >
                <span className="text-sm font-medium">{action.name}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Revenue by Type Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Type</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₵${value}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenue (₵)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRX-2023-0542</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tullow Ghana Ltd</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Permit Fee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₵5,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 25, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-purple-600 hover:text-purple-900">Receipt</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRX-2023-0541</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Eni Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Application Fee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₵2,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 25, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-purple-600 hover:text-purple-900">Receipt</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRX-2023-0540</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Kosmos Energy</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Renewal Fee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₵3,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 24, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Verify</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRX-2023-0539</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Baker Hughes Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Permit Fee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₵5,000</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Overdue
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900">Reminder</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TRX-2023-0538</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Schlumberger Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Application Fee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₵2,500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 23, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-purple-600 hover:text-purple-900">Receipt</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pending Payments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Payment Verifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Kosmos Energy - Renewal Fee Payment</h4>
                <p className="text-xs text-gray-500 mt-1">Amount: ₵3,500 | Reference: TRX-2023-0540</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Verify
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">TechnipFMC Ghana - Application Fee Payment</h4>
                <p className="text-xs text-gray-500 mt-1">Amount: ₵2,500 | Reference: TRX-2023-0537</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Verify
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Halliburton Ghana - Permit Fee Payment</h4>
                <p className="text-xs text-gray-500 mt-1">Amount: ₵5,000 | Reference: TRX-2023-0536</p>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Verify
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Pending Payments →
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Reports</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Daily Revenue Report
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Monthly Revenue Report
              </button>
              <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Outstanding Payments Report
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Management</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
                Update Fee Structure
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
                Generate Invoice
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
                Send Payment Reminders
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700">
                Payment Gateway Settings
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700">
                Bank Reconciliation
              </button>
              <button className="w-full px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700">
                Audit Trail
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}