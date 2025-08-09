'use client';

import { useState } from 'react';
import {
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  BellIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface PermitApplication {
  id: string;
  applicantName: string;
  company: string;
  permitType: string;
  applicationDate: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'expired';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expiryDate: string;
  documents: number;
  assignedOfficer: string;
  lastUpdate: string;
  description: string;
  location: string;
  duration: string;
}

const mockApplications: PermitApplication[] = [
  {
    id: 'PA001',
    applicantName: 'John Adebayo',
    company: 'Shell Nigeria',
    permitType: 'Work Permit',
    applicationDate: '2024-01-15',
    status: 'under_review',
    priority: 'high',
    expiryDate: '2024-12-31',
    documents: 8,
    assignedOfficer: 'Sarah Johnson',
    lastUpdate: '2024-02-01',
    description: 'Senior Engineer position for offshore drilling operations',
    location: 'Lagos, Nigeria',
    duration: '2 years'
  },
  {
    id: 'PA002',
    applicantName: 'Maria Santos',
    company: 'TotalEnergies',
    permitType: 'Residence Permit',
    applicationDate: '2024-01-20',
    status: 'pending',
    priority: 'medium',
    expiryDate: '2025-01-20',
    documents: 6,
    assignedOfficer: 'Michael Chen',
    lastUpdate: '2024-01-28',
    description: 'Project Manager for renewable energy initiatives',
    location: 'Abuja, Nigeria',
    duration: '3 years'
  },
  {
    id: 'PA003',
    applicantName: 'David Thompson',
    company: 'Chevron Nigeria',
    permitType: 'Business Visa',
    applicationDate: '2024-01-10',
    status: 'approved',
    priority: 'low',
    expiryDate: '2024-07-10',
    documents: 4,
    assignedOfficer: 'Amina Hassan',
    lastUpdate: '2024-01-25',
    description: 'Consultant for environmental compliance assessment',
    location: 'Port Harcourt, Nigeria',
    duration: '6 months'
  },
  {
    id: 'PA004',
    applicantName: 'Lisa Wang',
    company: 'ExxonMobil',
    permitType: 'Work Permit',
    applicationDate: '2024-01-05',
    status: 'rejected',
    priority: 'medium',
    expiryDate: 'N/A',
    documents: 5,
    assignedOfficer: 'Ibrahim Musa',
    lastUpdate: '2024-01-30',
    description: 'Technical Specialist for drilling operations',
    location: 'Warri, Nigeria',
    duration: '18 months'
  },
  {
    id: 'PA005',
    applicantName: 'Robert Brown',
    company: 'Eni Nigeria',
    permitType: 'Temporary Work Permit',
    applicationDate: '2024-02-01',
    status: 'pending',
    priority: 'urgent',
    expiryDate: '2024-08-01',
    documents: 7,
    assignedOfficer: 'Grace Okafor',
    lastUpdate: '2024-02-02',
    description: 'Emergency response coordinator for offshore platform',
    location: 'Lagos, Nigeria',
    duration: '6 months'
  }
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  under_review: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const statusIcons = {
  pending: ClockIcon,
  under_review: DocumentTextIcon,
  approved: CheckCircleIcon,
  rejected: XCircleIcon,
  expired: ExclamationTriangleIcon
};

export default function PermitApplicationsPage() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<PermitApplication | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.permitType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || application.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewApplication = (application: PermitApplication) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleStatusUpdate = (applicationId: string, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus as any, lastUpdate: new Date().toISOString().split('T')[0] }
        : app
    ));
  };

  const getStatusIcon = (status: string) => {
    const IconComponent = statusIcons[status as keyof typeof statusIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <ClockIcon className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permit Applications</h1>
          <p className="text-gray-600">Manage and track permit applications for personnel</p>
        </div>
        <button 
          onClick={() => setShowNewApplicationForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Application
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === 'pending' || app.status === 'under_review').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">
                {applications.filter(app => app.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permit Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Officer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                        <div className="text-sm text-gray-500">{application.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.permitType}</div>
                    <div className="text-sm text-gray-500">{application.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1">{application.status.replace('_', ' ').toUpperCase()}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[application.priority]}`}>
                      {application.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.applicationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.assignedOfficer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewApplication(application)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Application Details</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Application ID</p>
                    <p className="text-sm text-gray-900">{selectedApplication.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedApplication.status]}`}>
                      {selectedApplication.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Applicant Name</p>
                    <p className="text-sm text-gray-900">{selectedApplication.applicantName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Company</p>
                    <p className="text-sm text-gray-900">{selectedApplication.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Permit Type</p>
                    <p className="text-sm text-gray-900">{selectedApplication.permitType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Duration</p>
                    <p className="text-sm text-gray-900">{selectedApplication.duration}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Description</p>
                  <p className="text-sm text-gray-900">{selectedApplication.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Location</p>
                    <p className="text-sm text-gray-900">{selectedApplication.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Assigned Officer</p>
                    <p className="text-sm text-gray-900">{selectedApplication.assignedOfficer}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Application Date</p>
                    <p className="text-sm text-gray-900">{selectedApplication.applicationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Expiry Date</p>
                    <p className="text-sm text-gray-900">{selectedApplication.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Documents</p>
                    <p className="text-sm text-gray-900">{selectedApplication.documents} files</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}