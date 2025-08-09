'use client';

import React, { useState } from 'react';
import { 
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PlusIcon,
  ShareIcon,
  PrinterIcon,
  ArrowPathIcon,
  ChartPieIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for company analytics
const companyOverview = {
  totalEmployees: 2847,
  activeProjects: 156,
  totalRevenue: 'GH₵45.2M',
  complianceScore: 94.2,
  monthlyGrowth: 8.5,
  departmentCount: 12,
  avgProjectValue: 'GH₵290K',
  completionRate: 87.3
};

const performanceMetrics = [
  { month: 'Jul', revenue: 3.2, projects: 12, employees: 2650, compliance: 92.1 },
  { month: 'Aug', revenue: 3.8, projects: 14, employees: 2720, compliance: 93.4 },
  { month: 'Sep', revenue: 4.1, projects: 16, employees: 2780, compliance: 94.2 },
  { month: 'Oct', revenue: 4.5, projects: 18, employees: 2820, compliance: 94.8 },
  { month: 'Nov', revenue: 4.2, projects: 15, employees: 2835, compliance: 93.9 },
  { month: 'Dec', revenue: 4.8, projects: 19, employees: 2847, compliance: 94.2 }
];

const departmentAnalysis = [
  { department: 'Engineering', employees: 856, budget: 12.5, projects: 45, efficiency: 92.3 },
  { department: 'Operations', employees: 634, budget: 8.9, projects: 32, efficiency: 89.7 },
  { department: 'Finance', employees: 124, budget: 3.2, projects: 8, efficiency: 95.1 },
  { department: 'HR', employees: 89, budget: 2.1, projects: 12, efficiency: 88.4 },
  { department: 'Legal', employees: 67, budget: 1.8, projects: 6, efficiency: 91.2 },
  { department: 'IT', employees: 156, budget: 4.3, projects: 18, efficiency: 93.8 },
  { department: 'Marketing', employees: 78, budget: 2.4, projects: 9, efficiency: 87.6 },
  { department: 'Procurement', employees: 145, budget: 3.8, projects: 15, efficiency: 90.5 },
  { department: 'Quality', employees: 98, budget: 2.6, projects: 11, efficiency: 94.2 },
  { department: 'Safety', employees: 234, budget: 5.1, projects: 22, efficiency: 91.8 },
  { department: 'Training', employees: 112, budget: 2.9, projects: 14, efficiency: 89.3 },
  { department: 'Admin', employees: 254, budget: 4.6, projects: 16, efficiency: 86.9 }
];

const projectCategories = [
  { name: 'Infrastructure', value: 45, color: '#3B82F6' },
  { name: 'Technology', value: 28, color: '#10B981' },
  { name: 'Compliance', value: 18, color: '#F59E0B' },
  { name: 'Training', value: 12, color: '#EF4444' },
  { name: 'Research', value: 8, color: '#8B5CF6' }
];

const recentReports = [
  {
    id: 'rpt-ca-001',
    title: 'Q4 2023 Performance Review',
    type: 'Performance',
    generatedBy: 'System Admin',
    generatedAt: '2024-01-15 10:30',
    status: 'completed',
    size: '3.2 MB',
    downloads: 24
  },
  {
    id: 'rpt-ca-002',
    title: 'Department Budget Analysis',
    type: 'Financial',
    generatedBy: 'Finance Team',
    generatedAt: '2024-01-14 14:20',
    status: 'completed',
    size: '2.8 MB',
    downloads: 18
  },
  {
    id: 'rpt-ca-003',
    title: 'Employee Productivity Report',
    type: 'HR',
    generatedBy: 'HR Manager',
    generatedAt: '2024-01-13 16:45',
    status: 'processing',
    size: '-',
    downloads: 0
  },
  {
    id: 'rpt-ca-004',
    title: 'Project Completion Analysis',
    type: 'Operations',
    generatedBy: 'Operations Lead',
    generatedAt: '2024-01-12 11:15',
    status: 'completed',
    size: '4.1 MB',
    downloads: 31
  }
];

const kpiMetrics = [
  { name: 'Revenue Growth', current: 8.5, target: 10.0, unit: '%', trend: 'up' },
  { name: 'Project Success Rate', current: 87.3, target: 90.0, unit: '%', trend: 'up' },
  { name: 'Employee Satisfaction', current: 4.2, target: 4.5, unit: '/5', trend: 'stable' },
  { name: 'Cost Efficiency', current: 92.1, target: 95.0, unit: '%', trend: 'up' },
  { name: 'Compliance Score', current: 94.2, target: 95.0, unit: '%', trend: 'up' },
  { name: 'Training Completion', current: 78.4, target: 85.0, unit: '%', trend: 'down' }
];

const CompanyAnalyticsReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getKPIStatus = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 95) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 60) return 'warning';
    return 'critical';
  };

  const getKPIColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
              <p className="text-gray-600 mt-1">Comprehensive company performance analytics and reporting</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Report
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                <select 
                  value={selectedDepartment} 
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  {departmentAnalysis.map(dept => (
                    <option key={dept.department} value={dept.department.toLowerCase()}>
                      {dept.department}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: ChartBarIcon },
                { id: 'performance', name: 'Performance', icon: ArrowTrendingUpIcon },
                { id: 'departments', name: 'Departments', icon: BuildingOfficeIcon },
                { id: 'projects', name: 'Projects', icon: PresentationChartLineIcon },
                { id: 'reports', name: 'Reports', icon: DocumentTextIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Employees</p>
                    <p className="text-3xl font-bold text-gray-900">{companyOverview.totalEmployees.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <UserGroupIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{companyOverview.monthlyGrowth}% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-3xl font-bold text-gray-900">{companyOverview.activeProjects}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <PresentationChartLineIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium">{companyOverview.completionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{companyOverview.totalRevenue}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Project Value</span>
                    <span className="font-medium">{companyOverview.avgProjectValue}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                    <p className="text-3xl font-bold text-gray-900">{companyOverview.complianceScore}%</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <CheckCircleIcon className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${companyOverview.complianceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Metrics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {kpiMetrics.map((kpi, index) => {
                  const status = getKPIStatus(kpi.current, kpi.target);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                        <div className="flex items-center">
                          {getTrendIcon(kpi.trend)}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getKPIColor(status)}`}>
                            {status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Current: {kpi.current}{kpi.unit}</span>
                        <span>Target: {kpi.target}{kpi.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            status === 'excellent' ? 'bg-green-600' :
                            status === 'good' ? 'bg-blue-600' :
                            status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Projects Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} name="Revenue (GH₵M)" />
                      <Line yAxisId="right" type="monotone" dataKey="projects" stroke="#10B981" strokeWidth={2} name="Projects" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Growth & Compliance</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Area yAxisId="left" type="monotone" dataKey="employees" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Employees" />
                      <Line yAxisId="right" type="monotone" dataKey="compliance" stroke="#F59E0B" strokeWidth={2} name="Compliance (%)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget (GH₵M)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {departmentAnalysis.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{dept.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {dept.employees.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {dept.budget}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {dept.projects}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${dept.efficiency}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{dept.efficiency}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Categories</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Statistics</h3>
              <div className="space-y-4">
                {projectCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-600">{category.value} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {((category.value / projectCategories.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
              
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(report.status)}
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600">{report.type} • Generated by {report.generatedBy}</p>
                          <p className="text-xs text-gray-500">{report.generatedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm text-gray-600">
                          <p>{report.size}</p>
                          <p>{report.downloads} downloads</p>
                        </div>
                        {report.status === 'completed' && (
                          <div className="flex items-center space-x-1">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <ArrowDownTrayIcon className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <ShareIcon className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyAnalyticsReports;