'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../components/layouts/DashboardMenus';
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  FunnelIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  DocumentIcon,
  CogIcon,
  EyeIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [selectedPeriod, setSelectedPeriod] = useState('last-12-months');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalApplications: 156,
      approvedApplications: 89,
      pendingApplications: 34,
      rejectedApplications: 33,
      totalPayments: 45600000,
      outstandingPayments: 8900000,
      complianceScore: 87,
      activePermits: 23,
      expiringPermits: 5,
      totalPersonnel: 342,
      localContentScore: 72,
      environmentalCompliance: 94
    },
    trends: {
      applications: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        submitted: [12, 15, 18, 14, 22, 19, 25, 21, 17, 20, 16, 23],
        approved: [8, 11, 14, 10, 16, 15, 19, 17, 13, 16, 12, 18],
        rejected: [2, 3, 2, 3, 4, 2, 3, 2, 2, 2, 2, 3]
      },
      payments: {
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
        amounts: [8500000, 12300000, 15600000, 18900000, 11200000],
        types: {
          royalty: [3200000, 4800000, 6200000, 7500000, 4300000],
          tax: [2800000, 4100000, 5200000, 6300000, 3600000],
          fees: [1500000, 2200000, 2800000, 3400000, 1900000],
          other: [1000000, 1200000, 1400000, 1700000, 1400000]
        }
      },
      compliance: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        scores: [82, 85, 87, 84, 89, 91, 88, 90, 87, 89, 86, 87],
        categories: {
          environmental: [88, 90, 92, 89, 94, 96, 93, 95, 92, 94, 91, 94],
          safety: [85, 87, 89, 86, 91, 93, 90, 92, 89, 91, 88, 90],
          financial: [78, 81, 83, 80, 85, 87, 84, 86, 83, 85, 82, 84],
          operational: [80, 83, 85, 82, 87, 89, 86, 88, 85, 87, 84, 86]
        }
      },
      localContent: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        targets: [55, 60, 65, 70, 75],
        actual: [52, 58, 63, 68, 72],
        categories: {
          employment: [65, 70, 75, 78, 80],
          procurement: [48, 55, 62, 67, 71],
          training: [58, 63, 68, 72, 75],
          technology: [35, 42, 48, 55, 62]
        }
      }
    },
    performance: {
      applicationProcessingTime: {
        average: 45,
        target: 30,
        trend: 'improving',
        byType: {
          'drilling-permit': 35,
          'environmental-permit': 52,
          'exploration-license': 48,
          'production-license': 65
        }
      },
      paymentCompliance: {
        onTime: 78,
        late: 15,
        overdue: 7,
        trend: 'stable'
      },
      permitRenewal: {
        renewed: 89,
        expired: 8,
        pending: 3,
        trend: 'improving'
      }
    },
    insights: [
      {
        type: 'positive',
        title: 'Compliance Score Improvement',
        description: 'Overall compliance score increased by 5% this quarter',
        impact: 'high',
        recommendation: 'Continue current compliance initiatives'
      },
      {
        type: 'warning',
        title: 'Application Processing Delays',
        description: 'Environmental permit processing time exceeds target by 22 days',
        impact: 'medium',
        recommendation: 'Review environmental assessment procedures'
      },
      {
        type: 'negative',
        title: 'Outstanding Payments Increase',
        description: 'Outstanding payments increased by 12% compared to last quarter',
        impact: 'high',
        recommendation: 'Implement automated payment reminders'
      },
      {
        type: 'positive',
        title: 'Local Content Progress',
        description: 'Local content targets exceeded by 2% this year',
        impact: 'medium',
        recommendation: 'Expand local supplier development programs'
      }
    ]
  };

  const getMetricCard = (title: string, value: string | number, icon: any, color: string, change?: number) => {
    const Icon = icon;
    const isPositive = change && change > 0;
    const isNegative = change && change < 0;
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-8 w-8 ${color}`} />
          </div>
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change !== undefined && (
                <div className={`ml-2 flex items-center text-sm ${
                  isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {isPositive ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                  ) : isNegative ? (
                    <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
                  ) : null}
                  {Math.abs(change)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getInsightCard = (insight: any) => {
    const getInsightColor = (type: string) => {
      switch (type) {
        case 'positive': return 'border-green-200 bg-green-50';
        case 'warning': return 'border-yellow-200 bg-yellow-50';
        case 'negative': return 'border-red-200 bg-red-50';
        default: return 'border-gray-200 bg-gray-50';
      }
    };

    const getInsightIcon = (type: string) => {
      switch (type) {
        case 'positive': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
        case 'warning': return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
        case 'negative': return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
        default: return <ChartBarIcon className="h-5 w-5 text-gray-600" />;
      }
    };

    return (
      <div className={`border rounded-lg p-4 ${getInsightColor(insight.type)}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getInsightIcon(insight.type)}
          </div>
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              <strong>Recommendation:</strong> {insight.recommendation}
            </p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {insight.impact.toUpperCase()} IMPACT
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DashboardLayout
      title="Analytics"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor performance, track compliance, and gain insights into your operations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="last-30-days">Last 30 Days</option>
              <option value="last-3-months">Last 3 Months</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-12-months">Last 12 Months</option>
              <option value="year-to-date">Year to Date</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getMetricCard(
            'Total Applications',
            analyticsData.overview.totalApplications,
            DocumentIcon,
            'text-blue-600',
            8
          )}
          {getMetricCard(
            'Approval Rate',
            `${Math.round((analyticsData.overview.approvedApplications / analyticsData.overview.totalApplications) * 100)}%`,
            CheckCircleIcon,
            'text-green-600',
            3
          )}
          {getMetricCard(
            'Total Payments',
            formatCurrency(analyticsData.overview.totalPayments),
            CurrencyDollarIcon,
            'text-purple-600',
            12
          )}
          {getMetricCard(
            'Compliance Score',
            `${analyticsData.overview.complianceScore}%`,
            ChartBarIcon,
            'text-orange-600',
            5
          )}
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getMetricCard(
            'Active Permits',
            analyticsData.overview.activePermits,
            BuildingOfficeIcon,
            'text-indigo-600'
          )}
          {getMetricCard(
            'Personnel Count',
            analyticsData.overview.totalPersonnel,
            UserGroupIcon,
            'text-teal-600',
            7
          )}
          {getMetricCard(
            'Local Content',
            `${analyticsData.overview.localContentScore}%`,
            ArrowTrendingUpIcon,
            'text-green-600',
            4
          )}
          {getMetricCard(
            'Outstanding Payments',
            formatCurrency(analyticsData.overview.outstandingPayments),
            ExclamationTriangleIcon,
            'text-red-600',
            -8
          )}
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Application Processing */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Application Processing</h3>
              <ClockIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Processing Time</span>
                  <span className="font-medium">{analyticsData.performance.applicationProcessingTime.average} days</span>
                </div>
                <div className="mt-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(analyticsData.performance.applicationProcessingTime.target / analyticsData.performance.applicationProcessingTime.average) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Target: {analyticsData.performance.applicationProcessingTime.target} days
                </div>
              </div>
              
              <div className="space-y-2">
                {Object.entries(analyticsData.performance.applicationProcessingTime.byType).map(([type, days]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{type.replace('-', ' ')}</span>
                    <span className="font-medium">{days} days</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Compliance */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Payment Compliance</h3>
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">On Time</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-600">{analyticsData.performance.paymentCompliance.onTime}%</span>
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analyticsData.performance.paymentCompliance.onTime}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Late</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-yellow-600">{analyticsData.performance.paymentCompliance.late}%</span>
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${analyticsData.performance.paymentCompliance.late}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Overdue</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-red-600">{analyticsData.performance.paymentCompliance.overdue}%</span>
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${analyticsData.performance.paymentCompliance.overdue}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permit Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Permit Management</h3>
              <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{analyticsData.overview.activePermits}</div>
                <div className="text-sm text-gray-500">Active Permits</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Renewed</span>
                  <span className="font-medium text-green-600">{analyticsData.performance.permitRenewal.renewed}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expired</span>
                  <span className="font-medium text-red-600">{analyticsData.performance.permitRenewal.expired}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Renewal</span>
                  <span className="font-medium text-yellow-600">{analyticsData.performance.permitRenewal.pending}%</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="text-xs text-gray-500">
                  {analyticsData.overview.expiringPermits} permits expiring within 30 days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Application Trends</h3>
              <PresentationChartLineIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Application trends chart would be displayed here</p>
                <p className="text-xs text-gray-400">Integration with charting library required</p>
              </div>
            </div>
          </div>

          {/* Payment Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Payment Analysis</h3>
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PresentationChartLineIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Payment analysis chart would be displayed here</p>
                <p className="text-xs text-gray-400">Integration with charting library required</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Insights & Recommendations</h3>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                <EyeIcon className="h-4 w-4 inline mr-1" />
                View All
              </button>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                <ShareIcon className="h-4 w-4 inline mr-1" />
                Share
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsData.insights.map((insight, index) => (
              <div key={index}>
                {getInsightCard(insight)}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push('/dashboard/company-admin/analytics/reports')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <DocumentArrowDownIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Generate Report</div>
                <div className="text-xs text-gray-500">Create custom analytics report</div>
              </div>
            </button>
            
            <button
              onClick={() => router.push('/dashboard/company-admin/analytics/dashboard')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <ChartBarIcon className="h-6 w-6 text-green-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Custom Dashboard</div>
                <div className="text-xs text-gray-500">Build personalized dashboard</div>
              </div>
            </button>
            
            <button
              onClick={() => router.push('/dashboard/company-admin/analytics/alerts')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Set Alerts</div>
                <div className="text-xs text-gray-500">Configure performance alerts</div>
              </div>
            </button>
            
            <button
              onClick={() => router.push('/dashboard/company-admin/analytics/settings')}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <CogIcon className="h-6 w-6 text-gray-600 mr-3" />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Analytics Settings</div>
                <div className="text-xs text-gray-500">Configure data sources</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}