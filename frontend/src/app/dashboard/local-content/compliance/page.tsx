'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheckIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ChartBarIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

interface ComplianceRecord {
  id: string;
  companyName: string;
  complianceType: 'local_content' | 'employment' | 'training' | 'procurement' | 'technology_transfer';
  requirement: string;
  targetPercentage: number;
  actualPercentage: number;
  status: 'compliant' | 'non_compliant' | 'under_review' | 'pending';
  lastAssessment: string;
  nextReview: string;
  assessor: string;
  riskLevel: 'high' | 'medium' | 'low';
  remedialActions: string[];
  documentationStatus: 'complete' | 'incomplete' | 'missing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  notes: string;
}

const mockRecords: ComplianceRecord[] = [
  {
    id: 'COMP001',
    companyName: 'Shell Nigeria Exploration',
    complianceType: 'local_content',
    requirement: 'Local Content Development Plan Implementation',
    targetPercentage: 70,
    actualPercentage: 65,
    status: 'under_review',
    lastAssessment: '2024-01-15',
    nextReview: '2024-04-15',
    assessor: 'Dr. Adebayo Johnson',
    riskLevel: 'medium',
    remedialActions: ['Increase local supplier engagement', 'Enhance training programs'],
    documentationStatus: 'complete',
    priority: 'high',
    notes: 'Company showing good progress but needs to accelerate local content integration'
  },
  {
    id: 'COMP002',
    companyName: 'TotalEnergies Nigeria',
    complianceType: 'employment',
    requirement: 'Nigerian Employment Quota',
    targetPercentage: 95,
    actualPercentage: 92,
    status: 'compliant',
    lastAssessment: '2024-01-20',
    nextReview: '2024-07-20',
    assessor: 'Mrs. Fatima Abdullahi',
    riskLevel: 'low',
    remedialActions: [],
    documentationStatus: 'complete',
    priority: 'medium',
    notes: 'Excellent compliance with employment requirements'
  },
  {
    id: 'COMP003',
    companyName: 'Chevron Nigeria Limited',
    complianceType: 'training',
    requirement: 'Local Capacity Building Programs',
    targetPercentage: 80,
    actualPercentage: 55,
    status: 'non_compliant',
    lastAssessment: '2024-01-10',
    nextReview: '2024-02-28',
    assessor: 'Eng. Chidi Okafor',
    riskLevel: 'high',
    remedialActions: ['Develop comprehensive training strategy', 'Partner with local institutions', 'Increase training budget allocation'],
    documentationStatus: 'incomplete',
    priority: 'critical',
    notes: 'Significant gaps in training program implementation. Immediate action required.'
  }
];

const statusColors = {
  compliant: 'bg-green-100 text-green-800',
  non_compliant: 'bg-red-100 text-red-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  pending: 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  compliant: CheckCircleIcon,
  non_compliant: XCircleIcon,
  under_review: ClockIcon,
  pending: ExclamationTriangleIcon
};

const riskColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const typeColors = {
  local_content: 'bg-blue-100 text-blue-800',
  employment: 'bg-green-100 text-green-800',
  training: 'bg-purple-100 text-purple-800',
  procurement: 'bg-orange-100 text-orange-800',
  technology_transfer: 'bg-indigo-100 text-indigo-800'
};

const priorityColors = {
  critical: 'text-red-600',
  high: 'text-orange-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
};

const documentationColors = {
  complete: 'bg-green-100 text-green-800',
  incomplete: 'bg-yellow-100 text-yellow-800',
  missing: 'bg-red-100 text-red-800'
};

export default function LocalContentCompliancePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.requirement.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesType = typeFilter === 'all' || record.complianceType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (record: ComplianceRecord) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const totalRecords = mockRecords.length;
  const compliantRecords = mockRecords.filter(record => record.status === 'compliant').length;
  const nonCompliantRecords = mockRecords.filter(record => record.status === 'non_compliant').length;
  const avgCompliance = mockRecords.reduce((sum, record) => sum + record.actualPercentage, 0) / mockRecords.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Compliance</h1>
          <p className="text-gray-600">Monitor and manage local content compliance requirements</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Assessment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{totalRecords}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{compliantRecords}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{nonCompliantRecords}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(avgCompliance)}%</p>
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
                placeholder="Search compliance records..."
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
              <option value="compliant">Compliant</option>
              <option value="non_compliant">Non-Compliant</option>
              <option value="under_review">Under Review</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="local_content">Local Content</option>
              <option value="employment">Employment</option>
              <option value="training">Training</option>
              <option value="procurement">Procurement</option>
              <option value="technology_transfer">Technology Transfer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Records Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company & Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => {
                const StatusIcon = statusIcons[record.status];
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.companyName}</div>
                        <div className="text-sm text-gray-500">{record.requirement}</div>
                        <div className="text-xs text-gray-400">ID: {record.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[record.complianceType]}`}>
                        {record.complianceType.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {record.actualPercentage}% / {record.targetPercentage}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              record.actualPercentage >= record.targetPercentage ? 'bg-green-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${Math.min((record.actualPercentage / record.targetPercentage) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {record.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColors[record.riskLevel]}`}>
                        {record.riskLevel.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.nextReview}</div>
                      <div className={`text-xs font-medium ${priorityColors[record.priority]}`}>
                        {record.priority.toUpperCase()} PRIORITY
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(record)}
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

      {/* Record Details Modal */}
      {showDetails && selectedRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Compliance Record Details</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Record ID</label>
                    <p className="text-sm text-gray-900">{selectedRecord.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Assessment</label>
                    <p className="text-sm text-gray-900">{selectedRecord.lastAssessment}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <p className="text-sm text-gray-900">{selectedRecord.companyName}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Compliance Requirement</label>
                  <p className="text-sm text-gray-900">{selectedRecord.requirement}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Compliance Type</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedRecord.complianceType]}`}>
                      {selectedRecord.complianceType.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedRecord.status]}`}>
                      {selectedRecord.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColors[selectedRecord.riskLevel]}`}>
                      {selectedRecord.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target Percentage</label>
                    <p className="text-sm text-gray-900">{selectedRecord.targetPercentage}%</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Actual Percentage</label>
                    <p className="text-sm text-gray-900">{selectedRecord.actualPercentage}%</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assessor</label>
                    <p className="text-sm text-gray-900">{selectedRecord.assessor}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Next Review Date</label>
                    <p className="text-sm text-gray-900">{selectedRecord.nextReview}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Documentation Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${documentationColors[selectedRecord.documentationStatus]}`}>
                    {selectedRecord.documentationStatus.toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Remedial Actions Required</label>
                  {selectedRecord.remedialActions.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-900 mt-1">
                      {selectedRecord.remedialActions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No remedial actions required</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Assessment Notes</label>
                  <p className="text-sm text-gray-900">{selectedRecord.notes}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Update Assessment
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}