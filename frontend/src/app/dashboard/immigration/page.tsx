'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../components/layouts/DashboardMenus';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon,
  PermitIcon,
  HistoryIcon,
  ReportIcon,
  CertificateIcon
} from '../../components/icons/DashboardIcons';

// Mock data for the dashboard
const permitStatusData = [
  { name: 'Active', value: 85 },
  { name: 'Expiring Soon', value: 10 },
  { name: 'Expired', value: 5 },
];

const applicationTypeData = [
  { name: 'Regular', value: 65 },
  { name: 'Rotator', value: 35 },
];

const monthlyPermitsData = [
  { name: 'Jan', permits: 12 },
  { name: 'Feb', permits: 19 },
  { name: 'Mar', permits: 15 },
  { name: 'Apr', permits: 22 },
  { name: 'May', permits: 26 },
  { name: 'Jun', permits: 18 },
  { name: 'Jul', permits: 23 },
  { name: 'Aug', permits: 29 },
  { name: 'Sep', permits: 33 },
  { name: 'Oct', permits: 40 },
  { name: 'Nov', permits: 35 },
  { name: 'Dec', permits: 42 },
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F'];

export default function ImmigrationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const pathname = usePathname();
  const sidebarItems = getImmigrationMenuItems(pathname);
  
  console.log('Immigration sidebarItems:', sidebarItems);
  console.log('Immigration pathname:', pathname);

  return (
    <DashboardLayout
      title="Ghana Immigration Service Dashboard"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Immigration Dashboard</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Generating report...')}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pending Approvals */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <ApprovalIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">24</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/immigration/approvals" className="font-medium text-blue-700 hover:text-blue-900">View all</a>
              </div>
            </div>
          </div>

          {/* Applications Under Review */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <ApplicationIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Applications Under Review</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">18</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/immigration/applications" className="font-medium text-blue-700 hover:text-blue-900">View all</a>
              </div>
            </div>
          </div>

          {/* Permits Issued This Month */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <CertificateIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Permits Issued This Month</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">42</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/immigration/permits" className="font-medium text-blue-700 hover:text-blue-900">View all</a>
              </div>
            </div>
          </div>

          {/* Permits Expiring Soon */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <HistoryIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Permits Expiring Soon</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">10</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="/dashboard/immigration/permits" className="font-medium text-blue-700 hover:text-blue-900">View all</a>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Permit Status Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Permit Status Distribution</h2>
            <div className="h-80">
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
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {permitStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Application Type Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Application Type Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {applicationTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Permits Issued */}
          <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Permits Issued (2023)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyPermitsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="permits" fill="#0088FE" name="Permits Issued" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Permit Issued</h3>
                      <p className="text-sm text-gray-500">1 hour ago</p>
                    </div>
                    <p className="text-sm text-gray-500">Regular Permit issued to Thomas Wilson (GIS-REG-2023-129)</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Application Approved</h3>
                      <p className="text-sm text-gray-500">3 hours ago</p>
                    </div>
                    <p className="text-sm text-gray-500">Rotator Permit application for Sarah Johnson approved</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Application Received</h3>
                      <p className="text-sm text-gray-500">5 hours ago</p>
                    </div>
                    <p className="text-sm text-gray-500">New Regular Permit application received from Offshore Solutions Ltd</p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Permit Expiry Notification</h3>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                    <p className="text-sm text-gray-500">5 permits are expiring within the next 30 days</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}