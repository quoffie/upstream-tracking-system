'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ComputerDesktopIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ClockIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  FunnelIcon,
  BellIcon,
  ArrowDownTrayIcon,
  CogIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

interface SystemUpdate {
  id: string;
  type: 'security' | 'feature' | 'bugfix' | 'maintenance' | 'critical';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  version: string;
  releaseDate: string;
  scheduledDate?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed' | 'rollback';
  affectedSystems: string[];
  downtime: number; // in minutes
  rollbackPlan: boolean;
  approvedBy: string;
  technicalContact: string;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
}

const SystemUpdatesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [systemUpdates, setSystemUpdates] = useState<SystemUpdate[]>([]);
  const [filteredUpdates, setFilteredUpdates] = useState<SystemUpdate[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for system updates
    const mockUpdates: SystemUpdate[] = [
      {
        id: 'SU-001',
        type: 'security',
        priority: 'critical',
        title: 'Critical Security Patch - Authentication System',
        description: 'Security vulnerability fix for authentication system to prevent unauthorized access attempts.',
        version: '2.4.1',
        releaseDate: '2024-01-15T20:00:00Z',
        scheduledDate: '2024-01-16T02:00:00Z',
        status: 'scheduled',
        affectedSystems: ['Authentication Service', 'User Management', 'API Gateway'],
        downtime: 30,
        rollbackPlan: true,
        approvedBy: 'System Administrator',
        technicalContact: 'DevOps Team',
        impactLevel: 'high'
      },
      {
        id: 'SU-002',
        type: 'feature',
        priority: 'medium',
        title: 'Enhanced Reporting Dashboard',
        description: 'New analytics features and improved performance for the reporting dashboard module.',
        version: '2.3.5',
        releaseDate: '2024-01-14T18:00:00Z',
        status: 'completed',
        affectedSystems: ['Reporting Module', 'Analytics Engine', 'Dashboard UI'],
        downtime: 15,
        rollbackPlan: true,
        approvedBy: 'Product Manager',
        technicalContact: 'Frontend Team',
        impactLevel: 'low'
      },
      {
        id: 'SU-003',
        type: 'maintenance',
        priority: 'medium',
        title: 'Database Optimization and Cleanup',
        description: 'Scheduled database maintenance to optimize performance and clean up old records.',
        version: '2.3.4',
        releaseDate: '2024-01-13T01:00:00Z',
        status: 'completed',
        affectedSystems: ['Database Server', 'Application Backend', 'Backup Systems'],
        downtime: 120,
        rollbackPlan: false,
        approvedBy: 'Database Administrator',
        technicalContact: 'Database Team',
        impactLevel: 'medium'
      },
      {
        id: 'SU-004',
        type: 'bugfix',
        priority: 'high',
        title: 'Payment Processing Error Fix',
        description: 'Fix for intermittent payment processing errors affecting transaction completion.',
        version: '2.3.3',
        releaseDate: '2024-01-12T16:30:00Z',
        status: 'failed',
        affectedSystems: ['Payment Gateway', 'Transaction Processing', 'Financial Module'],
        downtime: 45,
        rollbackPlan: true,
        approvedBy: 'Technical Lead',
        technicalContact: 'Backend Team',
        impactLevel: 'high'
      },
      {
        id: 'SU-005',
        type: 'critical',
        priority: 'critical',
        title: 'Emergency System Patch',
        description: 'Emergency patch to address critical system vulnerability discovered in production.',
        version: '2.3.2-hotfix',
        releaseDate: '2024-01-11T14:00:00Z',
        status: 'rollback',
        affectedSystems: ['Core System', 'Security Module', 'All User Interfaces'],
        downtime: 90,
        rollbackPlan: true,
        approvedBy: 'CTO',
        technicalContact: 'Emergency Response Team',
        impactLevel: 'critical'
      },
      {
        id: 'SU-006',
        type: 'feature',
        priority: 'low',
        title: 'UI/UX Improvements',
        description: 'Minor user interface improvements and accessibility enhancements.',
        version: '2.3.1',
        releaseDate: '2024-01-10T12:00:00Z',
        status: 'completed',
        affectedSystems: ['Frontend UI', 'Mobile App', 'User Dashboard'],
        downtime: 5,
        rollbackPlan: true,
        approvedBy: 'UX Manager',
        technicalContact: 'Frontend Team',
        impactLevel: 'low'
      },
      {
        id: 'SU-007',
        type: 'maintenance',
        priority: 'medium',
        title: 'Server Infrastructure Upgrade',
        description: 'Scheduled upgrade of server infrastructure to improve system performance and reliability.',
        version: '2.4.0',
        releaseDate: '2024-01-18T03:00:00Z',
        scheduledDate: '2024-01-18T03:00:00Z',
        status: 'scheduled',
        affectedSystems: ['Web Servers', 'Application Servers', 'Load Balancers'],
        downtime: 180,
        rollbackPlan: true,
        approvedBy: 'Infrastructure Manager',
        technicalContact: 'Infrastructure Team',
        impactLevel: 'medium'
      }
    ];

    setTimeout(() => {
      setSystemUpdates(mockUpdates);
      setFilteredUpdates(mockUpdates);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = systemUpdates;
    
    if (filterType !== 'all') {
      result = result.filter(update => update.type === filterType);
    }
    
    if (filterPriority !== 'all') {
      result = result.filter(update => update.priority === filterPriority);
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(update => update.status === filterStatus);
    }
    
    if (searchTerm) {
      result = result.filter(update => 
        update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
        update.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUpdates(result);
  }, [systemUpdates, filterType, filterPriority, filterStatus, searchTerm]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CogIcon className="h-3 w-3 mr-1" />
            In Progress
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Failed
          </span>
        );
      case 'rollback':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <ArrowDownTrayIcon className="h-3 w-3 mr-1" />
            Rollback
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            Scheduled
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <ShieldCheckIcon className="h-5 w-5 text-red-600" />;
      case 'feature':
        return <CogIcon className="h-5 w-5 text-blue-600" />;
      case 'bugfix':
        return <WrenchScrewdriverIcon className="h-5 w-5 text-orange-600" />;
      case 'maintenance':
        return <ComputerDesktopIcon className="h-5 w-5 text-purple-600" />;
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDowntime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/system')}
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
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/system')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">System Updates</h1>
            <p className="text-gray-600">Monitor system updates, maintenance schedules, and deployment status</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemUpdates.filter(u => u.status === 'scheduled').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CogIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemUpdates.filter(u => u.status === 'in_progress').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemUpdates.filter(u => u.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Updates</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {systemUpdates.filter(u => u.priority === 'critical').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search updates..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="security">Security</option>
                  <option value="feature">Feature</option>
                  <option value="bugfix">Bug Fix</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="rollback">Rollback</option>
                </select>
              </div>
            </div>
          </div>

          {/* Updates List */}
          <div className="space-y-4">
            {filteredUpdates.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No system updates match your filters</p>
              </div>
            ) : (
              filteredUpdates.map((update) => (
                <div key={update.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(update.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{update.title}</h3>
                            {getPriorityBadge(update.priority)}
                            {getStatusBadge(update.status)}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              v{update.version}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{update.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="flex items-center mb-2">
                                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Release: {formatDate(update.releaseDate)}
                                </span>
                              </div>
                              {update.scheduledDate && (
                                <div className="flex items-center mb-2">
                                  <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <span className="text-gray-600">
                                    Scheduled: {formatDate(update.scheduledDate)}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center mb-2">
                                <ComputerDesktopIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Downtime: {formatDowntime(update.downtime)}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex items-center mb-2">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Approved by: {update.approvedBy}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Contact: {update.technicalContact}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(update.impactLevel)}`}>
                                  Impact: {update.impactLevel.toUpperCase()}
                                </span>
                                {update.rollbackPlan && (
                                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <ShieldCheckIcon className="h-3 w-3 mr-1" />
                                    Rollback Plan
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Affected Systems:</p>
                            <div className="flex flex-wrap gap-1">
                              {update.affectedSystems.map((system, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {system}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-end">
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                          Download Log
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUpdatesPage;