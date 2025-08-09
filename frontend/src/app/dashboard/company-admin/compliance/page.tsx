'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../app/components/layouts/DashboardMenus';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function CompliancePage() {
  const pathname = usePathname();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [activeTab, setActiveTab] = useState('overview');

  const complianceItems = [
    {
      id: 1,
      requirement: 'Environmental Impact Assessment',
      status: 'Compliant',
      lastReview: '2024-06-15',
      nextDue: '2024-12-15',
      priority: 'High',
      documents: 3
    },
    {
      id: 2,
      requirement: 'Safety Training Certificates',
      status: 'Non-Compliant',
      lastReview: '2024-05-20',
      nextDue: '2024-08-20',
      priority: 'Critical',
      documents: 1
    },
    {
      id: 3,
      requirement: 'Local Content Plan',
      status: 'Under Review',
      lastReview: '2024-07-01',
      nextDue: '2024-09-01',
      priority: 'Medium',
      documents: 2
    },
    {
      id: 4,
      requirement: 'Personnel Medical Certificates',
      status: 'Compliant',
      lastReview: '2024-06-30',
      nextDue: '2024-12-30',
      priority: 'High',
      documents: 15
    }
  ];

  const auditHistory = [
    {
      date: '2024-06-01',
      auditor: 'Ghana Petroleum Commission',
      type: 'Environmental Compliance',
      result: 'Passed',
      findings: 2,
      recommendations: 3
    },
    {
      date: '2024-05-15',
      auditor: 'Safety Authority',
      type: 'Safety Compliance',
      result: 'Failed',
      findings: 5,
      recommendations: 8
    },
    {
      date: '2024-04-20',
      auditor: 'Local Content Committee',
      type: 'Local Content Review',
      result: 'Passed',
      findings: 1,
      recommendations: 2
    }
  ];

  const complianceMetrics = [
    { month: 'Jan', compliant: 85, nonCompliant: 15 },
    { month: 'Feb', compliant: 88, nonCompliant: 12 },
    { month: 'Mar', compliant: 82, nonCompliant: 18 },
    { month: 'Apr', compliant: 90, nonCompliant: 10 },
    { month: 'May', compliant: 87, nonCompliant: 13 },
    { month: 'Jun', compliant: 92, nonCompliant: 8 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Non-Compliant':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'Under Review':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant':
      case 'Passed':
        return 'text-green-600 bg-green-100';
      case 'Non-Compliant':
      case 'Failed':
        return 'text-red-600 bg-red-100';
      case 'Under Review':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-600 bg-red-100';
      case 'High':
        return 'text-orange-600 bg-orange-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout
      title="Compliance Management"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Management</h1>
            <p className="text-gray-600">Monitor regulatory compliance and audit requirements</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
              <DocumentTextIcon className="h-5 w-5" />
              <span>Upload Document</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <ShieldCheckIcon className="h-5 w-5" />
              <span>Request Audit</span>
            </button>
          </div>
        </div>

        {/* Compliance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Compliant</h3>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Non-Compliant</h3>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Under Review</h3>
                <p className="text-3xl font-bold text-yellow-600">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Due Soon</h3>
                <p className="text-3xl font-bold text-orange-600">7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requirements'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Requirements
              </button>
              <button
                onClick={() => setActiveTab('audits')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'audits'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Audit History
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Documents
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Compliance Trends Chart */}
                <div className="bg-white">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={complianceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="compliant" stroke="#10B981" strokeWidth={2} name="Compliant %" />
                      <Line type="monotone" dataKey="nonCompliant" stroke="#EF4444" strokeWidth={2} name="Non-Compliant %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Recent Compliance Issues */}
                <div className="bg-white">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Compliance Issues</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center">
                        <XCircleIcon className="h-6 w-6 text-red-500 mr-3" />
                        <div>
                          <p className="font-medium text-red-900">Safety Training Certificates Expired</p>
                          <p className="text-sm text-red-700">15 personnel certificates need renewal</p>
                        </div>
                      </div>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Action Required
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <ClockIcon className="h-6 w-6 text-yellow-500 mr-3" />
                        <div>
                          <p className="font-medium text-yellow-900">Environmental Report Due</p>
                          <p className="text-sm text-yellow-700">Quarterly environmental impact report due in 5 days</p>
                        </div>
                      </div>
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Requirement
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Review
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Next Due
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documents
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complianceItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{item.requirement}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                            {item.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.lastReview}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.nextDue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.documents} files
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                          <button className="text-green-600 hover:text-green-900">Update</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'audits' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auditor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Result
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Findings
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recommendations
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {auditHistory.map((audit, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {audit.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{audit.auditor}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {audit.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(audit.result)}`}>
                            {audit.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {audit.findings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {audit.recommendations}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">View Report</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Compliance Documents</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>Upload Document</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Document Cards */}
                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                      <span className="text-xs text-gray-500">PDF</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Environmental Impact Assessment</h4>
                    <p className="text-sm text-gray-600 mb-2">Updated: June 15, 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                      <span className="text-xs text-gray-500">PDF</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Safety Training Records</h4>
                    <p className="text-sm text-gray-600 mb-2">Updated: May 20, 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Expired</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                      <span className="text-xs text-gray-500">PDF</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">Local Content Plan</h4>
                    <p className="text-sm text-gray-600 mb-2">Updated: July 1, 2024</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Under Review</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}