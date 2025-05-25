'use client';

import { useState } from 'react';
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

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [currentView, setCurrentView] = useState('all'); // 'all', 'unread', 'payments', 'system'

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

  // Mock data for notifications
  const notifications = [
    { 
      id: 'NOTIF-2023-0056', 
      type: 'payment', 
      title: 'New Payment Received', 
      message: 'Tullow Ghana Ltd has submitted a payment of ₵5,000 for Permit Fee.', 
      timestamp: '2023-05-31 14:30:22', 
      read: false,
      actionRequired: true,
      actionText: 'Verify Payment',
      actionLink: '/dashboard/finance/verification'
    },
    { 
      id: 'NOTIF-2023-0055', 
      type: 'system', 
      title: 'Fee Structure Updated', 
      message: 'The fee structure has been updated. Permit Fee is now ₵5,000.', 
      timestamp: '2023-05-30 16:45:30', 
      read: false,
      actionRequired: false
    },
    { 
      id: 'NOTIF-2023-0054', 
      type: 'payment', 
      title: 'Payment Verification Required', 
      message: 'Baker Hughes Ghana has submitted a payment of ₵5,000 for Permit Fee. Verification required.', 
      timestamp: '2023-05-28 09:15:10', 
      read: true,
      actionRequired: true,
      actionText: 'Verify Payment',
      actionLink: '/dashboard/finance/verification'
    },
    { 
      id: 'NOTIF-2023-0053', 
      type: 'invoice', 
      title: 'Invoice Generated', 
      message: 'Invoice INV-2023-0045 has been generated for Tullow Ghana Ltd.', 
      timestamp: '2023-05-28 08:30:45', 
      read: true,
      actionRequired: false
    },
    { 
      id: 'NOTIF-2023-0052', 
      type: 'payment', 
      title: 'Payment Verified', 
      message: 'Payment TRX-2023-0537 from Schlumberger Ghana has been verified.', 
      timestamp: '2023-05-27 16:22:15', 
      read: true,
      actionRequired: false
    },
    { 
      id: 'NOTIF-2023-0051', 
      type: 'system', 
      title: 'Monthly Report Available', 
      message: 'The revenue report for April 2023 is now available.', 
      timestamp: '2023-05-01 08:00:00', 
      read: true,
      actionRequired: true,
      actionText: 'View Report',
      actionLink: '/dashboard/finance/analytics'
    },
    { 
      id: 'NOTIF-2023-0050', 
      type: 'payment', 
      title: 'Payment Overdue', 
      message: 'Payment for Invoice INV-2023-0042 from Baker Hughes Ghana is overdue.', 
      timestamp: '2023-04-27 09:00:00', 
      read: true,
      actionRequired: true,
      actionText: 'Send Reminder',
      actionLink: '/dashboard/finance/invoices'
    },
  ];

  // Filter notifications based on current view
  const filteredNotifications = notifications.filter(notification => {
    if (currentView === 'all') return true;
    if (currentView === 'unread') return !notification.read;
    if (currentView === 'payments') return notification.type === 'payment';
    if (currentView === 'system') return notification.type === 'system';
    return true;
  });

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Mark all as read function
  const markAllAsRead = () => {
    // In a real application, this would make an API call
    alert('All notifications marked as read');
  };

  // Mark single notification as read
  const markAsRead = (id: string) => {
    // In a real application, this would make an API call
    alert(`Notification ${id} marked as read`);
  };

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
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Notifications & Alerts</h2>
              <p className="text-sm text-gray-500 mt-1">
                You have <span className="font-medium text-blue-600">{unreadCount}</span> unread notifications
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={markAllAsRead} 
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Mark All as Read
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
                Settings
              </button>
            </div>
          </div>
          
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              onClick={() => setCurrentView('all')} 
              className={`px-4 py-2 text-sm font-medium ${currentView === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setCurrentView('unread')} 
              className={`px-4 py-2 text-sm font-medium ${currentView === 'unread' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Unread
            </button>
            <button 
              onClick={() => setCurrentView('payments')} 
              className={`px-4 py-2 text-sm font-medium ${currentView === 'payments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Payments
            </button>
            <button 
              onClick={() => setCurrentView('system')} 
              className={`px-4 py-2 text-sm font-medium ${currentView === 'system' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              System
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 rounded-full p-1 ${getNotificationTypeStyles(notification.type).bgColor}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${getNotificationTypeStyles(notification.type).textColor}`} viewBox="0 0 20 20" fill="currentColor">
                          {getNotificationTypeIcon(notification.type)}
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                        <p className="mt-1 text-xs text-gray-400">{notification.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          Mark as read
                        </button>
                      )}
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {notification.actionRequired && (
                    <div className="mt-3 flex justify-end">
                      <a 
                        href={notification.actionLink} 
                        className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700"
                      >
                        {notification.actionText}
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
          
          {filteredNotifications.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredNotifications.length}</span> of <span className="font-medium">{notifications.length}</span> notifications
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive email notifications for important events</p>
              </div>
              <div className="flex items-center">
                <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600">
                  <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Payment Notifications</h4>
                <p className="text-sm text-gray-500">Receive notifications for new payments and verifications</p>
              </div>
              <div className="flex items-center">
                <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600">
                  <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">System Notifications</h4>
                <p className="text-sm text-gray-500">Receive notifications for system updates and reports</p>
              </div>
              <div className="flex items-center">
                <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-blue-600">
                  <span className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Desktop Notifications</h4>
                <p className="text-sm text-gray-500">Show desktop notifications when browser is open</p>
              </div>
              <div className="flex items-center">
                <button className="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 bg-gray-200">
                  <span className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Helper function to get notification type styles
function getNotificationTypeStyles(type: string) {
  switch (type) {
    case 'payment':
      return { bgColor: 'bg-green-100', textColor: 'text-green-600' };
    case 'system':
      return { bgColor: 'bg-blue-100', textColor: 'text-blue-600' };
    case 'invoice':
      return { bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' };
    default:
      return { bgColor: 'bg-gray-100', textColor: 'text-gray-600' };
  }
}

// Helper function to get notification type icon
function getNotificationTypeIcon(type: string) {
  switch (type) {
    case 'payment':
      return <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />;
    case 'system':
      return <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />;
    case 'invoice':
      return <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />;
    default:
      return <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />;
  }
}