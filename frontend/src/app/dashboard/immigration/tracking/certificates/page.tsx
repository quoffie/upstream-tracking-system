'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  BellIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon as ExclamationTriangleSolid } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../../app/components/layouts/DashboardMenus';

interface BOSIETCertificate {
  id: string;
  name: string;
  employeeId: string;
  company: string;
  position: string;
  certificateNumber: string;
  certificateType: 'BOSIET' | 'FOET' | 'HUET' | 'STCW Basic Safety' | 'Helicopter Safety';
  issueDate: string;
  expiryDate: string;
  status: 'Valid' | 'Expired' | 'Expiring Soon' | 'Renewal In Progress' | 'Suspended';
  daysUntilExpiry: number;
  trainingProvider: string;
  location: string;
  renewalStatus: 'Not Required' | 'Due' | 'In Progress' | 'Scheduled' | 'Completed' | 'Overdue';
  lastRenewalDate?: string;
  nextRenewalDate: string;
  workLocation: 'Offshore' | 'Onshore' | 'Both';
  emergencyContact: string;
  medicalClearance: 'Valid' | 'Expired' | 'Not Required';
  lastUpdated: string;
  notes?: string;
}

const mockCertificates: BOSIETCertificate[] = [
  {
    id: 'CERT-001',
    name: 'John Smith',
    employeeId: 'EMP-001',
    company: 'Tullow Oil Ghana',
    position: 'Drilling Engineer',
    certificateNumber: 'BOSIET-2023-001234',
    certificateType: 'BOSIET',
    issueDate: '2023-06-01',
    expiryDate: '2027-06-01',
    status: 'Valid',
    daysUntilExpiry: 1247,
    trainingProvider: 'Falck Safety Services',
    location: 'Aberdeen, UK',
    renewalStatus: 'Not Required',
    nextRenewalDate: '2027-04-01',
    workLocation: 'Offshore',
    emergencyContact: '+44 123 456 7890',
    medicalClearance: 'Valid',
    lastUpdated: '2024-01-10'
  },
  {
    id: 'CERT-002',
    name: 'Sarah Johnson',
    employeeId: 'EMP-002',
    company: 'ExxonMobil Ghana',
    position: 'HSE Manager',
    certificateNumber: 'FOET-2022-009876',
    certificateType: 'FOET',
    issueDate: '2022-03-15',
    expiryDate: '2024-03-15',
    status: 'Expiring Soon',
    daysUntilExpiry: 63,
    trainingProvider: 'Maersk Training',
    location: 'Esbjerg, Denmark',
    renewalStatus: 'Scheduled',
    lastRenewalDate: '2022-03-15',
    nextRenewalDate: '2024-02-15',
    workLocation: 'Offshore',
    emergencyContact: '+1 555 123 4567',
    medicalClearance: 'Valid',
    lastUpdated: '2024-01-12',
    notes: 'Renewal training scheduled for February 10, 2024'
  },
  {
    id: 'CERT-003',
    name: 'Michael Chen',
    employeeId: 'EMP-003',
    company: 'CNOOC Ghana',
    position: 'Production Manager',
    certificateNumber: 'HUET-2021-112233',
    certificateType: 'HUET',
    issueDate: '2021-09-20',
    expiryDate: '2023-09-20',
    status: 'Expired',
    daysUntilExpiry: -122,
    trainingProvider: 'Survivex',
    location: 'Aberdeen, UK',
    renewalStatus: 'Overdue',
    lastRenewalDate: '2021-09-20',
    nextRenewalDate: '2023-07-20',
    workLocation: 'Offshore',
    emergencyContact: '+86 138 0013 8000',
    medicalClearance: 'Expired',
    lastUpdated: '2024-01-08',
    notes: 'Certificate expired, employee suspended from offshore duties'
  },
  {
    id: 'CERT-004',
    name: 'Emma Rodriguez',
    employeeId: 'EMP-004',
    company: 'Repsol Ghana',
    position: 'Geophysicist',
    certificateNumber: 'STCW-2023-445566',
    certificateType: 'STCW Basic Safety',
    issueDate: '2023-01-10',
    expiryDate: '2028-01-10',
    status: 'Valid',
    daysUntilExpiry: 1471,
    trainingProvider: 'Maritime Training Institute',
    location: 'Rotterdam, Netherlands',
    renewalStatus: 'Not Required',
    nextRenewalDate: '2027-11-10',
    workLocation: 'Both',
    emergencyContact: '+34 600 123 456',
    medicalClearance: 'Valid',
    lastUpdated: '2024-01-11'
  },
  {
    id: 'CERT-005',
    name: 'Lars Andersen',
    employeeId: 'EMP-005',
    company: 'Equinor Ghana',
    position: 'Subsea Engineer',
    certificateNumber: 'BOSIET-2022-778899',
    certificateType: 'BOSIET',
    issueDate: '2022-11-01',
    expiryDate: '2024-11-01',
    status: 'Expiring Soon',
    daysUntilExpiry: 305,
    trainingProvider: 'Falck Safety Services',
    location: 'Stavanger, Norway',
    renewalStatus: 'In Progress',
    lastRenewalDate: '2022-11-01',
    nextRenewalDate: '2024-09-01',
    workLocation: 'Offshore',
    emergencyContact: '+47 123 45 678',
    medicalClearance: 'Valid',
    lastUpdated: '2024-01-09',
    notes: 'Renewal application submitted, awaiting training schedule'
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
    case 'Renewal In Progress':
      return <ClockIcon className="h-5 w-5 text-blue-600" />;
    case 'Suspended':
      return <ExclamationTriangleSolid className="h-5 w-5 text-gray-600" />;
    default:
      return <AcademicCapIcon className="h-5 w-5 text-gray-500" />;
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
    case 'Renewal In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Suspended':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRenewalStatusColor = (status: string) => {
  switch (status) {
    case 'Not Required':
      return 'bg-gray-100 text-gray-800';
    case 'Due':
      return 'bg-yellow-100 text-yellow-800';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Scheduled':
      return 'bg-green-100 text-green-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDaysUntilExpiryColor = (days: number) => {
  if (days < 0) return 'text-red-600 font-bold';
  if (days <= 90) return 'text-red-600 font-semibold';
  if (days <= 180) return 'text-yellow-600 font-semibold';
  return 'text-green-600';
};

export default function BOSIETCertificateRenewalsPage() {
  const [certificates, setCertificates] = useState<BOSIETCertificate[]>(mockCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [certificateTypeFilter, setCertificateTypeFilter] = useState('All');
  const [renewalStatusFilter, setRenewalStatusFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [selectedCertificate, setSelectedCertificate] = useState<BOSIETCertificate | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || cert.status === statusFilter;
    const matchesCertType = certificateTypeFilter === 'All' || cert.certificateType === certificateTypeFilter;
    const matchesRenewalStatus = renewalStatusFilter === 'All' || cert.renewalStatus === renewalStatusFilter;
    const matchesCompany = companyFilter === 'All' || cert.company === companyFilter;
    return matchesSearch && matchesStatus && matchesCertType && matchesRenewalStatus && matchesCompany;
  });

  const totalCertificates = certificates.length;
  const validCount = certificates.filter(c => c.status === 'Valid').length;
  const expiringSoonCount = certificates.filter(c => c.status === 'Expiring Soon').length;
  const expiredCount = certificates.filter(c => c.status === 'Expired').length;
  const renewalsDueCount = certificates.filter(c => c.renewalStatus === 'Due' || c.renewalStatus === 'Overdue').length;

  const companies = [...new Set(certificates.map(c => c.company))];
  const certificateTypes = [...new Set(certificates.map(c => c.certificateType))];

  const handleScheduleRenewal = (certId: string) => {
    // Handle scheduling renewal logic here
    console.log('Scheduling renewal for certificate:', certId);
  };

  const handleSendNotification = (certId: string) => {
    // Handle sending notification logic here
    console.log('Sending notification for certificate:', certId);
  };

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">BOSIET Certificate Renewals</h1>
            <p className="text-gray-600">Monitor and manage offshore safety certificate renewals</p>
          </div>
          <button 
            onClick={() => setShowRenewalModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <AcademicCapIcon className="h-5 w-5" />
            Schedule Renewal
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                <p className="text-2xl font-bold text-gray-900">{totalCertificates}</p>
              </div>
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
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
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Renewals Due</p>
                <p className="text-2xl font-bold text-orange-600">{renewalsDueCount}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-orange-600" />
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
                  placeholder="Search by name, company, certificate number, or employee ID..."
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
                <option value="Renewal In Progress">Renewal In Progress</option>
                <option value="Suspended">Suspended</option>
              </select>
              <select
                value={certificateTypeFilter}
                onChange={(e) => setCertificateTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                {certificateTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={renewalStatusFilter}
                onChange={(e) => setRenewalStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Renewal Status</option>
                <option value="Not Required">Not Required</option>
                <option value="Due">Due</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
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

        {/* Certificate List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Certificate Records</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredCertificates.map((cert) => (
              <div key={cert.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(cert.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRenewalStatusColor(cert.renewalStatus)}`}>
                        Renewal: {cert.renewalStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span className="font-medium">Employee ID:</span> {cert.employeeId}
                      </div>
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span className="font-medium">Company:</span> {cert.company}
                      </div>
                      <div>
                        <span className="font-medium">Position:</span> {cert.position}
                      </div>
                      <div>
                        <span className="font-medium">Work Location:</span> {cert.workLocation}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <AcademicCapIcon className="h-4 w-4" />
                        <span className="font-medium">Certificate:</span> {cert.certificateType}
                      </div>
                      <div className="flex items-center gap-2">
                        <DocumentTextIcon className="h-4 w-4" />
                        <span className="font-medium">Number:</span> {cert.certificateNumber}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span className="font-medium">Expiry Date:</span> {new Date(cert.expiryDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Days Until Expiry:</span> 
                        <span className={getDaysUntilExpiryColor(cert.daysUntilExpiry)}>
                          {cert.daysUntilExpiry > 0 ? `${cert.daysUntilExpiry} days` : `Expired ${Math.abs(cert.daysUntilExpiry)} days ago`}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Training Provider:</span> {cert.trainingProvider}
                      </div>
                      <div>
                        <span className="font-medium">Next Renewal:</span> {new Date(cert.nextRenewalDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Medical Clearance:</span> 
                        <span className={cert.medicalClearance === 'Valid' ? 'text-green-600' : cert.medicalClearance === 'Expired' ? 'text-red-600' : 'text-gray-600'}>
                          {cert.medicalClearance}
                        </span>
                      </div>
                    </div>
                    {cert.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Notes:</span> {cert.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleSendNotification(cert.id)}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg"
                      title="Send Notification"
                    >
                      <BellIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleScheduleRenewal(cert.id)}
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                      title="Schedule Renewal"
                    >
                      <ClockIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCertificate(cert);
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
        {showDetailsModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Certificate Details</h2>
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
                      <p className="text-gray-900">{selectedCertificate.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                      <p className="text-gray-900">{selectedCertificate.employeeId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <p className="text-gray-900">{selectedCertificate.company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <p className="text-gray-900">{selectedCertificate.position}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Work Location</label>
                      <p className="text-gray-900">{selectedCertificate.workLocation}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                      <p className="text-gray-900">{selectedCertificate.emergencyContact}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Certificate Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Certificate Type</label>
                      <p className="text-gray-900">{selectedCertificate.certificateType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Certificate Number</label>
                      <p className="text-gray-900">{selectedCertificate.certificateNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                      <p className="text-gray-900">{new Date(selectedCertificate.issueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <p className={new Date(selectedCertificate.expiryDate) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                        {new Date(selectedCertificate.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedCertificate.status)}`}>
                        {selectedCertificate.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Days Until Expiry</label>
                      <p className={getDaysUntilExpiryColor(selectedCertificate.daysUntilExpiry)}>
                        {selectedCertificate.daysUntilExpiry > 0 ? `${selectedCertificate.daysUntilExpiry} days` : `Expired ${Math.abs(selectedCertificate.daysUntilExpiry)} days ago`}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Training Provider</label>
                      <p className="text-gray-900">{selectedCertificate.trainingProvider}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Training Location</label>
                      <p className="text-gray-900">{selectedCertificate.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Renewal Status</label>
                    <span className={`px-2 py-1 rounded text-sm ${getRenewalStatusColor(selectedCertificate.renewalStatus)}`}>
                      {selectedCertificate.renewalStatus}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Next Renewal Date</label>
                    <p className="text-gray-900">{new Date(selectedCertificate.nextRenewalDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Medical Clearance</label>
                    <span className={selectedCertificate.medicalClearance === 'Valid' ? 'text-green-600' : selectedCertificate.medicalClearance === 'Expired' ? 'text-red-600' : 'text-gray-600'}>
                      {selectedCertificate.medicalClearance}
                    </span>
                  </div>
                </div>
              </div>
              {selectedCertificate.notes && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600">{selectedCertificate.notes}</p>
                </div>
              )}
              <div className="mt-6 pt-6 border-t">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleScheduleRenewal(selectedCertificate.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <ClockIcon className="h-4 w-4" />
                    Schedule Renewal
                  </button>
                  <button
                    onClick={() => handleSendNotification(selectedCertificate.id)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
                  >
                    <BellIcon className="h-4 w-4" />
                    Send Notification
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
                <h2 className="text-xl font-bold text-gray-900">Schedule Certificate Renewal</h2>
                <button
                  onClick={() => setShowRenewalModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter certificate number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select certificate type</option>
                    <option value="BOSIET">BOSIET</option>
                    <option value="FOET">FOET</option>
                    <option value="HUET">HUET</option>
                    <option value="STCW Basic Safety">STCW Basic Safety</option>
                    <option value="Helicopter Safety">Helicopter Safety</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Provider</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select training provider</option>
                    <option value="Falck Safety Services">Falck Safety Services</option>
                    <option value="Maersk Training">Maersk Training</option>
                    <option value="Survivex">Survivex</option>
                    <option value="Maritime Training Institute">Maritime Training Institute</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Training Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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
                    Schedule Renewal
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