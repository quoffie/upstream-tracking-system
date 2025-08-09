'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ExclamationTriangleIcon,
  ClockIcon,
  UserIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface CriticalIssue {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: 'compliance' | 'safety' | 'financial' | 'operational' | 'regulatory';
  status: 'open' | 'in_progress' | 'resolved' | 'escalated';
  assignedTo: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  priority: number;
}

export default function CriticalIssuesPage() {
  const router = useRouter();
  const [issues, setIssues] = useState<CriticalIssue[]>([
    {
      id: '1',
      title: 'Environmental Compliance Violation',
      description: 'Shell SPDC reported oil spill incident requiring immediate investigation and remediation plan.',
      severity: 'high',
      category: 'compliance',
      status: 'open',
      assignedTo: 'Environmental Inspector Team',
      company: 'Shell Petroleum Development Company',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      dueDate: '2024-01-18T23:59:59Z',
      priority: 1
    },
    {
      id: '2',
      title: 'Safety Protocol Breach',
      description: 'Multiple safety violations reported at Chevron offshore platform. Immediate safety audit required.',
      severity: 'high',
      category: 'safety',
      status: 'in_progress',
      assignedTo: 'Safety Compliance Officer',
      company: 'Chevron Nigeria Limited',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      dueDate: '2024-01-17T23:59:59Z',
      priority: 2
    },
    {
      id: '3',
      title: 'Permit Renewal Overdue',
      description: 'TotalEnergies operating permit expired 30 days ago. Operations must cease until renewal.',
      severity: 'high',
      category: 'regulatory',
      status: 'escalated',
      assignedTo: 'Regulatory Affairs Manager',
      company: 'TotalEnergies EP Nigeria',
      createdAt: '2024-01-10T08:00:00Z',
      updatedAt: '2024-01-15T11:45:00Z',
      dueDate: '2024-01-16T23:59:59Z',
      priority: 1
    },
    {
      id: '4',
      title: 'Financial Audit Discrepancy',
      description: 'Significant discrepancies found in ExxonMobil quarterly financial reports requiring investigation.',
      severity: 'medium',
      category: 'financial',
      status: 'open',
      assignedTo: 'Financial Audit Team',
      company: 'ExxonMobil Nigeria',
      createdAt: '2024-01-12T16:30:00Z',
      updatedAt: '2024-01-12T16:30:00Z',
      dueDate: '2024-01-20T23:59:59Z',
      priority: 3
    },
    {
      id: '5',
      title: 'Local Content Compliance Gap',
      description: 'Agip failing to meet local content requirements for Q4 2023. Action plan needed.',
      severity: 'medium',
      category: 'compliance',
      status: 'in_progress',
      assignedTo: 'Local Content Officer',
      company: 'Nigerian Agip Oil Company',
      createdAt: '2024-01-11T12:15:00Z',
      updatedAt: '2024-01-14T10:20:00Z',
      dueDate: '2024-01-25T23:59:59Z',
      priority: 4
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return <DocumentTextIcon className="h-5 w-5" />;
      case 'safety': return <ExclamationTriangleIcon className="h-5 w-5" />;
      case 'financial': return <BuildingOfficeIcon className="h-5 w-5" />;
      case 'operational': return <ArrowPathIcon className="h-5 w-5" />;
      case 'regulatory': return <CheckCircleIcon className="h-5 w-5" />;
      default: return <DocumentTextIcon className="h-5 w-5" />;
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

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredIssues = issues
    .filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = filterSeverity === 'all' || issue.severity === filterSeverity;
      const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || issue.category === filterCategory;
      
      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by priority first, then by due date
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  const handleViewIssue = (issueId: string) => {
    router.push(`/dashboard/commission-admin/critical-issues/${issueId}`);
  };

  const handleUpdateStatus = (issueId: string, newStatus: string) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: newStatus as any, updatedAt: new Date().toISOString() }
        : issue
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const criticalCount = issues.filter(i => i.severity === 'high').length;
  const overdueCount = issues.filter(i => getDaysUntilDue(i.dueDate) < 0).length;
  const openCount = issues.filter(i => i.status === 'open').length;
  const escalatedCount = issues.filter(i => i.status === 'escalated').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Critical Issues</h1>
              <p className="text-gray-600 mt-2">Monitor and manage critical issues requiring immediate attention</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/commission-admin/critical-issues/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
              Report Issue
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Critical Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{criticalCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-2xl font-semibold text-gray-900">{overdueCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Open Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{openCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <ArrowPathIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Escalated</p>
                <p className="text-2xl font-semibold text-gray-900">{escalatedCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="compliance">Compliance</option>
                <option value="safety">Safety</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="regulatory">Regulatory</option>
              </select>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            const daysUntilDue = getDaysUntilDue(issue.dueDate);
            const isOverdue = daysUntilDue < 0;
            const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0;
            
            return (
              <div key={issue.id} className={`bg-white rounded-lg shadow border-l-4 ${
                issue.severity === 'high' ? 'border-red-500' :
                issue.severity === 'medium' ? 'border-yellow-500' : 'border-green-500'
              }`}>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-full ${
                          issue.category === 'safety' ? 'bg-red-100 text-red-600' :
                          issue.category === 'compliance' ? 'bg-blue-100 text-blue-600' :
                          issue.category === 'financial' ? 'bg-green-100 text-green-600' :
                          issue.category === 'operational' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getCategoryIcon(issue.category)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                          getSeverityColor(issue.severity)
                        }`}>
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getStatusColor(issue.status)
                        }`}>
                          {issue.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{issue.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                          <span>{issue.company}</span>
                        </div>
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-2" />
                          <span>{issue.assignedTo}</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          <span className={`${
                            isOverdue ? 'text-red-600 font-semibold' :
                            isDueSoon ? 'text-yellow-600 font-semibold' : ''
                          }`}>
                            Due: {formatDate(issue.dueDate)}
                            {isOverdue && ' (OVERDUE)'}
                            {isDueSoon && ' (DUE SOON)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleViewIssue(issue.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50"
                      >
                        View Details
                      </button>
                      
                      {issue.status !== 'resolved' && (
                        <select
                          value={issue.status}
                          onChange={(e) => handleUpdateStatus(issue.id, e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="escalated">Escalated</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredIssues.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-500">No critical issues match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}