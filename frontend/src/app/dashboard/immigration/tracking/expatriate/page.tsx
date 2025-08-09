'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  GlobeAltIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon as ExclamationTriangleSolid } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../../app/components/layouts/DashboardMenus';

interface ExpatriateVisa {
  id: string;
  name: string;
  nationality: string;
  passportNumber: string;
  company: string;
  position: string;
  visaType: 'Business' | 'Multiple Entry' | 'Transit' | 'Tourist';
  visaNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Expired' | 'Expiring Soon' | 'Under Review' | 'Cancelled';
  daysUntilExpiry: number;
  entryDate: string;
  location: string;
  sponsor: string;
  renewalStatus?: 'Not Required' | 'In Progress' | 'Submitted' | 'Approved' | 'Rejected';
  lastUpdated: string;
  notes?: string;
}

const mockExpatriateVisas: ExpatriateVisa[] = [
  {
    id: 'EV-001',
    name: 'John Smith',
    nationality: 'British',
    passportNumber: 'GB123456789',
    company: 'Tullow Oil Ghana',
    position: 'Drilling Engineer',
    visaType: 'Multiple Entry',
    visaNumber: 'V-2023-001234',
    issueDate: '2023-06-01',
    expiryDate: '2024-06-01',
    status: 'Valid',
    daysUntilExpiry: 142,
    entryDate: '2023-06-15',
    location: 'Offshore Platform A',
    sponsor: 'Ghana Immigration Service',
    renewalStatus: 'Not Required',
    lastUpdated: '2024-01-10'
  },
  {
    id: 'EV-002',
    name: 'Sarah Johnson',
    nationality: 'American',
    passportNumber: 'US456789123',
    company: 'ExxonMobil Ghana',
    position: 'HSE Manager',
    visaType: 'Business',
    visaNumber: 'V-2023-009876',
    issueDate: '2023-09-20',
    expiryDate: '2024-03-20',
    status: 'Expiring Soon',
    daysUntilExpiry: 68,
    entryDate: '2023-09-25',
    location: 'Accra Office',
    sponsor: 'Ghana Investment Promotion Centre',
    renewalStatus: 'In Progress',
    lastUpdated: '2024-01-12',
    notes: 'Renewal application submitted on 2024-01-05'
  },
  {
    id: 'EV-003',
    name: 'Michael Chen',
    nationality: 'Chinese',
    passportNumber: 'CN789123456',
    company: 'CNOOC Ghana',
    position: 'Production Manager',
    visaType: 'Multiple Entry',
    visaNumber: 'V-2023-112233',
    issueDate: '2023-04-01',
    expiryDate: '2024-04-01',
    status: 'Valid',
    daysUntilExpiry: 81,
    entryDate: '2023-04-10',
    location: 'Takoradi Office',
    sponsor: 'Ministry of Energy',
    renewalStatus: 'Submitted',
    lastUpdated: '2024-01-08'
  },
  {
    id: 'EV-004',
    name: 'Emma Rodriguez',
    nationality: 'Spanish',
    passportNumber: 'ES321654987',
    company: 'Repsol Ghana',
    position: 'Geophysicist',
    visaType: 'Business',
    visaNumber: 'V-2022-445566',
    issueDate: '2022-12-01',
    expiryDate: '2023-12-01',
    status: 'Expired',
    daysUntilExpiry: -41,
    entryDate: '2022-12-15',
    location: 'Accra Office',
    sponsor: 'Ghana National Petroleum Corporation',
    renewalStatus: 'Rejected',
    lastUpdated: '2024-01-11',
    notes: 'Visa expired, deportation proceedings initiated'
  },
  {
    id: 'EV-005',
    name: 'Lars Andersen',
    nationality: 'Norwegian',
    passportNumber: 'NO987654321',
    company: 'Equinor Ghana',
    position: 'Subsea Engineer',
    visaType: 'Multiple Entry',
    visaNumber: 'V-2023-778899',
    issueDate: '2023-08-01',
    expiryDate: '2024-08-01',
    status: 'Valid',
    daysUntilExpiry: 203,
    entryDate: '2023-08-15',
    location: 'Offshore Platform B',
    sponsor: 'Ghana Maritime Authority',
    renewalStatus: 'Not Required',
    lastUpdated: '2024-01-09'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Valid':
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    case 'Expired':
      return <ExclamationTriangleSolid className="h-5 w-5 text-red-600" />;
    case 'Expiring Soon':
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
    case 'Under Review':
      return <DocumentTextIcon className="h-5 w-5 text-blue-600" />;
    case 'Cancelled':
      return <ExclamationTriangleSolid className="h-5 w-5 text-gray-600" />;
    default:
      return <UserIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Valid':
      return 'bg-green-100 text-green-800';
    case 'Expired':
      return 'bg-red-100 text-red-800';
    case 'Expiring Soon':
      return 'bg-yellow-100 text-yellow-800';
    case 'Under Review':
      return 'bg-blue-100 text-blue-800';
    case 'Cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRenewalStatusColor = (status: string) => {
  switch (status) {
    case 'Not Required':
      return 'bg-gray-100 text-gray-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Submitted':
      return 'bg-yellow-100 text-yellow-800';
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDaysUntilExpiryColor = (days: number) => {
  if (days < 0) return 'text-red-600 font-bold';
  if (days <= 30) return 'text-red-600 font-semibold';
  if (days <= 90) return 'text-yellow-600 font-semibold';
  return 'text-green-600';
};

export default function ExpatriateVisaStatusPage() {
  const [visas, setVisas] = useState<ExpatriateVisa[]>(mockExpatriateVisas);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [visaTypeFilter, setVisaTypeFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [selectedVisa, setSelectedVisa] = useState<ExpatriateVisa | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredVisas = visas.filter(visa => {
    const matchesSearch = visa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.visaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visa.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || visa.status === statusFilter;
    const matchesVisaType = visaTypeFilter === 'All' || visa.visaType === visaTypeFilter;
    const matchesCompany = companyFilter === 'All' || visa.company === companyFilter;
    return matchesSearch && matchesStatus && matchesVisaType && matchesCompany;
  });

  const totalVisas = visas.length;
  const validCount = visas.filter(v => v.status === 'Valid').length;
  const expiringSoonCount = visas.filter(v => v.status === 'Expiring Soon').length;
  const expiredCount = visas.filter(v => v.status === 'Expired').length;

  const companies = [...new Set(visas.map(v => v.company))];

  const handleSendNotification = (visaId: string) => {
    // Handle sending notification logic here
    console.log('Sending notification for visa:', visaId);
  };

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expatriate Visa Status</h1>
            <p className="text-gray-600">Monitor visa status and expiry dates for expatriate personnel</p>
          </div>
          <button 
            onClick={() => setShowRenewalModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <DocumentTextIcon className="h-5 w-5" />
            Process Renewal
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visas</p>
                <p className="text-2xl font-bold text-gray-900">{totalVisas}</p>
              </div>
              <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valid</p>
                <p className="text-2xl font-bold text-green-600">{validCount}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{expiringSoonCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expiredCount}</p>
              </div>
              <ExclamationTriangleSolid className="h-8 w-8 text-red-600" />
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
                  placeholder="Search by name, company, visa number, or passport..."
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
                <option value="Under Review">Under Review</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                value={visaTypeFilter}
                onChange={(e) => setVisaTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Business">Business</option>
                <option value="Multiple Entry">Multiple Entry</option>
                <option value="Transit">Transit</option>
                <option value="Tourist">Tourist</option>
              </select>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Visa List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Expatriate Visa Records</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredVisas.map((visa) => (
              <div key={visa.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(visa.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{visa.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visa.status)}`}>
                        {visa.status}
                      </span>
                      {visa.renewalStatus && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRenewalStatusColor(visa.renewalStatus)}`}>
                          Renewal: {visa.renewalStatus}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span className="font-medium">Company:</span> {visa.company}
                      </div>
                      <div>
                        <span className="font-medium">Position:</span> {visa.position}
                      </div>
                      <div>
                        <span className="font-medium">Nationality:</span> {visa.nationality}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {visa.location}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <DocumentTextIcon className="h-4 w-4" />
                        <span className="font-medium">Visa Number:</span> {visa.visaNumber}
                      </div>
                      <div>
                        <span className="font-medium">Visa Type:</span> {visa.visaType}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span className="font-medium">Expiry Date:</span> {new Date(visa.expiryDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Days Until Expiry:</span> 
                        <span className={getDaysUntilExpiryColor(visa.daysUntilExpiry)}>
                          {visa.daysUntilExpiry > 0 ? `${visa.daysUntilExpiry} days` : `Expired ${Math.abs(visa.daysUntilExpiry)} days ago`}
                        </span>
                      </div>
                    </div>
                    {visa.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {visa.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleSendNotification(visa.id)}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg"
                      title="Send Notification"
                    >
                      <BellIcon className="h-5 w-5" />
                    </button>
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
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Visa Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <p className="text-gray-900">{selectedVisa.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <p className="text-gray-900">{selectedVisa.nationality}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                      <p className="text-gray-900">{selectedVisa.passportNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <p className="text-gray-900">{selectedVisa.company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <p className="text-gray-900">{selectedVisa.position}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-gray-900">{selectedVisa.location}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Visa Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Visa Number</label>
                      <p className="text-gray-900">{selectedVisa.visaNumber}</p>
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
                      <p className={new Date(selectedVisa.expiryDate) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                        {new Date(selectedVisa.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedVisa.status)}`}>
                        {selectedVisa.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Days Until Expiry</label>
                      <p className={getDaysUntilExpiryColor(selectedVisa.daysUntilExpiry)}>
                        {selectedVisa.daysUntilExpiry > 0 ? `${selectedVisa.daysUntilExpiry} days` : `Expired ${Math.abs(selectedVisa.daysUntilExpiry)} days ago`}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Entry Date</label>
                      <p className="text-gray-900">{new Date(selectedVisa.entryDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sponsor</label>
                      <p className="text-gray-900">{selectedVisa.sponsor}</p>
                    </div>
                    {selectedVisa.renewalStatus && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Renewal Status</label>
                        <span className={`px-2 py-1 rounded text-sm ${getRenewalStatusColor(selectedVisa.renewalStatus)}`}>
                          {selectedVisa.renewalStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {selectedVisa.notes && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600">{selectedVisa.notes}</p>
                </div>
              )}
              <div className="mt-6 pt-6 border-t">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSendNotification(selectedVisa.id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
                  >
                    <BellIcon className="h-4 w-4" />
                    Send Notification
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Process Renewal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Renewal Modal */}
        {showRenewalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Process Visa Renewal</h2>
                <button
                  onClick={() => setShowRenewalModal(false)}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select renewal type</option>
                    <option value="Extension">Extension</option>
                    <option value="New Application">New Application</option>
                    <option value="Change of Status">Change of Status</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select priority</option>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Additional notes for renewal..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowRenewalModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowRenewalModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Process Renewal
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