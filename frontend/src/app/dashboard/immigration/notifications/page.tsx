'use client';

import { useState } from 'react';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
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

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedReadStatus, setSelectedReadStatus] = useState('all');

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

  // Mock data for notifications
  const notifications = [
    {
      id: 'NOTIF-2024-0045',
      type: 'Application',
      title: 'New Application Submitted',
      message: 'A new permit application (APP-2024-0145) has been submitted by Offshore Solutions Ltd and requires your review.',
      date: '2024-01-15',
      time: '09:15 AM',
      read: false,
      priority: 'Medium',
      relatedId: 'APP-2024-0145',
      actionRequired: true,
      actionType: 'Review'
    },
    {
      id: 'NOTIF-2024-0044',
      type: 'Application',
      title: 'New Application Submitted',
      message: 'A new permit application (APP-2024-0144) has been submitted by DeepWater Drilling Co and requires your review.',
      date: '2024-01-14',
      time: '14:30 PM',
      read: false,
      priority: 'Medium',
      relatedId: 'APP-2024-0144',
      actionRequired: true,
      actionType: 'Review'
    },
    {
      id: 'NOTIF-2024-0043',
      type: 'Payment',
      title: 'Payment Received',
      message: 'Payment for permit application APP-2024-0142 has been received and verified.',
      date: '2024-01-14',
      time: '10:45 AM',
      read: true,
      priority: 'Low',
      relatedId: 'APP-2024-0142',
      actionRequired: false,
      actionType: null
    },
    {
      id: 'NOTIF-2024-0042',
      type: 'Workflow',
      title: 'Application Ready for Review',
      message: 'Permit application APP-2024-0142 has received PC approval and is now ready for immigration review.',
      date: '2024-01-14',
      time: '09:30 AM',
      read: false,
      priority: 'High',
      relatedId: 'APP-2024-0142',
      actionRequired: true,
      actionType: 'Review'
    },
    {
      id: 'NOTIF-2024-0041',
      type: 'Expiry',
      title: 'Permit Expiring Soon',
      message: 'Permit GIS-REG-2023-095 for John Smith will expire in 14 days on 2024-01-28.',
      date: '2024-01-14',
      time: '08:00 AM',
      read: true,
      priority: 'Medium',
      relatedId: 'GIS-REG-2023-095',
      actionRequired: false,
      actionType: null
    },
    {
      id: 'NOTIF-2024-0040',
      type: 'Approval',
      title: 'Permit Approved',
      message: 'Permit application APP-2024-0140 for Anna Schmidt has been approved and is ready for certificate issuance.',
      date: '2024-01-13',
      time: '16:45 PM',
      read: true,
      priority: 'High',
      relatedId: 'APP-2024-0140',
      actionRequired: true,
      actionType: 'Issue Certificate'
    },
    {
      id: 'NOTIF-2024-0039',
      type: 'System',
      title: 'System Maintenance',
      message: 'The system will undergo scheduled maintenance on Sunday, January 21, 2024, from 02:00 AM to 06:00 AM GMT.',
      date: '2024-01-13',
      time: '15:00 PM',
      read: true,
      priority: 'Low',
      relatedId: null,
      actionRequired: false,
      actionType: null
    },
    {
      id: 'NOTIF-2024-0038',
      type: 'Expiry',
      title: 'Permit Expiring Soon',
      message: 'Permit GIS-REG-2023-087 for Maria Garcia will expire in 7 days on 2024-01-20.',
      date: '2024-01-13',
      time: '08:00 AM',
      read: false,
      priority: 'High',
      relatedId: 'GIS-REG-2023-087',
      actionRequired: true,
      actionType: 'Notify'
    },
    {
      id: 'NOTIF-2024-0037',
      type: 'Certificate',
      title: 'Certificate Issued',
      message: 'Certificate CERT-2024-0138 has been issued for permit GIS-ROT-2024-138 and emailed to the applicant.',
      date: '2024-01-12',
      time: '14:15 PM',
      read: true,
      priority: 'Medium',
      relatedId: 'CERT-2024-0138',
      actionRequired: false,
      actionType: null
    },
    {
      id: 'NOTIF-2024-0036',
      type: 'Information',
      title: 'Additional Information Received',
      message: 'Additional information requested for application APP-2023-0130 has been received from EuroGas Exploration.',
      date: '2024-01-12',
      time: '11:30 AM',
      read: false,
      priority: 'Medium',
      relatedId: 'APP-2023-0130',
      actionRequired: true,
      actionType: 'Review'
    },
    {
      id: 'NOTIF-2024-0035',
      type: 'Expiry',
      title: 'Document Expiry Alert',
      message: 'Medical certificate for permit holder GIS-REG-2023-102 (David Wilson) will expire in 7 days.',
      date: '2024-01-11',
      time: '08:00 AM',
      read: true,
      priority: 'Medium',
      relatedId: 'GIS-REG-2023-102',
      actionRequired: true,
      actionType: 'Notify'
    },
    {
      id: 'NOTIF-2024-0034',
      type: 'Rejection',
      title: 'Application Rejected',
      message: 'Application APP-2024-0125 for work permit has been rejected due to insufficient documentation.',
      date: '2024-01-10',
      time: '15:45 PM',
      read: true,
      priority: 'Medium',
      relatedId: 'APP-2024-0125',
      actionRequired: false,
      actionType: null
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (notification.relatedId && notification.relatedId.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesReadStatus = selectedReadStatus === 'all' || 
                             (selectedReadStatus === 'read' && notification.read) ||
                             (selectedReadStatus === 'unread' && !notification.read);
    
    let matchesTimeframe = true;
    if (selectedTimeframe !== 'all') {
      const today = new Date();
      const notificationDate = new Date(notification.date);
      const daysDiff = Math.floor((today.getTime() - notificationDate.getTime()) / (1000 * 60 * 60 * 24));
      const daysCutoff = parseInt(selectedTimeframe);
      matchesTimeframe = daysDiff <= daysCutoff;
    }
    
    return matchesSearch && matchesType && matchesReadStatus && matchesTimeframe;
  });

  const handleViewNotification = (id: string) => {
    alert(`Viewing notification ${id}`);
    // In a real implementation, this would mark the notification as read
  };

  const handleMarkAsRead = (id: string) => {
    alert(`Marking notification ${id} as read`);
    // In a real implementation, this would update the notification's read status
  };

  const handleMarkAllAsRead = () => {
    alert('Marking all notifications as read');
    // In a real implementation, this would update all notifications' read status
  };

  const handleDeleteNotification = (id: string) => {
    alert(`Deleting notification ${id}`);
    // In a real implementation, this would remove the notification
  };

  const handleTakeAction = (id: string, actionType: string) => {
    alert(`Taking action ${actionType} for notification ${id}`);
    // In a real implementation, this would navigate to the appropriate page or open a modal
  };

  return (
    <DashboardLayout
      title="Ghana Immigration Service Dashboard"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleMarkAllAsRead}
            >
              Mark All as Read
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search notifications by title, message, or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                id="type"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Application">Application</option>
                <option value="Approval">Approval</option>
                <option value="Certificate">Certificate</option>
                <option value="Expiry">Expiry</option>
                <option value="Payment">Payment</option>
                <option value="Rejection">Rejection</option>
                <option value="System">System</option>
                <option value="Workflow">Workflow</option>
                <option value="Information">Information</option>
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="readStatus" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="readStatus"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={selectedReadStatus}
                onChange={(e) => setSelectedReadStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                id="timeframe"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="1">Today</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">All Notifications ({filteredNotifications.length})</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-6 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <span className={
                          `inline-block h-2 w-2 rounded-full mr-2
                          ${notification.priority === 'High' ? 'bg-red-500' : ''}
                          ${notification.priority === 'Medium' ? 'bg-yellow-500' : ''}
                          ${notification.priority === 'Low' ? 'bg-green-500' : ''}`
                        }></span>
                        <span className="font-semibold">{notification.title}</span>
                        {!notification.read && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500">{notification.date} {notification.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                        {notification.type}
                      </span>
                      {notification.relatedId && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          ID: {notification.relatedId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewNotification(notification.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                  {notification.actionRequired && (
                    <button
                      onClick={() => handleTakeAction(notification.id, notification.actionType!)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {notification.actionType}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filteredNotifications.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No notifications match your filters.
            </div>
          )}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}