'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EnhancedDashboardLayout from '../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../src/app/components/layouts/DashboardMenus';
import {
  ExclamationTriangleIcon,
  FireIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

export default function CriticalIssuesPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [criticalIssues, setCriticalIssues] = useState([
    {
      id: 1,
      title: 'Environmental Compliance Violation',
      company: 'Shell Nigeria',
      severity: 'Critical',
      status: 'Under Investigation',
      daysOpen: 12,
      impact: 'Production halt risk',
      description: 'Unauthorized discharge detected in offshore operations',
      assignedTo: 'Environmental Team',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Safety Protocol Breach',
      company: 'Chevron Nigeria',
      severity: 'High',
      status: 'Pending Review',
      daysOpen: 8,
      impact: 'Safety risk to personnel',
      description: 'Missing safety equipment during drilling operations',
      assignedTo: 'Safety Department',
      priority: 'High'
    },
    {
      id: 3,
      title: 'License Renewal Overdue',
      company: 'Total E&P Nigeria',
      severity: 'High',
      status: 'Awaiting Documentation',
      daysOpen: 15,
      impact: 'Legal compliance risk',
      description: 'Operating license expired 15 days ago',
      assignedTo: 'Legal Team',
      priority: 'Critical'
    },
    {
      id: 4,
      title: 'Production Quota Exceeded',
      company: 'ExxonMobil Nigeria',
      severity: 'Medium',
      status: 'Escalated to CEO',
      daysOpen: 5,
      impact: 'Regulatory penalties',
      description: 'Monthly production exceeded by 15%',
      assignedTo: 'Production Team',
      priority: 'Medium'
    },
    {
      id: 5,
      title: 'Financial Audit Discrepancy',
      company: 'Eni Nigeria',
      severity: 'Critical',
      status: 'Under Review',
      daysOpen: 20,
      impact: 'Financial penalties',
      description: 'Unexplained variance in royalty payments',
      assignedTo: 'Finance Team',
      priority: 'Critical'
    }
  ]);

  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string): JSX.Element => {
    switch (severity) {
      case 'Critical': return <FireIcon className="h-5 w-5 text-red-600" />;
      case 'High': return <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />;
      default: return <ClockIcon className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getDaysOpenColor = (days: number): string => {
    if (days > 14) return 'text-red-600';
    if (days > 7) return 'text-orange-600';
    return 'text-green-600';
  };

  const criticalCount = criticalIssues.filter(issue => issue.severity === 'Critical').length;
  const highCount = criticalIssues.filter(issue => issue.severity === 'High').length;
  const avgDaysOpen = Math.round(criticalIssues.reduce((sum, issue) => sum + issue.daysOpen, 0) / criticalIssues.length);

  return (
    <EnhancedDashboardLayout
        title="Critical Issues"
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
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-3" />
                Critical Issues Requiring CEO Attention
              </h1>
              <p className="text-gray-600 mt-2">Monitor and manage high-priority issues across all operations</p>
            </div>
            <div className="flex space-x-3">
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                View All Issues
              </button>
            </div>
          </div>
        </div>

        {/* Issue Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <FireIcon className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-red-600">{criticalCount}</div>
                <div className="text-sm text-gray-600">Critical Issues</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-orange-600">{highCount}</div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-blue-600">{avgDaysOpen}</div>
                <div className="text-sm text-gray-600">Avg Days Open</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-purple-600">{criticalIssues.length}</div>
                <div className="text-sm text-gray-600">Total Issues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Issues Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Active Critical Issues</h2>
              <div className="flex space-x-2">
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Escalated to CEO">Escalated to CEO</option>
                </select>
              </div>
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
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">{getSeverityIcon(issue.severity)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                          <div className="text-sm text-gray-500">{issue.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{issue.company}</div>
                      <div className="text-sm text-gray-500">Assigned: {issue.assignedTo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{issue.status}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getDaysOpenColor(issue.daysOpen)}`}>
                        {issue.daysOpen} days
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{issue.impact}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 mr-3 flex items-center">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        Escalate
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Issue Priority Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Issue Priority Distribution</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                    <span className="text-sm font-medium">Critical Issues</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">{criticalCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                    <span className="text-sm font-medium">High Priority</span>
                  </div>
                  <span className="text-sm font-bold text-orange-600">{highCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                    <span className="text-sm font-medium">Medium Priority</span>
                  </div>
                  <span className="text-sm font-bold text-yellow-600">{criticalIssues.length - criticalCount - highCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Recent Escalations</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {criticalIssues.filter(issue => issue.status === 'Escalated to CEO').map((issue) => (
                  <div key={issue.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{issue.title}</div>
                        <div className="text-sm text-gray-500">{issue.company}</div>
                        <div className="text-xs text-red-600 mt-1">Escalated {issue.daysOpen} days ago</div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                  </div>
                ))}
                {criticalIssues.filter(issue => issue.status === 'Under Investigation').slice(0, 2).map((issue) => (
                  <div key={issue.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{issue.title}</div>
                        <div className="text-sm text-gray-500">{issue.company}</div>
                        <div className="text-xs text-yellow-600 mt-1">Under investigation for {issue.daysOpen} days</div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}