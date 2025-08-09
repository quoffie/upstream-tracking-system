'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon,
  FunnelIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getInspectorMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface ComplianceCheck {
  id: string;
  company: string;
  facility: string;
  checkType: string;
  category: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'under-review';
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastChecked: string;
  nextDue: string;
  inspector: string;
  complianceScore: number;
  issues: number;
  criticalIssues: number;
  description: string;
  location: string;
}

const mockComplianceChecks: ComplianceCheck[] = [
  {
    id: 'CC-2024-0001',
    company: 'Tullow Ghana Ltd',
    facility: 'TEN Field - Platform A',
    checkType: 'Safety Compliance',
    category: 'HSE',
    status: 'compliant',
    priority: 'high',
    lastChecked: '2024-01-15',
    nextDue: '2024-04-15',
    inspector: 'John Mensah',
    complianceScore: 92,
    issues: 2,
    criticalIssues: 0,
    description: 'Quarterly safety compliance assessment',
    location: 'Offshore Platform A'
  },
  {
    id: 'CC-2024-0002',
    company: 'Eni Ghana Ltd',
    facility: 'Sankofa Field - FPSO',
    checkType: 'Environmental Compliance',
    category: 'Environmental',
    status: 'non-compliant',
    priority: 'critical',
    lastChecked: '2024-01-12',
    nextDue: '2024-02-12',
    inspector: 'Sarah Asante',
    complianceScore: 68,
    issues: 8,
    criticalIssues: 3,
    description: 'Environmental discharge monitoring',
    location: 'FPSO Vessel'
  },
  {
    id: 'CC-2024-0003',
    company: 'Springfield E&P',
    facility: 'West Cape Three Points',
    checkType: 'Technical Compliance',
    category: 'Technical',
    status: 'under-review',
    priority: 'medium',
    lastChecked: '2024-01-08',
    nextDue: '2024-03-08',
    inspector: 'Michael Osei',
    complianceScore: 85,
    issues: 4,
    criticalIssues: 1,
    description: 'Equipment certification review',
    location: 'Drilling Platform'
  },
  {
    id: 'CC-2024-0004',
    company: 'Kosmos Energy',
    facility: 'Jubilee Field - Platform B',
    checkType: 'Operational Compliance',
    category: 'Operations',
    status: 'pending',
    priority: 'high',
    lastChecked: '2024-01-05',
    nextDue: '2024-01-25',
    inspector: 'Grace Adjei',
    complianceScore: 0,
    issues: 0,
    criticalIssues: 0,
    description: 'Monthly operational procedures audit',
    location: 'Production Platform B'
  },
  {
    id: 'CC-2024-0005',
    company: 'Hess Corporation',
    facility: 'Deepwater Tano',
    checkType: 'Safety Compliance',
    category: 'HSE',
    status: 'compliant',
    priority: 'medium',
    lastChecked: '2024-01-20',
    nextDue: '2024-04-20',
    inspector: 'Emmanuel Boateng',
    complianceScore: 88,
    issues: 3,
    criticalIssues: 0,
    description: 'Pre-drilling safety assessment',
    location: 'Drilling Rig 3'
  }
];

// Chart data
const complianceStatusData = [
  { name: 'Compliant', value: 2, color: '#10B981' },
  { name: 'Non-Compliant', value: 1, color: '#EF4444' },
  { name: 'Under Review', value: 1, color: '#F59E0B' },
  { name: 'Pending', value: 1, color: '#6B7280' }
];

const complianceScoreData = [
  { name: 'Tullow Ghana', score: 92, category: 'HSE' },
  { name: 'Eni Ghana', score: 68, category: 'Environmental' },
  { name: 'Springfield E&P', score: 85, category: 'Technical' },
  { name: 'Kosmos Energy', score: 0, category: 'Operations' },
  { name: 'Hess Corporation', score: 88, category: 'HSE' }
];

const complianceTrendData = [
  { month: 'Oct', score: 82 },
  { month: 'Nov', score: 78 },
  { month: 'Dec', score: 85 },
  { month: 'Jan', score: 83 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'compliant': return 'bg-green-100 text-green-800';
    case 'non-compliant': return 'bg-red-100 text-red-800';
    case 'under-review': return 'bg-yellow-100 text-yellow-800';
    case 'pending': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'compliant': return <CheckCircleIcon className="h-4 w-4" />;
    case 'non-compliant': return <XCircleIcon className="h-4 w-4" />;
    case 'under-review': return <ClockIcon className="h-4 w-4" />;
    case 'pending': return <ExclamationTriangleIcon className="h-4 w-4" />;
    default: return <ShieldCheckIcon className="h-4 w-4" />;
  }
};

export default function ComplianceChecksPage() {
  const [checks, setChecks] = useState<ComplianceCheck[]>(mockComplianceChecks);
  const [filteredChecks, setFilteredChecks] = useState<ComplianceCheck[]>(mockComplianceChecks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState<ComplianceCheck | null>(null);
  const [showStats, setShowStats] = useState(true);
  
  const pathname = usePathname();
  const sidebarItems = getInspectorMenuItems(pathname);

  useEffect(() => {
    let filtered = checks;

    if (searchTerm) {
      filtered = filtered.filter(check => 
        check.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        check.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        check.checkType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        check.inspector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        check.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(check => check.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(check => check.priority === priorityFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(check => check.category === categoryFilter);
    }

    setFilteredChecks(filtered);
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter, checks]);

  const handleStartCheck = (checkId: string) => {
    setChecks(checks.map(check => 
      check.id === checkId 
        ? { ...check, status: 'under-review' as const }
        : check
    ));
  };

  const handleCompleteCheck = (checkId: string) => {
    setChecks(checks.map(check => 
      check.id === checkId 
        ? { ...check, status: 'compliant' as const, lastChecked: new Date().toISOString().split('T')[0] }
        : check
    ));
  };

  const totalChecks = checks.length;
  const compliantChecks = checks.filter(check => check.status === 'compliant').length;
  const nonCompliantChecks = checks.filter(check => check.status === 'non-compliant').length;
  const overallComplianceRate = totalChecks > 0 ? Math.round((compliantChecks / totalChecks) * 100) : 0;
  const totalIssues = checks.reduce((sum, check) => sum + check.issues, 0);
  const totalCriticalIssues = checks.reduce((sum, check) => sum + check.criticalIssues, 0);

  return (
    <DashboardLayout
      title="Compliance Checks"
      userRole="Inspector"
      userName="Inspector Panel"
      userInitials="IP"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Compliance Checks</h1>
            <p className="text-gray-600 mt-1">Monitor and manage compliance assessments</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowStats(!showStats)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ChartBarIcon className="h-4 w-4 mr-2" />
              {showStats ? 'Hide' : 'Show'} Stats
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
            <Link
              href="/dashboard/inspector/compliance/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              New Check
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Checks</dt>
                      <dd className="text-lg font-medium text-gray-900">{totalChecks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Compliant</dt>
                      <dd className="text-lg font-medium text-gray-900">{compliantChecks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Non-Compliant</dt>
                      <dd className="text-lg font-medium text-gray-900">{nonCompliantChecks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Compliance Rate</dt>
                      <dd className="text-lg font-medium text-gray-900">{overallComplianceRate}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Critical Issues</dt>
                      <dd className="text-lg font-medium text-gray-900">{totalCriticalIssues}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {showStats && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Status</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {complianceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Scores</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={complianceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search compliance checks by company, facility, type, or inspector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="compliant">Compliant</option>
                    <option value="non-compliant">Non-Compliant</option>
                    <option value="under-review">Under Review</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="HSE">HSE</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Technical">Technical</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Checks List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Compliance Checks ({filteredChecks.length})
            </h3>
          </div>
          
          {filteredChecks.length === 0 ? (
            <div className="text-center py-12">
              <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No compliance checks found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company/Facility</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredChecks.map((check) => (
                    <tr key={check.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{check.id}</div>
                          <div className="text-sm text-gray-500">{check.checkType}</div>
                          <div className="text-xs text-gray-400">Inspector: {check.inspector}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-900">{check.company}</div>
                            <div className="text-sm text-gray-500">{check.facility}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(check.status)}`}>
                            {getStatusIcon(check.status)}
                            <span className="ml-1">
                              {check.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(check.priority)}`}>
                          {check.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          check.complianceScore >= 90 ? 'text-green-600' :
                          check.complianceScore >= 75 ? 'text-yellow-600' :
                          check.complianceScore > 0 ? 'text-red-600' : 'text-gray-400'
                        }`}>
                          {check.complianceScore > 0 ? `${check.complianceScore}%` : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {check.issues} total
                          {check.criticalIssues > 0 && (
                            <div className="text-xs text-red-600">
                              {check.criticalIssues} critical
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {check.nextDue}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {check.status === 'pending' && (
                          <button
                            onClick={() => handleStartCheck(check.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Start
                          </button>
                        )}
                        {check.status === 'under-review' && (
                          <button
                            onClick={() => handleCompleteCheck(check.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedCheck(check)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          <EyeIcon className="h-4 w-4 inline mr-1" />
                          View
                        </button>
                        <Link
                          href={`/dashboard/inspector/compliance/${check.id}/edit`}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          <PencilIcon className="h-4 w-4 inline mr-1" />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}