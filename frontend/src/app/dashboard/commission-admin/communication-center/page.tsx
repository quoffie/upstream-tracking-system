'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChatBubbleLeftRightIcon,
  BellIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  type: 'announcement' | 'notification' | 'alert' | 'memo' | 'meeting';
  title: string;
  content: string;
  sender: string;
  recipients: string[];
  recipientType: 'all' | 'companies' | 'staff' | 'specific';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'scheduled';
  createdDate: string;
  scheduledDate?: string;
  readCount: number;
  totalRecipients: number;
  attachments?: string[];
}

interface CommunicationStats {
  totalMessages: number;
  sentToday: number;
  pendingMessages: number;
  averageReadRate: number;
  activeRecipients: number;
  scheduledMessages: number;
}

export default function CommunicationCenterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('createdDate');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'announcement',
      title: 'New Environmental Compliance Guidelines',
      content: 'Updated environmental compliance guidelines are now in effect. All companies must review and implement the new requirements by March 1, 2024.',
      sender: 'Commission Admin',
      recipients: ['All Companies'],
      recipientType: 'companies',
      priority: 'high',
      status: 'sent',
      createdDate: '2024-01-15T10:30:00Z',
      readCount: 45,
      totalRecipients: 67,
      attachments: ['Environmental_Guidelines_2024.pdf', 'Compliance_Checklist.xlsx']
    },
    {
      id: '2',
      type: 'alert',
      title: 'Critical Safety Violation - Immediate Action Required',
      content: 'A critical safety violation has been reported at Platform Alpha-7. All operations must be suspended immediately pending investigation.',
      sender: 'Safety Department',
      recipients: ['Shell Petroleum', 'Chevron Nigeria', 'Safety Inspectors'],
      recipientType: 'specific',
      priority: 'urgent',
      status: 'sent',
      createdDate: '2024-01-14T16:45:00Z',
      readCount: 12,
      totalRecipients: 15,
      attachments: ['Safety_Report_Alpha7.pdf']
    },
    {
      id: '3',
      type: 'notification',
      title: 'Quarterly Financial Report Submission Reminder',
      content: 'Reminder: Q4 2023 financial reports are due by January 31, 2024. Please ensure all documentation is complete and submitted on time.',
      sender: 'Finance Department',
      recipients: ['All Companies'],
      recipientType: 'companies',
      priority: 'medium',
      status: 'sent',
      createdDate: '2024-01-13T09:15:00Z',
      readCount: 52,
      totalRecipients: 67,
      attachments: ['Financial_Report_Template.xlsx']
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Monthly Stakeholder Meeting - February 2024',
      content: 'Monthly stakeholder meeting scheduled for February 15, 2024, at 10:00 AM. Agenda includes policy updates, compliance reviews, and Q&A session.',
      sender: 'Commission Admin',
      recipients: ['All Stakeholders'],
      recipientType: 'all',
      priority: 'medium',
      status: 'scheduled',
      createdDate: '2024-01-12T14:20:00Z',
      scheduledDate: '2024-02-01T08:00:00Z',
      readCount: 0,
      totalRecipients: 150,
      attachments: ['Meeting_Agenda.pdf']
    },
    {
      id: '5',
      type: 'memo',
      title: 'Updated Local Content Requirements',
      content: 'New local content requirements have been established. Companies must achieve 75% local content by Q3 2024. Training programs are available.',
      sender: 'Local Content Department',
      recipients: ['All Companies'],
      recipientType: 'companies',
      priority: 'high',
      status: 'sent',
      createdDate: '2024-01-11T11:30:00Z',
      readCount: 38,
      totalRecipients: 67,
      attachments: ['Local_Content_Guidelines.pdf', 'Training_Schedule.pdf']
    },
    {
      id: '6',
      type: 'notification',
      title: 'System Maintenance Scheduled',
      content: 'Planned system maintenance on January 20, 2024, from 2:00 AM to 6:00 AM. All online services will be temporarily unavailable.',
      sender: 'IT Department',
      recipients: ['All Users'],
      recipientType: 'all',
      priority: 'medium',
      status: 'scheduled',
      createdDate: '2024-01-10T15:45:00Z',
      scheduledDate: '2024-01-18T06:00:00Z',
      readCount: 0,
      totalRecipients: 200,
      attachments: []
    },
    {
      id: '7',
      type: 'announcement',
      title: 'New Joint Venture Approval Process',
      content: 'Streamlined joint venture approval process now available. Reduced processing time from 90 to 60 days with new digital submission system.',
      sender: 'JV Coordination',
      recipients: ['All Companies'],
      recipientType: 'companies',
      priority: 'medium',
      status: 'draft',
      createdDate: '2024-01-09T13:10:00Z',
      readCount: 0,
      totalRecipients: 67,
      attachments: ['JV_Process_Guide.pdf']
    }
  ]);

  const communicationStats: CommunicationStats = {
    totalMessages: 156,
    sentToday: 8,
    pendingMessages: 12,
    averageReadRate: 78.5,
    activeRecipients: 234,
    scheduledMessages: 5
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'notification': return 'bg-green-100 text-green-800';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'memo': return 'bg-purple-100 text-purple-800';
      case 'meeting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement': return MegaphoneIcon;
      case 'notification': return BellIcon;
      case 'alert': return ExclamationTriangleIcon;
      case 'memo': return DocumentTextIcon;
      case 'meeting': return CalendarIcon;
      default: return ChatBubbleLeftRightIcon;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReadRate = (readCount: number, totalRecipients: number) => {
    if (totalRecipients === 0) return 0;
    return Math.round((readCount / totalRecipients) * 100);
  };

  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.sender.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || message.type === filterType;
      const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || message.priority === filterPriority;
      
      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'createdDate':
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case 'priority':
          const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
        case 'readRate':
          return getReadRate(b.readCount, b.totalRecipients) - getReadRate(a.readCount, a.totalRecipients);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
    });

  const handleViewMessage = (messageId: string) => {
    router.push(`/dashboard/commission-admin/communication-center/message/${messageId}`);
  };

  const handleEditMessage = (messageId: string) => {
    router.push(`/dashboard/commission-admin/communication-center/edit/${messageId}`);
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(message => message.id !== messageId));
  };

  const handleSendMessage = (messageId: string) => {
    setMessages(prev => prev.map(message => 
      message.id === messageId 
        ? { ...message, status: 'sent' as any }
        : message
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Communication Center</h1>
              <p className="text-gray-600 mt-2">Manage all communications with stakeholders and companies</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/templates')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                Templates
              </button>
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/compose')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Compose Message
              </button>
            </div>
          </div>
        </div>

        {/* Communication Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{communicationStats.totalMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <EnvelopeIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Sent Today</p>
                <p className="text-2xl font-semibold text-gray-900">{communicationStats.sentToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{communicationStats.pendingMessages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Read Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{communicationStats.averageReadRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-500">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Recipients</p>
                <p className="text-2xl font-semibold text-gray-900">{communicationStats.activeRecipients}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Scheduled</p>
                <p className="text-2xl font-semibold text-gray-900">{communicationStats.scheduledMessages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="announcement">Announcements</option>
                <option value="notification">Notifications</option>
                <option value="alert">Alerts</option>
                <option value="memo">Memos</option>
                <option value="meeting">Meetings</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="scheduled">Scheduled</option>
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="createdDate">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="readRate">Sort by Read Rate</option>
                <option value="title">Sort by Title</option>
              </select>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/analytics')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
            <div className="space-y-4">
              {filteredMessages.map((message) => {
                const TypeIcon = getTypeIcon(message.type);
                const readRate = getReadRate(message.readCount, message.totalRecipients);
                
                return (
                  <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-3 rounded-full ${
                          message.type === 'announcement' ? 'bg-blue-100' :
                          message.type === 'notification' ? 'bg-green-100' :
                          message.type === 'alert' ? 'bg-red-100' :
                          message.type === 'memo' ? 'bg-purple-100' :
                          message.type === 'meeting' ? 'bg-yellow-100' : 'bg-gray-100'
                        }`}>
                          <TypeIcon className={`h-6 w-6 ${
                            message.type === 'announcement' ? 'text-blue-600' :
                            message.type === 'notification' ? 'text-green-600' :
                            message.type === 'alert' ? 'text-red-600' :
                            message.type === 'memo' ? 'text-purple-600' :
                            message.type === 'meeting' ? 'text-yellow-600' : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{message.title}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getTypeColor(message.type)
                            }`}>
                              {message.type.toUpperCase()}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getPriorityColor(message.priority)
                            }`}>
                              {message.priority.toUpperCase()}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getStatusColor(message.status)
                            }`}>
                              {message.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">{message.content}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <UserGroupIcon className="h-4 w-4 mr-2" />
                              <span>From: {message.sender}</span>
                            </div>
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                              <span>To: {message.recipients.join(', ')}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              <span>{formatDate(message.createdDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-4 w-4 mr-2" />
                              <span>Read: {message.readCount}/{message.totalRecipients} ({readRate}%)</span>
                            </div>
                          </div>
                          
                          {message.scheduledDate && (
                            <div className="mt-2 flex items-center text-sm text-blue-600">
                              <ClockIcon className="h-4 w-4 mr-2" />
                              <span>Scheduled for: {formatDate(message.scheduledDate)}</span>
                            </div>
                          )}
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 flex items-center text-sm text-gray-600">
                              <DocumentTextIcon className="h-4 w-4 mr-2" />
                              <span>{message.attachments.length} attachment(s)</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleViewMessage(message.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        
                        {message.status === 'draft' && (
                          <>
                            <button
                              onClick={() => handleEditMessage(message.id)}
                              className="p-2 text-blue-400 hover:text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
                              title="Edit Message"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleSendMessage(message.id)}
                              className="px-3 py-1 text-sm text-green-600 hover:text-green-800 border border-green-300 rounded hover:bg-green-50"
                            >
                              Send Now
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-2 text-red-400 hover:text-red-600 border border-red-300 rounded hover:bg-red-50"
                          title="Delete Message"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-500">No messages match your current filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/broadcast')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MegaphoneIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Broadcast Message</p>
                  <p className="text-sm text-gray-500">Send to all stakeholders</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/emergency')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Emergency Alert</p>
                  <p className="text-sm text-gray-500">Send urgent notifications</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/meeting')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <VideoCameraIcon className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Schedule Meeting</p>
                  <p className="text-sm text-gray-500">Organize stakeholder meetings</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/communication-center/contacts')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PhoneIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Contact Directory</p>
                  <p className="text-sm text-gray-500">Manage contact lists</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}