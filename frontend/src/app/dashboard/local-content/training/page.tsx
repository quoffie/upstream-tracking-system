'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AcademicCapIcon,
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
  UserGroupIcon,
  CurrencyDollarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

interface TrainingProgram {
  id: string;
  programName: string;
  companyName: string;
  category: 'technical' | 'management' | 'safety' | 'leadership' | 'digital';
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  participants: number;
  budget: number;
  localTrainers: number;
  internationalTrainers: number;
  completionRate: number;
  coordinator: string;
  location: string;
  priority: 'high' | 'medium' | 'low';
}

const mockPrograms: TrainingProgram[] = [
  {
    id: 'TRN001',
    programName: 'Advanced Drilling Technology',
    companyName: 'Shell Nigeria Exploration',
    category: 'technical',
    status: 'ongoing',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    participants: 25,
    budget: 850000,
    localTrainers: 3,
    internationalTrainers: 2,
    completionRate: 65,
    coordinator: 'Eng. Adebayo Johnson',
    location: 'Lagos Training Center',
    priority: 'high'
  },
  {
    id: 'TRN002',
    programName: 'Leadership Development Program',
    companyName: 'TotalEnergies Nigeria',
    category: 'leadership',
    status: 'completed',
    startDate: '2023-11-01',
    endDate: '2024-01-31',
    participants: 18,
    budget: 650000,
    localTrainers: 2,
    internationalTrainers: 1,
    completionRate: 94,
    coordinator: 'Dr. Fatima Abdullahi',
    location: 'Abuja Leadership Institute',
    priority: 'high'
  },
  {
    id: 'TRN003',
    programName: 'Digital Transformation in Oil & Gas',
    companyName: 'Chevron Nigeria Limited',
    category: 'digital',
    status: 'planned',
    startDate: '2024-03-01',
    endDate: '2024-05-30',
    participants: 30,
    budget: 1200000,
    localTrainers: 4,
    internationalTrainers: 3,
    completionRate: 0,
    coordinator: 'Mr. Chidi Okafor',
    location: 'Port Harcourt Tech Hub',
    priority: 'medium'
  }
];

const statusColors = {
  planned: 'bg-blue-100 text-blue-800',
  ongoing: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusIcons = {
  planned: ClockIcon,
  ongoing: ExclamationTriangleIcon,
  completed: CheckCircleIcon,
  cancelled: ExclamationTriangleIcon
};

const categoryColors = {
  technical: 'bg-purple-100 text-purple-800',
  management: 'bg-blue-100 text-blue-800',
  safety: 'bg-red-100 text-red-800',
  leadership: 'bg-green-100 text-green-800',
  digital: 'bg-indigo-100 text-indigo-800'
};

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
};

export default function LocalContentTrainingPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewDetails = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setShowDetails(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalBudget = mockPrograms.reduce((sum, program) => sum + program.budget, 0);
  const totalParticipants = mockPrograms.reduce((sum, program) => sum + program.participants, 0);
  const avgCompletionRate = mockPrograms.reduce((sum, program) => sum + program.completionRate, 0) / mockPrograms.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Programs</h1>
          <p className="text-gray-600">Manage local content training and capacity building programs</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Training Program
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Programs</p>
              <p className="text-2xl font-bold text-gray-900">{mockPrograms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">{totalParticipants}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrophyIcon className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Completion</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(avgCompletionRate)}%</p>
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
                placeholder="Search training programs..."
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
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="management">Management</option>
              <option value="safety">Safety</option>
              <option value="leadership">Leadership</option>
              <option value="digital">Digital</option>
            </select>
          </div>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.map((program) => {
                const StatusIcon = statusIcons[program.status];
                return (
                  <tr key={program.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{program.programName}</div>
                        <div className="text-sm text-gray-500">{program.companyName}</div>
                        <div className="text-xs text-gray-400">{program.startDate} - {program.endDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[program.category]}`}>
                        {program.category.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[program.status]}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {program.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{program.participants}</div>
                      <div className="text-xs text-gray-500">
                        Local: {program.localTrainers} | Intl: {program.internationalTrainers}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(program.budget)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{program.completionRate}%</div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${program.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(program)}
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

      {/* Program Details Modal */}
      {showDetails && selectedProgram && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Training Program Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700">Program ID</label>
                    <p className="text-sm text-gray-900">{selectedProgram.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="text-sm text-gray-900">{selectedProgram.companyName}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Program Name</label>
                  <p className="text-sm text-gray-900">{selectedProgram.programName}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedProgram.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Participants</label>
                    <p className="text-sm text-gray-900">{selectedProgram.participants}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Budget</label>
                    <p className="text-sm text-gray-900">{formatCurrency(selectedProgram.budget)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <p className="text-sm text-gray-900">{selectedProgram.startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <p className="text-sm text-gray-900">{selectedProgram.endDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Coordinator</label>
                    <p className="text-sm text-gray-900">{selectedProgram.coordinator}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm text-gray-900">{selectedProgram.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Local Trainers</label>
                    <p className="text-sm text-gray-900">{selectedProgram.localTrainers}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">International Trainers</label>
                    <p className="text-sm text-gray-900">{selectedProgram.internationalTrainers}</p>
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
                  Edit Program
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}