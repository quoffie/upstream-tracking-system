'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BellIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  InformationCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface Notice {
  id: string;
  title: string;
  type: 'announcement' | 'requirement' | 'deadline' | 'policy_update' | 'training' | 'compliance';
  content: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'draft' | 'expired' | 'archived';
  publishedBy: string;
  publishedDate: string;
  expiryDate: string;
  targetAudience: string[];
  companies: string[];
  category: 'general' | 'regulatory' | 'operational' | 'technical';
  attachments: string[];
  readCount: number;
  acknowledgmentRequired: boolean;
  acknowledgmentCount: number;
  tags: string[];
}

const mockNotices: Notice[] = [
  {
    id: 'NOT001',
    title: 'Updated Local Content Development Plan Guidelines',
    type: 'policy_update',
    content: 'New guidelines for Local Content Development Plan submissions have been released. All companies must review and comply with the updated requirements by March 31, 2024.',
    priority: 'critical',
    status: 'active',
    publishedBy: 'Dr. Adebayo Johnson',
    publishedDate: '2024-02-01',
    expiryDate: '2024-03-31',
    targetAudience: ['All Companies', 'Local Content Officers'],
    companies: ['Shell Nigeria', 'TotalEnergies', 'Chevron Nigeria', 'ExxonMobil'],
    category: 'regulatory',
    attachments: ['LCDP_Guidelines_2024.pdf', 'Compliance_Checklist.xlsx'],
    readCount: 156,
    acknowledgmentRequired: true,
    acknowledgmentCount: 89,
    tags: ['guidelines', 'LCDP', 'compliance']
  },
  {
    id: 'NOT002',
    title: 'Q1 2024 Local Content Training Schedule',
    type: 'training',
    content: 'Training sessions on local content compliance and best practices are scheduled for March 2024. Registration is now open for all participating companies.',
    priority: 'high',
    status: 'active',
    publishedBy: 'Mrs. Fatima Abdullahi',
    publishedDate: '2024-01-28',
    expiryDate: '2024-03-15',
    targetAudience: ['Training Coordinators', 'HR Departments'],
    companies: ['All Registered Companies'],
    category: 'operational',
    attachments: ['Training_Schedule_Q1.pdf'],
    readCount: 98,
    acknowledgmentRequired: false,
    acknowledgmentCount: 0,
    tags: ['training', 'schedule', 'Q1']
  },
  {
    id: 'NOT003',
    title: 'Annual Local Content Compliance Report Submission Deadline',
    type: 'deadline',
    content: 'Reminder: Annual Local Content Compliance Reports must be submitted by February 28, 2024. Late submissions will incur penalties as per NCDMB regulations.',
    priority: 'critical',
    status: 'active',
    publishedBy: 'Eng. Chidi Okafor',
    publishedDate: '2024-01-15',
    expiryDate: '2024-02-28',
    targetAudience: ['Compliance Officers', 'Company Executives'],
    companies: ['Shell Nigeria', 'TotalEnergies', 'Chevron Nigeria'],
    category: 'regulatory',
    attachments: ['Report_Template_2024.docx', 'Submission_Guidelines.pdf'],
    readCount: 203,
    acknowledgmentRequired: true,
    acknowledgmentCount: 145,
    tags: ['deadline', 'compliance', 'annual report']
  },
  {
    id: 'NOT004',
    title: 'New Local Supplier Registration Portal Launch',
    type: 'announcement',
    content: 'We are pleased to announce the launch of our new Local Supplier Registration Portal. This platform will streamline the supplier onboarding process and improve local content tracking.',
    priority: 'medium',
    status: 'active',
    publishedBy: 'Mr. Ibrahim Musa',
    publishedDate: '2024-02-05',
    expiryDate: '2024-04-05',
    targetAudience: ['Procurement Teams', 'Local Suppliers'],
    companies: ['All Registered Companies'],
    category: 'technical',
    attachments: ['Portal_User_Guide.pdf'],
    readCount: 67,
    acknowledgmentRequired: false,
    acknowledgmentCount: 0,
    tags: ['portal', 'suppliers', 'registration']
  },
  {
    id: 'NOT005',
    title: 'Local Content Monitoring System Maintenance',
    type: 'announcement',
    content: 'Scheduled maintenance of the Local Content Monitoring System will occur on February 15, 2024, from 2:00 AM to 6:00 AM. The system will be temporarily unavailable during this period.',
    priority: 'medium',
    status: 'expired',
    publishedBy: 'IT Support Team',
    publishedDate: '2024-02-10',
    expiryDate: '2024-02-16',
    targetAudience: ['All Users'],
    companies: ['All Registered Companies'],
    category: 'technical',
    attachments: [],
    readCount: 234,
    acknowledgmentRequired: false,
    acknowledgmentCount: 0,
    tags: ['maintenance', 'system', 'downtime']
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  expired: 'bg-red-100 text-red-800',
  archived: 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  active: CheckCircleIcon,
  draft: ClockIcon,
  expired: XCircleIcon,
  archived: DocumentTextIcon
};

const typeColors = {
  announcement: 'bg-blue-100 text-blue-800',
  requirement: 'bg-purple-100 text-purple-800',
  deadline: 'bg-red-100 text-red-800',
  policy_update: 'bg-orange-100 text-orange-800',
  training: 'bg-green-100 text-green-800',
  compliance: 'bg-indigo-100 text-indigo-800'
};

const typeIcons = {
  announcement: MegaphoneIcon,
  requirement: ExclamationCircleIcon,
  deadline: CalendarIcon,
  policy_update: DocumentTextIcon,
  training: BuildingOfficeIcon,
  compliance: CheckCircleIcon
};

const priorityColors = {
  critical: 'text-red-600',
  high: 'text-orange-600',
  medium: 'text-yellow-600',
  low: 'text-green-600'
};

const categoryColors = {
  general: 'bg-gray-100 text-gray-800',
  regulatory: 'bg-red-100 text-red-800',
  operational: 'bg-blue-100 text-blue-800',
  technical: 'bg-purple-100 text-purple-800'
};

export default function LocalContentNoticesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredNotices = mockNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.publishedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || notice.status === statusFilter;
    const matchesType = typeFilter === 'all' || notice.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || notice.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleViewDetails = (notice: Notice) => {
    setSelectedNotice(notice);
    setShowDetails(true);
  };

  const totalNotices = mockNotices.length;
  const activeNotices = mockNotices.filter(notice => notice.status === 'active').length;
  const criticalNotices = mockNotices.filter(notice => notice.priority === 'critical').length;
  const totalReads = mockNotices.reduce((sum, notice) => sum + notice.readCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Notices</h1>
          <p className="text-gray-600">Manage and distribute important notices and announcements</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Create Notice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BellIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Notices</p>
              <p className="text-2xl font-bold text-gray-900">{totalNotices}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Notices</p>
              <p className="text-2xl font-bold text-gray-900">{activeNotices}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Notices</p>
              <p className="text-2xl font-bold text-gray-900">{criticalNotices}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <EyeIcon className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reads</p>
              <p className="text-2xl font-bold text-gray-900">{totalReads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notices..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
              <option value="archived">Archived</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="announcement">Announcement</option>
              <option value="requirement">Requirement</option>
              <option value="deadline">Deadline</option>
              <option value="policy_update">Policy Update</option>
              <option value="training">Training</option>
              <option value="compliance">Compliance</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notice Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotices.map((notice) => {
                const StatusIcon = statusIcons[notice.status];
                const TypeIcon = typeIcons[notice.type];
                return (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <TypeIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{notice.content.substring(0, 100)}...</div>
                        <div className="text-xs text-gray-400 mt-1">ID: {notice.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[notice.type]}`}>
                          {notice.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <div className={`text-xs font-medium ${priorityColors[notice.priority]}`}>
                          {notice.priority.toUpperCase()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[notice.status]}`}>
                        <StatusIcon className="h-4 w-4 mr-1" />
                        {notice.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{notice.publishedBy}</div>
                        <div className="text-sm text-gray-500">{notice.publishedDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{notice.expiryDate}</div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[notice.category]}`}>
                        {notice.category.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Reads: {notice.readCount}</div>
                        {notice.acknowledgmentRequired && (
                          <div className="text-sm text-gray-500">
                            Acks: {notice.acknowledgmentCount}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(notice)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Edit">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Delete">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice Details Modal */}
      {showDetails && selectedNotice && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Notice Details</h3>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notice ID</label>
                    <p className="text-sm text-gray-900">{selectedNotice.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Published Date</label>
                    <p className="text-sm text-gray-900">{selectedNotice.publishedDate}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <p className="text-sm text-gray-900">{selectedNotice.title}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <p className="text-sm text-gray-900">{selectedNotice.content}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedNotice.type]}`}>
                      {selectedNotice.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`text-sm font-medium ${priorityColors[selectedNotice.priority]}`}>
                      {selectedNotice.priority.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedNotice.status]}`}>
                      {selectedNotice.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Published By</label>
                    <p className="text-sm text-gray-900">{selectedNotice.publishedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="text-sm text-gray-900">{selectedNotice.expiryDate}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedNotice.targetAudience.map((audience, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Companies</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedNotice.companies.map((company, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
                
                {selectedNotice.attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Attachments</label>
                    <ul className="list-disc list-inside text-sm text-gray-900 mt-1">
                      {selectedNotice.attachments.map((attachment, index) => (
                        <li key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer">{attachment}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Read Count</label>
                    <p className="text-sm text-gray-900">{selectedNotice.readCount}</p>
                  </div>
                  {selectedNotice.acknowledgmentRequired && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Acknowledgments</label>
                      <p className="text-sm text-gray-900">{selectedNotice.acknowledgmentCount}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedNotice.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDetails(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Edit Notice
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}