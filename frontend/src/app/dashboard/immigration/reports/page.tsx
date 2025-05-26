'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon,
  PermitIcon,
  HistoryIcon,
  ReportIcon,
} from '../../../components/icons/DashboardIcons';

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterReportType, setFilterReportType] = useState('all');
  const [filterTimeframe, setFilterTimeframe] = useState('all');
  const [exportFormat, setExportFormat] = useState('pdf');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/immigration', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Permit Approvals', href: '/dashboard/immigration/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Application Review', href: '/dashboard/immigration/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status', href: '/dashboard/immigration/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Issued Permits', href: '/dashboard/immigration/permits', icon: PermitIcon, current: activeTab === 'permits' },
    { name: 'Approval History', href: '/dashboard/immigration/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Reports', href: '/dashboard/immigration/reports', icon: ReportIcon, current: activeTab === 'reports' },
    { name: 'Notifications', href: '/dashboard/immigration/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/immigration/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/immigration/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  // Mock data for available reports
  const availableReports = [
    {
      id: 'REP-2023-001',
      name: 'Monthly Permit Issuance Summary',
      description: 'Summary of all permits issued in the current month with categorization by type and nationality.',
      type: 'Standard',
      lastGenerated: '2023-12-15',
      formats: ['PDF', 'Excel', 'CSV'],
      category: 'Permits'
    },
    {
      id: 'REP-2023-002',
      name: 'Quarterly Permit Statistics',
      description: 'Detailed quarterly statistics on permit applications, approvals, rejections, and processing times.',
      type: 'Standard',
      lastGenerated: '2023-12-10',
      formats: ['PDF', 'Excel', 'CSV'],
      category: 'Permits'
    },
    {
      id: 'REP-2023-003',
      name: 'Permit Expiry Forecast',
      description: 'List of permits expiring in the next 30, 60, and 90 days with contact information for renewal notifications.',
      type: 'Standard',
      lastGenerated: '2023-12-14',
      formats: ['PDF', 'Excel'],
      category: 'Permits'
    },
    {
      id: 'REP-2023-004',
      name: 'Application Processing Time Analysis',
      description: 'Analysis of application processing times by permit type, company, and reviewing officer.',
      type: 'Analytical',
      lastGenerated: '2023-12-05',
      formats: ['PDF', 'Excel', 'Interactive'],
      category: 'Applications'
    },
    {
      id: 'REP-2023-005',
      name: 'Rejection Reasons Summary',
      description: 'Summary of common rejection reasons with frequency analysis and recommendations for improvement.',
      type: 'Analytical',
      lastGenerated: '2023-11-30',
      formats: ['PDF', 'Excel'],
      category: 'Applications'
    },
    {
      id: 'REP-2023-006',
      name: 'Company Compliance Report',
      description: 'Analysis of company compliance with immigration regulations and permit conditions.',
      type: 'Compliance',
      lastGenerated: '2023-12-01',
      formats: ['PDF', 'Excel'],
      category: 'Compliance'
    },
    {
      id: 'REP-2023-007',
      name: 'Nationality Distribution Analysis',
      description: 'Analysis of permit holders by nationality, sector, and job category.',
      type: 'Analytical',
      lastGenerated: '2023-11-15',
      formats: ['PDF', 'Excel', 'Interactive'],
      category: 'Demographics'
    },
    {
      id: 'REP-2023-008',
      name: 'Officer Performance Metrics',
      description: 'Performance metrics for immigration officers including processing times and approval rates.',
      type: 'Administrative',
      lastGenerated: '2023-12-12',
      formats: ['PDF', 'Excel'],
      category: 'Administrative'
    },
    {
      id: 'REP-2023-009',
      name: 'Annual Permit Trends Report',
      description: 'Year-over-year analysis of permit issuance trends, processing times, and compliance metrics.',
      type: 'Analytical',
      lastGenerated: '2023-01-10',
      formats: ['PDF', 'Excel', 'Interactive', 'Presentation'],
      category: 'Permits'
    },
    {
      id: 'REP-2023-010',
      name: 'System Usage Audit',
      description: 'Audit of system usage by immigration officers including login times and actions performed.',
      type: 'Administrative',
      lastGenerated: '2023-12-08',
      formats: ['PDF', 'Excel'],
      category: 'Administrative'
    },
  ];

  // Filter reports based on search query and filters
  const filteredReports = availableReports.filter(report => {
    const matchesSearch = 
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterReportType === 'all' || report.category === filterReportType;
    
    let matchesTimeframe = true;
    if (filterTimeframe !== 'all') {
      const today = new Date();
      const reportDate = new Date(report.lastGenerated);
      const daysDiff = Math.floor((today.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filterTimeframe) {
        case '7':
          matchesTimeframe = daysDiff <= 7;
          break;
        case '30':
          matchesTimeframe = daysDiff <= 30;
          break;
        case '90':
          matchesTimeframe = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesTimeframe;
  });

  const handleGenerateReport = (id: string) => {
    alert(`Generating report ${id} in ${exportFormat.toUpperCase()} format...`);
  };

  const handleViewReport = (id: string) => {
    alert(`Viewing report ${id}`);
  };

  const handleScheduleReport = (id: string) => {
    alert(`Scheduling recurring generation for report ${id}`);
  };

  const handleCustomizeReport = (id: string) => {
    alert(`Customizing report ${id}`);
  };

  // Get recently generated reports (last 7 days)
  const recentReports = availableReports.filter(report => {
    const reportDate = new Date(report.lastGenerated);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  });

  return (
    <DashboardLayout
      title="Reports"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Immigration Reports</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Creating custom report...')}
            >
              Create Custom Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search reports by name, description, or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-48">
                <select
                  id="report-type-filter"
                  name="report-type-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterReportType}
                  onChange={(e) => setFilterReportType(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Permits">Permits</option>
                  <option value="Applications">Applications</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Demographics">Demographics</option>
                  <option value="Administrative">Administrative</option>
                </select>
              </div>
              <div className="w-40">
                <select
                  id="timeframe-filter"
                  name="timeframe-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterTimeframe}
                  onChange={(e) => setFilterTimeframe(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>
              <div className="w-40">
                <select
                  id="export-format"
                  name="export-format"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="interactive">Interactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Generated</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Formats</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <tr key={report.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {report.name}
                        <div className="text-xs text-gray-500 mt-1">{report.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.lastGenerated).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-1">
                          {report.formats.map((format, index) => (
                            <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100">{format}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => handleGenerateReport(report.id)}
                          >
                            Generate
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handleViewReport(report.id)}
                          >
                            View
                          </button>
                          <button 
                            className="text-purple-600 hover:text-purple-900"
                            onClick={() => handleScheduleReport(report.id)}
                          >
                            Schedule
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900"
                            onClick={() => handleCustomizeReport(report.id)}
                          >
                            Customize
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No reports found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recently Generated Reports */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recently Generated Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentReports.length > 0 ? (
              recentReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{report.id}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">{report.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Generated: {new Date(report.lastGenerated).toLocaleDateString()}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex space-x-1">
                      {report.formats.slice(0, 2).map((format, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100">{format}</span>
                      ))}
                      {report.formats.length > 2 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100">+{report.formats.length - 2}</span>
                      )}
                    </div>
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-900"
                      onClick={() => handleViewReport(report.id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-sm text-gray-500 py-4">
                No reports have been generated in the last 7 days.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}