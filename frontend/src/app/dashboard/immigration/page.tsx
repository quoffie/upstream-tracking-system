'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  PaymentIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon,
  CertificateIcon,
  HistoryIcon
} from '../../components/icons/DashboardIcons';

// Mock data for charts
const applicationStatusData = [
  { name: 'Pending Review', value: 24 },
  { name: 'Approved', value: 38 },
  { name: 'Rejected', value: 6 },
  { name: 'Requires Additional Info', value: 14 },
];

const monthlyApplicationsData = [
  { name: 'Jan', applications: 42 },
  { name: 'Feb', applications: 48 },
  { name: 'Mar', applications: 45 },
  { name: 'Apr', applications: 65 },
  { name: 'May', applications: 60 },
  { name: 'Jun', applications: 52 },
];

const nationalityData = [
  { name: 'United States', value: 28 },
  { name: 'United Kingdom', value: 22 },
  { name: 'Canada', value: 15 },
  { name: 'Australia', value: 12 },
  { name: 'Other', value: 23 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ImmigrationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/immigration', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Permit Approvals', href: '/dashboard/immigration/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Application Review', href: '/dashboard/immigration/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status', href: '/dashboard/immigration/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Permit Certificates', href: '/dashboard/immigration/certificates', icon: CertificateIcon, current: activeTab === 'certificates' },
    { name: 'Approval History', href: '/dashboard/immigration/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Notifications', href: '/dashboard/immigration/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/immigration/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/immigration/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  return (
    <DashboardLayout
      title="Ghana Immigration Service Dashboard"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Status Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Pending Review</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">24</p>
            <p className="text-sm text-gray-500 mt-1">Awaiting your decision</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Approved Today</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">8</p>
            <p className="text-sm text-gray-500 mt-1">Successfully processed</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Expiring Soon</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">12</p>
            <p className="text-sm text-gray-500 mt-1">Within next 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Rejected</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">6</p>
            <p className="text-sm text-gray-500 mt-1">In the last 30 days</p>
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
        
        {/* Nationality Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Applicant Nationality Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={nationalityData}
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
        
        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Pending Permit Approvals</h3>
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
                    Nationality
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PC Approval Date
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">United States</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Acme Corporation</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 12, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                    <button className="text-amber-600 hover:text-amber-900">Request Info</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0141</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rotator Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emma Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">United Kingdom</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tullow Ghana</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 11, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                    <button className="text-amber-600 hover:text-amber-900">Request Info</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APP-2023-0140</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Regular Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Canada</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New Energy Ltd</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 10, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                    <button className="text-red-600 hover:text-red-900 mr-3">Reject</button>
                    <button className="text-amber-600 hover:text-amber-900">Request Info</button>
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
                <p className="text-sm font-medium text-gray-900">You approved work permit for John Smith (APP-2023-0139)</p>
                <p className="text-xs text-gray-500">Today at 11:30 AM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You issued certificate for Emma Johnson (APP-2023-0138)</p>
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
                <p className="text-sm font-medium text-gray-900">You rejected application for David Wilson (APP-2023-0137)</p>
                <p className="text-xs text-gray-500">Yesterday at 4:45 PM</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">You requested additional information for APP-2023-0136</p>
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
        
        {/* Certificate Issuance */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Certificate Issuance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Certificate No.
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permit Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CERT-2023-0045</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Emma Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rotator Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 12, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 12, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Print</button>
                    <button className="text-amber-600 hover:text-amber-900">Email</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">CERT-2023-0044</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Regular Permit</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 11, 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 11, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Print</button>
                    <button className="text-amber-600 hover:text-amber-900">Email</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
              View All Certificates →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}