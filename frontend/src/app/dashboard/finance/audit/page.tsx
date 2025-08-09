'use client';

import { useState } from 'react';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
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

export default function AuditLogsPage() {
  const [activeTab, setActiveTab] = useState('audit');
  const [dateRange, setDateRange] = useState('last7');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

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

  // Mock data for audit logs
  const auditLogs = [
    { id: 'LOG-2023-0145', user: 'Michael Addo', role: 'Finance Officer', action: 'Payment Verification', details: 'Verified payment TRX-2023-0541 for Tullow Ghana Ltd', timestamp: '2023-05-31 14:32:45', ip: '192.168.1.45' },
    { id: 'LOG-2023-0144', user: 'Sarah Mensah', role: 'Finance Officer', action: 'Invoice Generation', details: 'Generated invoice INV-2023-0046 for Eni Ghana', timestamp: '2023-05-31 11:15:22', ip: '192.168.1.46' },
    { id: 'LOG-2023-0143', user: 'Michael Addo', role: 'Finance Officer', action: 'Fee Update', details: 'Updated Permit Fee from ₵4,500 to ₵5,000', timestamp: '2023-05-30 16:45:10', ip: '192.168.1.45' },
    { id: 'LOG-2023-0142', user: 'John Osei', role: 'Commission Admin', action: 'Payment Approval', details: 'Approved payment TRX-2023-0539 for Kosmos Energy', timestamp: '2023-05-30 14:22:33', ip: '192.168.1.30' },
    { id: 'LOG-2023-0141', user: 'Michael Addo', role: 'Finance Officer', action: 'Receipt Generation', details: 'Generated receipt REC-2023-0043 for Kosmos Energy', timestamp: '2023-05-29 15:10:05', ip: '192.168.1.45' },
    { id: 'LOG-2023-0140', user: 'Kwame Darko', role: 'Local Content Officer', action: 'Report Access', details: 'Accessed Monthly Revenue Report for May 2023', timestamp: '2023-05-29 11:05:18', ip: '192.168.1.50' },
    { id: 'LOG-2023-0139', user: 'Sarah Mensah', role: 'Finance Officer', action: 'Payment Verification', details: 'Verified payment TRX-2023-0538 for Baker Hughes Ghana', timestamp: '2023-05-28 09:45:32', ip: '192.168.1.46' },
    { id: 'LOG-2023-0138', user: 'Michael Addo', role: 'Finance Officer', action: 'Invoice Generation', details: 'Generated invoice INV-2023-0045 for Tullow Ghana Ltd', timestamp: '2023-05-28 08:30:15', ip: '192.168.1.45' },
    { id: 'LOG-2023-0137', user: 'Abena Osei', role: 'Personnel Officer', action: 'Payment Upload', details: 'Uploaded payment receipt for TRX-2023-0537', timestamp: '2023-05-27 16:20:45', ip: '192.168.1.35' },
    { id: 'LOG-2023-0136', user: 'John Osei', role: 'Commission Admin', action: 'Fee Structure View', details: 'Viewed current fee structure', timestamp: '2023-05-27 14:15:30', ip: '192.168.1.30' },
  ];

  // Filter audit logs based on search query and filters
  const filteredLogs = auditLogs.filter(log => {
    // Search query filter
    if (searchQuery && !(
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }
    
    // Action filter
    if (filterAction !== 'all' && log.action.toLowerCase() !== filterAction.toLowerCase()) {
      return false;
    }
    
    // User filter
    if (filterUser !== 'all' && log.user !== filterUser) {
      return false;
    }
    
    return true;
  });

  // Get unique users for filter dropdown
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user))];
  
  // Get unique actions for filter dropdown
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

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
            <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Export Logs
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
                Print Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select 
                id="dateRange" 
                name="dateRange" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="actionFilter" className="block text-sm font-medium text-gray-700 mb-1">Action</label>
              <select 
                id="actionFilter" 
                name="actionFilter" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
              >
                <option value="all">All Actions</option>
                {uniqueActions.map((action, index) => (
                  <option key={index} value={action}>{action}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="userFilter" className="block text-sm font-medium text-gray-700 mb-1">User</label>
              <select 
                id="userFilter" 
                name="userFilter" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterUser}
                onChange={(e) => setFilterUser(e.target.value)}
              >
                <option value="all">All Users</option>
                {uniqueUsers.map((user, index) => (
                  <option key={index} value={user}>{user}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                id="search" 
                name="search" 
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by ID, user, or details"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" id="startDate" name="startDate" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" id="endDate" name="endDate" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Log ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        log.action.includes('Verification') ? 'bg-green-100 text-green-800' : 
                        log.action.includes('Generation') ? 'bg-blue-100 text-blue-800' : 
                        log.action.includes('Update') ? 'bg-yellow-100 text-yellow-800' : 
                        log.action.includes('Approval') ? 'bg-purple-100 text-purple-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{log.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No audit logs found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{auditLogs.length}</span> logs
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Total Activities</h4>
              <p className="text-2xl font-bold text-blue-600">10</p>
              <p className="text-sm text-blue-500">Last 7 days</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Payment Verifications</h4>
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-sm text-green-500">Last 7 days</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-800">Invoice Generations</h4>
              <p className="text-2xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-yellow-500">Last 7 days</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800">Fee Updates</h4>
              <p className="text-2xl font-bold text-purple-600">1</p>
              <p className="text-sm text-purple-500">Last 7 days</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}