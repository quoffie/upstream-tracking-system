'use client';

import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentTextIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Inspection {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'routine' | 'compliance' | 'safety' | 'environmental' | 'follow-up';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'pending-review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scheduledDate: string;
  inspector: string;
  duration: string;
  description: string;
  findings?: {
    total: number;
    critical: number;
    major: number;
    minor: number;
  };
  complianceScore?: number;
  lastUpdated: string;
}

const mockInspections: Inspection[] = [
  {
    id: 'INS001',
    title: 'Quarterly Safety Compliance Review',
    company: 'Shell Nigeria Exploration',
    location: 'Port Harcourt Operations',
    type: 'safety',
    status: 'scheduled',
    priority: 'high',
    scheduledDate: '2024-02-15',
    inspector: 'Dr. Michael Adebayo',
    duration: '3 days',
    description: 'Comprehensive safety compliance review covering all operational areas including drilling, production, and maintenance facilities.',
    lastUpdated: '2024-02-01'
  },
  {
    id: 'INS002',
    title: 'Environmental Impact Assessment',
    company: 'Chevron Nigeria Limited',
    location: 'Escravos Terminal',
    type: 'environmental',
    status: 'in-progress',
    priority: 'critical',
    scheduledDate: '2024-02-10',
    inspector: 'Prof. Grace Okafor',
    duration: '5 days',
    description: 'Environmental impact assessment focusing on waste management, emissions control, and ecosystem protection measures.',
    findings: {
      total: 12,
      critical: 2,
      major: 4,
      minor: 6
    },
    complianceScore: 78,
    lastUpdated: '2024-02-12'
  },
  {
    id: 'INS003',
    title: 'Local Content Compliance Audit',
    company: 'TotalEnergies EP Nigeria',
    location: 'Lagos Office',
    type: 'compliance',
    status: 'completed',
    priority: 'medium',
    scheduledDate: '2024-01-28',
    inspector: 'Engr. James Wilson',
    duration: '2 days',
    description: 'Audit of local content compliance including personnel, equipment, and service procurement from Nigerian sources.',
    findings: {
      total: 8,
      critical: 0,
      major: 2,
      minor: 6
    },
    complianceScore: 92,
    lastUpdated: '2024-01-30'
  },
  {
    id: 'INS004',
    title: 'Routine Operations Inspection',
    company: 'ExxonMobil Nigeria',
    location: 'Qua Iboe Terminal',
    type: 'routine',
    status: 'pending-review',
    priority: 'medium',
    scheduledDate: '2024-01-20',
    inspector: 'Dr. Sarah Johnson',
    duration: '4 days',
    description: 'Regular operational inspection covering production facilities, storage systems, and transportation infrastructure.',
    findings: {
      total: 15,
      critical: 1,
      major: 5,
      minor: 9
    },
    complianceScore: 85,
    lastUpdated: '2024-01-25'
  },
  {
    id: 'INS005',
    title: 'Follow-up Inspection - Safety Violations',
    company: 'Aiteo Eastern E&P',
    location: 'Nembe Creek',
    type: 'follow-up',
    status: 'scheduled',
    priority: 'critical',
    scheduledDate: '2024-02-18',
    inspector: 'Engr. David Williams',
    duration: '2 days',
    description: 'Follow-up inspection to verify correction of previously identified safety violations and implementation of corrective measures.',
    lastUpdated: '2024-02-05'
  },
  {
    id: 'INS006',
    title: 'Technology Transfer Compliance Review',
    company: 'Seplat Energy Plc',
    location: 'Warri Operations',
    type: 'compliance',
    status: 'completed',
    priority: 'medium',
    scheduledDate: '2024-01-15',
    inspector: 'Dr. Lisa Anderson',
    duration: '3 days',
    description: 'Review of technology transfer initiatives and compliance with local content requirements for technical knowledge sharing.',
    findings: {
      total: 6,
      critical: 0,
      major: 1,
      minor: 5
    },
    complianceScore: 94,
    lastUpdated: '2024-01-18'
  }
];

const typeColors = {
  routine: 'bg-blue-100 text-blue-800',
  compliance: 'bg-purple-100 text-purple-800',
  safety: 'bg-red-100 text-red-800',
  environmental: 'bg-green-100 text-green-800',
  'follow-up': 'bg-yellow-100 text-yellow-800'
};

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  'pending-review': 'bg-purple-100 text-purple-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function ReviewerInspectionsPage() {
  const [inspections, setInspections] = useState(mockInspections);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || inspection.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || inspection.priority === priorityFilter;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const handleViewInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setShowModal(true);
  };

  const getComplianceColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'pending-review':
        return <ExclamationTriangleIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <CalendarIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inspections</h1>
          <p className="text-gray-600">Manage and review inspection activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/reviewer/inspections/schedule"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <CalendarIcon className="h-5 w-5" />
            Schedule
          </Link>
          <Link
            href="/dashboard/reviewer/inspections/reports"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Reports
          </Link>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            New Inspection
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Inspections</p>
              <p className="text-2xl font-bold text-gray-900">{inspections.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {inspections.filter(i => i.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {inspections.filter(i => i.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Priority</p>
              <p className="text-2xl font-bold text-gray-900">
                {inspections.filter(i => i.priority === 'critical').length}
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
                placeholder="Search inspections..."
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
            <option value="routine">Routine</option>
            <option value="compliance">Compliance</option>
            <option value="safety">Safety</option>
            <option value="environmental">Environmental</option>
            <option value="follow-up">Follow-up</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending-review">Pending Review</option>
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
              {filteredInspections.length} of {inspections.length} inspections
            </span>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
            <ArrowPathIcon className="h-4 w-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Inspections List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{inspection.title}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {inspection.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{inspection.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[inspection.type]}`}>
                      {inspection.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(inspection.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inspection.status]}`}>
                        {inspection.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[inspection.priority]}`}>
                      {inspection.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                      {inspection.scheduledDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{inspection.inspector}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inspection.complianceScore ? (
                      <span className={`text-sm font-medium ${getComplianceColor(inspection.complianceScore)}`}>
                        {inspection.complianceScore}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewInspection(inspection)}
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

      {/* Inspection Details Modal */}
      {showModal && selectedInspection && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-900">Inspection Details</h3>
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
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedInspection.title}</h4>
                    <p className="text-gray-600">{selectedInspection.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Company</p>
                      <p className="text-sm text-gray-900">{selectedInspection.company}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-900">{selectedInspection.location}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedInspection.type]}`}>
                        {selectedInspection.type.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Priority</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[selectedInspection.priority]}`}>
                        {selectedInspection.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Inspector</p>
                      <p className="text-sm text-gray-900">{selectedInspection.inspector}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration</p>
                      <p className="text-sm text-gray-900">{selectedInspection.duration}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Scheduled Date</p>
                      <p className="text-sm text-gray-900">{selectedInspection.scheduledDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedInspection.status]}`}>
                        {selectedInspection.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Findings and Compliance */}
                <div className="space-y-4">
                  {selectedInspection.complianceScore && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Compliance Score</h4>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
                          <div 
                            className={`h-3 rounded-full ${
                              selectedInspection.complianceScore >= 90 ? 'bg-green-500' :
                              selectedInspection.complianceScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedInspection.complianceScore}%` }}
                          ></div>
                        </div>
                        <span className={`text-lg font-bold ${getComplianceColor(selectedInspection.complianceScore)}`}>
                          {selectedInspection.complianceScore}%
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {selectedInspection.findings && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Findings Summary</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-red-700">Critical</p>
                          <p className="text-2xl font-bold text-red-900">{selectedInspection.findings.critical}</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-orange-700">Major</p>
                          <p className="text-2xl font-bold text-orange-900">{selectedInspection.findings.major}</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-yellow-700">Minor</p>
                          <p className="text-2xl font-bold text-yellow-900">{selectedInspection.findings.minor}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-700">Total</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedInspection.findings.total}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Updated</p>
                    <p className="text-sm text-gray-900">{selectedInspection.lastUpdated}</p>
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