'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApplicationIcon,
  PermitIcon,
  PersonnelIcon,
  PaymentIcon,
  ComplianceIcon,
  DocumentIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon
} from '../../../components/icons/DashboardIcons';

export default function PermitsPage() {
  const [activeTab, setActiveTab] = useState('permits');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/company-admin', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'My Applications', href: '/dashboard/company-admin/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Permits', href: '/dashboard/company-admin/permits', icon: PermitIcon, current: activeTab === 'permits' },
    { name: 'Personnel Management', href: '/dashboard/company-admin/personnel', icon: PersonnelIcon, current: activeTab === 'personnel' },
    { name: 'Payments & Transactions', href: '/dashboard/company-admin/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'JV Compliance', href: '/dashboard/company-admin/compliance', icon: ComplianceIcon, current: activeTab === 'compliance' },
    { name: 'Local Content Reporting', href: '/dashboard/company-admin/local-content', icon: DocumentIcon, current: activeTab === 'local-content' },
    { name: 'Documents & Uploads', href: '/dashboard/company-admin/documents', icon: DocumentIcon, current: activeTab === 'documents' },
    { name: 'Notifications & Alerts', href: '/dashboard/company-admin/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Profile/Settings', href: '/dashboard/company-admin/profile', icon: ProfileIcon, current: activeTab === 'profile' },
    { name: 'Support/Help', href: '/dashboard/company-admin/support', icon: SupportIcon, current: activeTab === 'support' },
  ];

  // Mock data for permits
  const permits = [
    {
      id: 'PER-2023-0089',
      type: 'Regular Permit',
      holder: 'John Doe',
      position: 'Drilling Engineer',
      issueDate: '2023-06-15',
      expiryDate: '2024-06-15',
      status: 'Active',
      permitNumber: 'REG-2023-089',
      department: 'Drilling Operations',
      location: 'Offshore Block 4',
      renewalRequired: false,
      daysToExpiry: 167,
      conditions: ['Valid for offshore operations only', 'Must carry permit at all times', 'Subject to safety inspections'],
      documents: ['Permit Certificate', 'Medical Certificate', 'Safety Training Certificate']
    },
    {
      id: 'PER-2023-0088',
      type: 'Rotator Permit',
      holder: 'Jane Smith',
      position: 'Production Engineer',
      issueDate: '2023-08-20',
      expiryDate: '2024-02-20',
      status: 'Expiring Soon',
      permitNumber: 'ROT-2023-088',
      department: 'Production',
      location: 'Onshore Field A',
      renewalRequired: true,
      daysToExpiry: 25,
      conditions: ['6-month rotation schedule', 'Valid for onshore operations', 'Requires quarterly health checks'],
      documents: ['Permit Certificate', 'Medical Certificate', 'Work Schedule']
    },
    {
      id: 'PER-2023-0087',
      type: 'Regular Permit',
      holder: 'Robert Johnson',
      position: 'Geologist',
      issueDate: '2023-03-10',
      expiryDate: '2024-03-10',
      status: 'Active',
      permitNumber: 'REG-2023-087',
      department: 'Exploration',
      location: 'Offshore Block 2',
      renewalRequired: false,
      daysToExpiry: 70,
      conditions: ['Valid for geological surveys', 'Environmental compliance required', 'Data sharing obligations'],
      documents: ['Permit Certificate', 'Environmental Clearance', 'Survey Authorization']
    },
    {
      id: 'PER-2023-0086',
      type: 'Company Registration',
      holder: 'Acme Corporation',
      position: 'N/A',
      issueDate: '2023-01-15',
      expiryDate: '2025-01-15',
      status: 'Active',
      permitNumber: 'COMP-2023-086',
      department: 'Corporate',
      location: 'All Operations',
      renewalRequired: false,
      daysToExpiry: 562,
      conditions: ['Annual compliance reporting', 'Local content obligations', 'Tax compliance required'],
      documents: ['Registration Certificate', 'Tax Clearance', 'Compliance Report']
    },
    {
      id: 'PER-2022-0145',
      type: 'Regular Permit',
      holder: 'Michael Brown',
      position: 'Safety Officer',
      issueDate: '2022-11-20',
      expiryDate: '2023-11-20',
      status: 'Expired',
      permitNumber: 'REG-2022-145',
      department: 'Safety & Environment',
      location: 'All Sites',
      renewalRequired: true,
      daysToExpiry: -45,
      conditions: ['Safety oversight responsibilities', 'Incident reporting duties', 'Training coordination'],
      documents: ['Expired Permit', 'Safety Certifications', 'Training Records']
    },
    {
      id: 'PER-2023-0085',
      type: 'Rotator Permit',
      holder: 'Lisa Wilson',
      position: 'Environmental Specialist',
      issueDate: '2023-09-01',
      expiryDate: '2024-03-01',
      status: 'Active',
      permitNumber: 'ROT-2023-085',
      department: 'Environmental',
      location: 'Multiple Sites',
      renewalRequired: false,
      daysToExpiry: 89,
      conditions: ['Environmental monitoring duties', '6-month rotation', 'Compliance reporting'],
      documents: ['Permit Certificate', 'Environmental Certification', 'Monitoring Equipment License']
    },
    {
      id: 'PER-2023-0084',
      type: 'Regular Permit',
      holder: 'James Davis',
      position: 'Mechanical Engineer',
      issueDate: '2023-07-10',
      expiryDate: '2024-07-10',
      status: 'Suspended',
      permitNumber: 'REG-2023-084',
      department: 'Engineering',
      location: 'Offshore Platform B',
      renewalRequired: false,
      daysToExpiry: 192,
      conditions: ['Suspended pending investigation', 'Contact HR for reinstatement', 'Training required'],
      documents: ['Suspended Permit', 'Investigation Report', 'Training Requirements']
    },
    {
      id: 'PER-2023-0083',
      type: 'Regular Permit',
      holder: 'Sarah Johnson',
      position: 'Operations Manager',
      issueDate: '2023-04-05',
      expiryDate: '2024-04-05',
      status: 'Active',
      permitNumber: 'REG-2023-083',
      department: 'Operations',
      location: 'Central Processing Facility',
      renewalRequired: false,
      daysToExpiry: 96,
      conditions: ['Operations oversight', 'Emergency response authority', 'Staff supervision'],
      documents: ['Permit Certificate', 'Management Authorization', 'Emergency Response Training']
    }
  ];

  const filteredPermits = permits.filter(permit => {
    const matchesSearch = permit.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permit.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permit.permitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permit.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || permit.status === filterStatus;
    const matchesType = filterType === 'all' || permit.type === filterType;
    
    let matchesTimeframe = true;
    if (selectedTimeframe !== 'all') {
      const daysCutoff = parseInt(selectedTimeframe);
      matchesTimeframe = permit.daysToExpiry <= daysCutoff && permit.daysToExpiry > 0;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesTimeframe;
  });

  const handleViewPermit = (id: string) => {
    alert(`Viewing permit details for ${id}`);
  };

  const handleDownloadPermit = (id: string) => {
    alert(`Downloading permit ${id}`);
  };

  const handleRenewPermit = (id: string) => {
    alert(`Starting renewal process for permit ${id}`);
  };

  const handlePrintPermit = (id: string) => {
    alert(`Printing permit ${id}`);
  };

  const handleRequestAmendment = (id: string) => {
    alert(`Requesting amendment for permit ${id}`);
  };

  const handleReportIssue = (id: string) => {
    alert(`Reporting issue with permit ${id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-orange-100 text-orange-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryColor = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return 'text-red-600 font-bold';
    if (daysToExpiry <= 30) return 'text-red-600 font-semibold';
    if (daysToExpiry <= 90) return 'text-yellow-600 font-medium';
    return 'text-green-600';
  };

  const getExpiryText = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return `Expired ${Math.abs(daysToExpiry)} days ago`;
    if (daysToExpiry === 0) return 'Expires today';
    return `${daysToExpiry} days remaining`;
  };

  return (
    <DashboardLayout
      title="Company Admin Dashboard"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Permits Management</h2>
              <p className="text-sm text-gray-500">View and manage all your active permits and certificates</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Bulk Renewal
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Export Report
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Search permits..."
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
                <option value="Active">Active</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Regular Permit">Regular Permit</option>
                <option value="Rotator Permit">Rotator Permit</option>
                <option value="Company Registration">Company Registration</option>
              </select>
            </div>
            <div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Permits</option>
                <option value="30">Expiring in 30 days</option>
                <option value="90">Expiring in 90 days</option>
                <option value="180">Expiring in 6 months</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900">Total Permits</h3>
              <p className="text-2xl font-bold text-blue-600">{filteredPermits.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">Active</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredPermits.filter(permit => permit.status === 'Active').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">Expiring Soon</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredPermits.filter(permit => permit.status === 'Expiring Soon').length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">Expired</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredPermits.filter(permit => permit.status === 'Expired').length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-orange-900">Suspended</h3>
              <p className="text-2xl font-bold text-orange-600">
                {filteredPermits.filter(permit => permit.status === 'Suspended').length}
              </p>
            </div>
          </div>

          {/* Permits Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permit Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Holder
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time to Expiry
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPermits.map((permit) => (
                  <tr key={permit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{permit.permitNumber}</div>
                        <div className="text-sm text-gray-500">{permit.type}</div>
                        <div className="text-xs text-gray-400">{permit.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{permit.holder}</div>
                        {permit.position !== 'N/A' && (
                          <div className="text-sm text-gray-500">{permit.position}</div>
                        )}
                        <div className="text-xs text-gray-400">{permit.department}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {permit.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {permit.expiryDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(permit.status)}`}>
                        {permit.status}
                      </span>
                      {permit.renewalRequired && (
                        <div className="text-xs text-orange-600 mt-1">Renewal Required</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {permit.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${getExpiryColor(permit.daysToExpiry)}`}>
                        {getExpiryText(permit.daysToExpiry)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => handleViewPermit(permit.id)}
                          className="text-blue-600 hover:text-blue-900 text-left"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDownloadPermit(permit.id)}
                          className="text-green-600 hover:text-green-900 text-left"
                        >
                          Download
                        </button>
                        {permit.status === 'Active' && (
                          <button
                            onClick={() => handlePrintPermit(permit.id)}
                            className="text-purple-600 hover:text-purple-900 text-left"
                          >
                            Print
                          </button>
                        )}
                        {(permit.renewalRequired || permit.daysToExpiry <= 90) && (
                          <button
                            onClick={() => handleRenewPermit(permit.id)}
                            className="text-orange-600 hover:text-orange-900 text-left"
                          >
                            Renew
                          </button>
                        )}
                        {permit.status === 'Active' && (
                          <button
                            onClick={() => handleRequestAmendment(permit.id)}
                            className="text-indigo-600 hover:text-indigo-900 text-left"
                          >
                            Amend
                          </button>
                        )}
                        <button
                          onClick={() => handleReportIssue(permit.id)}
                          className="text-red-600 hover:text-red-900 text-left"
                        >
                          Report Issue
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPermits.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No permits found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Permit Alerts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Permit Alerts & Reminders</h3>
          <div className="space-y-4">
            {permits.filter(p => p.daysToExpiry <= 30 && p.daysToExpiry > 0).map(permit => (
              <div key={permit.id} className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <span className="text-yellow-600 text-sm font-bold">⚠</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      {permit.permitNumber} - {permit.holder} expires in {permit.daysToExpiry} days
                    </p>
                    <p className="text-xs text-yellow-600">Expiry Date: {permit.expiryDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRenewPermit(permit.id)}
                  className="px-3 py-1 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700"
                >
                  Renew Now
                </button>
              </div>
            ))}
            
            {permits.filter(p => p.daysToExpiry < 0).map(permit => (
              <div key={permit.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <span className="text-red-600 text-sm font-bold">✕</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      {permit.permitNumber} - {permit.holder} expired {Math.abs(permit.daysToExpiry)} days ago
                    </p>
                    <p className="text-xs text-red-600">Expired: {permit.expiryDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRenewPermit(permit.id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
                >
                  Urgent Renewal
                </button>
              </div>
            ))}
            
            {permits.filter(p => p.status === 'Suspended').map(permit => (
              <div key={permit.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <span className="text-orange-600 text-sm font-bold">⏸</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-800">
                      {permit.permitNumber} - {permit.holder} is suspended
                    </p>
                    <p className="text-xs text-orange-600">Contact support for reinstatement</p>
                  </div>
                </div>
                <button
                  onClick={() => handleReportIssue(permit.id)}
                  className="px-3 py-1 bg-orange-600 text-white text-sm font-medium rounded hover:bg-orange-700"
                >
                  Contact Support
                </button>
              </div>
            ))}
          </div>
          
          {permits.filter(p => p.daysToExpiry <= 30 || p.status === 'Suspended').length === 0 && (
            <div className="text-center py-4">
              <p className="text-green-600">✓ All permits are in good standing</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}