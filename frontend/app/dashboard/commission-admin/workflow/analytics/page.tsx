'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ChartBarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CalendarIcon,
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

interface WorkflowMetrics {
  totalApplications: number;
  completedApplications: number;
  pendingApplications: number;
  averageProcessingTime: number;
  bottleneckStage: string;
  efficiency: number;
  userProductivity: {
    userId: string;
    userName: string;
    tasksCompleted: number;
    averageTime: number;
  }[];
}

interface StageAnalytics {
  stage: string;
  averageTime: number;
  completionRate: number;
  bottleneckScore: number;
  applications: number;
}

const WorkflowAnalyticsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [metrics, setMetrics] = useState<WorkflowMetrics | null>(null);
  const [stageAnalytics, setStageAnalytics] = useState<StageAnalytics[]>([]);
  const [timeRange, setTimeRange] = useState<string>('30days');
  const [selectedMetric, setSelectedMetric] = useState<string>('processing_time');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock workflow analytics data
    const mockMetrics: WorkflowMetrics = {
      totalApplications: 245,
      completedApplications: 189,
      pendingApplications: 56,
      averageProcessingTime: 14.5,
      bottleneckStage: 'Technical Review',
      efficiency: 77.1,
      userProductivity: [
        { userId: 'USR-001', userName: 'Eng. Akosua Mensah', tasksCompleted: 45, averageTime: 2.3 },
        { userId: 'USR-002', userName: 'Mr. Joseph Osei', tasksCompleted: 38, averageTime: 3.1 },
        { userId: 'USR-003', userName: 'Dr. Kwame Asante', tasksCompleted: 42, averageTime: 2.8 },
        { userId: 'USR-004', userName: 'Ms. Ama Serwaa', tasksCompleted: 35, averageTime: 3.5 },
        { userId: 'USR-005', userName: 'Eng. Kofi Adjei', tasksCompleted: 29, averageTime: 4.2 }
      ]
    };

    const mockStageAnalytics: StageAnalytics[] = [
      {
        stage: 'Initial Review',
        averageTime: 2.1,
        completionRate: 95.2,
        bottleneckScore: 15,
        applications: 245
      },
      {
        stage: 'Document Verification',
        averageTime: 3.8,
        completionRate: 88.7,
        bottleneckScore: 35,
        applications: 233
      },
      {
        stage: 'Technical Review',
        averageTime: 6.2,
        completionRate: 72.4,
        bottleneckScore: 85,
        applications: 207
      },
      {
        stage: 'Financial Assessment',
        averageTime: 4.5,
        completionRate: 81.3,
        bottleneckScore: 45,
        applications: 150
      },
      {
        stage: 'Environmental Review',
        averageTime: 5.1,
        completionRate: 76.8,
        bottleneckScore: 65,
        applications: 122
      },
      {
        stage: 'Final Approval',
        averageTime: 1.8,
        completionRate: 98.1,
        bottleneckScore: 8,
        applications: 94
      }
    ];

    setTimeout(() => {
      setMetrics(mockMetrics);
      setStageAnalytics(mockStageAnalytics);
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  // Mock time series data for charts
  const processingTimeData = [
    { date: '2024-01-01', avgTime: 16.2, applications: 12 },
    { date: '2024-01-08', avgTime: 15.8, applications: 18 },
    { date: '2024-01-15', avgTime: 14.9, applications: 22 },
    { date: '2024-01-22', avgTime: 13.7, applications: 25 },
    { date: '2024-01-29', avgTime: 14.5, applications: 28 }
  ];

  const stageDistributionData = stageAnalytics.map(stage => ({
    name: stage.stage,
    value: stage.applications,
    time: stage.averageTime
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-GH', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/workflow/analytics')}
          userRole="Commission Admin"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/workflow/analytics')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Analytics</h1>
            <p className="text-gray-600">Analyze workflow performance and identify optimization opportunities</p>
          </div>

          {/* Time Range Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics?.totalApplications}</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12.5%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics ? Math.round((metrics.completedApplications / metrics.totalApplications) * 100) : 0}%
                  </p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+3.2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics?.averageProcessingTime} days</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingDownIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">-8.3%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics?.efficiency}%</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Processing Time Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Time Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => formatDate(value)}
                    formatter={(value, name) => [
                      name === 'avgTime' ? `${value} days` : value,
                      name === 'avgTime' ? 'Avg Time' : 'Applications'
                    ]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Average Time (days)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="Applications"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Stage Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Applications by Stage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stageDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stageDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stage Performance Analysis */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Stage Performance Analysis</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stageAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="stage" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'averageTime') return [`${value} days`, 'Average Time'];
                      if (name === 'completionRate') return [`${value}%`, 'Completion Rate'];
                      if (name === 'bottleneckScore') return [value, 'Bottleneck Score'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="averageTime" 
                    fill="#8884d8" 
                    name="Average Time (days)"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="completionRate" 
                    fill="#82ca9d" 
                    name="Completion Rate (%)"
                  />
                  <Bar 
                    yAxisId="left"
                    dataKey="bottleneckScore" 
                    fill="#ffc658" 
                    name="Bottleneck Score"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Productivity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">User Productivity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {metrics?.userProductivity.map((user, index) => (
                    <div key={user.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <UserGroupIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.userName}</p>
                          <p className="text-xs text-gray-500">{user.tasksCompleted} tasks completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{user.averageTime} days</p>
                        <p className="text-xs text-gray-500">avg time</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottleneck Analysis */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Bottleneck Analysis</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Primary Bottleneck</span>
                    <span className="text-sm font-bold text-red-600">{metrics?.bottleneckStage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {stageAnalytics
                    .sort((a, b) => b.bottleneckScore - a.bottleneckScore)
                    .slice(0, 5)
                    .map((stage, index) => (
                    <div key={stage.stage} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-orange-500' :
                          index === 2 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <span className="text-sm text-gray-700">{stage.stage}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">{stage.bottleneckScore}</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${
                              index === 0 ? 'bg-red-500' :
                              index === 1 ? 'bg-orange-500' :
                              index === 2 ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${stage.bottleneckScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAnalyticsPage;