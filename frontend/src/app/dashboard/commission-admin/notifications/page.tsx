'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface Notification {
  id: string;
  type: 'Alert' | 'Escalation' | 'Reminder' | 'System' | 'Approval' | 'Payment';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  relatedId?: string;
  relatedType?: 'Application' | 'Payment' | 'User' | 'System';
  escalationLevel?: number;
  assignedTo?: string;
  dueDate?: string;
}

interface EscalationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  escalationLevels: {
    level: number;
    timeframe: number; // hours
    assignTo: string;
    actions: string[];
  }[];
  isActive: boolean;
}

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([]);
  const [activeTab, setActiveTab] = useState<'notifications' | 'escalations' | 'rules'>('notifications');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data for notifications
    const mockNotifications: Notification[] = [
      {
        id: 'NOT-001',
        type: 'Escalation',
        priority: 'Critical',
        title: 'Application Approval Overdue',
        message: 'Application APP-2024-001 from Kosmos Energy Ghana Limited has been pending approval for 5 days, exceeding the 3-day SLA.',
        source: 'Workflow Management',
        timestamp: '2024-01-25T09:30:00Z',
        isRead: false,
        actionRequired: true,
        relatedId: 'APP-2024-001',
        relatedType: 'Application',
        escalationLevel: 2,
        assignedTo: 'CEO',
        dueDate: '2024-01-26T17:00:00Z'
      },
      {
        id: 'NOT-002',
        type: 'Payment',
        priority: 'High',
        title: 'Payment Failure Alert',
        message: 'Payment transaction TXN-004 for Hess Ghana Limited has failed due to insufficient funds. Immediate attention required.',
        source: 'Payment System',
        timestamp: '2024-01-25T08:15:00Z',
        isRead: false,
        actionRequired: true,
        relatedId: 'TXN-004',
        relatedType: 'Payment'
      },
      {
        id: 'NOT-003',
        type: 'Alert',
        priority: 'High',
        title: 'System Performance Warning',
        message: 'Database response time has increased by 40% in the last hour. System performance monitoring detected potential issues.',
        source: 'System Monitor',
        timestamp: '2024-01-25T07:45:00Z',
        isRead: true,
        actionRequired: true,
        relatedType: 'System'
      },
      {
        id: 'NOT-004',
        type: 'Approval',
        priority: 'Medium',
        title: 'New JV Application Submitted',
        message: 'Eni Ghana Exploration has submitted a new Joint Venture application (APP-2024-003) requiring CEO approval.',
        source: 'Application System',
        timestamp: '2024-01-25T06:20:00Z',
        isRead: true,
        actionRequired: true,
        relatedId: 'APP-2024-003',
        relatedType: 'Application'
      },
      {
        id: 'NOT-005',
        type: 'Reminder',
        priority: 'Medium',
        title: 'Monthly Report Due',
        message: 'Monthly regulatory compliance report is due in 3 days. Please ensure all data is compiled and reviewed.',
        source: 'Compliance System',
        timestamp: '2024-01-25T05:00:00Z',
        isRead: true,
        actionRequired: false
      },
      {
        id: 'NOT-006',
        type: 'System',
        priority: 'Low',
        title: 'Scheduled Maintenance Complete',
        message: 'Scheduled system maintenance has been completed successfully. All services are now fully operational.',
        source: 'System Admin',
        timestamp: '2024-01-25T02:00:00Z',
        isRead: true,
        actionRequired: false,
        relatedType: 'System'
      }
    ];

    const mockEscalationRules: EscalationRule[] = [
      {
        id: 'ESC-001',
        name: 'Application Approval Overdue',
        trigger: 'Application pending approval',
        condition: 'Time since submission > 3 days',
        escalationLevels: [
          {
            level: 1,
            timeframe: 72, // 3 days
            assignTo: 'Department Head',
            actions: ['Send reminder email', 'Update status']
          },
          {
            level: 2,
            timeframe: 120, // 5 days
            assignTo: 'CEO',
            actions: ['Send escalation alert', 'Schedule review meeting']
          }
        ],
        isActive: true
      },
      {
        id: 'ESC-002',
        name: 'Payment Failure',
        trigger: 'Payment transaction failed',
        condition: 'Payment status = Failed',
        escalationLevels: [
          {
            level: 1,
            timeframe: 1, // 1 hour
            assignTo: 'Finance Team',
            actions: ['Send immediate alert', 'Attempt retry']
          },
          {
            level: 2,
            timeframe: 24, // 1 day
            assignTo: 'Finance Manager',
            actions: ['Manual review required', 'Contact applicant']
          }
        ],
        isActive: true
      },
      {
        id: 'ESC-003',
        name: 'System Performance',
        trigger: 'System performance degradation',
        condition: 'Response time > 2x normal OR Error rate > 5%',
        escalationLevels: [
          {
            level: 1,
            timeframe: 0.5, // 30 minutes
            assignTo: 'IT Support',
            actions: ['Investigate issue', 'Monitor metrics']
          },
          {
            level: 2,
            timeframe: 2, // 2 hours
            assignTo: 'IT Manager',
            actions: ['Escalate to senior team', 'Consider maintenance']
          }
        ],
        isActive: true
      }
    ];

    setNotifications(mockNotifications);
    setEscalationRules(mockEscalationRules);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = typeFilter === 'all' || notification.type.toLowerCase() === typeFilter;
    const matchesPriority = priorityFilter === 'all' || notification.priority.toLowerCase() === priorityFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'unread' && !notification.isRead) ||
      (statusFilter === 'read' && notification.isRead) ||
      (statusFilter === 'action-required' && notification.actionRequired);
    
    return matchesType && matchesPriority && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Alert': return 'bg-red-100 text-red-800';
      case 'Escalation': return 'bg-orange-100 text-orange-800';
      case 'Reminder': return 'bg-yellow-100 text-yellow-800';
      case 'System': return 'bg-blue-100 text-blue-800';
      case 'Approval': return 'bg-green-100 text-green-800';
      case 'Payment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.priority === 'Critical' && !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.isRead).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">🔔</span>
              Notifications & Escalations
            </h1>
            <p className="text-gray-600 mt-2">Monitor alerts, escalations, and system notifications</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={markAllAsRead}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Mark All Read
            </button>
            <button 
              onClick={() => router.push('/dashboard/commission-admin/notifications/settings')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Notification Settings
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{unreadCount}</div>
            <div className="text-sm opacity-90">Unread Notifications</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg text-white p-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{criticalCount}</div>
            <div className="text-sm opacity-90">Critical Alerts</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{actionRequiredCount}</div>
            <div className="text-sm opacity-90">Action Required</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{escalationRules.filter(r => r.isActive).length}</div>
            <div className="text-sm opacity-90">Active Rules</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Notifications ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('escalations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'escalations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Escalations
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Escalation Rules
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select 
                    value={typeFilter} 
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="alert">Alert</option>
                    <option value="escalation">Escalation</option>
                    <option value="reminder">Reminder</option>
                    <option value="system">System</option>
                    <option value="approval">Approval</option>
                    <option value="payment">Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select 
                    value={priorityFilter} 
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="action-required">Action Required</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Export Notifications
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                    } hover:shadow-md`}
                    onClick={() => {
                      setSelectedNotification(notification);
                      if (!notification.isRead) markAsRead(notification.id);
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(notification.priority)}`}></div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {notification.escalationLevel && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              Level {notification.escalationLevel}
                            </span>
                          )}
                          {notification.actionRequired && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              Action Required
                            </span>
                          )}
                          {!notification.isRead && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{notification.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>From: {notification.source}</span>
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          {notification.relatedId && (
                            <span>Related: {notification.relatedId}</span>
                          )}
                          {notification.dueDate && (
                            <span className="text-red-600 font-medium">
                              Due: {new Date(notification.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {notification.actionRequired && (
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Take Action
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'escalations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Escalations</h3>
              {notifications.filter(n => n.type === 'Escalation').map((escalation) => (
                <div key={escalation.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{escalation.title}</h4>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                      Level {escalation.escalationLevel}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{escalation.message}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Assigned to: {escalation.assignedTo}</span>
                    {escalation.dueDate && (
                      <span className="text-red-600 font-medium">
                        Due: {new Date(escalation.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Escalation Rules</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Add New Rule
                </button>
              </div>
              {escalationRules.map((rule) => (
                <div key={rule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{rule.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Trigger:</span>
                      <p className="text-gray-600">{rule.trigger}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Condition:</span>
                      <p className="text-gray-600">{rule.condition}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-medium text-gray-700">Escalation Levels:</span>
                    <div className="mt-2 space-y-2">
                      {rule.escalationLevels.map((level) => (
                        <div key={level.level} className="bg-gray-50 rounded p-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Level {level.level}</span>
                            <span className="text-gray-600">{level.timeframe}h → {level.assignTo}</span>
                          </div>
                          <div className="text-gray-600 text-xs mt-1">
                            Actions: {level.actions.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedNotification.title}
                </h2>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedNotification.priority)}`}></div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedNotification.type)}`}>
                    {selectedNotification.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(selectedNotification.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700">{selectedNotification.message}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Source:</span>
                    <p className="text-gray-600">{selectedNotification.source}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Priority:</span>
                    <p className="text-gray-600">{selectedNotification.priority}</p>
                  </div>
                  {selectedNotification.relatedId && (
                    <div>
                      <span className="font-medium text-gray-700">Related ID:</span>
                      <p className="text-gray-600">{selectedNotification.relatedId}</p>
                    </div>
                  )}
                  {selectedNotification.assignedTo && (
                    <div>
                      <span className="font-medium text-gray-700">Assigned To:</span>
                      <p className="text-gray-600">{selectedNotification.assignedTo}</p>
                    </div>
                  )}
                </div>
                {selectedNotification.actionRequired && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Action Required</h4>
                    <div className="flex space-x-2">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Take Action
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                        Delegate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Alert Management</h3>
          <p className="text-sm opacity-90 mb-4">Configure alert thresholds and rules</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/notifications/alerts')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Manage Alerts
          </button>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Escalation Settings</h3>
          <p className="text-sm opacity-90 mb-4">Configure escalation rules and workflows</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/notifications/escalations')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Configure Rules
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Communication</h3>
          <p className="text-sm opacity-90 mb-4">Manage communication channels and preferences</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/notifications/settings')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}