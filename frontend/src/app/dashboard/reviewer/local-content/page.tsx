'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CogIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface LocalContentReview {
  id: string;
  companyName: string;
  projectName: string;
  reviewType: 'succession' | 'training' | 'technology' | 'procurement' | 'employment' | 'capacity-building';
  status: 'compliant' | 'non-compliant' | 'under-review' | 'pending-improvement' | 'approved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  localContentScore: number;
  targetScore: number;
  lastReviewDate: string;
  nextReviewDate: string;
  reviewer: string;
  findings: {
    total: number;
    critical: number;
    major: number;
    minor: number;
  };
  description: string;
  recommendations?: string[];
  improvementPlan?: string;
  complianceGap: number;
  investmentCommitment: string;
}

const mockLocalContentReviews: LocalContentReview[] = [
  {
    id: 'LCR001',
    companyName: 'Shell Nigeria Exploration',
    projectName: 'Bonga Deep Water Development',
    reviewType: 'succession',
    status: 'compliant',
    priority: 'medium',
    localContentScore: 85,
    targetScore: 80,
    lastReviewDate: '2024-01-15',
    nextReviewDate: '2024-04-15',
    reviewer: 'Dr. Adebayo Johnson',
    findings: {
      total: 4,
      critical: 0,
      major: 1,
      minor: 3
    },
    description: 'Succession planning review for key technical and management positions.',
    recommendations: [
      'Accelerate leadership development programs',
      'Increase mentorship opportunities',
      'Expand technical training initiatives'
    ],
    complianceGap: -5,
    investmentCommitment: '$45M'
  },
  {
    id: 'LCR002',
    companyName: 'Chevron Nigeria Limited',
    projectName: 'Agbami Field Operations',
    reviewType: 'training',
    status: 'under-review',
    priority: 'high',
    localContentScore: 72,
    targetScore: 85,
    lastReviewDate: '2024-02-01',
    nextReviewDate: '2024-03-01',
    reviewer: 'Prof. Grace Okafor',
    findings: {
      total: 8,
      critical: 2,
      major: 3,
      minor: 3
    },
    description: 'Training and capacity development program assessment.',
    recommendations: [
      'Increase training budget allocation',
      'Partner with local universities',
      'Implement skills certification programs'
    ],
    improvementPlan: 'Comprehensive 18-month training enhancement program',
    complianceGap: 13,
    investmentCommitment: '$28M'
  },
  {
    id: 'LCR003',
    companyName: 'TotalEnergies EP Nigeria',
    projectName: 'Egina FPSO Technology Transfer',
    reviewType: 'technology',
    status: 'non-compliant',
    priority: 'critical',
    localContentScore: 58,
    targetScore: 75,
    lastReviewDate: '2024-01-20',
    nextReviewDate: '2024-02-20',
    reviewer: 'Engr. Michael Williams',
    findings: {
      total: 12,
      critical: 4,
      major: 5,
      minor: 3
    },
    description: 'Technology transfer and knowledge sharing compliance review.',
    recommendations: [
      'Establish dedicated technology transfer unit',
      'Increase local R&D investments',
      'Create technology incubation programs'
    ],
    improvementPlan: 'Immediate technology transfer acceleration plan - 90 days',
    complianceGap: 17,
    investmentCommitment: '$65M'
  },
  {
    id: 'LCR004',
    companyName: 'ExxonMobil Nigeria',
    projectName: 'Qua Iboe Terminal Expansion',
    reviewType: 'procurement',
    status: 'pending-improvement',
    priority: 'high',
    localContentScore: 68,
    targetScore: 70,
    lastReviewDate: '2024-01-25',
    nextReviewDate: '2024-03-25',
    reviewer: 'Dr. Sarah Anderson',
    findings: {
      total: 6,
      critical: 1,
      major: 2,
      minor: 3
    },
    description: 'Local procurement and vendor development assessment.',
    recommendations: [
      'Expand local supplier database',
      'Implement supplier development programs',
      'Increase procurement from Nigerian companies'
    ],
    improvementPlan: 'Local procurement enhancement - 6 months',
    complianceGap: 2,
    investmentCommitment: '$22M'
  },
  {
    id: 'LCR005',
    companyName: 'Seplat Energy Plc',
    projectName: 'ANOH Gas Processing Plant',
    reviewType: 'employment',
    status: 'approved',
    priority: 'low',
    localContentScore: 92,
    targetScore: 85,
    lastReviewDate: '2024-02-05',
    nextReviewDate: '2024-05-05',
    reviewer: 'Engr. David Wilson',
    findings: {
      total: 2,
      critical: 0,
      major: 0,
      minor: 2
    },
    description: 'Employment and local capacity utilization review.',
    recommendations: [
      'Maintain current employment levels',
      'Continue skills development programs'
    ],
    complianceGap: -7,
    investmentCommitment: '$18M'
  },
  {
    id: 'LCR006',
    companyName: 'Aiteo Eastern E&P',
    projectName: 'Nembe Creek Operations',
    reviewType: 'capacity-building',
    status: 'under-review',
    priority: 'medium',
    localContentScore: 76,
    targetScore: 80,
    lastReviewDate: '2024-01-10',
    nextReviewDate: '2024-04-10',
    reviewer: 'Dr. Lisa Johnson',
    findings: {
      total: 5,
      critical: 0,
      major: 2,
      minor: 3
    },
    description: 'Capacity building and institutional development assessment.',
    recommendations: [
      'Strengthen local institutions partnerships',
      'Increase capacity building investments',
      'Develop specialized training centers'
    ],
    improvementPlan: 'Capacity building enhancement - 12 months',
    complianceGap: 4,
    investmentCommitment: '$32M'
  }
];

const typeColors = {
  succession: 'bg-blue-100 text-blue-800',
  training: 'bg-green-100 text-green-800',
  technology: 'bg-purple-100 text-purple-800',
  procurement: 'bg-yellow-100 text-yellow-800',
  employment: 'bg-indigo-100 text-indigo-800',
  'capacity-building': 'bg-pink-100 text-pink-800'
};

const statusColors = {
  compliant: 'bg-green-100 text-green-800',
  'non-compliant': 'bg-red-100 text-red-800',
  'under-review': 'bg-yellow-100 text-yellow-800',
  'pending-improvement': 'bg-orange-100 text-orange-800',
  approved: 'bg-blue-100 text-blue-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function ReviewerLocalContentPage() {
  const [reviews, setReviews] = useState(mockLocalContentReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<LocalContentReview | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || review.reviewType === typeFilter;
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || review.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleViewReview = (review: LocalContentReview) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const getScoreColor = (score: number, target: number) => {
    if (score >= target) return 'text-green-600';
    if (score >= target * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'non-compliant':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'under-review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'pending-improvement':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'succession':
        return <UserGroupIcon className="h-4 w-4" />;
      case 'training':
        return <AcademicCapIcon className="h-4 w-4" />;
      case 'technology':
        return <CogIcon className="h-4 w-4" />;
      case 'procurement':
        return <BuildingOfficeIcon className="h-4 w-4" />;
      case 'employment':
        return <UserGroupIcon className="h-4 w-4" />;
      case 'capacity-building':
        return <ChartBarIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Reviews</h1>
          <p className="text-gray-600">Monitor and review local content compliance across all projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/reviewer/local-content/succession"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <UserGroupIcon className="h-5 w-5" />
            Succession
          </Link>
          <Link
            href="/dashboard/reviewer/local-content/training"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <AcademicCapIcon className="h-5 w-5" />
            Training
          </Link>
          <Link
            href="/dashboard/reviewer/local-content/technology"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <CogIcon className="h-5 w-5" />
            Technology
          </Link>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            New Review
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'compliant' || r.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'non-compliant').length}
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
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'under-review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Need Improvement</p>
              <p className="text-2xl font-bold text-gray-900">
                {reviews.filter(r => r.status === 'pending-improvement').length}
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
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search local content reviews..."
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
            <option value="succession">Succession</option>
            <option value="training">Training</option>
            <option value="technology">Technology</option>
            <option value="procurement">Procurement</option>
            <option value="employment">Employment</option>
            <option value="capacity-building">Capacity Building</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="compliant">Compliant</option>
            <option value="non-compliant">Non-Compliant</option>
            <option value="under-review">Under Review</option>
            <option value="pending-improvement">Pending Improvement</option>
            <option value="approved">Approved</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredReviews.length} of {reviews.length} reviews
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
            <ArrowPathIcon className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{review.projectName}</div>
                      <div className="text-sm text-gray-500">{review.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{review.companyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(review.reviewType)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[review.reviewType]}`}>
                        {review.reviewType.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(review.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[review.status]}`}>
                        {review.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[review.priority]}`}>
                      {review.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3 w-16">
                        <div 
                          className={`h-2 rounded-full ${
                            review.localContentScore >= review.targetScore ? 'bg-green-500' :
                            review.localContentScore >= review.targetScore * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(review.localContentScore / 100) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(review.localContentScore, review.targetScore)}`}>
                        {review.localContentScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {review.complianceGap > 0 ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-red-500 mr-1" />
                      ) : (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1 transform rotate-180" />
                      )}
                      <span className={`text-sm font-medium ${
                        review.complianceGap > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {Math.abs(review.complianceGap)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{review.nextReviewDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewReview(review)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Details Modal */}
      {showModal && selectedReview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">Local Content Review Details</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedReview.projectName}</h4>
                    <p className="text-gray-600">{selectedReview.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Company</p>
                      <p className="text-sm text-gray-900">{selectedReview.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Review Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedReview.reviewType]}`}>
                        {selectedReview.reviewType.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Priority</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[selectedReview.priority]}`}>
                        {selectedReview.priority.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Investment</p>
                      <p className="text-sm text-gray-900">{selectedReview.investmentCommitment}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Last Review</p>
                      <p className="text-sm text-gray-900">{selectedReview.lastReviewDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Next Review</p>
                      <p className="text-sm text-gray-900">{selectedReview.nextReviewDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Reviewer</p>
                    <p className="text-sm text-gray-900">{selectedReview.reviewer}</p>
                  </div>
                  
                  {selectedReview.improvementPlan && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-orange-800 mb-2">Improvement Plan</h4>
                      <p className="text-sm text-orange-700">{selectedReview.improvementPlan}</p>
                    </div>
                  )}
                </div>
                
                {/* Scores and Findings */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Local Content Score</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Current Score</span>
                      <span className={`text-lg font-bold ${getScoreColor(selectedReview.localContentScore, selectedReview.targetScore)}`}>
                        {selectedReview.localContentScore}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Target Score</span>
                      <span className="text-lg font-bold text-gray-900">{selectedReview.targetScore}%</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          selectedReview.localContentScore >= selectedReview.targetScore ? 'bg-green-500' :
                          selectedReview.localContentScore >= selectedReview.targetScore * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedReview.localContentScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Findings Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-700">Critical</p>
                        <p className="text-2xl font-bold text-red-900">{selectedReview.findings.critical}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-orange-700">Major</p>
                        <p className="text-2xl font-bold text-orange-900">{selectedReview.findings.major}</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-yellow-700">Minor</p>
                        <p className="text-2xl font-bold text-yellow-900">{selectedReview.findings.minor}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedReview.findings.total}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedReview.recommendations && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {selectedReview.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}