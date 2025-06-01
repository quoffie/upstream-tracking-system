'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface WorkflowStage {
  id: string;
  name: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Blocked';
  duration: number; // in days
  assignedTo?: string;
  completedDate?: string;
  notes?: string;
}

interface WorkflowItem {
  id: string;
  applicationId: string;
  company: string;
  type: string;
  currentStage: string;
  overallProgress: number;
  startDate: string;
  estimatedCompletion: string;
  priority: 'High' | 'Medium' | 'Low';
  stages: WorkflowStage[];
}

export default function WorkflowStatusPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data for workflows
    const mockWorkflows: WorkflowItem[] = [
      {
        id: 'WF-001',
        applicationId: 'APP-2024-001',
        company: 'Kosmos Energy Ghana Limited',
        type: 'Company Registration',
        currentStage: 'Document Review',
        overallProgress: 65,
        startDate: '2024-01-15',
        estimatedCompletion: '2024-02-15',
        priority: 'High',
        stages: [
          {
            id: 'stage-1',
            name: 'Initial Submission',
            description: 'Application submitted and acknowledged',
            status: 'Completed',
            duration: 1,
            completedDate: '2024-01-15',
            assignedTo: 'System'
          },
          {
            id: 'stage-2',
            name: 'Preliminary Review',
            description: 'Initial review of application completeness',
            status: 'Completed',
            duration: 3,
            completedDate: '2024-01-18',
            assignedTo: 'John Doe'
          },
          {
            id: 'stage-3',
            name: 'Document Review',
            description: 'Detailed review of submitted documents',
            status: 'In Progress',
            duration: 7,
            assignedTo: 'Jane Smith'
          },
          {
            id: 'stage-4',
            name: 'Technical Assessment',
            description: 'Technical evaluation of application',
            status: 'Pending',
            duration: 5
          },
          {
            id: 'stage-5',
            name: 'Final Approval',
            description: 'Final decision and approval',
            status: 'Pending',
            duration: 2
          }
        ]
      },
      {
        id: 'WF-002',
        applicationId: 'APP-2024-002',
        company: 'Shell Petroleum Development Company',
        type: 'Regular Permit',
        currentStage: 'Payment Verification',
        overallProgress: 90,
        startDate: '2024-01-18',
        estimatedCompletion: '2024-02-10',
        priority: 'Medium',
        stages: [
          {
            id: 'stage-1',
            name: 'Initial Submission',
            description: 'Application submitted and acknowledged',
            status: 'Completed',
            duration: 1,
            completedDate: '2024-01-18',
            assignedTo: 'System'
          },
          {
            id: 'stage-2',
            name: 'Document Review',
            description: 'Review of permit application documents',
            status: 'Completed',
            duration: 5,
            completedDate: '2024-01-23',
            assignedTo: 'Mike Johnson'
          },
          {
            id: 'stage-3',
            name: 'Technical Assessment',
            description: 'Technical evaluation and site inspection',
            status: 'Completed',
            duration: 7,
            completedDate: '2024-01-30',
            assignedTo: 'Sarah Wilson'
          },
          {
            id: 'stage-4',
            name: 'Payment Verification',
            description: 'Verification of permit fees payment',
            status: 'In Progress',
            duration: 2,
            assignedTo: 'Finance Team'
          },
          {
            id: 'stage-5',
            name: 'Permit Issuance',
            description: 'Final permit generation and issuance',
            status: 'Pending',
            duration: 1
          }
        ]
      },
      {
        id: 'WF-003',
        applicationId: 'APP-2024-003',
        company: 'Eni Ghana Exploration',
        type: 'JV Application',
        currentStage: 'Preliminary Review',
        overallProgress: 25,
        startDate: '2024-01-20',
        estimatedCompletion: '2024-03-20',
        priority: 'High',
        stages: [
          {
            id: 'stage-1',
            name: 'Initial Submission',
            description: 'JV application submitted',
            status: 'Completed',
            duration: 1,
            completedDate: '2024-01-20',
            assignedTo: 'System'
          },
          {
            id: 'stage-2',
            name: 'Preliminary Review',
            description: 'Initial review of JV proposal',
            status: 'In Progress',
            duration: 10,
            assignedTo: 'JV Review Committee'
          },
          {
            id: 'stage-3',
            name: 'Stakeholder Consultation',
            description: 'Consultation with relevant stakeholders',
            status: 'Pending',
            duration: 14
          },
          {
            id: 'stage-4',
            name: 'Legal Review',
            description: 'Legal assessment of JV agreement',
            status: 'Pending',
            duration: 10
          },
          {
            id: 'stage-5',
            name: 'Final Approval',
            description: 'Board approval and final decision',
            status: 'Pending',
            duration: 5
          }
        ]
      }
    ];
    setWorkflows(mockWorkflows);
  }, []);

  const filteredWorkflows = workflows.filter(workflow => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'in-progress') return workflow.overallProgress > 0 && workflow.overallProgress < 100;
    if (statusFilter === 'completed') return workflow.overallProgress === 100;
    if (statusFilter === 'delayed') return new Date(workflow.estimatedCompletion) < new Date();
    return true;
  });

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">🔄</span>
              Workflow Status & Timeline
            </h1>
            <p className="text-gray-600 mt-2">Monitor application workflows and track progress through each stage</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                List View
              </button>
              <button 
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  viewMode === 'timeline' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                }`}
              >
                Timeline View
              </button>
            </div>
            <button 
              onClick={() => router.push('/dashboard/commission-admin/workflow/analytics')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{workflows.length}</div>
            <div className="text-sm text-gray-600">Active Workflows</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {workflows.filter(w => w.overallProgress > 0 && w.overallProgress < 100).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {workflows.filter(w => w.overallProgress === 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {workflows.filter(w => new Date(w.estimatedCompletion) < new Date()).length}
            </div>
            <div className="text-sm text-gray-600">Delayed</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Workflows</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
      </div>

      {/* Workflow List/Timeline */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Active Workflows ({filteredWorkflows.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Completion</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWorkflows.map((workflow) => (
                  <tr key={workflow.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {workflow.applicationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workflow.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workflow.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {workflow.currentStage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(workflow.overallProgress)}`}
                            style={{ width: `${workflow.overallProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{workflow.overallProgress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(workflow.priority)}`}>
                        {workflow.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={new Date(workflow.estimatedCompletion) < new Date() ? 'text-red-600 font-semibold' : ''}>
                        {new Date(workflow.estimatedCompletion).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedWorkflow(workflow)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Timeline
                        </button>
                        <button className="text-green-600 hover:text-green-900">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredWorkflows.map((workflow) => (
            <div key={workflow.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workflow.applicationId} - {workflow.company}</h3>
                  <p className="text-sm text-gray-600">{workflow.type}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(workflow.priority)}`}>
                    {workflow.priority}
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{workflow.overallProgress}% Complete</div>
                    <div className="text-xs text-gray-500">Est: {new Date(workflow.estimatedCompletion).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {workflow.stages.map((stage, index) => (
                    <div key={stage.id} className="relative flex items-start">
                      <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        stage.status === 'Completed' ? 'bg-green-500 border-green-500' :
                        stage.status === 'In Progress' ? 'bg-blue-500 border-blue-500' :
                        stage.status === 'Blocked' ? 'bg-red-500 border-red-500' :
                        'bg-gray-200 border-gray-300'
                      }`}>
                        {stage.status === 'Completed' && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {stage.status === 'In Progress' && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{stage.name}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageStatusColor(stage.status)}`}>
                            {stage.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Duration: {stage.duration} days</span>
                          {stage.assignedTo && <span>Assigned: {stage.assignedTo}</span>}
                          {stage.completedDate && <span>Completed: {new Date(stage.completedDate).toLocaleDateString()}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Workflow Timeline - {selectedWorkflow.applicationId}
                </h2>
                <button 
                  onClick={() => setSelectedWorkflow(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Workflow timeline content would go here */}
              <p className="text-gray-600">Detailed workflow timeline for {selectedWorkflow.company}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Timeline View</h3>
          <p className="text-sm opacity-90 mb-4">Detailed timeline view of workflows</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/workflow/timeline')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Timeline
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
          <p className="text-sm opacity-90 mb-4">Track all workflow changes and actions</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/workflow/audit')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Audit Trail
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Stage Analytics</h3>
          <p className="text-sm opacity-90 mb-4">Analyze workflow performance metrics</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/workflow/analytics')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}