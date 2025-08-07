'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../components/layouts/DashboardMenus';
import {
  DocumentIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  FolderIcon,
  CloudArrowUpIcon,
  ShareIcon,
  TrashIcon,
  LockClosedIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'permit' | 'license' | 'report' | 'certificate' | 'financial' | 'legal' | 'technical' | 'environmental' | 'other';
  category: 'regulatory' | 'operational' | 'financial' | 'legal' | 'technical' | 'environmental' | 'compliance';
  status: 'active' | 'expired' | 'pending-renewal' | 'draft' | 'archived' | 'under-review';
  uploadDate: string;
  lastModified: string;
  expiryDate?: string;
  fileSize: number;
  fileFormat: string;
  version: string;
  uploadedBy: string;
  relatedProject?: string;
  relatedPermit?: string;
  description: string;
  tags: string[];
  accessLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  downloadCount: number;
  isShared: boolean;
  sharedWith?: string[];
  approvalRequired: boolean;
  approvedBy?: string;
  approvalDate?: string;
  checksum: string;
}

export default function DocumentsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [accessLevelFilter, setAccessLevelFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock data
  const documents: Document[] = [
    {
      id: '1',
      name: 'Petroleum Agreement - Block A',
      type: 'contract',
      category: 'legal',
      status: 'active',
      uploadDate: '2023-01-15',
      lastModified: '2023-06-20',
      expiryDate: '2028-01-15',
      fileSize: 2500000,
      fileFormat: 'PDF',
      version: '2.1',
      uploadedBy: 'John Smith',
      relatedProject: 'Offshore Block A',
      relatedPermit: 'PL-001-2020',
      description: 'Main petroleum agreement for offshore Block A operations including terms, conditions, and obligations.',
      tags: ['petroleum', 'agreement', 'offshore', 'block-a'],
      accessLevel: 'confidential',
      downloadCount: 45,
      isShared: true,
      sharedWith: ['Legal Team', 'Operations Team'],
      approvalRequired: true,
      approvedBy: 'Legal Director',
      approvalDate: '2023-01-20',
      checksum: 'sha256:abc123def456'
    },
    {
      id: '2',
      name: 'Environmental Impact Assessment - Volta Basin',
      type: 'report',
      category: 'environmental',
      status: 'active',
      uploadDate: '2023-03-10',
      lastModified: '2023-08-15',
      fileSize: 15000000,
      fileFormat: 'PDF',
      version: '1.3',
      uploadedBy: 'Sarah Wilson',
      relatedProject: 'Volta Basin Exploration',
      description: 'Comprehensive environmental impact assessment for Volta Basin exploration activities.',
      tags: ['environmental', 'impact', 'assessment', 'volta-basin'],
      accessLevel: 'internal',
      downloadCount: 28,
      isShared: false,
      approvalRequired: true,
      approvedBy: 'Environmental Manager',
      approvalDate: '2023-03-15',
      checksum: 'sha256:def789ghi012'
    },
    {
      id: '3',
      name: 'Annual Financial Report 2023',
      type: 'financial',
      category: 'financial',
      status: 'active',
      uploadDate: '2024-01-30',
      lastModified: '2024-01-30',
      fileSize: 5200000,
      fileFormat: 'PDF',
      version: '1.0',
      uploadedBy: 'Finance Team',
      description: 'Annual financial report for 2023 including revenue, expenses, and financial position.',
      tags: ['financial', 'annual', 'report', '2023'],
      accessLevel: 'confidential',
      downloadCount: 12,
      isShared: true,
      sharedWith: ['Board of Directors', 'Audit Committee'],
      approvalRequired: true,
      approvedBy: 'CFO',
      approvalDate: '2024-02-05',
      checksum: 'sha256:ghi345jkl678'
    },
    {
      id: '4',
      name: 'Drilling Permit - Well A-001',
      type: 'permit',
      category: 'regulatory',
      status: 'expired',
      uploadDate: '2022-05-20',
      lastModified: '2022-05-20',
      expiryDate: '2023-05-20',
      fileSize: 850000,
      fileFormat: 'PDF',
      version: '1.0',
      uploadedBy: 'Regulatory Affairs',
      relatedProject: 'Offshore Block A',
      relatedPermit: 'DP-001-2022',
      description: 'Drilling permit for well A-001 in offshore Block A.',
      tags: ['drilling', 'permit', 'well', 'a-001'],
      accessLevel: 'internal',
      downloadCount: 67,
      isShared: false,
      approvalRequired: false,
      checksum: 'sha256:jkl901mno234'
    },
    {
      id: '5',
      name: 'Safety Management System Certificate',
      type: 'certificate',
      category: 'compliance',
      status: 'pending-renewal',
      uploadDate: '2023-02-15',
      lastModified: '2023-02-15',
      expiryDate: '2024-02-15',
      fileSize: 1200000,
      fileFormat: 'PDF',
      version: '1.0',
      uploadedBy: 'HSE Manager',
      description: 'ISO 45001 Safety Management System certification.',
      tags: ['safety', 'management', 'certificate', 'iso45001'],
      accessLevel: 'public',
      downloadCount: 89,
      isShared: true,
      sharedWith: ['All Employees'],
      approvalRequired: false,
      checksum: 'sha256:mno567pqr890'
    },
    {
      id: '6',
      name: 'Local Content Plan - 2024',
      type: 'report',
      category: 'regulatory',
      status: 'under-review',
      uploadDate: '2024-01-08',
      lastModified: '2024-01-15',
      fileSize: 3800000,
      fileFormat: 'PDF',
      version: '2.0',
      uploadedBy: 'Local Content Team',
      description: 'Annual local content plan for 2024 operations.',
      tags: ['local-content', 'plan', '2024', 'regulatory'],
      accessLevel: 'internal',
      downloadCount: 15,
      isShared: false,
      approvalRequired: true,
      checksum: 'sha256:pqr123stu456'
    },
    {
      id: '7',
      name: 'Technical Specifications - Drilling Equipment',
      type: 'technical',
      category: 'technical',
      status: 'draft',
      uploadDate: '2024-01-20',
      lastModified: '2024-01-25',
      fileSize: 7500000,
      fileFormat: 'PDF',
      version: '0.9',
      uploadedBy: 'Technical Team',
      relatedProject: 'Equipment Procurement',
      description: 'Technical specifications for new drilling equipment procurement.',
      tags: ['technical', 'specifications', 'drilling', 'equipment'],
      accessLevel: 'restricted',
      downloadCount: 8,
      isShared: false,
      approvalRequired: true,
      checksum: 'sha256:stu789vwx012'
    },
    {
      id: '8',
      name: 'Insurance Policy - General Liability',
      type: 'legal',
      category: 'legal',
      status: 'active',
      uploadDate: '2023-12-01',
      lastModified: '2023-12-01',
      expiryDate: '2024-12-01',
      fileSize: 1800000,
      fileFormat: 'PDF',
      version: '1.0',
      uploadedBy: 'Legal Team',
      description: 'General liability insurance policy covering operational activities.',
      tags: ['insurance', 'liability', 'policy', 'coverage'],
      accessLevel: 'confidential',
      downloadCount: 22,
      isShared: true,
      sharedWith: ['Legal Team', 'Risk Management'],
      approvalRequired: true,
      approvedBy: 'Legal Director',
      approvalDate: '2023-12-05',
      checksum: 'sha256:vwx345yza678'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Active' },
      expired: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Expired' },
      'pending-renewal': { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending Renewal' },
      draft: { color: 'bg-gray-100 text-gray-800', icon: DocumentIcon, label: 'Draft' },
      archived: { color: 'bg-gray-100 text-gray-600', icon: FolderIcon, label: 'Archived' },
      'under-review': { color: 'bg-blue-100 text-blue-800', icon: ClockIcon, label: 'Under Review' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      contract: { color: 'bg-purple-100 text-purple-800', label: 'Contract' },
      permit: { color: 'bg-blue-100 text-blue-800', label: 'Permit' },
      license: { color: 'bg-green-100 text-green-800', label: 'License' },
      report: { color: 'bg-orange-100 text-orange-800', label: 'Report' },
      certificate: { color: 'bg-teal-100 text-teal-800', label: 'Certificate' },
      financial: { color: 'bg-emerald-100 text-emerald-800', label: 'Financial' },
      legal: { color: 'bg-indigo-100 text-indigo-800', label: 'Legal' },
      technical: { color: 'bg-cyan-100 text-cyan-800', label: 'Technical' },
      environmental: { color: 'bg-lime-100 text-lime-800', label: 'Environmental' },
      other: { color: 'bg-gray-100 text-gray-800', label: 'Other' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getAccessLevelBadge = (level: string) => {
    const levelConfig = {
      public: { color: 'bg-green-100 text-green-800', icon: ShareIcon, label: 'Public' },
      internal: { color: 'bg-blue-100 text-blue-800', icon: DocumentIcon, label: 'Internal' },
      confidential: { color: 'bg-yellow-100 text-yellow-800', icon: LockClosedIcon, label: 'Confidential' },
      restricted: { color: 'bg-red-100 text-red-800', icon: LockClosedIcon, label: 'Restricted' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return expiry <= thirtyDaysFromNow && expiry > now;
  };

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesAccessLevel = accessLevelFilter === 'all' || doc.accessLevel === accessLevelFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesAccessLevel;
  });

  // Calculate statistics
  const stats = {
    total: documents.length,
    active: documents.filter(d => d.status === 'active').length,
    expired: documents.filter(d => d.status === 'expired').length,
    expiringSoon: documents.filter(d => isExpiringSoon(d.expiryDate)).length,
    pendingRenewal: documents.filter(d => d.status === 'pending-renewal').length,
    underReview: documents.filter(d => d.status === 'under-review').length,
    totalSize: documents.reduce((sum, d) => sum + d.fileSize, 0),
    totalDownloads: documents.reduce((sum, d) => sum + d.downloadCount, 0)
  };

  const handleSelectDocument = (id: string) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedDocuments(
      selectedDocuments.length === filteredDocuments.length 
        ? [] 
        : filteredDocuments.map(d => d.id)
    );
  };

  return (
    <DashboardLayout
      title="Documents"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and organize all company documents, permits, and certificates
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <DocumentIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <FolderIcon className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => router.push('/dashboard/company-admin/documents/upload')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <CloudArrowUpIcon className="h-4 w-4 mr-2" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">{stats.expiringSoon}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentArrowDownIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Expired</p>
                <p className="text-xl font-bold text-red-600">{stats.expired}</p>
              </div>
              <XCircleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Under Review</p>
                <p className="text-xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Renewal</p>
                <p className="text-xl font-bold text-yellow-600">{stats.pendingRenewal}</p>
              </div>
              <CalendarIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Size</p>
                <p className="text-xl font-bold text-gray-900">{formatFileSize(stats.totalSize)}</p>
              </div>
              <FolderIcon className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents by name, description, tags, or uploader..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending-renewal">Pending Renewal</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                  <option value="under-review">Under Review</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="contract">Contract</option>
                  <option value="permit">Permit</option>
                  <option value="license">License</option>
                  <option value="report">Report</option>
                  <option value="certificate">Certificate</option>
                  <option value="financial">Financial</option>
                  <option value="legal">Legal</option>
                  <option value="technical">Technical</option>
                  <option value="environmental">Environmental</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="regulatory">Regulatory</option>
                  <option value="operational">Operational</option>
                  <option value="financial">Financial</option>
                  <option value="legal">Legal</option>
                  <option value="technical">Technical</option>
                  <option value="environmental">Environmental</option>
                  <option value="compliance">Compliance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Level
                </label>
                <select
                  value={accessLevelFilter}
                  onChange={(e) => setAccessLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="public">Public</option>
                  <option value="internal">Internal</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setTypeFilter('all');
                    setCategoryFilter('all');
                    setAccessLevelFilter('all');
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Documents ({filteredDocuments.length})
              </h3>
              {selectedDocuments.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedDocuments.length} selected
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Bulk Actions
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access & Sharing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleSelectDocument(doc.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {doc.description}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                          {doc.tags.length > 3 && (
                            <span className="text-xs text-gray-500">+{doc.tags.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getTypeBadge(doc.type)}
                        {getStatusBadge(doc.status)}
                        {isExpiringSoon(doc.expiryDate) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                            Expiring Soon
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-900">
                          {formatFileSize(doc.fileSize)} • {doc.fileFormat}
                        </div>
                        <div className="text-xs text-gray-500">
                          Version {doc.version}
                        </div>
                        <div className="text-xs text-gray-500">
                          Uploaded: {formatDate(doc.uploadDate)}
                        </div>
                        <div className="text-xs text-gray-500">
                          By: {doc.uploadedBy}
                        </div>
                        {doc.expiryDate && (
                          <div className="text-xs text-gray-500">
                            Expires: {formatDate(doc.expiryDate)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getAccessLevelBadge(doc.accessLevel)}
                        {doc.isShared && (
                          <div className="text-xs text-gray-500">
                            Shared with: {doc.sharedWith?.join(', ')}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Downloads: {doc.downloadCount}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/documents/${doc.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900"
                          title="Download"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/documents/${doc.id}/edit`)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-900"
                          title="Share"
                        >
                          <ShareIcon className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="More Actions"
                          >
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || categoryFilter !== 'all' || accessLevelFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by uploading your first document.'}
              </p>
              {!searchTerm && statusFilter === 'all' && typeFilter === 'all' && categoryFilter === 'all' && accessLevelFilter === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/dashboard/company-admin/documents/upload')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                    Upload Document
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}