'use client';

import { useState } from 'react';
import {
  DocumentTextIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PrinterIcon,
  ShareIcon,
  DocumentArrowDownIcon,
  ChartPieIcon,
  UsersIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Report {
  id: string;
  title: string;
  type: 'personnel' | 'training' | 'safety' | 'compliance' | 'performance' | 'recruitment';
  category: 'monthly' | 'quarterly' | 'annual' | 'custom';
  description: string;
  generatedBy: string;
  generatedDate: string;
  period: {
    start: string;
    end: string;
  };
  status: 'draft' | 'completed' | 'published' | 'archived';
  format: 'pdf' | 'excel' | 'word' | 'powerpoint';
  size: string;
  downloadCount: number;
  tags: string[];
  summary: {
    totalRecords: number;
    keyMetrics: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }[];
    highlights: string[];
  };
}

const mockReports: Report[] = [
  {
    id: 'RPT001',
    title: 'Monthly Personnel Summary Report',
    type: 'personnel',
    category: 'monthly',
    description: 'Comprehensive overview of personnel activities, headcount changes, and key metrics for January 2024.',
    generatedBy: 'Sarah Johnson',
    generatedDate: '2024-02-01',
    period: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    status: 'completed',
    format: 'pdf',
    size: '2.4 MB',
    downloadCount: 45,
    tags: ['headcount', 'recruitment', 'turnover'],
    summary: {
      totalRecords: 1247,
      keyMetrics: [
        { label: 'Total Employees', value: '1,247', trend: 'up' },
        { label: 'New Hires', value: '23', trend: 'up' },
        { label: 'Turnover Rate', value: '2.1%', trend: 'down' },
        { label: 'Training Completion', value: '89%', trend: 'up' }
      ],
      highlights: [
        'Successful completion of Q4 recruitment drive',
        'Improved employee satisfaction scores',
        'Enhanced safety training compliance'
      ]
    }
  },
  {
    id: 'RPT002',
    title: 'Training Effectiveness Analysis Q4 2023',
    type: 'training',
    category: 'quarterly',
    description: 'Analysis of training program effectiveness, completion rates, and impact on performance metrics.',
    generatedBy: 'Michael Chen',
    generatedDate: '2024-01-15',
    period: {
      start: '2023-10-01',
      end: '2023-12-31'
    },
    status: 'published',
    format: 'excel',
    size: '1.8 MB',
    downloadCount: 67,
    tags: ['training', 'effectiveness', 'performance'],
    summary: {
      totalRecords: 456,
      keyMetrics: [
        { label: 'Programs Completed', value: '456', trend: 'up' },
        { label: 'Average Score', value: '87%', trend: 'stable' },
        { label: 'Certification Rate', value: '94%', trend: 'up' },
        { label: 'Cost per Training', value: '$1,250', trend: 'down' }
      ],
      highlights: [
        'High completion rates across all programs',
        'Improved technical skills assessment scores',
        'Cost optimization achieved through digital platforms'
      ]
    }
  },
  {
    id: 'RPT003',
    title: 'Safety Incident Analysis Report',
    type: 'safety',
    category: 'monthly',
    description: 'Detailed analysis of safety incidents, near misses, and preventive measures implemented.',
    generatedBy: 'Grace Okafor',
    generatedDate: '2024-01-28',
    period: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    status: 'completed',
    format: 'pdf',
    size: '3.2 MB',
    downloadCount: 89,
    tags: ['safety', 'incidents', 'prevention'],
    summary: {
      totalRecords: 12,
      keyMetrics: [
        { label: 'Total Incidents', value: '12', trend: 'down' },
        { label: 'Near Misses', value: '8', trend: 'stable' },
        { label: 'Lost Time Injuries', value: '2', trend: 'down' },
        { label: 'Safety Score', value: '96%', trend: 'up' }
      ],
      highlights: [
        'Significant reduction in workplace incidents',
        'Improved safety training compliance',
        'Enhanced reporting culture'
      ]
    }
  },
  {
    id: 'RPT004',
    title: 'Annual Compliance Audit Report 2023',
    type: 'compliance',
    category: 'annual',
    description: 'Comprehensive audit of personnel compliance with regulatory requirements and internal policies.',
    generatedBy: 'David Williams',
    generatedDate: '2024-01-10',
    period: {
      start: '2023-01-01',
      end: '2023-12-31'
    },
    status: 'published',
    format: 'word',
    size: '4.1 MB',
    downloadCount: 123,
    tags: ['compliance', 'audit', 'regulatory'],
    summary: {
      totalRecords: 2456,
      keyMetrics: [
        { label: 'Compliance Rate', value: '98.5%', trend: 'up' },
        { label: 'Policy Updates', value: '15', trend: 'stable' },
        { label: 'Training Hours', value: '12,450', trend: 'up' },
        { label: 'Violations', value: '3', trend: 'down' }
      ],
      highlights: [
        'Excellent overall compliance performance',
        'Successful implementation of new policies',
        'Minimal regulatory violations'
      ]
    }
  },
  {
    id: 'RPT005',
    title: 'Employee Performance Review Summary',
    type: 'performance',
    category: 'quarterly',
    description: 'Summary of employee performance reviews, ratings distribution, and development plans.',
    generatedBy: 'Lisa Anderson',
    generatedDate: '2024-01-20',
    period: {
      start: '2023-10-01',
      end: '2023-12-31'
    },
    status: 'draft',
    format: 'powerpoint',
    size: '5.6 MB',
    downloadCount: 12,
    tags: ['performance', 'reviews', 'development'],
    summary: {
      totalRecords: 1156,
      keyMetrics: [
        { label: 'Reviews Completed', value: '1,156', trend: 'up' },
        { label: 'Average Rating', value: '4.2/5', trend: 'stable' },
        { label: 'Promotions', value: '34', trend: 'up' },
        { label: 'Development Plans', value: '89%', trend: 'up' }
      ],
      highlights: [
        'High completion rate for performance reviews',
        'Strong employee development focus',
        'Increased promotion opportunities'
      ]
    }
  },
  {
    id: 'RPT006',
    title: 'Recruitment Pipeline Analysis',
    type: 'recruitment',
    category: 'monthly',
    description: 'Analysis of recruitment activities, candidate pipeline, and hiring effectiveness.',
    generatedBy: 'James Wilson',
    generatedDate: '2024-02-02',
    period: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    status: 'completed',
    format: 'excel',
    size: '2.1 MB',
    downloadCount: 34,
    tags: ['recruitment', 'hiring', 'pipeline'],
    summary: {
      totalRecords: 234,
      keyMetrics: [
        { label: 'Applications', value: '234', trend: 'up' },
        { label: 'Interviews', value: '67', trend: 'up' },
        { label: 'Offers Made', value: '23', trend: 'stable' },
        { label: 'Acceptance Rate', value: '87%', trend: 'up' }
      ],
      highlights: [
        'Strong candidate pipeline development',
        'Improved interview-to-offer conversion',
        'High offer acceptance rates'
      ]
    }
  }
];

const typeColors = {
  personnel: 'bg-blue-100 text-blue-800',
  training: 'bg-green-100 text-green-800',
  safety: 'bg-red-100 text-red-800',
  compliance: 'bg-purple-100 text-purple-800',
  performance: 'bg-yellow-100 text-yellow-800',
  recruitment: 'bg-indigo-100 text-indigo-800'
};

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  completed: 'bg-green-100 text-green-800',
  published: 'bg-blue-100 text-blue-800',
  archived: 'bg-yellow-100 text-yellow-800'
};

const categoryColors = {
  monthly: 'bg-green-100 text-green-800',
  quarterly: 'bg-blue-100 text-blue-800',
  annual: 'bg-purple-100 text-purple-800',
  custom: 'bg-gray-100 text-gray-800'
};

const formatIcons = {
  pdf: DocumentTextIcon,
  excel: ChartBarIcon,
  word: DocumentTextIcon,
  powerpoint: ChartPieIcon
};

const typeIcons = {
  personnel: UsersIcon,
  training: AcademicCapIcon,
  safety: ShieldCheckIcon,
  compliance: ExclamationTriangleIcon,
  performance: ChartBarIcon,
  recruitment: BriefcaseIcon
};

export default function PersonnelReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return '↗️';
    if (trend === 'down') return '↘️';
    return '→';
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personnel Reports</h1>
          <p className="text-gray-600">Generate and manage personnel-related reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Export All
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <ChartBarIcon className="h-6 w-6 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'draft').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ArrowDownTrayIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.reduce((sum, r) => sum + r.downloadCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
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
            <option value="personnel">Personnel</option>
            <option value="training">Training</option>
            <option value="safety">Safety</option>
            <option value="compliance">Compliance</option>
            <option value="performance">Performance</option>
            <option value="recruitment">Recruitment</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
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
            <option value="custom">Custom</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredReports.length} of {reports.length} reports
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className="space-y-1 w-4 h-4">
                <div className="bg-current h-1 rounded"></div>
                <div className="bg-current h-1 rounded"></div>
                <div className="bg-current h-1 rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredReports.map((report) => {
          const TypeIcon = typeIcons[report.type];
          const FormatIcon = formatIcons[report.format];
          
          return viewMode === 'grid' ? (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TypeIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FormatIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-xs text-gray-500">{report.size}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">{report.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{report.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[report.type]}`}>
                  {report.type.toUpperCase()}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[report.category]}`}>
                  {report.category.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Generated by:</span>
                  <span className="text-gray-900">{report.generatedBy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">{report.generatedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Downloads:</span>
                  <span className="text-gray-900">{report.downloadCount}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleViewReport(report)}
                  className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span className="text-sm">View Details</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ShareIcon className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <PrinterIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <TypeIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[report.status]}`}>
                        {report.status.toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[report.type]}`}>
                        {report.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>By {report.generatedBy}</span>
                      <span>•</span>
                      <span>{report.generatedDate}</span>
                      <span>•</span>
                      <span>{report.downloadCount} downloads</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleViewReport(report)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
                {/* Report Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedReport.title}</h4>
                    <p className="text-gray-600">{selectedReport.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedReport.type]}`}>
                        {selectedReport.type.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Category</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[selectedReport.category]}`}>
                        {selectedReport.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedReport.status]}`}>
                        {selectedReport.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Format</p>
                      <p className="text-sm text-gray-900">{selectedReport.format.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Generated By</p>
                      <p className="text-sm text-gray-900">{selectedReport.generatedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Generated Date</p>
                      <p className="text-sm text-gray-900">{selectedReport.generatedDate}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Period</p>
                      <p className="text-sm text-gray-900">
                        {selectedReport.period.start} to {selectedReport.period.end}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">File Size</p>
                      <p className="text-sm text-gray-900">{selectedReport.size}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tags</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedReport.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Report Summary */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Report Summary</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Total Records</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedReport.summary.totalRecords.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-md font-medium text-gray-900 mb-3">Key Metrics</h5>
                    <div className="space-y-3">
                      {selectedReport.summary.keyMetrics.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                            {metric.trend && (
                              <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                                {getTrendIcon(metric.trend)}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-md font-medium text-gray-900 mb-3">Key Highlights</h5>
                    <ul className="space-y-2">
                      {selectedReport.summary.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
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
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <ShareIcon className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}