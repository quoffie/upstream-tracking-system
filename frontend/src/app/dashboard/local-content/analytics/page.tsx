'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  ChartPieIcon
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

interface ComplianceMetric {
  month: string;
  compliance: number;
  target: number;
  companies: number;
}

interface LocalContentData {
  category: string;
  current: number;
  target: number;
  change: number;
}

interface CompanyPerformance {
  company: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
}

interface InvestmentData {
  sector: string;
  amount: number;
  percentage: number;
  color: string;
}

const mockComplianceData: ComplianceMetric[] = [
  { month: 'Jan', compliance: 78, target: 80, companies: 45 },
  { month: 'Feb', compliance: 82, target: 80, companies: 47 },
  { month: 'Mar', compliance: 85, target: 80, companies: 48 },
  { month: 'Apr', compliance: 79, target: 80, companies: 50 },
  { month: 'May', compliance: 88, target: 80, companies: 52 },
  { month: 'Jun', compliance: 91, target: 80, companies: 54 },
  { month: 'Jul', compliance: 87, target: 80, companies: 55 },
  { month: 'Aug', compliance: 93, target: 80, companies: 57 },
  { month: 'Sep', compliance: 89, target: 80, companies: 58 },
  { month: 'Oct', compliance: 95, target: 80, companies: 60 },
  { month: 'Nov', compliance: 92, target: 80, companies: 62 },
  { month: 'Dec', compliance: 96, target: 80, companies: 64 }
];

const mockLocalContentData: LocalContentData[] = [
  { category: 'Personnel', current: 85, target: 80, change: 5.2 },
  { category: 'Training', current: 78, target: 75, change: 3.1 },
  { category: 'Technology Transfer', current: 72, target: 70, change: -1.5 },
  { category: 'Local Suppliers', current: 68, target: 65, change: 4.8 },
  { category: 'Research & Development', current: 45, target: 50, change: -2.3 },
  { category: 'Manufacturing', current: 82, target: 80, change: 2.7 }
];

const mockCompanyPerformance: CompanyPerformance[] = [
  { company: 'Shell Nigeria', score: 94, trend: 'up', category: 'Excellent' },
  { company: 'TotalEnergies', score: 91, trend: 'up', category: 'Excellent' },
  { company: 'Chevron Nigeria', score: 88, trend: 'stable', category: 'Good' },
  { company: 'ExxonMobil', score: 85, trend: 'down', category: 'Good' },
  { company: 'Eni Nigeria', score: 82, trend: 'up', category: 'Good' },
  { company: 'Addax Petroleum', score: 78, trend: 'stable', category: 'Satisfactory' },
  { company: 'Oando Energy', score: 75, trend: 'up', category: 'Satisfactory' },
  { company: 'Seplat Energy', score: 73, trend: 'down', category: 'Satisfactory' }
];

const mockInvestmentData: InvestmentData[] = [
  { sector: 'Personnel Development', amount: 2.8, percentage: 35, color: '#3B82F6' },
  { sector: 'Technology Transfer', amount: 2.1, percentage: 26, color: '#10B981' },
  { sector: 'Local Manufacturing', amount: 1.6, percentage: 20, color: '#F59E0B' },
  { sector: 'R&D Initiatives', amount: 1.0, percentage: 12, color: '#EF4444' },
  { sector: 'Infrastructure', amount: 0.5, percentage: 7, color: '#8B5CF6' }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function LocalContentAnalyticsPage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('compliance');

  const totalInvestment = mockInvestmentData.reduce((sum, item) => sum + item.amount, 0);
  const averageCompliance = mockComplianceData.reduce((sum, item) => sum + item.compliance, 0) / mockComplianceData.length;
  const totalCompanies = mockComplianceData[mockComplianceData.length - 1].companies;
  const complianceChange = mockComplianceData[mockComplianceData.length - 1].compliance - mockComplianceData[mockComplianceData.length - 2].compliance;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Analytics</h1>
          <p className="text-gray-600">Comprehensive analytics and insights on local content performance</p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="12months">Last 12 Months</option>
            <option value="24months">Last 24 Months</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <DocumentChartBarIcon className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{averageCompliance.toFixed(1)}%</p>
              <div className="flex items-center mt-1">
                {complianceChange >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ml-1 ${complianceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(complianceChange)}% from last month
                </span>
              </div>
            </div>
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Investment</p>
              <p className="text-2xl font-bold text-gray-900">${totalInvestment.toFixed(1)}B</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">12.5% from last year</span>
              </div>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Companies</p>
              <p className="text-2xl font-bold text-gray-900">{totalCompanies}</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">8 new this year</span>
              </div>
            </div>
            <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Training Programs</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">23 completed this month</span>
              </div>
            </div>
            <UserGroupIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Compliance Trend</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Target: 80%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockComplianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Compliance %"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#EF4444" 
                strokeDasharray="5 5"
                name="Target %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Investment Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Investment Distribution</h3>
            <span className="text-sm text-gray-500">Total: ${totalInvestment.toFixed(1)}B</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockInvestmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {mockInvestmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}B`, 'Investment']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Local Content Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Local Content Performance by Category</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Detailed Report
          </button>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mockLocalContentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#3B82F6" name="Current %" />
            <Bar dataKey="target" fill="#10B981" name="Target %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Company Performance Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Company Performance Rankings</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                All Companies
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full">
                Top Performers
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCompanyPerformance.map((company, index) => (
                <tr key={company.company} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{company.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{company.score}%</div>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${company.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {company.trend === 'up' && <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />}
                      {company.trend === 'down' && <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />}
                      {company.trend === 'stable' && <div className="h-5 w-5 bg-gray-400 rounded-full" />}
                      <span className={`ml-2 text-sm ${
                        company.trend === 'up' ? 'text-green-600' : 
                        company.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {company.trend.charAt(0).toUpperCase() + company.trend.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      company.category === 'Excellent' ? 'bg-green-100 text-green-800' :
                      company.category === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {company.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View Details
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Generate Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Top Performers</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Shell Nigeria</span>
              <span className="text-sm font-medium text-green-600">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">TotalEnergies</span>
              <span className="text-sm font-medium text-green-600">91%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Chevron Nigeria</span>
              <span className="text-sm font-medium text-green-600">88%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Areas for Improvement</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">R&D Initiatives</span>
              <span className="text-sm font-medium text-red-600">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Local Suppliers</span>
              <span className="text-sm font-medium text-yellow-600">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Technology Transfer</span>
              <span className="text-sm font-medium text-yellow-600">72%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Recent Activities</h4>
          </div>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-900 font-medium">New Training Program</p>
              <p className="text-gray-600">Launched 2 days ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 font-medium">Compliance Review</p>
              <p className="text-gray-600">Completed 1 week ago</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 font-medium">Investment Report</p>
              <p className="text-gray-600">Published 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}