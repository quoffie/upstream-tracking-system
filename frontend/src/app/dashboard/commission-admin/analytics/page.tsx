'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  Cog6ToothIcon,
  ShareIcon,
  PrinterIcon,
  ChartPieIcon,
  TableCellsIcon,
  MapIcon,
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

interface AnalyticsData {
  period: string;
  applications: number;
  approvals: number;
  revenue: number;
  companies: number;
  compliance: number;
  inspections: number;
}

interface CompanyPerformance {
  name: string;
  applications: number;
  approvals: number;
  revenue: number;
  compliance: number;
  localContent: number;
}

interface RegionalData {
  region: string;
  companies: number;
  revenue: number;
  applications: number;
  compliance: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [viewType, setViewType] = useState('overview');

  const analyticsData: AnalyticsData[] = [
    { period: 'Jan 2024', applications: 45, approvals: 38, revenue: 2400000, companies: 12, compliance: 85, inspections: 28 },
    { period: 'Feb 2024', applications: 52, approvals: 44, revenue: 2800000, companies: 15, compliance: 88, inspections: 32 },
    { period: 'Mar 2024', applications: 48, approvals: 41, revenue: 2600000, companies: 13, compliance: 82, inspections: 30 },
    { period: 'Apr 2024', applications: 58, approvals: 49, revenue: 3200000, companies: 18, compliance: 90, inspections: 35 },
    { period: 'May 2024', applications: 61, approvals: 52, revenue: 3400000, companies: 20, compliance: 87, inspections: 38 },
    { period: 'Jun 2024', applications: 55, approvals: 47, revenue: 3100000, companies: 16, compliance: 89, inspections: 33 },
    { period: 'Jul 2024', applications: 63, approvals: 54, revenue: 3600000, companies: 22, compliance: 91, inspections: 40 },
    { period: 'Aug 2024', applications: 59, approvals: 50, revenue: 3300000, companies: 19, compliance: 86, inspections: 36 },
    { period: 'Sep 2024', applications: 67, approvals: 57, revenue: 3800000, companies: 24, compliance: 93, inspections: 42 },
    { period: 'Oct 2024', applications: 64, approvals: 55, revenue: 3500000, companies: 21, compliance: 88, inspections: 39 },
    { period: 'Nov 2024', applications: 70, approvals: 60, revenue: 4000000, companies: 26, compliance: 95, inspections: 45 },
    { period: 'Dec 2024', applications: 68, approvals: 58, revenue: 3900000, companies: 25, compliance: 92, inspections: 43 }
  ];

  const companyPerformance: CompanyPerformance[] = [
    { name: 'Shell Petroleum', applications: 24, approvals: 22, revenue: 8500000, compliance: 95, localContent: 78 },
    { name: 'Chevron Nigeria', applications: 20, approvals: 18, revenue: 7200000, compliance: 92, localContent: 82 },
    { name: 'ExxonMobil', applications: 18, approvals: 16, revenue: 6800000, compliance: 88, localContent: 75 },
    { name: 'Total Energies', applications: 16, approvals: 15, revenue: 5900000, compliance: 90, localContent: 80 },
    { name: 'Eni Nigeria', applications: 14, approvals: 12, revenue: 5200000, compliance: 85, localContent: 73 },
    { name: 'Addax Petroleum', applications: 12, approvals: 11, revenue: 4600000, compliance: 87, localContent: 76 },
    { name: 'NPDC', applications: 15, approvals: 13, revenue: 4100000, compliance: 83, localContent: 85 },
    { name: 'Seplat Energy', applications: 11, approvals: 10, revenue: 3800000, compliance: 89, localContent: 79 }
  ];

  const regionalData: RegionalData[] = [
    { region: 'Niger Delta', companies: 45, revenue: 18500000, applications: 180, compliance: 88 },
    { region: 'Lagos/Southwest', companies: 32, revenue: 12300000, applications: 125, compliance: 92 },
    { region: 'Abuja/North Central', companies: 28, revenue: 8900000, applications: 95, compliance: 85 },
    { region: 'Port Harcourt/South South', companies: 38, revenue: 15200000, applications: 155, compliance: 90 },
    { region: 'Kano/Northwest', companies: 15, revenue: 4200000, applications: 48, compliance: 82 },
    { region: 'Enugu/Southeast', companies: 22, revenue: 6800000, applications: 72, compliance: 87 }
  ];

  const pieChartData = [
    { name: 'Approved', value: 65, color: '#10B981' },
    { name: 'Pending', value: 20, color: '#F59E0B' },
    { name: 'Under Review', value: 10, color: '#3B82F6' },
    { name: 'Rejected', value: 5, color: '#EF4444' }
  ];

  const complianceData = [
    { category: 'Environmental', score: 88, target: 90 },
    { category: 'Safety', score: 92, target: 95 },
    { category: 'Local Content', score: 76, target: 80 },
    { category: 'Financial', score: 94, target: 90 },
    { category: 'Operational', score: 85, target: 85 },
    { category: 'Regulatory', score: 90, target: 92 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const currentMonthData = analyticsData[analyticsData.length - 1];
  const previousMonthData = analyticsData[analyticsData.length - 2];

  const growthMetrics = {
    applications: calculateGrowth(currentMonthData.applications, previousMonthData.applications),
    approvals: calculateGrowth(currentMonthData.approvals, previousMonthData.approvals),
    revenue: calculateGrowth(currentMonthData.revenue, previousMonthData.revenue),
    companies: calculateGrowth(currentMonthData.companies, previousMonthData.companies)
  };

  const handleExportData = (format: string) => {
    console.log(`Exporting data in ${format} format`);
    // Implementation for data export
  };

  const handleViewDetails = (metric: string) => {
    router.push(`/dashboard/commission-admin/analytics/details/${metric}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="12months">Last 12 Months</option>
                <option value="custom">Custom Range</option>
              </select>
              <button
                onClick={() => handleExportData('pdf')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => router.push('/dashboard/commission-admin/analytics/settings')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Cog6ToothIcon className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* View Type Selector */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setViewType('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'overview'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewType('companies')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'companies'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setViewType('regional')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'regional'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Regional
            </button>
            <button
              onClick={() => setViewType('compliance')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'compliance'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Compliance
            </button>
          </div>
        </div>

        {viewType === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Applications</p>
                    <p className="text-3xl font-bold text-gray-900">{formatNumber(currentMonthData.applications)}</p>
                    <div className="flex items-center mt-2">
                      {growthMetrics.applications >= 0 ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        growthMetrics.applications >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(growthMetrics.applications).toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <DocumentChartBarIcon className="h-12 w-12 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Approvals</p>
                    <p className="text-3xl font-bold text-gray-900">{formatNumber(currentMonthData.approvals)}</p>
                    <div className="flex items-center mt-2">
                      {growthMetrics.approvals >= 0 ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        growthMetrics.approvals >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(growthMetrics.approvals).toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <ChartBarIcon className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(currentMonthData.revenue)}</p>
                    <div className="flex items-center mt-2">
                      {growthMetrics.revenue >= 0 ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        growthMetrics.revenue >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(growthMetrics.revenue).toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <CurrencyDollarIcon className="h-12 w-12 text-yellow-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Companies</p>
                    <p className="text-3xl font-bold text-gray-900">{formatNumber(currentMonthData.companies)}</p>
                    <div className="flex items-center mt-2">
                      {growthMetrics.companies >= 0 ? (
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        growthMetrics.companies >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {Math.abs(growthMetrics.companies).toFixed(1)}%
                      </span>
                      <span className="text-sm text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <BuildingOfficeIcon className="h-12 w-12 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Applications Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Applications & Approvals Trend</h3>
                  <button
                    onClick={() => handleViewDetails('applications')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3B82F6" strokeWidth={2} name="Applications" />
                    <Line type="monotone" dataKey="approvals" stroke="#10B981" strokeWidth={2} name="Approvals" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Revenue Trend */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                  <button
                    onClick={() => handleViewDetails('revenue')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#F59E0B" fill="#FEF3C7" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Application Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Application Status Distribution</h3>
                  <button
                    onClick={() => handleViewDetails('status')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Inspections */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Monthly Inspections</h3>
                  <button
                    onClick={() => handleViewDetails('inspections')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inspections" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {viewType === 'companies' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Performance Analysis</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approvals</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local Content</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {companyPerformance.map((company, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{company.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.applications}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {company.approvals}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(company.revenue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  company.compliance >= 90 ? 'bg-green-500' :
                                  company.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${company.compliance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{company.compliance}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  company.localContent >= 80 ? 'bg-green-500' :
                                  company.localContent >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${company.localContent}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{company.localContent}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleViewDetails(`company-${index}`)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {viewType === 'regional' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={regionalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Companies</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applications</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {regionalData.map((region, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {region.region}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {region.companies}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {region.applications}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              region.compliance >= 90 ? 'bg-green-100 text-green-800' :
                              region.compliance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {region.compliance}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewType === 'compliance' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Performance</h3>
              <div className="space-y-6">
                {complianceData.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{item.category}</h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Target: {item.target}%</span>
                        <span className={`text-sm font-medium ${
                          item.score >= item.target ? 'text-green-600' : 'text-red-600'
                        }`}>
                          Current: {item.score}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          item.score >= item.target ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(item.score, 100)}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/dashboard/commission-admin/analytics/reports')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Generate Report</p>
                  <p className="text-sm text-gray-500">Create custom analytics report</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/analytics/dashboard')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PresentationChartLineIcon className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Custom Dashboard</p>
                  <p className="text-sm text-gray-500">Build personalized view</p>
                </div>
              </button>
              
              <button
                onClick={() => handleExportData('excel')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TableCellsIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Export Data</p>
                  <p className="text-sm text-gray-500">Download as Excel/CSV</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/analytics/alerts')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ClockIcon className="h-8 w-8 text-orange-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Set Alerts</p>
                  <p className="text-sm text-gray-500">Configure notifications</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}