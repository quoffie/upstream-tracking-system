'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../app/components/layouts/DashboardMenus';

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

export default function CompanyDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const pathname = usePathname();
  const sidebarItems = getCompanyAdminMenuItems(pathname);

  return (
    <DashboardLayout
      title="Company Dashboard"
      userRole="Company"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >

      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">Company Dashboard</h1>
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition duration-300">
            Generate Report
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Active Permits</p>
                      <p className="text-2xl font-bold text-blue-800">24</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-md">
                      <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      3 new this month
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pending Applications</p>
                      <p className="text-2xl font-bold text-gold-600">8</p>
                    </div>
                    <div className="p-2 bg-gold-100 rounded-md">
                      <svg className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-blue-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                      View details
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Expiring Soon</p>
                      <p className="text-2xl font-bold text-red-500">5</p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-md">
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-red-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Action required
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Local Content Compliance</p>
                      <p className="text-2xl font-bold text-green-500">92%</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-md">
                      <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Good standing
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Application Status</h2>
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
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Permit Expiries</h2>
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
                        <Bar dataKey="expiring" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Staff Ratio</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={staffRatioData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {staffRatioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={STAFF_COLORS[index % STAFF_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Recent Notifications</h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                      <p className="font-medium">Your permit application has been approved</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
                      <p className="font-medium">Local Content Report due in 14 days</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <p className="text-sm text-gray-500">Dec 15, 2023</p>
                      <p className="font-medium">3 personnel permits expiring next month</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="text-sm text-gray-500">Dec 10, 2023</p>
                      <p className="font-medium">JV compliance review completed successfully</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'localcontent' && (
            <div>
              <h1 className="text-2xl font-bold text-blue-800 mb-6">Local Content Reporting</h1>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Ghanaian Ownership</p>
                      <p className="text-2xl font-bold text-blue-800">42%</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-md">
                      <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-yellow-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Target: 51%
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Local Employment</p>
                      <p className="text-2xl font-bold text-green-600">75%</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-md">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Target: 70%
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Local Procurement</p>
                      <p className="text-2xl font-bold text-gold-600">55%</p>
                    </div>
                    <div className="p-2 bg-gold-100 rounded-md">
                      <svg className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-yellow-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Target: 60%
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Training & Tech Transfer</p>
                      <p className="text-2xl font-bold text-blue-500">62%</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-md">
                      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-yellow-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Target: 70%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Reporting Form */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-lg font-semibold text-blue-800 mb-4">Submit Quarterly Local Content Report</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Period</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Q1 2023 (Jan-Mar)</option>
                      <option>Q2 2023 (Apr-Jun)</option>
                      <option>Q3 2023 (Jul-Sep)</option>
                      <option>Q4 2023 (Oct-Dec)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Quarterly Report</option>
                      <option>Annual Report</option>
                      <option>Special Report</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-blue-800 mb-3">Ghanaian Participation Metrics</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ghanaian Equity Participation (%)</label>
                      <input type="number" min="0" max="100" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 42" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ghanaian Management Staff (%)</label>
                      <input type="number" min="0" max="100" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 65" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ghanaian Technical Staff (%)</label>
                      <input type="number" min="0" max="100" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 75" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ghanaian Other Staff (%)</label>
                      <input type="number" min="0" max="100" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 85" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-blue-800 mb-3">Local Procurement & Services</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Procurement Spend (USD)</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 5000000" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Local Procurement Spend (USD)</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 2750000" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Local Vendors</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 42" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-blue-800 mb-3">Training & Technology Transfer</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Training Programs Conducted</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 8" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ghanaians Trained</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 120" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Training Expenditure (USD)</label>
                      <input type="number" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. 250000" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technology Transfer Initiatives</label>
                      <textarea rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Describe technology transfer initiatives..."></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-md font-medium text-blue-800 mb-3">Supporting Documents</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Financial Statement</label>
                      <div className="flex items-center">
                        <input type="file" className="hidden" id="financial-statement" />
                        <label htmlFor="financial-statement" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200">Choose File</label>
                        <span className="ml-3 text-sm text-gray-500">No file chosen</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employment Records</label>
                      <div className="flex items-center">
                        <input type="file" className="hidden" id="employment-records" />
                        <label htmlFor="employment-records" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200">Choose File</label>
                        <span className="ml-3 text-sm text-gray-500">No file chosen</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Procurement Records</label>
                      <div className="flex items-center">
                        <input type="file" className="hidden" id="procurement-records" />
                        <label htmlFor="procurement-records" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200">Choose File</label>
                        <span className="ml-3 text-sm text-gray-500">No file chosen</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Training Documentation</label>
                      <div className="flex items-center">
                        <input type="file" className="hidden" id="training-docs" />
                        <label htmlFor="training-docs" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition duration-200">Choose File</label>
                        <span className="ml-3 text-sm text-gray-500">No file chosen</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                  <textarea rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Any additional information or context..."></textarea>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200">Save as Draft</button>
                  <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition duration-200">Submit Report</button>
                </div>
              </div>
              
              {/* Previous Reports */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-blue-800 mb-4">Previous Reports</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Score</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q4 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jan 15, 2023</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">94%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                          <button className="mr-3">View</button>
                          <button>Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q3 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 12, 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">91%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                          <button className="mr-3">View</button>
                          <button>Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q2 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jul 10, 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Approved</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                          <button className="mr-3">View</button>
                          <button>Download</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Q1 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2022</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Revision Requested</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">82%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                          <button className="mr-3">View</button>
                          <button>Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'overview' && activeTab !== 'localcontent' && (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section</h2>
              <p className="text-gray-600 mb-6">This section is under development. Please check back soon.</p>
              <button 
                onClick={() => setActiveTab('overview')} 
                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Return to Dashboard
              </button>
            </div>
        )}
        
        {/* Other tab content */}
        {activeTab !== 'overview' && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
            <p className="text-gray-600 mb-6">This section is under development. Please check back soon.</p>
            <button 
              onClick={() => setActiveTab('overview')} 
              className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}