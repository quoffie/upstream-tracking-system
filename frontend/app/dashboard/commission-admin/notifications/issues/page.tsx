'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ExclamationTriangleIcon,
  FireIcon,
  ShieldExclamationIcon,
  ComputerDesktopIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CalendarIcon,
  FunnelIcon,
  BellIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface CriticalIssue {
  id: string;
  type: 'system_failure' | 'security_breach' | 'data_corruption' | 'service_outage' | 'performance_degradation' | 'compliance_violation';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedSystems: string[];
  reportedBy: string;
  assignedTo: string;
  reportedAt: string;
  lastUpdated: string;
  status: 'open' | 'investigating' | 'in_progress' | 'resolved' | 'closed';
  priority: 'p1' | 'p2' | 'p3' | 'p4';
  impactLevel: 'critical' | 'high' | 'medium' | 'low';
  estimatedResolution?: string;
  workaround?: string;
  rootCause?: string;
  resolution?: string;
  affectedUsers: number;
  businessImpact: string;
}

const CriticalIssuesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [criticalIssues, setCriticalIssues] = useState<CriticalIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<CriticalIssue[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<CriticalIssue | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Mock data for critical issues
    const mockIssues: CriticalIssue[] = [
      {
        id: 'CI-001',
        type: 'system_failure',
        severity: 'critical',
        title: 'Database Connection Pool Exhaustion',
        description: 'Primary database connection pool has reached maximum capacity, causing application timeouts and service degradation.',
        affectedSystems: ['Database Server', 'Application Backend', 'User Authentication', 'Payment Processing'],
        reportedBy: 'System Monitor',
        assignedTo: 'Database Team',
        reportedAt: '2024-01-15T14:30:00Z',
        lastUpdated: '2024-01-15T15:45:00Z',
        status: 'investigating',
        priority: 'p1',
        impactLevel: 'critical',
        estimatedResolution: '2024-01-15T18:00:00Z',
        workaround: 'Temporary connection pool size increase implemented',
        affectedUsers: 1250,
        businessImpact: 'Complete service unavailability for permit applications and payments'
      },
      {
        id: 'CI-002',
        type: 'security_breach',
        severity: 'critical',
        title: 'Unauthorized Access Attempt Detected',
        description: 'Multiple failed login attempts detected from suspicious IP addresses targeting admin accounts.',
        affectedSystems: ['Authentication Service', 'Admin Panel', 'User Management'],
        reportedBy: 'Security Monitor',
        assignedTo: 'Security Team',
        reportedAt: '2024-01-15T12:15:00Z',
        lastUpdated: '2024-01-15T16:20:00Z',
        status: 'in_progress',
        priority: 'p1',
        impactLevel: 'high',
        estimatedResolution: '2024-01-15T20:00:00Z',
        workaround: 'IP blocking and enhanced monitoring activated',
        affectedUsers: 0,
        businessImpact: 'Potential data breach risk, admin access temporarily restricted'
      },
      {
        id: 'CI-003',
        type: 'service_outage',
        severity: 'high',
        title: 'Payment Gateway Service Interruption',
        description: 'Third-party payment gateway experiencing intermittent failures affecting transaction processing.',
        affectedSystems: ['Payment Gateway', 'Transaction Processing', 'Financial Module'],
        reportedBy: 'Operations Team',
        assignedTo: 'Integration Team',
        reportedAt: '2024-01-15T10:45:00Z',
        lastUpdated: '2024-01-15T16:30:00Z',
        status: 'resolved',
        priority: 'p2',
        impactLevel: 'high',
        resolution: 'Switched to backup payment processor, primary gateway restored',
        rootCause: 'Third-party service maintenance window not communicated',
        affectedUsers: 450,
        businessImpact: 'Delayed payment processing, revenue impact of GHS 25,000'
      },
      {
        id: 'CI-004',
        type: 'performance_degradation',
        severity: 'medium',
        title: 'Slow Response Times in Reporting Module',
        description: 'Users experiencing significant delays when generating large reports, timeouts occurring frequently.',
        affectedSystems: ['Reporting Engine', 'Database Queries', 'Analytics Module'],
        reportedBy: 'User Support',
        assignedTo: 'Performance Team',
        reportedAt: '2024-01-15T09:20:00Z',
        lastUpdated: '2024-01-15T14:15:00Z',
        status: 'in_progress',
        priority: 'p3',
        impactLevel: 'medium',
        estimatedResolution: '2024-01-16T12:00:00Z',
        workaround: 'Reduced report complexity, pagination implemented',
        affectedUsers: 85,
        businessImpact: 'Delayed executive reporting, manual workarounds required'
      },
      {
        id: 'CI-005',
        type: 'data_corruption',
        severity: 'high',
        title: 'Inconsistent Application Status Data',
        description: 'Some permit applications showing incorrect status information, affecting approval workflow.',
        affectedSystems: ['Application Management', 'Workflow Engine', 'Status Tracking'],
        reportedBy: 'Quality Assurance',
        assignedTo: 'Data Team',
        reportedAt: '2024-01-14T16:30:00Z',
        lastUpdated: '2024-01-15T11:45:00Z',
        status: 'investigating',
        priority: 'p2',
        impactLevel: 'high',
        estimatedResolution: '2024-01-16T10:00:00Z',
        affectedUsers: 120,
        businessImpact: 'Approval delays, manual status verification required'
      },
      {
        id: 'CI-006',
        type: 'compliance_violation',
        severity: 'medium',
        title: 'Audit Log Retention Policy Breach',
        description: 'System audit logs older than required retention period were automatically purged due to storage constraints.',
        affectedSystems: ['Audit System', 'Log Management', 'Compliance Module'],
        reportedBy: 'Compliance Officer',
        assignedTo: 'Compliance Team',
        reportedAt: '2024-01-14T08:00:00Z',
        lastUpdated: '2024-01-15T13:30:00Z',
        status: 'open',
        priority: 'p3',
        impactLevel: 'medium',
        estimatedResolution: '2024-01-17T17:00:00Z',
        affectedUsers: 0,
        businessImpact: 'Regulatory compliance risk, potential audit findings'
      },
      {
        id: 'CI-007',
        type: 'system_failure',
        severity: 'low',
        title: 'Email Notification Delivery Delays',
        description: 'System-generated email notifications experiencing delays in delivery to users.',
        affectedSystems: ['Email Service', 'Notification System', 'SMTP Server'],
        reportedBy: 'User Support',
        assignedTo: 'Infrastructure Team',
        reportedAt: '2024-01-14T14:20:00Z',
        lastUpdated: '2024-01-15T09:15:00Z',
        status: 'closed',
        priority: 'p4',
        impactLevel: 'low',
        resolution: 'SMTP server configuration updated, queue processing optimized',
        rootCause: 'SMTP server rate limiting configuration too restrictive',
        affectedUsers: 300,
        businessImpact: 'Minor user experience impact, delayed notifications'
      }
    ];

    setTimeout(() => {
      setCriticalIssues(mockIssues);
      setFilteredIssues(mockIssues);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = criticalIssues;
    
    if (filterType !== 'all') {
      result = result.filter(issue => issue.type === filterType);
    }
    
    if (filterSeverity !== 'all') {
      result = result.filter(issue => issue.severity === filterSeverity);
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(issue => issue.status === filterStatus);
    }
    
    if (searchTerm) {
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredIssues(result);
  }, [criticalIssues, filterType, filterSeverity, filterStatus, searchTerm]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <FireIcon className="h-3 w-3 mr-1" />
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Resolved
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Closed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CogIcon className="h-3 w-3 mr-1" />
            In Progress
          </span>
        );
      case 'investigating':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <EyeIcon className="h-3 w-3 mr-1" />
            Investigating
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Open
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system_failure':
        return <ComputerDesktopIcon className="h-5 w-5 text-red-600" />;
      case 'security_breach':
        return <ShieldExclamationIcon className="h-5 w-5 text-red-600" />;
      case 'data_corruption':
        return <DocumentTextIcon className="h-5 w-5 text-orange-600" />;
      case 'service_outage':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />;
      case 'performance_degradation':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'compliance_violation':
        return <ExclamationTriangleIcon className="h-5 w-5 text-purple-600" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'p1':
        return <ArrowUpIcon className="h-4 w-4 text-red-600" />;
      case 'p2':
        return <ArrowUpIcon className="h-4 w-4 text-orange-600" />;
      case 'p3':
        return <ArrowRightIcon className="h-4 w-4 text-yellow-600" />;
      default:
        return <ArrowRightIcon className="h-4 w-4 text-green-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount);
  };

  const handleViewDetails = (issue: CriticalIssue) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/issues')}
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
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/issues')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Critical Issues</h1>
            <p className="text-gray-600">Monitor and manage critical system issues and incidents</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open Issues</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {criticalIssues.filter(i => i.status === 'open').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FireIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Severity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {criticalIssues.filter(i => i.severity === 'critical').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CogIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {criticalIssues.filter(i => i.status === 'in_progress' || i.status === 'investigating').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <UserIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Affected Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {criticalIssues.reduce((sum, issue) => sum + issue.affectedUsers, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search issues..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="system_failure">System Failure</option>
                  <option value="security_breach">Security Breach</option>
                  <option value="data_corruption">Data Corruption</option>
                  <option value="service_outage">Service Outage</option>
                  <option value="performance_degradation">Performance</option>
                  <option value="compliance_violation">Compliance</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="investigating">Investigating</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            {filteredIssues.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No critical issues match your filters</p>
              </div>
            ) : (
              filteredIssues.map((issue) => (
                <div key={issue.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(issue.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{issue.title}</h3>
                            {getSeverityBadge(issue.severity)}
                            {getStatusBadge(issue.status)}
                            <div className="flex items-center">
                              {getPriorityIcon(issue.priority)}
                              <span className="text-xs font-medium text-gray-600 ml-1">
                                {issue.priority.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="flex items-center mb-2">
                                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Reported: {formatDate(issue.reportedAt)}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Updated: {formatDate(issue.lastUpdated)}
                                </span>
                              </div>
                              {issue.estimatedResolution && (
                                <div className="flex items-center mb-2">
                                  <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-gray-600">
                                    ETA: {formatDate(issue.estimatedResolution)}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <div className="flex items-center mb-2">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Reported by: {issue.reportedBy}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Assigned to: {issue.assignedTo}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Affected Users: {issue.affectedUsers.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Affected Systems:</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {issue.affectedSystems.map((system, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {system}
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Business Impact:</span> {issue.businessImpact}
                            </p>
                            {issue.workaround && (
                              <p className="text-sm text-blue-600 mt-1">
                                <span className="font-medium">Workaround:</span> {issue.workaround}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-end">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(issue)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
                          Add Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Issue Details - {selectedIssue.id}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{selectedIssue.title}</h4>
                  <p className="text-sm text-gray-600">{selectedIssue.description}</p>
                </div>
                
                {selectedIssue.rootCause && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Root Cause</h4>
                    <p className="text-sm text-gray-600">{selectedIssue.rootCause}</p>
                  </div>
                )}
                
                {selectedIssue.resolution && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resolution</h4>
                    <p className="text-sm text-gray-600">{selectedIssue.resolution}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Type:</span> {selectedIssue.type.replace('_', ' ')}</p>
                    <p><span className="font-medium">Priority:</span> {selectedIssue.priority.toUpperCase()}</p>
                    <p><span className="font-medium">Impact Level:</span> {selectedIssue.impactLevel}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Reported:</span> {formatDate(selectedIssue.reportedAt)}</p>
                    <p><span className="font-medium">Last Updated:</span> {formatDate(selectedIssue.lastUpdated)}</p>
                    {selectedIssue.estimatedResolution && (
                      <p><span className="font-medium">ETA:</span> {formatDate(selectedIssue.estimatedResolution)}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalIssuesPage;