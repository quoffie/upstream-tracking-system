'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface Personnel {
  id: string;
  name: string;
  nationality: string;
  passportNumber: string;
  company: string;
  position: string;
  department: string;
  employmentType: 'Expatriate' | 'Local Staff' | 'Contract' | 'Consultant';
  visaType?: string;
  visaNumber?: string;
  visaExpiry?: string;
  workPermitNumber?: string;
  workPermitExpiry?: string;
  bosietCertificate?: string;
  bosietExpiry?: string;
  startDate: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Expired';
  location: string;
  email: string;
  phone: string;
  emergencyContact: string;
  lastUpdated: string;
}

const mockPersonnel: Personnel[] = [
  {
    id: 'P-001',
    name: 'John Smith',
    nationality: 'British',
    passportNumber: 'GB123456789',
    company: 'Tullow Oil Ghana',
    position: 'Drilling Engineer',
    department: 'Operations',
    employmentType: 'Expatriate',
    visaType: 'Multiple Entry Business',
    visaNumber: 'V-2023-001234',
    visaExpiry: '2024-06-15',
    workPermitNumber: 'WP-2023-5678',
    workPermitExpiry: '2024-12-31',
    bosietCertificate: 'BOSIET-2023-001',
    bosietExpiry: '2024-08-20',
    startDate: '2023-01-15',
    status: 'Active',
    location: 'Offshore Platform A',
    email: 'john.smith@tullowoil.com',
    phone: '+233-24-123-4567',
    emergencyContact: 'Jane Smith (+44-20-7123-4567)',
    lastUpdated: '2024-01-10'
  },
  {
    id: 'P-002',
    name: 'Kwame Asante',
    nationality: 'Ghanaian',
    passportNumber: 'GH987654321',
    company: 'Ghana National Petroleum Corporation',
    position: 'Production Supervisor',
    department: 'Production',
    employmentType: 'Local Staff',
    startDate: '2020-03-01',
    status: 'Active',
    location: 'Tema Office',
    email: 'kwame.asante@gnpc.gov.gh',
    phone: '+233-30-234-5678',
    emergencyContact: 'Ama Asante (+233-24-987-6543)',
    lastUpdated: '2024-01-08'
  },
  {
    id: 'P-003',
    name: 'Sarah Johnson',
    nationality: 'American',
    passportNumber: 'US456789123',
    company: 'ExxonMobil Ghana',
    position: 'HSE Manager',
    department: 'Health & Safety',
    employmentType: 'Expatriate',
    visaType: 'Business Visa',
    visaNumber: 'V-2023-009876',
    visaExpiry: '2024-03-20',
    workPermitNumber: 'WP-2023-9012',
    workPermitExpiry: '2024-09-15',
    bosietCertificate: 'BOSIET-2023-002',
    bosietExpiry: '2024-05-10',
    startDate: '2023-03-20',
    status: 'Active',
    location: 'Accra Office',
    email: 'sarah.johnson@exxonmobil.com',
    phone: '+233-30-345-6789',
    emergencyContact: 'Mike Johnson (+1-713-456-7890)',
    lastUpdated: '2024-01-12'
  },
  {
    id: 'P-004',
    name: 'Emmanuel Osei',
    nationality: 'Ghanaian',
    passportNumber: 'GH123789456',
    company: 'Kosmos Energy Ghana',
    position: 'Geologist',
    department: 'Exploration',
    employmentType: 'Local Staff',
    startDate: '2021-07-01',
    status: 'Active',
    location: 'Takoradi Office',
    email: 'emmanuel.osei@kosmosenergy.com',
    phone: '+233-31-456-7890',
    emergencyContact: 'Grace Osei (+233-24-654-3210)',
    lastUpdated: '2024-01-09'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Active':
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    case 'Expired':
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />;
    case 'Pending':
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />;
    case 'Inactive':
      return <ExclamationTriangleIcon className="h-5 w-5 text-gray-600" />;
    default:
      return <UserIcon className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Expired':
      return 'bg-red-100 text-red-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getEmploymentTypeColor = (type: string) => {
  switch (type) {
    case 'Expatriate':
      return 'bg-blue-100 text-blue-800';
    case 'Local Staff':
      return 'bg-green-100 text-green-800';
    case 'Contract':
      return 'bg-purple-100 text-purple-800';
    case 'Consultant':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PersonnelTrackingPage() {
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel);
  const [searchTerm, setSearchTerm] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');
  const [selectedPerson, setSelectedPerson] = useState<Personnel | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredPersonnel = personnel.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmploymentType = employmentTypeFilter === 'All' || person.employmentType === employmentTypeFilter;
    const matchesStatus = statusFilter === 'All' || person.status === statusFilter;
    const matchesCompany = companyFilter === 'All' || person.company === companyFilter;
    return matchesSearch && matchesEmploymentType && matchesStatus && matchesCompany;
  });

  const totalPersonnel = personnel.length;
  const expatriateCount = personnel.filter(p => p.employmentType === 'Expatriate').length;
  const localStaffCount = personnel.filter(p => p.employmentType === 'Local Staff').length;
  const activeCount = personnel.filter(p => p.status === 'Active').length;

  const companies = [...new Set(personnel.map(p => p.company))];

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Personnel Tracking</h1>
            <p className="text-gray-600">Monitor and manage expatriate and local staff records</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <UsersIcon className="h-5 w-5" />
            Add Personnel
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Personnel</p>
                <p className="text-2xl font-bold text-gray-900">{totalPersonnel}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expatriates</p>
                <p className="text-2xl font-bold text-blue-600">{expatriateCount}</p>
              </div>
              <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Local Staff</p>
                <p className="text-2xl font-bold text-green-600">{localStaffCount}</p>
              </div>
              <UserIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
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
                  placeholder="Search by name, company, position, or passport number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={employmentTypeFilter}
                onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Expatriate">Expatriate</option>
                <option value="Local Staff">Local Staff</option>
                <option value="Contract">Contract</option>
                <option value="Consultant">Consultant</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
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

        {/* Personnel List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Personnel Records</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredPersonnel.map((person) => (
              <div key={person.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(person.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(person.employmentType)}`}>
                        {person.employmentType}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(person.status)}`}>
                        {person.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-4 w-4" />
                        <span className="font-medium">Company:</span> {person.company}
                      </div>
                      <div>
                        <span className="font-medium">Position:</span> {person.position}
                      </div>
                      <div>
                        <span className="font-medium">Department:</span> {person.department}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {person.location}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-2">
                        <IdentificationIcon className="h-4 w-4" />
                        <span className="font-medium">Passport:</span> {person.passportNumber}
                      </div>
                      <div>
                        <span className="font-medium">Nationality:</span> {person.nationality}
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="h-4 w-4" />
                        <span className="font-medium">Start Date:</span> {new Date(person.startDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Last Updated:</span> {new Date(person.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    {person.employmentType === 'Expatriate' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        {person.visaExpiry && (
                          <div>
                            <span className="font-medium">Visa Expiry:</span> 
                            <span className={new Date(person.visaExpiry) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                              {new Date(person.visaExpiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {person.workPermitExpiry && (
                          <div>
                            <span className="font-medium">Work Permit Expiry:</span> 
                            <span className={new Date(person.workPermitExpiry) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                              {new Date(person.workPermitExpiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {person.bosietExpiry && (
                          <div>
                            <span className="font-medium">BOSIET Expiry:</span> 
                            <span className={new Date(person.bosietExpiry) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                              {new Date(person.bosietExpiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedPerson(person);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Modal */}
        {showDetailsModal && selectedPerson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Personnel Details</h2>
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
                      <p className="text-gray-900">{selectedPerson.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nationality</label>
                      <p className="text-gray-900">{selectedPerson.nationality}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                      <p className="text-gray-900">{selectedPerson.passportNumber}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="text-gray-900">{selectedPerson.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <p className="text-gray-900">{selectedPerson.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                      <p className="text-gray-900">{selectedPerson.emergencyContact}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Employment Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <p className="text-gray-900">{selectedPerson.company}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Position</label>
                      <p className="text-gray-900">{selectedPerson.position}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <p className="text-gray-900">{selectedPerson.department}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                      <span className={`px-2 py-1 rounded text-sm ${getEmploymentTypeColor(selectedPerson.employmentType)}`}>
                        {selectedPerson.employmentType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedPerson.status)}`}>
                        {selectedPerson.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="text-gray-900">{selectedPerson.location}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <p className="text-gray-900">{new Date(selectedPerson.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              {selectedPerson.employmentType === 'Expatriate' && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Immigration Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Visa Information</h4>
                      {selectedPerson.visaType && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Visa Type</label>
                          <p className="text-gray-900">{selectedPerson.visaType}</p>
                        </div>
                      )}
                      {selectedPerson.visaNumber && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Visa Number</label>
                          <p className="text-gray-900">{selectedPerson.visaNumber}</p>
                        </div>
                      )}
                      {selectedPerson.visaExpiry && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Visa Expiry</label>
                          <p className={new Date(selectedPerson.visaExpiry) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                            {new Date(selectedPerson.visaExpiry).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Work Permit & Certificates</h4>
                      {selectedPerson.workPermitNumber && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Work Permit Number</label>
                          <p className="text-gray-900">{selectedPerson.workPermitNumber}</p>
                        </div>
                      )}
                      {selectedPerson.workPermitExpiry && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Work Permit Expiry</label>
                          <p className={new Date(selectedPerson.workPermitExpiry) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                            {new Date(selectedPerson.workPermitExpiry).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {selectedPerson.bosietCertificate && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">BOSIET Certificate</label>
                          <p className="text-gray-900">{selectedPerson.bosietCertificate}</p>
                        </div>
                      )}
                      {selectedPerson.bosietExpiry && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">BOSIET Expiry</label>
                          <p className={new Date(selectedPerson.bosietExpiry) < new Date() ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                            {new Date(selectedPerson.bosietExpiry).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Personnel Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add New Personnel</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter nationality"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter passport number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select type</option>
                      <option value="Expatriate">Expatriate</option>
                      <option value="Local Staff">Local Staff</option>
                      <option value="Contract">Contract</option>
                      <option value="Consultant">Consultant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter position"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Personnel
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