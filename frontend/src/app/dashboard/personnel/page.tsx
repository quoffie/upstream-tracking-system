'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../../app/components/layouts/DashboardLayout';
import { getPersonnelMenuItems } from '../../../app/components/layouts/DashboardMenus';
import {
  HomeIcon,
  ApplicationIcon,
  PermitIcon,
  DocumentIcon,
  PaymentIcon,
  HistoryIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon
} from '../../components/icons/DashboardIcons';

// Mock data for charts
const permitStatusData = [
  { name: 'Valid', value: 1 },
  { name: 'Expiring Soon', value: 0 },
  { name: 'Expired', value: 0 },
];

const documentStatusData = [
  { name: 'Valid', value: 4 },
  { name: 'Expiring Soon', value: 1 },
  { name: 'Expired', value: 0 },
];

const applicationHistoryData = [
  { name: 'Jan', applications: 0 },
  { name: 'Feb', applications: 0 },
  { name: 'Mar', applications: 1 },
  { name: 'Apr', applications: 0 },
  { name: 'May', applications: 0 },
  { name: 'Jun', applications: 0 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export default function PersonnelDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const pathname = usePathname();
  const sidebarItems = getPersonnelMenuItems(pathname);
  
  console.log('Personnel sidebarItems:', sidebarItems);
  console.log('Personnel pathname:', pathname);
  
  // Action buttons for quick access
  const quickActions = [
    { name: 'View My Permit', href: '/dashboard/personnel/permits', color: 'blue' },
    { name: 'Upload Document', href: '/dashboard/personnel/documents', color: 'green' },
    { name: 'Check Application Status', href: '/dashboard/personnel/applications', color: 'purple' },
    { name: 'Make Payment', href: '/dashboard/personnel/payments', color: 'amber' },
  ];

  return (
    <DashboardLayout
      title="Personnel Dashboard"
      userRole="Personnel"
      userName="John Smith"
      userInitials="JS"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Permit Status</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">Valid</p>
            <p className="text-sm text-gray-500 mt-1">Expires in 245 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Application Status</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">Approved</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: 2 months ago</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">5/5</p>
            <p className="text-sm text-gray-500 mt-1">1 expiring in 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Actions</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">1</p>
            <p className="text-sm text-gray-500 mt-1">Document renewal needed</p>
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
          {/* Permit Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Permit Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={permitStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                  >
                    {permitStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Document Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={documentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
                  >
                    {documentStatusData.map((entry, index) => (
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
        
        {/* Application History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Application History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={applicationHistoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#0088FE" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* My Documents */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">My Documents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Medical Certificate</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Expiring Soon
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Replace</button>
                    <button className="text-purple-600 hover:text-purple-900">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BOSIET Certificate</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Valid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 10, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Replace</button>
                    <button className="text-purple-600 hover:text-purple-900">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Police Clearance</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Valid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Feb 05, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Feb 05, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Replace</button>
                    <button className="text-purple-600 hover:text-purple-900">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Resume/CV</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Valid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 01, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">N/A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Replace</button>
                    <button className="text-purple-600 hover:text-purple-900">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Passport Copy</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Valid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 20, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 20, 2028</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Replace</button>
                    <button className="text-purple-600 hover:text-purple-900">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Your Medical Certificate will expire in 30 days</p>
                <p className="text-xs text-gray-500">Today at 9:30 AM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Your permit application has been approved</p>
                <p className="text-xs text-gray-500">Mar 15, 2023</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Your permit has been issued</p>
                <p className="text-xs text-gray-500">Mar 16, 2023</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Notifications →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}