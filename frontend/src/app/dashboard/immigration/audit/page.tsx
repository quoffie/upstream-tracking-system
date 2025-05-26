'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
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
  ReportIcon
} from '../../../components/icons/DashboardIcons';

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState('audit');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterTimeframe, setFilterTimeframe] = useState('all');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/immigration', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Permit Approvals', href: '/dashboard/immigration/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Application Review', href: '/dashboard/immigration/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status', href: '/dashboard/immigration/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Issued Permits', href: '/dashboard/immigration/permits', icon: PermitIcon, current: activeTab === 'permits' },
    { name: 'Approval History', href: '/dashboard/immigration/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Reports', href: '/dashboard/immigration/reports', icon: ReportIcon, current: activeTab === 'reports' },
    { name: 'Notifications', href: '/dashboard/immigration/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/immigration/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/immigration/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  // Define type for audit log
type AuditLog = {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipAddress: string;
  applicationId: string | null;
};

// Mock data for audit logs
const auditLogs: AuditLog[] = [
    {
      id: 'LOG-2023-0001',
      timestamp: '2023-12-15 09:23:45',
      user: 'John Mensah',
      role: 'Immigration Officer',
      action: 'Permit Issued',
      details: 'Issued work permit #GIS-REG-2023-129 to Thomas Wilson',
      ipAddress: '192.168.1.45',
      applicationId: 'APP-2023-0142'
    },
    {
      id: 'LOG-2023-0002',
      timestamp: '2023-12-15 10:15:22',
      user: 'Sarah Owusu',
      role: 'Immigration Officer',
      action: 'Application Rejected',
      details: 'Rejected permit application for Michael Brown due to missing documentation',
      ipAddress: '192.168.1.46',
      applicationId: 'APP-2023-0140'
    },
    {
      id: 'LOG-2023-0003',
      timestamp: '2023-12-14 14:30:10',
      user: 'John Mensah',
      role: 'Immigration Officer',
      action: 'Permit Issued',
      details: 'Issued rotator permit #GIS-ROT-2023-128 to Emma Johnson',
      ipAddress: '192.168.1.45',
      applicationId: 'APP-2023-0141'
    },
    {
      id: 'LOG-2023-0004',
      timestamp: '2023-12-14 16:45:33',
      user: 'Admin',
      role: 'System Administrator',
      action: 'User Login',
      details: 'Administrator logged into the system',
      ipAddress: '192.168.1.1',
      applicationId: null
    },
    {
      id: 'LOG-2023-0005',
      timestamp: '2023-12-13 11:20:15',
      user: 'Sarah Owusu',
      role: 'Immigration Officer',
      action: 'Document Uploaded',
      details: 'Uploaded supporting documents for application APP-2023-0139',
      ipAddress: '192.168.1.46',
      applicationId: 'APP-2023-0139'
    },
    {
      id: 'LOG-2023-0006',
      timestamp: '2023-12-12 09:10:05',
      user: 'John Mensah',
      role: 'Immigration Officer',
      action: 'Permit Revoked',
      details: 'Revoked work permit #GIS-REG-2023-110 for Richard Wong due to violation of terms',
      ipAddress: '192.168.1.45',
      applicationId: 'APP-2023-0110'
    },
    {
      id: 'LOG-2023-0007',
      timestamp: '2023-12-11 15:30:22',
      user: 'Sarah Owusu',
      role: 'Immigration Officer',
      action: 'Permit Renewed',
      details: 'Renewed work permit #GIS-REG-2023-095 for Jennifer Chen for additional 12 months',
      ipAddress: '192.168.1.46',
      applicationId: 'APP-2023-0137'
    },
    {
      id: 'LOG-2023-0008',
      timestamp: '2023-12-10 10:45:18',
      user: 'System',
      role: 'Automated Process',
      action: 'Notification Sent',
      details: 'Expiry notification sent for 5 permits due to expire in 30 days',
      ipAddress: '192.168.1.2',
      applicationId: null
    },
    {
      id: 'LOG-2023-0009',
      timestamp: '2023-12-09 14:20:33',
      user: 'John Mensah',
      role: 'Immigration Officer',
      action: 'Report Generated',
      details: 'Generated monthly permit issuance report for November 2023',
      ipAddress: '192.168.1.45',
      applicationId: null
    },
    {
      id: 'LOG-2023-0010',
      timestamp: '2023-12-08 16:15:40',
      user: 'Sarah Owusu',
      role: 'Immigration Officer',
      action: 'Permit Issued',
      details: 'Issued work permit #GIS-REG-2023-127 to David Lee',
      ipAddress: '192.168.1.46',
      applicationId: 'APP-2023-0138'
    },
  ];

  // Filter audit logs based on search query and filters
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.applicationId && log.applicationId.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    
    let matchesTimeframe = true;
    if (filterTimeframe !== 'all') {
      const today = new Date();
      const logDate = new Date(log.timestamp);
      const daysDiff = Math.floor((today.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filterTimeframe) {
        case '7':
          matchesTimeframe = daysDiff <= 7;
          break;
        case '30':
          matchesTimeframe = daysDiff <= 30;
          break;
        case '90':
          matchesTimeframe = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesAction && matchesTimeframe;
  });

  const handleViewDetails = (id: string) => {
    alert(`Viewing details for log ${id}`);
  };

  const handleExportLogs = () => {
    alert('Exporting audit logs...');
  };

  return (
    <DashboardLayout
      title="Audit Logs"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleExportLogs}
            >
              Export Logs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by ID, user, details, or application ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-48">
                <select
                  id="action-filter"
                  name="action-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                >
                  <option value="all">All Actions</option>
                  <option value="Permit Issued">Permit Issued</option>
                  <option value="Application Rejected">Application Rejected</option>
                  <option value="Permit Revoked">Permit Revoked</option>
                  <option value="Permit Renewed">Permit Renewed</option>
                  <option value="Document Uploaded">Document Uploaded</option>
                  <option value="User Login">User Login</option>
                  <option value="Report Generated">Report Generated</option>
                  <option value="Notification Sent">Notification Sent</option>
                </select>
              </div>
              <div className="w-40">
                <select
                  id="timeframe-filter"
                  name="timeframe-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterTimeframe}
                  onChange={(e) => setFilterTimeframe(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.user}
                        <div className="text-xs text-gray-400">{log.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.action.includes('Issued') ? 'bg-green-100 text-green-800' : log.action.includes('Rejected') ? 'bg-red-100 text-red-800' : log.action.includes('Revoked') ? 'bg-red-100 text-red-800' : log.action.includes('Renewed') ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {log.details}
                        {log.applicationId && (
                          <div className="text-xs text-blue-500 mt-1">Application: {log.applicationId}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleViewDetails(log.id)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No audit logs found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}