'use client';

import { useState } from 'react';
import {
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface AnalyticsData {
  totalEmployees: number;
  newHires: number;
  turnoverRate: number;
  trainingCompletion: number;
  safetyScore: number;
  complianceRate: number;
  averagePerformance: number;
  activeRecruitment: number;
}

interface TrendData {
  month: string;
  employees: number;
  hires: number;
  departures: number;
  training: number;
  safety: number;
}

interface DepartmentData {
  name: string;
  employees: number;
  performance: number;
  training: number;
  safety: number;
  compliance: number;
}

interface TrainingData {
  category: string;
  completed: number;
  inProgress: number;
  pending: number;
  total: number;
}

interface SafetyData {
  month: string;
  incidents: number;
  nearMisses: number;
  safetyScore: number;
}

const mockAnalytics: AnalyticsData = {
  totalEmployees: 1247,
  newHires: 23,
  turnoverRate: 2.1,
  trainingCompletion: 89,
  safetyScore: 96,
  complianceRate: 98.5,
  averagePerformance: 4.2,
  activeRecruitment: 15
};

const mockTrendData: TrendData[] = [
  { month: 'Jan', employees: 1180, hires: 15, departures: 8, training: 85, safety: 94 },
  { month: 'Feb', employees: 1195, hires: 18, departures: 3, training: 87, safety: 95 },
  { month: 'Mar', employees: 1210, hires: 22, departures: 7, training: 88, safety: 96 },
  { month: 'Apr', employees: 1225, hires: 20, departures: 5, training: 89, safety: 95 },
  { month: 'May', employees: 1235, hires: 16, departures: 6, training: 90, safety: 97 },
  { month: 'Jun', employees: 1247, hires: 23, departures: 11, training: 89, safety: 96 }
];

const mockDepartmentData: DepartmentData[] = [
  { name: 'Engineering', employees: 245, performance: 4.3, training: 92, safety: 98, compliance: 99 },
  { name: 'Operations', employees: 189, performance: 4.1, training: 87, safety: 95, compliance: 97 },
  { name: 'Finance', employees: 67, performance: 4.4, training: 94, safety: 99, compliance: 100 },
  { name: 'HR', employees: 34, performance: 4.2, training: 96, safety: 98, compliance: 99 },
  { name: 'Legal', employees: 23, performance: 4.5, training: 91, safety: 97, compliance: 100 },
  { name: 'IT', employees: 45, performance: 4.3, training: 93, safety: 96, compliance: 98 },
  { name: 'Procurement', employees: 28, performance: 4.0, training: 85, safety: 94, compliance: 96 },
  { name: 'Security', employees: 56, performance: 4.1, training: 88, safety: 97, compliance: 98 }
];

const mockTrainingData: TrainingData[] = [
  { category: 'Safety Training', completed: 1156, inProgress: 67, pending: 24, total: 1247 },
  { category: 'Technical Skills', completed: 892, inProgress: 234, pending: 121, total: 1247 },
  { category: 'Compliance', completed: 1198, inProgress: 34, pending: 15, total: 1247 },
  { category: 'Leadership', completed: 156, inProgress: 45, pending: 23, total: 224 },
  { category: 'Soft Skills', completed: 678, inProgress: 189, pending: 89, total: 956 }
];

const mockSafetyData: SafetyData[] = [
  { month: 'Jan', incidents: 3, nearMisses: 8, safetyScore: 94 },
  { month: 'Feb', incidents: 2, nearMisses: 6, safetyScore: 95 },
  { month: 'Mar', incidents: 4, nearMisses: 9, safetyScore: 93 },
  { month: 'Apr', incidents: 1, nearMisses: 5, safetyScore: 97 },
  { month: 'May', incidents: 2, nearMisses: 7, safetyScore: 96 },
  { month: 'Jun', incidents: 2, nearMisses: 4, safetyScore: 96 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function PersonnelAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  const getPerformanceColor = (score: number) => {
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    if (current < previous) return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    return <MinusIcon className="h-4 w-4 text-gray-500" />;
  };

  const getCompletionRate = (training: TrainingData) => {
    return Math.round((training.completed / training.total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personnel Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into personnel performance and metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <DocumentArrowDownIcon className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.totalEmployees.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(mockAnalytics.totalEmployees, 1235)}
                <span className="text-sm text-green-600 ml-1">+1.0% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Hires</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.newHires}</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(mockAnalytics.newHires, 16)}
                <span className="text-sm text-green-600 ml-1">+43.8% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Turnover Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.turnoverRate}%</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(2.5, mockAnalytics.turnoverRate)}
                <span className="text-sm text-green-600 ml-1">-0.4% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Training Completion</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.trainingCompletion}%</p>
              <div className="flex items-center mt-2">
                {getTrendIcon(mockAnalytics.trainingCompletion, 87)}
                <span className="text-sm text-green-600 ml-1">+2.3% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <AcademicCapIcon className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Safety Score</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.safetyScore}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ShieldCheckIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.complianceRate}%</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.averagePerformance}/5</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Recruitment</p>
              <p className="text-2xl font-bold text-gray-900">{mockAnalytics.activeRecruitment}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: ChartBarIcon },
              { id: 'departments', name: 'Departments', icon: UserGroupIcon },
              { id: 'training', name: 'Training', icon: AcademicCapIcon },
              { id: 'safety', name: 'Safety', icon: ShieldCheckIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Employee Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Employee Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="employees" stroke="#3B82F6" strokeWidth={2} name="Total Employees" />
                      <Line type="monotone" dataKey="hires" stroke="#10B981" strokeWidth={2} name="New Hires" />
                      <Line type="monotone" dataKey="departures" stroke="#EF4444" strokeWidth={2} name="Departures" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="training" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" name="Training %" />
                      <Area type="monotone" dataKey="safety" stackId="2" stroke="#10B981" fill="#10B981" name="Safety %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Department Performance</h3>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {mockDepartmentData.map(dept => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safety %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockDepartmentData.map((dept) => (
                      <tr key={dept.name} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dept.employees}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`font-medium ${getPerformanceColor(dept.performance)}`}>
                            {dept.performance}/5
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dept.training}%` }}></div>
                            </div>
                            <span>{dept.training}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${dept.safety}%` }}></div>
                            </div>
                            <span>{dept.safety}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${dept.compliance}%` }}></div>
                            </div>
                            <span>{dept.compliance}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Training Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Training Completion by Category</h4>
                  <div className="space-y-4">
                    {mockTrainingData.map((training, index) => (
                      <div key={training.category} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-900">{training.category}</span>
                          <span className="text-sm text-gray-600">{getCompletionRate(training)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${getCompletionRate(training)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Completed: {training.completed}</span>
                          <span>In Progress: {training.inProgress}</span>
                          <span>Pending: {training.pending}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Training Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockTrainingData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, value }) => `${category}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="completed"
                      >
                        {mockTrainingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Safety Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Safety Incidents Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockSafetyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="incidents" fill="#EF4444" name="Incidents" />
                      <Bar dataKey="nearMisses" fill="#F59E0B" name="Near Misses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Safety Score Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockSafetyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[90, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="safetyScore" stroke="#10B981" strokeWidth={3} name="Safety Score %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-md font-medium text-gray-900 mb-4">Safety Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">
                      {mockSafetyData.reduce((sum, data) => sum + data.incidents, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Incidents (6 months)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">
                      {mockSafetyData.reduce((sum, data) => sum + data.nearMisses, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Near Misses (6 months)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {Math.round(mockSafetyData.reduce((sum, data) => sum + data.safetyScore, 0) / mockSafetyData.length)}%
                    </p>
                    <p className="text-sm text-gray-600">Average Safety Score</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}