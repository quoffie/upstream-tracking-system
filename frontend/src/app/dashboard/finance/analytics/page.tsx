'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
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
} from '../../../components/icons/DashboardIcons';

// Mock data for charts
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

const paymentStatusData = [
  { name: 'Paid', value: 65 },
  { name: 'Pending', value: 25 },
  { name: 'Overdue', value: 10 },
];

const companyRevenueData = [
  { name: 'Tullow Ghana', revenue: 35000 },
  { name: 'Eni Ghana', revenue: 28000 },
  { name: 'Kosmos Energy', revenue: 22000 },
  { name: 'Baker Hughes', revenue: 18000 },
  { name: 'Schlumberger', revenue: 15000 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#8884d8'];

export default function RevenueAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [timeRange, setTimeRange] = useState('year');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/finance', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Payment Processing', href: '/dashboard/finance/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'Payment Verification', href: '/dashboard/finance/verification', icon: DocumentIcon, current: activeTab === 'verification' },
    { name: 'Revenue Analytics', href: '/dashboard/finance/analytics', icon: AnalyticsIcon, current: activeTab === 'analytics' },
    { name: 'Invoices & Receipts', href: '/dashboard/finance/invoices', icon: DocumentIcon, current: activeTab === 'invoices' },
    { name: 'Fee Management', href: '/dashboard/finance/fees', icon: CalculatorIcon, current: activeTab === 'fees' },
    { name: 'Transaction History', href: '/dashboard/finance/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Audit Logs', href: '/dashboard/finance/audit', icon: HistoryIcon, current: activeTab === 'audit' },
    { name: 'Notifications', href: '/dashboard/finance/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Profile/Settings', href: '/dashboard/finance/profile', icon: ProfileIcon, current: activeTab === 'profile' },
    { name: 'Help/Support', href: '/dashboard/finance/support', icon: SupportIcon, current: activeTab === 'support' },
  ];

  return (
    <DashboardLayout
      title="Finance Officer Dashboard"
      userRole="Finance Officer"
      userName="Michael Addo"
      userInitials="MA"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Revenue Analytics</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setTimeRange('month')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setTimeRange('quarter')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'quarter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Quarter
              </button>
              <button 
                onClick={() => setTimeRange('year')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Year
              </button>
            </div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-800">Total Revenue</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">₵275,000</p>
              <p className="text-sm text-blue-500 mt-1">+12% from previous {timeRange}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-800">Collected Payments</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">₵178,750</p>
              <p className="text-sm text-green-500 mt-1">65% of total revenue</p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-800">Pending Payments</h3>
              <p className="text-3xl font-bold text-yellow-600 mt-2">₵68,750</p>
              <p className="text-sm text-yellow-500 mt-1">25% of total revenue</p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-800">Overdue Payments</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">₵27,500</p>
              <p className="text-sm text-red-500 mt-1">10% of total revenue</p>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        
        {/* Top Companies by Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Companies by Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={companyRevenueData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => [`₵${value}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue (₵)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Export Options */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Export Analytics</h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              Export as PDF
            </button>
            <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
              Export as Excel
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
              Schedule Reports
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}