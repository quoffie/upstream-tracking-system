'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { ClockIcon as ClockSolid, ExclamationTriangleIcon as ExclamationTriangleSolid } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../../app/components/layouts/DashboardMenus';

interface WorkPermitExpiry {
  id: string;
  permitNumber: string;
  holderName: string;
  company: string;
  position: string;
  issueDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
  status: 'Expiring Soon' | 'Expired' | 'Critical';
  renewalStatus: 'Not Started' | 'In Progress' | 'Submitted' | 'Approved' | 'Rejected';
  contactEmail: string;
  lastNotified?: string;
}

const mockExpiringPermits: WorkPermitExpiry[] = [
  {
    id: 'WPE-001',
    permitNumber: 'WP-2023-001234',
    holderName: 'John Smith',
    company: 'Tullow Oil Ghana',
    position: 'Drilling Engineer',
    issueDate: '2023-01-15',
    expiryDate: '2024-01-15',
    daysUntilExpiry: 5,
    status: 'Critical',
    renewalStatus: 'In Progress',
    contactEmail: 'john.smith@tullowoil.com',
    lastNotified: '2024-01-08'
  },
  {
    id: 'WPE-002',
    permitNumber: 'WP-2022-005678',
    holderName: 'Sarah Johnson',
    company: 'Kosmos Energy',
    position: 'Geologist',
    issueDate: '2022-02-20',
    expiryDate: '2024-02-20',
    daysUntilExpiry: 30,
    status: 'Expiring Soon',
    renewalStatus: 'Submitted',
    contactEmail: 'sarah.johnson@kosmosenergy.com',
    lastNotified: '2024-01-05'
  },
  {
    id: 'WPE-003',
    permitNumber: 'WP-2021-009876',
    holderName: 'Michael Brown',
    company: 'Eni Ghana',
    position: 'Production Manager',
    issueDate: '2021-03-10',
    expiryDate: '2024-01-05',
    daysUntilExpiry: -5,
    status: 'Expired',
    renewalStatus: 'Not Started',
    contactEmail: 'michael.brown@eni.com'
  },
  {
    id: 'WPE-004',
    permitNumber: 'WP-2023-112233',
    holderName: 'Emma Wilson',
    company: 'Springfield E&P',
    position: 'HSE Manager',
    issueDate: '2023-06-01',
    expiryDate: '2024-03-01',
    daysUntilExpiry: 50,
    status: 'Expiring Soon',
    renewalStatus: 'Not Started',
    contactEmail: 'emma.wilson@springfield.com'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Critical':
      return <ExclamationTriangleSolid className="h-5 w-5 text-red-600" />;
    case 'Expiring Soon':
      return <ClockSolid className="h-5 w-5 text-yellow-500" />;
    case 'Expired':
      return <ExclamationTriangleSolid className="h-5 w-5 text-red-500" />;
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Critical':
      return 'bg-red-100 text-red-800';
    case 'Expiring Soon':
      return 'bg-yellow-100 text-yellow-800';
    case 'Expired':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRenewalStatusColor = (status: string) => {
  switch (status) {
    case 'Not Started':
      return 'bg-gray-100 text-gray-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Submitted':
      return 'bg-purple-100 text-purple-800';
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function WorkPermitExpiryPage() {
  const [permits, setPermits] = useState<WorkPermitExpiry[]>(mockExpiringPermits);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [renewalFilter, setRenewalFilter] = useState('All');
  const [selectedPermit, setSelectedPermit] = useState<WorkPermitExpiry | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredPermits = permits.filter(permit => {
    const matchesSearch = permit.permitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.holderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || permit.status === statusFilter;
    const matchesRenewal = renewalFilter === 'All' || permit.renewalStatus === renewalFilter;
    return matchesSearch && matchesStatus && matchesRenewal;
  });

  const handleSendNotification = (permitId: string) => {
    setPermits(prev => prev.map(permit => 
      permit.id === permitId 
        ? { ...permit, lastNotified: new Date().toISOString().split('T')[0] }
        : permit
    ));
    setShowNotificationModal(false);
  };

  const criticalCount = permits.filter(p => p.status === 'Critical').length;
  const expiringSoonCount = permits.filter(p => p.status === 'Expiring Soon').length;
  const expiredCount = permits.filter(p => p.status === 'Expired').length;

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Work Permit Expiry Check</h1>
            <p className="text-gray-600">Monitor and manage work permit expiration dates</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            Send Bulk Notifications
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Monitored</p>
                <p className="text-2xl font-bold text-gray-900">{permits.length}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical (&lt; 7 days)</p>
                <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{expiringSoonCount}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
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
                <option value="Critical">Critical</option>
                <option value="Expiring Soon">Expiring Soon</option>
                <option value="Expired">Expired</option>
              </select>
              <select
                value={renewalFilter}
                onChange={(e) => setRenewalFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Renewal Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Permits List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Work Permits Expiry Status</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredPermits.map((permit) => (
              <div key={permit.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(permit.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{permit.permitNumber}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(permit.status)}`}>
                        {permit.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRenewalStatusColor(permit.renewalStatus)}`}>
                        {permit.renewalStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium">Holder:</span> {permit.holderName}
                      </div>
                      <div>
                        <span className="font-medium">Company:</span> {permit.company}
                      </div>
                      <div>
                        <span className="font-medium">Position:</span> {permit.position}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span className="font-medium">Expires:</span> 
                        <span className={permit.daysUntilExpiry < 0 ? 'text-red-600 font-semibold' : permit.daysUntilExpiry <= 7 ? 'text-red-600 font-semibold' : permit.daysUntilExpiry <= 30 ? 'text-yellow-600 font-semibold' : ''}>
                          {new Date(permit.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Days Until Expiry:</span> 
                        <span className={permit.daysUntilExpiry < 0 ? 'text-red-600 font-bold' : permit.daysUntilExpiry <= 7 ? 'text-red-600 font-bold' : permit.daysUntilExpiry <= 30 ? 'text-yellow-600 font-bold' : 'text-green-600'}>
                          {permit.daysUntilExpiry < 0 ? `Expired ${Math.abs(permit.daysUntilExpiry)} days ago` : `${permit.daysUntilExpiry} days`}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span> {permit.contactEmail}
                      </div>
                      <div>
                        <span className="font-medium">Last Notified:</span> {permit.lastNotified ? new Date(permit.lastNotified).toLocaleDateString() : 'Never'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedPermit(permit);
                        setShowNotificationModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Send Notification"
                    >
                      <BellIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Modal */}
        {showNotificationModal && selectedPermit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Send Expiry Notification</h2>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Permit: <span className="font-semibold">{selectedPermit.permitNumber}</span></p>
                  <p className="text-sm text-gray-600 mb-2">Holder: <span className="font-semibold">{selectedPermit.holderName}</span></p>
                  <p className="text-sm text-gray-600 mb-2">Company: <span className="font-semibold">{selectedPermit.company}</span></p>
                  <p className="text-sm text-gray-600 mb-4">Email: <span className="font-semibold">{selectedPermit.contactEmail}</span></p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notification Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={`Dear ${selectedPermit.holderName},\n\nThis is to notify you that your work permit (${selectedPermit.permitNumber}) will expire on ${new Date(selectedPermit.expiryDate).toLocaleDateString()}. Please ensure you initiate the renewal process immediately to avoid any disruption.\n\nBest regards,\nImmigration Department`}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowNotificationModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendNotification(selectedPermit.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Notification
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