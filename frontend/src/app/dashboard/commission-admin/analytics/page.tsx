'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface AnalyticsData {
  applications: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    monthlyTrend: { month: string; count: number }[];
    byType: { type: string; count: number; percentage: number }[];
    avgProcessingTime: number;
  };
  revenue: {
    total: number;
    monthly: number;
    quarterly: number;
    yearly: number;
    trend: { month: string; amount: number }[];
    bySource: { source: string; amount: number; percentage: number }[];
  };
  performance: {
    slaCompliance: number;
    avgResponseTime: number;
    customerSatisfaction: number;
    systemUptime: number;
    processingEfficiency: number;
  };
  compliance: {
    overallScore: number;
    auditFindings: number;
    resolvedIssues: number;
    pendingActions: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };
}

interface Report {
  id: string;
  name: string;
  type: 'Financial' | 'Operational' | 'Compliance' | 'Performance';
  description: string;
  lastGenerated: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annual';
  status: 'Ready' | 'Generating' | 'Scheduled';
  size?: string;
}

export default function AnalyticsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'insights'>('overview');
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('applications');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock analytics data
    const mockAnalyticsData: AnalyticsData = {
      applications: {
        total: 1247,
        approved: 892,
        pending: 234,
        rejected: 121,
        monthlyTrend: [
          { month: 'Jan', count: 98 },
          { month: 'Feb', count: 112 },
          { month: 'Mar', count: 134 },
          { month: 'Apr', count: 156 },
          { month: 'May', count: 143 },
          { month: 'Jun', count: 167 }
        ],
        byType: [
          { type: 'Company Registration', count: 456, percentage: 36.6 },
          { type: 'Regular Permits', count: 389, percentage: 31.2 },
          { type: 'JV Applications', count: 234, percentage: 18.8 },
          { type: 'Renewals', count: 168, percentage: 13.4 }
        ],
        avgProcessingTime: 12.5
      },
      revenue: {
        total: 2847500000,
        monthly: 456780000,
        quarterly: 1234560000,
        yearly: 2847500000,
        trend: [
          { month: 'Jan', amount: 234500000 },
          { month: 'Feb', amount: 267800000 },
          { month: 'Mar', amount: 298400000 },
          { month: 'Apr', amount: 345600000 },
          { month: 'May', amount: 389200000 },
          { month: 'Jun', amount: 456780000 }
        ],
        bySource: [
          { source: 'Registration Fees', amount: 1245600000, percentage: 43.7 },
          { source: 'Permit Fees', amount: 892300000, percentage: 31.3 },
          { source: 'JV Fees', amount: 456700000, percentage: 16.0 },
          { source: 'Renewal Fees', amount: 252900000, percentage: 8.9 }
        ]
      },
      performance: {
        slaCompliance: 94.2,
        avgResponseTime: 2.3,
        customerSatisfaction: 4.6,
        systemUptime: 99.8,
        processingEfficiency: 87.5
      },
      compliance: {
        overallScore: 92.5,
        auditFindings: 3,
        resolvedIssues: 47,
        pendingActions: 8,
        riskLevel: 'Low'
      }
    };

    const mockReports: Report[] = [
      {
        id: 'RPT-001',
        name: 'Monthly Financial Summary',
        type: 'Financial',
        description: 'Comprehensive monthly revenue and payment analysis',
        lastGenerated: '2024-01-25T09:00:00Z',
        frequency: 'Monthly',
        status: 'Ready',
        size: '2.4 MB'
      },
      {
        id: 'RPT-002',
        name: 'Application Processing Report',
        type: 'Operational',
        description: 'Detailed analysis of application processing metrics',
        lastGenerated: '2024-01-25T08:30:00Z',
        frequency: 'Weekly',
        status: 'Ready',
        size: '1.8 MB'
      },
      {
        id: 'RPT-003',
        name: 'Compliance Audit Report',
        type: 'Compliance',
        description: 'Regulatory compliance status and audit findings',
        lastGenerated: '2024-01-20T14:00:00Z',
        frequency: 'Quarterly',
        status: 'Ready',
        size: '3.2 MB'
      },
      {
        id: 'RPT-004',
        name: 'Performance Dashboard',
        type: 'Performance',
        description: 'System performance and efficiency metrics',
        lastGenerated: '2024-01-25T07:00:00Z',
        frequency: 'Daily',
        status: 'Ready',
        size: '956 KB'
      },
      {
        id: 'RPT-005',
        name: 'Annual Revenue Analysis',
        type: 'Financial',
        description: 'Comprehensive annual revenue and growth analysis',
        lastGenerated: '2024-01-01T10:00:00Z',
        frequency: 'Annual',
        status: 'Scheduled',
        size: '5.1 MB'
      },
      {
        id: 'RPT-006',
        name: 'Customer Satisfaction Survey',
        type: 'Performance',
        description: 'Customer feedback and satisfaction metrics',
        lastGenerated: '2024-01-24T16:00:00Z',
        frequency: 'Monthly',
        status: 'Generating'
      }
    ];

    setAnalyticsData(mockAnalyticsData);
    setReports(mockReports);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Generating': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Financial': return 'bg-green-100 text-green-800';
      case 'Operational': return 'bg-blue-100 text-blue-800';
      case 'Compliance': return 'bg-purple-100 text-purple-800';
      case 'Performance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">📊</span>
              Analytics & Reports
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive analytics, insights, and automated reporting</p>
          </div>
          <div className="flex space-x-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics Overview
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reports ({reports.length})
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'insights'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Business Insights
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && analyticsData && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{analyticsData.applications.total.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Total Applications</div>
                    <div className="text-xs mt-1 opacity-75">+12% this month</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(analyticsData.revenue.total)}</div>
                    <div className="text-sm opacity-90">Total Revenue</div>
                    <div className="text-xs mt-1 opacity-75">+18% this quarter</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{analyticsData.performance.slaCompliance}%</div>
                    <div className="text-sm opacity-90">SLA Compliance</div>
                    <div className="text-xs mt-1 opacity-75">+2.1% improvement</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{analyticsData.compliance.overallScore}%</div>
                    <div className="text-sm opacity-90">Compliance Score</div>
                    <div className={`text-xs mt-1 opacity-75 ${getRiskColor(analyticsData.compliance.riskLevel)}`}>
                      {analyticsData.compliance.riskLevel} Risk
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Approved</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(analyticsData.applications.approved / analyticsData.applications.total) * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{analyticsData.applications.approved}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pending</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(analyticsData.applications.pending / analyticsData.applications.total) * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{analyticsData.applications.pending}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rejected</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(analyticsData.applications.rejected / analyticsData.applications.total) * 100}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{analyticsData.applications.rejected}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Types</h3>
                  <div className="space-y-3">
                    {analyticsData.applications.byType.map((type) => (
                      <div key={type.type} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{type.type}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${type.percentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{type.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Revenue Analytics */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {analyticsData.revenue.bySource.map((source) => (
                    <div key={source.source} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-900">{formatCurrency(source.amount)}</div>
                      <div className="text-sm text-gray-600">{source.source}</div>
                      <div className="text-xs text-gray-500">{source.percentage}% of total</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{analyticsData.performance.avgResponseTime}d</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">{analyticsData.performance.customerSatisfaction}/5</div>
                  <div className="text-sm text-gray-600">Customer Satisfaction</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600">{analyticsData.performance.systemUptime}%</div>
                  <div className="text-sm text-gray-600">System Uptime</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">{analyticsData.performance.processingEfficiency}%</div>
                  <div className="text-sm text-gray-600">Processing Efficiency</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold text-red-600">{analyticsData.applications.avgProcessingTime}d</div>
                  <div className="text-sm text-gray-600">Avg Processing Time</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Generate Custom Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <div key={report.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{report.name}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Frequency:</span>
                        <span className="text-gray-900">{report.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last Generated:</span>
                        <span className="text-gray-900">{formatDate(report.lastGenerated)}</span>
                      </div>
                      {report.size && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Size:</span>
                          <span className="text-gray-900">{report.size}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Status:</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      {report.status === 'Ready' && (
                        <>
                          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Download
                          </button>
                          <button className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            View
                          </button>
                        </>
                      )}
                      {report.status === 'Scheduled' && (
                        <button className="w-full bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                          Generate Now
                        </button>
                      )}
                      {report.status === 'Generating' && (
                        <button className="w-full bg-gray-400 text-white px-3 py-2 rounded-lg cursor-not-allowed text-sm" disabled>
                          Generating...
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && analyticsData && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Business Insights & Recommendations</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">📈 Growth Opportunities</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Application volume increased 12% this month - consider expanding processing capacity</li>
                    <li>• JV applications show 25% growth potential based on market trends</li>
                    <li>• Revenue from permit fees could be optimized with dynamic pricing</li>
                    <li>• Customer satisfaction scores indicate opportunity for premium services</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ Areas for Improvement</h4>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>• Average processing time of {analyticsData.applications.avgProcessingTime} days exceeds target of 10 days</li>
                    <li>• {analyticsData.applications.pending} applications currently pending - review bottlenecks</li>
                    <li>• SLA compliance at {analyticsData.performance.slaCompliance}% - target 95%+</li>
                    <li>• {analyticsData.compliance.pendingActions} compliance actions pending resolution</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">✅ Performance Highlights</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• System uptime maintained at {analyticsData.performance.systemUptime}% - excellent reliability</li>
                    <li>• Revenue growth of 18% this quarter exceeds projections</li>
                    <li>• Compliance score of {analyticsData.compliance.overallScore}% indicates strong regulatory adherence</li>
                    <li>• Customer satisfaction rating of {analyticsData.performance.customerSatisfaction}/5 shows high service quality</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-purple-900 mb-3">🎯 Strategic Recommendations</h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• Implement automated workflow routing to reduce processing times</li>
                    <li>• Develop predictive analytics for application approval likelihood</li>
                    <li>• Create self-service portal to reduce manual processing overhead</li>
                    <li>• Establish proactive compliance monitoring and alerting system</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">📊 Trend Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+12%</div>
                    <div className="text-sm text-gray-600">Application Volume Growth</div>
                    <div className="text-xs text-gray-500">Month over Month</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+18%</div>
                    <div className="text-sm text-gray-600">Revenue Growth</div>
                    <div className="text-xs text-gray-500">Quarter over Quarter</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+2.1%</div>
                    <div className="text-sm text-gray-600">SLA Compliance Improvement</div>
                    <div className="text-xs text-gray-500">Year over Year</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Custom Reports</h3>
          <p className="text-sm opacity-90 mb-4">Create tailored reports for specific needs</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/analytics/custom-reports')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Create Report
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Data Export</h3>
          <p className="text-sm opacity-90 mb-4">Export data for external analysis</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/analytics/export')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Export Data
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Predictive Analytics</h3>
          <p className="text-sm opacity-90 mb-4">AI-powered insights and forecasting</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/analytics/predictive')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Predictions
          </button>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Benchmarking</h3>
          <p className="text-sm opacity-90 mb-4">Compare performance against industry standards</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/analytics/benchmarks')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Benchmarks
          </button>
        </div>
      </div>
    </div>
  );
}