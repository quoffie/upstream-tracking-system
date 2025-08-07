'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
  };
  action: string;
  category: 'Authentication' | 'Data Access' | 'System Changes' | 'User Management' | 'Application Processing' | 'Financial' | 'Security';
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Success' | 'Failed' | 'Warning';
  metadata?: Record<string, any>;
}

interface AuditSummary {
  totalLogs: number;
  todayLogs: number;
  criticalEvents: number;
  failedAttempts: number;
  uniqueUsers: number;
  topActions: { action: string; count: number }[];
  securityAlerts: number;
  complianceScore: number;
}

export default function AuditLogsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [auditSummary, setAuditSummary] = useState<AuditSummary | null>(null);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState('7');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState<'timestamp' | 'severity' | 'user'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock audit logs data
    const mockAuditLogs: AuditLog[] = [
      {
        id: 'AUD-001',
        timestamp: '2024-01-25T14:30:00Z',
        user: {
          id: 'USR-001',
          name: 'John Doe',
          role: 'commission_admin',
          email: 'john.doe@commission.gov.ng'
        },
        action: 'Application Approved',
        category: 'Application Processing',
        resource: 'Application APP-2024-001',
        details: 'Approved company registration application for TechCorp Ghana Ltd',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Medium',
        status: 'Success',
        metadata: {
          applicationId: 'APP-2024-001',
          companyName: 'TechCorp Ghana Ltd',
          approvalAmount: 2500000
        }
      },
      {
        id: 'AUD-002',
        timestamp: '2024-01-25T14:15:00Z',
        user: {
          id: 'USR-002',
          name: 'Jane Smith',
          role: 'staff',
          email: 'jane.smith@commission.gov.ng'
        },
        action: 'Failed Login Attempt',
        category: 'Authentication',
        resource: 'User Authentication System',
        details: 'Multiple failed login attempts detected from suspicious IP',
        ipAddress: '203.45.67.89',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F)',
        severity: 'High',
        status: 'Failed',
        metadata: {
          attemptCount: 5,
          lockoutTriggered: true
        }
      },
      {
        id: 'AUD-003',
        timestamp: '2024-01-25T13:45:00Z',
        user: {
          id: 'USR-003',
          name: 'Mike Johnson',
          role: 'finance_officer',
          email: 'mike.johnson@commission.gov.ng'
        },
        action: 'Payment Processed',
        category: 'Financial',
        resource: 'Payment Transaction PAY-2024-156',
        details: 'Processed permit fee payment of ₦1,500,000',
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Medium',
        status: 'Success',
        metadata: {
          transactionId: 'PAY-2024-156',
          amount: 1500000,
          paymentMethod: 'Bank Transfer'
        }
      },
      {
        id: 'AUD-004',
        timestamp: '2024-01-25T13:30:00Z',
        user: {
          id: 'USR-001',
          name: 'John Doe',
          role: 'commission_admin',
          email: 'john.doe@commission.gov.ng'
        },
        action: 'User Role Modified',
        category: 'User Management',
        resource: 'User Account USR-045',
        details: 'Changed user role from staff to senior_staff for Sarah Wilson',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'High',
        status: 'Success',
        metadata: {
          targetUserId: 'USR-045',
          previousRole: 'staff',
          newRole: 'senior_staff'
        }
      },
      {
        id: 'AUD-005',
        timestamp: '2024-01-25T12:20:00Z',
        user: {
          id: 'SYS-001',
          name: 'System',
          role: 'system',
          email: 'system@commission.gov.ng'
        },
        action: 'Database Backup Completed',
        category: 'System Changes',
        resource: 'Database Backup System',
        details: 'Automated daily database backup completed successfully',
        ipAddress: '192.168.1.100',
        userAgent: 'System/1.0',
        severity: 'Low',
        status: 'Success',
        metadata: {
          backupSize: '2.4GB',
          duration: '45 minutes'
        }
      },
      {
        id: 'AUD-006',
        timestamp: '2024-01-25T11:45:00Z',
        user: {
          id: 'USR-004',
          name: 'David Brown',
          role: 'compliance_officer',
          email: 'david.brown@commission.gov.ng'
        },
        action: 'Sensitive Data Accessed',
        category: 'Data Access',
        resource: 'Financial Records Database',
        details: 'Accessed confidential financial records for compliance audit',
        ipAddress: '192.168.1.110',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'High',
        status: 'Success',
        metadata: {
          recordsAccessed: 150,
          auditReason: 'Quarterly Compliance Review'
        }
      },
      {
        id: 'AUD-007',
        timestamp: '2024-01-25T10:30:00Z',
        user: {
          id: 'USR-005',
          name: 'Unknown User',
          role: 'unknown',
          email: 'unknown@unknown.com'
        },
        action: 'Unauthorized Access Attempt',
        category: 'Security',
        resource: 'Admin Panel',
        details: 'Attempted to access admin panel without proper authorization',
        ipAddress: '45.123.67.89',
        userAgent: 'curl/7.68.0',
        severity: 'Critical',
        status: 'Failed',
        metadata: {
          blocked: true,
          threatLevel: 'High'
        }
      },
      {
        id: 'AUD-008',
        timestamp: '2024-01-25T09:15:00Z',
        user: {
          id: 'USR-006',
          name: 'Lisa Anderson',
          role: 'staff',
          email: 'lisa.anderson@commission.gov.ng'
        },
        action: 'Document Downloaded',
        category: 'Data Access',
        resource: 'Application Document DOC-2024-089',
        details: 'Downloaded application supporting documents',
        ipAddress: '192.168.1.115',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'Low',
        status: 'Success',
        metadata: {
          documentId: 'DOC-2024-089',
          fileSize: '2.1MB',
          fileType: 'PDF'
        }
      }
    ];

    const mockAuditSummary: AuditSummary = {
      totalLogs: 1247,
      todayLogs: 89,
      criticalEvents: 3,
      failedAttempts: 12,
      uniqueUsers: 45,
      topActions: [
        { action: 'Application Approved', count: 156 },
        { action: 'Document Downloaded', count: 134 },
        { action: 'User Login', count: 298 },
        { action: 'Payment Processed', count: 89 },
        { action: 'Data Accessed', count: 67 }
      ],
      securityAlerts: 5,
      complianceScore: 94.2
    };

    setAuditLogs(mockAuditLogs);
    setAuditSummary(mockAuditSummary);
  }, []);

  useEffect(() => {
    let filtered = auditLogs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.resource.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(log => log.category === selectedCategory);
    }

    // Apply severity filter
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(log => log.severity === selectedSeverity);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(log => log.status === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'timestamp':
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
        case 'severity':
          const severityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
          aValue = severityOrder[a.severity];
          bValue = severityOrder[b.severity];
          break;
        case 'user':
          aValue = a.user.name.toLowerCase();
          bValue = b.user.name.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [auditLogs, searchTerm, selectedCategory, selectedSeverity, selectedStatus, sortBy, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Critical': return 'bg-red-100 text-red-800';
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Authentication': return 'bg-blue-100 text-blue-800';
      case 'Data Access': return 'bg-purple-100 text-purple-800';
      case 'System Changes': return 'bg-gray-100 text-gray-800';
      case 'User Management': return 'bg-indigo-100 text-indigo-800';
      case 'Application Processing': return 'bg-green-100 text-green-800';
      case 'Financial': return 'bg-yellow-100 text-yellow-800';
      case 'Security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">🔍</span>
              Audit Logs
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive system activity monitoring and compliance tracking</p>
          </div>
          <div className="flex space-x-4">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Logs
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {auditSummary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{auditSummary.totalLogs.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Audit Logs</div>
              <div className="text-xs mt-1 opacity-75">{auditSummary.todayLogs} today</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{auditSummary.criticalEvents}</div>
              <div className="text-sm opacity-90">Critical Events</div>
              <div className="text-xs mt-1 opacity-75">{auditSummary.securityAlerts} security alerts</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{auditSummary.failedAttempts}</div>
              <div className="text-sm opacity-90">Failed Attempts</div>
              <div className="text-xs mt-1 opacity-75">Last 24 hours</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{auditSummary.complianceScore}%</div>
              <div className="text-sm opacity-90">Compliance Score</div>
              <div className="text-xs mt-1 opacity-75">{auditSummary.uniqueUsers} active users</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="Authentication">Authentication</option>
              <option value="Data Access">Data Access</option>
              <option value="System Changes">System Changes</option>
              <option value="User Management">User Management</option>
              <option value="Application Processing">Application Processing</option>
              <option value="Financial">Financial</option>
              <option value="Security">Security</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Warning">Warning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'timestamp' | 'severity' | 'user');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="timestamp-desc">Newest First</option>
              <option value="timestamp-asc">Oldest First</option>
              <option value="severity-desc">Severity (High to Low)</option>
              <option value="severity-asc">Severity (Low to High)</option>
              <option value="user-asc">User (A to Z)</option>
              <option value="user-desc">User (Z to A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Audit Logs ({filteredLogs.length} entries)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.user.name}</div>
                    <div className="text-xs text-gray-500">{log.user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(log.category)}`}>
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-lg text-sm ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Top Actions Summary */}
      {auditSummary && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Frequent Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {auditSummary.topActions.map((action, index) => (
              <div key={action.action} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{action.count}</div>
                <div className="text-sm text-gray-600">{action.action}</div>
                <div className="text-xs text-gray-500">#{index + 1} most frequent</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Security Monitoring</h3>
          <p className="text-sm opacity-90 mb-4">Real-time security event monitoring</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/audit/security')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Security Logs
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Compliance Reports</h3>
          <p className="text-sm opacity-90 mb-4">Generate compliance audit reports</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/audit/compliance')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Generate Report
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">User Activity</h3>
          <p className="text-sm opacity-90 mb-4">Track user behavior and access patterns</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/audit/user-activity')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Activity
          </button>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">System Health</h3>
          <p className="text-sm opacity-90 mb-4">Monitor system performance and errors</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/audit/system-health')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Check Health
          </button>
        </div>
      </div>
    </div>
  );
}