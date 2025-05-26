'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
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
  ReportIcon} from '../../../components/icons/DashboardIcons';

export default function PermitsPage() {
  const [activeTab, setActiveTab] = useState('permits');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

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

  // Mock data for permits
  const permits = [
    {
      id: 'WP-2023-001',
      permitNumber: 'GIS-WP-2023-001',
      type: 'Work Permit - Regular',
      applicantName: 'John Smith',
      nationality: 'United Kingdom',
      company: 'Offshore Drilling Ltd',
      position: 'Drilling Engineer',
      issueDate: '2023-01-15',
      expiryDate: '2024-01-14',
      status: 'Active',
      issuedBy: 'Officer A. Johnson'
    },
    {
      id: 'WP-2023-002',
      permitNumber: 'GIS-WP-2023-002',
      type: 'Work Permit - Rotator',
      applicantName: 'Maria Rodriguez',
      nationality: 'Spain',
      company: 'Global Energy Partners',
      position: 'Project Manager',
      issueDate: '2023-02-10',
      expiryDate: '2024-02-09',
      status: 'Active',
      issuedBy: 'Officer B. Williams'
    },
    {
      id: 'WP-2023-003',
      permitNumber: 'GIS-WP-2023-003',
      type: 'Work Permit - Regular',
      applicantName: 'Ahmed Hassan',
      nationality: 'Egypt',
      company: 'Subsea Engineering Co.',
      position: 'ROV Specialist',
      issueDate: '2023-03-05',
      expiryDate: '2024-03-04',
      status: 'Active',
      issuedBy: 'Officer C. Davis'
    },
    {
      id: 'WP-2023-004',
      permitNumber: 'GIS-WP-2023-004',
      type: 'Work Permit - Rotator',
      applicantName: 'James Wilson',
      nationality: 'United States',
      company: 'Atlantic Exploration',
      position: 'Geophysicist',
      issueDate: '2023-03-20',
      expiryDate: '2024-03-19',
      status: 'Active',
      issuedBy: 'Officer A. Johnson'
    },
    {
      id: 'WP-2023-005',
      permitNumber: 'GIS-WP-2023-005',
      type: 'Work Permit - Regular',
      applicantName: 'Sophia Chen',
      nationality: 'China',
      company: 'Tech Solutions Inc.',
      position: 'IT Specialist',
      issueDate: '2023-04-12',
      expiryDate: '2024-04-11',
      status: 'Active',
      issuedBy: 'Officer B. Williams'
    },
    {
      id: 'WP-2023-006',
      permitNumber: 'GIS-WP-2023-006',
      type: 'Work Permit - Regular',
      applicantName: 'Carlos Mendez',
      nationality: 'Brazil',
      company: 'Offshore Drilling Ltd',
      position: 'Safety Officer',
      issueDate: '2023-05-08',
      expiryDate: '2024-05-07',
      status: 'Active',
      issuedBy: 'Officer C. Davis'
    },
    {
      id: 'WP-2023-007',
      permitNumber: 'GIS-WP-2023-007',
      type: 'Work Permit - Rotator',
      applicantName: 'Emma Johnson',
      nationality: 'Australia',
      company: 'Global Energy Partners',
      position: 'Environmental Specialist',
      issueDate: '2023-06-15',
      expiryDate: '2023-12-14',
      status: 'Expiring Soon',
      issuedBy: 'Officer A. Johnson'
    },
    {
      id: 'WP-2023-008',
      permitNumber: 'GIS-WP-2023-008',
      type: 'Work Permit - Regular',
      applicantName: 'Raj Patel',
      nationality: 'India',
      company: 'Tech Solutions Inc.',
      position: 'Software Engineer',
      issueDate: '2023-07-01',
      expiryDate: '2023-12-31',
      status: 'Expiring Soon',
      issuedBy: 'Officer B. Williams'
    },
    {
      id: 'WP-2022-045',
      permitNumber: 'GIS-WP-2022-045',
      type: 'Work Permit - Regular',
      applicantName: 'Thomas Mueller',
      nationality: 'Germany',
      company: 'Precision Engineering',
      position: 'Mechanical Engineer',
      issueDate: '2022-08-15',
      expiryDate: '2023-08-14',
      status: 'Expired',
      issuedBy: 'Officer C. Davis'
    },
    {
      id: 'WP-2022-052',
      permitNumber: 'GIS-WP-2022-052',
      type: 'Work Permit - Rotator',
      applicantName: 'Anna Kowalski',
      nationality: 'Poland',
      company: 'Atlantic Exploration',
      position: 'Data Analyst',
      issueDate: '2022-09-10',
      expiryDate: '2023-09-09',
      status: 'Expired',
      issuedBy: 'Officer A. Johnson'
    },
    {
      id: 'WP-2023-009',
      permitNumber: 'GIS-WP-2023-009',
      type: 'Work Permit - Regular',
      applicantName: 'Yuki Tanaka',
      nationality: 'Japan',
      company: 'Tech Solutions Inc.',
      position: 'Robotics Engineer',
      issueDate: '2023-08-05',
      expiryDate: '2024-08-04',
      status: 'Active',
      issuedBy: 'Officer B. Williams'
    },
    {
      id: 'WP-2023-010',
      permitNumber: 'GIS-WP-2023-010',
      type: 'Work Permit - Rotator',
      applicantName: 'Olga Petrov',
      nationality: 'Russia',
      company: 'Global Energy Partners',
      position: 'Petroleum Engineer',
      issueDate: '2023-08-20',
      expiryDate: '2024-08-19',
      status: 'Active',
      issuedBy: 'Officer C. Davis'
    },
  ];

  // Filter permits based on search query and filters
  const filteredPermits = permits.filter(permit => {
    const matchesSearch = 
      permit.permitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || permit.status === filterStatus;
    const matchesType = filterType === 'all' || permit.type.includes(filterType);
    
    let matchesDate = true;
    if (filterDate !== 'all') {
      const today = new Date();
      const expiryDate = new Date(permit.expiryDate);
      const daysDiff = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (filterDate === '30' && (daysDiff < 0 || daysDiff > 30)) {
        matchesDate = false;
      } else if (filterDate === '60' && (daysDiff < 0 || daysDiff > 60)) {
        matchesDate = false;
      } else if (filterDate === '90' && (daysDiff < 0 || daysDiff > 90)) {
        matchesDate = false;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  const handlePrintPermit = (id: string) => {
    alert(`Printing permit ${id}`);
  };

  const handleEmailPermit = (id: string) => {
    alert(`Emailing permit ${id}`);
  };

  const handleRevokePermit = (id: string) => {
    alert(`Revoking permit ${id}`);
  };

  const handleRenewPermit = (id: string) => {
    alert(`Renewing permit ${id}`);
  };

  return (
    <DashboardLayout
      title="Issued Permits"
      userRole="Immigration Officer"
      userName="GIS Admin"
      userInitials="GI"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Issued Work Permits</h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => alert('Exporting permits to Excel...')}
            >
              Export to Excel
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={() => alert('Generating permits report...')}
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
                  placeholder="Search by permit number, name, company, or position"
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
                  <option value="Active">Active</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Expired">Expired</option>
                  <option value="Revoked">Revoked</option>
                </select>
              </div>
              <div className="w-48">
                <select
                  id="type-filter"
                  name="type-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Permit Types</option>
                  <option value="Regular">Work Permit - Regular</option>
                  <option value="Rotator">Work Permit - Rotator</option>
                </select>
              </div>
              <div className="w-48">
                <select
                  id="date-filter"
                  name="date-filter"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  <option value="all">All Expiry Dates</option>
                  <option value="30">Expires in 30 days</option>
                  <option value="60">Expires in 60 days</option>
                  <option value="90">Expires in 90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Permits Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permit ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPermits.map((permit) => (
                  <tr key={permit.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{permit.permitNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{permit.applicantName}</div>
                      <div className="text-xs text-gray-500">{permit.nationality}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{permit.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{permit.company}</div>
                      <div className="text-xs text-gray-500">{permit.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{permit.issueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{permit.expiryDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${permit.status === 'Active' ? 'bg-green-100 text-green-800' : permit.status === 'Expiring Soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {permit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handlePrintPermit(permit.id)}
                        >
                          Print
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleEmailPermit(permit.id)}
                        >
                          Email
                        </button>
                        {permit.status !== 'Expired' && (
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleRevokePermit(permit.id)}
                          >
                            Revoke
                          </button>
                        )}
                        {permit.status === 'Expired' || permit.status === 'Expiring Soon' ? (
                          <button 
                            className="text-purple-600 hover:text-purple-900"
                            onClick={() => handleRenewPermit(permit.id)}
                          >
                            Renew
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPermits.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No permits match your search criteria.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}