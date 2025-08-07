'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../components/layouts/DashboardMenus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  UserIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BriefcaseIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  employeeId: string;
  hireDate: string;
  status: 'Active' | 'Inactive' | 'On Leave' | 'Terminated';
  location: string;
  supervisor: string;
  contractType: 'Permanent' | 'Contract' | 'Temporary';
  clearanceLevel: string;
  lastActive: string;
  profileImage?: string;
}

export default function ViewPersonnelPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('lastName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>([]);

  // Mock data for personnel
  const mockPersonnel: Personnel[] = [
    {
      id: 'PER-001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1-555-0101',
      position: 'Drilling Engineer',
      department: 'Drilling',
      employeeId: 'EMP-2024-001',
      hireDate: '2024-01-15',
      status: 'Active',
      location: 'Offshore Platform A',
      supervisor: 'Sarah Johnson',
      contractType: 'Permanent',
      clearanceLevel: 'Level 2',
      lastActive: '2024-01-20'
    },
    {
      id: 'PER-002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      phone: '+1-555-0102',
      position: 'Safety Officer',
      department: 'Safety',
      employeeId: 'EMP-2023-045',
      hireDate: '2023-06-20',
      status: 'Active',
      location: 'Offshore Platform B',
      supervisor: 'Michael Brown',
      contractType: 'Permanent',
      clearanceLevel: 'Level 3',
      lastActive: '2024-01-19'
    },
    {
      id: 'PER-003',
      firstName: 'Robert',
      lastName: 'Brown',
      email: 'robert.brown@company.com',
      phone: '+1-555-0103',
      position: 'Operations Manager',
      department: 'Operations',
      employeeId: 'EMP-2022-078',
      hireDate: '2022-03-10',
      status: 'On Leave',
      location: 'Onshore Facility',
      supervisor: 'Lisa Wilson',
      contractType: 'Permanent',
      clearanceLevel: 'Level 4',
      lastActive: '2024-01-10'
    },
    {
      id: 'PER-004',
      firstName: 'Emily',
      lastName: 'Wilson',
      email: 'emily.wilson@company.com',
      phone: '+1-555-0104',
      position: 'Environmental Specialist',
      department: 'Environmental',
      employeeId: 'EMP-2024-012',
      hireDate: '2024-02-01',
      status: 'Active',
      location: 'Remote Site C',
      supervisor: 'David Chen',
      contractType: 'Contract',
      clearanceLevel: 'Level 2',
      lastActive: '2024-01-20'
    },
    {
      id: 'PER-005',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@company.com',
      phone: '+1-555-0105',
      position: 'Geologist',
      department: 'Geology',
      employeeId: 'EMP-2023-156',
      hireDate: '2023-12-15',
      status: 'Active',
      location: 'Offshore Platform A',
      supervisor: 'Jennifer Davis',
      contractType: 'Permanent',
      clearanceLevel: 'Level 3',
      lastActive: '2024-01-18'
    },
    {
      id: 'PER-006',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1-555-0106',
      position: 'Drilling Supervisor',
      department: 'Drilling',
      employeeId: 'EMP-2021-089',
      hireDate: '2021-08-05',
      status: 'Active',
      location: 'Offshore Platform A',
      supervisor: 'Mark Thompson',
      contractType: 'Permanent',
      clearanceLevel: 'Level 4',
      lastActive: '2024-01-20'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchPersonnel = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPersonnel(mockPersonnel);
      setLoading(false);
    };

    fetchPersonnel();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Inactive':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      case 'On Leave':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'Terminated':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'Permanent':
        return 'bg-blue-100 text-blue-800';
      case 'Contract':
        return 'bg-purple-100 text-purple-800';
      case 'Temporary':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const departments = [...new Set(personnel.map(p => p.department))];

  const filteredPersonnel = personnel.filter(person => {
    const matchesStatus = filterStatus === 'all' || person.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || person.department === filterDepartment;
    const matchesSearch = searchQuery === '' || 
      `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesDepartment && matchesSearch;
  });

  const sortedPersonnel = [...filteredPersonnel].sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (sortBy) {
      case 'lastName':
        aValue = a.lastName.toLowerCase();
        bValue = b.lastName.toLowerCase();
        break;
      case 'firstName':
        aValue = a.firstName.toLowerCase();
        bValue = b.firstName.toLowerCase();
        break;
      case 'hireDate':
        aValue = new Date(a.hireDate).getTime();
        bValue = new Date(b.hireDate).getTime();
        break;
      case 'department':
        aValue = a.department;
        bValue = b.department;
        break;
      case 'position':
        aValue = a.position;
        bValue = b.position;
        break;
      default:
        aValue = a.lastName;
        bValue = b.lastName;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleEdit = (personnelId: string) => {
    router.push(`/dashboard/company-admin/personnel/edit/${personnelId}`);
  };

  const handleDelete = (personnelId: string) => {
    if (confirm('Are you sure you want to delete this personnel record?')) {
      setPersonnel(personnel.filter(p => p.id !== personnelId));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedPersonnel.length === 0) return;
    
    switch (action) {
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedPersonnel.length} personnel records?`)) {
          setPersonnel(personnel.filter(p => !selectedPersonnel.includes(p.id)));
          setSelectedPersonnel([]);
        }
        break;
      case 'activate':
        setPersonnel(personnel.map(p => 
          selectedPersonnel.includes(p.id) ? { ...p, status: 'Active' as const } : p
        ));
        setSelectedPersonnel([]);
        break;
      case 'deactivate':
        setPersonnel(personnel.map(p => 
          selectedPersonnel.includes(p.id) ? { ...p, status: 'Inactive' as const } : p
        ));
        setSelectedPersonnel([]);
        break;
    }
  };

  const toggleSelectAll = () => {
    if (selectedPersonnel.length === sortedPersonnel.length) {
      setSelectedPersonnel([]);
    } else {
      setSelectedPersonnel(sortedPersonnel.map(p => p.id));
    }
  };

  const toggleSelectPersonnel = (personnelId: string) => {
    if (selectedPersonnel.includes(personnelId)) {
      setSelectedPersonnel(selectedPersonnel.filter(id => id !== personnelId));
    } else {
      setSelectedPersonnel([...selectedPersonnel, personnelId]);
    }
  };

  if (loading) {
    return (
      <DashboardLayout
        title="Personnel Management"
        userRole="Company Admin"
        userName="Acme Corporation"
        userInitials="AC"
        sidebarItems={sidebarItems}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading personnel...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Personnel Management</h1>
            <p className="text-gray-600 mt-1">Manage your company personnel and their information</p>
          </div>
          <div className="flex space-x-3">
            <Link href="/dashboard/company-admin/personnel/add">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Add Personnel
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Personnel</p>
                <p className="text-2xl font-bold text-gray-900">
                  {personnel.filter(p => p.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-gray-900">
                  {personnel.filter(p => p.status === 'On Leave').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BriefcaseIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {departments.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Personnel</p>
                <p className="text-2xl font-bold text-gray-900">
                  {personnel.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search personnel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="lastName-asc">Last Name (A-Z)</option>
                <option value="lastName-desc">Last Name (Z-A)</option>
                <option value="firstName-asc">First Name (A-Z)</option>
                <option value="firstName-desc">First Name (Z-A)</option>
                <option value="hireDate-desc">Hire Date (Newest)</option>
                <option value="hireDate-asc">Hire Date (Oldest)</option>
                <option value="department-asc">Department (A-Z)</option>
                <option value="position-asc">Position (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPersonnel.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">
                {selectedPersonnel.length} personnel selected
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                >
                  Activate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('deactivate')}
                >
                  Deactivate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Personnel Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Personnel ({sortedPersonnel.length})
              </h3>
            </div>
            
            {sortedPersonnel.length === 0 ? (
              <div className="text-center py-12">
                <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No personnel found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery || filterStatus !== 'all' || filterDepartment !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by adding your first personnel member.'}
                </p>
                <div className="mt-6">
                  <Link href="/dashboard/company-admin/personnel/add">
                    <Button>
                      <UserPlusIcon className="h-4 w-4 mr-2" />
                      Add Personnel
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedPersonnel.length === sortedPersonnel.length}
                          onChange={toggleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Personnel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contract
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedPersonnel.map((person) => (
                      <tr key={person.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedPersonnel.includes(person.id)}
                            onChange={() => toggleSelectPersonnel(person.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <UserIcon className="h-6 w-6 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {person.firstName} {person.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {person.employeeId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="flex items-center text-sm text-gray-900">
                              <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                              {person.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                              {person.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {person.position}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.department}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {person.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(person.status)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getStatusColor(person.status)
                            }`}>
                              {person.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getContractTypeColor(person.contractType)
                            }`}>
                              {person.contractType}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              Hired: {new Date(person.hireDate).toLocaleDateString()}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleEdit(person.id)}
                              className="text-green-600 hover:text-green-900"
                              title="Edit Personnel"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(person.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Personnel"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}