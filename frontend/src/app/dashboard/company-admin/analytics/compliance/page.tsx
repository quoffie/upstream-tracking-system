'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ChartBarIcon,
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
  RadialBarChart,
  RadialBar
} from 'recharts';

const complianceOverview = {
  overall_score: 87.5,
  total_requirements: 156,
  compliant: 136,
  non_compliant: 12,
  pending: 8,
  last_audit: '2024-01-15',
  next_audit: '2024-04-15'
};

const complianceCategories = [
  {
    category: 'Local Content',
    score: 85,
    status: 'compliant',
    requirements: 24,
    compliant: 20,
    non_compliant: 3,
    pending: 1,
    trend: 'improving',
    last_review: '2024-01-10'
  },
  {
    category: 'Safety & Health',
    score: 92,
    status: 'compliant',
    requirements: 32,
    compliant: 29,
    non_compliant: 2,
    pending: 1,
    trend: 'stable',
    last_review: '2024-01-08'
  },
  {
    category: 'Environmental',
    score: 78,
    status: 'warning',
    requirements: 28,
    compliant: 22,
    non_compliant: 4,
    pending: 2,
    trend: 'declining',
    last_review: '2024-01-12'
  },
  {
    category: 'Financial Reporting',
    score: 96,
    status: 'compliant',
    requirements: 18,
    compliant: 17,
    non_compliant: 1,
    pending: 0,
    trend: 'improving',
    last_review: '2024-01-14'
  },
  {
    category: 'Personnel & Training',
    score: 88,
    status: 'compliant',
    requirements: 22,
    compliant: 19,
    non_compliant: 1,
    pending: 2,
    trend: 'stable',
    last_review: '2024-01-11'
  },
  {
    category: 'Data Protection',
    score: 94,
    status: 'compliant',
    requirements: 16,
    compliant: 15,
    non_compliant: 0,
    pending: 1,
    trend: 'improving',
    last_review: '2024-01-13'
  },
  {
    category: 'Operational Standards',
    score: 82,
    status: 'compliant',
    requirements: 16,
    compliant: 13,
    non_compliant: 1,
    pending: 2,
    trend: 'stable',
    last_review: '2024-01-09'
  }
];

const complianceTrends = [
  { month: 'Jul', score: 82, violations: 8, resolved: 15 },
  { month: 'Aug', score: 84, violations: 6, resolved: 12 },
  { month: 'Sep', score: 86, violations: 5, resolved: 10 },
  { month: 'Oct', score: 85, violations: 7, resolved: 14 },
  { month: 'Nov', score: 87, violations: 4, resolved: 11 },
  { month: 'Dec', score: 88, violations: 3, resolved: 8 }
];

const recentViolations = [
  {
    id: 'V001',
    category: 'Environmental',
    description: 'Waste disposal documentation incomplete',
    severity: 'medium',
    date: '2024-01-12',
    status: 'open',
    due_date: '2024-01-26',
    assigned_to: 'Environmental Team'
  },
  {
    id: 'V002',
    category: 'Safety & Health',
    description: 'Missing safety training records for 3 employees',
    severity: 'high',
    date: '2024-01-10',
    status: 'in_progress',
    due_date: '2024-01-24',
    assigned_to: 'HR Department'
  },
  {
    id: 'V003',
    category: 'Local Content',
    description: 'Quarterly local content report submission delay',
    severity: 'low',
    date: '2024-01-08',
    status: 'resolved',
    due_date: '2024-01-22',
    assigned_to: 'Compliance Team'
  },
  {
    id: 'V004',
    category: 'Financial Reporting',
    description: 'Audit trail documentation gaps identified',
    severity: 'medium',
    date: '2024-01-06',
    status: 'open',
    due_date: '2024-01-20',
    assigned_to: 'Finance Team'
  }
];

const upcomingDeadlines = [
  {
    requirement: 'Annual Safety Audit Report',
    category: 'Safety & Health',
    due_date: '2024-01-25',
    days_remaining: 10,
    status: 'pending',
    priority: 'high'
  },
  {
    requirement: 'Environmental Impact Assessment',
    category: 'Environmental',
    due_date: '2024-02-01',
    days_remaining: 17,
    status: 'in_progress',
    priority: 'medium'
  },
  {
    requirement: 'Local Content Quarterly Report',
    category: 'Local Content',
    due_date: '2024-02-15',
    days_remaining: 31,
    status: 'not_started',
    priority: 'medium'
  },
  {
    requirement: 'Personnel Training Certification',
    category: 'Personnel & Training',
    due_date: '2024-03-01',
    days_remaining: 45,
    status: 'in_progress',
    priority: 'low'
  }
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#6B7280'];
const SEVERITY_COLORS = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444'
};

export default function ComplianceAnalyticsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'non_compliant':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    return SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || '#6B7280';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { bg: 'bg-red-100', text: 'text-red-800', label: 'Open' },
      in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
      resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Resolved' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Pending' },
      not_started: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Not Started' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const exportComplianceReport = () => {
    const reportData = {
      overview: complianceOverview,
      categories: complianceCategories,
      violations: recentViolations,
      deadlines: upcomingDeadlines,
      generated: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
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
                <h1 className="text-3xl font-bold text-gray-900">Compliance Analytics</h1>
                <p className="text-gray-600 mt-1">Monitor compliance status and track regulatory requirements</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              
              <button
                onClick={exportComplianceReport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overall Score</p>
                <p className="text-2xl font-bold text-gray-900">{complianceOverview.overall_score}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Compliant</p>
                <p className="text-2xl font-bold text-gray-900">{complianceOverview.compliant}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
                <p className="text-2xl font-bold text-gray-900">{complianceOverview.non_compliant}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{complianceOverview.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Trends Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Compliance Score (%)"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="violations" 
                  fill="#EF4444" 
                  name="Violations"
                />
                <Bar 
                  yAxisId="right"
                  dataKey="resolved" 
                  fill="#10B981" 
                  name="Resolved"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance Categories */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Compliance by Category</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {complianceCategories.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{category.category}</h4>
                  {getStatusIcon(category.status)}
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="text-sm font-medium">{category.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        category.score >= 90 ? 'bg-green-500' : 
                        category.score >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-3">
                  <div className="text-center">
                    <div className="font-medium text-green-600">{category.compliant}</div>
                    <div>Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-red-600">{category.non_compliant}</div>
                    <div>Non-Compliant</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-yellow-600">{category.pending}</div>
                    <div>Pending</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Last Review: {new Date(category.last_review).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Violations & Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Violations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Violations</h3>
            <div className="space-y-4">
              {recentViolations.map((violation, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">{violation.id}</span>
                        <span 
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: `${getSeverityColor(violation.severity)}20`,
                            color: getSeverityColor(violation.severity)
                          }}
                        >
                          {violation.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{violation.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{violation.category}</span>
                        <span>Due: {new Date(violation.due_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(violation.status)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Assigned to: {violation.assigned_to}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{deadline.requirement}</h4>
                      <p className="text-xs text-gray-600 mb-2">{deadline.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Due: {new Date(deadline.due_date).toLocaleDateString()}
                        </span>
                        <span className={`text-xs font-medium ${
                          deadline.days_remaining <= 7 ? 'text-red-600' :
                          deadline.days_remaining <= 14 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {deadline.days_remaining} days left
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(deadline.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}