'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  DocumentChartBarIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon
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

const performanceData = [
  { month: 'Jan', applications: 45, approvals: 38, rejections: 7, processing_time: 12 },
  { month: 'Feb', applications: 52, approvals: 44, rejections: 8, processing_time: 11 },
  { month: 'Mar', applications: 48, approvals: 41, rejections: 7, processing_time: 10 },
  { month: 'Apr', applications: 61, approvals: 53, rejections: 8, processing_time: 9 },
  { month: 'May', applications: 55, approvals: 48, rejections: 7, processing_time: 8 },
  { month: 'Jun', applications: 67, approvals: 59, rejections: 8, processing_time: 7 }
];

const complianceData = [
  { category: 'Local Content', score: 85, target: 90, trend: 'up' },
  { category: 'Safety Standards', score: 92, target: 95, trend: 'up' },
  { category: 'Environmental', score: 78, target: 85, trend: 'down' },
  { category: 'Financial Reporting', score: 96, target: 95, trend: 'up' },
  { category: 'Personnel Training', score: 88, target: 90, trend: 'stable' }
];

const departmentPerformance = [
  { name: 'HR', efficiency: 94, satisfaction: 89, compliance: 92 },
  { name: 'Operations', efficiency: 87, satisfaction: 85, compliance: 88 },
  { name: 'Finance', efficiency: 96, satisfaction: 91, compliance: 95 },
  { name: 'Safety', efficiency: 89, satisfaction: 87, compliance: 94 },
  { name: 'Legal', efficiency: 92, satisfaction: 88, compliance: 97 }
];

const costAnalysis = [
  { month: 'Jan', permits: 15000, compliance: 8000, training: 5000, other: 3000 },
  { month: 'Feb', permits: 18000, compliance: 9000, training: 5500, other: 3200 },
  { month: 'Mar', permits: 16000, compliance: 8500, training: 6000, other: 2800 },
  { month: 'Apr', permits: 22000, compliance: 10000, training: 6500, other: 3500 },
  { month: 'May', permits: 19000, compliance: 9500, training: 7000, other: 3000 },
  { month: 'Jun', permits: 25000, compliance: 11000, training: 7500, other: 4000 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function PerformanceAnalyticsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  const kpiData = [
    {
      title: 'Application Success Rate',
      value: '87.2%',
      change: '+2.4%',
      trend: 'up',
      description: 'Percentage of approved applications'
    },
    {
      title: 'Average Processing Time',
      value: '8.5 days',
      change: '-1.2 days',
      trend: 'up',
      description: 'Average time to process applications'
    },
    {
      title: 'Compliance Score',
      value: '89.8%',
      change: '+1.8%',
      trend: 'up',
      description: 'Overall compliance rating'
    },
    {
      title: 'Cost Efficiency',
      value: 'GH₵47.5K',
      change: '-5.2%',
      trend: 'up',
      description: 'Monthly operational costs'
    }
  ];

  const exportReport = () => {
    // Simulate report export
    const reportData = {
      period: selectedPeriod,
      generated: new Date().toISOString(),
      kpis: kpiData,
      performance: performanceData,
      compliance: complianceData
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
                <p className="text-gray-600 mt-1">Comprehensive performance metrics and insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              
              <button
                onClick={exportReport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{kpi.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Application Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Application Trends</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="applications">Applications</option>
                <option value="approvals">Approvals</option>
                <option value="rejections">Rejections</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Processing Time Trend */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Time Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} days`, 'Processing Time']} />
                  <Line 
                    type="monotone" 
                    dataKey="processing_time" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Compliance & Department Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Compliance Scores */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Scores</h3>
            <div className="space-y-4">
              {complianceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{item.score}%</span>
                        <div className={`flex items-center text-xs ${
                          item.trend === 'up' ? 'text-green-600' : 
                          item.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {item.trend === 'up' && <ArrowTrendingUpIcon className="h-3 w-3" />}
                          {item.trend === 'down' && <ArrowTrendingDownIcon className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.score >= item.target ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Target: {item.target}%</span>
                      <span className={item.score >= item.target ? 'text-green-600' : 'text-yellow-600'}>
                        {item.score >= item.target ? 'On Target' : 'Below Target'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Department Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="efficiency" fill="#3B82F6" name="Efficiency" />
                  <Bar dataKey="satisfaction" fill="#10B981" name="Satisfaction" />
                  <Bar dataKey="compliance" fill="#F59E0B" name="Compliance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`GH₵${value.toLocaleString()}`, '']} />
                <Legend />
                <Bar dataKey="permits" stackId="a" fill="#3B82F6" name="Permits" />
                <Bar dataKey="compliance" stackId="a" fill="#10B981" name="Compliance" />
                <Bar dataKey="training" stackId="a" fill="#F59E0B" name="Training" />
                <Bar dataKey="other" stackId="a" fill="#EF4444" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center mb-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-900">Positive Trends</h4>
              </div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Processing time reduced by 30%</li>
                <li>• Approval rate increased to 87.2%</li>
                <li>• Compliance scores improving</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center mb-2">
                <CalendarDaysIcon className="h-5 w-5 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">Areas for Improvement</h4>
              </div>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Environmental compliance below target</li>
                <li>• Operations department efficiency</li>
                <li>• Training completion rates</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center mb-2">
                <DocumentChartBarIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Recommendations</h4>
              </div>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Implement automated workflows</li>
                <li>• Increase training frequency</li>
                <li>• Review environmental policies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}