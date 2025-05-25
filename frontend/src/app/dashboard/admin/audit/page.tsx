'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  PaymentIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon
} from '../../../components/icons/DashboardIcons';

export default function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState('audit');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('7');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Approvals Queue', href: '/dashboard/admin/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Applications Tracker', href: '/dashboard/admin/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status Viewer', href: '/dashboard/admin/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Payments & Transactions', href: '/dashboard/admin/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'Notifications & Escalations', href: '/dashboard/admin/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/admin/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/admin/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  // Mock data for audit logs
  const auditLogs = [
    {
      id: 'AUDIT-2023-1245',
      timestamp: '2023-05-30 15:45:23',
      user: 'Commission Admin',
      userRole: 'Admin',
      action: 'Application Approved',
      resource: 'Application',
      resourceId: 'APP-2023-0050',
      details: 'Approved application for Regular Permit from Tullow Ghana Ltd',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'High',
      category: 'Application Management'
    },
    {
      id: 'AUDIT-2023-1244',
      timestamp: '2023-05-30 14:32:15',
      user: 'Finance Officer',
      userRole: 'Finance',
      action: 'Payment Verified',
      resource: 'Payment',
      resourceId: 'TXN-2023-0125',
      details: 'Verified payment of GHS 2,500 for application APP-2023-0050',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'Medium',
      category: 'Financial Operations'
    },
    {
      id: 'AUDIT-2023-1243',
      timestamp: '2023-05-30 13:20:45',
      user: 'Sarah Wilson',
      userRole: 'Reviewer',
      action: 'Application Forwarded',
      resource: 'Application',
      resourceId: 'APP-2023-0049',
      details: 'Forwarded application for Company Registration from Eni Ghana to Commission Admin for final approval',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      severity: 'Medium',
      category: 'Application Management'
    },
    {
      id: 'AUDIT-2023-1242',
      timestamp: '2023-05-30 11:15:30',
      user: 'System',
      userRole: 'System',
      action: 'Login Attempt Failed',
      resource: 'User Account',
      resourceId: 'user-mike-johnson',
      details: 'Failed login attempt for user mike.johnson@petroleum.gov.gh - Invalid password',
      ipAddress: '192.168.1.115',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'High',
      category: 'Security'
    },
    {
      id: 'AUDIT-2023-1241',
      timestamp: '2023-05-30 10:45:12',
      user: 'Local Content Officer',
      userRole: 'Local Content',
      action: 'Document Updated',
      resource: 'Document',
      resourceId: 'DOC-2023-0156',
      details: 'Updated local content compliance document for Schlumberger Ghana application',
      ipAddress: '192.168.1.120',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'Low',
      category: 'Document Management'
    },
    {
      id: 'AUDIT-2023-1240',
      timestamp: '2023-05-30 09:30:00',
      user: 'Commission Admin',
      userRole: 'Admin',
      action: 'User Account Created',
      resource: 'User Account',
      resourceId: 'user-new-reviewer',
      details: 'Created new user account for Jane Smith as Reviewer',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'High',
      category: 'User Management'
    },
    {
      id: 'AUDIT-2023-1239',
      timestamp: '2023-05-29 16:45:33',
      user: 'Mike Johnson',
      userRole: 'Reviewer',
      action: 'Application Rejected',
      resource: 'Application',
      resourceId: 'APP-2023-0047',
      details: 'Rejected application for JV Compliance from Baker Hughes Ghana - Incomplete documentation',
      ipAddress: '192.168.1.125',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'Medium',
      category: 'Application Management'
    },
    {
      id: 'AUDIT-2023-1238',
      timestamp: '2023-05-29 15:20:18',
      user: 'System',
      userRole: 'System',
      action: 'Backup Completed',
      resource: 'Database',
      resourceId: 'db-backup-20230529',
      details: 'Automated daily database backup completed successfully',
      ipAddress: 'localhost',
      userAgent: 'System Process',
      severity: 'Low',
      category: 'System Operations'
    },
    {
      id: 'AUDIT-2023-1237',
      timestamp: '2023-05-29 14:10:45',
      user: 'Finance Officer',
      userRole: 'Finance',
      action: 'Payment Refunded',
      resource: 'Payment',
      resourceId: 'TXN-2023-0121',
      details: 'Processed refund of GHS 2,000 for cancelled application APP-2023-0046',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'Medium',
      category: 'Financial Operations'
    },
    {
      id: 'AUDIT-2023-1236',
      timestamp: '2023-05-29 12:30:22',
      user: 'Commission Admin',
      userRole: 'Admin',
      action: 'System Settings Updated',
      resource: 'System Configuration',
      resourceId: 'config-notification-rules',
      details: 'Updated notification escalation rules for overdue applications',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      severity: 'High',
      category: 'System Configuration'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resourceId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    const matchesUser = filterUser === 'all' || log.user === filterUser;
    const daysCutoff = parseInt(selectedTimeframe);
    const logDate = new Date(log.timestamp);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysCutoff);
    const matchesTimeframe = selectedTimeframe === 'all' || logDate >= cutoffDate;
    return matchesSearch && matchesAction && matchesUser && matchesTimeframe;
  });

  const handleViewDetails = (id: string) => {
    alert(`Viewing detailed audit log for ${id}`);
  };

  const handleExportLogs = () => {
    alert('Exporting audit logs...');
  };

  const handleGenerateReport = () => {
    alert('Generating audit report...');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Security': return 'text-red-600 bg-red-100';
      case 'Application Management': return 'text-blue-600 bg-blue-100';
      case 'Financial Operations': return 'text-green-600 bg-green-100';
      case 'User Management': return 'text-purple-600 bg-purple-100';
      case 'System Operations': return 'text-gray-600 bg-gray-100';
      case 'System Configuration': return 'text-orange-600 bg-orange-100';
      case 'Document Management': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];

  return (
    <DashboardLayout
      title="Commission Admin Dashboard"
      userRole="Commission Admin"
      userName="Admin Panel"
      userInitials="CA"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
              <p className="text-sm text-gray-500">Track all system activities and user actions</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
              >
                Generate Report
              </button>
              <button 
                onClick={handleExportLogs}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Export Logs
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Users</option>
                {uniqueUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900">Total Logs</h3>
              <p className="text-2xl font-bold text-blue-600">{filteredLogs.length}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">High Severity</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredLogs.filter(log => log.severity === 'High').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">Security Events</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredLogs.filter(log => log.category === 'Security').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">System Operations</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredLogs.filter(log => log.category === 'System Operations').length}
              </p>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.user}</div>
                        <div className="text-sm text-gray-500">{log.userRole}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.resource}</div>
                        <div className="text-sm text-gray-500">{log.resourceId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(log.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No audit logs found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Audit Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Activity by Category</h4>
              <div className="space-y-2">
                {['Application Management', 'Financial Operations', 'Security', 'User Management', 'System Operations', 'Document Management'].map(category => {
                  const count = filteredLogs.filter(log => log.category === category).length;
                  return (
                    <div key={category} className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Top Users</h4>
              <div className="space-y-2">
                {uniqueUsers.slice(0, 6).map(user => {
                  const count = filteredLogs.filter(log => log.user === user).length;
                  return (
                    <div key={user} className="flex justify-between text-sm">
                      <span>{user}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}