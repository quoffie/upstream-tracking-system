'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface StatusData {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

interface TrendData {
  month: string;
  submitted: number;
  approved: number;
  rejected: number;
  pending: number;
}

interface ProcessingTimeData {
  stage: string;
  averageDays: number;
  target: number;
}

const ApplicationStatusPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [processingData, setProcessingData] = useState<ProcessingTimeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  useEffect(() => {
    // Mock data for application status overview
    const mockStatusData: StatusData[] = [
      { status: 'Pending Review', count: 45, percentage: 32.1, color: '#FCD34D' },
      { status: 'Under Review', count: 28, percentage: 20.0, color: '#60A5FA' },
      { status: 'Approved', count: 52, percentage: 37.1, color: '#34D399' },
      { status: 'Rejected', count: 15, percentage: 10.7, color: '#F87171' }
    ];

    const mockTrendData: TrendData[] = [
      { month: 'Jul 2023', submitted: 25, approved: 18, rejected: 4, pending: 3 },
      { month: 'Aug 2023', submitted: 32, approved: 22, rejected: 6, pending: 4 },
      { month: 'Sep 2023', submitted: 28, approved: 20, rejected: 5, pending: 3 },
      { month: 'Oct 2023', submitted: 35, approved: 25, rejected: 7, pending: 3 },
      { month: 'Nov 2023', submitted: 30, approved: 21, rejected: 6, pending: 3 },
      { month: 'Dec 2023', submitted: 38, approved: 28, rejected: 8, pending: 2 },
      { month: 'Jan 2024', submitted: 42, approved: 30, rejected: 9, pending: 3 }
    ];

    const mockProcessingData: ProcessingTimeData[] = [
      { stage: 'Initial Review', averageDays: 5, target: 7 },
      { stage: 'Technical Assessment', averageDays: 12, target: 14 },
      { stage: 'Environmental Review', averageDays: 18, target: 21 },
      { stage: 'Financial Evaluation', averageDays: 8, target: 10 },
      { stage: 'Final Approval', averageDays: 6, target: 7 }
    ];

    setTimeout(() => {
      setStatusData(mockStatusData);
      setTrendData(mockTrendData);
      setProcessingData(mockProcessingData);
      setIsLoading(false);
    }, 1000);
  }, [selectedPeriod]);

  const totalApplications = statusData.reduce((sum, item) => sum + item.count, 0);
  const approvalRate = statusData.find(item => item.status === 'Approved')?.percentage || 0;
  const rejectionRate = statusData.find(item => item.status === 'Rejected')?.percentage || 0;

  const COLORS = ['#FCD34D', '#60A5FA', '#34D399', '#F87171'];

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar 
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/status')}
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
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/status')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Status Overview</h1>
                <p className="text-gray-600">Monitor application processing status and performance metrics</p>
              </div>
              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+12% from last month</span>
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
                  <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{approvalRate.toFixed(1)}%</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+3.2% from last month</span>
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
                  <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
                  <p className="text-2xl font-bold text-gray-900">18 days</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">-2 days improvement</span>
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
                  <p className="text-sm font-medium text-gray-600">Overdue Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <div className="flex items-center mt-1">
                    <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">-3 from last week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Status Distribution Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percentage }) => `${status}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Processing Time Comparison */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Processing Time vs Target</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageDays" fill="#60A5FA" name="Actual Days" />
                    <Bar dataKey="target" fill="#34D399" name="Target Days" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Application Trends */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Application Trends Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="submitted" stroke="#8B5CF6" name="Submitted" strokeWidth={2} />
                  <Line type="monotone" dataKey="approved" stroke="#34D399" name="Approved" strokeWidth={2} />
                  <Line type="monotone" dataKey="rejected" stroke="#F87171" name="Rejected" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="#FCD34D" name="Pending" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Details Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Detailed Status Breakdown</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {statusData.map((item, index) => (
                    <tr key={item.status} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-3"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <div className="text-sm font-medium text-gray-900">{item.status}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.count}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.percentage}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: item.color 
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index % 2 === 0 ? (
                            <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm ml-1 ${
                            index % 2 === 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {index % 2 === 0 ? '+' : '-'}{Math.floor(Math.random() * 10) + 1}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 flex items-center">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusPage;