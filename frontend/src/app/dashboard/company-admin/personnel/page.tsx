'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../app/components/layouts/DashboardMenus';
import {
  UserGroupIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface Personnel {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave' | 'terminated';
  startDate: string;
  location: string;
  manager: string;
  accessLevel: 'basic' | 'standard' | 'elevated' | 'admin';
  contractType: 'full-time' | 'part-time' | 'contract' | 'temporary';
  profilePhoto?: string;
  lastLogin?: string;
  certifications: string[];
  skills: string[];
}

export default function PersonnelPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [contractFilter, setContractFilter] = useState('all');
  const [accessLevelFilter, setAccessLevelFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>([]);

  // Mock data
  const personnel: Personnel[] = [
    {
      id: '1',
      employeeId: 'EMP-2024-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@acme.com',
      phone: '+233 24 123 4567',
      position: 'Senior Geologist',
      department: 'exploration',
      status: 'active',
      startDate: '2023-01-15',
      location: 'Accra Office',
      manager: 'Sarah Wilson',
      accessLevel: 'standard',
      contractType: 'full-time',
      lastLogin: '2024-01-15T10:30:00Z',
      certifications: ['Professional Geologist', 'Safety Training'],
      skills: ['Geological Mapping', 'Data Analysis', 'GIS']
    },
    {
      id: '2',
      employeeId: 'EMP-2024-002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@acme.com',
      phone: '+233 24 234 5678',
      position: 'Drilling Engineer',
      department: 'drilling',
      status: 'active',
      startDate: '2023-03-20',
      location: 'Field Site A',
      manager: 'Mike Johnson',
      accessLevel: 'elevated',
      contractType: 'full-time',
      lastLogin: '2024-01-15T08:45:00Z',
      certifications: ['Drilling Operations', 'Well Control'],
      skills: ['Drilling Operations', 'Well Planning', 'Safety Management']
    },
    {
      id: '3',
      employeeId: 'EMP-2024-003',
      firstName: 'Alex',
      lastName: 'Cooper',
      email: 'alex.cooper@acme.com',
      phone: '+233 24 345 6789',
      position: 'Production Supervisor',
      department: 'production',
      status: 'on-leave',
      startDate: '2022-11-10',
      location: 'Offshore Platform',
      manager: 'Carol Davis',
      accessLevel: 'standard',
      contractType: 'full-time',
      lastLogin: '2024-01-10T16:20:00Z',
      certifications: ['Production Operations', 'Emergency Response'],
      skills: ['Production Management', 'Equipment Maintenance', 'Team Leadership']
    },
    {
      id: '4',
      employeeId: 'EMP-2024-004',
      firstName: 'Bob',
      lastName: 'Martin',
      email: 'bob.martin@contractor.com',
      phone: '+233 24 456 7890',
      position: 'Safety Inspector',
      department: 'safety',
      status: 'active',
      startDate: '2024-01-08',
      location: 'Multiple Sites',
      manager: 'Daniel Lee',
      accessLevel: 'basic',
      contractType: 'contract',
      lastLogin: '2024-01-14T14:15:00Z',
      certifications: ['Safety Inspector', 'First Aid'],
      skills: ['Safety Inspection', 'Risk Assessment', 'Compliance']
    },
    {
      id: '5',
      employeeId: 'EMP-2024-005',
      firstName: 'Carol',
      lastName: 'Davis',
      email: 'carol.davis@acme.com',
      phone: '+233 24 567 8901',
      position: 'Operations Manager',
      department: 'operations',
      status: 'active',
      startDate: '2021-06-01',
      location: 'Accra Office',
      manager: 'CEO',
      accessLevel: 'admin',
      contractType: 'full-time',
      lastLogin: '2024-01-15T09:00:00Z',
      certifications: ['Operations Management', 'Leadership'],
      skills: ['Operations Management', 'Strategic Planning', 'Team Leadership']
    },
    {
      id: '6',
      employeeId: 'EMP-2024-006',
      firstName: 'David',
      lastName: 'Brown',
      email: 'david.brown@acme.com',
      phone: '+233 24 678 9012',
      position: 'IT Specialist',
      department: 'it',
      status: 'inactive',
      startDate: '2023-09-15',
      location: 'Accra Office',
      manager: 'Carol Davis',
      accessLevel: 'elevated',
      contractType: 'part-time',
      lastLogin: '2024-01-12T11:30:00Z',
      certifications: ['Network Administration', 'Cybersecurity'],
      skills: ['Network Management', 'System Administration', 'Cybersecurity']
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', icon: XCircleIcon, label: 'Inactive' },
      'on-leave': { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'On Leave' },
      terminated: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Terminated' }
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

  const getAccessLevelBadge = (level: string) => {
    const levelConfig = {
      basic: { color: 'bg-blue-100 text-blue-800', label: 'Basic' },
      standard: { color: 'bg-green-100 text-green-800', label: 'Standard' },
      elevated: { color: 'bg-orange-100 text-orange-800', label: 'Elevated' },
      admin: { color: 'bg-purple-100 text-purple-800', label: 'Admin' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getContractTypeBadge = (type: string) => {
    const typeConfig = {
      'full-time': { color: 'bg-green-100 text-green-800', label: 'Full-time' },
      'part-time': { color: 'bg-blue-100 text-blue-800', label: 'Part-time' },
      contract: { color: 'bg-orange-100 text-orange-800', label: 'Contract' },
      temporary: { color: 'bg-yellow-100 text-yellow-800', label: 'Temporary' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getDepartmentName = (dept: string) => {
    const departments = {
      exploration: 'Exploration',
      drilling: 'Drilling',
      production: 'Production',
      engineering: 'Engineering',
      safety: 'Safety & Environment',
      finance: 'Finance',
      hr: 'Human Resources',
      legal: 'Legal & Compliance',
      operations: 'Operations',
      it: 'Information Technology'
    };
    return departments[dept as keyof typeof departments] || dept;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  // Filter personnel
  const filteredPersonnel = personnel.filter(person => {
    const matchesSearch = 
      person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || person.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || person.department === departmentFilter;
    const matchesContract = contractFilter === 'all' || person.contractType === contractFilter;
    const matchesAccessLevel = accessLevelFilter === 'all' || person.accessLevel === accessLevelFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesContract && matchesAccessLevel;
  });

  // Calculate statistics
  const stats = {
    total: personnel.length,
    active: personnel.filter(p => p.status === 'active').length,
    onLeave: personnel.filter(p => p.status === 'on-leave').length,
    inactive: personnel.filter(p => p.status === 'inactive').length,
    fullTime: personnel.filter(p => p.contractType === 'full-time').length,
    contract: personnel.filter(p => p.contractType === 'contract').length
  };

  const handleSelectPersonnel = (id: string) => {
    setSelectedPersonnel(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedPersonnel(
      selectedPersonnel.length === filteredPersonnel.length 
        ? [] 
        : filteredPersonnel.map(p => p.id)
    );
  };

  return (
    <DashboardLayout
      title="Personnel Management"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Personnel Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your team members, track their information, and monitor access levels
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/company-admin/personnel/add')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Add Personnel
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Personnel</p>
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
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-gray-900">{stats.onLeave}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-8 w-8 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BriefcaseIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Full-time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.fullTime}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentArrowDownIcon className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Contract</p>
                <p className="text-2xl font-bold text-gray-900">{stats.contract}</p>
              </div>
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
                  placeholder="Search personnel by name, email, ID, or position..."
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
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  <option value="exploration">Exploration</option>
                  <option value="drilling">Drilling</option>
                  <option value="production">Production</option>
                  <option value="engineering">Engineering</option>
                  <option value="safety">Safety & Environment</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                  <option value="legal">Legal & Compliance</option>
                  <option value="operations">Operations</option>
                  <option value="it">Information Technology</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contract Type
                </label>
                <select
                  value={contractFilter}
                  onChange={(e) => setContractFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
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
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="elevated">Elevated</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Personnel Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Personnel ({filteredPersonnel.length})
              </h3>
              {selectedPersonnel.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedPersonnel.length} selected
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
                      checked={selectedPersonnel.length === filteredPersonnel.length && filteredPersonnel.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Personnel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position & Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPersonnel.map((person) => (
                  <tr key={person.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPersonnel.includes(person.id)}
                        onChange={() => handleSelectPersonnel(person.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {person.profilePhoto ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={person.profilePhoto}
                              alt={`${person.firstName} ${person.lastName}`}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person.firstName} {person.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.employeeId}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {person.position}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getDepartmentName(person.department)}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPinIcon className="h-3 w-3 mr-1" />
                        {person.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(person.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {getContractTypeBadge(person.contractType)}
                        <div className="text-xs text-gray-500 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Since {formatDate(person.startDate)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getAccessLevelBadge(person.accessLevel)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatLastLogin(person.lastLogin)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/personnel/${person.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/personnel/${person.id}/edit`)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Download Profile"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
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
          
          {filteredPersonnel.length === 0 && (
            <div className="text-center py-12">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No personnel found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || departmentFilter !== 'all' || contractFilter !== 'all' || accessLevelFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first team member.'}
              </p>
              {!searchTerm && statusFilter === 'all' && departmentFilter === 'all' && contractFilter === 'all' && accessLevelFilter === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/dashboard/company-admin/personnel/add')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Add Personnel
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