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

export default function WorkflowStatusPage() {
  const [activeTab, setActiveTab] = useState('workflow');
  const [selectedWorkflow, setSelectedWorkflow] = useState('all');
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

  // Mock data for workflow stages
  const workflowStages = {
    'Regular Permit': [
      'Application Submission',
      'Document Verification',
      'Payment Processing',
      'Technical Review',
      'Compliance Check',
      'Final Approval',
      'Certificate Generation'
    ],
    'Rotator Permit': [
      'Application Submission',
      'Document Verification',
      'Payment Processing',
      'Background Check',
      'Medical Clearance',
      'Final Approval',
      'Forward to GIS'
    ],
    'Company Registration': [
      'Application Submission',
      'Document Verification',
      'Payment Processing',
      'Legal Review',
      'Compliance Verification',
      'Final Approval',
      'Registration Certificate'
    ],
    'JV Compliance': [
      'Application Submission',
      'Document Review',
      'Payment Processing',
      'Joint Venture Analysis',
      'Compliance Assessment',
      'Final Approval',
      'Compliance Certificate'
    ],
    'Local Content': [
      'Application Submission',
      'Document Review',
      'Payment Processing',
      'Local Content Analysis',
      'Compliance Verification',
      'Final Approval',
      'Compliance Report'
    ]
  };

  // Mock data for applications in workflow
  const workflowApplications = [
    {
      id: 'APP-2023-0050',
      type: 'Regular Permit',
      company: 'Tullow Ghana Ltd',
      currentStage: 'Technical Review',
      stageIndex: 3,
      assignedTo: 'Mike Johnson',
      timeInStage: '2 days',
      totalTime: '8 days',
      bottleneck: false,
      priority: 'High'
    },
    {
      id: 'APP-2023-0049',
      type: 'Rotator Permit',
      company: 'Eni Ghana',
      currentStage: 'Background Check',
      stageIndex: 3,
      assignedTo: 'Sarah Wilson',
      timeInStage: '5 days',
      totalTime: '12 days',
      bottleneck: true,
      priority: 'High'
    },
    {
      id: 'APP-2023-0048',
      type: 'Company Registration',
      company: 'Kosmos Energy',
      currentStage: 'Legal Review',
      stageIndex: 3,
      assignedTo: 'Legal Team',
      timeInStage: '3 days',
      totalTime: '10 days',
      bottleneck: false,
      priority: 'Medium'
    },
    {
      id: 'APP-2023-0047',
      type: 'JV Compliance',
      company: 'Baker Hughes Ghana',
      currentStage: 'Joint Venture Analysis',
      stageIndex: 3,
      assignedTo: 'Compliance Team',
      timeInStage: '7 days',
      totalTime: '15 days',
      bottleneck: true,
      priority: 'Low'
    },
    {
      id: 'APP-2023-0046',
      type: 'Local Content',
      company: 'Schlumberger Ghana',
      currentStage: 'Local Content Analysis',
      stageIndex: 3,
      assignedTo: 'Local Content Officer',
      timeInStage: '1 day',
      totalTime: '6 days',
      bottleneck: false,
      priority: 'Medium'
    }
  ];

  const filteredApplications = workflowApplications.filter(app => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWorkflow = selectedWorkflow === 'all' || app.type === selectedWorkflow;
    return matchesSearch && matchesWorkflow;
  });

  const handleViewWorkflow = (id: string) => {
    alert(`Viewing detailed workflow for application ${id}`);
  };

  const handleOptimizeWorkflow = () => {
    alert('Analyzing workflow bottlenecks and generating optimization recommendations...');
  };

  const handleReassignStage = (id: string) => {
    const newAssignee = prompt('Enter new assignee for this stage:');
    if (newAssignee) {
      alert(`Reassigning current stage of application ${id} to ${newAssignee}`);
    }
  };

  const handleEscalateBottleneck = (id: string) => {
    alert(`Escalating bottleneck for application ${id} to management`);
  };

  const getStageProgress = (stageIndex: number, totalStages: number) => {
    return ((stageIndex + 1) / totalStages) * 100;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
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
              <h2 className="text-2xl font-bold text-gray-900">Workflow Status Viewer</h2>
              <p className="text-sm text-gray-500">Monitor application progress through workflow stages</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleOptimizeWorkflow}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
              >
                Optimize Workflows
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
                value={selectedWorkflow}
                onChange={(e) => setSelectedWorkflow(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Workflows</option>
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
              <h3 className="text-sm font-medium text-blue-900">Active Workflows</h3>
              <p className="text-2xl font-bold text-blue-600">{filteredApplications.length}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">Bottlenecks</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredApplications.filter(a => a.bottleneck).length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">Avg. Processing Time</h3>
              <p className="text-2xl font-bold text-yellow-600">9.2 days</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">On Track</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredApplications.filter(a => !a.bottleneck).length}
              </p>
            </div>
          </div>

          {/* Workflow Applications */}
          <div className="space-y-4">
            {filteredApplications.map((application) => {
              const stages = workflowStages[application.type as keyof typeof workflowStages];
              const progress = getStageProgress(application.stageIndex, stages.length);
              
              return (
                <div key={application.id} className={`border rounded-lg p-6 ${application.bottleneck ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{application.id}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </span>
                        {application.bottleneck && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-red-600 bg-red-100">
                            Bottleneck
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{application.company} - {application.type}</p>
                      <p className="text-sm text-gray-500">Assigned to: {application.assignedTo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Time in current stage: {application.timeInStage}</p>
                      <p className="text-sm text-gray-500">Total time: {application.totalTime}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress: {Math.round(progress)}%</span>
                      <span>Stage {application.stageIndex + 1} of {stages.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${application.bottleneck ? 'bg-red-500' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Workflow Stages */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {stages.map((stage, index) => {
                        let stageClass = 'px-3 py-1 text-xs rounded-full ';
                        if (index < application.stageIndex) {
                          stageClass += 'bg-green-100 text-green-800'; // Completed
                        } else if (index === application.stageIndex) {
                          stageClass += application.bottleneck ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'; // Current
                        } else {
                          stageClass += 'bg-gray-100 text-gray-600'; // Pending
                        }
                        
                        return (
                          <span key={index} className={stageClass}>
                            {stage}
                            {index === application.stageIndex && ' (Current)'}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewWorkflow(application.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleReassignStage(application.id)}
                      className="text-purple-600 hover:text-purple-900 text-sm font-medium"
                    >
                      Reassign Stage
                    </button>
                    {application.bottleneck && (
                      <button
                        onClick={() => handleEscalateBottleneck(application.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Escalate Bottleneck
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Workflow Templates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(workflowStages).map(([workflowType, stages]) => (
              <div key={workflowType} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{workflowType}</h4>
                <p className="text-sm text-gray-500 mb-3">{stages.length} stages</p>
                <div className="space-y-1">
                  {stages.map((stage, index) => (
                    <div key={index} className="text-xs text-gray-600 flex items-center">
                      <span className="w-4 h-4 rounded-full bg-gray-200 mr-2 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {stage}
                    </div>
                  ))}
                </div>
                <button className="mt-3 text-blue-600 hover:text-blue-900 text-sm font-medium">
                  Edit Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}