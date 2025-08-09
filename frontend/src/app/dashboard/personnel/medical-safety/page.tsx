'use client';

import { useState } from 'react';
import {
  HeartIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  BeakerIcon,
  TruckIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface MedicalRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  company: string;
  recordType: 'medical_exam' | 'safety_training' | 'incident_report' | 'vaccination' | 'fitness_test';
  status: 'current' | 'expired' | 'pending' | 'overdue';
  date: string;
  expiryDate: string;
  certifyingDoctor: string;
  location: string;
  notes: string;
  nextDue: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface SafetyIncident {
  id: string;
  reportedBy: string;
  company: string;
  incidentType: 'injury' | 'near_miss' | 'equipment_failure' | 'environmental' | 'security';
  severity: 'minor' | 'moderate' | 'major' | 'critical';
  date: string;
  location: string;
  description: string;
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  assignedInvestigator: string;
  actionsTaken: string;
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: 'MR001',
    employeeName: 'John Adebayo',
    employeeId: 'EMP001',
    company: 'Shell Nigeria',
    recordType: 'medical_exam',
    status: 'current',
    date: '2024-01-15',
    expiryDate: '2025-01-15',
    certifyingDoctor: 'Dr. Sarah Johnson',
    location: 'Lagos Medical Center',
    notes: 'Fit for offshore duties. No restrictions.',
    nextDue: '2025-01-15',
    riskLevel: 'low'
  },
  {
    id: 'MR002',
    employeeName: 'Maria Santos',
    employeeId: 'EMP002',
    company: 'TotalEnergies',
    recordType: 'safety_training',
    status: 'expired',
    date: '2023-06-20',
    expiryDate: '2024-06-20',
    certifyingDoctor: 'Safety Training Institute',
    location: 'Port Harcourt Training Center',
    notes: 'H2S Safety Training completed. Renewal required.',
    nextDue: '2024-06-20',
    riskLevel: 'high'
  },
  {
    id: 'MR003',
    employeeName: 'David Thompson',
    employeeId: 'EMP003',
    company: 'Chevron Nigeria',
    recordType: 'vaccination',
    status: 'current',
    date: '2024-02-01',
    expiryDate: '2025-02-01',
    certifyingDoctor: 'Dr. Michael Chen',
    location: 'Warri General Hospital',
    notes: 'Yellow fever and Hepatitis B vaccinations up to date.',
    nextDue: '2025-02-01',
    riskLevel: 'low'
  },
  {
    id: 'MR004',
    employeeName: 'Lisa Wang',
    employeeId: 'EMP004',
    company: 'ExxonMobil',
    recordType: 'fitness_test',
    status: 'pending',
    date: '2024-02-05',
    expiryDate: '2025-02-05',
    certifyingDoctor: 'Dr. Amina Hassan',
    location: 'Abuja Fitness Center',
    notes: 'Physical fitness assessment scheduled.',
    nextDue: '2024-02-10',
    riskLevel: 'medium'
  }
];

const mockSafetyIncidents: SafetyIncident[] = [
  {
    id: 'SI001',
    reportedBy: 'Robert Brown',
    company: 'Eni Nigeria',
    incidentType: 'near_miss',
    severity: 'moderate',
    date: '2024-02-01',
    location: 'Offshore Platform Alpha',
    description: 'Near miss incident during crane operation. No injuries reported.',
    status: 'investigating',
    assignedInvestigator: 'Safety Officer Johnson',
    actionsTaken: 'Immediate area cordoned off, equipment inspection initiated.'
  },
  {
    id: 'SI002',
    reportedBy: 'Grace Okafor',
    company: 'Shell Nigeria',
    incidentType: 'injury',
    severity: 'minor',
    date: '2024-01-28',
    location: 'Onshore Processing Facility',
    description: 'Minor cut on hand during maintenance work.',
    status: 'resolved',
    assignedInvestigator: 'Safety Manager Adams',
    actionsTaken: 'First aid administered, safety briefing conducted for team.'
  }
];

const recordTypeColors = {
  medical_exam: 'bg-blue-100 text-blue-800',
  safety_training: 'bg-green-100 text-green-800',
  incident_report: 'bg-red-100 text-red-800',
  vaccination: 'bg-purple-100 text-purple-800',
  fitness_test: 'bg-yellow-100 text-yellow-800'
};

const statusColors = {
  current: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  overdue: 'bg-red-100 text-red-800'
};

const riskColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const severityColors = {
  minor: 'bg-yellow-100 text-yellow-800',
  moderate: 'bg-orange-100 text-orange-800',
  major: 'bg-red-100 text-red-800',
  critical: 'bg-red-200 text-red-900'
};

export default function MedicalSafetyPage() {
  const [activeTab, setActiveTab] = useState<'medical' | 'incidents'>('medical');
  const [medicalRecords, setMedicalRecords] = useState(mockMedicalRecords);
  const [safetyIncidents, setSafetyIncidents] = useState(mockSafetyIncidents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredMedicalRecords = medicalRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSafetyIncidents = safetyIncidents.filter(incident => {
    const matchesSearch = incident.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setSelectedIncident(null);
    setShowModal(true);
  };

  const handleViewIncident = (incident: SafetyIncident) => {
    setSelectedIncident(incident);
    setSelectedRecord(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical & Safety</h1>
          <p className="text-gray-600">Manage medical records and safety incidents for personnel</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Record
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HeartIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Records</p>
              <p className="text-2xl font-bold text-gray-900">
                {medicalRecords.filter(record => record.status === 'current').length}
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
              <p className="text-sm font-medium text-gray-600">Expired/Overdue</p>
              <p className="text-2xl font-bold text-gray-900">
                {medicalRecords.filter(record => record.status === 'expired' || record.status === 'overdue').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Safety Incidents</p>
              <p className="text-2xl font-bold text-gray-900">{safetyIncidents.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900">
                {medicalRecords.filter(record => record.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('medical')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'medical'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Medical Records
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'incidents'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Safety Incidents
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'medical' ? 'medical records' : 'safety incidents'}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {activeTab === 'medical' && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="current">Current</option>
                <option value="expired">Expired</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'medical' ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Record Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMedicalRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                            <div className="text-sm text-gray-500">{record.company}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${recordTypeColors[record.recordType]}`}>
                          {record.recordType.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                          {record.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColors[record.riskLevel]}`}>
                          {record.riskLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.nextDue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewRecord(record)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSafetyIncidents.map((incident) => (
                <div key={incident.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Incident {incident.id}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColors[incident.severity]}`}>
                          {incident.severity.toUpperCase()}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {incident.incidentType.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{incident.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Reported By</p>
                          <p className="text-gray-900">{incident.reportedBy}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Company</p>
                          <p className="text-gray-900">{incident.company}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Date</p>
                          <p className="text-gray-900">{incident.date}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Location</p>
                          <p className="text-gray-900">{incident.location}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewIncident(incident)}
                      className="ml-4 text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && (selectedRecord || selectedIncident) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedRecord ? 'Medical Record Details' : 'Safety Incident Details'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {selectedRecord && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Record ID</p>
                      <p className="text-sm text-gray-900">{selectedRecord.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Employee ID</p>
                      <p className="text-sm text-gray-900">{selectedRecord.employeeId}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Employee Name</p>
                      <p className="text-sm text-gray-900">{selectedRecord.employeeName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Company</p>
                      <p className="text-sm text-gray-900">{selectedRecord.company}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Record Type</p>
                      <p className="text-sm text-gray-900">{selectedRecord.recordType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedRecord.status]}`}>
                        {selectedRecord.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Date</p>
                      <p className="text-sm text-gray-900">{selectedRecord.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Expiry Date</p>
                      <p className="text-sm text-gray-900">{selectedRecord.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Certifying Doctor</p>
                      <p className="text-sm text-gray-900">{selectedRecord.certifyingDoctor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-900">{selectedRecord.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Notes</p>
                    <p className="text-sm text-gray-900">{selectedRecord.notes}</p>
                  </div>
                </div>
              )}
              
              {selectedIncident && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Incident ID</p>
                      <p className="text-sm text-gray-900">{selectedIncident.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Severity</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityColors[selectedIncident.severity]}`}>
                        {selectedIncident.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Reported By</p>
                      <p className="text-sm text-gray-900">{selectedIncident.reportedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Company</p>
                      <p className="text-sm text-gray-900">{selectedIncident.company}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Date</p>
                      <p className="text-sm text-gray-900">{selectedIncident.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-900">{selectedIncident.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Description</p>
                    <p className="text-sm text-gray-900">{selectedIncident.description}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Actions Taken</p>
                    <p className="text-sm text-gray-900">{selectedIncident.actionsTaken}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Status</p>
                      <p className="text-sm text-gray-900">{selectedIncident.status.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Assigned Investigator</p>
                      <p className="text-sm text-gray-900">{selectedIncident.assignedInvestigator}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}