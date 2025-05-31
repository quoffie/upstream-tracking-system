'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getLocalContentMenuItems } from '../../components/layouts/DashboardMenus';
import {
  HomeIcon,
  ApplicationIcon,
  ComplianceIcon,
  AnalyticsIcon,
  DocumentIcon,
  AuditIcon,
  HistoryIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon
} from '../../components/icons/DashboardIcons';

// Mock data for charts
const complianceStatusData = [
  { name: 'Compliant', value: 65 },
  { name: 'Non-Compliant', value: 20 },
  { name: 'Pending Review', value: 15 },
];

const localContentRatioData = [
  { name: 'Ghanaian', value: 72 },
  { name: 'Expatriate', value: 28 },
];

const monthlyComplianceData = [
  { name: 'Jan', ghanaian: 68, expatriate: 32 },
  { name: 'Feb', ghanaian: 70, expatriate: 30 },
  { name: 'Mar', ghanaian: 71, expatriate: 29 },
  { name: 'Apr', ghanaian: 72, expatriate: 28 },
  { name: 'May', ghanaian: 72, expatriate: 28 },
  { name: 'Jun', ghanaian: 73, expatriate: 27 },
];

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#0088FE'];

export default function LocalContentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const pathname = usePathname();
  const sidebarItems = getLocalContentMenuItems(pathname);
  
  console.log('Local Content sidebarItems:', sidebarItems);
  console.log('Local Content pathname:', pathname);
  
  // Action buttons for quick access
  const quickActions = [
    { name: 'Review Pending Reports', href: '/dashboard/local-content/reports', color: 'blue' },
    { name: 'Issue Non-Compliance Notice', href: '/dashboard/local-content/notices', color: 'red' },
    { name: 'View Compliance Analytics', href: '/dashboard/local-content/analytics', color: 'green' },
    { name: 'Generate Monthly Report', href: '/dashboard/local-content/reports/generate', color: 'purple' },
  ];

  return (
    <DashboardLayout
      title="Local Content Officer Dashboard"
      userRole="Local Content Officer"
      userName="Sarah Johnson"
      userInitials="SJ"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Companies</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
            <p className="text-sm text-gray-500 mt-1">Active companies</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Compliance Rate</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">72%</p>
            <p className="text-sm text-gray-500 mt-1">Local content ratio</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Reviews</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">8</p>
            <p className="text-sm text-gray-500 mt-1">Quarterly reports</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Non-Compliant</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">3</p>
            <p className="text-sm text-gray-500 mt-1">Companies below threshold</p>
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
          {/* Compliance Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={complianceStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {complianceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Local Content Ratio Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Local Content Ratio</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={localContentRatioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {localContentRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#00C49F' : '#FF8042'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Monthly Compliance Trend */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Compliance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyComplianceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ghanaian" stroke="#00C49F" name="Ghanaian %" />
                <Line type="monotone" dataKey="expatriate" stroke="#FF8042" name="Expatriate %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Companies Compliance Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Company Compliance Status</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Local Content %
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Report
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tullow Ghana Ltd</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">78%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Compliant
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                    <button className="text-purple-600 hover:text-purple-900">View Report</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Eni Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">75%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Compliant
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                    <button className="text-purple-600 hover:text-purple-900">View Report</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Kosmos Energy</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">68%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending Review
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 20, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                    <button className="text-purple-600 hover:text-purple-900">Review Report</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Baker Hughes Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Non-Compliant
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 05, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                    <button className="text-red-600 hover:text-red-900">Issue Notice</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Schlumberger Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">71%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Compliant
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 12, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                    <button className="text-purple-600 hover:text-purple-900">View Report</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pending Reviews */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Reviews</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Kosmos Energy - Q2 2023 Local Content Report</h4>
                <p className="text-xs text-gray-500 mt-1">Submitted: May 20, 2023</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Review
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">TechnipFMC Ghana - Q2 2023 Local Content Report</h4>
                <p className="text-xs text-gray-500 mt-1">Submitted: May 18, 2023</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Review
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Halliburton Ghana - Q2 2023 Local Content Report</h4>
                <p className="text-xs text-gray-500 mt-1">Submitted: May 17, 2023</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Review
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Pending Reviews →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}