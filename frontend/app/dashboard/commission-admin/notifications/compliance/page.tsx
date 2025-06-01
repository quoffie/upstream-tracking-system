'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ShieldExclamationIcon,
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
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface ComplianceAlert {
  id: string;
  type: 'regulatory' | 'environmental' | 'safety' | 'financial' | 'operational';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  company: string;
  applicationId?: string;
  detectedDate: string;
  dueDate: string;
  status: 'active' | 'acknowledged' | 'resolved' | 'escalated';
  assignedTo: string;
  regulatoryReference?: string;
  riskLevel: number;
}

const ComplianceAlertsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [complianceAlerts, setComplianceAlerts] = useState<ComplianceAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<ComplianceAlert[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for compliance alerts
    const mockAlerts: ComplianceAlert[] = [
      {
        id: 'CA-001',
        type: 'environmental',
        severity: 'critical',
        title: 'Environmental Impact Assessment Expired',
        description: 'Environmental Impact Assessment for offshore drilling operations has expired and requires immediate renewal.',
        company: 'Ghana Oil Exploration Ltd',
        applicationId: 'APP-2024-001',
        detectedDate: '2024-01-15T08:30:00Z',
        dueDate: '2024-01-20T23:59:59Z',
        status: 'active',
        assignedTo: 'Dr. Kwame Asante',
        regulatoryReference: 'EPA-REG-2023-045',
        riskLevel: 95
      },
      {
        id: 'CA-002',
        type: 'safety',
        severity: 'high',
        title: 'Safety Training Certification Overdue',
        description: 'Mandatory safety training certifications for offshore personnel are overdue for renewal.',
        company: 'Tema Drilling Services',
        applicationId: 'APP-2024-003',
        detectedDate: '2024-01-14T14:20:00Z',
        dueDate: '2024-01-25T23:59:59Z',
        status: 'acknowledged',
        assignedTo: 'Eng. Akosua Mensah',
        regulatoryReference: 'OSH-REG-2023-012',
        riskLevel: 78
      },
      {
        id: 'CA-003',
        type: 'financial',
        severity: 'medium',
        title: 'Local Content Payment Discrepancy',
        description: 'Discrepancy detected in local content payment calculations for Q4 2023 reporting.',
        company: 'West Africa Energy Partners',
        applicationId: 'APP-2024-005',
        detectedDate: '2024-01-13T11:45:00Z',
        dueDate: '2024-01-30T23:59:59Z',
        status: 'active',
        assignedTo: 'Mr. Joseph Osei',
        regulatoryReference: 'LC-REG-2023-089',
        riskLevel: 65
      },
      {
        id: 'CA-004',
        type: 'regulatory',
        severity: 'high',
        title: 'Permit Conditions Non-Compliance',
        description: 'Company has not met the minimum local content requirements as specified in permit conditions.',
        company: 'International Oil Co.',
        applicationId: 'APP-2024-007',
        detectedDate: '2024-01-12T16:10:00Z',
        dueDate: '2024-01-22T23:59:59Z',
        status: 'escalated',
        assignedTo: 'Ms. Ama Serwaa',
        regulatoryReference: 'PC-REG-2023-156',
        riskLevel: 85
      },
      {
        id: 'CA-005',
        type: 'operational',
        severity: 'medium',
        title: 'Reporting Deadline Missed',
        description: 'Monthly operational report submission deadline has been missed for December 2023.',
        company: 'Accra Petroleum Services',
        applicationId: 'APP-2024-002',
        detectedDate: '2024-01-11T09:30:00Z',
        dueDate: '2024-01-18T23:59:59Z',
        status: 'resolved',
        assignedTo: 'Eng. Kofi Adjei',
        regulatoryReference: 'OR-REG-2023-234',
        riskLevel: 45
      },
      {
        id: 'CA-006',
        type: 'environmental',
        severity: 'low',
        title: 'Environmental Monitoring Data Incomplete',
        description: 'Some environmental monitoring data points are missing from the quarterly report.',
        company: 'Takoradi Marine Logistics',
        detectedDate: '2024-01-10T13:15:00Z',
        dueDate: '2024-01-28T23:59:59Z',
        status: 'active',
        assignedTo: 'Dr. Kwame Asante',
        regulatoryReference: 'EM-REG-2023-078',
        riskLevel: 25
      },
      {
        id: 'CA-007',
        type: 'safety',
        severity: 'critical',
        title: 'Emergency Response Plan Outdated',
        description: 'Emergency response plan has not been updated according to new safety regulations.',
        company: 'Ghana National Petroleum Corporation',
        applicationId: 'APP-2024-008',
        detectedDate: '2024-01-09T10:45:00Z',
        dueDate: '2024-01-19T23:59:59Z',
        status: 'active',
        assignedTo: 'Eng. Akosua Mensah',
        regulatoryReference: 'ERP-REG-2023-201',
        riskLevel: 92
      }
    ];

    setTimeout(() => {
      setComplianceAlerts(mockAlerts);
      setFilteredAlerts(mockAlerts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = complianceAlerts;
    
    if (filterType !== 'all') {
      result = result.filter(alert => alert.type === filterType);
    }
    
    if (filterSeverity !== 'all') {
      result = result.filter(alert => alert.severity === filterSeverity);
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(alert => alert.status === filterStatus);
    }
    
    if (searchTerm) {
      result = result.filter(alert => 
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAlerts(result);
  }, [complianceAlerts, filterType, filterSeverity, filterStatus, searchTerm]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
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
      case 'escalated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ArrowPathIcon className="h-3 w-3 mr-1" />
            Escalated
          </span>
        );
      case 'acknowledged':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <EyeIcon className="h-3 w-3 mr-1" />
            Acknowledged
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <BellIcon className="h-3 w-3 mr-1" />
            Active
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'environmental':
        return '🌍';
      case 'safety':
        return '⚠️';
      case 'financial':
        return '💰';
      case 'regulatory':
        return '📋';
      case 'operational':
        return '⚙️';
      default:
        return '📄';
    }
  };

  const getRiskLevelColor = (riskLevel: number) => {
    if (riskLevel >= 80) return 'bg-red-500';
    if (riskLevel >= 60) return 'bg-orange-500';
    if (riskLevel >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
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

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else {
      return `${diffDays} days remaining`;
    }
  };

  const handleAlertAction = (alertId: string, action: 'acknowledge' | 'resolve' | 'escalate') => {
    setComplianceAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: action === 'acknowledge' ? 'acknowledged' : action === 'resolve' ? 'resolved' : 'escalated' }
          : alert
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/compliance')}
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
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/compliance')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Alerts</h1>
            <p className="text-gray-600">Monitor and manage compliance violations and regulatory alerts</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {complianceAlerts.filter(a => a.severity === 'critical').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {complianceAlerts.filter(a => a.severity === 'high').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BellIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {complianceAlerts.filter(a => a.status === 'active').length}
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
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {complianceAlerts.filter(a => a.status === 'resolved').length}
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
                    placeholder="Search alerts..."
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
                  <option value="environmental">Environmental</option>
                  <option value="safety">Safety</option>
                  <option value="financial">Financial</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="operational">Operational</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="all">All Severities</option>
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
                  <option value="active">Active</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="resolved">Resolved</option>
                  <option value="escalated">Escalated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No compliance alerts match your filters</p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
                <div key={alert.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-2xl">{getTypeIcon(alert.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                            {getSeverityBadge(alert.severity)}
                            {getStatusBadge(alert.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-1" />
                              {alert.company}
                            </span>
                            {alert.applicationId && (
                              <span className="flex items-center">
                                <DocumentTextIcon className="h-4 w-4 mr-1" />
                                {alert.applicationId}
                              </span>
                            )}
                            {alert.regulatoryReference && (
                              <span className="flex items-center">
                                <ShieldExclamationIcon className="h-4 w-4 mr-1" />
                                {alert.regulatoryReference}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end mb-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            Due: {formatDate(alert.dueDate)}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          {getDaysRemaining(alert.dueDate)}
                        </div>
                        <div className="flex items-center justify-end">
                          <span className="text-xs text-gray-500 mr-2">Risk Level:</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getRiskLevelColor(alert.riskLevel)}`}
                              style={{ width: `${alert.riskLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700 ml-1">{alert.riskLevel}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          Assigned to: {alert.assignedTo}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {alert.status === 'active' && (
                          <>
                            <button 
                              onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <EyeIcon className="h-4 w-4 mr-1" />
                              Acknowledge
                            </button>
                            <button 
                              onClick={() => handleAlertAction(alert.id, 'escalate')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <ArrowPathIcon className="h-4 w-4 mr-1" />
                              Escalate
                            </button>
                          </>
                        )}
                        {(alert.status === 'acknowledged' || alert.status === 'escalated') && (
                          <button 
                            onClick={() => handleAlertAction(alert.id, 'resolve')}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Mark Resolved
                          </button>
                        )}
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
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

export default ComplianceAlertsPage;