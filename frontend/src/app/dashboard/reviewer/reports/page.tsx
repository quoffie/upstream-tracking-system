'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ReviewReport {
  id: string;
  title: string;
  type: 'inspection' | 'compliance' | 'local-content' | 'jv-compliance' | 'audit' | 'summary';
  category: 'monthly' | 'quarterly' | 'annual' | 'ad-hoc' | 'regulatory';
  status: 'draft' | 'under-review' | 'approved' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdDate: string;
  publishedDate?: string;
  author: string;
  reviewer?: string;
  description: string;
  findings: {
    total: number;
    critical: number;
    major: number;
    minor: number;
  };
  companyName: string;
  projectName?: string;
  fileSize: string;
  downloadCount: number;
  tags: string[];
  summary: string;
  recommendations?: string[];
}

const mockReports: ReviewReport[] = [
  {
    id: 'RPT001',
    title: 'Q1 2024 Local Content Compliance Review',
    type: 'local-content',
    category: 'quarterly',
    status: 'published',
    priority: 'high',
    createdDate: '2024-01-15',
    publishedDate: '2024-02-01',
    author: 'Dr. Adebayo Johnson',
    reviewer: 'Prof. Grace Okafor',
    description: 'Comprehensive quarterly review of local content compliance across all active projects.',
    findings: {
      total: 24,
      critical: 3,
      major: 8,
      minor: 13
    },
    companyName: 'Multiple Companies',
    fileSize: '2.4 MB',
    downloadCount: 156,
    tags: ['Local Content', 'Quarterly', 'Compliance', 'Multi-Company'],
    summary: 'Overall compliance rate improved by 12% compared to Q4 2023. Critical findings identified in technology transfer and succession planning areas.',
    recommendations: [
      'Strengthen technology transfer monitoring',
      'Enhance succession planning oversight',
      'Increase local procurement targets'
    ]
  },
  {
    id: 'RPT002',
    title: 'Shell Nigeria Inspection Report - Bonga Field',
    type: 'inspection',
    category: 'ad-hoc',
    status: 'approved',
    priority: 'critical',
    createdDate: '2024-02-10',
    publishedDate: '2024-02-15',
    author: 'Engr. Michael Williams',
    reviewer: 'Dr. Sarah Anderson',
    description: 'Detailed inspection report following safety incident at Bonga deep water facility.',
    findings: {
      total: 18,
      critical: 5,
      major: 7,
      minor: 6
    },
    companyName: 'Shell Nigeria Exploration',
    projectName: 'Bonga Deep Water Development',
    fileSize: '3.8 MB',
    downloadCount: 89,
    tags: ['Inspection', 'Safety', 'Deep Water', 'Critical'],
    summary: 'Critical safety violations identified in emergency response procedures and equipment maintenance protocols.',
    recommendations: [
      'Immediate equipment maintenance review',
      'Emergency response drill enhancement',
      'Safety protocol compliance training'
    ]
  },
  {
    id: 'RPT003',
    title: 'JV Compliance Assessment - Chevron Agbami',
    type: 'jv-compliance',
    category: 'monthly',
    status: 'under-review',
    priority: 'medium',
    createdDate: '2024-02-20',
    author: 'Dr. Lisa Johnson',
    reviewer: 'Engr. David Wilson',
    description: 'Monthly joint venture compliance assessment focusing on equity participation and local content.',
    findings: {
      total: 12,
      critical: 1,
      major: 4,
      minor: 7
    },
    companyName: 'Chevron Nigeria Limited',
    projectName: 'Agbami Field Operations',
    fileSize: '1.9 MB',
    downloadCount: 34,
    tags: ['JV Compliance', 'Equity', 'Monthly', 'Agbami'],
    summary: 'Minor compliance gaps identified in local content reporting and equity participation documentation.',
    recommendations: [
      'Improve documentation processes',
      'Enhance local content tracking',
      'Regular equity compliance reviews'
    ]
  },
  {
    id: 'RPT004',
    title: 'Annual Regulatory Compliance Summary 2023',
    type: 'summary',
    category: 'annual',
    status: 'published',
    priority: 'high',
    createdDate: '2023-12-15',
    publishedDate: '2024-01-10',
    author: 'Prof. Grace Okafor',
    reviewer: 'Dr. Adebayo Johnson',
    description: 'Comprehensive annual summary of regulatory compliance across all upstream operations.',
    findings: {
      total: 156,
      critical: 12,
      major: 45,
      minor: 99
    },
    companyName: 'All Licensed Operators',
    fileSize: '8.2 MB',
    downloadCount: 278,
    tags: ['Annual', 'Summary', 'Regulatory', 'All Operators'],
    summary: 'Overall improvement in compliance rates with significant progress in local content and environmental standards.',
    recommendations: [
      'Focus on critical finding resolution',
      'Enhance monitoring systems',
      'Strengthen regulatory framework'
    ]
  },
  {
    id: 'RPT005',
    title: 'TotalEnergies Technology Transfer Audit',
    type: 'audit',
    category: 'ad-hoc',
    status: 'draft',
    priority: 'high',
    createdDate: '2024-02-25',
    author: 'Engr. David Wilson',
    description: 'Comprehensive audit of technology transfer commitments and implementation progress.',
    findings: {
      total: 22,
      critical: 4,
      major: 9,
      minor: 9
    },
    companyName: 'TotalEnergies EP Nigeria',
    projectName: 'Egina FPSO Technology Transfer',
    fileSize: '2.1 MB',
    downloadCount: 12,
    tags: ['Audit', 'Technology Transfer', 'TotalEnergies', 'FPSO'],
    summary: 'Significant gaps identified in technology transfer implementation and knowledge sharing programs.',
    recommendations: [
      'Accelerate technology transfer programs',
      'Establish dedicated R&D facilities',
      'Enhance local capacity building'
    ]
  },
  {
    id: 'RPT006',
    title: 'ExxonMobil Environmental Compliance Review',
    type: 'compliance',
    category: 'quarterly',
    status: 'approved',
    priority: 'medium',
    createdDate: '2024-01-30',
    publishedDate: '2024-02-10',
    author: 'Dr. Sarah Anderson',
    reviewer: 'Dr. Lisa Johnson',
    description: 'Quarterly environmental compliance assessment for Qua Iboe operations.',
    findings: {
      total: 8,
      critical: 0,
      major: 2,
      minor: 6
    },
    companyName: 'ExxonMobil Nigeria',
    projectName: 'Qua Iboe Terminal Operations',
    fileSize: '1.5 MB',
    downloadCount: 67,
    tags: ['Environmental', 'Compliance', 'Quarterly', 'Qua Iboe'],
    summary: 'Good environmental compliance with minor improvements needed in waste management and monitoring.',
    recommendations: [
      'Enhance waste management protocols',
      'Improve environmental monitoring',
      'Regular compliance training'
    ]
  }
];

const typeColors = {
  inspection: 'bg-red-100 text-red-800',
  compliance: 'bg-blue-100 text-blue-800',
  'local-content': 'bg-green-100 text-green-800',
  'jv-compliance': 'bg-purple-100 text-purple-800',
  audit: 'bg-yellow-100 text-yellow-800',
  summary: 'bg-indigo-100 text-indigo-800'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  'under-review': 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function ReviewerReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<ReviewReport | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleViewReport = (report: ReviewReport) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'under-review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'draft':
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
      case 'archived':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inspection':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'compliance':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'local-content':
        return <ChartBarIcon className="h-4 w-4" />;
      case 'jv-compliance':
        return <DocumentChartBarIcon className="h-4 w-4" />;
      case 'audit':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'summary':
        return <PresentationChartLineIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Reports</h1>
          <p className="text-gray-600">Manage and access all review reports and documentation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/reviewer/reports/generate"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            Generate
          </Link>
          <Link
            href="/dashboard/reviewer/reports/history"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <ClockIcon className="h-5 w-5" />
            History
          </Link>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            New Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'under-review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Findings</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.reduce((sum, r) => sum + r.findings.critical, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="inspection">Inspection</option>
            <option value="compliance">Compliance</option>
            <option value="local-content">Local Content</option>
            <option value="jv-compliance">JV Compliance</option>
            <option value="audit">Audit</option>
            <option value="summary">Summary</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="under-review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annual">Annual</option>
            <option value="ad-hoc">Ad-hoc</option>
            <option value="regulatory">Regulatory</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredReports.length} of {reports.length} reports
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
            <ArrowPathIcon className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-gray-400">{report.fileSize}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{report.downloadCount} downloads</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(report.type)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[report.type]}`}>
                        {report.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                        {report.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{report.companyName}</div>
                      {report.projectName && (
                        <div className="text-sm text-gray-500">{report.projectName}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">{report.findings.critical}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">{report.findings.major}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                        <span className="text-xs text-gray-600">{report.findings.minor}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{report.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {report.publishedDate || report.createdDate}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewReport(report)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {showModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">Report Details</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedReport.title}</h4>
                    <p className="text-gray-600">{selectedReport.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedReport.type]}`}>
                        {selectedReport.type.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Category</p>
                      <p className="text-sm text-gray-900">{selectedReport.category.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedReport.status]}`}>
                        {selectedReport.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Priority</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[selectedReport.priority]}`}>
                        {selectedReport.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Author</p>
                      <p className="text-sm text-gray-900">{selectedReport.author}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Reviewer</p>
                      <p className="text-sm text-gray-900">{selectedReport.reviewer || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Created</p>
                      <p className="text-sm text-gray-900">{selectedReport.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Published</p>
                      <p className="text-sm text-gray-900">{selectedReport.publishedDate || 'Not published'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Company</p>
                    <p className="text-sm text-gray-900">{selectedReport.companyName}</p>
                    {selectedReport.projectName && (
                      <p className="text-sm text-gray-500">{selectedReport.projectName}</p>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Summary</h4>
                    <p className="text-sm text-blue-700">{selectedReport.summary}</p>
                  </div>
                </div>
                
                {/* Findings and Recommendations */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Findings Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-700">Critical</p>
                        <p className="text-2xl font-bold text-red-900">{selectedReport.findings.critical}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-orange-700">Major</p>
                        <p className="text-2xl font-bold text-orange-900">{selectedReport.findings.major}</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-yellow-700">Minor</p>
                        <p className="text-2xl font-bold text-yellow-900">{selectedReport.findings.minor}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedReport.findings.total}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedReport.recommendations && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {selectedReport.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">File Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">File Size</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReport.fileSize}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Downloads</p>
                        <p className="text-sm font-medium text-gray-900">{selectedReport.downloadCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Download
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}