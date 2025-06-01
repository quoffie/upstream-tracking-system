'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface TimelineEvent {
  id: string;
  applicationId: string;
  companyName: string;
  stage: string;
  action: string;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  timestamp: string;
  duration?: number; // in days
  assignee: string;
  description: string;
  nextStage?: string;
  documents?: string[];
}

interface WorkflowStage {
  name: string;
  order: number;
  averageDuration: number;
  status: 'completed' | 'current' | 'upcoming';
}

const WorkflowTimelinePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  const workflowStages: WorkflowStage[] = [
    { name: 'Application Submission', order: 1, averageDuration: 1, status: 'completed' },
    { name: 'Initial Review', order: 2, averageDuration: 5, status: 'completed' },
    { name: 'Technical Assessment', order: 3, averageDuration: 14, status: 'current' },
    { name: 'Environmental Review', order: 4, averageDuration: 21, status: 'upcoming' },
    { name: 'Financial Evaluation', order: 5, averageDuration: 10, status: 'upcoming' },
    { name: 'Final Approval', order: 6, averageDuration: 7, status: 'upcoming' }
  ];

  useEffect(() => {
    // Mock timeline events data
    const mockEvents: TimelineEvent[] = [
      {
        id: 'EVT-001',
        applicationId: 'APP-2024-001',
        companyName: 'Ghana Oil Exploration Ltd',
        stage: 'Technical Assessment',
        action: 'Document Review Completed',
        status: 'completed',
        timestamp: '2024-01-15T10:30:00Z',
        duration: 3,
        assignee: 'Eng. Akosua Mensah',
        description: 'Technical specifications and engineering plans reviewed and approved',
        nextStage: 'Environmental Review',
        documents: ['Technical Specs v2.1', 'Engineering Plans']
      },
      {
        id: 'EVT-002',
        applicationId: 'APP-2024-002',
        companyName: 'West African Petroleum',
        stage: 'Initial Review',
        action: 'Application Validation',
        status: 'in_progress',
        timestamp: '2024-01-14T14:15:00Z',
        assignee: 'Mr. Joseph Osei',
        description: 'Validating application completeness and initial compliance check',
        nextStage: 'Technical Assessment'
      },
      {
        id: 'EVT-003',
        applicationId: 'APP-2024-003',
        companyName: 'Coastal Energy Ghana',
        stage: 'Environmental Review',
        action: 'EIA Assessment',
        status: 'pending',
        timestamp: '2024-01-13T09:00:00Z',
        assignee: 'Dr. Kwame Asante',
        description: 'Environmental Impact Assessment pending review',
        documents: ['EIA Report v1.0']
      },
      {
        id: 'EVT-004',
        applicationId: 'APP-2024-001',
        companyName: 'Ghana Oil Exploration Ltd',
        stage: 'Initial Review',
        action: 'Application Received',
        status: 'completed',
        timestamp: '2024-01-10T08:30:00Z',
        duration: 1,
        assignee: 'System',
        description: 'Application successfully submitted and logged into system'
      },
      {
        id: 'EVT-005',
        applicationId: 'APP-2024-004',
        companyName: 'Volta Basin Resources',
        stage: 'Financial Evaluation',
        action: 'Financial Review',
        status: 'blocked',
        timestamp: '2024-01-12T11:45:00Z',
        assignee: 'Ms. Ama Serwaa',
        description: 'Financial review blocked - missing audited statements',
        documents: ['Financial Statements Q1-Q3']
      }
    ];

    setTimeout(() => {
      setTimelineEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <PlayIcon className="h-5 w-5 text-blue-500" />;
      case 'blocked':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blocked':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  const filteredEvents = timelineEvents.filter(event => {
    const matchesApplication = selectedApplication === 'all' || event.applicationId === selectedApplication;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    return matchesApplication && matchesStatus;
  });

  const uniqueApplications = [...new Set(timelineEvents.map(event => event.applicationId))];

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - eventTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/workflow/timeline')}
          userRole="Commission Admin"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/workflow/timeline')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Timeline</h1>
            <p className="text-gray-600">Track application progress through workflow stages</p>
          </div>

          {/* Workflow Stages Overview */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Standard Workflow Stages</h3>
            <div className="flex items-center justify-between">
              {workflowStages.map((stage, index) => (
                <div key={stage.name} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getStageColor(stage.status)}`}>
                      {stage.order}
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-gray-900">{stage.name}</div>
                      <div className="text-xs text-gray-500">{stage.averageDuration} days avg</div>
                    </div>
                  </div>
                  {index < workflowStages.length - 1 && (
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueApplications.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Steps</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {timelineEvents.filter(event => event.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <PlayIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {timelineEvents.filter(event => event.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Blocked</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {timelineEvents.filter(event => event.status === 'blocked').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedApplication}
                  onChange={(e) => setSelectedApplication(e.target.value)}
                >
                  <option value="all">All Applications</option>
                  {uniqueApplications.map(appId => (
                    <option key={appId} value={appId}>{appId}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Timeline Events</h3>
            </div>
            
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {filteredEvents.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== filteredEvents.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white">
                              {getStatusIcon(event.status)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
                                  {event.status.replace('_', ' ').toUpperCase()}
                                </span>
                                <span className="text-sm font-medium text-gray-900">{event.applicationId}</span>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{event.companyName}</span>
                              </div>
                              <div className="mb-2">
                                <p className="text-sm font-medium text-gray-900">{event.action}</p>
                                <p className="text-sm text-gray-600">{event.description}</p>
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <div className="flex items-center">
                                  <UserIcon className="h-3 w-3 mr-1" />
                                  {event.assignee}
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="h-3 w-3 mr-1" />
                                  Stage: {event.stage}
                                </div>
                                {event.duration && (
                                  <div className="flex items-center">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {event.duration} days
                                  </div>
                                )}
                                {event.nextStage && (
                                  <div className="flex items-center">
                                    <ArrowRightIcon className="h-3 w-3 mr-1" />
                                    Next: {event.nextStage}
                                  </div>
                                )}
                              </div>
                              {event.documents && event.documents.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Related Documents:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {event.documents.map((doc, idx) => (
                                      <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                        <DocumentTextIcon className="h-3 w-3 mr-1" />
                                        {doc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <div>{formatTimeAgo(event.timestamp)}</div>
                              <button className="mt-1 text-blue-600 hover:text-blue-900 flex items-center text-xs">
                                <EyeIcon className="h-3 w-3 mr-1" />
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTimelinePage;