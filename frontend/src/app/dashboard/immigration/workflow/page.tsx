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

export default function WorkflowStatusPage() {
  const [activeTab, setActiveTab] = useState('workflow');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

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

  // Mock data for workflow status
  const workflowItems = [
    {
      id: 'APP-2024-0145',
      permitNumber: 'GIS-REG-2024-145',
      type: 'Regular Permit',
      applicant: 'James Wilson',
      nationality: 'United Kingdom',
      company: 'Offshore Solutions Ltd',
      position: 'Petroleum Engineer',
      submissionDate: '2024-01-15',
      currentStage: 'PC Approval',
      nextStage: 'Immigration Review',
      daysInStage: 3,
      totalDays: 3,
      status: 'In Progress',
      paymentStatus: 'Pending',
      assignedTo: 'PC Officer',
      priority: 'Normal'
    },
    {
      id: 'APP-2024-0144',
      permitNumber: 'GIS-REG-2024-144',
      type: 'Regular Permit',
      applicant: 'Sarah Johnson',
      nationality: 'United States',
      company: 'DeepWater Drilling Co',
      position: 'Drilling Supervisor',
      submissionDate: '2024-01-14',
      currentStage: 'PC Approval',
      nextStage: 'Immigration Review',
      daysInStage: 4,
      totalDays: 4,
      status: 'In Progress',
      paymentStatus: 'Pending',
      assignedTo: 'PC Officer',
      priority: 'Normal'
    },
    {
      id: 'APP-2024-0142',
      permitNumber: 'GIS-ROT-2024-142',
      type: 'Rotator Permit',
      applicant: 'Carlos Rodriguez',
      nationality: 'Spain',
      company: 'Acme Drilling Ltd',
      position: 'Safety Officer',
      submissionDate: '2024-01-12',
      currentStage: 'Immigration Review',
      nextStage: 'Immigration Approval',
      daysInStage: 2,
      totalDays: 6,
      status: 'In Progress',
      paymentStatus: 'Paid',
      assignedTo: 'GIS Officer',
      priority: 'High'
    },
    {
      id: 'APP-2024-0140',
      permitNumber: 'GIS-REG-2024-140',
      type: 'Regular Permit',
      applicant: 'Anna Schmidt',
      nationality: 'Germany',
      company: 'Nordic Offshore Ltd',
      position: 'Process Engineer',
      submissionDate: '2024-01-10',
      currentStage: 'Immigration Approval',
      nextStage: 'Certificate Issuance',
      daysInStage: 1,
      totalDays: 8,
      status: 'In Progress',
      paymentStatus: 'Paid',
      assignedTo: 'GIS Officer',
      priority: 'Normal'
    },
    {
      id: 'APP-2024-0138',
      permitNumber: 'GIS-ROT-2024-138',
      type: 'Rotator Permit',
      applicant: 'Daniel Kim',
      nationality: 'South Korea',
      company: 'Global Exploration Inc',
      position: 'Reservoir Engineer',
      submissionDate: '2024-01-08',
      currentStage: 'Certificate Issuance',
      nextStage: 'Complete',
      daysInStage: 1,
      totalDays: 10,
      status: 'In Progress',
      paymentStatus: 'Paid',
      assignedTo: 'GIS Officer',
      priority: 'Normal'
    },
    {
      id: 'APP-2024-0135',
      permitNumber: 'GIS-REG-2024-135',
      type: 'Regular Permit',
      applicant: 'Maria Lopez',
      nationality: 'Mexico',
      company: 'PetroGhana Services',
      position: 'Drilling Engineer',
      submissionDate: '2024-01-05',
      currentStage: 'Complete',
      nextStage: '',
      daysInStage: 0,
      totalDays: 12,
      status: 'Completed',
      paymentStatus: 'Paid',
      assignedTo: '',
      priority: 'Normal'
    },
    {
      id: 'APP-2024-0132',
      permitNumber: 'GIS-ROT-2024-132',
      type: 'Rotator Permit',
      applicant: 'Laura Thompson',
      nationality: 'Canada',
      company: 'Atlantic Petroleum',
      position: 'HSE Specialist',
      submissionDate: '2024-01-02',
      currentStage: 'Complete',
      nextStage: '',
      daysInStage: 0,
      totalDays: 15,
      status: 'Completed',
      paymentStatus: 'Paid',
      assignedTo: '',
      priority: 'Normal'
    },
    {
      id: 'APP-2023-0130',
      permitNumber: 'GIS-REG-2023-130',
      type: 'Regular Permit',
      applicant: 'Richard Wong',
      nationality: 'Malaysia',
      company: 'EuroGas Exploration',
      position: 'Production Manager',
      submissionDate: '2023-12-28',
      currentStage: 'Information Request',
      nextStage: 'PC Approval',
      daysInStage: 5,
      totalDays: 20,
      status: 'On Hold',
      paymentStatus: 'Pending',
      assignedTo: 'Company Admin',
      priority: 'Low'
    }
  ];

  const filteredWorkflowItems = workflowItems.filter(item => {
    const matchesSearch = item.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.permitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.nationality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.currentStage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesType = filterType === 'all' || item.type === filterType;
    
    let matchesTimeframe = true;
    if (selectedTimeframe !== 'all') {
      const daysCutoff = parseInt(selectedTimeframe);
      matchesTimeframe = item.totalDays <= daysCutoff;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesTimeframe;
  });

  const handleViewWorkflow = (id: string) => {
    alert(`Viewing workflow details for ${id}`);
  };

  const handleAssignWorkflow = (id: string) => {
    alert(`Assigning workflow ${id}`);
  };

  const handleUpdateStage = (id: string) => {
    alert(`Updating stage for workflow ${id}`);
  };

  const handleSendReminder = (id: string) => {
    alert(`Sending reminder for workflow ${id}`);
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
          <h1 className="text-2xl font-semibold text-gray-900">Workflow Status</h1>
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
                placeholder="Search by ID, permit number, applicant, nationality, company, or stage"
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
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
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
                <option value="5">≤ 5 days</option>
                <option value="10">≤ 10 days</option>
                <option value="15">≤ 15 days</option>
                <option value="30">≤ 30 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workflow Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Application Workflows ({filteredWorkflowItems.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permit Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days in Stage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Days
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
                {filteredWorkflowItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.permitNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.applicant}
                      <div className="text-xs text-gray-500">{item.nationality}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.company}
                      <div className="text-xs">{item.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.currentStage}
                      {item.nextStage && (
                        <div className="text-xs text-gray-500">Next: {item.nextStage}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={
                        `font-medium 
                        ${item.daysInStage > 5 ? 'text-red-600' : ''}
                        ${item.daysInStage > 3 && item.daysInStage <= 5 ? 'text-yellow-600' : ''}
                        ${item.daysInStage <= 3 ? 'text-gray-900' : ''}`
                      }>
                        {item.daysInStage} days
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.totalDays} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={
                        `px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : ''}
                        ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                        ${item.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${item.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}`
                      }>
                        {item.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.paymentStatus === 'Paid' ? (
                          <span className="text-green-600">Payment: Paid</span>
                        ) : (
                          <span className="text-yellow-600">Payment: Pending</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewWorkflow(item.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        {item.status === 'In Progress' && (
                          <>
                            <button
                              onClick={() => handleUpdateStage(item.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Update
                            </button>
                            {item.assignedTo === 'GIS Officer' && (
                              <button
                                onClick={() => handleAssignWorkflow(item.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Reassign
                              </button>
                            )}
                          </>
                        )}
                        {item.status === 'On Hold' && (
                          <button
                            onClick={() => handleSendReminder(item.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Remind
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredWorkflowItems.length === 0 && (
            <div className="px-6 py-4 text-center text-gray-500">
              No workflow items match your filters.
            </div>
          )}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredWorkflowItems.length} of {workflowItems.length} workflow items
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