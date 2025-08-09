'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  DocumentCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid, ClockIcon as ClockSolid, ExclamationTriangleIcon as ExclamationTriangleSolid } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface PermitValidation {
  id: string;
  permitNumber: string;
  holderName: string;
  company: string;
  permitType: 'Work Permit' | 'Residence Permit' | 'Visa';
  status: 'Valid' | 'Expired' | 'Expiring Soon' | 'Invalid' | 'Suspended';
  issueDate: string;
  expiryDate: string;
  validationDate: string;
  validatedBy: string;
  notes?: string;
  flagged: boolean;
}

const mockValidations: PermitValidation[] = [
  {
    id: 'PV-001',
    permitNumber: 'WP-2023-001234',
    holderName: 'John Smith',
    company: 'Tullow Oil Ghana',
    permitType: 'Work Permit',
    status: 'Valid',
    issueDate: '2023-01-15',
    expiryDate: '2024-01-15',
    validationDate: '2024-01-10',
    validatedBy: 'Immigration Officer A',
    flagged: false
  },
  {
    id: 'PV-002',
    permitNumber: 'WP-2022-005678',
    holderName: 'Sarah Johnson',
    company: 'Kosmos Energy',
    permitType: 'Work Permit',
    status: 'Expiring Soon',
    issueDate: '2022-02-20',
    expiryDate: '2024-02-20',
    validationDate: '2024-01-12',
    validatedBy: 'Immigration Officer B',
    notes: 'Renewal application pending',
    flagged: true
  },
  {
    id: 'PV-003',
    permitNumber: 'RP-2021-009876',
    holderName: 'Michael Brown',
    company: 'Eni Ghana',
    permitType: 'Residence Permit',
    status: 'Expired',
    issueDate: '2021-03-10',
    expiryDate: '2023-03-10',
    validationDate: '2024-01-08',
    validatedBy: 'Immigration Officer C',
    notes: 'Permit expired, holder still in country',
    flagged: true
  },
  {
    id: 'PV-004',
    permitNumber: 'V-2023-112233',
    holderName: 'Emma Wilson',
    company: 'Springfield E&P',
    permitType: 'Visa',
    status: 'Invalid',
    issueDate: '2023-06-01',
    expiryDate: '2023-12-01',
    validationDate: '2024-01-11',
    validatedBy: 'Immigration Officer A',
    notes: 'Visa found to be fraudulent',
    flagged: true
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Valid':
      return <CheckCircleSolid className="h-5 w-5 text-green-500" />;
    case 'Expiring Soon':
      return <ClockSolid className="h-5 w-5 text-yellow-500" />;
    case 'Expired':
      return <ExclamationTriangleSolid className="h-5 w-5 text-red-500" />;
    case 'Invalid':
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
    case 'Suspended':
      return <ExclamationTriangleSolid className="h-5 w-5 text-orange-500" />;
    default:
      return <DocumentCheckIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Valid':
      return 'bg-green-100 text-green-800';
    case 'Expiring Soon':
      return 'bg-yellow-100 text-yellow-800';
    case 'Expired':
      return 'bg-red-100 text-red-800';
    case 'Invalid':
      return 'bg-red-100 text-red-800';
    case 'Suspended':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PermitValidationPage() {
  const [validations, setValidations] = useState<PermitValidation[]>(mockValidations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [selectedValidation, setSelectedValidation] = useState<PermitValidation | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredValidations = validations.filter(validation => {
    const matchesSearch = validation.permitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         validation.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         validation.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || validation.status === statusFilter;
    const matchesType = typeFilter === 'All' || validation.permitType === typeFilter;
    const matchesFlagged = !flaggedOnly || validation.flagged;
    return matchesSearch && matchesStatus && matchesType && matchesFlagged;
  });

  const handleValidatePermit = (permitId: string, newStatus: string, notes?: string) => {
    setValidations(prev => prev.map(validation => 
      validation.id === permitId 
        ? { 
            ...validation, 
            status: newStatus as any,
            validationDate: new Date().toISOString().split('T')[0],
            notes: notes || validation.notes,
            flagged: newStatus !== 'Valid'
          }
        : validation
    ));
  };

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Permit Validation</h1>
            <p className="text-gray-600">Validate work permits, residence permits, and visas</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Permits</p>
                <p className="text-2xl font-bold text-gray-900">{validations.length}</p>
              </div>
              <DocumentCheckIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valid</p>
                <p className="text-2xl font-bold text-green-600">
                  {validations.filter(v => v.status === 'Valid').length}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {validations.filter(v => v.status === 'Expiring Soon').length}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">
                  {validations.filter(v => v.status === 'Expired').length}
                </p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Flagged</p>
                <p className="text-2xl font-bold text-orange-600">
                  {validations.filter(v => v.flagged).length}
                </p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />
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
                  placeholder="Search by permit number, holder name, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Valid">Valid</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
                <option value="Invalid">Invalid</option>
                <option value="Suspended">Suspended</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Work Permit">Work Permit</option>
                <option value="Residence Permit">Residence Permit</option>
                <option value="Visa">Visa</option>
              </select>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={flaggedOnly}
                  onChange={(e) => setFlaggedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Flagged Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Validations List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Permit Validations</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredValidations.map((validation) => (
              <div key={validation.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(validation.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{validation.permitNumber}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(validation.status)}`}>
                        {validation.status}
                      </span>
                      {validation.flagged && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Flagged
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Holder:</span> {validation.holderName}
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {validation.company}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {validation.permitType}
                      </div>
                      <div>
                        <span className="font-medium">Expires:</span> {new Date(validation.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Issued:</span> {new Date(validation.issueDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Last Validated:</span> {new Date(validation.validationDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Validated By:</span> {validation.validatedBy}
                      </div>
                    </div>
                    {validation.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {validation.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedValidation(validation);
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
        {showDetailsModal && selectedValidation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Permit Validation Details</h2>
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
                    <label className="block text-sm font-medium text-gray-700">Permit Number</label>
                    <p className="text-gray-900">{selectedValidation.permitNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedValidation.status)}
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedValidation.status)}`}>
                        {selectedValidation.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Holder Name</label>
                    <p className="text-gray-900">{selectedValidation.holderName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="text-gray-900">{selectedValidation.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Permit Type</label>
                    <p className="text-gray-900">{selectedValidation.permitType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                    <p className="text-gray-900">{new Date(selectedValidation.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <p className="text-gray-900">{new Date(selectedValidation.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Validation</label>
                    <p className="text-gray-900">{new Date(selectedValidation.validationDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Validated By</label>
                    <p className="text-gray-900">{selectedValidation.validatedBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Flagged</label>
                    <p className="text-gray-900">{selectedValidation.flagged ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                {selectedValidation.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="text-gray-900 mt-1">{selectedValidation.notes}</p>
                  </div>
                )}
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Validation Status</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleValidatePermit(selectedValidation.id, 'Valid');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Mark Valid
                    </button>
                    <button
                      onClick={() => {
                        handleValidatePermit(selectedValidation.id, 'Invalid', 'Marked as invalid during review');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Mark Invalid
                    </button>
                    <button
                      onClick={() => {
                        handleValidatePermit(selectedValidation.id, 'Suspended', 'Permit suspended pending investigation');
                        setShowDetailsModal(false);
                      }}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      Suspend
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}