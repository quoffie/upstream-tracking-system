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

export default function NotificationsEscalationsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  // Mock data for notifications and escalations
  const notifications = [
    {
      id: 'NOT-2023-0045',
      type: 'Escalation',
      title: 'Application Overdue - Requires Immediate Attention',
      message: 'Application APP-2023-0048 from Kosmos Energy has been pending in Technical Review stage for 7 days, exceeding the 5-day SLA.',
      priority: 'High',
      category: 'SLA Breach',
      applicationId: 'APP-2023-0048',
      company: 'Kosmos Energy',
      assignedTo: 'Commission Admin',
      createdBy: 'System',
      timestamp: '2023-05-30 14:30:00',
      status: 'Unread',
      actionRequired: true
    },
    {
      id: 'NOT-2023-0044',
      type: 'Alert',
      title: 'Payment Verification Required',
      message: 'Payment for application APP-2023-0049 from Eni Ghana requires manual verification due to amount discrepancy.',
      priority: 'Medium',
      category: 'Payment Issue',
      applicationId: 'APP-2023-0049',
      company: 'Eni Ghana',
      assignedTo: 'Finance Officer',
      createdBy: 'Payment System',
      timestamp: '2023-05-30 11:15:00',
      status: 'Read',
      actionRequired: true
    },
    {
      id: 'NOT-2023-0043',
      type: 'Information',
      title: 'Application Approved Successfully',
      message: 'Application APP-2023-0045 from Total Ghana has been successfully approved and certificate generated.',
      priority: 'Low',
      category: 'Status Update',
      applicationId: 'APP-2023-0045',
      company: 'Total Ghana',
      assignedTo: 'Commission Admin',
      createdBy: 'Workflow System',
      timestamp: '2023-05-30 09:45:00',
      status: 'Read',
      actionRequired: false
    },
    {
      id: 'NOT-2023-0042',
      type: 'Escalation',
      title: 'Multiple Failed Payment Attempts',
      message: 'Application APP-2023-0047 from Baker Hughes Ghana has had 3 failed payment attempts. Manual intervention required.',
      priority: 'High',
      category: 'Payment Failure',
      applicationId: 'APP-2023-0047',
      company: 'Baker Hughes Ghana',
      assignedTo: 'Finance Officer',
      createdBy: 'Payment System',
      timestamp: '2023-05-29 16:20:00',
      status: 'Acknowledged',
      actionRequired: true
    },
    {
      id: 'NOT-2023-0041',
      type: 'Warning',
      title: 'Document Expiry Alert',
      message: 'Supporting documents for application APP-2023-0046 from Schlumberger Ghana will expire in 7 days.',
      priority: 'Medium',
      category: 'Document Expiry',
      applicationId: 'APP-2023-0046',
      company: 'Schlumberger Ghana',
      assignedTo: 'Document Reviewer',
      createdBy: 'Document System',
      timestamp: '2023-05-29 10:00:00',
      status: 'Read',
      actionRequired: true
    },
    {
      id: 'NOT-2023-0040',
      type: 'Information',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled system maintenance on June 1st, 2023 from 2:00 AM to 4:00 AM. All services will be temporarily unavailable.',
      priority: 'Low',
      category: 'System Maintenance',
      applicationId: null,
      company: null,
      assignedTo: 'All Users',
      createdBy: 'System Administrator',
      timestamp: '2023-05-28 15:30:00',
      status: 'Read',
      actionRequired: false
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (notification.company && notification.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const handleMarkAsRead = (id: string) => {
    alert(`Marking notification ${id} as read`);
  };

  const handleMarkAsUnread = (id: string) => {
    alert(`Marking notification ${id} as unread`);
  };

  const handleAcknowledge = (id: string) => {
    alert(`Acknowledging notification ${id}`);
  };

  const handleTakeAction = (id: string, applicationId: string | null) => {
    if (applicationId) {
      alert(`Taking action on notification ${id} for application ${applicationId}`);
    } else {
      alert(`Taking action on notification ${id}`);
    }
  };

  const handleDismiss = (id: string) => {
    alert(`Dismissing notification ${id}`);
  };

  const handleMarkAllAsRead = () => {
    alert('Marking all notifications as read');
  };

  const handleCreateNotification = () => {
    alert('Opening notification creation form');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Escalation': return 'text-red-600 bg-red-100';
      case 'Alert': return 'text-orange-600 bg-orange-100';
      case 'Warning': return 'text-yellow-600 bg-yellow-100';
      case 'Information': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unread': return 'text-red-600 bg-red-100';
      case 'Read': return 'text-blue-600 bg-blue-100';
      case 'Acknowledged': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const unreadCount = filteredNotifications.filter(n => n.status === 'Unread').length;
  const escalationCount = filteredNotifications.filter(n => n.type === 'Escalation').length;
  const actionRequiredCount = filteredNotifications.filter(n => n.actionRequired).length;

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
              <h2 className="text-2xl font-bold text-gray-900">Notifications & Escalations</h2>
              <p className="text-sm text-gray-500">Manage system notifications and escalated issues</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
              >
                Mark All Read
              </button>
              <button 
                onClick={handleCreateNotification}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Create Notification
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Escalation">Escalation</option>
                <option value="Alert">Alert</option>
                <option value="Warning">Warning</option>
                <option value="Information">Information</option>
              </select>
            </div>
            <div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">Unread</h3>
              <p className="text-2xl font-bold text-red-600">{unreadCount}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-orange-900">Escalations</h3>
              <p className="text-2xl font-bold text-orange-600">{escalationCount}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">Action Required</h3>
              <p className="text-2xl font-bold text-yellow-600">{actionRequiredCount}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900">Total</h3>
              <p className="text-2xl font-bold text-blue-600">{filteredNotifications.length}</p>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-6 ${
                  notification.status === 'Unread' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
                } ${
                  notification.priority === 'High' ? 'border-l-4 border-l-red-500' : 
                  notification.priority === 'Medium' ? 'border-l-4 border-l-yellow-500' : 
                  'border-l-4 border-l-green-500'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                    {notification.actionRequired && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-purple-600 bg-purple-100">
                        Action Required
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{notification.timestamp}</p>
                    <p className="text-xs text-gray-400">ID: {notification.id}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{notification.message}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500">Category:</span>
                    <p className="text-gray-900">{notification.category}</p>
                  </div>
                  {notification.applicationId && (
                    <div>
                      <span className="font-medium text-gray-500">Application:</span>
                      <p className="text-blue-600 hover:text-blue-900 cursor-pointer">
                        {notification.applicationId}
                      </p>
                    </div>
                  )}
                  {notification.company && (
                    <div>
                      <span className="font-medium text-gray-500">Company:</span>
                      <p className="text-gray-900">{notification.company}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-500">Assigned To:</span>
                    <p className="text-gray-900">{notification.assignedTo}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {notification.status === 'Unread' ? (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMarkAsUnread(notification.id)}
                      className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    >
                      Mark as Unread
                    </button>
                  )}
                  
                  {notification.status !== 'Acknowledged' && notification.type === 'Escalation' && (
                    <button
                      onClick={() => handleAcknowledge(notification.id)}
                      className="text-green-600 hover:text-green-900 text-sm font-medium"
                    >
                      Acknowledge
                    </button>
                  )}
                  
                  {notification.actionRequired && (
                    <button
                      onClick={() => handleTakeAction(notification.id, notification.applicationId)}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium"
                    >
                      Take Action
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDismiss(notification.id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No notifications found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Escalation Rules</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Application pending &lt; 5 days</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment verification &lt; 2 days</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Document expiry &lt; 7 days</span>
                  <span className="text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed payment attempts &lt; 3</span>
                  <span className="text-green-600">Active</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Notification Preferences</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Email notifications</span>
                  <span className="text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span>SMS alerts for high priority</span>
                  <span className="text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span>Desktop notifications</span>
                  <span className="text-yellow-600">Disabled</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily summary reports</span>
                  <span className="text-green-600">Enabled</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              Update Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}