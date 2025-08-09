'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface LocalContentPlan {
  id: string;
  companyName: string;
  planTitle: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'under_review';
  submissionDate: string;
  reviewDate?: string;
  approvalDate?: string;
  localContentPercentage: number;
  trainingBudget: number;
  successionTargets: number;
  reviewer?: string;
  priority: 'high' | 'medium' | 'low';
  sector: string;
}

const mockPlans: LocalContentPlan[] = [
  {
    id: 'LC001',
    companyName: 'Shell Nigeria Exploration',
    planTitle: 'Upstream Operations Local Content Plan 2024',
    status: 'approved',
    submissionDate: '2024-01-15',
    reviewDate: '2024-01-20',
    approvalDate: '2024-01-25',
    localContentPercentage: 85,
    trainingBudget: 2500000,
    successionTargets: 45,
    reviewer: 'Dr. Adebayo Johnson',
    priority: 'high',
    sector: 'Upstream'
  },
  {
    id: 'LC002',
    companyName: 'TotalEnergies Nigeria',
    planTitle: 'Deepwater Development Local Content Strategy',
    status: 'under_review',
    submissionDate: '2024-01-10',
    reviewDate: '2024-01-15',
    localContentPercentage: 78,
    trainingBudget: 1800000,
    successionTargets: 32,
    reviewer: 'Eng. Fatima Abdullahi',
    priority: 'high',
    sector: 'Upstream'
  },
  {
    id: 'LC003',
    companyName: 'Chevron Nigeria Limited',
    planTitle: 'Onshore Operations Localization Plan',
    status: 'submitted',
    submissionDate: '2024-01-08',
    localContentPercentage: 82,
    trainingBudget: 2100000,
    successionTargets: 38,
    priority: 'medium',
    sector: 'Upstream'
  }
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const statusIcons = {
  draft: ClockIcon,
  submitted: DocumentTextIcon,
  under_review: ExclamationTriangleIcon,
  approved: CheckCircleIcon,
  rejected: ExclamationTriangleIcon
};

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
};

export default function LocalContentPlansPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState<LocalContentPlan | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.planTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || plan.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (plan: LocalContentPlan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Plans</h1>
          <p className="text-gray-600">Manage and review local content development plans</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Plan Template
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{mockPlans.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPlans.filter(p => p.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockPlans.filter(p => p.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ChartBarIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg LC %</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(mockPlans.reduce((acc, p) => acc + p.localContentPercentage, 0) / mockPlans.length)}%
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
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search plans..."
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
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local Content %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.map((plan) => {
                const StatusIcon = statusIcons[plan.status];
                return (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{plan.planTitle}</div>
                        <div className="text-sm text-gray-500">{plan.companyName}</div>
                        <div className="text-xs text-gray-400">ID: {plan.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[plan.status]}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {plan.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{plan.localContentPercentage}%</div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${plan.localContentPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(plan.trainingBudget)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${priorityColors[plan.priority]}`}>
                        {plan.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(plan)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Details Modal */}
      {showDetails && selectedPlan && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Plan Details</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan ID</label>
                    <p className="text-sm text-gray-900">{selectedPlan.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="text-sm text-gray-900">{selectedPlan.companyName}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Plan Title</label>
                  <p className="text-sm text-gray-900">{selectedPlan.planTitle}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Local Content %</label>
                    <p className="text-sm text-gray-900">{selectedPlan.localContentPercentage}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Training Budget</label>
                    <p className="text-sm text-gray-900">{formatCurrency(selectedPlan.trainingBudget)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Succession Targets</label>
                    <p className="text-sm text-gray-900">{selectedPlan.successionTargets}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                    <p className="text-sm text-gray-900">{selectedPlan.submissionDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reviewer</label>
                    <p className="text-sm text-gray-900">{selectedPlan.reviewer || 'Not assigned'}</p>
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
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}