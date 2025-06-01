'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  FolderIcon,
  CalendarIcon,
  UserIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  name: string;
  type: string;
  applicationId: string;
  companyName: string;
  uploadDate: string;
  reviewStatus: 'pending' | 'approved' | 'rejected' | 'requires_revision';
  reviewer?: string;
  fileSize: string;
  version: number;
  comments?: string;
  priority: 'high' | 'medium' | 'low';
}

const DocumentReviewPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for documents
    const mockDocuments: Document[] = [
      {
        id: 'DOC-2024-001',
        name: 'Environmental Impact Assessment',
        type: 'Environmental',
        applicationId: 'APP-2024-001',
        companyName: 'Ghana Oil Exploration Ltd',
        uploadDate: '2024-01-15',
        reviewStatus: 'pending',
        fileSize: '2.4 MB',
        version: 1,
        priority: 'high'
      },
      {
        id: 'DOC-2024-002',
        name: 'Technical Specifications',
        type: 'Technical',
        applicationId: 'APP-2024-001',
        companyName: 'Ghana Oil Exploration Ltd',
        uploadDate: '2024-01-14',
        reviewStatus: 'approved',
        reviewer: 'Eng. Akosua Mensah',
        fileSize: '1.8 MB',
        version: 2,
        priority: 'high'
      },
      {
        id: 'DOC-2024-003',
        name: 'Financial Statements',
        type: 'Financial',
        applicationId: 'APP-2024-002',
        companyName: 'West African Petroleum',
        uploadDate: '2024-01-13',
        reviewStatus: 'requires_revision',
        reviewer: 'Mr. Joseph Osei',
        fileSize: '3.2 MB',
        version: 1,
        comments: 'Missing Q4 2023 audited statements',
        priority: 'medium'
      },
      {
        id: 'DOC-2024-004',
        name: 'Safety Management Plan',
        type: 'Safety',
        applicationId: 'APP-2024-003',
        companyName: 'Coastal Energy Ghana',
        uploadDate: '2024-01-12',
        reviewStatus: 'approved',
        reviewer: 'Dr. Kwame Asante',
        fileSize: '4.1 MB',
        version: 1,
        priority: 'high'
      },
      {
        id: 'DOC-2024-005',
        name: 'Local Content Plan',
        type: 'Local Content',
        applicationId: 'APP-2024-004',
        companyName: 'Volta Basin Resources',
        uploadDate: '2024-01-11',
        reviewStatus: 'rejected',
        reviewer: 'Ms. Ama Serwaa',
        fileSize: '1.5 MB',
        version: 1,
        comments: 'Insufficient local participation percentage',
        priority: 'medium'
      },
      {
        id: 'DOC-2024-006',
        name: 'Geological Survey Report',
        type: 'Technical',
        applicationId: 'APP-2024-005',
        companyName: 'Northern Energy Ltd',
        uploadDate: '2024-01-10',
        reviewStatus: 'pending',
        fileSize: '5.7 MB',
        version: 1,
        priority: 'low'
      }
    ];

    setTimeout(() => {
      setDocuments(mockDocuments);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'requires_revision':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'requires_revision':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Environmental':
        return '🌱';
      case 'Technical':
        return '⚙️';
      case 'Financial':
        return '💰';
      case 'Safety':
        return '🛡️';
      case 'Local Content':
        return '🏠';
      default:
        return '📄';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesStatus = filterStatus === 'all' || doc.reviewStatus === filterStatus;
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const documentTypes = [...new Set(documents.map(doc => doc.type))];

  const handleApprove = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, reviewStatus: 'approved' as const, reviewer: 'Current User' }
        : doc
    ));
  };

  const handleReject = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, reviewStatus: 'rejected' as const, reviewer: 'Current User' }
        : doc
    ));
  };

  const handleRequestRevision = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, reviewStatus: 'requires_revision' as const, reviewer: 'Current User' }
        : doc
    ));
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar 
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/documents')}
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
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/applications/documents')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Review</h1>
            <p className="text-gray-600">Review and approve application documents and supporting materials</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => doc.reviewStatus === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => doc.reviewStatus === 'approved').length}
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
                  <p className="text-sm font-medium text-gray-600">Need Attention</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => doc.reviewStatus === 'rejected' || doc.reviewStatus === 'requires_revision').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by document name, company, or application ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="requires_revision">Needs Revision</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Documents for Review</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <FolderIcon className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                            <div className="text-sm text-gray-500">{document.id}</div>
                            <div className="text-xs text-gray-400">v{document.version} • {document.fileSize}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{document.applicationId}</div>
                          <div className="text-sm text-gray-500">{document.companyName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getTypeIcon(document.type)}</span>
                          <span className="text-sm text-gray-900">{document.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(document.uploadDate).toLocaleDateString('en-GH')}
                        </div>
                        {document.reviewer && (
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <UserIcon className="h-3 w-3 mr-1" />
                            {document.reviewer}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(document.reviewStatus)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.reviewStatus)}`}>
                            {document.reviewStatus.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        {document.comments && (
                          <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                            {document.comments}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(document.priority)}`}>
                          {document.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 flex items-center">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 flex items-center">
                            <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                            Download
                          </button>
                          {document.reviewStatus === 'pending' && (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleApprove(document.id)}
                                className="text-green-600 hover:text-green-900 text-xs px-2 py-1 border border-green-300 rounded"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRequestRevision(document.id)}
                                className="text-yellow-600 hover:text-yellow-900 text-xs px-2 py-1 border border-yellow-300 rounded"
                              >
                                Revise
                              </button>
                              <button
                                onClick={() => handleReject(document.id)}
                                className="text-red-600 hover:text-red-900 text-xs px-2 py-1 border border-red-300 rounded"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentReviewPage;