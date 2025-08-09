'use client';

import { useState } from 'react';
import { Search, Filter, Download, Eye, AlertCircle, CheckCircle, Clock, XCircle, Plus, FileText, Calendar, User, Building } from 'lucide-react';

interface Certificate {
  id: string;
  certificateNumber: string;
  type: string;
  holderName: string;
  company: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending' | 'revoked';
  issuedBy: string;
  validityPeriod: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    certificateNumber: 'CERT-2024-001',
    type: 'Work Permit Certificate',
    holderName: 'John Smith',
    company: 'TotalEnergies Nigeria',
    issueDate: '2024-01-15',
    expiryDate: '2024-12-15',
    status: 'active',
    issuedBy: 'Immigration Department',
    validityPeriod: '12 months',
    category: 'Work Authorization',
    priority: 'high'
  },
  {
    id: '2',
    certificateNumber: 'CERT-2024-002',
    type: 'Residence Certificate',
    holderName: 'Sarah Johnson',
    company: 'Shell Nigeria',
    issueDate: '2024-02-01',
    expiryDate: '2024-11-30',
    status: 'active',
    issuedBy: 'Immigration Department',
    validityPeriod: '10 months',
    category: 'Residence',
    priority: 'medium'
  },
  {
    id: '3',
    certificateNumber: 'CERT-2023-045',
    type: 'Business Visa Certificate',
    holderName: 'Michael Brown',
    company: 'Chevron Nigeria',
    issueDate: '2023-12-10',
    expiryDate: '2024-01-10',
    status: 'expired',
    issuedBy: 'Immigration Department',
    validityPeriod: '1 month',
    category: 'Business',
    priority: 'low'
  },
  {
    id: '4',
    certificateNumber: 'CERT-2024-003',
    type: 'Temporary Work Certificate',
    holderName: 'Emma Wilson',
    company: 'ExxonMobil Nigeria',
    issueDate: '2024-03-01',
    expiryDate: '2024-09-01',
    status: 'pending',
    issuedBy: 'Immigration Department',
    validityPeriod: '6 months',
    category: 'Temporary Work',
    priority: 'high'
  },
  {
    id: '5',
    certificateNumber: 'CERT-2023-089',
    type: 'Student Visa Certificate',
    holderName: 'David Lee',
    company: 'University of Lagos',
    issueDate: '2023-09-15',
    expiryDate: '2024-01-15',
    status: 'revoked',
    issuedBy: 'Immigration Department',
    validityPeriod: '4 months',
    category: 'Education',
    priority: 'medium'
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  revoked: 'bg-gray-100 text-gray-800'
};

const statusIcons = {
  active: CheckCircle,
  expired: XCircle,
  pending: Clock,
  revoked: AlertCircle
};

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || cert.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleViewDetails = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const getStatusCounts = () => {
    return {
      total: mockCertificates.length,
      active: mockCertificates.filter(c => c.status === 'active').length,
      expired: mockCertificates.filter(c => c.status === 'expired').length,
      pending: mockCertificates.filter(c => c.status === 'pending').length,
      revoked: mockCertificates.filter(c => c.status === 'revoked').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates Management</h1>
          <p className="text-gray-600">Manage and track immigration certificates</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Issue Certificate
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.total}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.expired}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revoked</p>
              <p className="text-2xl font-bold text-gray-600">{statusCounts.revoked}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search certificates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
              <option value="revoked">Revoked</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Work Authorization">Work Authorization</option>
              <option value="Residence">Residence</option>
              <option value="Business">Business</option>
              <option value="Temporary Work">Temporary Work</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Holder
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
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
              {filteredCertificates.map((certificate) => {
                const StatusIcon = statusIcons[certificate.status];
                return (
                  <tr key={certificate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{certificate.certificateNumber}</div>
                        <div className="text-sm text-gray-500">{certificate.type}</div>
                        <div className="text-xs text-gray-400">{certificate.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{certificate.holderName}</div>
                        <div className="text-sm text-gray-500">{certificate.company}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">Issued: {certificate.issueDate}</div>
                        <div className="text-sm text-gray-500">Expires: {certificate.expiryDate}</div>
                        <div className="text-xs text-gray-400">Valid: {certificate.validityPeriod}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[certificate.status]}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[certificate.priority]}`}>
                        {certificate.priority.charAt(0).toUpperCase() + certificate.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(certificate)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Download className="h-4 w-4" />
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

      {/* Certificate Details Modal */}
      {showModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Certificate Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Certificate Number</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.certificateNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.type}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Holder Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.holderName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.issueDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.expiryDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issued By</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.issuedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Validity Period</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.validityPeriod}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCertificate.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedCertificate.status]}`}>
                      {selectedCertificate.status.charAt(0).toUpperCase() + selectedCertificate.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}