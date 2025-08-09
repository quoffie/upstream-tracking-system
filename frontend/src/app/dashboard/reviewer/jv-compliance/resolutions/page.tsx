'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface BoardResolution {
  id: string;
  resolutionNumber: string;
  jointVentureName: string;
  companyName: string;
  submissionDate: string;
  resolutionDate: string;
  resolutionType: 'equity_change' | 'board_appointment' | 'major_decision' | 'operational_change' | 'financial_decision';
  status: 'pending' | 'approved' | 'rejected' | 'under_review' | 'requires_revision';
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  title: string;
  description: string;
  votingResults: {
    totalVotes: number;
    votesFor: number;
    votesAgainst: number;
    abstentions: number;
  };
  boardMembers: {
    name: string;
    position: string;
    nationality: string;
    vote: 'for' | 'against' | 'abstain';
  }[];
  attachments: string[];
  complianceIssues?: string[];
  legalReview: boolean;
  regulatoryApprovalRequired: boolean;
}

const mockResolutions: BoardResolution[] = [
  {
    id: 'BR001',
    resolutionNumber: 'RES-2024-001',
    jointVentureName: 'Nigeria Deep Water Petroleum JV',
    companyName: 'Shell Nigeria Exploration & Production Company',
    submissionDate: '2024-01-15',
    resolutionDate: '2024-01-10',
    resolutionType: 'equity_change',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-30',
    title: 'Approval of Equity Restructuring',
    description: 'Resolution to approve the restructuring of equity participation to comply with Nigerian Content requirements.',
    votingResults: {
      totalVotes: 7,
      votesFor: 5,
      votesAgainst: 1,
      abstentions: 1
    },
    boardMembers: [
      { name: 'Dr. Adebayo Ogundimu', position: 'Chairman', nationality: 'Nigerian', vote: 'for' },
      { name: 'Mrs. Kemi Adeosun', position: 'Managing Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'John Smith', position: 'Technical Director', nationality: 'British', vote: 'for' },
      { name: 'Ahmed Hassan', position: 'Finance Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Sarah Johnson', position: 'Operations Director', nationality: 'American', vote: 'against' },
      { name: 'Prof. Emeka Okafor', position: 'Independent Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Dr. Fatima Aliyu', position: 'Legal Director', nationality: 'Nigerian', vote: 'abstain' }
    ],
    attachments: ['resolution-document.pdf', 'equity-restructuring-plan.pdf', 'legal-opinion.pdf'],
    legalReview: true,
    regulatoryApprovalRequired: true
  },
  {
    id: 'BR002',
    resolutionNumber: 'RES-2024-002',
    jointVentureName: 'Bonga Southwest JV',
    companyName: 'ExxonMobil Nigeria',
    submissionDate: '2024-01-12',
    resolutionDate: '2024-01-08',
    resolutionType: 'board_appointment',
    status: 'under_review',
    reviewedBy: 'Dr. Amina Hassan',
    priority: 'medium',
    dueDate: '2024-01-28',
    title: 'Appointment of New Nigerian Directors',
    description: 'Resolution to appoint two new Nigerian directors to meet local content board composition requirements.',
    votingResults: {
      totalVotes: 6,
      votesFor: 6,
      votesAgainst: 0,
      abstentions: 0
    },
    boardMembers: [
      { name: 'Alhaji Musa Bello', position: 'Chairman', nationality: 'Nigerian', vote: 'for' },
      { name: 'Dr. Grace Okoro', position: 'Managing Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Michael Brown', position: 'Technical Director', nationality: 'American', vote: 'for' },
      { name: 'Engr. Tunde Bakare', position: 'Operations Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Lisa Chen', position: 'Finance Director', nationality: 'Canadian', vote: 'for' },
      { name: 'Prof. Ngozi Okonkwo', position: 'Independent Director', nationality: 'Nigerian', vote: 'for' }
    ],
    attachments: ['board-resolution.pdf', 'directors-cv.pdf'],
    legalReview: true,
    regulatoryApprovalRequired: false
  },
  {
    id: 'BR003',
    resolutionNumber: 'RES-2024-003',
    jointVentureName: 'Agbami Field JV',
    companyName: 'Chevron Nigeria Limited',
    submissionDate: '2024-01-10',
    resolutionDate: '2024-01-05',
    resolutionType: 'major_decision',
    status: 'approved',
    reviewedBy: 'Prof. Kemi Adeosun',
    reviewDate: '2024-01-18',
    priority: 'high',
    dueDate: '2024-01-25',
    title: 'Approval of $2B Development Project',
    description: 'Resolution to approve the development of new offshore drilling platform with emphasis on local content utilization.',
    votingResults: {
      totalVotes: 8,
      votesFor: 7,
      votesAgainst: 0,
      abstentions: 1
    },
    boardMembers: [
      { name: 'Chief Emeka Anyaoku', position: 'Chairman', nationality: 'Nigerian', vote: 'for' },
      { name: 'Dr. Folake Solanke', position: 'Managing Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Robert Wilson', position: 'Technical Director', nationality: 'American', vote: 'for' },
      { name: 'Engr. Bola Tinubu', position: 'Operations Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Jennifer Davis', position: 'Finance Director', nationality: 'British', vote: 'for' },
      { name: 'Dr. Yusuf Maitama', position: 'Strategy Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Prof. Chinwe Obaji', position: 'Independent Director', nationality: 'Nigerian', vote: 'abstain' },
      { name: 'Alhaji Ibrahim Coomassie', position: 'Independent Director', nationality: 'Nigerian', vote: 'for' }
    ],
    attachments: ['project-approval.pdf', 'local-content-plan.pdf', 'financial-projections.pdf'],
    legalReview: true,
    regulatoryApprovalRequired: true
  },
  {
    id: 'BR004',
    resolutionNumber: 'RES-2024-004',
    jointVentureName: 'Okwori-Okpogu JV',
    companyName: 'Total Energies Nigeria',
    submissionDate: '2024-01-08',
    resolutionDate: '2024-01-03',
    resolutionType: 'operational_change',
    status: 'requires_revision',
    reviewedBy: 'Dr. Amina Hassan',
    reviewDate: '2024-01-16',
    priority: 'medium',
    dueDate: '2024-01-22',
    title: 'Operational Restructuring Plan',
    description: 'Resolution to restructure operations to increase Nigerian participation in key operational roles.',
    votingResults: {
      totalVotes: 5,
      votesFor: 3,
      votesAgainst: 2,
      abstentions: 0
    },
    boardMembers: [
      { name: 'Mallam Nasir El-Rufai', position: 'Chairman', nationality: 'Nigerian', vote: 'for' },
      { name: 'Dr. Aisha Abubakar', position: 'Managing Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Pierre Dubois', position: 'Technical Director', nationality: 'French', vote: 'against' },
      { name: 'Engr. Segun Obasanjo', position: 'Operations Director', nationality: 'Nigerian', vote: 'for' },
      { name: 'Marie Laurent', position: 'Finance Director', nationality: 'French', vote: 'against' }
    ],
    attachments: ['operational-plan.pdf'],
    comments: 'Insufficient detail on Nigerian personnel development timeline. Requires more specific milestones.',
    complianceIssues: ['Unclear succession planning timeline', 'Insufficient training budget allocation'],
    legalReview: false,
    regulatoryApprovalRequired: true
  }
];

export default function BoardResolutionsPage() {
  const [resolutions, setResolutions] = useState<BoardResolution[]>(mockResolutions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedResolution, setSelectedResolution] = useState<BoardResolution | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [reviewComments, setReviewComments] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approved' | 'rejected' | 'requires_revision'>('approved');

  const filteredResolutions = resolutions.filter(resolution => {
    const matchesSearch = resolution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resolution.jointVentureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resolution.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resolution.resolutionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || resolution.status === statusFilter;
    const matchesType = typeFilter === 'all' || resolution.resolutionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'equity_change':
        return 'bg-purple-100 text-purple-800';
      case 'board_appointment':
        return 'bg-blue-100 text-blue-800';
      case 'major_decision':
        return 'bg-red-100 text-red-800';
      case 'operational_change':
        return 'bg-green-100 text-green-800';
      case 'financial_decision':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleReview = (resolution: BoardResolution) => {
    setSelectedResolution(resolution);
    setShowReviewModal(true);
    setReviewComments(resolution.comments || '');
  };

  const handleViewDetails = (resolution: BoardResolution) => {
    setSelectedResolution(resolution);
    setShowDetailsModal(true);
  };

  const submitReview = () => {
    if (selectedResolution) {
      setResolutions(prev => prev.map(resolution => 
        resolution.id === selectedResolution.id 
          ? {
              ...resolution,
              status: reviewDecision,
              reviewedBy: 'Current User',
              reviewDate: new Date().toISOString().split('T')[0],
              comments: reviewComments
            }
          : resolution
      ));
      setShowReviewModal(false);
      setSelectedResolution(null);
    }
  };

  const getApprovalRate = () => {
    const approved = resolutions.filter(r => r.status === 'approved').length;
    return Math.round((approved / resolutions.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Board Resolution Review</h1>
          <p className="text-sm text-gray-600">Review and approve joint venture board resolutions for compliance</p>
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
              <p className="text-sm font-medium text-gray-600">Total Resolutions</p>
              <p className="text-2xl font-bold text-gray-900">{resolutions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold text-gray-900">{getApprovalRate()}%</p>
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
                {resolutions.filter(r => r.status === 'pending' || r.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {resolutions.filter(r => r.priority === 'high').length}
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
                placeholder="Search by title, JV name, company, or resolution number..."
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
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="equity_change">Equity Change</option>
              <option value="board_appointment">Board Appointment</option>
              <option value="major_decision">Major Decision</option>
              <option value="operational_change">Operational Change</option>
              <option value="financial_decision">Financial Decision</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resolutions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resolution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Voting Results</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResolutions.map((resolution) => (
                <tr key={resolution.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{resolution.title}</div>
                      <div className="text-sm text-gray-500">{resolution.jointVentureName}</div>
                      <div className="text-xs text-gray-400">{resolution.resolutionNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(resolution.resolutionType)}`}>
                      {formatType(resolution.resolutionType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-semibold">{resolution.votingResults.votesFor}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-red-600">{resolution.votingResults.votesAgainst}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-yellow-600">{resolution.votingResults.abstentions}</span>
                      </div>
                      <div className="text-xs text-gray-500">For/Against/Abstain</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(resolution.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(resolution.status)}`}>
                        {resolution.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{resolution.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(resolution)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </button>
                      {(resolution.status === 'pending' || resolution.status === 'under_review') && (
                        <button 
                          onClick={() => handleReview(resolution)}
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
      {showDetailsModal && selectedResolution && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Resolution Details - {selectedResolution.resolutionNumber}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Resolution Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium">Title:</span> {selectedResolution.title}</div>
                    <div><span className="font-medium">Type:</span> {formatType(selectedResolution.resolutionType)}</div>
                    <div><span className="font-medium">Date:</span> {selectedResolution.resolutionDate}</div>
                    <div><span className="font-medium">Legal Review:</span> {selectedResolution.legalReview ? 'Yes' : 'No'}</div>
                    <div><span className="font-medium">Regulatory Approval:</span> {selectedResolution.regulatoryApprovalRequired ? 'Required' : 'Not Required'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Voting Results</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium">Total Votes:</span> {selectedResolution.votingResults.totalVotes}</div>
                    <div><span className="font-medium text-green-600">Votes For:</span> {selectedResolution.votingResults.votesFor}</div>
                    <div><span className="font-medium text-red-600">Votes Against:</span> {selectedResolution.votingResults.votesAgainst}</div>
                    <div><span className="font-medium text-yellow-600">Abstentions:</span> {selectedResolution.votingResults.abstentions}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedResolution.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Board Members Voting</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nationality</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Vote</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedResolution.boardMembers.map((member, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{member.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{member.position}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{member.nationality}</td>
                          <td className="px-4 py-2 text-sm">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              member.vote === 'for' ? 'bg-green-100 text-green-800' :
                              member.vote === 'against' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {member.vote.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedResolution.complianceIssues && selectedResolution.complianceIssues.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Compliance Issues</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedResolution.complianceIssues.map((issue, index) => (
                      <li key={index} className="text-red-600 text-sm">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

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
      {showReviewModal && selectedResolution && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Review Resolution - {selectedResolution.resolutionNumber}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Title: {selectedResolution.title}</p>
                <p className="text-sm text-gray-600 mb-2">Type: {formatType(selectedResolution.resolutionType)}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Voting: {selectedResolution.votingResults.votesFor} For, {selectedResolution.votingResults.votesAgainst} Against
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