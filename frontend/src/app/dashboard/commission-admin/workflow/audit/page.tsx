'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import { 
  ClockIcon,
  UserIcon,
  DocumentTextIcon,
  EyeIcon,
  FunnelIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface AuditEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  entityType: 'Application' | 'User' | 'System' | 'Document' | 'Workflow';
  entityId: string;
  entityName: string;
  description: string;
  ipAddress: string;
  userAgent: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Success' | 'Failed' | 'Warning';
  details: Record<string, any>;
}

interface AuditFilters {
  searchTerm: string;
  userId: string;
  action: string;
  entityType: string;
  severity: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

export default function WorkflowAuditPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarItems = getCommissionAdminMenuItems(pathname);

  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<AuditEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState<AuditFilters>({
    searchTerm: '',
    userId: '',
    action: '',
    entityType: '',
    severity: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock audit data
    const mockAuditEntries: AuditEntry[] = [
      {
        id: 'AUDIT-001',
        timestamp: '2024-01-25T10:30:00Z',
        userId: 'user-001',
        userName: 'John Smith',
        userRole: 'Reviewer',
        action: 'Application Approved',
        entityType: 'Application',
        entityId: 'APP-2024-001',
        entityName: 'TechDrill Solutions - Drilling Permit',
        description: 'Application APP-2024-001 was approved after review',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Medium',
        status: 'Success',
        details: {
          previousStatus: 'Under Review',
          newStatus: 'Approved',
          reviewComments: 'All requirements met',
          approvalCode: 'APR-2024-001'
        }
      },
      {
        id: 'AUDIT-002',
        timestamp: '2024-01-25T09:15:00Z',
        userId: 'user-002',
        userName: 'Sarah Johnson',
        userRole: 'Inspector',
        action: 'Document Upload',
        entityType: 'Document',
        entityId: 'DOC-2024-015',
        entityName: 'Environmental Impact Assessment',
        description: 'New document uploaded for application APP-2024-002',
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Low',
        status: 'Success',
        details: {
          fileName: 'environmental_impact_assessment.pdf',
          fileSize: '2.5MB',
          documentType: 'Environmental Assessment',
          applicationId: 'APP-2024-002'
        }
      },
      {
        id: 'AUDIT-003',
        timestamp: '2024-01-25T08:45:00Z',
        userId: 'system',
        userName: 'System',
        userRole: 'System',
        action: 'Automated Reminder',
        entityType: 'System',
        entityId: 'SYS-REMINDER-001',
        entityName: 'Application Review Deadline',
        description: 'Automated reminder sent for overdue application review',
        ipAddress: '127.0.0.1',
        userAgent: 'System/1.0',
        severity: 'Medium',
        status: 'Success',
        details: {
          applicationId: 'APP-2024-003',
          daysOverdue: 3,
          reminderType: 'Email',
          recipientCount: 2
        }
      },
      {
        id: 'AUDIT-004',
        timestamp: '2024-01-24T16:20:00Z',
        userId: 'user-003',
        userName: 'Michael Brown',
        userRole: 'Commission Admin',
        action: 'User Role Modified',
        entityType: 'User',
        entityId: 'user-004',
        entityName: 'Emily Davis',
        description: 'User role changed from Reviewer to Senior Reviewer',
        ipAddress: '192.168.1.110',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'High',
        status: 'Success',
        details: {
          previousRole: 'Reviewer',
          newRole: 'Senior Reviewer',
          modifiedBy: 'Michael Brown',
          reason: 'Promotion due to performance'
        }
      },
      {
        id: 'AUDIT-005',
        timestamp: '2024-01-24T14:10:00Z',
        userId: 'user-005',
        userName: 'Lisa Wilson',
        userRole: 'Finance Officer',
        action: 'Login Failed',
        entityType: 'System',
        entityId: 'LOGIN-ATTEMPT-001',
        entityName: 'Authentication System',
        description: 'Failed login attempt - incorrect password',
        ipAddress: '192.168.1.115',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Medium',
        status: 'Failed',
        details: {
          attemptCount: 3,
          lockoutTriggered: false,
          failureReason: 'Invalid credentials'
        }
      },
      {
        id: 'AUDIT-006',
        timestamp: '2024-01-24T13:30:00Z',
        userId: 'user-006',
        userName: 'Robert Taylor',
        userRole: 'Reviewer',
        action: 'Application Rejected',
        entityType: 'Application',
        entityId: 'APP-2024-005',
        entityName: 'Petroleum Logistics - Transport License',
        description: 'Application rejected due to incomplete documentation',
        ipAddress: '192.168.1.120',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Medium',
        status: 'Success',
        details: {
          previousStatus: 'Under Review',
          newStatus: 'Rejected',
          rejectionReason: 'Incomplete environmental documentation',
          requiredActions: ['Submit environmental impact study', 'Provide safety certifications']
        }
      }
    ];

    setAuditEntries(mockAuditEntries);
    setFilteredEntries(mockAuditEntries);
    setIsLoading(false);
  }, []);

  const applyFilters = () => {
    let filtered = auditEntries.filter(entry => {
      const matchesSearch = !filters.searchTerm || 
        entry.userName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        entry.action.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        entry.entityName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesUserId = !filters.userId || entry.userId === filters.userId;
      const matchesAction = !filters.action || entry.action === filters.action;
      const matchesEntityType = !filters.entityType || entry.entityType === filters.entityType;
      const matchesSeverity = !filters.severity || entry.severity === filters.severity;
      const matchesStatus = !filters.status || entry.status === filters.status;
      
      const matchesDateFrom = !filters.dateFrom || new Date(entry.timestamp) >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || new Date(entry.timestamp) <= new Date(filters.dateTo);
      
      return matchesSearch && matchesUserId && matchesAction && matchesEntityType && 
             matchesSeverity && matchesStatus && matchesDateFrom && matchesDateTo;
    });
    
    setFilteredEntries(filtered);
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      userId: '',
      action: '',
      entityType: '',
      severity: '',
      status: '',
      dateFrom: '',
      dateTo: ''
    });
    setFilteredEntries(auditEntries);
  };

  const exportAuditLog = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Role', 'Action', 'Entity Type', 'Entity Name', 'Status', 'Severity', 'IP Address'].join(','),
      ...filteredEntries.map(entry => [
        entry.timestamp,
        entry.userName,
        entry.userRole,
        entry.action,
        entry.entityType,
        entry.entityName,
        entry.status,
        entry.severity,
        entry.ipAddress
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'Failed': return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case 'Warning': return <ExclamationCircleIcon className="h-5 w-5 text-yellow-600" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading audit trail...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Workflow Audit Trail"
      userRole="Commission Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Audit Trail</h1>
              <p className="text-gray-600 mt-1">Track and monitor all system activities and user actions</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportAuditLog}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                Export
              </button>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user, action, entity, or description..."
                value={filters.searchTerm}
                onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
                  <select
                    value={filters.entityType}
                    onChange={(e) => setFilters({...filters, entityType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="Application">Application</option>
                    <option value="User">User</option>
                    <option value="System">System</option>
                    <option value="Document">Document</option>
                    <option value="Workflow">Workflow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select
                    value={filters.severity}
                    onChange={(e) => setFilters({...filters, severity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Severities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="Success">Success</option>
                    <option value="Failed">Failed</option>
                    <option value="Warning">Warning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Audit Entries */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Audit Entries ({filteredEntries.length} entries)
            </h2>
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{entry.userName}</div>
                          <div className="text-sm text-gray-500">{entry.userRole}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{entry.entityType}</div>
                        <div className="text-sm text-gray-500">{entry.entityName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(entry.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                          {entry.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(entry.severity)}`}>
                        {entry.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedEntry(entry);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && selectedEntry && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Audit Entry Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                    <p className="text-sm text-gray-900">{new Date(selectedEntry.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User</label>
                    <p className="text-sm text-gray-900">{selectedEntry.userName} ({selectedEntry.userRole})</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Action</label>
                    <p className="text-sm text-gray-900">{selectedEntry.action}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Entity</label>
                    <p className="text-sm text-gray-900">{selectedEntry.entityType}: {selectedEntry.entityName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IP Address</label>
                    <p className="text-sm text-gray-900">{selectedEntry.ipAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEntry.status)}`}>
                      {selectedEntry.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedEntry.description}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Details</label>
                  <pre className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(selectedEntry.details, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}