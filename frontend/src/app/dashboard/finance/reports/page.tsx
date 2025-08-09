'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getFinanceMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface FinancialReport {
  id: string;
  title: string;
  type: 'Revenue' | 'Expense' | 'Cash Flow' | 'Budget' | 'Audit' | 'Tax';
  period: string;
  status: 'Generated' | 'In Progress' | 'Pending Review' | 'Approved';
  generatedDate: string;
  generatedBy: string;
  fileSize: string;
  description: string;
  totalAmount?: string;
  currency: string;
}

const mockReports: FinancialReport[] = [
  {
    id: 'FR-001',
    title: 'Q4 2023 Revenue Report',
    type: 'Revenue',
    period: 'Q4 2023',
    status: 'Approved',
    generatedDate: '2024-01-10',
    generatedBy: 'Sarah Mensah',
    fileSize: '2.4 MB',
    description: 'Comprehensive revenue analysis for Q4 2023 including all permit fees and penalties',
    totalAmount: '45,678,900',
    currency: 'GHS'
  },
  {
    id: 'FR-002',
    title: 'Monthly Expense Summary - December 2023',
    type: 'Expense',
    period: 'December 2023',
    status: 'Generated',
    generatedDate: '2024-01-08',
    generatedBy: 'Michael Osei',
    fileSize: '1.8 MB',
    description: 'Detailed breakdown of operational expenses for December 2023',
    totalAmount: '12,345,600',
    currency: 'GHS'
  },
  {
    id: 'FR-003',
    title: 'Annual Cash Flow Statement 2023',
    type: 'Cash Flow',
    period: '2023',
    status: 'In Progress',
    generatedDate: '2024-01-12',
    generatedBy: 'Grace Asante',
    fileSize: '3.2 MB',
    description: 'Annual cash flow analysis including all inflows and outflows',
    totalAmount: '89,234,500',
    currency: 'GHS'
  },
  {
    id: 'FR-004',
    title: 'Budget vs Actual Analysis Q4',
    type: 'Budget',
    period: 'Q4 2023',
    status: 'Pending Review',
    generatedDate: '2024-01-11',
    generatedBy: 'John Kwame',
    fileSize: '1.5 MB',
    description: 'Comparison of budgeted vs actual financial performance',
    totalAmount: '67,890,200',
    currency: 'GHS'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Approved':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'Generated':
      return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
    case 'In Progress':
      return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    case 'Pending Review':
      return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
    default:
      return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Revenue':
      return 'bg-green-100 text-green-800';
    case 'Expense':
      return 'bg-red-100 text-red-800';
    case 'Cash Flow':
      return 'bg-blue-100 text-blue-800';
    case 'Budget':
      return 'bg-purple-100 text-purple-800';
    case 'Audit':
      return 'bg-yellow-100 text-yellow-800';
    case 'Tax':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function FinanceReportsPage() {
  const [reports, setReports] = useState<FinancialReport[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState<FinancialReport | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getFinanceMenuItems(pathname);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleGenerateReport = (reportData: any) => {
    const newReport: FinancialReport = {
      id: `FR-${String(reports.length + 1).padStart(3, '0')}`,
      ...reportData,
      status: 'In Progress' as const,
      generatedDate: new Date().toISOString().split('T')[0],
      generatedBy: 'Current User',
      fileSize: '0 MB'
    };
    setReports([newReport, ...reports]);
    setShowGenerateModal(false);
  };

  const handleDownloadReport = (reportId: string) => {
    // Simulate download
    console.log(`Downloading report ${reportId}`);
  };

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
            <p className="text-gray-600">Generate and manage financial reports and statements</p>
          </div>
          <button
            onClick={() => setShowGenerateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Generate Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'Approved').length}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {reports.filter(r => r.status === 'In Progress').length}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">
                  {reports.filter(r => new Date(r.generatedDate).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Revenue">Revenue</option>
                <option value="Expense">Expense</option>
                <option value="Cash Flow">Cash Flow</option>
                <option value="Budget">Budget</option>
                <option value="Audit">Audit</option>
                <option value="Tax">Tax</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Generated">Generated</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Financial Reports</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredReports.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(report.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Period: {report.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DocumentTextIcon className="h-4 w-4" />
                        <span>Generated: {new Date(report.generatedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>By: {report.generatedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Size: {report.fileSize}</span>
                      </div>
                    </div>
                    {report.totalAmount && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <CurrencyDollarIcon className="h-4 w-4" />
                        <span className="font-semibold">
                          Total Amount: {report.currency} {report.totalAmount}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        report.status === 'Generated' ? 'bg-blue-100 text-blue-800' :
                        report.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {getStatusIcon(report.status)}
                        {report.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    {(report.status === 'Generated' || report.status === 'Approved') && (
                      <button
                        onClick={() => handleDownloadReport(report.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                        title="Download Report"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Report Modal */}
        {showGenerateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Generate New Report</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const reportData = {
                    title: formData.get('title'),
                    type: formData.get('type'),
                    period: formData.get('period'),
                    description: formData.get('description'),
                    currency: formData.get('currency') || 'GHS'
                  };
                  handleGenerateReport(reportData);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Q1 2024 Revenue Report"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                    <select
                      name="type"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="Revenue">Revenue</option>
                      <option value="Expense">Expense</option>
                      <option value="Cash Flow">Cash Flow</option>
                      <option value="Budget">Budget</option>
                      <option value="Audit">Audit</option>
                      <option value="Tax">Tax</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Period</label>
                    <input
                      type="text"
                      name="period"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Q1 2024, January 2024, 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      name="currency"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="GHS">GHS (Ghana Cedis)</option>
                      <option value="USD">USD (US Dollars)</option>
                      <option value="EUR">EUR (Euros)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the report content and purpose"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowGenerateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Generate Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Report Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Report ID</label>
                    <p className="text-gray-900">{selectedReport.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedReport.status)}
                      <span>{selectedReport.status}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-gray-900">{selectedReport.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`px-2 py-1 rounded text-sm ${getTypeColor(selectedReport.type)}`}>
                      {selectedReport.type}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Period</label>
                    <p className="text-gray-900">{selectedReport.period}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated Date</label>
                    <p className="text-gray-900">{new Date(selectedReport.generatedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Generated By</label>
                    <p className="text-gray-900">{selectedReport.generatedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">File Size</label>
                    <p className="text-gray-900">{selectedReport.fileSize}</p>
                  </div>
                  {selectedReport.totalAmount && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Total Amount</label>
                        <p className="text-gray-900 font-semibold">
                          {selectedReport.currency} {selectedReport.totalAmount}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <p className="text-gray-900">{selectedReport.currency}</p>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-900 mt-1">{selectedReport.description}</p>
                </div>
                {(selectedReport.status === 'Generated' || selectedReport.status === 'Approved') && (
                  <div className="pt-4 border-t">
                    <button
                      onClick={() => handleDownloadReport(selectedReport.id)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                      Download Report
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}