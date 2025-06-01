'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import EnhancedDashboardLayout from '../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../src/app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import {
  UsersIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'commission_admin' | 'staff' | 'senior_staff' | 'finance_officer' | 'compliance_officer' | 'jv_coordinator' | 'company_user';
  department: string;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  avatar?: string;
  phone?: string;
  location?: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  suspendedUsers: number;
  adminUsers: number;
  staffUsers: number;
  companyUsers: number;
  recentLogins: number;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'System' | 'Applications' | 'Financial' | 'Reports' | 'User Management';
}

export default function UserManagementPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [users, setUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'role' | 'lastLogin'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock users data
    const mockUsers: User[] = [
      {
        id: 'USR-001',
        name: 'John Doe',
        email: 'john.doe@commission.gov.ng',
        role: 'commission_admin',
        department: 'Administration',
        status: 'Active',
        lastLogin: '2024-01-25T14:30:00Z',
        createdAt: '2023-01-15T09:00:00Z',
        permissions: ['user_management', 'system_admin', 'financial_oversight', 'audit_access'],
        phone: '+234-801-234-5678',
        location: 'Abuja'
      },
      {
        id: 'USR-002',
        name: 'Jane Smith',
        email: 'jane.smith@commission.gov.ng',
        role: 'senior_staff',
        department: 'Operations',
        status: 'Active',
        lastLogin: '2024-01-25T13:45:00Z',
        createdAt: '2023-03-20T10:30:00Z',
        permissions: ['application_review', 'document_access', 'workflow_management'],
        phone: '+234-802-345-6789',
        location: 'Lagos'
      },
      {
        id: 'USR-003',
        name: 'Mike Johnson',
        email: 'mike.johnson@commission.gov.ng',
        role: 'finance_officer',
        department: 'Finance',
        status: 'Active',
        lastLogin: '2024-01-25T12:20:00Z',
        createdAt: '2023-02-10T14:15:00Z',
        permissions: ['payment_processing', 'financial_reports', 'revenue_tracking'],
        phone: '+234-803-456-7890',
        location: 'Abuja'
      },
      {
        id: 'USR-004',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@commission.gov.ng',
        role: 'compliance_officer',
        department: 'Compliance',
        status: 'Active',
        lastLogin: '2024-01-25T11:30:00Z',
        createdAt: '2023-04-05T11:00:00Z',
        permissions: ['compliance_monitoring', 'audit_reports', 'regulatory_oversight'],
        phone: '+234-804-567-8901',
        location: 'Port Harcourt'
      },
      {
        id: 'USR-005',
        name: 'David Brown',
        email: 'david.brown@commission.gov.ng',
        role: 'jv_coordinator',
        department: 'Joint Ventures',
        status: 'Active',
        lastLogin: '2024-01-25T10:15:00Z',
        createdAt: '2023-05-12T16:45:00Z',
        permissions: ['jv_management', 'partnership_oversight', 'contract_review'],
        phone: '+234-805-678-9012',
        location: 'Lagos'
      },
      {
        id: 'USR-006',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@commission.gov.ng',
        role: 'staff',
        department: 'Operations',
        status: 'Active',
        lastLogin: '2024-01-25T09:45:00Z',
        createdAt: '2023-06-18T08:30:00Z',
        permissions: ['basic_access', 'document_view'],
        phone: '+234-806-789-0123',
        location: 'Abuja'
      },
      {
        id: 'USR-007',
        name: 'Robert Taylor',
        email: 'robert.taylor@techcorp.ng',
        role: 'company_user',
        department: 'External',
        status: 'Active',
        lastLogin: '2024-01-25T08:30:00Z',
        createdAt: '2023-07-22T12:00:00Z',
        permissions: ['application_submit', 'status_view', 'document_upload'],
        phone: '+234-807-890-1234',
        location: 'Lagos'
      },
      {
        id: 'USR-008',
        name: 'Emily Davis',
        email: 'emily.davis@commission.gov.ng',
        role: 'staff',
        department: 'IT',
        status: 'Suspended',
        lastLogin: '2024-01-20T15:20:00Z',
        createdAt: '2023-08-10T13:15:00Z',
        permissions: ['basic_access'],
        phone: '+234-808-901-2345',
        location: 'Abuja'
      },
      {
        id: 'USR-009',
        name: 'James Miller',
        email: 'james.miller@oilco.ng',
        role: 'company_user',
        department: 'External',
        status: 'Pending',
        lastLogin: '2024-01-24T16:10:00Z',
        createdAt: '2024-01-24T16:10:00Z',
        permissions: [],
        phone: '+234-809-012-3456',
        location: 'Port Harcourt'
      },
      {
        id: 'USR-010',
        name: 'Maria Garcia',
        email: 'maria.garcia@commission.gov.ng',
        role: 'senior_staff',
        department: 'Legal',
        status: 'Inactive',
        lastLogin: '2024-01-15T10:00:00Z',
        createdAt: '2023-09-05T09:30:00Z',
        permissions: ['legal_review', 'contract_analysis'],
        phone: '+234-810-123-4567',
        location: 'Abuja'
      }
    ];

    const mockUserStats: UserStats = {
      totalUsers: 247,
      activeUsers: 198,
      pendingUsers: 12,
      suspendedUsers: 8,
      adminUsers: 5,
      staffUsers: 156,
      companyUsers: 86,
      recentLogins: 145
    };

    const mockPermissions: Permission[] = [
      { id: 'user_management', name: 'User Management', description: 'Create, edit, and manage user accounts', category: 'User Management' },
      { id: 'system_admin', name: 'System Administration', description: 'Full system administrative access', category: 'System' },
      { id: 'financial_oversight', name: 'Financial Oversight', description: 'Access to financial data and reports', category: 'Financial' },
      { id: 'audit_access', name: 'Audit Access', description: 'View and manage audit logs', category: 'System' },
      { id: 'application_review', name: 'Application Review', description: 'Review and process applications', category: 'Applications' },
      { id: 'document_access', name: 'Document Access', description: 'Access to system documents', category: 'Applications' },
      { id: 'workflow_management', name: 'Workflow Management', description: 'Manage application workflows', category: 'Applications' },
      { id: 'payment_processing', name: 'Payment Processing', description: 'Process payments and transactions', category: 'Financial' },
      { id: 'financial_reports', name: 'Financial Reports', description: 'Generate financial reports', category: 'Reports' },
      { id: 'revenue_tracking', name: 'Revenue Tracking', description: 'Track revenue and income', category: 'Financial' },
      { id: 'compliance_monitoring', name: 'Compliance Monitoring', description: 'Monitor regulatory compliance', category: 'System' },
      { id: 'audit_reports', name: 'Audit Reports', description: 'Generate audit reports', category: 'Reports' },
      { id: 'regulatory_oversight', name: 'Regulatory Oversight', description: 'Oversee regulatory compliance', category: 'System' },
      { id: 'jv_management', name: 'JV Management', description: 'Manage joint venture applications', category: 'Applications' },
      { id: 'partnership_oversight', name: 'Partnership Oversight', description: 'Oversee business partnerships', category: 'Applications' },
      { id: 'contract_review', name: 'Contract Review', description: 'Review and approve contracts', category: 'Applications' },
      { id: 'basic_access', name: 'Basic Access', description: 'Basic system access', category: 'System' },
      { id: 'document_view', name: 'Document View', description: 'View documents and files', category: 'Applications' },
      { id: 'application_submit', name: 'Application Submit', description: 'Submit new applications', category: 'Applications' },
      { id: 'status_view', name: 'Status View', description: 'View application status', category: 'Applications' },
      { id: 'document_upload', name: 'Document Upload', description: 'Upload supporting documents', category: 'Applications' },
      { id: 'legal_review', name: 'Legal Review', description: 'Review legal documents', category: 'Applications' },
      { id: 'contract_analysis', name: 'Contract Analysis', description: 'Analyze contracts and agreements', category: 'Applications' }
    ];

    setUsers(mockUsers);
    setUserStats(mockUserStats);
    setPermissions(mockPermissions);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === selectedStatus);
    }

    // Apply department filter
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(user => user.department === selectedDepartment);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        case 'lastLogin':
          aValue = new Date(a.lastLogin).getTime();
          bValue = new Date(b.lastLogin).getTime();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, selectedRole, selectedStatus, selectedDepartment, sortBy, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'commission_admin': return 'bg-purple-100 text-purple-800';
      case 'senior_staff': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'finance_officer': return 'bg-yellow-100 text-yellow-800';
      case 'compliance_officer': return 'bg-orange-100 text-orange-800';
      case 'jv_coordinator': return 'bg-indigo-100 text-indigo-800';
      case 'company_user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'commission_admin': return 'Commission Admin';
      case 'senior_staff': return 'Senior Staff';
      case 'staff': return 'Staff';
      case 'finance_officer': return 'Finance Officer';
      case 'compliance_officer': return 'Compliance Officer';
      case 'jv_coordinator': return 'JV Coordinator';
      case 'company_user': return 'Company User';
      default: return role;
    }
  };

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const departments = Array.from(new Set(users.map(user => user.department)));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <EnhancedDashboardLayout
        title="User Management"
      sidebarItems={getCommissionAdminMenuItems(pathname)}
      userRole={user?.role || 'commission_admin'}
      userName={user ? `${user.firstName} ${user.lastName}` : 'Commission Admin'}
      userInitials={user ? `${user.firstName[0]}${user.lastName[0]}` : 'CA'}

    >
      <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">👥</span>
              User Management
            </h1>
            <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create User
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Import Users
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.totalUsers}</div>
              <div className="text-sm opacity-90">Total Users</div>
              <div className="text-xs mt-1 opacity-75">{userStats.recentLogins} recent logins</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.activeUsers}</div>
              <div className="text-sm opacity-90">Active Users</div>
              <div className="text-xs mt-1 opacity-75">{((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% of total</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.pendingUsers}</div>
              <div className="text-sm opacity-90">Pending Approval</div>
              <div className="text-xs mt-1 opacity-75">{userStats.suspendedUsers} suspended</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{userStats.adminUsers}</div>
              <div className="text-sm opacity-90">Admin Users</div>
              <div className="text-xs mt-1 opacity-75">{userStats.staffUsers} staff members</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="commission_admin">Commission Admin</option>
              <option value="senior_staff">Senior Staff</option>
              <option value="staff">Staff</option>
              <option value="finance_officer">Finance Officer</option>
              <option value="compliance_officer">Compliance Officer</option>
              <option value="jv_coordinator">JV Coordinator</option>
              <option value="company_user">Company User</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'name' | 'email' | 'role' | 'lastLogin');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name-asc">Name (A to Z)</option>
              <option value="name-desc">Name (Z to A)</option>
              <option value="email-asc">Email (A to Z)</option>
              <option value="email-desc">Email (Z to A)</option>
              <option value="role-asc">Role (A to Z)</option>
              <option value="role-desc">Role (Z to A)</option>
              <option value="lastLogin-desc">Last Login (Recent)</option>
              <option value="lastLogin-asc">Last Login (Oldest)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Users ({filteredUsers.length} found)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Edit
                      </button>
                      {user.status === 'Active' ? (
                        <button className="text-yellow-600 hover:text-yellow-900">
                          Suspend
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900">
                          Activate
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-lg text-sm ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Role Management</h3>
          <p className="text-sm opacity-90 mb-4">Manage user roles and permissions</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/users/roles')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Manage Roles
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Bulk Operations</h3>
          <p className="text-sm opacity-90 mb-4">Perform bulk user operations</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/users/bulk')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Bulk Actions
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Access Control</h3>
          <p className="text-sm opacity-90 mb-4">Configure access permissions</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/users/permissions')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Manage Access
          </button>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
          <p className="text-sm opacity-90 mb-4">Configure security policies</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/users/security')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Security Settings
          </button>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
                <button 
                  onClick={() => setShowUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
                  {selectedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}>
                      {getRoleDisplayName(selectedUser.role)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Phone:</span> {selectedUser.phone || 'Not provided'}</div>
                    <div><span className="text-gray-500">Location:</span> {selectedUser.location || 'Not provided'}</div>
                    <div><span className="text-gray-500">Department:</span> {selectedUser.department}</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Account Information</h5>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">Created:</span> {formatDate(selectedUser.createdAt)}</div>
                    <div><span className="text-gray-500">Last Login:</span> {formatDate(selectedUser.lastLogin)}</div>
                    <div><span className="text-gray-500">User ID:</span> {selectedUser.id}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Permissions ({selectedUser.permissions.length})</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map(permission => {
                    const permissionData = permissions.find(p => p.id === permission);
                    return (
                      <span key={permission} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {permissionData?.name || permission}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </EnhancedDashboardLayout>
  );
}