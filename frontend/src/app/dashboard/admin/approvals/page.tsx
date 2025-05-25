'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  PaymentIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon
} from '../../../components/icons/DashboardIcons';

export default function ApprovalsQueuePage() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Approvals Queue', href: '/dashboard/admin/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Applications Tracker', href: '/dashboard/admin/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status Viewer', href: '/dashboard/admin/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Payments & Transactions', href: '/dashboard/admin/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'Notifications & Escalations', href: '/dashboard/admin/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/admin/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/admin/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 'APP-2023-0045',
      type: 'Regular Permit',
      company: 'Tullow Ghana Ltd',
      forwardedBy: 'John Reviewer',
      date: '2023-05-28',
      paymentStatus: 'Verified',
      priority: 'High',
      daysWaiting: 3
    },
    {
      id: 'APP-2023-0044',
      type: 'Company Registration',
      company: 'Eni Ghana',
      forwardedBy: 'Sarah Wilson',
      date: '2023-05-27',
      paymentStatus: 'Pending Verification',
      priority: 'Medium',
      daysWaiting: 4
    },
    {
      id: 'APP-2023-0043',
      type: 'Rotator Permit',
      company: 'Kosmos Energy',
      forwardedBy: 'Mike Johnson',
      date: '2023-05-26',
      paymentStatus: 'Verified',
      priority: 'High',
      daysWaiting: 5
    },
    {
      id: 'APP-2023-0042',
      type: 'JV Compliance',
      company: 'Baker Hughes Ghana',
      forwardedBy: 'Lisa Chen',
      date: '2023-05-25',
      paymentStatus: 'Verified',
      priority: 'Low',
      daysWaiting: 6
    },
    {
      id: 'APP-2023-0041',
      type: 'Local Content',
      company: 'Schlumberger Ghana',
      forwardedBy: 'David Brown',
      date: '2023-05-24',
      paymentStatus: 'Verified',
      priority: 'Medium',
      daysWaiting: 7
    },
  ];

  const filteredApprovals = pendingApprovals.filter(approval => {
    const matchesSearch = approval.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         approval.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || approval.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleApprove = (id: string) => {
    alert(`Approving application ${id}`);
  };

  const handleReject = (id: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
      alert(`Rejecting application ${id} with reason: ${reason}`);
    }
  };

  const handleForwardToGIS = (id: string) => {
    alert(`Forwarding application ${id} to Ghana Immigration Service`);
  };

  const handleViewDetails = (id: string) => {
    alert(`Viewing details for application ${id}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-green-600 bg-green-100';
      case 'Pending Verification': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout
      title="Commission Admin Dashboard"
      userRole="Commission Admin"
      userName="Admin Panel"
      userInitials="CA"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Approvals Queue</h2>
              <p className="text-sm text-gray-500">Review and approve applications forwarded for final approval</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Bulk Approve
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by company name or application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Regular Permit">Regular Permit</option>
                <option value="Rotator Permit">Rotator Permit</option>
                <option value="Company Registration">Company Registration</option>
                <option value="JV Compliance">JV Compliance</option>
                <option value="Local Content">Local Content</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900">Total Pending</h3>
              <p className="text-2xl font-bold text-blue-600">{filteredApprovals.length}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">High Priority</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredApprovals.filter(a => a.priority === 'High').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">Payment Pending</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredApprovals.filter(a => a.paymentStatus === 'Pending Verification').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">Ready to Approve</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredApprovals.filter(a => a.paymentStatus === 'Verified').length}
              </p>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forwarded By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Waiting
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApprovals.map((approval) => (
                  <tr key={approval.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {approval.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {approval.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {approval.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {approval.forwardedBy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {approval.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(approval.paymentStatus)}`}>
                        {approval.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(approval.priority)}`}>
                        {approval.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {approval.daysWaiting} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewDetails(approval.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="text-green-600 hover:text-green-900"
                        disabled={approval.paymentStatus !== 'Verified'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Reject
                      </button>
                      {(approval.type === 'Regular Permit' || approval.type === 'Rotator Permit') && (
                        <button
                          onClick={() => handleForwardToGIS(approval.id)}
                          className="text-purple-600 hover:text-purple-900"
                          disabled={approval.paymentStatus !== 'Verified'}
                        >
                          To GIS
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApprovals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}