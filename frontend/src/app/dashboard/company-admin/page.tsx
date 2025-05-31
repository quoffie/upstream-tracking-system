'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../components/layouts/DashboardMenus';
import {
  HomeIcon,
  ApplicationIcon,
  PermitIcon,
  PersonnelIcon,
  PaymentIcon,
  ComplianceIcon,
  DocumentIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon
} from '../../components/icons/DashboardIcons';

// Mock data for charts
const applicationStatusData = [
  { name: 'Draft', value: 5 },
  { name: 'Submitted', value: 8 },
  { name: 'Under Review', value: 12 },
  { name: 'Approved', value: 20 },
  { name: 'Rejected', value: 3 },
];

const permitExpiryData = [
  { name: 'Jan', expiring: 2 },
  { name: 'Feb', expiring: 5 },
  { name: 'Mar', expiring: 3 },
  { name: 'Apr', expiring: 7 },
  { name: 'May', expiring: 2 },
  { name: 'Jun', expiring: 4 },
];

const staffRatioData = [
  { name: 'Ghanaian', value: 65 },
  { name: 'Expatriate', value: 35 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const STAFF_COLORS = ['#004A7B', '#B8860B'];

export default function CompanyAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const pathname = usePathname();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  console.log('Company Admin sidebarItems:', sidebarItems);
  console.log('Company Admin pathname:', pathname);

  return (
    <DashboardLayout
      title="Company Admin Dashboard"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
            <p className="text-sm text-gray-500 mt-1">Applications being processed</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Approved</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">20</p>
            <p className="text-sm text-gray-500 mt-1">Successfully approved permits</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Returned</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">3</p>
            <p className="text-sm text-gray-500 mt-1">Requires additional information</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Expiring Soon</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">5</p>
            <p className="text-sm text-gray-500 mt-1">Permits expiring in 30 days</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status</h3>
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
          
          {/* Permit Expiry Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Permits Expiring by Month</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={permitExpiryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expiring" fill="#FF8042" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Action Items Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Outstanding Payments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Outstanding Payments</h3>
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Regular Permit - John Doe</span>
                  <span className="text-sm font-semibold text-red-600">$1,500</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Due: Dec 15, 2023</p>
              </li>
              <li className="py-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Rotator Permit - Jane Smith</span>
                  <span className="text-sm font-semibold text-red-600">$2,200</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Due: Dec 20, 2023</p>
              </li>
              <li className="py-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Annual Compliance Fee</span>
                  <span className="text-sm font-semibold text-red-600">$5,000</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Due: Dec 31, 2023</p>
              </li>
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
              View All Payments
            </button>
          </div>
          
          {/* Staff Ratio */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Nationality Ratio</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={staffRatioData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {staffRatioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STAFF_COLORS[index % STAFF_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center text-sm text-gray-600">
              <p>Target Ghanaian Ratio: 70%</p>
              <p className="text-amber-600 font-medium">Action needed to improve local content</p>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Next Steps & Actions</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <span className="text-red-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Renew 3 expiring permits</p>
                  <p className="text-xs text-gray-500">Due in 14 days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                  <span className="text-amber-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Upload Q4 Local Content Report</p>
                  <p className="text-xs text-gray-500">Due in 21 days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Complete JV compliance documentation</p>
                  <p className="text-xs text-gray-500">Required for new application</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-blue-600 text-xs font-bold">i</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Update staff medical certificates</p>
                  <p className="text-xs text-gray-500">5 certificates expiring soon</p>
                </div>
              </li>
            </ul>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
              View All Tasks
            </button>
          </div>
        </div>
        
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
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
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Under Review
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Track</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0141</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rotator Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 8, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Approved
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Download</button>
                    <button className="text-blue-600 hover:text-blue-900">Print</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0140</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Regular Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Robert Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 5, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Returned
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Applications →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}