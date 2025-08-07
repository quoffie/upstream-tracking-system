'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../components/layouts/DashboardMenus';
import {
  HomeModernIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

interface LocalContentPlan {
  id: string;
  title: string;
  planType: 'annual' | 'project-specific' | 'master-plan';
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'under-review';
  submissionDate: string;
  approvalDate?: string;
  validityPeriod: string;
  targetLocalContent: number;
  actualLocalContent?: number;
  totalBudget: number;
  spentBudget: number;
  employmentTargets: {
    ghanaian: number;
    management: number;
    technical: number;
    skilled: number;
  };
  trainingBudget: number;
  procurementTargets: {
    goods: number;
    services: number;
    works: number;
  };
  complianceScore: number;
  lastReviewDate: string;
  nextReviewDate: string;
  keyMilestones: string[];
  challenges: string[];
}

export default function LocalContentPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planTypeFilter, setPlanTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);

  // Mock data
  const localContentPlans: LocalContentPlan[] = [
    {
      id: '1',
      title: 'Offshore Drilling Operations - Local Content Plan 2024',
      planType: 'annual',
      status: 'approved',
      submissionDate: '2023-11-15',
      approvalDate: '2023-12-20',
      validityPeriod: '2024-01-01 to 2024-12-31',
      targetLocalContent: 65,
      actualLocalContent: 62,
      totalBudget: 50000000,
      spentBudget: 31000000,
      employmentTargets: {
        ghanaian: 75,
        management: 40,
        technical: 60,
        skilled: 80
      },
      trainingBudget: 2500000,
      procurementTargets: {
        goods: 45,
        services: 70,
        works: 85
      },
      complianceScore: 88,
      lastReviewDate: '2024-01-10',
      nextReviewDate: '2024-04-10',
      keyMilestones: [
        'Establish local training center',
        'Partner with 5 Ghanaian suppliers',
        'Achieve 75% Ghanaian employment'
      ],
      challenges: [
        'Limited local technical expertise',
        'Supply chain reliability issues'
      ]
    },
    {
      id: '2',
      title: 'Volta Basin Exploration - Master Local Content Plan',
      planType: 'master-plan',
      status: 'approved',
      submissionDate: '2023-06-10',
      approvalDate: '2023-08-15',
      validityPeriod: '2023-09-01 to 2028-08-31',
      targetLocalContent: 70,
      actualLocalContent: 68,
      totalBudget: 75000000,
      spentBudget: 18000000,
      employmentTargets: {
        ghanaian: 80,
        management: 45,
        technical: 65,
        skilled: 85
      },
      trainingBudget: 5000000,
      procurementTargets: {
        goods: 50,
        services: 75,
        works: 90
      },
      complianceScore: 92,
      lastReviewDate: '2024-01-05',
      nextReviewDate: '2024-07-05',
      keyMilestones: [
        'Develop local content database',
        'Establish supplier development program',
        'Create scholarship program'
      ],
      challenges: [
        'Regulatory compliance complexity',
        'Local capacity building timeline'
      ]
    },
    {
      id: '3',
      title: 'Cape Coast Refinery Modernization - Project Local Content Plan',
      planType: 'project-specific',
      status: 'under-review',
      submissionDate: '2024-01-08',
      validityPeriod: '2024-03-01 to 2026-12-31',
      targetLocalContent: 75,
      totalBudget: 120000000,
      spentBudget: 0,
      employmentTargets: {
        ghanaian: 85,
        management: 50,
        technical: 70,
        skilled: 90
      },
      trainingBudget: 8000000,
      procurementTargets: {
        goods: 55,
        services: 80,
        works: 95
      },
      complianceScore: 0,
      lastReviewDate: '2024-01-08',
      nextReviewDate: '2024-04-08',
      keyMilestones: [
        'Technology transfer program',
        'Local fabrication capabilities',
        'Skills development initiative'
      ],
      challenges: [
        'Complex technology requirements',
        'Local supplier qualification'
      ]
    },
    {
      id: '4',
      title: 'Northern Gas Pipeline - Local Content Plan 2023',
      planType: 'annual',
      status: 'rejected',
      submissionDate: '2023-10-20',
      validityPeriod: '2024-01-01 to 2024-12-31',
      targetLocalContent: 60,
      totalBudget: 35000000,
      spentBudget: 8000000,
      employmentTargets: {
        ghanaian: 70,
        management: 35,
        technical: 55,
        skilled: 75
      },
      trainingBudget: 1500000,
      procurementTargets: {
        goods: 40,
        services: 65,
        works: 80
      },
      complianceScore: 45,
      lastReviewDate: '2023-11-15',
      nextReviewDate: '2024-02-15',
      keyMilestones: [
        'Improve local procurement',
        'Enhance training programs'
      ],
      challenges: [
        'Insufficient local content targets',
        'Weak implementation strategy'
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: ClockIcon, label: 'Draft' },
      submitted: { color: 'bg-blue-100 text-blue-800', icon: ClockIcon, label: 'Submitted' },
      'under-review': { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Under Review' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Rejected' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getPlanTypeBadge = (type: string) => {
    const typeConfig = {
      annual: { color: 'bg-blue-100 text-blue-800', label: 'Annual' },
      'project-specific': { color: 'bg-purple-100 text-purple-800', label: 'Project-Specific' },
      'master-plan': { color: 'bg-green-100 text-green-800', label: 'Master Plan' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter plans
  const filteredPlans = localContentPlans.filter(plan => {
    const matchesSearch = 
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.keyMilestones.some(milestone => milestone.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    const matchesPlanType = planTypeFilter === 'all' || plan.planType === planTypeFilter;
    
    return matchesSearch && matchesStatus && matchesPlanType;
  });

  // Calculate statistics
  const stats = {
    total: localContentPlans.length,
    approved: localContentPlans.filter(p => p.status === 'approved').length,
    underReview: localContentPlans.filter(p => p.status === 'under-review').length,
    rejected: localContentPlans.filter(p => p.status === 'rejected').length,
    totalBudget: localContentPlans.reduce((sum, p) => sum + p.totalBudget, 0),
    spentBudget: localContentPlans.reduce((sum, p) => sum + p.spentBudget, 0),
    avgCompliance: Math.round(localContentPlans.filter(p => p.complianceScore > 0).reduce((sum, p) => sum + p.complianceScore, 0) / localContentPlans.filter(p => p.complianceScore > 0).length),
    avgLocalContent: Math.round(localContentPlans.filter(p => p.actualLocalContent).reduce((sum, p) => sum + (p.actualLocalContent || 0), 0) / localContentPlans.filter(p => p.actualLocalContent).length)
  };

  const handleSelectPlan = (id: string) => {
    setSelectedPlans(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedPlans(
      selectedPlans.length === filteredPlans.length 
        ? [] 
        : filteredPlans.map(p => p.id)
    );
  };

  return (
    <DashboardLayout
      title="Local Content"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Local Content Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage local content plans, track compliance, and monitor performance
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/company-admin/local-content/submit-plan')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Submit New Plan
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <HomeModernIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Plans</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalBudget)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Avg Compliance</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgCompliance}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Under Review</p>
                <p className="text-xl font-bold text-yellow-600">{stats.underReview}</p>
              </div>
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Budget Utilization</p>
                <p className="text-xl font-bold text-blue-600">
                  {Math.round((stats.spentBudget / stats.totalBudget) * 100)}%
                </p>
              </div>
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Local Content</p>
                <p className="text-xl font-bold text-green-600">{stats.avgLocalContent}%</p>
              </div>
              <HomeModernIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected Plans</p>
                <p className="text-xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search local content plans by title or milestones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="under-review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plan Type
                </label>
                <select
                  value={planTypeFilter}
                  onChange={(e) => setPlanTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="annual">Annual</option>
                  <option value="project-specific">Project-Specific</option>
                  <option value="master-plan">Master Plan</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Local Content Plans Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Local Content Plans ({filteredPlans.length})
              </h3>
              {selectedPlans.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedPlans.length} selected
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Bulk Actions
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPlans.length === filteredPlans.length && filteredPlans.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Local Content & Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compliance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPlans.includes(plan.id)}
                        onChange={() => handleSelectPlan(plan.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {plan.title}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          📅 {plan.validityPeriod}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Submitted: {formatDate(plan.submissionDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getStatusBadge(plan.status)}
                        {getPlanTypeBadge(plan.planType)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          Target: {plan.targetLocalContent}%
                          {plan.actualLocalContent && (
                            <span className="ml-2 text-gray-500">
                              (Actual: {plan.actualLocalContent}%)
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Budget: {formatCurrency(plan.totalBudget)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Spent: {formatCurrency(plan.spentBudget)} 
                          ({Math.round((plan.spentBudget / plan.totalBudget) * 100)}%)
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className={`text-sm font-medium ${getComplianceColor(plan.complianceScore)}`}>
                          {plan.complianceScore > 0 ? `${plan.complianceScore}%` : 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500">
                          Next Review: {formatDate(plan.nextReviewDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/local-content/${plan.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/local-content/${plan.id}/edit`)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Download Report"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="More Actions"
                          >
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <HomeModernIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No local content plans found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || planTypeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by submitting your first local content plan.'}
              </p>
              {!searchTerm && statusFilter === 'all' && planTypeFilter === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/dashboard/company-admin/local-content/submit-plan')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Submit New Plan
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}