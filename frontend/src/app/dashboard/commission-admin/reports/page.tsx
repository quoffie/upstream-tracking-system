'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EnhancedDashboardLayout from '../../../components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../app/components/layouts/DashboardMenus';
import {
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  DocumentChartBarIcon,
  EyeIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface Report {
  id: string;
  title: string;
  description: string;
  category: 'Financial' | 'Operational' | 'Compliance' | 'Analytics' | 'Audit';
  type: 'Standard' | 'Custom' | 'Scheduled';
  lastGenerated: string;
  frequency: string;
  format: 'PDF' | 'Excel' | 'CSV';
  size: string;
  status: 'Ready' | 'Generating' | 'Failed';
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  estimatedTime: string;
  dataPoints: string[];
}

export default function CommissionAdminReports() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [activeTab, setActiveTab] = useState<'available' | 'templates' | 'scheduled'>('available');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login?redirect=/dashboard/commission-admin/reports');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'COMMISSION_ADMIN') {
        router.push('/dashboard');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login');
      return;
    }

    // Mock data
    const mockReports: Report[] = [
      {
        id: '1',
        title: 'Monthly Financial Summary',
        description: 'Comprehensive financial overview including revenue, fees, and transactions',
        category: 'Financial',
        type: 'Standard',
        lastGenerated: '2024-01-15 09:30',
        frequency: 'Monthly',
        format: 'PDF',
        size: '2.4 MB',
        status: 'Ready'
      },
      {
        id: '2',
        title: 'Application Processing Analytics',
        description: 'Analysis of application volumes, processing times, and approval rates',
        category: 'Operational',
        type: 'Standard',
        lastGenerated: '2024-01-14 16:45',
        frequency: 'Weekly',
        format: 'Excel',
        size: '1.8 MB',
        status: 'Ready'
      },
      {
        id: '3',
        title: 'Compliance Audit Report',
        description: 'Regulatory compliance status and audit findings',
        category: 'Compliance',
        type: 'Standard',
        lastGenerated: '2024-01-12 11:20',
        frequency: 'Quarterly',
        format: 'PDF',
        size: '3.1 MB',
        status: 'Ready'
      },
      {
        id: '4',
        title: 'User Activity Dashboard',
        description: 'System usage patterns and user engagement metrics',
        category: 'Analytics',
        type: 'Custom',
        lastGenerated: '2024-01-13 14:15',
        frequency: 'On-demand',
        format: 'CSV',
        size: '856 KB',
        status: 'Ready'
      },
      {
        id: '5',
        title: 'Security Audit Log',
        description: 'Security events, access logs, and system integrity checks',
        category: 'Audit',
        type: 'Scheduled',
        lastGenerated: '2024-01-15 08:00',
        frequency: 'Daily',
        format: 'PDF',
        size: '1.2 MB',
        status: 'Generating'
      },
      {
        id: '6',
        title: 'Local Content Performance',
        description: 'Local content compliance and performance metrics',
        category: 'Compliance',
        type: 'Standard',
        lastGenerated: '2024-01-10 13:30',
        frequency: 'Monthly',
        format: 'Excel',
        size: '2.7 MB',
        status: 'Ready'
      }
    ];

    const mockTemplates: ReportTemplate[] = [
      {
        id: 't1',
        name: 'Executive Summary',
        description: 'High-level overview for executive decision making',
        category: 'Executive',
        icon: DocumentChartBarIcon,
        estimatedTime: '5-10 minutes',
        dataPoints: ['KPIs', 'Financial Summary', 'Key Metrics', 'Trends']
      },
      {
        id: 't2',
        name: 'Financial Analysis',
        description: 'Detailed financial performance and revenue analysis',
        category: 'Financial',
        icon: CurrencyDollarIcon,
        estimatedTime: '10-15 minutes',
        dataPoints: ['Revenue', 'Fees', 'Transactions', 'Growth Rates']
      },
      {
        id: 't3',
        name: 'Operational Efficiency',
        description: 'Process efficiency and operational performance metrics',
        category: 'Operations',
        icon: ChartBarIcon,
        estimatedTime: '8-12 minutes',
        dataPoints: ['Processing Times', 'Approval Rates', 'Workflow Status']
      },
      {
        id: 't4',
        name: 'Compliance Status',
        description: 'Regulatory compliance and audit findings',
        category: 'Compliance',
        icon: ShieldCheckIcon,
        estimatedTime: '12-18 minutes',
        dataPoints: ['Compliance Rates', 'Violations', 'Corrective Actions']
      },
      {
        id: 't5',
        name: 'User Management',
        description: 'User activity, permissions, and system access analysis',
        category: 'Administration',
        icon: UsersIcon,
        estimatedTime: '6-10 minutes',
        dataPoints: ['User Activity', 'Access Logs', 'Permission Changes']
      },
      {
        id: 't6',
        name: 'Local Content Analysis',
        description: 'Local content compliance and performance tracking',
        category: 'Local Content',
        icon: GlobeAltIcon,
        estimatedTime: '15-20 minutes',
        dataPoints: ['LC Percentages', 'Compliance Status', 'Performance Trends']
      }
    ];

    setReports(mockReports);
    setTemplates(mockTemplates);
    setIsLoading(false);
  }, [router]);

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    const matchesType = selectedType === 'All' || report.type === selectedType;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-800';
      case 'Generating': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Financial': return 'bg-blue-100 text-blue-800';
      case 'Operational': return 'bg-green-100 text-green-800';
      case 'Compliance': return 'bg-purple-100 text-purple-800';
      case 'Analytics': return 'bg-orange-100 text-orange-800';
      case 'Audit': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <EnhancedDashboardLayout
        title="Reports Dashboard"
        userRole={user?.role || 'Commission Admin'}
        userName={user ? `${user.firstName} ${user.lastName}` : 'Admin Panel'}
        userInitials={user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'CA'}
        sidebarItems={getCommissionAdminMenuItems(pathname)}
      >
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </EnhancedDashboardLayout>
    );
  }

  return (
    <EnhancedDashboardLayout
        title="Reports Dashboard"
      userRole={user?.role || 'Commission Admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Admin Panel'}
      userInitials={user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'CA'}
      sidebarItems={getCommissionAdminMenuItems(pathname)}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-blue-100">Generate, view, and manage comprehensive reports for informed decision making</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{reports.filter(r => r.status === 'Ready').length}</div>
                <div className="text-sm text-gray-600">Ready to Download</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{reports.filter(r => r.type === 'Scheduled').length}</div>
                <div className="text-sm text-gray-600">Scheduled Reports</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DocumentChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{templates.length}</div>
                <div className="text-sm text-gray-600">Report Templates</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Reports</label>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                <option value="Financial">Financial</option>
                <option value="Operational">Operational</option>
                <option value="Compliance">Compliance</option>
                <option value="Analytics">Analytics</option>
                <option value="Audit">Audit</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Types</option>
                <option value="Standard">Standard</option>
                <option value="Custom">Custom</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generate New Report
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('available')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'available'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Available Reports ({filteredReports.length})
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Report Templates ({templates.length})
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scheduled'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Scheduled Reports
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Available Reports Tab */}
            {activeTab === 'available' && (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(report.category)}`}>
                            {report.category}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Last generated: {report.lastGenerated}</span>
                          <span>Frequency: {report.frequency}</span>
                          <span>Format: {report.format}</span>
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <ArrowDownTrayIcon className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                          <ShareIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Report Templates Tab */}
            {activeTab === 'templates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <span className="text-sm text-gray-500">{template.category}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Estimated time:</span> {template.estimatedTime}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Data points:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.dataPoints.map((point, index) => (
                              <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {point}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Generate Report
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Scheduled Reports Tab */}
            {activeTab === 'scheduled' && (
              <div className="space-y-4">
                {reports.filter(r => r.type === 'Scheduled').map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <p className="text-gray-600">{report.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <span>Frequency: {report.frequency}</span>
                          <span>Next run: {report.lastGenerated}</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          Edit Schedule
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Disable
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}