'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../../app/components/layouts/DashboardLayout';
import { getCommissionAdminMenuItems } from '../../../app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';

// Mock data for charts
const applicationStatusData = [
  { name: 'Pending Approval', value: 18 },
  { name: 'Approved', value: 42 },
  { name: 'Rejected', value: 8 },
  { name: 'Forwarded to GIS', value: 12 },
];

const monthlyApplicationsData = [
  { name: 'Jan', applications: 45 },
  { name: 'Feb', applications: 52 },
  { name: 'Mar', applications: 48 },
  { name: 'Apr', applications: 70 },
  { name: 'May', applications: 65 },
  { name: 'Jun', applications: 58 },
];

const applicationTypeData = [
  { name: 'Regular Permit', value: 45 },
  { name: 'Rotator Permit', value: 30 },
  { name: 'Company Registration', value: 15 },
  { name: 'JV Compliance', value: 10 },
  { name: 'Local Content', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CommissionAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication on component mount
  useEffect(() => {
    // TEMPORARY: Skip authentication for testing menu functionality
    console.log('TEMP: Bypassing authentication for menu testing');
    setUser({
      firstName: 'Test',
      lastName: 'Admin',
      role: 'COMMISSION_ADMIN'
    });
    setIsAuthenticated(true);
    return;
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Auth check - token:', !!token);
    console.log('Auth check - userData:', !!userData);
    
    if (!token || !userData) {
      // Redirect to login if not authenticated
      console.log('No token or user data, redirecting to login');
      router.push('/auth/login?redirect=/dashboard/admin');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData!);
      console.log('Parsed user:', parsedUser);
      console.log('User role:', parsedUser.role);
      setUser(parsedUser);
      
      // Check if user has admin role
      if (parsedUser.role !== 'COMMISSION_ADMIN') {
        console.log('User role is not COMMISSION_ADMIN, redirecting...');
        // Redirect to appropriate dashboard based on role
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'COMPANY_ADMIN':
              return '/dashboard/company-admin';
            case 'COMPLIANCE_OFFICER':
              return '/dashboard/reviewer';
            case 'IMMIGRATION_OFFICER':
              return '/dashboard/immigration';
            case 'PERSONNEL':
              return '/dashboard/personnel';
            case 'LOCAL_CONTENT_OFFICER':
              return '/dashboard/local-content';
            case 'FINANCE_OFFICER':
              return '/dashboard/finance';
            case 'JV_COORDINATOR':
              return '/dashboard/jv-coordinator';
            default:
              return '/dashboard';
          }
        };
        router.push(getDashboardRoute(parsedUser.role));
        return;
      }
      
      console.log('Authentication successful, setting isAuthenticated to true');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login?redirect=/dashboard/admin');
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

  const sidebarItems = getCommissionAdminMenuItems(pathname);
  
  // Debug: Log sidebar items to console
  console.log('Sidebar items:', sidebarItems);
  console.log('Current pathname:', pathname);

  return (
    <DashboardLayout
      title="Commission Admin Dashboard"
      userRole={user?.role || 'Commission Admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Admin Panel'}
      userInitials={user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'CA'}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Approval</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">18</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting your decision</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Approved Today</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">7</p>
            <p className="text-sm text-gray-500 mt-1">Successfully processed</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Forwarded to GIS</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">5</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting GIS approval</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Escalated Issues</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">3</p>
            <p className="text-sm text-gray-500 mt-1">Require your attention</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {applicationStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Monthly Applications Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Applications</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyApplicationsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#0088FE" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Application Types */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Applications by Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationTypeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#0088FE" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Approvals Queue */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forwarded By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0142</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Regular Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Acme Corporation</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Reviewer</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 12, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                    <button className="text-amber-600 hover:text-amber-900">To GIS</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0141</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rotator Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tullow Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Reviewer</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 11, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Verified
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                    <button className="text-amber-600 hover:text-amber-900">To GIS</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0140</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Company Registration</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New Energy Ltd</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Reviewer</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending Verification
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Check Payment</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Pending Approvals →
            </button>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You approved APP-2023-0139 (Regular Permit)</p>
                <p className="text-xs text-gray-500">Today at 11:30 AM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You forwarded APP-2023-0138 (Rotator Permit) to GIS</p>
                <p className="text-xs text-gray-500">Today at 10:15 AM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You rejected APP-2023-0137 (Company Registration)</p>
                <p className="text-xs text-gray-500">Yesterday at 4:45 PM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You verified payment for APP-2023-0136</p>
                <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Activity →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}