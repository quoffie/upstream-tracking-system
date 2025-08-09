'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, BuildingOfficeIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon, ChartPieIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface EquityVerification {
  id: string;
  jointVentureName: string;
  companyName: string;
  submissionDate: string;
  verificationPeriod: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'requires_revision';
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  nigerianEquityPercentage: number;
  foreignEquityPercentage: number;
  requiredNigerianEquity: number;
  complianceStatus: 'compliant' | 'non_compliant' | 'marginal';
  totalInvestment: number;
  nigerianInvestment: number;
  foreignInvestment: number;
  documents: string[];
  shareholderBreakdown: {
    name: string;
    nationality: string;
    percentage: number;
    investment: number;
  }[];
}

const mockEquityVerifications: EquityVerification[] = [
  {
    id: 'EV001',
    jointVentureName: 'Nigeria Deep Water Petroleum JV',
    companyName: 'Shell Nigeria Exploration & Production Company',
    submissionDate: '2024-01-15',
    verificationPeriod: 'Q4 2023',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-30',
    nigerianEquityPercentage: 60,
    foreignEquityPercentage: 40,
    requiredNigerianEquity: 51,
    complianceStatus: 'compliant',
    totalInvestment: 5000000000,
    nigerianInvestment: 3000000000,
    foreignInvestment: 2000000000,
    documents: ['equity-structure.pdf', 'shareholder-certificates.pdf', 'investment-proof.pdf'],
    shareholderBreakdown: [
      { name: 'NNPC Limited', nationality: 'Nigerian', percentage: 35, investment: 1750000000 },
      { name: 'Nigerian Petroleum Corporation', nationality: 'Nigerian', percentage: 25, investment: 1250000000 },
      { name: 'Shell International', nationality: 'Dutch', percentage: 40, investment: 2000000000 }
    ]
  },
  {
    id: 'EV002',
    jointVentureName: 'Bonga Southwest JV',
    companyName: 'ExxonMobil Nigeria',
    submissionDate: '2024-01-12',
    verificationPeriod: 'Q4 2023',
    status: 'under_review',
    reviewedBy: 'Dr. Adebayo Ogundimu',
    priority: 'high',
    dueDate: '2024-01-28',
    nigerianEquityPercentage: 55,
    foreignEquityPercentage: 45,
    requiredNigerianEquity: 51,
    complianceStatus: 'compliant',
    totalInvestment: 3500000000,
    nigerianInvestment: 1925000000,
    foreignInvestment: 1575000000,
    documents: ['jv-agreement.pdf', 'equity-verification.pdf'],
    shareholderBreakdown: [
      { name: 'NNPC Limited', nationality: 'Nigerian', percentage: 30, investment: 1050000000 },
      { name: 'Seplat Energy', nationality: 'Nigerian', percentage: 25, investment: 875000000 },
      { name: 'ExxonMobil Corporation', nationality: 'American', percentage: 45, investment: 1575000000 }
    ]
  },
  {
    id: 'EV003',
    jointVentureName: 'Agbami Field JV',
    companyName: 'Chevron Nigeria Limited',
    submissionDate: '2024-01-10',
    verificationPeriod: 'Q4 2023',
    status: 'approved',
    reviewedBy: 'Prof. Kemi Adeosun',
    reviewDate: '2024-01-18',
    priority: 'medium',
    dueDate: '2024-01-25',
    nigerianEquityPercentage: 65,
    foreignEquityPercentage: 35,
    requiredNigerianEquity: 51,
    complianceStatus: 'compliant',
    totalInvestment: 4200000000,
    nigerianInvestment: 2730000000,
    foreignInvestment: 1470000000,
    documents: ['equity-compliance-report.pdf', 'ownership-structure.pdf'],
    shareholderBreakdown: [
      { name: 'NNPC Limited', nationality: 'Nigerian', percentage: 40, investment: 1680000000 },
      { name: 'Oando Energy', nationality: 'Nigerian', percentage: 25, investment: 1050000000 },
      { name: 'Chevron Corporation', nationality: 'American', percentage: 35, investment: 1470000000 }
    ]
  },
  {
    id: 'EV004',
    jointVentureName: 'Okwori-Okpogu JV',
    companyName: 'Total Energies Nigeria',
    submissionDate: '2024-01-08',
    verificationPeriod: 'Q3 2023',
    status: 'requires_revision',
    reviewedBy: 'Dr. Amina Hassan',
    reviewDate: '2024-01-16',
    priority: 'high',
    dueDate: '2024-01-22',
    nigerianEquityPercentage: 48,
    foreignEquityPercentage: 52,
    requiredNigerianEquity: 51,
    complianceStatus: 'non_compliant',
    totalInvestment: 2800000000,
    nigerianInvestment: 1344000000,
    foreignInvestment: 1456000000,
    comments: 'Nigerian equity percentage below required threshold. Remedial action required.',
    documents: ['equity-structure.pdf'],
    shareholderBreakdown: [
      { name: 'NNPC Limited', nationality: 'Nigerian', percentage: 28, investment: 784000000 },
      { name: 'Conoil Plc', nationality: 'Nigerian', percentage: 20, investment: 560000000 },
      { name: 'Total SE', nationality: 'French', percentage: 52, investment: 1456000000 }
    ]
  }
];

export default function EquityVerificationPage() {
  const [verifications, setVerifications] = useState<EquityVerification[]>(mockEquityVerifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [complianceFilter, setComplianceFilter] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<EquityVerification | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approved' | 'rejected' | 'requires_revision'>('approved');

  const filteredVerifications = verifications.filter(verification => {
    const matchesSearch = verification.jointVentureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verification.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         verification.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || verification.status === statusFilter;
    const matchesCompliance = complianceFilter === 'all' || verification.complianceStatus === complianceFilter;
    return matchesSearch && matchesStatus && matchesCompliance;
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

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'non_compliant':
        return 'bg-red-100 text-red-800';
      case 'marginal':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleReview = (verification: EquityVerification) => {
    setSelectedVerification(verification);
    setShowReviewModal(true);
    setReviewComments(verification.comments || '');
  };

  const handleViewDetails = (verification: EquityVerification) => {
    setSelectedVerification(verification);
    setShowDetailsModal(true);
  };

  const submitReview = () => {
    if (selectedVerification) {
      setVerifications(prev => prev.map(verification => 
        verification.id === selectedVerification.id 
          ? {
              ...verification,
              status: reviewDecision,
              reviewedBy: 'Current User',
              reviewDate: new Date().toISOString().split('T')[0],
              comments: reviewComments
            }
          : verification
      ));
      setShowReviewModal(false);
      setSelectedVerification(null);
    }
  };

  const calculateTotalInvestment = () => {
    return verifications.reduce((sum, verification) => sum + verification.totalInvestment, 0);
  };

  const getComplianceRate = () => {
    const compliant = verifications.filter(v => v.complianceStatus === 'compliant').length;
    return Math.round((compliant / verifications.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equity Verification</h1>
          <p className="text-sm text-gray-600">Review and verify Nigerian equity compliance in joint ventures</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total JVs</p>
              <p className="text-2xl font-bold text-gray-900">{verifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{getComplianceRate()}%</p>
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
                {verifications.filter(v => v.status === 'pending' || v.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartPieIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Investment</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(calculateTotalInvestment())}</p>
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
                placeholder="Search by JV name, company, or ID..."
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
              value={complianceFilter}
              onChange={(e) => setComplianceFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Compliance</option>
              <option value="compliant">Compliant</option>
              <option value="non_compliant">Non-Compliant</option>
              <option value="marginal">Marginal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verifications List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joint Venture</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equity Structure</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{verification.jointVentureName}</div>
                      <div className="text-sm text-gray-500">{verification.companyName}</div>
                      <div className="text-xs text-gray-400">ID: {verification.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{verification.nigerianEquityPercentage}%</div>
                        <div className="text-xs text-gray-500">Nigerian</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{verification.foreignEquityPercentage}%</div>
                        <div className="text-xs text-gray-500">Foreign</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Req: {verification.requiredNigerianEquity}%</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(verification.totalInvestment)}</div>
                      <div className="text-xs text-gray-500">
                        NG: {formatCurrency(verification.nigerianInvestment)}
                      </div>
                      <div className="text-xs text-gray-500">
                        FG: {formatCurrency(verification.foreignInvestment)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplianceColor(verification.complianceStatus)}`}>
                      {verification.complianceStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(verification.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(verification.status)}`}>
                        {verification.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(verification)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </button>
                      {(verification.status === 'pending' || verification.status === 'under_review') && (
                        <button 
                          onClick={() => handleReview(verification)}
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

      {/* Details Modal */}
      {showDetailsModal && selectedVerification && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Equity Details - {selectedVerification.jointVentureName}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Equity Structure</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Nigerian Equity:</span>
                      <span className="font-semibold text-green-600">{selectedVerification.nigerianEquityPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Equity:</span>
                      <span className="font-semibold text-blue-600">{selectedVerification.foreignEquityPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required Nigerian:</span>
                      <span className="font-semibold">{selectedVerification.requiredNigerianEquity}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Investment Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Investment:</span>
                      <span className="font-semibold">{formatCurrency(selectedVerification.totalInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nigerian Investment:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(selectedVerification.nigerianInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Foreign Investment:</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(selectedVerification.foreignInvestment)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Shareholder Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Shareholder</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nationality</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Investment</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedVerification.shareholderBreakdown.map((shareholder, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{shareholder.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{shareholder.nationality}</td>
                          <td className="px-4 py-2 text-sm font-semibold text-gray-900">{shareholder.percentage}%</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{formatCurrency(shareholder.investment)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedVerification && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Review Equity Verification - {selectedVerification.jointVentureName}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Nigerian Equity: {selectedVerification.nigerianEquityPercentage}%</p>
                <p className="text-sm text-gray-600 mb-2">Required: {selectedVerification.requiredNigerianEquity}%</p>
                <p className="text-sm text-gray-600 mb-2">Current Status: {selectedVerification.complianceStatus}</p>
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