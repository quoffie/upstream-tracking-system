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

export default function ApplicationsTrackerPage() {
  const [activeTab, setActiveTab] = useState('applications');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');

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

  // Mock data for applications
  const applications = [
    {
      id: 'APP-2023-0050',
      type: 'Regular Permit',
      company: 'Tullow Ghana Ltd',
      applicant: 'John Smith',
      submissionDate: '2023-05-30',
      currentStage: 'Document Review',
      status: 'In Progress',
      assignedTo: 'Sarah Wilson',
      priority: 'High',
      daysInSystem: 2,
      paymentStatus: 'Paid'
    },
    {
      id: 'APP-2023-0049',
      type: 'Company Registration',
      company: 'Eni Ghana',
      applicant: 'Maria Garcia',
      submissionDate: '2023-05-29',
      currentStage: 'Final Approval',
      status: 'Pending Approval',
      assignedTo: 'Commission Admin',
      priority: 'Medium',
      daysInSystem: 3,
      paymentStatus: 'Paid'
    },
    {
      id: 'APP-2023-0048',
      type: 'Rotator Permit',
      company: 'Kosmos Energy',
      applicant: 'David Johnson',
      submissionDate: '2023-05-28',
      currentStage: 'Payment Verification',
      status: 'Pending Payment',
      assignedTo: 'Finance Officer',
      priority: 'High',
      daysInSystem: 4,
      paymentStatus: 'Pending'
    },
    {
      id: 'APP-2023-0047',
      type: 'JV Compliance',
      company: 'Baker Hughes Ghana',
      applicant: 'Lisa Chen',
      submissionDate: '2023-05-27',
      currentStage: 'Technical Review',
      status: 'In Progress',
      assignedTo: 'Mike Johnson',
      priority: 'Low',
      daysInSystem: 5,
      paymentStatus: 'Paid'
    },
    {
      id: 'APP-2023-0046',
      type: 'Local Content',
      company: 'Schlumberger Ghana',
      applicant: 'Robert Brown',
      submissionDate: '2023-05-26',
      currentStage: 'Compliance Check',
      status: 'In Progress',
      assignedTo: 'Local Content Officer',
      priority: 'Medium',
      daysInSystem: 6,
      paymentStatus: 'Paid'
    },
    {
      id: 'APP-2023-0045',
      type: 'Regular Permit',
      company: 'Total Ghana',
      applicant: 'Emma Wilson',
      submissionDate: '2023-05-25',
      currentStage: 'Approved',
      status: 'Completed',
      assignedTo: 'N/A',
      priority: 'Medium',
      daysInSystem: 7,
      paymentStatus: 'Paid'
    },
    {
      id: 'APP-2023-0044',
      type: 'Rotator Permit',
      company: 'Chevron Ghana',
      applicant: 'James Taylor',
      submissionDate: '2023-05-24',
      currentStage: 'Rejected',
      status: 'Rejected',
      assignedTo: 'N/A',
      priority: 'Low',
      daysInSystem: 8,
      paymentStatus: 'Refunded'
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.applicant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const daysCutoff = parseInt(selectedTimeframe);
    const matchesTimeframe = selectedTimeframe === 'all' || app.daysInSystem <= daysCutoff;
    return matchesSearch && matchesStatus && matchesTimeframe;
  });

  const handleViewApplication = (id: string) => {
    alert(`Viewing application details for ${id}`);
  };

  const handleReassignApplication = (id: string) => {
    const newAssignee = prompt('Enter new assignee name:');
    if (newAssignee) {
      alert(`Reassigning application ${id} to ${newAssignee}`);
    }
  };

  const handleEscalateApplication = (id: string) => {
    alert(`Escalating application ${id} to senior management`);
  };

  const handleDownloadReport = () => {
    alert('Downloading applications report...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Pending Approval': return 'text-yellow-600 bg-yellow-100';
      case 'Pending Payment': return 'text-orange-600 bg-orange-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
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
      case 'Paid': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Refunded': return 'text-blue-600 bg-blue-100';
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
              <h2 className="text-2xl font-bold text-gray-900">Applications Tracker</h2>
              <p className="text-sm text-gray-500">Monitor and track all applications across the system</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Download Report
              </button>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Export Data
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Search by company, ID, or applicant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900">Total Applications</h3>
              <p className="text-2xl font-bold text-blue-600">{filteredApplications.length}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">In Progress</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredApplications.filter(a => a.status === 'In Progress').length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-orange-900">Pending Approval</h3>
              <p className="text-2xl font-bold text-orange-600">
                {filteredApplications.filter(a => a.status === 'Pending Approval').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">Completed</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredApplications.filter(a => a.status === 'Completed').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">Rejected</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredApplications.filter(a => a.status === 'Rejected').length}
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
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in System
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.applicant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.currentStage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                        {application.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.daysInSystem} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(application.paymentStatus)}`}>
                        {application.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewApplication(application.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {application.status === 'In Progress' && (
                        <>
                          <button
                            onClick={() => handleReassignApplication(application.id)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Reassign
                          </button>
                          <button
                            onClick={() => handleEscalateApplication(application.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Escalate
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}