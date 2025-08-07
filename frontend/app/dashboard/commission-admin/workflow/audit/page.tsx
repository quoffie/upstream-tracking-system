'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  entityType: 'application' | 'document' | 'approval' | 'user' | 'system';
  entityId: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'success' | 'failed' | 'warning';
}

const WorkflowAuditPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<string>('7days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock audit logs data
    const mockLogs: AuditLog[] = [
      {
        id: 'AUDIT-001',
        timestamp: '2024-01-15T14:30:00Z',
        userId: 'USR-001',
        userName: 'Eng. Akosua Mensah',
        userRole: 'Technical Reviewer',
        action: 'Document Approved',
        entityType: 'document',
        entityId: 'DOC-2024-001',
        description: 'Approved technical specifications document for APP-2024-001',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        changes: [
          { field: 'status', oldValue: 'pending', newValue: 'approved' },
          { field: 'reviewer', oldValue: '', newValue: 'Eng. Akosua Mensah' }
        ],
        severity: 'medium',
        status: 'success'
      },
      {
        id: 'AUDIT-002',
        timestamp: '2024-01-15T13:15:00Z',
        userId: 'USR-002',
        userName: 'Mr. Joseph Osei',
        userRole: 'Financial Analyst',
        action: 'Application Status Changed',
        entityType: 'application',
        entityId: 'APP-2024-002',
        description: 'Changed application status from under_review to requires_revision',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        changes: [
          { field: 'status', oldValue: 'under_review', newValue: 'requires_revision' },
          { field: 'comments', oldValue: '', newValue: 'Missing financial documentation' }
        ],
        severity: 'medium',
        status: 'success'
      },
      {
        id: 'AUDIT-003',
        timestamp: '2024-01-15T12:00:00Z',
        userId: 'SYS-001',
        userName: 'System',
        userRole: 'System',
        action: 'Failed Login Attempt',
        entityType: 'user',
        entityId: 'USR-003',
        description: 'Multiple failed login attempts detected for user account',
        ipAddress: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (Linux; Android 10)',
        severity: 'high',
        status: 'failed'
      },
      {
        id: 'AUDIT-004',
        timestamp: '2024-01-15T11:45:00Z',
        userId: 'USR-004',
        userName: 'Dr. Kwame Asante',
        userRole: 'Environmental Specialist',
        action: 'Document Rejected',
        entityType: 'document',
        entityId: 'DOC-2024-003',
        description: 'Rejected Environmental Impact Assessment document',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        changes: [
          { field: 'status', oldValue: 'pending', newValue: 'rejected' },
          { field: 'rejection_reason', oldValue: '', newValue: 'Incomplete environmental data' }
        ],
        severity: 'medium',
        status: 'success'
      },
      {
        id: 'AUDIT-005',
        timestamp: '2024-01-15T10:30:00Z',
        userId: 'USR-005',
        userName: 'Ms. Ama Serwaa',
        userRole: 'Commission Admin',
        action: 'User Role Modified',
        entityType: 'user',
        entityId: 'USR-006',
        description: 'Updated user permissions and role assignments',
        ipAddress: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        changes: [
          { field: 'role', oldValue: 'Reviewer', newValue: 'Senior Reviewer' },
          { field: 'permissions', oldValue: 'read,write', newValue: 'read,write,approve' }
        ],
        severity: 'high',
        status: 'success'
      },
      {
        id: 'AUDIT-006',
        timestamp: '2024-01-15T09:15:00Z',
        userId: 'SYS-001',
        userName: 'System',
        userRole: 'System',
        action: 'Database Backup',
        entityType: 'system',
        entityId: 'DB-BACKUP-001',
        description: 'Automated daily database backup completed successfully',
        ipAddress: '192.168.1.100',
        userAgent: 'System/1.0',
        severity: 'low',
        status: 'success'
      },
      {
        id: 'AUDIT-007',
        timestamp: '2024-01-14T16:20:00Z',
        userId: 'USR-007',
        userName: 'Admin User',
        userRole: 'System Administrator',
        action: 'System Configuration Changed',
        entityType: 'system',
        entityId: 'CONFIG-001',
        description: 'Updated system security settings and timeout configurations',
        ipAddress: '192.168.1.104',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        changes: [
          { field: 'session_timeout', oldValue: '30', newValue: '60' },
          { field: 'password_policy', oldValue: 'standard', newValue: 'strict' }
        ],
        severity: 'critical',
        status: 'success'
      }
    ];

    setTimeout(() => {
      setAuditLogs(mockLogs);
      setIsLoading(false);
    }, 1000);
  }, [dateRange]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />;
      case 'medium':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'application':
        return '📋';
      case 'document':
        return '📄';
      case 'approval':
        return '✅';
      case 'user':
        return '👤';
      default:
        return '⚙️';
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    const matchesEntity = filterEntity === 'all' || log.entityType === filterEntity;
    const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesSearch = searchTerm === '' || 
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAction && matchesEntity && matchesSeverity && matchesSearch;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/workflow/audit')}
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
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/workflow/audit')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Audit Trail</h1>
            <p className="text-gray-600">Monitor and track all system activities and user actions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical Events</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {auditLogs.filter(log => log.severity === 'critical').length}
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
                  <p className="text-sm font-medium text-gray-600">Successful Actions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {auditLogs.filter(log => log.status === 'success').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <UserIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(auditLogs.map(log => log.userId)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by description, user, or entity ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterEntity}
                  onChange={(e) => setFilterEntity(e.target.value)}
                >
                  <option value="all">All Entities</option>
                  <option value="application">Applications</option>
                  <option value="document">Documents</option>
                  <option value="approval">Approvals</option>
                  <option value="user">Users</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="all">All Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="1day">Last 24 Hours</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Audit Logs</h3>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export Logs
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          {formatDate(log.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                          <div className="text-sm text-gray-500">{log.userRole}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{log.action}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{log.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getEntityIcon(log.entityType)}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900 capitalize">{log.entityType}</div>
                            <div className="text-sm text-gray-500">{log.entityId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getSeverityIcon(log.severity)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(log.severity)}`}>
                            {log.severity.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(log.status)}
                          <span className="ml-1 text-sm text-gray-900 capitalize">{log.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          Details
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

      {/* Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Audit Log Details</h3>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event ID</label>
                    <p className="text-sm text-gray-900">{selectedLog.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedLog.timestamp)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User</label>
                    <p className="text-sm text-gray-900">{selectedLog.userName} ({selectedLog.userRole})</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IP Address</label>
                    <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Action</label>
                  <p className="text-sm text-gray-900">{selectedLog.action}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedLog.description}</p>
                </div>
                
                {selectedLog.changes && selectedLog.changes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Changes Made</label>
                    <div className="bg-gray-50 rounded-lg p-3">
                      {selectedLog.changes.map((change, index) => (
                        <div key={index} className="mb-2 last:mb-0">
                          <div className="text-sm font-medium text-gray-700">{change.field}</div>
                          <div className="text-xs text-gray-500">
                            <span className="line-through text-red-600">{change.oldValue || '(empty)'}</span>
                            {' → '}
                            <span className="text-green-600">{change.newValue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">User Agent</label>
                  <p className="text-xs text-gray-500 break-all">{selectedLog.userAgent}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowAuditPage;