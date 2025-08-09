'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FlagIcon,
  EyeIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon as ExclamationTriangleSolid, FlagIcon as FlagSolid } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../../app/components/layouts/DashboardMenus';

interface InvalidVisa {
  id: string;
  visaNumber: string;
  holderName: string;
  nationality: string;
  company: string;
  visaType: 'Tourist' | 'Business' | 'Transit' | 'Multiple Entry';
  issueDate: string;
  expiryDate: string;
  flagReason: 'Fraudulent Document' | 'Expired' | 'Overstay' | 'Invalid Purpose' | 'Forged Signature' | 'Suspicious Activity';
  flaggedDate: string;
  flaggedBy: string;
  status: 'Under Investigation' | 'Confirmed Invalid' | 'Resolved' | 'Pending Review';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  notes?: string;
  actionTaken?: string;
}

const mockInvalidVisas: InvalidVisa[] = [
  {
    id: 'IV-001',
    visaNumber: 'V-2023-001234',
    holderName: 'John Doe',
    nationality: 'Nigerian',
    company: 'ABC Trading Ltd',
    visaType: 'Business',
    issueDate: '2023-06-01',
    expiryDate: '2023-12-01',
    flagReason: 'Fraudulent Document',
    flaggedDate: '2024-01-10',
    flaggedBy: 'Immigration Officer A',
    status: 'Under Investigation',
    severity: 'Critical',
    notes: 'Document verification failed - security features do not match authentic visas'
  },
  {
    id: 'IV-002',
    visaNumber: 'V-2022-005678',
    holderName: 'Sarah Wilson',
    nationality: 'British',
    company: 'Oil Services Inc',
    visaType: 'Multiple Entry',
    issueDate: '2022-03-15',
    expiryDate: '2023-03-15',
    flagReason: 'Overstay',
    flaggedDate: '2024-01-08',
    flaggedBy: 'Immigration Officer B',
    status: 'Confirmed Invalid',
    severity: 'High',
    notes: 'Holder has overstayed visa by 10 months',
    actionTaken: 'Deportation order issued'
  },
  {
    id: 'IV-003',
    visaNumber: 'V-2023-009876',
    holderName: 'Michael Chen',
    nationality: 'Chinese',
    company: 'Tech Solutions Ghana',
    visaType: 'Business',
    issueDate: '2023-08-20',
    expiryDate: '2024-02-20',
    flagReason: 'Invalid Purpose',
    flaggedDate: '2024-01-12',
    flaggedBy: 'Immigration Officer C',
    status: 'Pending Review',
    severity: 'Medium',
    notes: 'Holder found working in oil sector with business visa'
  },
  {
    id: 'IV-004',
    visaNumber: 'V-2023-112233',
    holderName: 'Emma Rodriguez',
    nationality: 'Spanish',
    company: 'Tourism Ghana Ltd',
    visaType: 'Tourist',
    issueDate: '2023-09-01',
    expiryDate: '2023-12-01',
    flagReason: 'Forged Signature',
    flaggedDate: '2024-01-11',
    flaggedBy: 'Immigration Officer A',
    status: 'Under Investigation',
    severity: 'High',
    notes: 'Signature on visa does not match passport signature'
  }
];

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return <ExclamationTriangleSolid className="h-5 w-5 text-red-600" />;
    case 'High':
      return <ExclamationTriangleSolid className="h-5 w-5 text-orange-500" />;
    case 'Medium':
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
    case 'Low':
      return <FlagIcon className="h-5 w-5 text-blue-500" />;
    default:
      return <FlagIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical':
      return 'bg-red-100 text-red-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Under Investigation':
      return 'bg-blue-100 text-blue-800';
    case 'Confirmed Invalid':
      return 'bg-red-100 text-red-800';
    case 'Resolved':
      return 'bg-green-100 text-green-800';
    case 'Pending Review':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function FlagInvalidVisasPage() {
  const [visas, setVisas] = useState<InvalidVisa[]>(mockInvalidVisas);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [reasonFilter, setReasonFilter] = useState('All');
  const [selectedVisa, setSelectedVisa] = useState<InvalidVisa | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredVisas = visas.filter(visa => {
    const matchesSearch = visa.visaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || visa.severity === severityFilter;
    const matchesStatus = statusFilter === 'All' || visa.status === statusFilter;
    const matchesReason = reasonFilter === 'All' || visa.flagReason === reasonFilter;
    return matchesSearch && matchesSeverity && matchesStatus && matchesReason;
  });

  const handleUpdateStatus = (visaId: string, newStatus: string, actionTaken?: string) => {
    setVisas(prev => prev.map(visa => 
      visa.id === visaId 
        ? { ...visa, status: newStatus as any, actionTaken: actionTaken || visa.actionTaken }
        : visa
    ));
  };

  const criticalCount = visas.filter(v => v.severity === 'Critical').length;
  const highCount = visas.filter(v => v.severity === 'High').length;
  const underInvestigationCount = visas.filter(v => v.status === 'Under Investigation').length;
  const confirmedInvalidCount = visas.filter(v => v.status === 'Confirmed Invalid').length;

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flag Invalid Visas</h1>
            <p className="text-gray-600">Monitor and manage flagged invalid visas and fraudulent documents</p>
          </div>
          <button 
            onClick={() => setShowFlagModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <FlagIcon className="h-5 w-5" />
            Flag New Visa
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Flagged</p>
                <p className="text-2xl font-bold text-gray-900">{visas.length}</p>
              </div>
              <FlagIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Investigation</p>
                <p className="text-2xl font-bold text-blue-600">{underInvestigationCount}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed Invalid</p>
                <p className="text-2xl font-bold text-red-600">{confirmedInvalidCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by visa number, holder name, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Severity</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Confirmed Invalid">Confirmed Invalid</option>
                <option value="Resolved">Resolved</option>
                <option value="Pending Review">Pending Review</option>
              </select>
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Reasons</option>
                <option value="Fraudulent Document">Fraudulent Document</option>
                <option value="Expired">Expired</option>
                <option value="Overstay">Overstay</option>
                <option value="Invalid Purpose">Invalid Purpose</option>
                <option value="Forged Signature">Forged Signature</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Flagged Visas List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Flagged Invalid Visas</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredVisas.map((visa) => (
              <div key={visa.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getSeverityIcon(visa.severity)}
                      <h3 className="text-lg font-semibold text-gray-900">{visa.visaNumber}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(visa.severity)}`}>
                        {visa.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visa.status)}`}>
                        {visa.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium">Holder:</span> {visa.holderName}
                      </div>
                      <div>
                        <span className="font-medium">Nationality:</span> {visa.nationality}
                      </div>
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span className="font-medium">Company:</span> {visa.company}
                      </div>
                      <div>
                        <span className="font-medium">Visa Type:</span> {visa.visaType}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Flag Reason:</span> 
                        <span className="text-red-600 font-semibold ml-1">{visa.flagReason}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span className="font-medium">Flagged:</span> {new Date(visa.flaggedDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Flagged By:</span> {visa.flaggedBy}
                      </div>
                    </div>
                    {visa.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {visa.notes}
                      </p>
                    )}
                    {visa.actionTaken && (
                      <p className="text-sm text-green-600 mt-2">
                        <span className="font-medium">Action Taken:</span> {visa.actionTaken}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedVisa(visa);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedVisa && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Invalid Visa Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Visa Number</label>
                    <p className="text-gray-900">{selectedVisa.visaNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Severity</label>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(selectedVisa.severity)}
                      <span className={`px-2 py-1 rounded text-sm ${getSeverityColor(selectedVisa.severity)}`}>
                        {selectedVisa.severity}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Holder Name</label>
                    <p className="text-gray-900">{selectedVisa.holderName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nationality</label>
                    <p className="text-gray-900">{selectedVisa.nationality}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="text-gray-900">{selectedVisa.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                    <p className="text-gray-900">{selectedVisa.visaType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                    <p className="text-gray-900">{new Date(selectedVisa.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="text-gray-900">{new Date(selectedVisa.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Flag Reason</label>
                    <p className="text-red-600 font-semibold">{selectedVisa.flagReason}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedVisa.status)}`}>
                      {selectedVisa.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Flagged Date</label>
                    <p className="text-gray-900">{new Date(selectedVisa.flaggedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Flagged By</label>
                    <p className="text-gray-900">{selectedVisa.flaggedBy}</p>
                  </div>
                </div>
                {selectedVisa.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="text-gray-900 mt-1">{selectedVisa.notes}</p>
                  </div>
                )}
                {selectedVisa.actionTaken && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Action Taken</label>
                    <p className="text-green-600 mt-1">{selectedVisa.actionTaken}</p>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedVisa.id, 'Confirmed Invalid', 'Visa confirmed as invalid');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Confirm Invalid
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedVisa.id, 'Resolved', 'Issue resolved - visa cleared');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark Resolved
                    </button>
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedVisa.id, 'Under Investigation');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Under Investigation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flag New Visa Modal */}
        {showFlagModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Flag New Invalid Visa</h2>
                <button
                  onClick={() => setShowFlagModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Visa Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter visa number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flag Reason</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select reason</option>
                    <option value="Fraudulent Document">Fraudulent Document</option>
                    <option value="Expired">Expired</option>
                    <option value="Overstay">Overstay</option>
                    <option value="Invalid Purpose">Invalid Purpose</option>
                    <option value="Forged Signature">Forged Signature</option>
                    <option value="Suspicious Activity">Suspicious Activity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select severity</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional details about the flag..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowFlagModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFlagModal(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Flag Visa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}