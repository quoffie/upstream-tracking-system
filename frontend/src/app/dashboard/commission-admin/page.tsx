'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EnhancedDashboardLayout from '../../components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../app/components/layouts/DashboardMenus';

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

export default function CommissionAdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login?redirect=/dashboard/commission-admin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'COMMISSION_ADMIN') {
        const getDashboardRoute = (role: string) => {
          switch (role) {
            case 'ADMIN':
              return '/dashboard/admin';
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
            case 'INSPECTOR':
              return '/dashboard/inspector';
            default:
              return '/dashboard';
          }
        };
        router.push(getDashboardRoute(parsedUser.role));
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login?redirect=/dashboard/commission-admin');
      return;
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // CEO Dashboard KPI Stats
  const ceoStats = [
    {
      title: 'Applications Pending Approval',
      value: '47',
      change: '+12%',
      changeType: 'neutral' as const,
      icon: '📋',
      description: 'Awaiting CEO decision'
    },
    {
      title: 'Total Approvals (Monthly)',
      value: '156',
      change: '+8%',
      changeType: 'positive' as const,
      icon: '✅',
      description: 'This month'
    },
    {
      title: 'Issued Permits',
      value: '1,247',
      change: '+15%',
      changeType: 'positive' as const,
      icon: '📄',
      description: 'Active permits'
    },
    {
      title: 'Overdue Applications',
      value: '8',
      change: '-25%',
      changeType: 'positive' as const,
      icon: '⚠️',
      description: 'Require attention'
    },
    {
      title: 'Financial Summary',
      value: 'GH₵12.4M',
      change: '+18%',
      changeType: 'positive' as const,
      icon: '💰',
      description: 'Fees collected'
    },
    {
      title: 'System Uptime',
      value: '99.2%',
      change: '+0.5%',
      changeType: 'positive' as const,
      icon: '🔧',
      description: 'Last 30 days'
    }
  ];

  const productionData = [
    { month: 'Jan', production: 2.4, revenue: 720 },
    { month: 'Feb', production: 2.6, revenue: 780 },
    { month: 'Mar', production: 2.8, revenue: 840 },
    { month: 'Apr', production: 2.7, revenue: 810 },
    { month: 'May', production: 2.9, revenue: 870 },
    { month: 'Jun', production: 3.1, revenue: 930 }
  ];

  const complianceData = [
    { category: 'Environmental', score: 92, target: 95 },
    { category: 'Safety', score: 96, target: 98 },
    { category: 'Local Content', score: 67, target: 70 },
    { category: 'Financial', score: 89, target: 90 },
    { category: 'Operational', score: 94, target: 95 }
  ];

  const topCompanies = [
    { name: 'Tullow Oil', production: '1.2M bbl/day', compliance: 96, revenue: 'GH₵245M' },
    { name: 'Kosmos Energy', production: '0.8M bbl/day', compliance: 94, revenue: 'GH₵189M' },
    { name: 'Eni Ghana', production: '0.6M bbl/day', compliance: 92, revenue: 'GH₵156M' },
    { name: 'Hess Corporation', production: '0.4M bbl/day', compliance: 98, revenue: 'GH₵134M' },
    { name: 'Anadarko', production: '0.3M bbl/day', compliance: 91, revenue: 'GH₵98M' }
  ];

  const criticalIssues = [
    {
      id: 1,
      title: "Environmental Compliance Violation",
      company: "PetroMax Ltd",
      severity: "Critical",
      status: "Under Investigation",
      daysOpen: 12,
      impact: "GH₵2.5M potential fine"
    },
    {
      id: 2,
      title: "Safety Protocol Breach",
      company: "OilFlow Corp",
      severity: "High",
      status: "Pending Review",
      daysOpen: 8,
      impact: "Operations suspended"
    },
    {
      id: 3,
      title: "Revenue Reporting Discrepancy",
      company: "DeepDrill Inc",
      severity: "High",
      status: "Audit Required",
      daysOpen: 5,
      impact: "GH₵1.2M revenue gap"
    },
    {
      id: 4,
      title: "License Renewal Delay",
      company: "CoastalOil Partners",
      severity: "Medium",
      status: "Documentation Review",
      daysOpen: 3,
      impact: "Production halt risk"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Approved Emergency Response Plan",
      company: "PetroMax Ltd",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      action: "Reviewed Quarterly Financial Report",
      company: "OilFlow Corp",
      time: "4 hours ago",
      status: "completed"
    },
    {
      id: 3,
      action: "Escalated Safety Violation",
      company: "DeepDrill Inc",
      time: "6 hours ago",
      status: "pending"
    },
    {
      id: 4,
      action: "Board Meeting Preparation",
      company: "Commission HQ",
      time: "1 day ago",
      status: "in-progress"
    },
    {
      id: 5,
      action: "Strategic Planning Session",
      company: "Commission HQ",
      time: "2 days ago",
      status: "completed"
    }
  ];

  return (
    <EnhancedDashboardLayout
        title="Commission Admin Dashboard"
      userRole="Commission Admin"
      userName={user ? `${user.firstName} ${user.lastName}` : 'Admin Panel'}
      userInitials={user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'CA'}
      sidebarItems={getCommissionAdminMenuItems(pathname)}
    >
      <div className="space-y-8">
        {/* Executive Welcome Section */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">CEO Executive Dashboard</h1>
              <p className="text-blue-100 text-lg">
                Strategic oversight of Ghana's petroleum sector operations and compliance
              </p>
              <div className="mt-4 flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">All Systems Operational</span>
                </div>
                <div className="text-sm">Last Updated: {new Date().toLocaleString()}</div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-2xl font-bold">Q2 2024</div>
                <div className="text-blue-200">Performance Period</div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ceoStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg text-white">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">⚡</span>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button 
                onClick={() => router.push('/dashboard/commission-admin/approvals')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📋</span>
                  <span className="font-semibold">Go to Approvals</span>
                </div>
                <p className="text-sm opacity-90">Review pending applications</p>
              </button>
              <button 
                onClick={() => router.push('/dashboard/commission-admin/reports')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📊</span>
                  <span className="font-semibold">View Reports</span>
                </div>
                <p className="text-sm opacity-90">Analytics and insights</p>
              </button>
              <button 
                onClick={() => router.push('/dashboard/commission-admin/analytics')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">📈</span>
                  <span className="font-semibold">Download Analytics</span>
                </div>
                <p className="text-sm opacity-90">Export performance data</p>
              </button>
              <button 
                onClick={() => router.push('/dashboard/commission-admin/users')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">👥</span>
                  <span className="font-semibold">User Management</span>
                </div>
                <p className="text-sm opacity-90">Manage PC staff and roles</p>
              </button>
              <button 
                onClick={() => router.push('/dashboard/commission-admin/audit')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🔍</span>
                  <span className="font-semibold">Audit Logs</span>
                </div>
                <p className="text-sm opacity-90">System activity review</p>
              </button>
              <button 
                onClick={() => router.push('/dashboard/commission-admin/notifications')}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">🚨</span>
                  <span className="font-semibold">Critical Alerts</span>
                </div>
                <p className="text-sm opacity-90">Urgent issues requiring attention</p>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Approvals Queue */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="mr-2">📋</span>
                Approvals Queue
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[{type: 'Drilling Permit', company: 'PetroMax Ltd', submittedDate: '2024-01-15', priority: 'High', daysWaiting: 5}, {type: 'Environmental Assessment', company: 'OilFlow Corp', submittedDate: '2024-01-12', priority: 'Medium', daysWaiting: 8}, {type: 'License Renewal', company: 'DeepDrill Inc', submittedDate: '2024-01-10', priority: 'Low', daysWaiting: 10}].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.type}</h3>
                      <p className="text-sm text-gray-600">{item.company}</p>
                      <p className="text-xs text-gray-500">{item.submittedDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        item.priority === 'High' ? 'bg-red-100 text-red-800' :
                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{item.daysWaiting} days</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  View All Pending Approvals
                </button>
              </div>
            </div>
          </div>

          {/* Applications Tracker */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="mr-2">📊</span>
                Applications Overview
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">47</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">44</div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Processing Time (Avg)</span>
                  <span className="font-semibold">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approval Rate</span>
                  <span className="font-semibold text-green-600">78%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">💰</span>
              Financial Overview
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">GH₵12.4M</div>
                <div className="text-sm text-gray-600">Total Revenue (Monthly)</div>
                <div className="text-xs text-green-600 mt-1">+18% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">GH₵8.7M</div>
                <div className="text-sm text-gray-600">Fees Collected</div>
                <div className="text-xs text-blue-600 mt-1">+12% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">GH₵2.1M</div>
                <div className="text-sm text-gray-600">Pending Payments</div>
                <div className="text-xs text-gray-500 mt-1">23 transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">GH₵450K</div>
                <div className="text-sm text-gray-600">Overdue Payments</div>
                <div className="text-xs text-red-600 mt-1">8 overdue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Companies */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span className="mr-2">🏆</span>
              Top Performing Companies
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCompanies.map((company, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{company.name.charAt(0)}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">Rank #{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.production}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        company.compliance >= 95 ? 'bg-green-100 text-green-800' :
                        company.compliance >= 90 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {company.compliance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{company.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                      <button className="text-green-600 hover:text-green-900">Contact</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Issues Management */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <span className="mr-2">🚨</span>
                Critical Issues Requiring CEO Attention
              </h2>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                View All Issues
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Open</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {criticalIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{issue.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        issue.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{issue.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        issue.daysOpen > 7 ? 'text-red-600' :
                        issue.daysOpen > 3 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {issue.daysOpen} days
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{issue.impact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 mr-3">Escalate</button>
                      <button className="text-blue-600 hover:text-blue-900">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Executive Reports & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities Summary */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="mr-2">📋</span>
                Recent Executive Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      activity.status === 'completed' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.company}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="mr-2">⚡</span>
                System Health
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-gray-600 mt-1">System Uptime</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-600 mt-1">Pending CEO Actions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Executive Tools */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="mr-2">🛠️</span>
                Executive Tools
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">📊</span>
                    <div>
                      <div className="font-medium text-gray-900">Generate Board Report</div>
                      <div className="text-xs text-gray-500">Quarterly performance summary</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">👥</span>
                    <div>
                      <div className="font-medium text-gray-900">Executive Meeting</div>
                      <div className="text-xs text-gray-500">Schedule with department heads</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🎯</span>
                    <div>
                      <div className="font-medium text-gray-900">Strategic Planning</div>
                      <div className="text-xs text-gray-500">Set annual objectives</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                  <div className="flex items-center">
                    <span className="text-lg mr-3">🚨</span>
                    <div>
                      <div className="font-medium text-gray-900">Emergency Response</div>
                      <div className="text-xs text-gray-500">Crisis management protocols</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}