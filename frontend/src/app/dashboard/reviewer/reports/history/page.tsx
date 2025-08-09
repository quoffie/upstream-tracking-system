'use client';

import { useState } from 'react';
import { DocumentTextIcon, CalendarIcon, UserIcon, ArrowDownTrayIcon, EyeIcon, MagnifyingGlassIcon, FunnelIcon, ChartBarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface HistoricalReport {
  id: string;
  title: string;
  type: 'compliance' | 'inspection' | 'local_content' | 'jv_compliance' | 'financial' | 'operational' | 'audit' | 'regulatory';
  generatedAt: string;
  generatedBy: string;
  status: 'completed' | 'archived' | 'expired' | 'superseded';
  downloadUrl: string;
  fileSize: number;
  format: 'pdf' | 'excel' | 'csv' | 'word';
  description: string;
  tags: string[];
  accessLevel: 'public' | 'restricted' | 'confidential';
  expiryDate?: string;
  supersededBy?: string;
  downloadCount: number;
  lastAccessed?: string;
  version: string;
  approvedBy?: string;
  approvalDate?: string;
}

const mockHistoricalReports: HistoricalReport[] = [
  {
    id: 'HR001',
    title: 'Q4 2023 Compliance Summary Report',
    type: 'compliance',
    generatedAt: '2024-01-15 10:30:00',
    generatedBy: 'Dr. Folake Solanke',
    status: 'completed',
    downloadUrl: '/reports/HR001.pdf',
    fileSize: 3457600,
    format: 'pdf',
    description: 'Comprehensive quarterly compliance assessment covering all major operators',
    tags: ['quarterly', 'compliance', 'summary', 'operators'],
    accessLevel: 'restricted',
    downloadCount: 47,
    lastAccessed: '2024-02-20 14:22:00',
    version: '1.2',
    approvedBy: 'Engr. Adebayo Ogundimu',
    approvalDate: '2024-01-16 09:15:00'
  },
  {
    id: 'HR002',
    title: 'Local Content Training Assessment 2023',
    type: 'local_content',
    generatedAt: '2023-12-20 16:45:00',
    generatedBy: 'Dr. Amina Hassan',
    status: 'archived',
    downloadUrl: '/reports/HR002.xlsx',
    fileSize: 2048576,
    format: 'excel',
    description: 'Annual assessment of local content training programs across all registered companies',
    tags: ['annual', 'training', 'local-content', 'assessment'],
    accessLevel: 'public',
    downloadCount: 123,
    lastAccessed: '2024-02-18 11:30:00',
    version: '2.0',
    approvedBy: 'Dr. Kemi Adeosun',
    approvalDate: '2023-12-22 08:00:00'
  },
  {
    id: 'HR003',
    title: 'Joint Venture Equity Verification Report',
    type: 'jv_compliance',
    generatedAt: '2024-02-01 09:15:00',
    generatedBy: 'Barr. Chidi Okafor',
    status: 'completed',
    downloadUrl: '/reports/HR003.pdf',
    fileSize: 1876543,
    format: 'pdf',
    description: 'Detailed verification of equity structures in active joint ventures',
    tags: ['jv', 'equity', 'verification', 'structures'],
    accessLevel: 'confidential',
    downloadCount: 12,
    lastAccessed: '2024-02-15 13:45:00',
    version: '1.0',
    approvedBy: 'Dr. Folake Solanke',
    approvalDate: '2024-02-02 10:30:00'
  },
  {
    id: 'HR004',
    title: 'Inspection Performance Analysis Q1 2024',
    type: 'inspection',
    generatedAt: '2024-01-30 14:20:00',
    generatedBy: 'Engr. Tunde Bakare',
    status: 'completed',
    downloadUrl: '/reports/HR004.pdf',
    fileSize: 4123456,
    format: 'pdf',
    description: 'Quarterly analysis of inspection activities, findings, and resolution rates',
    tags: ['quarterly', 'inspection', 'performance', 'analysis'],
    accessLevel: 'restricted',
    downloadCount: 34,
    lastAccessed: '2024-02-19 16:10:00',
    version: '1.1',
    approvedBy: 'Dr. Amina Hassan',
    approvalDate: '2024-01-31 11:00:00'
  },
  {
    id: 'HR005',
    title: 'Technology Transfer Compliance Review 2023',
    type: 'local_content',
    generatedAt: '2023-11-15 11:30:00',
    generatedBy: 'Dr. Emeka Okonkwo',
    status: 'superseded',
    downloadUrl: '/reports/HR005.docx',
    fileSize: 987654,
    format: 'word',
    description: 'Annual review of technology transfer initiatives and compliance status',
    tags: ['annual', 'technology-transfer', 'compliance', 'review'],
    accessLevel: 'restricted',
    supersededBy: 'HR012',
    downloadCount: 67,
    lastAccessed: '2024-01-10 09:20:00',
    version: '1.0',
    approvedBy: 'Dr. Kemi Adeosun',
    approvalDate: '2023-11-16 14:15:00'
  },
  {
    id: 'HR006',
    title: 'Financial Compliance Audit Report',
    type: 'financial',
    generatedAt: '2024-01-10 13:45:00',
    generatedBy: 'Mrs. Funmi Adebayo',
    status: 'completed',
    downloadUrl: '/reports/HR006.xlsx',
    fileSize: 3654321,
    format: 'excel',
    description: 'Comprehensive audit of financial compliance across all permit holders',
    tags: ['audit', 'financial', 'compliance', 'permits'],
    accessLevel: 'confidential',
    downloadCount: 8,
    lastAccessed: '2024-02-12 10:15:00',
    version: '1.0',
    approvedBy: 'Engr. Adebayo Ogundimu',
    approvalDate: '2024-01-11 15:30:00'
  },
  {
    id: 'HR007',
    title: 'Regulatory Trends Analysis 2023',
    type: 'regulatory',
    generatedAt: '2023-12-31 23:59:00',
    generatedBy: 'Dr. Folake Solanke',
    status: 'archived',
    downloadUrl: '/reports/HR007.pdf',
    fileSize: 5432109,
    format: 'pdf',
    description: 'Year-end analysis of regulatory trends and industry compliance patterns',
    tags: ['annual', 'trends', 'regulatory', 'industry'],
    accessLevel: 'public',
    downloadCount: 156,
    lastAccessed: '2024-02-21 08:45:00',
    version: '1.3',
    approvedBy: 'Dr. Kemi Adeosun',
    approvalDate: '2024-01-02 10:00:00'
  },
  {
    id: 'HR008',
    title: 'Operational Efficiency Report Q3 2023',
    type: 'operational',
    generatedAt: '2023-10-15 12:00:00',
    generatedBy: 'Engr. Biodun Olatunji',
    status: 'expired',
    downloadUrl: '/reports/HR008.csv',
    fileSize: 876543,
    format: 'csv',
    description: 'Quarterly assessment of operational efficiency metrics and KPIs',
    tags: ['quarterly', 'efficiency', 'operational', 'kpi'],
    accessLevel: 'restricted',
    expiryDate: '2024-01-15',
    downloadCount: 23,
    lastAccessed: '2023-12-20 14:30:00',
    version: '1.0',
    approvedBy: 'Dr. Amina Hassan',
    approvalDate: '2023-10-16 09:30:00'
  }
];

export default function ReportsHistoryPage() {
  const [reports, setReports] = useState<HistoricalReport[]>(mockHistoricalReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<HistoricalReport | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'downloads' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and search logic
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesAccess = accessFilter === 'all' || report.accessLevel === accessFilter;
    
    let matchesDate = true;
    if (dateRange !== 'all') {
      const reportDate = new Date(report.generatedAt);
      const now = new Date();
      switch (dateRange) {
        case 'week':
          matchesDate = (now.getTime() - reportDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          break;
        case 'month':
          matchesDate = (now.getTime() - reportDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          break;
        case 'quarter':
          matchesDate = (now.getTime() - reportDate.getTime()) <= 90 * 24 * 60 * 60 * 1000;
          break;
        case 'year':
          matchesDate = (now.getTime() - reportDate.getTime()) <= 365 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesAccess && matchesDate;
  });

  // Sort logic
  const sortedReports = [...filteredReports].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.generatedAt).getTime() - new Date(b.generatedAt).getTime();
        break;
      case 'downloads':
        comparison = a.downloadCount - b.downloadCount;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'compliance':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'inspection':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'local_content':
        return <UserIcon className="w-5 h-5" />;
      case 'jv_compliance':
        return <ChartBarIcon className="w-5 h-5" />;
      case 'financial':
        return <ChartBarIcon className="w-5 h-5" />;
      case 'operational':
        return <ClockIcon className="w-5 h-5" />;
      case 'audit':
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'regulatory':
        return <DocumentTextIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'compliance':
        return 'bg-green-100 text-green-800';
      case 'inspection':
        return 'bg-blue-100 text-blue-800';
      case 'local_content':
        return 'bg-purple-100 text-purple-800';
      case 'jv_compliance':
        return 'bg-orange-100 text-orange-800';
      case 'financial':
        return 'bg-yellow-100 text-yellow-800';
      case 'operational':
        return 'bg-gray-100 text-gray-800';
      case 'audit':
        return 'bg-red-100 text-red-800';
      case 'regulatory':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'superseded':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessColor = (access: string) => {
    switch (access) {
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'restricted':
        return 'bg-yellow-100 text-yellow-800';
      case 'confidential':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  const handleViewDetails = (report: HistoricalReport) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  const handleDownload = (report: HistoricalReport) => {
    // Simulate download
    setReports(prev => prev.map(r => 
      r.id === report.id 
        ? { ...r, downloadCount: r.downloadCount + 1, lastAccessed: new Date().toISOString().replace('T', ' ').substring(0, 19) }
        : r
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports History</h1>
          <p className="text-sm text-gray-600">Browse and access previously generated reports</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'completed').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ArrowDownTrayIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{reports.reduce((sum, r) => sum + r.downloadCount, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => {
                  const reportDate = new Date(r.generatedAt);
                  const now = new Date();
                  return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="compliance">Compliance</option>
              <option value="inspection">Inspection</option>
              <option value="local_content">Local Content</option>
              <option value="jv_compliance">JV Compliance</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="audit">Audit</option>
              <option value="regulatory">Regulatory</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
              <option value="expired">Expired</option>
              <option value="superseded">Superseded</option>
            </select>
          </div>

          {/* Access Filter */}
          <div>
            <select
              value={accessFilter}
              onChange={(e) => setAccessFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Access</option>
              <option value="public">Public</option>
              <option value="restricted">Restricted</option>
              <option value="confidential">Confidential</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4 mt-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'downloads' | 'title')}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Date Generated</option>
            <option value="downloads">Download Count</option>
            <option value="title">Title</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Reports ({sortedReports.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Access</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {report.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                        {report.tags.length > 3 && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            +{report.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {getTypeIcon(report.type)}
                      <span className="ml-1">{report.type.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{formatDate(report.generatedAt)}</div>
                      <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessColor(report.accessLevel)}`}>
                      {report.accessLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.downloadCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatFileSize(report.fileSize)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(report)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View
                      </button>
                      {report.status === 'completed' && (
                        <button
                          onClick={() => handleDownload(report)}
                          className="text-green-600 hover:text-green-900 flex items-center"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Report Details
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Basic Information</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div><span className="font-medium">Title:</span> {selectedReport.title}</div>
                      <div><span className="font-medium">ID:</span> {selectedReport.id}</div>
                      <div><span className="font-medium">Version:</span> {selectedReport.version}</div>
                      <div><span className="font-medium">Format:</span> {selectedReport.format.toUpperCase()}</div>
                      <div><span className="font-medium">Size:</span> {formatFileSize(selectedReport.fileSize)}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Generation Details</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div><span className="font-medium">Generated:</span> {formatDate(selectedReport.generatedAt)}</div>
                      <div><span className="font-medium">Generated By:</span> {selectedReport.generatedBy}</div>
                      {selectedReport.approvedBy && (
                        <div><span className="font-medium">Approved By:</span> {selectedReport.approvedBy}</div>
                      )}
                      {selectedReport.approvalDate && (
                        <div><span className="font-medium">Approved:</span> {formatDate(selectedReport.approvalDate)}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Status &amp; Access</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Type:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedReport.type)}`}>
                          {getTypeIcon(selectedReport.type)}
                          <span className="ml-1">{selectedReport.type.replace('_', ' ').toUpperCase()}</span>
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedReport.status)}`}>
                          {selectedReport.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">Access Level:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessColor(selectedReport.accessLevel)}`}>
                          {selectedReport.accessLevel.toUpperCase()}
                        </span>
                      </div>
                      {selectedReport.expiryDate && (
                        <div><span className="font-medium">Expires:</span> {formatDate(selectedReport.expiryDate)}</div>
                      )}
                      {selectedReport.supersededBy && (
                        <div><span className="font-medium">Superseded By:</span> {selectedReport.supersededBy}</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Usage Statistics</h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div><span className="font-medium">Downloads:</span> {selectedReport.downloadCount}</div>
                      {selectedReport.lastAccessed && (
                        <div><span className="font-medium">Last Accessed:</span> {formatDate(selectedReport.lastAccessed)}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedReport.description}</p>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedReport.tags.map(tag => (
                    <span key={tag} className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
                {selectedReport.status === 'completed' && (
                  <button
                    onClick={() => {
                      handleDownload(selectedReport);
                      setShowDetailsModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>Download Report</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}