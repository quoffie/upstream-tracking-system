'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon, CogIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface TechnologyTransferReport {
  id: string;
  companyName: string;
  reportPeriod: string;
  submissionDate: string;
  reportType: 'quarterly' | 'annual' | 'project_specific';
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'requires_revision';
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  complianceScore: number;
  technologiesTransferred: number;
  localPersonnelTrained: number;
  knowledgeAreasCount: number;
  investmentAmount: number;
  documents: string[];
}

const mockTechTransferReports: TechnologyTransferReport[] = [
  {
    id: 'TTR001',
    companyName: 'Shell Petroleum Development Company',
    reportPeriod: 'Q4 2023',
    submissionDate: '2024-01-15',
    reportType: 'quarterly',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-30',
    complianceScore: 88,
    technologiesTransferred: 12,
    localPersonnelTrained: 45,
    knowledgeAreasCount: 8,
    investmentAmount: 2500000,
    documents: ['tech-transfer-q4-2023.pdf', 'training-records.pdf', 'investment-breakdown.pdf']
  },
  {
    id: 'TTR002',
    companyName: 'Chevron Nigeria Limited',
    reportPeriod: '2023 Annual',
    submissionDate: '2024-01-10',
    reportType: 'annual',
    status: 'under_review',
    reviewedBy: 'Dr. Sarah Johnson',
    priority: 'high',
    dueDate: '2024-01-25',
    complianceScore: 92,
    technologiesTransferred: 28,
    localPersonnelTrained: 120,
    knowledgeAreasCount: 15,
    investmentAmount: 8750000,
    documents: ['annual-tech-transfer-2023.pdf', 'personnel-development.pdf']
  },
  {
    id: 'TTR003',
    companyName: 'ExxonMobil Nigeria',
    reportPeriod: 'Bonga Project',
    submissionDate: '2024-01-08',
    reportType: 'project_specific',
    status: 'approved',
    reviewedBy: 'Prof. Michael Adebayo',
    reviewDate: '2024-01-12',
    priority: 'medium',
    dueDate: '2024-01-20',
    complianceScore: 95,
    technologiesTransferred: 18,
    localPersonnelTrained: 75,
    knowledgeAreasCount: 12,
    investmentAmount: 5200000,
    documents: ['bonga-tech-transfer.pdf', 'subsea-technology.pdf']
  },
  {
    id: 'TTR004',
    companyName: 'Total Energies Nigeria',
    reportPeriod: 'Q3 2023',
    submissionDate: '2024-01-12',
    reportType: 'quarterly',
    status: 'requires_revision',
    reviewedBy: 'Dr. Amina Hassan',
    reviewDate: '2024-01-14',
    priority: 'medium',
    dueDate: '2024-01-28',
    complianceScore: 72,
    technologiesTransferred: 8,
    localPersonnelTrained: 25,
    knowledgeAreasCount: 5,
    investmentAmount: 1800000,
    comments: 'Insufficient documentation of knowledge transfer methodologies',
    documents: ['tech-transfer-q3-2023.pdf']
  },
  {
    id: 'TTR005',
    companyName: 'Nigerian Agip Oil Company',
    reportPeriod: 'Q4 2023',
    submissionDate: '2024-01-16',
    reportType: 'quarterly',
    status: 'rejected',
    reviewedBy: 'Dr. Kemi Ogundimu',
    reviewDate: '2024-01-18',
    priority: 'low',
    dueDate: '2024-02-01',
    complianceScore: 58,
    technologiesTransferred: 4,
    localPersonnelTrained: 15,
    knowledgeAreasCount: 3,
    investmentAmount: 950000,
    comments: 'Does not meet minimum technology transfer requirements',
    documents: ['agip-tech-transfer-q4.pdf']
  }
];

export default function TechnologyTransferReportsPage() {
  const [reports, setReports] = useState<TechnologyTransferReport[]>(mockTechTransferReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<TechnologyTransferReport | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approved' | 'rejected' | 'requires_revision'>('approved');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportPeriod.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesReportType = reportTypeFilter === 'all' || report.reportType === reportTypeFilter;
    return matchesSearch && matchesStatus && matchesReportType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'under_review':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'requires_revision':
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'requires_revision':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleReview = (report: TechnologyTransferReport) => {
    setSelectedReport(report);
    setShowReviewModal(true);
    setReviewComments(report.comments || '');
  };

  const submitReview = () => {
    if (selectedReport) {
      setReports(prev => prev.map(report => 
        report.id === selectedReport.id 
          ? {
              ...report,
              status: reviewDecision,
              reviewedBy: 'Current User',
              reviewDate: new Date().toISOString().split('T')[0],
              comments: reviewComments
            }
          : report
      ));
      setShowReviewModal(false);
      setSelectedReport(null);
    }
  };

  const calculateTotalInvestment = () => {
    return reports.reduce((sum, report) => sum + report.investmentAmount, 0);
  };

  const calculateTotalTechnologies = () => {
    return reports.reduce((sum, report) => sum + report.technologiesTransferred, 0);
  };

  const calculateTotalPersonnelTrained = () => {
    return reports.reduce((sum, report) => sum + report.localPersonnelTrained, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Technology Transfer Reports</h1>
          <p className="text-sm text-gray-600">Review and monitor technology transfer compliance reports from companies</p>
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
              <CogIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Technologies</p>
              <p className="text-2xl font-bold text-gray-900">{calculateTotalTechnologies()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Personnel Trained</p>
              <p className="text-2xl font-bold text-gray-900">{calculateTotalPersonnelTrained()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.status === 'pending' || r.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company, report period, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="requires_revision">Requires Revision</option>
            </select>
            <select
              value={reportTypeFilter}
              onChange={(e) => setReportTypeFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Report Types</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
              <option value="project_specific">Project Specific</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company & Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfer Metrics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.companyName}</div>
                      <div className="text-sm text-gray-500">{report.reportPeriod}</div>
                      <div className="text-xs text-gray-400">ID: {report.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{report.reportType.replace('_', ' ')}</div>
                    <div className="text-sm text-gray-500">Submitted: {new Date(report.submissionDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-lg font-bold ${getComplianceScoreColor(report.complianceScore)}`}>
                      {report.complianceScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-semibold text-blue-600">{report.technologiesTransferred}</div>
                          <div className="text-xs text-gray-500">Tech</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-green-600">{report.localPersonnelTrained}</div>
                          <div className="text-xs text-gray-500">Trained</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-purple-600">{report.knowledgeAreasCount}</div>
                          <div className="text-xs text-gray-500">Areas</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(report.investmentAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {(report.status === 'pending' || report.status === 'under_review') && (
                        <button 
                          onClick={() => handleReview(report)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Review
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

      {/* Review Modal */}
      {showReviewModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Review Technology Transfer Report - {selectedReport.companyName}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Report Period: {selectedReport.reportPeriod}</p>
                <p className="text-sm text-gray-600 mb-2">Compliance Score: {selectedReport.complianceScore}%</p>
                <p className="text-sm text-gray-600 mb-2">
                  Technologies: {selectedReport.technologiesTransferred} | Personnel: {selectedReport.localPersonnelTrained}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Investment: {formatCurrency(selectedReport.investmentAmount)}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Decision</label>
                <select
                  value={reviewDecision}
                  onChange={(e) => setReviewDecision(e.target.value as 'approved' | 'rejected' | 'requires_revision')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                  <option value="requires_revision">Requires Revision</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                <textarea
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add your review comments..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReview}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}