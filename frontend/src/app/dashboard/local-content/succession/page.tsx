'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserGroupIcon,
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
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface SuccessionPlan {
  id: string;
  positionTitle: string;
  companyName: string;
  department: string;
  currentHolder: string;
  successor: string;
  readinessLevel: 'ready' | 'developing' | 'identified' | 'not_ready';
  riskLevel: 'high' | 'medium' | 'low';
  targetDate: string;
  developmentPlan: string;
  completionRate: number;
  mentorAssigned: string;
  skillsGap: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  lastReviewed: string;
}

const mockPlans: SuccessionPlan[] = [
  {
    id: 'SUC001',
    positionTitle: 'Operations Manager',
    companyName: 'Shell Nigeria Exploration',
    department: 'Operations',
    currentHolder: 'John Smith (Expatriate)',
    successor: 'Adebayo Ogundimu',
    readinessLevel: 'developing',
    riskLevel: 'high',
    targetDate: '2024-06-30',
    developmentPlan: 'Leadership training, technical certification, mentorship program',
    completionRate: 65,
    mentorAssigned: 'Dr. Sarah Johnson',
    skillsGap: ['Strategic Planning', 'Budget Management', 'Team Leadership'],
    priority: 'critical',
    status: 'active',
    lastReviewed: '2024-01-15'
  },
  {
    id: 'SUC002',
    positionTitle: 'Chief Engineer',
    companyName: 'TotalEnergies Nigeria',
    department: 'Engineering',
    currentHolder: 'Pierre Dubois (Expatriate)',
    successor: 'Fatima Abdullahi',
    readinessLevel: 'ready',
    riskLevel: 'low',
    targetDate: '2024-03-31',
    developmentPlan: 'Advanced engineering certification, project management',
    completionRate: 92,
    mentorAssigned: 'Eng. Michael Chen',
    skillsGap: ['Advanced Project Management'],
    priority: 'high',
    status: 'active',
    lastReviewed: '2024-01-20'
  },
  {
    id: 'SUC003',
    positionTitle: 'Finance Director',
    companyName: 'Chevron Nigeria Limited',
    department: 'Finance',
    currentHolder: 'Robert Wilson (Expatriate)',
    successor: 'Chidi Okafor',
    readinessLevel: 'identified',
    riskLevel: 'medium',
    targetDate: '2024-12-31',
    developmentPlan: 'MBA completion, international finance exposure, leadership development',
    completionRate: 35,
    mentorAssigned: 'Mrs. Linda Thompson',
    skillsGap: ['International Finance', 'Strategic Financial Planning', 'Risk Management'],
    priority: 'medium',
    status: 'active',
    lastReviewed: '2024-01-10'
  }
];

const readinessColors = {
  ready: 'bg-green-100 text-green-800',
  developing: 'bg-yellow-100 text-yellow-800',
  identified: 'bg-blue-100 text-blue-800',
  not_ready: 'bg-red-100 text-red-800'
};

const riskColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const priorityColors = {
  critical: 'text-red-600',
  high: 'text-orange-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  on_hold: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function LocalContentSuccessionPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [readinessFilter, setReadinessFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState<SuccessionPlan | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredPlans = mockPlans.filter(plan => {
    const matchesSearch = plan.positionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.successor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReadiness = readinessFilter === 'all' || plan.readinessLevel === readinessFilter;
    const matchesRisk = riskFilter === 'all' || plan.riskLevel === riskFilter;
    
    return matchesSearch && matchesReadiness && matchesRisk;
  });

  const handleViewDetails = (plan: SuccessionPlan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
  };

  const totalPlans = mockPlans.length;
  const readySuccessors = mockPlans.filter(plan => plan.readinessLevel === 'ready').length;
  const highRiskPositions = mockPlans.filter(plan => plan.riskLevel === 'high').length;
  const avgCompletionRate = mockPlans.reduce((sum, plan) => sum + plan.completionRate, 0) / mockPlans.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Succession Planning</h1>
          <p className="text-gray-600">Manage local content succession plans and leadership development</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Succession Plan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UserGroupIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Plans</p>
              <p className="text-2xl font-bold text-gray-900">{totalPlans}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ready Successors</p>
              <p className="text-2xl font-bold text-gray-900">{readySuccessors}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Risk Positions</p>
              <p className="text-2xl font-bold text-gray-900">{highRiskPositions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Progress</p>
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
                placeholder="Search succession plans..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
            >
              <option value="all">All Readiness Levels</option>
              <option value="ready">Ready</option>
              <option value="developing">Developing</option>
              <option value="identified">Identified</option>
              <option value="not_ready">Not Ready</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Succession Plans Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current & Successor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Readiness
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.map((plan) => {
                return (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{plan.positionTitle}</div>
                        <div className="text-sm text-gray-500">{plan.companyName}</div>
                        <div className="text-xs text-gray-400">{plan.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">Current:</span> {plan.currentHolder}
                        </div>
                        <div className="text-sm text-gray-900">
                          <span className="font-medium">Successor:</span> {plan.successor}
                        </div>
                        <div className="text-xs text-gray-500">Mentor: {plan.mentorAssigned}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${readinessColors[plan.readinessLevel]}`}>
                        {plan.readinessLevel.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColors[plan.riskLevel]}`}>
                        {plan.riskLevel.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{plan.completionRate}%</div>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${plan.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{plan.targetDate}</div>
                      <div className={`text-xs font-medium ${priorityColors[plan.priority]}`}>
                        {plan.priority.toUpperCase()} PRIORITY
                      </div>
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
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Succession Plan Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700">Plan ID</label>
                    <p className="text-sm text-gray-900">{selectedPlan.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Reviewed</label>
                    <p className="text-sm text-gray-900">{selectedPlan.lastReviewed}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position Title</label>
                    <p className="text-sm text-gray-900">{selectedPlan.positionTitle}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <p className="text-sm text-gray-900">{selectedPlan.department}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="text-sm text-gray-900">{selectedPlan.companyName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Position Holder</label>
                    <p className="text-sm text-gray-900">{selectedPlan.currentHolder}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Identified Successor</label>
                    <p className="text-sm text-gray-900">{selectedPlan.successor}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Readiness Level</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${readinessColors[selectedPlan.readinessLevel]}`}>
                      {selectedPlan.readinessLevel.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${riskColors[selectedPlan.riskLevel]}`}>
                      {selectedPlan.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`text-sm font-medium ${priorityColors[selectedPlan.priority]}`}>
                      {selectedPlan.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target Date</label>
                    <p className="text-sm text-gray-900">{selectedPlan.targetDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned Mentor</label>
                    <p className="text-sm text-gray-900">{selectedPlan.mentorAssigned}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Development Plan</label>
                  <p className="text-sm text-gray-900">{selectedPlan.developmentPlan}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skills Gap Analysis</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedPlan.skillsGap.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Completion Progress</label>
                  <div className="flex items-center mt-1">
                    <div className="text-sm font-medium text-gray-900 mr-3">{selectedPlan.completionRate}%</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full" 
                        style={{ width: `${selectedPlan.completionRate}%` }}
                      ></div>
                    </div>
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
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Update Progress
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