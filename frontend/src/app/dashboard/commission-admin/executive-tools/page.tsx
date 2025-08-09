'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

interface ExecutiveTool {
  id: string;
  name: string;
  description: string;
  category: 'analytics' | 'reporting' | 'management' | 'compliance' | 'strategic';
  icon: React.ComponentType<any>;
  href: string;
  status: 'active' | 'maintenance' | 'new';
  lastUsed?: string;
  usage: number;
}

interface QuickMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
}

export default function ExecutiveToolsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const executiveTools: ExecutiveTool[] = [
    {
      id: '1',
      name: 'Strategic Dashboard',
      description: 'Comprehensive overview of key performance indicators and strategic metrics',
      category: 'analytics',
      icon: PresentationChartLineIcon,
      href: '/dashboard/commission-admin/executive-tools/strategic-dashboard',
      status: 'active',
      lastUsed: '2024-01-15T10:30:00Z',
      usage: 95
    },
    {
      id: '2',
      name: 'Executive Reports Generator',
      description: 'Generate comprehensive executive reports for board meetings and stakeholders',
      category: 'reporting',
      icon: DocumentChartBarIcon,
      href: '/dashboard/commission-admin/executive-tools/report-generator',
      status: 'active',
      lastUsed: '2024-01-14T16:20:00Z',
      usage: 87
    },
    {
      id: '3',
      name: 'Industry Benchmarking',
      description: 'Compare performance metrics against industry standards and competitors',
      category: 'analytics',
      icon: ChartBarIcon,
      href: '/dashboard/commission-admin/executive-tools/benchmarking',
      status: 'active',
      lastUsed: '2024-01-13T14:15:00Z',
      usage: 78
    },
    {
      id: '4',
      name: 'Risk Assessment Matrix',
      description: 'Comprehensive risk analysis and mitigation planning tools',
      category: 'strategic',
      icon: ShieldCheckIcon,
      href: '/dashboard/commission-admin/executive-tools/risk-assessment',
      status: 'active',
      lastUsed: '2024-01-12T11:45:00Z',
      usage: 82
    },
    {
      id: '5',
      name: 'Stakeholder Management',
      description: 'Manage relationships with key stakeholders, government officials, and partners',
      category: 'management',
      icon: UserGroupIcon,
      href: '/dashboard/commission-admin/executive-tools/stakeholder-management',
      status: 'active',
      lastUsed: '2024-01-11T09:30:00Z',
      usage: 71
    },
    {
      id: '6',
      name: 'Policy Impact Analyzer',
      description: 'Analyze the impact of regulatory changes and policy decisions',
      category: 'strategic',
      icon: GlobeAltIcon,
      href: '/dashboard/commission-admin/executive-tools/policy-analyzer',
      status: 'new',
      usage: 23
    },
    {
      id: '7',
      name: 'Financial Forecasting',
      description: 'Advanced financial modeling and revenue forecasting tools',
      category: 'analytics',
      icon: CurrencyDollarIcon,
      href: '/dashboard/commission-admin/executive-tools/financial-forecasting',
      status: 'active',
      lastUsed: '2024-01-10T15:20:00Z',
      usage: 89
    },
    {
      id: '8',
      name: 'Compliance Oversight',
      description: 'Monitor compliance across all operators and regulatory requirements',
      category: 'compliance',
      icon: CheckCircleIcon,
      href: '/dashboard/commission-admin/executive-tools/compliance-oversight',
      status: 'active',
      lastUsed: '2024-01-09T13:10:00Z',
      usage: 76
    },
    {
      id: '9',
      name: 'Meeting Scheduler & Agenda',
      description: 'Schedule executive meetings and manage agendas with stakeholders',
      category: 'management',
      icon: CalendarIcon,
      href: '/dashboard/commission-admin/executive-tools/meeting-scheduler',
      status: 'active',
      lastUsed: '2024-01-08T10:00:00Z',
      usage: 64
    },
    {
      id: '10',
      name: 'Crisis Management Center',
      description: 'Coordinate response to critical incidents and emergency situations',
      category: 'management',
      icon: ExclamationTriangleIcon,
      href: '/dashboard/commission-admin/executive-tools/crisis-management',
      status: 'maintenance',
      usage: 45
    },
    {
      id: '11',
      name: 'Strategic Planning Workspace',
      description: 'Collaborative workspace for long-term strategic planning and goal setting',
      category: 'strategic',
      icon: BuildingOfficeIcon,
      href: '/dashboard/commission-admin/executive-tools/strategic-planning',
      status: 'active',
      lastUsed: '2024-01-07T14:30:00Z',
      usage: 58
    },
    {
      id: '12',
      name: 'Executive Notifications',
      description: 'Centralized notification system for critical alerts and updates',
      category: 'management',
      icon: BellIcon,
      href: '/dashboard/commission-admin/executive-tools/notifications',
      status: 'active',
      lastUsed: '2024-01-15T08:45:00Z',
      usage: 92
    }
  ];

  const quickMetrics: QuickMetric[] = [
    {
      id: '1',
      label: 'Active Tools',
      value: '10',
      change: '+2',
      trend: 'up',
      icon: CogIcon
    },
    {
      id: '2',
      label: 'Daily Usage',
      value: '847',
      change: '+12%',
      trend: 'up',
      icon: ArrowTrendingUpIcon
    },
    {
      id: '3',
      label: 'Reports Generated',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: DocumentTextIcon
    },
    {
      id: '4',
      label: 'System Health',
      value: '98.5%',
      change: '+0.2%',
      trend: 'up',
      icon: CheckCircleIcon
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'analytics': return 'border-blue-500 bg-blue-50';
      case 'reporting': return 'border-green-500 bg-green-50';
      case 'management': return 'border-purple-500 bg-purple-50';
      case 'compliance': return 'border-red-500 bg-red-50';
      case 'strategic': return 'border-yellow-500 bg-yellow-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const filteredTools = selectedCategory === 'all' 
    ? executiveTools 
    : executiveTools.filter(tool => tool.category === selectedCategory);

  const formatLastUsed = (dateString?: string) => {
    if (!dateString) return 'Never used';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <h1 className="text-3xl font-bold text-gray-900">Executive Tools</h1>
              <p className="text-gray-600 mt-2">Advanced tools and analytics for executive decision making</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/commission-admin/executive-tools/settings')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CogIcon className="h-4 w-4 mr-2" />
              Tool Settings
            </button>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div key={metric.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                      <span className={`ml-2 text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Tools
              </button>
              {['analytics', 'reporting', 'management', 'compliance', 'strategic'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <div
                key={tool.id}
                className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${
                  getCategoryColor(tool.category)
                }`}
                onClick={() => router.push(tool.href)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${
                        tool.category === 'analytics' ? 'bg-blue-100' :
                        tool.category === 'reporting' ? 'bg-green-100' :
                        tool.category === 'management' ? 'bg-purple-100' :
                        tool.category === 'compliance' ? 'bg-red-100' :
                        tool.category === 'strategic' ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-6 w-6 ${
                          tool.category === 'analytics' ? 'text-blue-600' :
                          tool.category === 'reporting' ? 'text-green-600' :
                          tool.category === 'management' ? 'text-purple-600' :
                          tool.category === 'compliance' ? 'text-red-600' :
                          tool.category === 'strategic' ? 'text-yellow-600' : 'text-gray-600'
                        }`} />
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      getStatusColor(tool.status)
                    }`}>
                      {tool.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{formatLastUsed(tool.lastUsed)}</span>
                    </div>
                    <div className="flex items-center">
                      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                      <span>{tool.usage}% usage</span>
                    </div>
                  </div>
                  
                  {/* Usage Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          tool.usage >= 80 ? 'bg-green-500' :
                          tool.usage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${tool.usage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/dashboard/commission-admin/executive-tools/report-generator')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Generate Executive Report</p>
                  <p className="text-sm text-gray-500">Create comprehensive reports</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/executive-tools/strategic-dashboard')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ChartBarIcon className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">View Strategic Dashboard</p>
                  <p className="text-sm text-gray-500">Access key metrics</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/executive-tools/meeting-scheduler')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CalendarIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Schedule Meeting</p>
                  <p className="text-sm text-gray-500">Plan stakeholder meetings</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}