'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  BellIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface ComplianceIssue {
  id: string;
  title: string;
  description: string;
  company: string;
  category: 'environmental' | 'safety' | 'local-content' | 'financial' | 'operational' | 'regulatory';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  dueDate: string;
  createdDate: string;
  lastUpdated: string;
  complianceType: string;
  riskLevel: number;
}

interface ComplianceMetrics {
  totalIssues: number;
  openIssues: number;
  criticalIssues: number;
  resolvedThisMonth: number;
  complianceRate: number;
  averageResolutionTime: number;
}

export default function CompliancePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const [complianceIssues, setComplianceIssues] = useState<ComplianceIssue[]>([
    {
      id: '1',
      title: 'Environmental Impact Assessment Overdue',
      description: 'Annual environmental impact assessment report is 15 days overdue',
      company: 'Shell Petroleum Development Company',
      category: 'environmental',
      severity: 'high',
      status: 'open',
      assignedTo: 'Dr. Sarah Johnson',
      dueDate: '2024-01-01T00:00:00Z',
      createdDate: '2023-12-15T10:30:00Z',
      lastUpdated: '2024-01-10T14:20:00Z',
      complianceType: 'Environmental Compliance',
      riskLevel: 85
    },
    {
      id: '2',
      title: 'Local Content Plan Non-Compliance',
      description: 'Company failed to meet 70% local content requirement for Q4 2023',
      company: 'Chevron Nigeria Limited',
      category: 'local-content',
      severity: 'critical',
      status: 'in-progress',
      assignedTo: 'Mr. Adebayo Ogundimu',
      dueDate: '2024-01-20T00:00:00Z',
      createdDate: '2024-01-05T09:15:00Z',
      lastUpdated: '2024-01-12T16:45:00Z',
      complianceType: 'Local Content Compliance',
      riskLevel: 95
    },
    {
      id: '3',
      title: 'Safety Protocol Violation',
      description: 'Multiple safety protocol violations reported at offshore platform',
      company: 'TotalEnergies EP Nigeria',
      category: 'safety',
      severity: 'high',
      status: 'in-progress',
      assignedTo: 'Eng. Michael Okafor',
      dueDate: '2024-01-18T00:00:00Z',
      createdDate: '2024-01-08T11:30:00Z',
      lastUpdated: '2024-01-13T10:15:00Z',
      complianceType: 'Safety Compliance',
      riskLevel: 78
    },
    {
      id: '4',
      title: 'Financial Reporting Discrepancy',
      description: 'Quarterly financial report shows discrepancies in revenue declarations',
      company: 'ExxonMobil Nigeria',
      category: 'financial',
      severity: 'medium',
      status: 'resolved',
      assignedTo: 'Mrs. Funmi Adebayo',
      dueDate: '2024-01-15T00:00:00Z',
      createdDate: '2024-01-02T14:20:00Z',
      lastUpdated: '2024-01-14T09:30:00Z',
      complianceType: 'Financial Compliance',
      riskLevel: 45
    },
    {
      id: '5',
      title: 'Operational License Renewal Pending',
      description: 'Operational license expires in 30 days, renewal application pending',
      company: 'Nigerian Agip Oil Company',
      category: 'regulatory',
      severity: 'medium',
      status: 'open',
      assignedTo: 'Mr. Ibrahim Musa',
      dueDate: '2024-02-15T00:00:00Z',
      createdDate: '2024-01-10T08:45:00Z',
      lastUpdated: '2024-01-12T15:20:00Z',
      complianceType: 'Regulatory Compliance',
      riskLevel: 60
    },
    {
      id: '6',
      title: 'Joint Venture Agreement Violation',
      description: 'JV partner failed to meet agreed investment commitments',
      company: 'Seplat Energy Plc',
      category: 'operational',
      severity: 'high',
      status: 'open',
      assignedTo: 'Dr. Kemi Adeosun',
      dueDate: '2024-01-25T00:00:00Z',
      createdDate: '2024-01-07T13:10:00Z',
      lastUpdated: '2024-01-11T11:45:00Z',
      complianceType: 'Operational Compliance',
      riskLevel: 82
    }
  ]);

  const complianceMetrics: ComplianceMetrics = {
    totalIssues: 156,
    openIssues: 47,
    criticalIssues: 8,
    resolvedThisMonth: 23,
    complianceRate: 87.5,
    averageResolutionTime: 12.5
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'bg-green-100 text-green-800';
      case 'safety': return 'bg-red-100 text-red-800';
      case 'local-content': return 'bg-blue-100 text-blue-800';
      case 'financial': return 'bg-yellow-100 text-yellow-800';
      case 'operational': return 'bg-purple-100 text-purple-800';
      case 'regulatory': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return XCircleIcon;
      case 'in-progress': return ClockIcon;
      case 'resolved': return CheckCircleIcon;
      case 'closed': return CheckCircleIcon;
      default: return ClockIcon;
    }
  };

  const getRiskLevelColor = (riskLevel: number) => {
    if (riskLevel >= 80) return 'text-red-600';
    if (riskLevel >= 60) return 'text-orange-600';
    if (riskLevel >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const filteredIssues = complianceIssues
    .filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || issue.category === filterCategory;
      const matchesSeverity = filterSeverity === 'all' || issue.severity === filterSeverity;
      const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
      
      return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'severity':
          const severityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
          return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
        case 'riskLevel':
          return b.riskLevel - a.riskLevel;
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });

  const handleViewIssue = (issueId: string) => {
    router.push(`/dashboard/commission-admin/compliance/issue/${issueId}`);
  };

  const handleUpdateStatus = (issueId: string, newStatus: string) => {
    setComplianceIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, status: newStatus as any, lastUpdated: new Date().toISOString() }
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compliance Oversight</h1>
              <p className="text-gray-600 mt-2">Monitor and manage compliance issues across all operations</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard/commission-admin/compliance/reports')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Compliance Reports
              </button>
              <button
                onClick={() => router.push('/dashboard/commission-admin/compliance/new-issue')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <ExclamationTriangleIcon className="h-4 w-4 mr-2" />
                Report Issue
              </button>
            </div>
          </div>
        </div>

        {/* Compliance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <ClipboardDocumentCheckIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceMetrics.totalIssues}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Open Issues</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceMetrics.openIssues}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Critical</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceMetrics.criticalIssues}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceMetrics.resolvedThisMonth}</p>
                <p className="text-sm text-green-600">This month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Compliance Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceMetrics.complianceRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Resolution</p>
                <p className="text-2xl font-semibold text-gray-900">{complianceMetrics.averageResolutionTime}</p>
                <p className="text-sm text-yellow-600">Days</p>
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
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="environmental">Environmental</option>
                <option value="safety">Safety</option>
                <option value="local-content">Local Content</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
                <option value="regulatory">Regulatory</option>
              </select>
              
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
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
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="severity">Sort by Severity</option>
                <option value="riskLevel">Sort by Risk Level</option>
                <option value="company">Sort by Company</option>
                <option value="lastUpdated">Sort by Last Updated</option>
              </select>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/compliance/bulk-actions')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Bulk Actions
              </button>
            </div>
          </div>
        </div>

        {/* Compliance Issues List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Issues</h2>
            <div className="space-y-4">
              {filteredIssues.map((issue) => {
                const StatusIcon = getStatusIcon(issue.status);
                
                return (
                  <div key={issue.id} className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors ${
                    isOverdue(issue.dueDate) && issue.status !== 'resolved' && issue.status !== 'closed' 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
                          {isOverdue(issue.dueDate) && issue.status !== 'resolved' && issue.status !== 'closed' && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                              OVERDUE
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-3">{issue.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                            <span>{issue.company}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <UserGroupIcon className="h-4 w-4 mr-2" />
                            <span>Assigned to: {issue.assignedTo}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>Due: {formatDate(issue.dueDate)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="mr-2">Risk Level:</span>
                            <span className={`font-semibold ${getRiskLevelColor(issue.riskLevel)}`}>
                              {issue.riskLevel}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            getCategoryColor(issue.category)
                          }`}>
                            {issue.category.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            getSeverityColor(issue.severity)
                          }`}>
                            {issue.severity.toUpperCase()}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            getStatusColor(issue.status)
                          }`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {issue.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleViewIssue(issue.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        
                        {issue.status === 'open' && (
                          <button
                            onClick={() => handleUpdateStatus(issue.id, 'in-progress')}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50"
                          >
                            Start Work
                          </button>
                        )}
                        
                        {issue.status === 'in-progress' && (
                          <button
                            onClick={() => handleUpdateStatus(issue.id, 'resolved')}
                            className="px-3 py-1 text-sm text-green-600 hover:text-green-800 border border-green-300 rounded hover:bg-green-50"
                          >
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredIssues.length === 0 && (
              <div className="text-center py-12">
                <ShieldCheckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No compliance issues found</h3>
                <p className="text-gray-500">No issues match your current filters.</p>
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
                onClick={() => router.push('/dashboard/commission-admin/compliance/audit-schedule')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Schedule Audit</p>
                  <p className="text-sm text-gray-500">Plan compliance audits</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/compliance/notifications')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BellIcon className="h-8 w-8 text-yellow-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Send Notifications</p>
                  <p className="text-sm text-gray-500">Alert stakeholders</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/compliance/templates')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentTextIcon className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Compliance Templates</p>
                  <p className="text-sm text-gray-500">Manage templates</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/compliance/settings')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CogIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Compliance Settings</p>
                  <p className="text-sm text-gray-500">Configure rules</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}