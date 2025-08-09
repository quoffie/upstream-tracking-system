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

// Define type for approval request
type ApprovalRequest = {
  id: string;
  applicantName: string;
  applicantNationality: string;
  company: string;
  permitType: string;
  submissionDate: string;
  pcApprovalDate: string;
  status: string;
  documents: Array<{
    name: string;
    url: string;
  }>;
};

// Mock data for the approvals page
const approvalRequests: ApprovalRequest[] = [
  {
    id: 'APP-2023-0142',
    applicantName: 'John Smith',
    applicantNationality: 'United States',
    company: 'Acme Corporation',
    permitType: 'Regular Permit',
    submissionDate: '2023-12-01',
    pcApprovalDate: '2023-12-10',
    status: 'Pending GIS Approval',
    documents: [
      { name: 'Application Form', url: '#' },
      { name: 'Passport Copy', url: '#' },
      { name: 'CV/Resume', url: '#' },
      { name: 'Job Description', url: '#' },
      { name: 'PC Approval Letter', url: '#' },
      { name: 'Payment Receipt', url: '#' },
    ]
  },
  {
    id: 'APP-2023-0141',
    applicantName: 'Emma Johnson',
    applicantNationality: 'United Kingdom',
    company: 'Tullow Ghana',
    permitType: 'Rotator Permit',
    submissionDate: '2023-11-28',
    pcApprovalDate: '2023-12-08',
    status: 'Pending GIS Approval',
    documents: [
      { name: 'Application Form', url: '#' },
      { name: 'Passport Copy', url: '#' },
      { name: 'CV/Resume', url: '#' },
      { name: 'Job Description', url: '#' },
      { name: 'PC Approval Letter', url: '#' },
      { name: 'Payment Receipt', url: '#' },
      { name: 'Rotation Schedule', url: '#' },
    ]
  },
  {
    id: 'APP-2023-0140',
    applicantName: 'Michael Brown',
    applicantNationality: 'Canada',
    company: 'New Energy Ltd',
    permitType: 'Regular Permit',
    submissionDate: '2023-11-25',
    pcApprovalDate: '2023-12-05',
    status: 'Pending GIS Approval',
    documents: [
      { name: 'Application Form', url: '#' },
      { name: 'Passport Copy', url: '#' },
      { name: 'CV/Resume', url: '#' },
      { name: 'Job Description', url: '#' },
      { name: 'PC Approval Letter', url: '#' },
      { name: 'Payment Receipt', url: '#' },
    ]
  },
];

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState('approvals');
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [viewingDocuments, setViewingDocuments] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

  // Filter approvals based on search query and status filter
  const filteredApprovals = approvalRequests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDocuments = (request: ApprovalRequest) => {
    setSelectedRequest(request);
    setViewingDocuments(true);
  };

  const handleCloseDocuments = () => {
    setViewingDocuments(false);
  };

  const handleApprove = (id: string) => {
    alert(`Approving application ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejecting application ${id}`);
  };

  const handleRequestInfo = (id: string) => {
    alert(`Requesting additional information for ${id}`);
  };

  const handleIssuePermit = (id: string) => {
    alert(`Issuing permit for application ${id}`);
  };

  return (
    <DashboardLayout
      title="Permit Approvals"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Permit Approvals</h1>
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
                  placeholder="Search by ID, name, or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-shrink-0">
              <select
                id="status-filter"
                name="status-filter"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Pending GIS Approval">Pending GIS Approval</option>
                <option value="Additional Info Requested">Additional Info Requested</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Approvals Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permit Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PC Approval Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApprovals.length > 0 ? (
                  filteredApprovals.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.applicantName}
                        <div className="text-xs text-gray-400">{request.applicantNationality}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.permitType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request.pcApprovalDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => handleViewDocuments(request)}
                        >
                          Documents
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900 mr-3"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 mr-3"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </button>
                        <button 
                          className="text-amber-600 hover:text-amber-900 mr-3"
                          onClick={() => handleRequestInfo(request.id)}
                        >
                          Request Info
                        </button>
                        <button 
                          className="text-purple-600 hover:text-purple-900"
                          onClick={() => handleIssuePermit(request.id)}
                        >
                          Issue Permit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No approval requests found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Document Viewer Modal */}
        {viewingDocuments && selectedRequest && (
          <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={handleCloseDocuments}></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Documents for {selectedRequest.id}
                      </h3>
                      <div className="mt-4">
                        <ul className="divide-y divide-gray-200">
                          {selectedRequest.documents.map((doc, index) => (
                            <li key={index} className="py-3 flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                              <a href={doc.url} className="text-sm text-blue-600 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCloseDocuments}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}