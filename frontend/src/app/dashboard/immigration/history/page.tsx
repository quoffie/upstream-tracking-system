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

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('history');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTimeframe, setFilterTimeframe] = useState('all');

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

  // Mock data for approval history
  const historyData = [
    {
      id: 'APP-2023-0142',
      applicantName: 'John Smith',
      company: 'Acme Corporation',
      permitType: 'Regular Permit',
      action: 'Permit Issued',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-15',
      status: 'Approved',
      comments: 'All requirements met. Permit issued for 12 months.'
    },
    {
      id: 'APP-2023-0141',
      applicantName: 'Emma Johnson',
      company: 'Tullow Ghana',
      permitType: 'Rotator Permit',
      action: 'Permit Issued',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-14',
      status: 'Approved',
      comments: 'Rotation schedule approved. Permit issued for 6 months.'
    },
    {
      id: 'APP-2023-0140',
      applicantName: 'Michael Brown',
      company: 'New Energy Ltd',
      permitType: 'Regular Permit',
      action: 'Application Rejected',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-13',
      status: 'Rejected',
      comments: 'Missing required documentation. Applicant notified.'
    },
    {
      id: 'APP-2023-0139',
      applicantName: 'Sarah Wilson',
      company: 'Offshore Solutions',
      permitType: 'Regular Permit',
      action: 'Additional Information Requested',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-12',
      status: 'Pending',
      comments: 'Need clarification on job role and responsibilities.'
    },
    {
      id: 'APP-2023-0138',
      applicantName: 'David Lee',
      company: 'PetroGhana',
      permitType: 'Rotator Permit',
      action: 'Permit Issued',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-10',
      status: 'Approved',
      comments: 'All requirements met. Permit issued for 6 months.'
    },
    {
      id: 'APP-2023-0137',
      applicantName: 'Jennifer Chen',
      company: 'Global Exploration',
      permitType: 'Regular Permit',
      action: 'Permit Renewed',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-08',
      status: 'Approved',
      comments: 'Permit renewed for additional 12 months.'
    },
    {
      id: 'APP-2023-0136',
      applicantName: 'Robert Miller',
      company: 'DeepWater Drilling',
      permitType: 'Regular Permit',
      action: 'Permit Revoked',
      actionBy: 'GIS Admin',
      actionDate: '2023-12-05',
      status: 'Revoked',
      comments: 'Violation of permit conditions. Company notified.'
    },
  ];

  // Filter history data based on search query and filters
  const filteredHistory = historyData.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    
    let matchesTimeframe = true;
    if (filterTimeframe !== 'all') {
      const today = new Date();
      const actionDate = new Date(item.actionDate);
      const daysDiff = Math.floor((today.getTime() - actionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filterTimeframe) {
        case '7':
          matchesTimeframe = daysDiff <= 7;
          break;
        case '30':
          matchesTimeframe = daysDiff <= 30;
          break;
        case '90':
          matchesTimeframe = daysDiff <= 90;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesTimeframe;
  });

  const handleViewDetails = (id: string) => {
    alert(`Viewing details for ${id}`);
  };

  const handlePrintPermit = (id: string) => {
    alert(`Printing permit ${id}`);
  };

  const handleEmailPermit = (id: string) => {
    alert(`Emailing permit ${id}`);
  };

  return (
    <DashboardLayout
      title="Approval History"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Approval History</h1>
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
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by ID, name, company, or action"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-40">
                <select
                  id="status-filter"
                  name="status-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                  <option value="Revoked">Revoked</option>
                </select>
              </div>
              <div className="w-40">
                <select
                  id="timeframe-filter"
                  name="timeframe-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterTimeframe}
                  onChange={(e) => setFilterTimeframe(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permit Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.applicantName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.permitType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.actionDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Approved' ? 'bg-green-100 text-green-800' : item.status === 'Rejected' ? 'bg-red-100 text-red-800' : item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleViewDetails(item.id)}
                        >
                          View Details
                        </button>
                        {item.status === 'Approved' && (
                          <>
                            <button 
                              className="text-green-600 hover:text-green-900 mr-3"
                              onClick={() => handlePrintPermit(item.id)}
                            >
                              Print Permit
                            </button>
                            <button 
                              className="text-purple-600 hover:text-purple-900"
                              onClick={() => handleEmailPermit(item.id)}
                            >
                              Email Permit
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                      No history records found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}