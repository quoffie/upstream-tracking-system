'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface Report {
  id: string;
  title: string;
  type: 'compliance' | 'performance' | 'analytics' | 'audit' | 'summary';
  description: string;
  generatedBy: string;
  generatedDate: string;
  period: string;
  status: 'completed' | 'in_progress' | 'scheduled' | 'failed';
  format: 'PDF' | 'Excel' | 'Word' | 'PowerPoint';
  size: string;
  downloadCount: number;
  companies: string[];
  category: 'monthly' | 'quarterly' | 'annual' | 'ad_hoc';
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

const mockReports: Report[] = [
  {
    id: 'RPT001',
    title: 'Q4 2023 Local Content Compliance Report',
    type: 'compliance',
    description: 'Comprehensive analysis of local content compliance across all registered companies',
    generatedBy: 'Dr. Adebayo Johnson',
    generatedDate: '2024-01-15',
    period: 'Q4 2023',
    status: 'completed',
    format: 'PDF',
    size: '2.4 MB',
    downloadCount: 45,
    companies: ['Shell Nigeria', 'TotalEnergies', 'Chevron Nigeria', 'ExxonMobil'],
    category: 'quarterly',
    priority: 'high',
    tags: ['compliance', 'quarterly', 'analysis']
  },
  {
    id: 'RPT002',
    title: 'Local Content Performance Dashboard - January 2024',
    type: 'performance',
    description: 'Monthly performance metrics and KPI analysis for local content initiatives',
    generatedBy: 'Mrs. Fatima Abdullahi',
    generatedDate: '2024-02-01',
    period: 'January 2024',
    status: 'completed',
    format: 'Excel',
    size: '1.8 MB',
    downloadCount: 32,
    companies: ['Shell Nigeria', 'TotalEnergies', 'Chevron Nigeria'],
    category: 'monthly',
    priority: 'medium',
    tags: ['performance', 'kpi', 'monthly']
  },
  {
    id: 'RPT003',
    title: 'Training Program Effectiveness Analysis',
    type: 'analytics',
    description: 'Detailed analysis of local content training programs and their impact on capacity building',
    generatedBy: 'Eng. Chidi Okafor',
    generatedDate: '2024-01-28',
    period: '2023 Full Year',
    status: 'in_progress',
    format: 'PowerPoint',
    size: '3.2 MB',
    downloadCount: 18,
    companies: ['All Registered Companies'],
    category: 'annual',
    priority: 'high',
    tags: ['training', 'analytics', 'capacity building']
  },
  {
    id: 'RPT004',
    title: 'Supplier Development Audit Report',
    type: 'audit',
    description: 'Audit findings on local supplier development programs and procurement practices',
    generatedBy: 'Mr. Ibrahim Musa',
    generatedDate: '2024-01-20',
    period: 'H2 2023',
    status: 'completed',
    format: 'Word',
    size: '1.5 MB',
    downloadCount: 28,
    companies: ['TotalEnergies', 'Chevron Nigeria'],
    category: 'ad_hoc',
    priority: 'high',
    tags: ['audit', 'suppliers', 'procurement']
  },
  {
    id: 'RPT005',
    title: 'Executive Summary - Local Content Progress',
    type: 'summary',
    description: 'High-level executive summary of local content progress and key achievements',
    generatedBy: 'Dr. Amina Hassan',
    generatedDate: '2024-02-05',
    period: 'Q1 2024',
    status: 'scheduled',
    format: 'PDF',
    size: '0.8 MB',
    downloadCount: 0,
    companies: ['All Registered Companies'],
    category: 'quarterly',
    priority: 'high',
    tags: ['executive', 'summary', 'progress']
  }
];

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  scheduled: 'bg-blue-100 text-blue-800',
  failed: 'bg-red-100 text-red-800'
};

const statusIcons = {
  completed: CheckCircleIcon,
  in_progress: ClockIcon,
  scheduled: CalendarIcon,
  failed: XCircleIcon
};

const typeColors = {
  compliance: 'bg-blue-100 text-blue-800',
  performance: 'bg-green-100 text-green-800',
  analytics: 'bg-purple-100 text-purple-800',
  audit: 'bg-red-100 text-red-800',
  summary: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
};

const formatColors = {
  PDF: 'bg-red-100 text-red-800',
  Excel: 'bg-green-100 text-green-800',
  Word: 'bg-blue-100 text-blue-800',
  PowerPoint: 'bg-orange-100 text-orange-800'
};

export default function LocalContentReportsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory;
  });

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setShowDetails(true);
  };

  const handleDownload = (report: Report) => {
    // Simulate download
    console.log(`Downloading report: ${report.title}`);
  };

  const totalReports = mockReports.length;
  const completedReports = mockReports.filter(report => report.status === 'completed').length;
  const inProgressReports = mockReports.filter(report => report.status === 'in_progress').length;
  const totalDownloads = mockReports.reduce((sum, report) => sum + report.downloadCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Reports</h1>
          <p className="text-gray-600">Generate and manage local content compliance and performance reports</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push('/dashboard/local-content/reports/generate')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Generate Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <CogIcon className="h-5 w-5" />
            Report Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ArrowDownTrayIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
              <option value="failed">Failed</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="compliance">Compliance</option>
              <option value="performance">Performance</option>
              <option value="analytics">Analytics</option>
              <option value="audit">Audit</option>
              <option value="summary">Summary</option>
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
              <option value="ad_hoc">Ad Hoc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format & Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => {
                const StatusIcon = statusIcons[report.status];
                return (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-500">{report.description}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Period: {report.period} | ID: {report.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[report.type]}`}>
                          {report.type.toUpperCase()}
                        </span>
                        <div className="text-xs text-gray-500">{report.category.replace('_', ' ').toUpperCase()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{report.generatedBy}</div>
                        <div className="text-sm text-gray-500">{report.generatedDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formatColors[report.format]}`}>
                          {report.format}
                        </span>
                        <div className="text-xs text-gray-500">{report.size}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{report.downloadCount}</div>
                      <div className={`text-xs font-medium ${priorityColors[report.priority]}`}>
                        {report.priority.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(report)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        {report.status === 'completed' && (
                          <button 
                            onClick={() => handleDownload(report)}
                            className="text-green-600 hover:text-green-900"
                            title="Download Report"
                          >
                            <ArrowDownTrayIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {showDetails && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Report ID</label>
                    <p className="text-sm text-gray-900">{selectedReport.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated Date</label>
                    <p className="text-sm text-gray-900">{selectedReport.generatedDate}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Report Title</label>
                  <p className="text-sm text-gray-900">{selectedReport.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedReport.description}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedReport.type]}`}>
                      {selectedReport.type.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedReport.status]}`}>
                      {selectedReport.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedReport.category.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated By</label>
                    <p className="text-sm text-gray-900">{selectedReport.generatedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Report Period</label>
                    <p className="text-sm text-gray-900">{selectedReport.period}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Format</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${formatColors[selectedReport.format]}`}>
                      {selectedReport.format}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">File Size</label>
                    <p className="text-sm text-gray-900">{selectedReport.size}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Download Count</label>
                    <p className="text-sm text-gray-900">{selectedReport.downloadCount}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Companies Covered</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedReport.companies.map((company, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedReport.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                {selectedReport.status === 'completed' && (
                  <button 
                    onClick={() => handleDownload(selectedReport)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Download Report
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Share Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}