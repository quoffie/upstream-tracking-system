'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, TrophyIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

interface SuccessionPlan {
  id: string;
  companyName: string;
  submissionDate: string;
  planType: 'management' | 'technical' | 'operational';
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'requires_revision';
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  complianceScore: number;
  keyPositions: number;
  identifiedSuccessors: number;
  trainingPrograms: number;
  documents: string[];
}

const mockSuccessionPlans: SuccessionPlan[] = [
  {
    id: 'SP001',
    companyName: 'Chevron Nigeria Limited',
    submissionDate: '2024-01-10',
    planType: 'management',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-25',
    complianceScore: 85,
    keyPositions: 12,
    identifiedSuccessors: 10,
    trainingPrograms: 8,
    documents: ['succession-plan-management.pdf', 'leadership-development.pdf']
  },
  {
    id: 'SP002',
    companyName: 'Shell Petroleum Development Company',
    submissionDate: '2024-01-08',
    planType: 'technical',
    status: 'under_review',
    reviewedBy: 'John Doe',
    priority: 'medium',
    dueDate: '2024-01-22',
    complianceScore: 78,
    keyPositions: 15,
    identifiedSuccessors: 12,
    trainingPrograms: 10,
    documents: ['technical-succession-plan.pdf', 'skills-matrix.pdf']
  },
  {
    id: 'SP003',
    companyName: 'ExxonMobil Nigeria',
    submissionDate: '2024-01-05',
    planType: 'operational',
    status: 'approved',
    reviewedBy: 'Jane Smith',
    reviewDate: '2024-01-12',
    priority: 'high',
    dueDate: '2024-01-20',
    complianceScore: 92,
    keyPositions: 20,
    identifiedSuccessors: 18,
    trainingPrograms: 15,
    documents: ['operational-succession.pdf', 'training-roadmap.pdf']
  },
  {
    id: 'SP004',
    companyName: 'Total Energies Nigeria',
    submissionDate: '2024-01-12',
    planType: 'management',
    status: 'requires_revision',
    reviewedBy: 'Mike Johnson',
    reviewDate: '2024-01-14',
    priority: 'medium',
    dueDate: '2024-01-28',
    complianceScore: 65,
    keyPositions: 8,
    identifiedSuccessors: 5,
    trainingPrograms: 4,
    comments: 'Insufficient succession depth for critical positions',
    documents: ['management-succession.pdf']
  }
];

export default function SuccessionPlanCompliancePage() {
  const [plans, setPlans] = useState<SuccessionPlan[]>(mockSuccessionPlans);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planTypeFilter, setPlanTypeFilter] = useState<string>('all');
  const [selectedPlan, setSelectedPlan] = useState<SuccessionPlan | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approved' | 'rejected' | 'requires_revision'>('approved');

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.planType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    const matchesPlanType = planTypeFilter === 'all' || plan.planType === planTypeFilter;
    return matchesSearch && matchesStatus && matchesPlanType;
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

  const handleReview = (plan: SuccessionPlan) => {
    setSelectedPlan(plan);
    setShowReviewModal(true);
    setReviewComments(plan.comments || '');
  };

  const submitReview = () => {
    if (selectedPlan) {
      setPlans(prev => prev.map(plan => 
        plan.id === selectedPlan.id 
          ? {
              ...plan,
              status: reviewDecision,
              reviewedBy: 'Current User',
              reviewDate: new Date().toISOString().split('T')[0],
              comments: reviewComments
            }
          : plan
      ));
      setShowReviewModal(false);
      setSelectedPlan(null);
    }
  };

  const calculateAverageCompliance = () => {
    const total = plans.reduce((sum, plan) => sum + plan.complianceScore, 0);
    return Math.round(total / plans.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Succession Plan Compliance</h1>
          <p className="text-sm text-gray-600">Review and monitor succession planning compliance from companies</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrophyIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
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
                {plans.filter(p => p.status === 'pending' || p.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {plans.filter(p => p.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{calculateAverageCompliance()}%</p>
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
                placeholder="Search by company, plan type, or ID..."
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
              value={planTypeFilter}
              onChange={(e) => setPlanTypeFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Plan Types</option>
              <option value="management">Management</option>
              <option value="technical">Technical</option>
              <option value="operational">Operational</option>
            </select>
          </div>
        </div>
      </div>

      {/* Succession Plans List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Metrics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{plan.companyName}</div>
                      <div className="text-sm text-gray-500">ID: {plan.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{plan.planType}</div>
                    <div className="text-sm text-gray-500">Submitted: {new Date(plan.submissionDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-lg font-bold ${getComplianceScoreColor(plan.complianceScore)}`}>
                      {plan.complianceScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{plan.keyPositions}</div>
                          <div className="text-xs text-gray-500">Positions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{plan.identifiedSuccessors}</div>
                          <div className="text-xs text-gray-500">Successors</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-purple-600">{plan.trainingPrograms}</div>
                          <div className="text-xs text-gray-500">Programs</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(plan.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(plan.status)}`}>
                        {plan.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(plan.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      {(plan.status === 'pending' || plan.status === 'under_review') && (
                        <button 
                          onClick={() => handleReview(plan)}
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
      {showReviewModal && selectedPlan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Review Succession Plan - {selectedPlan.companyName}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Plan Type: {selectedPlan.planType}</p>
                <p className="text-sm text-gray-600 mb-2">Compliance Score: {selectedPlan.complianceScore}%</p>
                <p className="text-sm text-gray-600 mb-2">
                  Key Positions: {selectedPlan.keyPositions} | Successors: {selectedPlan.identifiedSuccessors}
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