'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ClockIcon,
  DocumentTextIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface RegionalData {
  region: string;
  applications: number;
  revenue: number;
  compliance: number;
  growth: number;
}

interface TrendData {
  month: string;
  applications: number;
  approvals: number;
  revenue: number;
  compliance: number;
}

interface RiskAlert {
  id: string;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  category: string;
  timestamp: string;
  status: 'Active' | 'Resolved' | 'Investigating';
}

export default function StrategicDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarItems = getCommissionAdminMenuItems(pathname);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('12M');
  const [selectedRegion, setSelectedRegion] = useState('All');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Mock KPI data
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: '₦2.8B',
      change: 12.5,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: CurrencyDollarIcon,
      color: 'text-green-600'
    },
    {
      id: 'active-applications',
      title: 'Active Applications',
      value: '1,247',
      change: 8.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: DocumentTextIcon,
      color: 'text-blue-600'
    },
    {
      id: 'compliance-rate',
      title: 'Compliance Rate',
      value: '94.2%',
      change: 2.1,
      changeType: 'increase',
      period: 'vs last quarter',
      icon: CheckCircleIcon,
      color: 'text-green-600'
    },
    {
      id: 'avg-processing-time',
      title: 'Avg Processing Time',
      value: '18 days',
      change: 15.2,
      changeType: 'decrease',
      period: 'vs last quarter',
      icon: ClockIcon,
      color: 'text-orange-600'
    },
    {
      id: 'active-operators',
      title: 'Active Operators',
      value: '156',
      change: 5.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: UsersIcon,
      color: 'text-purple-600'
    },
    {
      id: 'risk-alerts',
      title: 'Active Risk Alerts',
      value: '23',
      change: 12.0,
      changeType: 'decrease',
      period: 'vs last week',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600'
    }
  ];

  // Mock trend data
  const trendData: TrendData[] = [
    { month: 'Jan', applications: 120, approvals: 95, revenue: 180, compliance: 92 },
    { month: 'Feb', applications: 135, approvals: 108, revenue: 195, compliance: 94 },
    { month: 'Mar', applications: 148, approvals: 125, revenue: 220, compliance: 93 },
    { month: 'Apr', applications: 162, approvals: 140, revenue: 245, compliance: 95 },
    { month: 'May', applications: 175, approvals: 155, revenue: 280, compliance: 96 },
    { month: 'Jun', applications: 190, approvals: 170, revenue: 310, compliance: 94 },
    { month: 'Jul', applications: 205, approvals: 185, revenue: 340, compliance: 95 },
    { month: 'Aug', applications: 220, approvals: 200, revenue: 375, compliance: 97 },
    { month: 'Sep', applications: 235, approvals: 215, revenue: 410, compliance: 96 },
    { month: 'Oct', applications: 250, approvals: 230, revenue: 445, compliance: 98 },
    { month: 'Nov', applications: 265, approvals: 245, revenue: 480, compliance: 97 },
    { month: 'Dec', applications: 280, approvals: 260, revenue: 520, compliance: 99 }
  ];

  // Mock regional data
  const regionalData: RegionalData[] = [
    { region: 'Lagos', applications: 450, revenue: 850, compliance: 96, growth: 15.2 },
    { region: 'Rivers', applications: 380, revenue: 720, compliance: 94, growth: 12.8 },
    { region: 'Delta', applications: 320, revenue: 610, compliance: 92, growth: 18.5 },
    { region: 'Bayelsa', applications: 280, revenue: 530, compliance: 95, growth: 10.3 },
    { region: 'Akwa Ibom', applications: 250, revenue: 480, compliance: 93, growth: 14.7 },
    { region: 'Cross River', applications: 180, revenue: 340, compliance: 91, growth: 8.9 }
  ];

  // Mock risk alerts
  const riskAlerts: RiskAlert[] = [
    {
      id: 'RISK-001',
      title: 'Environmental Compliance Deviation',
      description: 'Multiple operators in Delta region showing declining environmental compliance scores',
      severity: 'High',
      category: 'Environmental',
      timestamp: '2024-01-25T10:30:00Z',
      status: 'Active'
    },
    {
      id: 'RISK-002',
      title: 'Revenue Collection Shortfall',
      description: 'Q4 revenue collection 8% below projected targets in Rivers region',
      severity: 'Medium',
      category: 'Financial',
      timestamp: '2024-01-24T14:15:00Z',
      status: 'Investigating'
    },
    {
      id: 'RISK-003',
      title: 'Processing Delay Increase',
      description: 'Average application processing time increased by 25% in Lagos region',
      severity: 'Medium',
      category: 'Operational',
      timestamp: '2024-01-23T09:45:00Z',
      status: 'Active'
    },
    {
      id: 'RISK-004',
      title: 'Safety Incident Trend',
      description: 'Upward trend in safety incidents reported across offshore operations',
      severity: 'Critical',
      category: 'Safety',
      timestamp: '2024-01-22T16:20:00Z',
      status: 'Active'
    }
  ];

  // Chart colors
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading strategic dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Strategic Dashboard"
      userRole="Commission Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Strategic Dashboard</h1>
              <p className="text-gray-600 mt-1">Executive overview of key performance indicators and strategic insights</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="1M">Last Month</option>
                <option value="3M">Last 3 Months</option>
                <option value="6M">Last 6 Months</option>
                <option value="12M">Last 12 Months</option>
              </select>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                      <IconComponent className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${
                      metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.changeType === 'increase' ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{metric.change}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₦${value}M`, 'Revenue']} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Applications vs Approvals */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Applications vs Approvals</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
                <Bar dataKey="approvals" fill="#10B981" name="Approvals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Regional Performance */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Performance</h3>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <div>
                      <p className="font-medium text-gray-900">{region.region}</p>
                      <p className="text-sm text-gray-600">{region.applications} applications</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₦{region.revenue}M</p>
                    <p className={`text-sm ${
                      region.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {region.growth > 0 ? '+' : ''}{region.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Trend */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Rate Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Compliance Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="compliance" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Active Risk Alerts</h3>
            <span className="text-sm text-gray-600">{riskAlerts.length} active alerts</span>
          </div>
          
          <div className="space-y-4">
            {riskAlerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ExclamationTriangleIcon className="h-5 w-5" />
                      <h4 className="font-medium">{alert.title}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span>Category: {alert.category}</span>
                      <span>Status: {alert.status}</span>
                      <span>{new Date(alert.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="text-sm font-medium hover:underline ml-4">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Insights */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Strategic Insights & Recommendations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Key Opportunities</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <ArrowTrendingUpIcon className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Revenue Growth Potential</p>
                    <p className="text-sm text-green-700">Delta region showing 18.5% growth - consider expanding operations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <ChartBarIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Process Optimization</p>
                    <p className="text-sm text-blue-700">15% reduction in processing time achieved - replicate across regions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Areas of Concern</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Safety Incident Increase</p>
                    <p className="text-sm text-red-700">Offshore operations require immediate safety protocol review</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <ArrowTrendingDownIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Revenue Shortfall</p>
                    <p className="text-sm text-yellow-700">Rivers region 8% below target - investigate collection processes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}