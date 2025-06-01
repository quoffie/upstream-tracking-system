'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  ArrowPathIcon,
  FunnelIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  BellIcon
} from '@heroicons/react/24/outline';

interface PendingApproval {
  id: string;
  type: 'permit' | 'registration' | 'renewal' | 'jv';
  title: string;
  company: string;
  submittedDate: string;
  dueDate: string;
  status: 'pending' | 'overdue' | 'critical';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
}

const PendingApprovalsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [filteredApprovals, setFilteredApprovals] = useState<PendingApproval[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for pending approvals
    const mockApprovals: PendingApproval[] = [
      {
        id: 'PA-001',
        type: 'permit',
        title: 'Regular Permit Application - Offshore Block A',
        company: 'Ghana Oil Exploration Ltd',
        submittedDate: '2024-01-10T10:30:00Z',
        dueDate: '2024-01-25T23:59:59Z',
        status: 'pending',
        assignedTo: 'Eng. Akosua Mensah',
        priority: 'high',
        description: 'Regular permit application for exploration activities in Offshore Block A.'
      },
      {
        id: 'PA-002',
        type: 'registration',
        title: 'Company Registration - Accra Petroleum Services',
        company: 'Accra Petroleum Services',
        submittedDate: '2024-01-08T14:15:00Z',
        dueDate: '2024-01-23T23:59:59Z',
        status: 'pending',
        assignedTo: 'Mr. Joseph Osei',
        priority: 'medium',
        description: 'New company registration for local service provider.'
      },
      {
        id: 'PA-003',
        type: 'renewal',
        title: 'Permit Renewal - Onshore Block C',
        company: 'West Africa Energy Partners',
        submittedDate: '2024-01-05T09:45:00Z',
        dueDate: '2024-01-20T23:59:59Z',
        status: 'overdue',
        assignedTo: 'Dr. Kwame Asante',
        priority: 'urgent',
        description: 'Renewal of existing permit for production activities in Onshore Block C.'
      },
      {
        id: 'PA-004',
        type: 'jv',
        title: 'Joint Venture Approval - Deepwater Exploration',
        company: 'Ghana National Petroleum Corporation / International Oil Co.',
        submittedDate: '2024-01-12T11:20:00Z',
        dueDate: '2024-01-27T23:59:59Z',
        status: 'pending',
        assignedTo: 'Ms. Ama Serwaa',
        priority: 'high',
        description: 'Joint venture agreement for deepwater exploration activities.'
      },
      {
        id: 'PA-005',
        type: 'permit',
        title: 'Rotator Permit - Technical Personnel',
        company: 'Tema Drilling Services',
        submittedDate: '2024-01-03T13:10:00Z',
        dueDate: '2024-01-18T23:59:59Z',
        status: 'critical',
        assignedTo: 'Eng. Kofi Adjei',
        priority: 'urgent',
        description: 'Rotator permit for specialized technical personnel for offshore drilling operations.'
      },
      {
        id: 'PA-006',
        type: 'registration',
        title: 'Company Registration - Takoradi Marine Logistics',
        company: 'Takoradi Marine Logistics',
        submittedDate: '2024-01-09T15:30:00Z',
        dueDate: '2024-01-24T23:59:59Z',
        status: 'pending',
        assignedTo: 'Mr. Joseph Osei',
        priority: 'low',
        description: 'New company registration for marine logistics services provider.'
      },
      {
        id: 'PA-007',
        type: 'jv',
        title: 'Joint Venture Amendment - Tano Basin Project',
        company: 'Ghana Oil Development Corp / European Energy Group',
        submittedDate: '2024-01-07T10:00:00Z',
        dueDate: '2024-01-22T23:59:59Z',
        status: 'overdue',
        assignedTo: 'Ms. Ama Serwaa',
        priority: 'high',
        description: 'Amendment to existing joint venture agreement for Tano Basin development project.'
      }
    ];

    setTimeout(() => {
      setPendingApprovals(mockApprovals);
      setFilteredApprovals(mockApprovals);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = pendingApprovals;
    
    if (filterType !== 'all') {
      result = result.filter(approval => approval.type === filterType);
    }
    
    if (filterPriority !== 'all') {
      result = result.filter(approval => approval.priority === filterPriority);
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(approval => approval.status === filterStatus);
    }
    
    if (searchTerm) {
      result = result.filter(approval => 
        approval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approval.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        approval.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredApprovals(result);
  }, [pendingApprovals, filterType, filterPriority, filterStatus, searchTerm]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Urgent
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Medium
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Critical
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <ClockIcon className="h-3 w-3 mr-1" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'permit':
        return <DocumentTextIcon className="h-5 w-5 text-blue-600" />;
      case 'registration':
        return <UserIcon className="h-5 w-5 text-green-600" />;
      case 'renewal':
        return <ArrowPathIcon className="h-5 w-5 text-purple-600" />;
      case 'jv':
        return <DocumentTextIcon className="h-5 w-5 text-orange-600" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else {
      return `${diffDays} days remaining`;
    }
  };

  const handleApprovalClick = (id: string) => {
    // Navigate to approval details page
    router.push(`/dashboard/commission-admin/approvals/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/approvals')}
          userRole="Commission Admin"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/notifications/approvals')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Approvals</h1>
            <p className="text-gray-600">Review and manage all pending approval requests</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingApprovals.filter(a => a.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingApprovals.filter(a => a.status === 'overdue').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Critical</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingApprovals.filter(a => a.status === 'critical').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assigned Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(pendingApprovals.map(a => a.assignedTo)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search approvals..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="permit">Permits</option>
                  <option value="registration">Registrations</option>
                  <option value="renewal">Renewals</option>
                  <option value="jv">Joint Ventures</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Approvals List */}
          <div className="space-y-4">
            {filteredApprovals.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No pending approvals match your filters</p>
              </div>
            ) : (
              filteredApprovals.map((approval) => (
                <div 
                  key={approval.id} 
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleApprovalClick(approval.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTypeIcon(approval.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{approval.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{approval.company}</p>
                          <div className="mt-2 flex items-center space-x-2">
                            {getStatusBadge(approval.status)}
                            {getPriorityBadge(approval.priority)}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {approval.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            Due: {formatDate(approval.dueDate)}
                          </span>
                        </div>
                        <div className="mt-1 text-sm font-medium text-gray-900">
                          {getDaysRemaining(approval.dueDate)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">
                          Assigned to: {approval.assignedTo}
                        </span>
                      </div>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalsPage;