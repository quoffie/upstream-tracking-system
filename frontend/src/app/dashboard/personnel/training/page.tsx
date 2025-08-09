'use client';

import { useState } from 'react';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  DocumentTextIcon,
  PlayIcon,
  TrophyIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface TrainingProgram {
  id: string;
  title: string;
  category: 'safety' | 'technical' | 'compliance' | 'leadership' | 'environmental';
  type: 'mandatory' | 'optional' | 'certification';
  duration: string;
  instructor: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  description: string;
  prerequisites: string[];
  materials: string[];
  certificationValid: string;
}

interface TrainingRecord {
  id: string;
  employeeName: string;
  employeeId: string;
  company: string;
  programTitle: string;
  category: string;
  completionDate: string;
  score: number;
  status: 'completed' | 'in_progress' | 'failed' | 'expired';
  certificateNumber: string;
  expiryDate: string;
  instructor: string;
  nextRenewal: string;
}

const mockTrainingPrograms: TrainingProgram[] = [
  {
    id: 'TP001',
    title: 'Offshore Safety Procedures',
    category: 'safety',
    type: 'mandatory',
    duration: '3 days',
    instructor: 'John Safety Expert',
    location: 'Lagos Training Center',
    startDate: '2024-02-15',
    endDate: '2024-02-17',
    capacity: 25,
    enrolled: 18,
    status: 'upcoming',
    description: 'Comprehensive training on offshore safety procedures and emergency response.',
    prerequisites: ['Basic Safety Orientation', 'Medical Fitness Certificate'],
    materials: ['Safety Manual', 'Emergency Response Guide', 'PPE Checklist'],
    certificationValid: '2 years'
  },
  {
    id: 'TP002',
    title: 'Advanced Drilling Techniques',
    category: 'technical',
    type: 'certification',
    duration: '5 days',
    instructor: 'Dr. Maria Rodriguez',
    location: 'Port Harcourt Technical Institute',
    startDate: '2024-02-20',
    endDate: '2024-02-24',
    capacity: 15,
    enrolled: 12,
    status: 'upcoming',
    description: 'Advanced training on modern drilling techniques and equipment operation.',
    prerequisites: ['Basic Drilling Operations', '2 years field experience'],
    materials: ['Drilling Manual', 'Equipment Specifications', 'Case Studies'],
    certificationValid: '3 years'
  },
  {
    id: 'TP003',
    title: 'Environmental Compliance',
    category: 'environmental',
    type: 'mandatory',
    duration: '2 days',
    instructor: 'Environmental Team',
    location: 'Abuja Conference Center',
    startDate: '2024-02-10',
    endDate: '2024-02-11',
    capacity: 30,
    enrolled: 25,
    status: 'ongoing',
    description: 'Training on environmental regulations and compliance requirements.',
    prerequisites: ['Basic Environmental Awareness'],
    materials: ['Compliance Manual', 'Regulatory Guidelines', 'Assessment Forms'],
    certificationValid: '1 year'
  },
  {
    id: 'TP004',
    title: 'Leadership Development',
    category: 'leadership',
    type: 'optional',
    duration: '4 days',
    instructor: 'Leadership Institute',
    location: 'Lagos Business School',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    capacity: 20,
    enrolled: 20,
    status: 'completed',
    description: 'Comprehensive leadership development program for senior personnel.',
    prerequisites: ['Management Experience', 'Supervisor Recommendation'],
    materials: ['Leadership Handbook', 'Case Studies', 'Assessment Tools'],
    certificationValid: 'Lifetime'
  }
];

const mockTrainingRecords: TrainingRecord[] = [
  {
    id: 'TR001',
    employeeName: 'John Adebayo',
    employeeId: 'EMP001',
    company: 'Shell Nigeria',
    programTitle: 'Offshore Safety Procedures',
    category: 'Safety',
    completionDate: '2023-12-15',
    score: 92,
    status: 'completed',
    certificateNumber: 'OSP-2023-001',
    expiryDate: '2025-12-15',
    instructor: 'John Safety Expert',
    nextRenewal: '2025-10-15'
  },
  {
    id: 'TR002',
    employeeName: 'Maria Santos',
    employeeId: 'EMP002',
    company: 'TotalEnergies',
    programTitle: 'Advanced Drilling Techniques',
    category: 'Technical',
    completionDate: '2024-01-20',
    score: 88,
    status: 'completed',
    certificateNumber: 'ADT-2024-002',
    expiryDate: '2027-01-20',
    instructor: 'Dr. Maria Rodriguez',
    nextRenewal: '2026-11-20'
  },
  {
    id: 'TR003',
    employeeName: 'David Thompson',
    employeeId: 'EMP003',
    company: 'Chevron Nigeria',
    programTitle: 'Environmental Compliance',
    category: 'Environmental',
    completionDate: '2023-11-10',
    score: 76,
    status: 'expired',
    certificateNumber: 'EC-2023-003',
    expiryDate: '2024-11-10',
    instructor: 'Environmental Team',
    nextRenewal: '2024-09-10'
  },
  {
    id: 'TR004',
    employeeName: 'Lisa Wang',
    employeeId: 'EMP004',
    company: 'ExxonMobil',
    programTitle: 'Leadership Development',
    category: 'Leadership',
    completionDate: '2024-01-18',
    score: 95,
    status: 'completed',
    certificateNumber: 'LD-2024-004',
    expiryDate: 'Lifetime',
    instructor: 'Leadership Institute',
    nextRenewal: 'N/A'
  }
];

const categoryColors = {
  safety: 'bg-red-100 text-red-800',
  technical: 'bg-blue-100 text-blue-800',
  compliance: 'bg-yellow-100 text-yellow-800',
  leadership: 'bg-purple-100 text-purple-800',
  environmental: 'bg-green-100 text-green-800'
};

const typeColors = {
  mandatory: 'bg-red-100 text-red-800',
  optional: 'bg-blue-100 text-blue-800',
  certification: 'bg-green-100 text-green-800'
};

const statusColors = {
  upcoming: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800'
};

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'programs' | 'records'>('programs');
  const [trainingPrograms, setTrainingPrograms] = useState(mockTrainingPrograms);
  const [trainingRecords, setTrainingRecords] = useState(mockTrainingRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<TrainingRecord | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredRecords = trainingRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.programTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewProgram = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setSelectedRecord(null);
    setShowModal(true);
  };

  const handleViewRecord = (record: TrainingRecord) => {
    setSelectedRecord(record);
    setSelectedProgram(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Management</h1>
          <p className="text-gray-600">Manage training programs and track personnel training records</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Program
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AcademicCapIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Programs</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainingPrograms.filter(program => program.status === 'upcoming' || program.status === 'ongoing').length}
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
              <p className="text-sm font-medium text-gray-600">Completed Records</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainingRecords.filter(record => record.status === 'completed').length}
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
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainingRecords.filter(record => record.status === 'in_progress').length}
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
              <p className="text-sm font-medium text-gray-600">Expired/Failed</p>
              <p className="text-2xl font-bold text-gray-900">
                {trainingRecords.filter(record => record.status === 'expired' || record.status === 'failed').length}
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
              onClick={() => setActiveTab('programs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'programs'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Training Programs
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'records'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Training Records
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
                  placeholder={`Search ${activeTab === 'programs' ? 'training programs' : 'training records'}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {activeTab === 'programs' && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="safety">Safety</option>
                <option value="technical">Technical</option>
                <option value="compliance">Compliance</option>
                <option value="leadership">Leadership</option>
                <option value="environmental">Environmental</option>
              </select>
            )}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              {activeTab === 'programs' ? (
                <>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </>
              ) : (
                <>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="failed">Failed</option>
                  <option value="expired">Expired</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'programs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{program.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[program.category]}`}>
                          {program.category.toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[program.type]}`}>
                          {program.type.toUpperCase()}
                        </span>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[program.status]}`}>
                        {program.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{program.startDate} - {program.endDate}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 mr-2" />
                      <span>{program.enrolled}/{program.capacity} enrolled</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Instructor: {program.instructor}
                    </div>
                    <button
                      onClick={() => handleViewProgram(program)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
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
                        <div className="text-sm text-gray-900">{record.programTitle}</div>
                        <div className="text-sm text-gray-500">{record.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.completionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{record.score}%</span>
                          {record.score >= 80 && <TrophyIcon className="h-4 w-4 text-yellow-500 ml-1" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                          {record.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.expiryDate}
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
                            <DocumentTextIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && (selectedProgram || selectedRecord) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedProgram ? 'Training Program Details' : 'Training Record Details'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {selectedProgram && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedProgram.title}</h4>
                    <p className="text-gray-600">{selectedProgram.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Category</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[selectedProgram.category]}`}>
                        {selectedProgram.category.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedProgram.type]}`}>
                        {selectedProgram.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration</p>
                      <p className="text-sm text-gray-900">{selectedProgram.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Instructor</p>
                      <p className="text-sm text-gray-900">{selectedProgram.instructor}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Start Date</p>
                      <p className="text-sm text-gray-900">{selectedProgram.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">End Date</p>
                      <p className="text-sm text-gray-900">{selectedProgram.endDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-sm text-gray-900">{selectedProgram.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Capacity</p>
                      <p className="text-sm text-gray-900">{selectedProgram.capacity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Enrolled</p>
                      <p className="text-sm text-gray-900">{selectedProgram.enrolled}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Prerequisites</p>
                    <ul className="text-sm text-gray-900 list-disc list-inside">
                      {selectedProgram.prerequisites.map((prereq, index) => (
                        <li key={index}>{prereq}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Materials</p>
                    <ul className="text-sm text-gray-900 list-disc list-inside">
                      {selectedProgram.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
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
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Program Title</p>
                    <p className="text-sm text-gray-900">{selectedRecord.programTitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Category</p>
                      <p className="text-sm text-gray-900">{selectedRecord.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Score</p>
                      <p className="text-sm text-gray-900">{selectedRecord.score}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Completion Date</p>
                      <p className="text-sm text-gray-900">{selectedRecord.completionDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Expiry Date</p>
                      <p className="text-sm text-gray-900">{selectedRecord.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Certificate Number</p>
                      <p className="text-sm text-gray-900">{selectedRecord.certificateNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Instructor</p>
                      <p className="text-sm text-gray-900">{selectedRecord.instructor}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedRecord.status]}`}>
                      {selectedRecord.status.replace('_', ' ').toUpperCase()}
                    </span>
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
                  {selectedProgram ? 'Enroll' : 'Download Certificate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}