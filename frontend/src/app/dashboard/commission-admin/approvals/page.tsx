'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface ApprovalItem {
  id: string;
  type: string;
  company: string;
  submittedDate: string;
  priority: 'High' | 'Medium' | 'Low';
  daysWaiting: number;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  assignedTo?: string;
}

export default function ApprovalsQueuePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data for approvals queue
    const mockApprovals: ApprovalItem[] = [
      {
        id: '1',
        type: 'Company Registration',
        company: 'Chevron Nigeria Limited',
        submittedDate: '2024-01-15',
        priority: 'High',
        daysWaiting: 12,
        status: 'Pending',
        assignedTo: 'John Doe'
      },
      {
        id: '2',
        type: 'Regular Permit',
        company: 'Shell Petroleum Development Company',
        submittedDate: '2024-01-18',
        priority: 'Medium',
        daysWaiting: 9,
        status: 'Under Review',
        assignedTo: 'Jane Smith'
      },
      {
        id: '3',
        type: 'JV Approval',
        company: 'Total E&P Nigeria',
        submittedDate: '2024-01-20',
        priority: 'High',
        daysWaiting: 7,
        status: 'Pending'
      },
      {
        id: '4',
        type: 'Rotator Permit',
        company: 'ExxonMobil Nigeria',
        submittedDate: '2024-01-22',
        priority: 'Low',
        daysWaiting: 5,
        status: 'Pending'
      },
      {
        id: '5',
        type: 'Renewal',
        company: 'Eni Nigeria Limited',
        submittedDate: '2024-01-25',
        priority: 'Medium',
        daysWaiting: 2,
        status: 'Under Review'
      }
    ];
    setApprovals(mockApprovals);
  }, []);

  const filteredApprovals = approvals.filter(approval => {
    if (filter === 'all') return true;
    if (filter === 'high-priority') return approval.priority === 'High';
    if (filter === 'overdue') return approval.daysWaiting > 10;
    if (filter === 'pending') return approval.status === 'Pending';
    return true;
  });

  const sortedApprovals = [...filteredApprovals].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    if (sortBy === 'date') {
      return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
    }
    if (sortBy === 'waiting') {
      return b.daysWaiting - a.daysWaiting;
    }
    return 0;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <span className="mr-3">📋</span>
              Approvals Queue
            </h1>
            <p className="text-gray-600 mt-2">Manage and review pending applications and approvals</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Bulk Actions
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{approvals.filter(a => a.priority === 'High').length}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{approvals.filter(a => a.daysWaiting > 10).length}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{approvals.filter(a => a.status === 'Pending').length}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{approvals.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Items</option>
              <option value="high-priority">High Priority</option>
              <option value="overdue">Overdue</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="priority">Priority</option>
              <option value="date">Submission Date</option>
              <option value="waiting">Days Waiting</option>
            </select>
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Pending Approvals ({sortedApprovals.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Waiting</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedApprovals.map((approval) => (
                <tr key={approval.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {approval.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {approval.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(approval.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(approval.priority)}`}>
                      {approval.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(approval.status)}`}>
                      {approval.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={approval.daysWaiting > 10 ? 'text-red-600 font-semibold' : ''}>
                      {approval.daysWaiting} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {approval.assignedTo || 'Unassigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Review</button>
                      <button className="text-green-600 hover:text-green-900">Approve</button>
                      <button className="text-red-600 hover:text-red-900">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Company Registrations</h3>
          <p className="text-sm opacity-90 mb-4">Review new company registration applications</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/approvals/companies')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Applications
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Regular Permits</h3>
          <p className="text-sm opacity-90 mb-4">Process regular permit applications</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/approvals/regular-permits')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Permits
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">JV Approvals</h3>
          <p className="text-sm opacity-90 mb-4">Review joint venture applications</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/approvals/jv')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View JV Applications
          </button>
        </div>
      </div>
    </div>
  );
}