'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getCommissionAdminMenuItems } from '../../components/layouts/DashboardMenus';
import {
  HomeIcon,
  ReviewIcon,
  ApplicationIcon,
  PaymentIcon,
  WorkflowIcon,
  AuditIcon,
  NotificationIcon,
  ProfileIcon
} from '../../components/icons/DashboardIcons';

// Mock data for charts
const applicationStatusData = [
  { name: 'Pending Review', value: 28 },
  { name: 'Under Evaluation', value: 15 },
  { name: 'Approved', value: 42 },
  { name: 'Rejected', value: 8 },
  { name: 'Requires Additional Info', value: 12 },
];

const applicationTypeData = [
  { name: 'Regular Permit', value: 45 },
  { name: 'Rotator Permit', value: 30 },
  { name: 'Company Registration', value: 15 },
  { name: 'JV Compliance', value: 10 },
  { name: 'Local Content', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ReviewerDashboard() {
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
      router.push('/auth/login?redirect=/dashboard/reviewer');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user has reviewer role
      if (parsedUser.role !== 'COMPLIANCE_OFFICER') {
        // Redirect to appropriate dashboard based on role
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'COMPANY_ADMIN':
              return '/dashboard/company-admin';
            case 'COMMISSION_ADMIN':
              return '/dashboard/admin';
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
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login?redirect=/dashboard/reviewer');
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
  const sidebarItems = getCommissionAdminMenuItems(pathname);
  
  console.log('Reviewer sidebarItems:', sidebarItems);
  console.log('Reviewer pathname:', pathname);

  return (
    <DashboardLayout
      title="General Reviewer Dashboard"
      userRole={user?.role || 'PC Staff'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'John Reviewer'}
      userInitials={user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'JR'}
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Review</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">28</p>
            <p className="text-sm text-gray-500 mt-1">Applications awaiting review</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Assigned to You</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">12</p>
            <p className="text-sm text-gray-500 mt-1">Your current workload</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Processed Today</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">7</p>
            <p className="text-sm text-gray-500 mt-1">Applications you've handled</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Overdue</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">3</p>
            <p className="text-sm text-gray-500 mt-1">Require immediate attention</p>
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
          
          {/* Application Type Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Types</h3>
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
        </div>
        
        {/* Review Queues Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Review Queues</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800">Company Registration</h4>
              <p className="text-2xl font-bold text-blue-600 mt-2">8</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-blue-600">2 high priority</span>
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                  View Queue
                </button>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-medium text-green-800">Regular Permits</h4>
              <p className="text-2xl font-bold text-green-600 mt-2">15</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-green-600">3 high priority</span>
                <button className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                  View Queue
                </button>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-medium text-amber-800">Rotator Permits</h4>
              <p className="text-2xl font-bold text-amber-600 mt-2">10</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-amber-600">1 high priority</span>
                <button className="text-xs bg-amber-600 text-white px-2 py-1 rounded hover:bg-amber-700">
                  View Queue
                </button>
              </div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium text-purple-800">JV Compliance</h4>
              <p className="text-2xl font-bold text-purple-600 mt-2">5</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-purple-600">0 high priority</span>
                <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700">
                  View Queue
                </button>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <h4 className="font-medium text-indigo-800">Local Content</h4>
              <p className="text-2xl font-bold text-indigo-600 mt-2">7</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-indigo-600">1 high priority</span>
                <button className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700">
                  View Queue
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Assigned Applications */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Your Assigned Applications</h3>
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
                    Submitted
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 17, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Review</button>
                    <button className="text-blue-600 hover:text-blue-900">Forward</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0138</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Company Registration</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New Energy Ltd</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 8, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Overdue
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Review</button>
                    <button className="text-blue-600 hover:text-blue-900">Forward</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0140</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rotator Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tullow Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 9, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 16, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Review</button>
                    <button className="text-blue-600 hover:text-blue-900">Forward</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Assigned Applications →
            </button>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You approved APP-2023-0137 (Regular Permit)</p>
                <p className="text-xs text-gray-500">Today at 10:30 AM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You returned APP-2023-0136 for additional information</p>
                <p className="text-xs text-gray-500">Today at 9:15 AM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You forwarded APP-2023-0135 to Commission Admin</p>
                <p className="text-xs text-gray-500">Yesterday at 4:45 PM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You reviewed payment receipt for APP-2023-0134</p>
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