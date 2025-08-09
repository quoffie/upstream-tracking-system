'use client';

import { useState } from 'react';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon,
  PermitIcon,
  HistoryIcon,
  ReportIcon
} from '../../../components/icons/DashboardIcons';
import { usePermits, useSubmit } from '../../../hooks/useApi';
import { apiService } from '../../../services/api.service';

export default function ApplicationReviewPage() {
  const [activeTab, setActiveTab] = useState('applications');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  // Use API hook to fetch permits
  const { data: permitsData, loading, error, execute: refetchPermits } = usePermits();
  const { submit: submitAction } = useSubmit();

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/immigration', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Permit Approvals', href: '/dashboard/immigration/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Application Review', href: '/dashboard/immigration/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status', href: '/dashboard/immigration/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Issued Permits', href: '/dashboard/immigration/permits', icon: PermitIcon, current: activeTab === 'permits' },
    { name: 'Approval History', href: '/dashboard/immigration/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Reports', href: '/dashboard/immigration/reports', icon: ReportIcon, current: activeTab === 'reports' },
    { name: 'Notifications', href: '/dashboard/immigration/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/immigration/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/immigration/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  // Mock data for applications pending immigration review
  const applications = permitsData?.data || [
    {
      id: 'APP-2023-0142',
      type: 'Regular Permit',
      applicant: 'John Doe',
      nationality: 'United States',
      company: 'Acme Drilling Ltd',
      position: 'Drilling Engineer',
      submissionDate: '2023-12-10',
      pcApprovalDate: '2023-12-15',
      status: 'Pending Immigration Review',
      priority: 'Medium',
      daysInSystem: 5,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Medical Certificate', 'Educational Certificates', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0141',
      type: 'Rotator Permit',
      applicant: 'Jane Smith',
      nationality: 'United Kingdom',
      company: 'Global Exploration Inc',
      position: 'Production Engineer',
      submissionDate: '2023-12-08',
      pcApprovalDate: '2023-12-14',
      status: 'Pending Immigration Review',
      priority: 'High',
      daysInSystem: 7,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Medical Certificate', 'Rotation Schedule', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0140',
      type: 'Regular Permit',
      applicant: 'Robert Johnson',
      nationality: 'Canada',
      company: 'PetroGhana Services',
      position: 'Geologist',
      submissionDate: '2023-12-05',
      pcApprovalDate: '2023-12-12',
      status: 'Additional Info Requested',
      priority: 'Low',
      daysInSystem: 10,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Educational Certificates', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0139',
      type: 'Regular Permit',
      applicant: 'Michael Chen',
      nationality: 'Singapore',
      company: 'Offshore Solutions Ltd',
      position: 'Safety Officer',
      submissionDate: '2023-12-01',
      pcApprovalDate: '2023-12-10',
      status: 'Pending Immigration Review',
      priority: 'High',
      daysInSystem: 14,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Safety Certifications', 'Medical Certificate', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0138',
      type: 'Rotator Permit',
      applicant: 'Emma Wilson',
      nationality: 'Australia',
      company: 'DeepWater Drilling Co',
      position: 'Environmental Specialist',
      submissionDate: '2023-11-28',
      pcApprovalDate: '2023-12-08',
      status: 'Pending Immigration Review',
      priority: 'Medium',
      daysInSystem: 17,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Environmental Certifications', 'Rotation Schedule', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0137',
      type: 'Regular Permit',
      applicant: 'David Brown',
      nationality: 'United States',
      company: 'Atlantic Petroleum',
      position: 'Mechanical Engineer',
      submissionDate: '2023-11-25',
      pcApprovalDate: '2023-12-05',
      status: 'Approved',
      priority: 'Medium',
      daysInSystem: 20,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Medical Certificate', 'Engineering License', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0136',
      type: 'Rotator Permit',
      applicant: 'Lisa Anderson',
      nationality: 'Norway',
      company: 'Nordic Offshore Ltd',
      position: 'Operations Manager',
      submissionDate: '2023-11-20',
      pcApprovalDate: '2023-11-30',
      status: 'Rejected',
      priority: 'Low',
      daysInSystem: 25,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Management Certifications', 'PC Approval Letter']
    },
    {
      id: 'APP-2023-0135',
      type: 'Regular Permit',
      applicant: 'James Davis',
      nationality: 'France',
      company: 'EuroGas Exploration',
      position: 'Petroleum Engineer',
      submissionDate: '2023-11-15',
      pcApprovalDate: '2023-11-25',
      status: 'Pending Immigration Review',
      priority: 'Medium',
      daysInSystem: 30,
      paymentStatus: 'Verified',
      documents: ['Passport', 'Work Permit', 'Medical Certificate', 'Engineering Degree', 'PC Approval Letter']
    }
  ];

  const filteredApplications = applications.filter((app: any) => {
    const matchesSearch = (app.applicant || app.applicantName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (app.id || app.referenceNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (app.type || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (app.nationality || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (app.company?.name || app.companyName || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesType = filterType === 'all' || app.type === filterType;
    const daysCutoff = selectedTimeframe === 'all' ? Infinity : parseInt(selectedTimeframe);
    const matchesTimeframe = selectedTimeframe === 'all' || (app.daysInSystem || 0) <= daysCutoff;
    return matchesSearch && matchesStatus && matchesType && matchesTimeframe;
  });

  const handleViewApplication = (id: string) => {
    window.open(`/dashboard/immigration/applications/${id}`, '_blank');
  };

  const handleApproveApplication = async (id: string) => {
    const comments = prompt('Enter approval comments (optional):');
    try {
      await submitAction(
        () => apiService.approvePermit(id, comments || undefined),
        {
          onSuccess: () => {
            alert('Application approved successfully!');
            refetchPermits();
          },
          onError: (error) => {
            alert(`Failed to approve application: ${error}`);
          }
        }
      );
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleRejectApplication = async (id: string) => {
    const comments = prompt('Enter rejection reason:');
    if (!comments) {
      alert('Rejection reason is required');
      return;
    }
    
    try {
      await submitAction(
        () => apiService.rejectPermit(id, comments),
        {
          onSuccess: () => {
            alert('Application rejected successfully!');
            refetchPermits();
          },
          onError: (error) => {
            alert(`Failed to reject application: ${error}`);
          }
        }
      );
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  const handleRequestInfo = async (id: string) => {
    const message = prompt('Enter information request message:');
    if (!message) {
      alert('Information request message is required');
      return;
    }
    
    try {
      await submitAction(
        () => apiService.updatePermitStatus(id, 'DOCUMENT_REQUIRED', message),
        {
          onSuccess: () => {
            alert('Information request sent successfully!');
            refetchPermits();
          },
          onError: (error) => {
            alert(`Failed to send information request: ${error}`);
          }
        }
      );
    } catch (error) {
      console.error('Error requesting information:', error);
    }
  };

  const handlePrintApplication = (id: string) => {
    alert(`Printing application ${id}`);
  };

  return (
    <DashboardLayout
      title="Ghana Immigration Service Dashboard"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Application Review</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Generating report...')}
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by ID, applicant, nationality, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                id="status"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending Immigration Review">Pending Review</option>
                <option value="Additional Info Requested">Info Requested</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Permit Type</label>
              <select
                id="type"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Regular Permit">Regular Permit</option>
                <option value="Rotator Permit">Rotator Permit</option>
              </select>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">Days in System</label>
              <select
                id="timeframe"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="7">≤ 7 days</option>
                <option value="14">≤ 14 days</option>
                <option value="30">≤ 30 days</option>
                <option value="60">≤ 60 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Applications Pending Review ({filteredApplications.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nationality
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PC Approval Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading applications...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-red-500">
                      Error loading applications: {error}
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((application: any) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {application.referenceNumber || application.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.applicant || application.applicantName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.nationality}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.company?.name || application.companyName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {application.pcApprovalDate ? new Date(application.pcApprovalDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={
                          `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${application.status === 'APPROVED' ? 'bg-green-100 text-green-800' : ''}
                          ${application.status === 'PENDING' || application.status === 'Pending Immigration Review' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${application.status === 'DOCUMENT_REQUIRED' || application.status === 'Additional Info Requested' ? 'bg-blue-100 text-blue-800' : ''}
                          ${application.status === 'REJECTED' ? 'bg-red-100 text-red-800' : ''}`
                        }>
                          {application.status?.replace('_', ' ') || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewApplication(application.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </button>
                          {(application.status === 'PENDING' || application.status === 'Pending Immigration Review') && (
                            <>
                              <button
                                onClick={() => handleApproveApplication(application.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectApplication(application.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => handleRequestInfo(application.id)}
                                className="text-amber-600 hover:text-amber-900"
                              >
                                Request Info
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handlePrintApplication(application.id)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Print
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filteredApplications.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No applications match your filters.
            </div>
          )}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredApplications.length} of {applications.length} applications
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}