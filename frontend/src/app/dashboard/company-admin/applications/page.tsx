'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { getMenuItemsByRole } from '../../../components/layouts/DashboardMenus';
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
  SupportIcon,
  FileTextIcon, // Added for Regular Permit
  RefreshCwIcon // Added for Rotator Permit
} from '../../../components/icons/DashboardIcons';
import Link from 'next/link'; // Added for navigation

export default function MyApplicationsPage() {
  const [activeTab, setActiveTab] = useState('applications');
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

  // Mock data for applications
  const applications = [
    {
      id: 'APP-2023-0142',
      type: 'Regular Permit',
      applicant: 'John Doe',
      position: 'Drilling Engineer',
      submissionDate: '2023-12-10',
      status: 'Under Review',
      currentStage: 'Technical Review',
      assignedTo: 'Sarah Wilson',
      priority: 'Medium',
      daysInSystem: 5,
      paymentStatus: 'Paid',
      amount: 2500,
      estimatedCompletion: '2023-12-20',
      documents: ['CV', 'Passport', 'Medical Certificate', 'Educational Certificates']
    },
    {
      id: 'APP-2023-0141',
      type: 'Rotator Permit',
      applicant: 'Jane Smith',
      position: 'Production Engineer',
      submissionDate: '2023-12-08',
      status: 'Approved',
      currentStage: 'Completed',
      assignedTo: 'Mike Johnson',
      priority: 'High',
      daysInSystem: 7,
      paymentStatus: 'Paid',
      amount: 3000,
      estimatedCompletion: '2023-12-15',
      documents: ['CV', 'Passport', 'Medical Certificate', 'Work Experience Letter']
    },
    {
      id: 'APP-2023-0140',
      type: 'Regular Permit',
      applicant: 'Robert Johnson',
      position: 'Geologist',
      submissionDate: '2023-12-05',
      status: 'Returned',
      currentStage: 'Document Review',
      assignedTo: 'Emily Davis',
      priority: 'Low',
      daysInSystem: 10,
      paymentStatus: 'Paid',
      amount: 2500,
      estimatedCompletion: '2023-12-25',
      documents: ['CV', 'Passport', 'Educational Certificates']
    },
    {
      id: 'APP-2023-0139',
      type: 'Company Registration',
      applicant: 'Acme Corporation',
      position: 'N/A',
      submissionDate: '2023-12-01',
      status: 'Under Review',
      currentStage: 'Legal Review',
      assignedTo: 'David Brown',
      priority: 'High',
      daysInSystem: 14,
      paymentStatus: 'Pending',
      amount: 5000,
      estimatedCompletion: '2023-12-30',
      documents: ['Certificate of Incorporation', 'Tax Clearance', 'Financial Statements']
    },
    {
      id: 'APP-2023-0138',
      type: 'JV Compliance',
      applicant: 'Acme Corporation',
      position: 'N/A',
      submissionDate: '2023-11-28',
      status: 'Draft',
      currentStage: 'Preparation',
      assignedTo: 'Not Assigned',
      priority: 'Medium',
      daysInSystem: 17,
      paymentStatus: 'Not Required',
      amount: 0,
      estimatedCompletion: '2023-12-28',
      documents: ['JV Agreement', 'Local Content Plan']
    },
    {
      id: 'APP-2023-0137',
      type: 'Regular Permit',
      applicant: 'Michael Brown',
      position: 'Safety Officer',
      submissionDate: '2023-11-25',
      status: 'Approved',
      currentStage: 'Completed',
      assignedTo: 'Sarah Wilson',
      priority: 'Medium',
      daysInSystem: 20,
      paymentStatus: 'Paid',
      amount: 2500,
      estimatedCompletion: '2023-12-15',
      documents: ['CV', 'Passport', 'Medical Certificate', 'Safety Certifications']
    },
    {
      id: 'APP-2023-0136',
      type: 'Rotator Permit',
      applicant: 'Lisa Wilson',
      position: 'Environmental Specialist',
      submissionDate: '2023-11-20',
      status: 'Rejected',
      currentStage: 'Final Review',
      assignedTo: 'Mike Johnson',
      priority: 'Low',
      daysInSystem: 25,
      paymentStatus: 'Refunded',
      amount: 3000,
      estimatedCompletion: 'N/A',
      documents: ['CV', 'Passport', 'Educational Certificates']
    },
    {
      id: 'APP-2023-0135',
      type: 'Regular Permit',
      applicant: 'James Davis',
      position: 'Mechanical Engineer',
      submissionDate: '2023-11-15',
      status: 'Under Review',
      currentStage: 'Background Check',
      assignedTo: 'Emily Davis',
      priority: 'Medium',
      daysInSystem: 30,
      paymentStatus: 'Paid',
      amount: 2500,
      estimatedCompletion: '2023-12-30',
      documents: ['CV', 'Passport', 'Medical Certificate', 'Work Experience Letter']
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesType = filterType === 'all' || app.type === filterType;
    const daysCutoff = selectedTimeframe === 'all' ? Infinity : parseInt(selectedTimeframe);
    const matchesTimeframe = selectedTimeframe === 'all' || app.daysInSystem <= daysCutoff;
    return matchesSearch && matchesStatus && matchesType && matchesTimeframe;
  });

  // const handleNewApplication = () => {
  //   alert('Redirecting to new application form...');
  // };

const applicationTypes = [
  {
    name: 'New Regular Permit',
    description: 'Apply for a standard work permit for an individual.',
    href: '/dashboard/company-admin/applications/regular',
    icon: FileTextIcon, 
  },
  {
    name: 'New Rotator Permit',
    description: 'Apply for a work permit for personnel on a rotational schedule.',
    href: '/dashboard/company-admin/applications/rotator',
    icon: RefreshCwIcon, 
  },
  {
    name: 'Register Company',
    description: 'Register your company to operate in the upstream sector.',
    href: '/apply/company-registration', // Assuming this exists or will be created
    icon: PermitIcon, // Using PermitIcon as a placeholder, can be changed
  },
];


  const handleViewApplication = (id: string) => {
    alert(`Viewing application details for ${id}`);
  };

  const handleEditApplication = (id: string) => {
    alert(`Editing application ${id}`);
  };

  const handleTrackApplication = (id: string) => {
    alert(`Tracking application ${id}`);
  };

  const handleDownloadApplication = (id: string) => {
    alert(`Downloading application ${id}`);
  };

  const handleWithdrawApplication = (id: string) => {
    if (confirm('Are you sure you want to withdraw this application?')) {
      alert(`Application ${id} withdrawn`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Returned': return 'bg-orange-100 text-orange-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Refunded': return 'bg-blue-100 text-blue-800';
      case 'Not Required': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} title="Manage Applications" userRole="Company Admin">
      <div className="p-6 bg-gray-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Applications</h1>
          <p className="text-gray-600 mt-1">Oversee, track, and initiate new applications for your company.</p>
        </header>

        {/* Section to start new applications */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">Start a New Application</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applicationTypes.map((appType) => (
              <Link key={appType.name} href={appType.href} legacyBehavior>
                <a className="block p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out transform hover:-translate-y-1">
                  <div className="flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-indigo-100 text-indigo-600">
                    <appType.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{appType.name}</h5>
                  <p className="font-normal text-sm text-gray-600">{appType.description}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* Submitted Applications Section Header */}
        <div className="mb-4 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800">My Submitted Applications</h2>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-700">Search</label>
              <input 
                type="text" 
                id="searchQuery" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="ID, Applicant, Type..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Returned">Returned</option>
                <option value="Rejected">Rejected</option>
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
                <option value="JV Compliance">JV Compliance</option>
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
              <h3 className="text-sm font-medium text-yellow-900">Under Review</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredApplications.filter(app => app.status === 'Under Review').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">Approved</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredApplications.filter(app => app.status === 'Approved').length}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-orange-900">Returned</h3>
              <p className="text-2xl font-bold text-orange-600">
                {filteredApplications.filter(app => app.status === 'Returned').length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900">Draft</h3>
              <p className="text-2xl font-bold text-gray-600">
                {filteredApplications.filter(app => app.status === 'Draft').length}
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
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in System
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{application.applicant}</div>
                        {application.position !== 'N/A' && (
                          <div className="text-sm text-gray-500">{application.position}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.submissionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.currentStage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(application.paymentStatus)}`}>
                          {application.paymentStatus}
                        </span>
                        {application.amount > 0 && (
                          <div className="text-sm text-gray-500">GHS {application.amount.toLocaleString()}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={getPriorityColor(application.priority)}>
                        {application.daysInSystem} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewApplication(application.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {application.status === 'Draft' && (
                        <button
                          onClick={() => handleEditApplication(application.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleTrackApplication(application.id)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Track
                      </button>
                      {application.status === 'Approved' && (
                        <button
                          onClick={() => handleDownloadApplication(application.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Download
                        </button>
                      )}
                      {(application.status === 'Draft' || application.status === 'Under Review') && (
                        <button
                          onClick={() => handleWithdrawApplication(application.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Withdraw
                        </button>
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

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="font-medium text-gray-900">New Application</div>
                <div className="text-sm text-gray-500">Start a new permit application</div>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">
                  <HomeIcon className="h-8 w-8" />
                </div>
                <div className="font-medium text-gray-900">Application Report</div>
                <div className="text-sm text-gray-500">Generate application summary</div>
              </div>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📋</div>
                <div className="font-medium text-gray-900">Bulk Upload</div>
                <div className="text-sm text-gray-500">Upload multiple applications</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}