'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EnhancedDashboardLayout from '../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../src/app/components/layouts/DashboardMenus';
import {
  WrenchScrewdriverIcon,
  ChartBarIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function ExecutiveToolsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      action: 'Board Report Generated',
      company: 'Q1 2024 Performance Summary',
      time: '2 hours ago',
      status: 'completed',
      type: 'report'
    },
    {
      id: 2,
      action: 'Executive Meeting Scheduled',
      company: 'Department Heads Meeting',
      time: '4 hours ago',
      status: 'completed',
      type: 'meeting'
    },
    {
      id: 3,
      action: 'Strategic Plan Updated',
      company: '2024 Annual Objectives',
      time: '1 day ago',
      status: 'pending',
      type: 'planning'
    },
    {
      id: 4,
      action: 'Emergency Protocol Activated',
      company: 'Environmental Incident Response',
      time: '2 days ago',
      status: 'in-progress',
      type: 'emergency'
    }
  ]);

  const [systemHealth, setSystemHealth] = useState({
    uptime: 98.7,
    activeUsers: 1247,
    pendingActions: 89
  });

  const [quickStats, setQuickStats] = useState({
    reportsGenerated: 24,
    meetingsScheduled: 12,
    strategicPlans: 5,
    emergencyResponses: 3
  });

  const getActivityIcon = (type: string): JSX.Element => {
    switch (type) {
      case 'report': return <DocumentTextIcon className="h-5 w-5 text-blue-600" />;
      case 'meeting': return <UsersIcon className="h-5 w-5 text-green-600" />;
      case 'planning': return <ChartBarIcon className="h-5 w-5 text-purple-600" />;
      case 'emergency': return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default: return <CogIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <EnhancedDashboardLayout
        title="Executive Tools"
      sidebarItems={getCommissionAdminMenuItems(pathname)}
      userRole="commission_admin"
      userName="John Smith"
      userInitials="JS"
      userAvatar=""
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600 mr-3" />
                Executive Tools
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive suite of executive management tools and utilities</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Quick Actions
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-blue-600">{quickStats.reportsGenerated}</div>
                <div className="text-sm text-gray-600">Reports Generated</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-green-600">{quickStats.meetingsScheduled}</div>
                <div className="text-sm text-gray-600">Meetings Scheduled</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-purple-600">{quickStats.strategicPlans}</div>
                <div className="text-sm text-gray-600">Strategic Plans</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-red-600">{quickStats.emergencyResponses}</div>
                <div className="text-sm text-gray-600">Emergency Responses</div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Generate Board Report */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-6">
              <button className="w-full text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors p-4">
                <div className="flex items-center mb-3">
                  <ChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <div className="text-lg font-semibold text-gray-900">Generate Board Report</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">Create comprehensive quarterly performance summary for board presentation</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-600 font-medium">Last generated: 2 hours ago</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Ready</span>
                </div>
              </button>
            </div>
          </div>

          {/* Executive Meeting */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-6">
              <button className="w-full text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors p-4">
                <div className="flex items-center mb-3">
                  <UsersIcon className="h-8 w-8 text-green-600 mr-3" />
                  <div className="text-lg font-semibold text-gray-900">Executive Meeting</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">Schedule and manage meetings with department heads and key stakeholders</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">Next meeting: Tomorrow 2PM</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Scheduled</span>
                </div>
              </button>
            </div>
          </div>

          {/* Strategic Planning */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-6">
              <button className="w-full text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors p-4">
                <div className="flex items-center mb-3">
                  <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <div className="text-lg font-semibold text-gray-900">Strategic Planning</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">Set and track annual objectives, KPIs, and long-term strategic goals</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-600 font-medium">Last updated: 1 day ago</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">In Progress</span>
                </div>
              </button>
            </div>
          </div>

          {/* Emergency Response */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="p-6">
              <button className="w-full text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors p-4">
                <div className="flex items-center mb-3">
                  <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-3" />
                  <div className="text-lg font-semibold text-gray-900">Emergency Response</div>
                </div>
                <div className="text-sm text-gray-600 mb-4">Activate crisis management protocols and coordinate emergency responses</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-600 font-medium">Last activated: 2 days ago</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Standby</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Executive Actions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-blue-600 mr-2" />
                Recent Executive Actions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(activity.status)}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        {getActivityIcon(activity.type)}
                        <p className="text-sm font-medium text-gray-900 ml-2">{activity.action}</p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.company}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.status.replace('-', ' ')}
                      </span>
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
                <CogIcon className="h-6 w-6 text-green-600 mr-2" />
                System Health
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">{systemHealth.uptime}%</div>
                  <div className="text-sm text-gray-600 mt-1">System Uptime</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${systemHealth.uptime}%` }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{systemHealth.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">{systemHealth.pendingActions}</div>
                  <div className="text-sm text-gray-600 mt-1">Pending CEO Actions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <div className="flex items-center mb-2">
                  <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium text-gray-900">Export Data</span>
                </div>
                <div className="text-xs text-gray-500">Generate comprehensive data export</div>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <div className="flex items-center mb-2">
                  <CalendarDaysIcon className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium text-gray-900">Schedule Review</span>
                </div>
                <div className="text-xs text-gray-500">Schedule performance review meeting</div>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <div className="flex items-center mb-2">
                  <ChartBarIcon className="h-5 w-5 text-purple-600 mr-2" />
                  <span className="font-medium text-gray-900">Analytics</span>
                </div>
                <div className="text-xs text-gray-500">View detailed analytics dashboard</div>
              </button>
              <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-left">
                <div className="flex items-center mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
                  <span className="font-medium text-gray-900">Alert Center</span>
                </div>
                <div className="text-xs text-gray-500">Manage system alerts and notifications</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}