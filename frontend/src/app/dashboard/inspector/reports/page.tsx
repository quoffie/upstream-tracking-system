'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  EyeIcon, 
  ArrowDownTrayIcon, 
  FunnelIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getInspectorMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface InspectionReport {
  id: string;
  inspectionId: string;
  title: string;
  company: string;
  type: string;
  inspector: string;
  date: string;
  status: 'draft' | 'submitted' | 'approved' | 'requires-revision';
  findings: number;
  criticalIssues: number;
  complianceScore: number;
  location: string;
  reportUrl?: string;
  lastModified: string;
}

const mockReports: InspectionReport[] = [
  {
    id: 'RPT-2024-0001',
    inspectionId: 'INS-2024-0001',
    title: 'Safety Compliance Inspection Report',
    company: 'Tullow Ghana Ltd',
    type: 'Safety Inspection',
    inspector: 'John Mensah',
    date: '2024-01-15',
    status: 'approved',
    findings: 8,
    criticalIssues: 2,
    complianceScore: 85,
    location: 'TEN Field - Platform A',
    lastModified: '2024-01-16T14:30:00Z'
  },
  {
    id: 'RPT-2024-0002',
    inspectionId: 'INS-2024-0002',
    title: 'Environmental Audit Report',
    company: 'Eni Ghana Ltd',
    type: 'Environmental Audit',
    inspector: 'Sarah Asante',
    date: '2024-01-12',
    status: 'submitted',
    findings: 5,
    criticalIssues: 0,
    complianceScore: 92,
    location: 'Sankofa Field - FPSO',
    lastModified: '2024-01-12T16:45:00Z'
  },
  {
    id: 'RPT-2024-0003',
    inspectionId: 'INS-2024-0003',
    title: 'Technical Equipment Review Report',
    company: 'Springfield E&P',
    type: 'Technical Review',
    inspector: 'Michael Osei',
    date: '2024-01-08',
    status: 'approved',
    findings: 12,
    criticalIssues: 1,
    complianceScore: 78,
    location: 'West Cape Three Points',
    lastModified: '2024-01-09T10:20:00Z'
  },
  {
    id: 'RPT-2024-0004',
    inspectionId: 'INS-2024-0004',
    title: 'Operational Procedures Audit Report',
    company: 'Kosmos Energy',
    type: 'Operational Audit',
    inspector: 'Grace Adjei',
    date: '2024-01-05',
    status: 'requires-revision',
    findings: 15,
    criticalIssues: 5,
    complianceScore: 65,
    location: 'Jubilee Field - Platform B',
    lastModified: '2024-01-06T09:15:00Z'
  },
  {
    id: 'RPT-2024-0005',
    inspectionId: 'INS-2024-0005',
    title: 'Pre-drilling Safety Assessment',
    company: 'Hess Corporation',
    type: 'Safety Inspection',
    inspector: 'Emmanuel Boateng',
    date: '2024-01-20',
    status: 'draft',
    findings: 0,
    criticalIssues: 0,
    complianceScore: 0,
    location: 'Deepwater Tano - Rig 3',
    lastModified: '2024-01-20T11:30:00Z'
  }
];

// Chart data
const reportStatusData = [
  { name: 'Approved', value: 2, color: '#10B981' },
  { name: 'Submitted', value: 1, color: '#3B82F6' },
  { name: 'Draft', value: 1, color: '#F59E0B' },
  { name: 'Requires Revision', value: 1, color: '#EF4444' }
];

const complianceScoreData = [
  { name: 'Tullow Ghana', score: 85 },
  { name: 'Eni Ghana', score: 92 },
  { name: 'Springfield E&P', score: 78 },
  { name: 'Kosmos Energy', score: 65 },
  { name: 'Hess Corporation', score: 0 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft': return 'bg-yellow-100 text-yellow-800';
    case 'submitted': return 'bg-blue-100 text-blue-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'requires-revision': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'draft': return <ClockIcon className="h-4 w-4" />;
    case 'submitted': return <DocumentTextIcon className="h-4 w-4" />;
    case 'approved': return <CheckCircleIcon className="h-4 w-4" />;
    case 'requires-revision': return <ExclamationTriangleIcon className="h-4 w-4" />;
    default: return <DocumentTextIcon className="h-4 w-4" />;
  }
};

export default function InspectionReportsPage() {
  const [reports, setReports] = useState<InspectionReport[]>(mockReports);
  const [filteredReports, setFilteredReports] = useState<InspectionReport[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState<InspectionReport | null>(null);
  const [showStats, setShowStats] = useState(true);
  
  const pathname = usePathname();
  const sidebarItems = getInspectorMenuItems(pathname);

  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter);
    }

    setFilteredReports(filtered);
  }, [searchTerm, statusFilter, typeFilter, reports]);

  const handleDownloadReport = (reportId: string) => {
    // Simulate report download
    alert(`Downloading report ${reportId}...`);
  };

  const handleViewReport = (report: InspectionReport) => {
    setSelectedReport(report);
  };

  const totalFindings = reports.reduce((sum, report) => sum + report.findings, 0);
  const totalCriticalIssues = reports.reduce((sum, report) => sum + report.criticalIssues, 0);
  const averageComplianceScore = reports.length > 0 
    ? Math.round(reports.reduce((sum, report) => sum + report.complianceScore, 0) / reports.length)
    : 0;

  return (
    <DashboardLayout
      title="Inspection Reports"
      userRole="Inspector"
      userName="Inspector Panel"
      userInitials="IP"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inspection Reports</h1>
            <p className="text-gray-600 mt-1">View and manage inspection reports</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowStats(!showStats)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChartBarIcon className="h-4 w-4 mr-2" />
              {showStats ? 'Hide' : 'Show'} Stats
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
            <Link
              href="/dashboard/inspector/reports/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              New Report
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
                      <dd className="text-lg font-medium text-gray-900">{reports.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Findings</dt>
                      <dd className="text-lg font-medium text-gray-900">{totalFindings}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Critical Issues</dt>
                      <dd className="text-lg font-medium text-gray-900">{totalCriticalIssues}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg Compliance</dt>
                      <dd className="text-lg font-medium text-gray-900">{averageComplianceScore}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {showStats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Report Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Scores by Company</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports by title, company, inspector, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="requires-revision">Requires Revision</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Safety Inspection">Safety Inspection</option>
                    <option value="Environmental Audit">Environmental Audit</option>
                    <option value="Technical Review">Technical Review</option>
                    <option value="Operational Audit">Operational Audit</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Reports ({filteredReports.length})
            </h3>
          </div>
          
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.id}</div>
                          <div className="text-sm text-gray-500">{report.title}</div>
                          <div className="text-xs text-gray-400">Inspector: {report.inspector}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">{report.company}</div>
                            <div className="text-sm text-gray-500">{report.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {report.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {getStatusIcon(report.status)}
                            <span className="ml-1">
                              {report.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.findings} total
                          {report.criticalIssues > 0 && (
                            <div className="text-xs text-red-600">
                              {report.criticalIssues} critical
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`text-sm font-medium ${
                            report.complianceScore >= 90 ? 'text-green-600' :
                            report.complianceScore >= 75 ? 'text-yellow-600' :
                            report.complianceScore > 0 ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {report.complianceScore > 0 ? `${report.complianceScore}%` : 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleViewReport(report)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EyeIcon className="h-4 w-4 inline mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownloadReport(report.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4 inline mr-1" />
                          Download
                        </button>
                        <Link
                          href={`/dashboard/inspector/reports/${report.id}/edit`}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}