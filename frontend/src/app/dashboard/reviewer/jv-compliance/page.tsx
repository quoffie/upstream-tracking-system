'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentTextIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface JVCompliance {
  id: string;
  companyName: string;
  jvPartner: string;
  projectName: string;
  complianceType: 'equity' | 'local-content' | 'technology-transfer' | 'employment' | 'procurement' | 'training';
  status: 'compliant' | 'non-compliant' | 'under-review' | 'pending-action' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  equityPercentage?: number;
  localContentScore?: number;
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
  actionRequired?: string;
  complianceScore: number;
  investmentValue: string;
}

const mockJVCompliance: JVCompliance[] = [
  {
    id: 'JVC001',
    companyName: 'Shell Nigeria Exploration',
    jvPartner: 'NNPC Limited',
    projectName: 'Bonga Deep Water Project',
    complianceType: 'equity',
    status: 'compliant',
    priority: 'medium',
    equityPercentage: 55,
    localContentScore: 78,
    lastReviewDate: '2024-01-15',
    nextReviewDate: '2024-04-15',
    reviewer: 'Dr. Adebayo Johnson',
    findings: {
      total: 3,
      critical: 0,
      major: 1,
      minor: 2
    },
    description: 'Joint venture equity compliance review for deep water exploration project.',
    complianceScore: 92,
    investmentValue: '$2.5B'
  },
  {
    id: 'JVC002',
    companyName: 'Chevron Nigeria Limited',
    jvPartner: 'NNPC Limited',
    projectName: 'Agbami Field Development',
    complianceType: 'local-content',
    status: 'under-review',
    priority: 'high',
    equityPercentage: 67.5,
    localContentScore: 65,
    lastReviewDate: '2024-02-01',
    nextReviewDate: '2024-03-01',
    reviewer: 'Engr. Grace Okafor',
    findings: {
      total: 8,
      critical: 2,
      major: 3,
      minor: 3
    },
    description: 'Local content compliance assessment for field development operations.',
    actionRequired: 'Increase local procurement to meet 70% target',
    complianceScore: 68,
    investmentValue: '$1.8B'
  },
  {
    id: 'JVC003',
    companyName: 'TotalEnergies EP Nigeria',
    jvPartner: 'NNPC Limited',
    projectName: 'Egina FPSO Operations',
    complianceType: 'technology-transfer',
    status: 'non-compliant',
    priority: 'critical',
    equityPercentage: 24,
    localContentScore: 45,
    lastReviewDate: '2024-01-20',
    nextReviewDate: '2024-02-20',
    reviewer: 'Prof. Michael Williams',
    findings: {
      total: 12,
      critical: 4,
      major: 5,
      minor: 3
    },
    description: 'Technology transfer compliance review for FPSO operations and maintenance.',
    actionRequired: 'Implement comprehensive technology transfer program within 60 days',
    complianceScore: 45,
    investmentValue: '$3.2B'
  },
  {
    id: 'JVC004',
    companyName: 'ExxonMobil Nigeria',
    jvPartner: 'NNPC Limited',
    projectName: 'Qua Iboe Terminal Expansion',
    complianceType: 'employment',
    status: 'pending-action',
    priority: 'high',
    equityPercentage: 40,
    localContentScore: 82,
    lastReviewDate: '2024-01-25',
    nextReviewDate: '2024-03-25',
    reviewer: 'Dr. Sarah Anderson',
    findings: {
      total: 6,
      critical: 1,
      major: 2,
      minor: 3
    },
    description: 'Employment and local capacity building compliance assessment.',
    actionRequired: 'Submit updated employment plan with increased Nigerian content',
    complianceScore: 75,
    investmentValue: '$1.2B'
  },
  {
    id: 'JVC005',
    companyName: 'Seplat Energy Plc',
    jvPartner: 'NNPC Limited',
    projectName: 'ANOH Gas Processing Plant',
    complianceType: 'procurement',
    status: 'compliant',
    priority: 'low',
    equityPercentage: 40,
    localContentScore: 88,
    lastReviewDate: '2024-02-05',
    nextReviewDate: '2024-05-05',
    reviewer: 'Engr. David Wilson',
    findings: {
      total: 2,
      critical: 0,
      major: 0,
      minor: 2
    },
    description: 'Procurement compliance review for gas processing facility construction.',
    complianceScore: 94,
    investmentValue: '$700M'
  },
  {
    id: 'JVC006',
    companyName: 'Aiteo Eastern E&P',
    jvPartner: 'NNPC Limited',
    projectName: 'Nembe Creek Trunk Line',
    complianceType: 'training',
    status: 'resolved',
    priority: 'medium',
    equityPercentage: 45,
    localContentScore: 72,
    lastReviewDate: '2024-01-10',
    nextReviewDate: '2024-04-10',
    reviewer: 'Dr. Lisa Johnson',
    findings: {
      total: 4,
      critical: 0,
      major: 1,
      minor: 3
    },
    description: 'Training and capacity development compliance assessment.',
    complianceScore: 85,
    investmentValue: '$450M'
  }
];

const typeColors = {
  equity: 'bg-blue-100 text-blue-800',
  'local-content': 'bg-green-100 text-green-800',
  'technology-transfer': 'bg-purple-100 text-purple-800',
  employment: 'bg-yellow-100 text-yellow-800',
  procurement: 'bg-indigo-100 text-indigo-800',
  training: 'bg-pink-100 text-pink-800'
};

const statusColors = {
  compliant: 'bg-green-100 text-green-800',
  'non-compliant': 'bg-red-100 text-red-800',
  'under-review': 'bg-yellow-100 text-yellow-800',
  'pending-action': 'bg-orange-100 text-orange-800',
  resolved: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function ReviewerJVCompliancePage() {
  const [compliance, setCompliance] = useState(mockJVCompliance);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedCompliance, setSelectedCompliance] = useState<JVCompliance | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredCompliance = compliance.filter(item => {
    const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jvPartner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.complianceType === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleViewCompliance = (item: JVCompliance) => {
    setSelectedCompliance(item);
    setShowModal(true);
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'non-compliant':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'under-review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'pending-action':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">JV Compliance</h1>
          <p className="text-gray-600">Monitor joint venture compliance across all projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/reviewer/jv-compliance/equity"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ChartBarIcon className="h-5 w-5" />
            Equity
          </Link>
          <Link
            href="/dashboard/reviewer/jv-compliance/resolutions"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Resolutions
          </Link>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
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
              <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total JVs</p>
              <p className="text-2xl font-bold text-gray-900">{compliance.length}</p>
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
                {compliance.filter(i => i.status === 'compliant').length}
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
                {compliance.filter(i => i.status === 'non-compliant').length}
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
                {compliance.filter(i => i.status === 'under-review').length}
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
              <p className="text-sm font-medium text-gray-600">Action Required</p>
              <p className="text-2xl font-bold text-gray-900">
                {compliance.filter(i => i.status === 'pending-action').length}
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
                placeholder="Search JV compliance..."
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
            <option value="equity">Equity</option>
            <option value="local-content">Local Content</option>
            <option value="technology-transfer">Technology Transfer</option>
            <option value="employment">Employment</option>
            <option value="procurement">Procurement</option>
            <option value="training">Training</option>
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
            <option value="pending-action">Pending Action</option>
            <option value="resolved">Resolved</option>
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
              {filteredCompliance.length} of {compliance.length} JV compliance records
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
            <ArrowPathIcon className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Compliance List */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompliance.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.projectName}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {item.jvPartner}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BuildingOffice2Icon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.companyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[item.complianceType]}`}>
                      {item.complianceType.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.status]}`}>
                        {item.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[item.priority]}`}>
                      {item.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3 w-16">
                        <div 
                          className={`h-2 rounded-full ${
                            item.complianceScore >= 90 ? 'bg-green-500' :
                            item.complianceScore >= 75 ? 'bg-yellow-500' :
                            item.complianceScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${item.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getComplianceColor(item.complianceScore)}`}>
                        {item.complianceScore}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{item.investmentValue}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{item.nextReviewDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewCompliance(item)}
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

      {/* Compliance Details Modal */}
      {showModal && selectedCompliance && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">JV Compliance Details</h3>
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
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedCompliance.projectName}</h4>
                    <p className="text-gray-600">{selectedCompliance.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Company</p>
                      <p className="text-sm text-gray-900">{selectedCompliance.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">JV Partner</p>
                      <p className="text-sm text-gray-900">{selectedCompliance.jvPartner}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedCompliance.complianceType]}`}>
                        {selectedCompliance.complianceType.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Priority</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[selectedCompliance.priority]}`}>
                        {selectedCompliance.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Investment Value</p>
                      <p className="text-sm text-gray-900">{selectedCompliance.investmentValue}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Reviewer</p>
                      <p className="text-sm text-gray-900">{selectedCompliance.reviewer}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Last Review</p>
                      <p className="text-sm text-gray-900">{selectedCompliance.lastReviewDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Next Review</p>
                      <p className="text-sm text-gray-900">{selectedCompliance.nextReviewDate}</p>
                    </div>
                  </div>
                  
                  {selectedCompliance.actionRequired && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-orange-800 mb-2">Action Required</h4>
                      <p className="text-sm text-orange-700">{selectedCompliance.actionRequired}</p>
                    </div>
                  )}
                </div>
                
                {/* Compliance Metrics */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Compliance Score</h4>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
                        <div 
                          className={`h-3 rounded-full ${
                            selectedCompliance.complianceScore >= 90 ? 'bg-green-500' :
                            selectedCompliance.complianceScore >= 75 ? 'bg-yellow-500' :
                            selectedCompliance.complianceScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedCompliance.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className={`text-lg font-bold ${getComplianceColor(selectedCompliance.complianceScore)}`}>
                        {selectedCompliance.complianceScore}%
                      </span>
                    </div>
                  </div>
                  
                  {selectedCompliance.equityPercentage && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Equity Percentage</h4>
                      <p className="text-2xl font-bold text-blue-900">{selectedCompliance.equityPercentage}%</p>
                    </div>
                  )}
                  
                  {selectedCompliance.localContentScore && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800 mb-2">Local Content Score</h4>
                      <p className="text-2xl font-bold text-green-900">{selectedCompliance.localContentScore}%</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Findings Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-red-700">Critical</p>
                        <p className="text-2xl font-bold text-red-900">{selectedCompliance.findings.critical}</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-orange-700">Major</p>
                        <p className="text-2xl font-bold text-orange-900">{selectedCompliance.findings.major}</p>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-yellow-700">Minor</p>
                        <p className="text-2xl font-bold text-yellow-900">{selectedCompliance.findings.minor}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedCompliance.findings.total}</p>
                      </div>
                    </div>
                  </div>
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